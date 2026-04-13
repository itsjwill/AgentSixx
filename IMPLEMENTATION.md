# AgentSix v2: Implementation Guide

> **Status:** Build spec for v1 (3 features, 10 workflows, 5-page dashboard)  
> **Timeline:** 4 weeks build + 8 weeks sell = 90 days to decision  
> **Stack:** n8n + Convex + Next.js + Retell + Twilio

---

## System Architecture

```
                                 LEAD SOURCES
                    (Zillow, Facebook, Realtor, agent website)
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │         WEBHOOK RECEIVER             │
                    │   (n8n webhook or Hono server)       │
                    └──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │      COMPLIANCE GATE                 │
                    │   1. DNC check (federal + state)     │
                    │   2. Litigator list check            │
                    │   3. Consent verification            │
                    │   4. Quiet hours check               │
                    │   BLOCK if any fail                  │
                    └──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │     LEAD INGESTION                   │
                    │   Write to Convex `leads` table      │
                    │   Tag with client_id, source         │
                    └──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │     AI RESPONSE LOOP                 │
                    │   Claude generates first-touch SMS   │
                    │   Twilio sends SMS                   │
                    │   Resend sends email                 │
                    └──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │     QUALIFICATION LOOP               │
                    │   Claude handles reply               │
                    │   State machine tracks progress      │
                    │   Books appointment if ready         │
                    │   Escalates edge case to Slack       │
                    └──────────────────────────────────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │   DASHBOARD (Next.js + Convex)       │
                    │   Real-time view for client agent    │
                    └──────────────────────────────────────┘
```

---

## Convex Schema (Multi-Tenant)

All tables scoped by `clientId` from day one. Every query MUST filter by `clientId`.

