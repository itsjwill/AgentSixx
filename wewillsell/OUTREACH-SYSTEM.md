# AgentSix SMS Outreach System

## Overview
Automated SMS outreach to 43,866 real estate agents in Close CRM.

## Architecture

### Data Flow
```
Close CRM (43K agents) → Convex (Queue) → SMS Sender → Track Replies
```

### Workflows Needed

---

## WF-AOS-1: Agent Import (Close → Convex)

**Purpose**: Import ACQ Agents from Close CRM to Convex outreach queue

**Trigger**: Manual (run once to import, then segment)

**Nodes**:
1. Manual Trigger
2. HTTP Request → Close CRM (query ACQ Agents)
3. Code → Transform data (extract name, phone, email, market, deals)
4. SplitInBatches → Process 100 at a time
5. HTTP Request → Convex `/api/agentos/import-lead`
6. Update status

**Close CRM Query**:
```
GET /api/v1/lead/
?query=custom.cf_rc0QblLQyj8Yeeu8W39pePf7uRcYhqBUnTw1e8rAihx:"ACQ Agent"
&_fields=id,display_name,contacts,custom
&_limit=100
```

**Convex Schema** (agentosQueue):
```typescript
{
  closeId: string,           // Close CRM lead ID
  name: string,              // Agent name
  phone: string,             // Primary phone
  email: string,             // Email if available
  market: string,            // Cleveland/Las Vegas
  dealsPerYear: number,      // ARN Deals Closed
  office: string,            // Office Name
  
  // Outreach status
  status: "pending" | "sent" | "replied" | "booked" | "not_interested" | "opted_out",
  sequenceStep: number,      // 1-4 (which SMS in sequence)
  lastSentAt: number,        // Timestamp
  nextSendAt: number,        // When to send next
  
  // Tracking
  createdAt: number,
  updatedAt: number,
  sentCount: number,
  replyCount: number,
}
```

---

## WF-AOS-2: SMS Sender (Scheduled)

**Purpose**: Send SMS to agents one-by-one from Convex queue

**Trigger**: Schedule - 10am and 7pm (best times)

**Nodes**:
1. Schedule Trigger (10:00 AM, 7:00 PM)
2. Initialize Config (batch size, rate limit)
3. HTTP Request → Convex `/api/agentos/due-leads`
4. Code → Split items
5. Limit (50 per batch)
6. SplitInBatches (rate limiter, 1 per second)
7. Code → Build SMS message (based on sequenceStep)
8. Wait (1 second)
9. HTTP Request → Close CRM SMS API
10. IF → SMS Sent OK?
    - Yes → Update Convex (sent, advance sequence)
    - No → Log error, retry logic
11. HTTP Request → Convex `/api/agentos/update-status`

**SMS Templates by Sequence Step**:

### Step 1 (Day 1) - Hook
```
Hey {{firstName}}, quick question - how fast do you respond to leads at 9pm on a Saturday?

We built an AI that responds in 5 seconds, 24/7. Agents getting 20+ extra appointments/mo.

Quick demo? {{demoLink}}

Reply STOP to opt out
- AgentSix
```

### Step 2 (Day 3) - Social Proof
```
{{firstName}} - Sarah from KW Phoenix switched from a $3,500/mo ISA to AgentSix.

Result: 23 appointments/month, 5-second response time, 1/3 the cost.

Worth 10 min to see how? {{demoLink}}

Reply STOP to opt out
```

### Step 3 (Day 6) - Pain Point
```
{{firstName}}, did you know 78% of buyers go with the FIRST agent who responds?

Average agent takes 47 hours. AgentSix responds in 5 seconds. Every time.

Quick demo? {{demoLink}}

Reply STOP to opt out
```

### Step 4 (Day 10) - Last Chance
```
Last msg {{firstName}} - 

AgentSix beta pricing ends Friday:
- $0 setup (normally $2,500)
- 30% off monthly

Only 10 spots left.

Interested? {{demoLink}}

Reply STOP to opt out
```