```typescript
// convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // -----------------------------------
  // CLIENTS (our customers, the agents)
  // -----------------------------------
  clients: defineTable({
    businessName: v.string(),
    primaryContact: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),
    brokerage: v.optional(v.string()),
    licenseNumber: v.optional(v.string()),
    timezone: v.string(),
    tier: v.union(v.literal("starter"), v.literal("pro"), v.literal("growth")),
    status: v.union(
      v.literal("onboarding"),
      v.literal("active"),
      v.literal("paused"),
      v.literal("churned")
    ),
    slug: v.string(),
    businessHours: v.object({
      start: v.number(),
      end: v.number(),
      daysActive: v.array(v.number()),
    }),
    voiceMinutesQuota: v.number(),
    voiceMinutesUsed: v.number(),
    createdAt: v.number(),
    onboardedAt: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  // -----------------------------------
  // LEADS
  // -----------------------------------
  leads: defineTable({
    clientId: v.id("clients"),
    source: v.string(),
    sourceRecordId: v.optional(v.string()),
    contact: v.object({
      firstName: v.optional(v.string()),
      lastName: v.optional(v.string()),
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      address: v.optional(v.string()),
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      zip: v.optional(v.string()),
    }),
    propertyInterest: v.optional(v.object({
      address: v.optional(v.string()),
      priceRange: v.optional(v.string()),
      bedrooms: v.optional(v.number()),
      propertyType: v.optional(v.string()),
    })),
    qualificationState: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualifying"),
      v.literal("qualified"),
      v.literal("appointment_booked"),
      v.literal("showing_scheduled"),
      v.literal("active"),
      v.literal("closed_won"),
      v.literal("closed_lost"),
      v.literal("dnc"),
      v.literal("opted_out")
    ),
    qualification: v.optional(v.object({
      timeline: v.optional(v.string()),
      budget: v.optional(v.string()),
      motivation: v.optional(v.string()),
      decisionMaker: v.optional(v.boolean()),
      preApproved: v.optional(v.boolean()),
    })),
    isHot: v.boolean(),
    hotReason: v.optional(v.string()),
    consentRecordId: v.optional(v.id("consent_records")),
    lastContactedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_client_and_state", ["clientId", "qualificationState"])
    .index("by_client_and_hot", ["clientId", "isHot"])
    .index("by_phone", ["contact.phone"]),

  // -----------------------------------
  // MESSAGES
  // -----------------------------------
  messages: defineTable({
    clientId: v.id("clients"),
    leadId: v.id("leads"),
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    channel: v.union(v.literal("sms"), v.literal("email")),
    body: v.string(),
    subject: v.optional(v.string()),
    sender: v.string(),
    aiPromptVersion: v.optional(v.string()),
    deliveryStatus: v.optional(v.string()),
    externalId: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_lead", ["leadId"])
    .index("by_client", ["clientId"]),

  // -----------------------------------
  // CALLS
  // -----------------------------------
  calls: defineTable({
    clientId: v.id("clients"),
    leadId: v.optional(v.id("leads")),
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    phoneNumber: v.string(),
    durationSeconds: v.number(),
    transcript: v.string(),
    audioUrl: v.optional(v.string()),
    outcome: v.union(
      v.literal("no_answer"),
      v.literal("voicemail"),
      v.literal("answered_not_interested"),
      v.literal("answered_qualified"),
      v.literal("answered_booked"),
      v.literal("answered_edge_case"),
      v.literal("abandoned")
    ),
    edgeCaseReason: v.optional(v.string()),
    retellCallId: v.string(),
    startedAt: v.number(),
    endedAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_lead", ["leadId"]),

  // -----------------------------------
  // APPOINTMENTS
  // -----------------------------------
  appointments: defineTable({
    clientId: v.id("clients"),
    leadId: v.id("leads"),
    type: v.union(
      v.literal("phone_consultation"),
      v.literal("showing"),
      v.literal("listing_presentation"),
      v.literal("buyer_consultation")
    ),
    scheduledFor: v.number(),
    durationMinutes: v.number(),
    location: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("scheduled"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("no_show"),
      v.literal("cancelled"),
      v.literal("rescheduled")
    ),
    googleCalendarEventId: v.optional(v.string()),
    bookedBy: v.union(v.literal("ai"), v.literal("human")),
    createdAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_client_and_date", ["clientId", "scheduledFor"]),

  // -----------------------------------
  // CONSENT RECORDS (TCPA critical)
  // -----------------------------------
  consent_records: defineTable({
    clientId: v.id("clients"),
    phone: v.string(),
    email: v.optional(v.string()),
    consentMethod: v.union(
      v.literal("landing_page"),
      v.literal("lead_source"),
      v.literal("verbal_recorded"),
      v.literal("manual_entry")
    ),
    consentText: v.string(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    landingPageUrl: v.optional(v.string()),
    timestamp: v.number(),
    expiresAt: v.number(),
    revokedAt: v.optional(v.number()),
    revocationMethod: v.optional(v.string()),
  })
    .index("by_phone", ["phone"])
    .index("by_client_and_phone", ["clientId", "phone"]),

  // -----------------------------------
  // COMPLIANCE CHECKS
  // -----------------------------------
  compliance_checks: defineTable({
    clientId: v.id("clients"),
    leadId: v.optional(v.id("leads")),
    phone: v.string(),
    checkType: v.union(
      v.literal("dnc_federal"),
      v.literal("dnc_state"),
      v.literal("litigator"),
      v.literal("consent"),
      v.literal("quiet_hours"),
      v.literal("internal_dnc")
    ),
    result: v.union(v.literal("pass"), v.literal("block")),
    source: v.string(),
    rawResponse: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_phone", ["phone"])
    .index("by_client", ["clientId"]),

  // -----------------------------------
  // ESCALATIONS
  // -----------------------------------
  escalations: defineTable({
    clientId: v.id("clients"),
    leadId: v.id("leads"),
    triggerReason: v.string(),
    context: v.string(),
    slackMessageTs: v.optional(v.string()),
    resolvedAt: v.optional(v.number()),
    resolvedBy: v.optional(v.string()),
    resolution: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_client", ["clientId"])
    .index("by_unresolved", ["clientId", "resolvedAt"]),
});
```

---

## 10 Core Workflows

```
v1 WORKFLOW CATALOG:
════════════════════

WF-01: Lead Intake Webhook
        Trigger: HTTP webhook at /webhook/lead/[clientSlug]
        Action: Validate → Compliance Gate → Create lead → Trigger first touch

WF-02: Compliance Gate (subworkflow)
        Trigger: Called from other workflows
        Action: DNC check → Litigator check → Consent check → Quiet hours
        Return: { result: "pass" | "block", blockReason?: string }

WF-03: AI First Touch
        Trigger: Called from WF-01
        Action: Load prompt → Claude API → Send SMS via Twilio → Send email via Resend

WF-04: Inbound Message Handler
        Trigger: Twilio webhook on SMS receive
        Action: Check STOP/HELP → Log message → Claude qualification → Route response

WF-05: Opt Out Handler
        Trigger: Called from WF-04 on STOP detection
        Action: Update lead → Revoke consent → Add to internal DNC → Confirm
        SLA: Must complete within 10 seconds

WF-06: Appointment Booking
        Trigger: Called when AI detects booking intent
        Action: Check calendar → Create event → Send confirmation → Alert agent

WF-07: Voice Outbound (scheduled)
        Trigger: Cron at 10am client-local time
        Action: Check quota → Query eligible leads → Retell outbound calls

WF-08: Voice Call Complete
        Trigger: Retell webhook on call completion
        Action: Parse outcome → Log call → Update lead → Route follow-up

WF-09: Hot Lead Alert
        Trigger: Called when lead is marked hot
        Action: SMS to agent → Push notification → Slack FYI

WF-10: Slack War Room Escalation
        Trigger: Called on edge cases
        Action: Format message → Post to Slack → Pause lead → Start SLA timer
```

---

## AI Prompts (Production-Ready)

### PROMPT-01: First Touch SMS

```
You are an AI assistant for {{agent_name}}, a real estate agent in {{city}}, {{state}}.

You just received a new lead from {{source}}. Here is what we know:
- Name: {{first_name}} {{last_name_or_empty}}
- Property interest: {{property_or_empty}}
- Their message: {{message_or_empty}}
- Current time at their location: {{local_time}}

Write a SMS response that:
1. Is under 160 characters
2. Introduces yourself as {{agent_name}}'s assistant (not as a human)
3. Acknowledges their specific interest if known
4. Asks ONE clarifying question (timeline is most useful)
5. Feels warm and direct, not salesy

Rules:
- Never claim to be a human
- Never pressure or use urgency tactics
- Always end with the question
- If local time is between 9pm-8am: return {"skip": true, "reason": "quiet_hours"}

Return JSON: {"message": "...", "skip": false}
```

### PROMPT-02: SMS Qualification Loop

```
You are an AI assistant for {{agent_name}}, a real estate agent in {{city}}, {{state}}.

Conversation history:
{{conversation_history}}

Most recent lead message:
{{latest_message}}

Current qualification state:
- Timeline: {{timeline_or_unknown}}
- Budget: {{budget_or_unknown}}
- Motivation: {{motivation_or_unknown}}
- Decision maker: {{decision_maker_or_unknown}}
- Pre-approved: {{pre_approved_or_unknown}}

Your job:
1. Continue conversation naturally
2. Ask ONE qualifying question per message
3. Detect booking intent (meet, see property, talk to agent)
4. Detect edge cases needing human handoff

Edge cases (flag, do NOT respond):
- Legal threats or lawyers
- Death, divorce, job loss, life events
- Confusion ("are you real?", "is this a bot?")
- Abusive or hostile messages
- Compliance complaints ("I never signed up")
- Complex financial questions
- Agent-specific questions

Return JSON:
{
  "message": "your response OR null if edge case",
  "qualificationUpdate": {...},
  "intent": "qualifying" | "book_appointment" | "not_interested" | "edge_case",
  "edgeCaseReason": "..." // only if edge_case
}
```

### PROMPT-03: Retell Voice Agent (Inbound)

```
You are a friendly real estate assistant answering the phone for {{agent_name}}.

Your job:
1. Greet warmly, identify as {{agent_name}}'s assistant
2. Find out: buying or selling? timeline? property in mind?
3. If they want {{agent_name}} directly, offer to book a call time
4. Take name, phone, email before ending

Rules:
- You are NOT human. If asked: "I'm an AI assistant. If you'd like to speak to her directly, I can book a call."
- Never quote values, rates, or legal advice
- Never discuss commission
- If caller is distressed/angry, take message and say someone will call back
- Keep responses under 2 sentences
- Ask ONE question at a time

If hostile/abusive: "I'm sorry, I'll have {{agent_name}} reach out personally. Thank you." End call.
```