---

## WF-AOS-3: Response Handler (Webhook)

**Purpose**: Handle SMS replies, route to appropriate action

**Trigger**: Close CRM SMS Webhook

**Nodes**:
1. Webhook → Receive SMS reply
2. Code → Parse message, detect intent
3. Switch → Route by intent:
   - "YES" / interested → Book demo flow
   - "STOP" → Opt out, mark as opted_out
   - Question → Auto-reply with info
   - Price question → Send pricing info
   - Not interested → Mark, stop sequence
4. HTTP Request → Convex update status
5. Slack notification (hot leads)

**Intent Detection**:
```javascript
const message = $json.text.toLowerCase();

if (message.includes('stop') || message.includes('unsubscribe')) {
  return { intent: 'opt_out' };
}

if (message.includes('yes') || message.includes('interested') || message.includes('demo')) {
  return { intent: 'interested' };
}

if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
  return { intent: 'pricing' };
}

if (message.includes('no') || message.includes('not interested')) {
  return { intent: 'not_interested' };
}

return { intent: 'question' };
```

---

## Convex API Endpoints Needed

### 1. `/api/agentos/import-lead` (POST)
```json
{
  "closeId": "lead_xxx",
  "name": "John Smith",
  "phone": "+15551234567",
  "email": "john@email.com",
  "market": "Cleveland",
  "dealsPerYear": 25,
  "office": "Keller Williams"
}
```

### 2. `/api/agentos/due-leads` (GET)
Returns leads where `nextSendAt <= now` and `status = pending`

### 3. `/api/agentos/update-status` (POST)
```json
{
  "closeId": "lead_xxx",
  "status": "sent",
  "sequenceStep": 2,
  "lastSentAt": 1712345678,
  "nextSendAt": 1712432078
}
```

### 4. `/api/agentos/mark-replied` (POST)
```json
{
  "closeId": "lead_xxx",
  "reply": "Yes interested!",
  "intent": "interested"
}
```

---

## Sending Strategy

### Phase 1: A-List Test (Week 1)
- Filter: dealsPerYear > 25
- Volume: 500 agents
- Measure: Reply rate, opt-out rate, demo books

### Phase 2: B-List Scale (Week 2-3)
- Filter: dealsPerYear 10-25
- Volume: 2,000 agents
- Adjust messaging based on Phase 1

### Phase 3: Full List (Week 4+)
- All remaining agents
- Volume: 200-500/day
- 4-message sequence over 10 days

---

## Metrics Dashboard

Track in Convex:
- Total imported
- Pending (not yet contacted)
- Sent (awaiting reply)
- Replied (any response)
- Interested (positive reply)
- Booked (demo scheduled)
- Opted out (STOP)
- Not interested

---

## Close CRM Setup

### SMS Sending
- API: `POST /api/v1/activity/sms/`
- Credential: Use existing CrazyRE credential
- Phone: Need dedicated number for AgentSix

### Webhook for Replies
- Set up in Close CRM Settings → Webhooks
- Event: `sms.received`
- URL: `https://n8n.srv1236458.hstgr.cloud/webhook/agentos-sms-reply`

---

## Compliance Checklist

- [x] B2B texting (less restricted)
- [x] Existing contacts in CRM
- [x] Opt-out in every message
- [x] Clear identification (AgentSix)
- [x] Rate limiting (1/sec, 50/batch)
- [ ] DNC list check (add if needed)
- [ ] Quiet hours (8am-9pm local)

---

## Quick Start

1. Set up Convex schema + endpoints
2. Create WF-AOS-1 (import 500 A-list agents)
3. Create WF-AOS-2 (SMS sender)
4. Create WF-AOS-3 (response handler)
5. Test with 10 agents manually
6. Activate scheduled sender
7. Monitor and optimize