### PROMPT-04: Retell Voice Agent (Outbound)

```
You are calling on behalf of {{agent_name}}, a real estate agent in {{city}}, {{state}}.

Lead info:
- Name: {{lead_name}}
- Source: {{lead_source}}
- Previous conversation: {{summary_or_fresh}}

Goals:
1. Verify you're speaking to the right person
2. Remind them they requested info about {{context}}
3. Confirm still interested
4. Qualify: timeline, motivation, pre-approved
5. Book a call or showing

Opening: "Hi, is this {{lead_name}}? This is {{agent_name}}'s assistant calling. I'm following up on your interest in {{context}}. Is now a good time?"

If no: Ask for better time, schedule callback
If yes: Proceed through qualification
If not interested: Ask what changed, thank them, end politely

Edge cases (end call, flag for human):
- Hostile or abusive
- Question outside scope
- Life event mention
- Confused/doesn't remember
```

---

## Week-by-Week Build Timeline

### Week 1: Compliance Foundation (40 hours)

```
DAY 1 (Monday):
├── LLC check, insurance quotes (Founder Shield, Vouch, Embroker)
├── Draft customer agreement requirements, contact lawyer
├── Twilio account setup, brand registration for A2P 10DLC
└── DNC scrub signup (Contact Center Compliance)

DAY 2 (Tuesday):
├── Blacklist Alliance signup, API test
├── Cloudflare domain setup (agentsix.com + wildcard)
└── Convex project setup, schema deploy

DAY 3 (Wednesday):
├── Next.js dashboard scaffolding, Convex integration
└── Consent landing page template

DAY 4 (Thursday):
├── n8n self-host on Railway
└── WF-02 (Compliance Gate) with real API calls

DAY 5 (Friday):
├── Insurance binder (pick winner, pay premium)
├── Review lawyer's draft
└── Test end-to-end compliance flow
```

### Week 2: Voice Agent (40 hours)

```
DAY 6: Retell AI setup, PROMPT-03 (inbound), test calls
DAY 7: PROMPT-04 (outbound), WF-08 (call complete webhook)
DAY 8: Google Calendar integration, WF-06 (booking)
DAY 9: WF-07 (outbound cron), 50 test calls
DAY 10: Transcript storage, outcome classification, prompt tuning
```

### Week 3: Lead Response Engine (40 hours)

```
DAY 11: WF-01 (intake), WF-03 (first touch), Twilio SMS
DAY 12: WF-04 (inbound handler), qualification state machine
DAY 13: Resend email, WF-05 (opt out), quiet hours
DAY 14: WF-09 (hot lead alert), WF-10 (Slack escalation)
DAY 15: End-to-end testing, bug fixes
```

### Week 4: Dashboard + Launch Prep (40 hours)

```
DAY 16: Dashboard Home + Leads pages
DAY 17: Lead detail drawer, Appointments page
DAY 18: Voice page, Settings page
DAY 19: Real-time subscriptions, mobile responsive
DAY 20: Dry run with fake client, testing checklist
```

---

## Onboarding Checklist (7 Days)

```
DAY 1: Discovery call (60 min)
├── Collect business info, lead sources, credentials
├── Sign customer agreement + compliance attestation
├── Sign E&O insurance rider
└── Kick off 10DLC registration

DAY 2-3: Provisioning
├── Create Convex tenant
├── Provision Twilio number + A2P submission
├── Subscribe to DNC + litigator filters
├── Create [slug].agentsix.com consent page
├── Wire webhook endpoints
├── Create Slack war room channel

DAY 4: AI voice training
├── 30-min call to record agent's pitch
├── Train Retell agent on scripts
├── 10 dry-run test calls
└── Agent approval on voice

DAY 5: Buyer response goes live
├── Monitor first webhooks
├── Manual approval gate on first 3 leads
└── Then AI runs autonomously

DAY 6: AI voice goes live
├── Small batch (10 leads)
├── Monitor via Slack
└── Scale to full volume

DAY 7: Launch review call (30 min)
├── Walk through dashboard
├── Review first 48 hours
├── Set 30/60/90 day expectations
```

---

## Testing Checklist (75 Items)

### Compliance Tests (20 items)
- [ ] A2P 10DLC campaign active
- [ ] Test SMS sends successfully
- [ ] STOP processed within 10 seconds
- [ ] HELP returns valid response
- [ ] Consent page loads and submits
- [ ] Consent record written with all fields
- [ ] DNC scrub blocks known DNC number
- [ ] DNC scrub passes clean number
- [ ] Litigator list blocks test entry
- [ ] Quiet hours blocks 11pm send
- [ ] Quiet hours allows 10am send
- [ ] Timezone derived correctly
- [ ] Opt out propagates to all workflows
- [ ] Revoked consent timestamps correctly
- [ ] Internal DNC list functions
- [ ] Compliance audit log captures all
- [ ] Insurance policy active
- [ ] Customer agreement ready
- [ ] Retention policy documented
- [ ] Archive destination configured

### Voice Tests (15 items)
- [ ] Inbound answered within 2 rings
- [ ] Inbound identifies as AI
- [ ] Inbound qualification covers 5 fields
- [ ] Inbound books to calendar
- [ ] Inbound handles "are you a bot"
- [ ] Outbound dials correct number
- [ ] Outbound opens with script
- [ ] Outbound handles "not now"
- [ ] Outbound handles rejection
- [ ] Transcript saved
- [ ] Outcome classified correctly
- [ ] Voicemail detection works
- [ ] Edge case triggers Slack
- [ ] Voice minutes counter works
- [ ] Quota enforcement blocks at limit

### Lead Flow Tests (25 items)
- [ ] Zillow webhook parses
- [ ] Facebook webhook parses
- [ ] Website form parses
- [ ] Phone normalized to E.164
- [ ] Lead created with all fields
- [ ] Compliance gate runs before touch
- [ ] First touch SMS in 10 seconds
- [ ] First touch email in 30 seconds
- [ ] Lead state = contacted
- [ ] Inbound reply routed correctly
- [ ] Qualification advances
- [ ] Legal threat detected
- [ ] Life event detected
- [ ] Compliance complaint detected
- [ ] Booking intent triggers calendar
- [ ] Calendar availability checked
- [ ] Appointment created
- [ ] Google Calendar event created
- [ ] Confirmation SMS sent
- [ ] Hot lead alert sent
- [ ] Silent lead follow-up at 24h
- [ ] Silent lead nurture at 7d
- [ ] DNC lead blocked
- [ ] Multiple messages combined
- [ ] End-to-end happy path works

### Dashboard Tests (15 items)
- [ ] Home loads in <2 seconds
- [ ] Hot leads populate
- [ ] Upcoming appointments show
- [ ] Leads list filters work
- [ ] Lead drawer opens with context
- [ ] Call button initiates call
- [ ] Text button sends SMS
- [ ] Book button creates event
- [ ] DNC button updates state
- [ ] Appointments calendar renders
- [ ] Voice page shows 30 days
- [ ] Transcript loads and plays
- [ ] Settings tabs load
- [ ] Real-time updates work
- [ ] Mobile responsive on iPhone

---

## Cost Tracking

### Per-Client Monthly Cost Dashboard

```javascript
{
  clientId: string,
  month: string,
  revenue: number,
  costs: {
    retellMinutes: number,
    twilioMessages: number,
    claudeTokens: number,
    infraAllocated: number,
    opsLaborEstimated: number,
  },
  grossMargin: number,
  marginPct: number
}
```

### Alerts
- Individual client margin < 30% → investigate
- Retell minutes > 90% quota → upsell opportunity
- Ops labor > 4 hrs/mo → too many escalations
- Twilio spend > $75/mo → investigate

---

## Failure Modes

| Failure | Response |
|---------|----------|
| Twilio campaign suspended | Pause outbound, notify client, contact support, email-only fallback |
| DNC vendor API down | Fail CLOSED (block all), use 24hr cached results, consider backup vendor |
| Retell AI outage | Pause outbound, forward inbound to voicemail, notify clients |
| Convex outage | Pause all workflows, wait for resolution |
| AI sends bad message | Pause AI for lead, apologize, review prompt, version bump |
| Compliance incident | IMMEDIATELY pause, pull audit trail, contact lawyer + insurance |

---

*Implementation companion to README.md. Both docs are living. Update on every learning.*
