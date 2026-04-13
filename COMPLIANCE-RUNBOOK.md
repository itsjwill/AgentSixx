# AgentSix v2: Compliance Runbook

> **Status:** Non-negotiable. Do not skip steps.  
> **Investment:** ~$10-12K Year 1, then ~$1,100/mo ongoing  
> **Philosophy:** One TCPA violation can kill the business

---

## Why This Matters

```
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                       ║
║   TCPA VIOLATION MATH:                                                               ║
║   ────────────────────                                                                ║
║                                                                                       ║
║   Average TCPA settlement: $500 - $1,500 PER TEXT                                    ║
║                                                                                       ║
║   At 10 clients sending 3,000 texts/month:                                           ║
║   One bad scrub = $1.5M - $4.5M in exposure                                          ║
║                                                                                       ║
║   The compliance stack isn't a cost center.                                          ║
║   It's the company's right to exist.                                                 ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## Step 1: Legal Foundation (Week 0)

**Timeline:** BEFORE any tech work

### LLC Setup
- [ ] File LLC in your state (or use existing)
- [ ] Get EIN from IRS (online, free, 15 min)
- [ ] Open business bank account
- [ ] Register DBA "AgentSix" if needed

### Customer Agreement
- [ ] Find real estate tech lawyer (not general business)
  - Budget: $2,500-5,000
  - Sources: r/realestateagents, GoLegal, Martindale
- [ ] Agreement must include:
  - Agent = "Caller of Record" (liability sits with agent)
  - Mutual indemnification
  - Class action waiver
  - Arbitration clause (AAA commercial rules)
  - Limitation of liability (12 months fees)
  - Agent attestation of legitimate business purpose
  - Agent agrees to provide only consented leads
  - Right to suspend on compliance violations
  - 90-day performance guarantee clause
  - Data ownership clarity
- [ ] Get reviewed by insurance broker before use
- [ ] Store signed copies in secure, redundant location

---

## Step 2: Insurance (Week 0-1)

**Timeline:** BEFORE first client contact

### Get Quotes
- [ ] Founder Shield (foundershield.com)
- [ ] Vouch (vouch.us)
- [ ] Embroker (embroker.com)

### Required Coverage
```
MINIMUM REQUIREMENTS:
─────────────────────
• $1M per claim minimum
• $2M aggregate minimum
• Specific TCPA endorsement (NOT generic E&O)
• Defense costs: inside limits OK, outside better

EXPECTED COST: $3,000 - $4,500/year

CRITICAL: Most Tech E&O policies EXCLUDE TCPA by default.
You MUST specifically request the TCPA endorsement
and confirm it IN WRITING.
```

### Actions
- [ ] Request TCPA endorsement explicitly
- [ ] Get written confirmation of coverage
- [ ] Bind policy BEFORE day 1 of client 1
- [ ] Save policy docs where you can find in 10 seconds

---

## Step 3: Twilio A2P 10DLC Registration (Week 1)

**Timeline:** Allow 5-7 days for carrier approval

### Per-Company Setup (One Time)
- [ ] Create Twilio account
- [ ] Register Twilio brand via Campaign Registry
  - EIN required
  - Business info
  - ~$4 one-time brand registration fee
- [ ] Wait for brand vetting (1-3 days)

### Per-Client Setup (Each Onboarding)
- [ ] Create A2P Campaign for the client
  - Use case: "Customer Care" + "Marketing" (dual approved)
  - Description: "Real estate lead follow-up and appointment scheduling"
  - Sample messages: 5-10 representative SMS
  - Opt-in method: "Website form with checkbox"
  - Opt-out handling: "Automatic STOP processing"
- [ ] Submit campaign for carrier approval (~3-5 days)
- [ ] On approval, assign Twilio numbers to campaign

### Costs
```
TWILIO A2P COSTS:
─────────────────
Brand registration: $4 (one-time)
Campaign registration: $15/month per campaign
SMS cost: $0.005-0.01 per message
Phone numbers: ~$1/month each
```

---

## Step 4: DNC Scrubbing Setup (Week 1)

### Vendor: Contact Center Compliance
- Website: dnccompliance.com
- Plan: Unlimited (~$200/mo)
- Coverage: Federal DNC, all 50 state DNCs, DMA, wireless
- API access included

### Setup Steps
- [ ] Subscribe to Contact Center Compliance
- [ ] Get API credentials
- [ ] Build n8n HTTP Request node to call scrub API
- [ ] Cache scrub results for 24 hours (reduce API calls)
- [ ] Force re-scrub for any outbound > 24 hours after last check

### Alternative Vendor
The Real DNC (similar pricing, similar coverage)

---

## Step 5: Litigator List Subscription (Week 1)

### Vendor: Blacklist Alliance
- Website: blacklistalliance.com
- Plan: Base (~$500/mo)
- Includes: Known TCPA litigators, serial plaintiffs, flagged numbers
- API access included

### Setup Steps
- [ ] Subscribe to Blacklist Alliance
- [ ] Get API credentials
- [ ] Build n8n HTTP Request node for litigator check
- [ ] Cache results permanently (litigators don't stop being litigators)
- [ ] Run check BEFORE any outbound, no exceptions

---

## Step 6: Consent Landing Page (Week 1-2)

### URL Structure
`[slug].agentos.com` or `agentos.com/[slug]`

### Required Page Elements
- [ ] Agent photo and name prominently displayed
- [ ] Clear consent description (see below)
- [ ] Checkbox, NOT pre-checked
- [ ] Name, phone, email fields
- [ ] Property interest (optional)
- [ ] Submit captures: timestamp, IP address, user agent, exact text shown
- [ ] On submit: write to `consent_records` table
- [ ] Immediate confirmation screen

### Required Consent Language
```
"By providing your phone number and clicking Submit, you consent 
to receive automated text messages and/or calls from [Agent Name] 
and their assistant about real estate services, including 
properties, market updates, and appointments. Message frequency 
varies. Message and data rates may apply. Reply STOP to cancel 
anytime. Reply HELP for help. Consent is not a condition of 
purchase. Privacy policy: [link]. Terms: [link]."
```

**CRITICAL:** This language must match TCPA "prior express written consent" standard. Have your lawyer review it.

---

## Step 7: Opt-Out Automation (Week 2)

### Twilio Configuration
- [ ] Configure Twilio to auto-respond to STOP:
  ```
  "You've been unsubscribed from [Agent Name]'s messages. 
  No further messages will be sent. Reply START to resubscribe."
  ```

### Workflow (WF-05)
- [ ] Update consent_records.revokedAt
- [ ] Add to internal DNC
- [ ] Stop all scheduled workflows for this phone
- [ ] Must complete within 10 seconds

### Testing
- [ ] Send STOP from real phone
- [ ] Verify confirmation message received
- [ ] Verify all downstream stops
- [ ] Verify no further messages sent

---

## Step 8: Quiet Hours Enforcement (Week 2)

### Rules
```
QUIET HOURS:
────────────
• Before 8am local time: BLOCKED
• After 9pm local time: BLOCKED
• Sundays: BLOCKED (configurable)
• Federal holidays: BLOCKED (maintain list manually)
• Saturdays: OK by default (configurable)
```

### Implementation
- [ ] Lead's phone or address → state → timezone
- [ ] Before any outbound, check current time in lead's timezone
- [ ] Block if outside allowed hours
- [ ] Log all quiet hours blocks to compliance_checks

---

## Step 9: Record Retention (Ongoing)

### Retention Requirements
```
TCPA STATUTE OF LIMITATIONS: 4 YEARS

RETAIN FOR 4 YEARS:
───────────────────
• consent_records (all fields)
• compliance_checks (all checks)
• messages (all SMS/email)
• calls (transcripts; audio can be shorter)
```

### Backup Strategy
- [ ] Quarterly backup to S3 Glacier (cheap cold storage)
- [ ] Document retention policy in writing
- [ ] Be ready to produce records within 30 days of any legal request

---

## Step 10: Monthly Compliance Audit

Run this checklist every month:

### Active Clients Check
- [ ] All active clients have active A2P campaigns
- [ ] All A2P campaigns are approved and functioning
- [ ] No campaign suspensions or warnings

### Consent Records Check
- [ ] All consent records have complete fields (no nulls in required)
- [ ] New opt-ins have valid timestamps and consent text
- [ ] Revocations properly timestamped

### Outbound Compliance Check
- [ ] Query: No outbound messages sent outside quiet hours
- [ ] Query: No outbound to numbers on DNC without override
- [ ] Query: All STOP requests processed within 10 seconds

### Insurance & Legal Check
- [ ] Insurance policy active
- [ ] TCPA endorsement in force (verify with broker annually)
- [ ] Customer agreements signed for all active clients

### Litigator List Check
- [ ] Blacklist Alliance subscription current
- [ ] Last sync within 7 days

---

## Compliance Incident Response

### If Someone Complains to Carrier or FCC

**IMMEDIATE (within 1 hour):**
1. PAUSE all outbound for the affected client
2. Pull complete audit trail for the phone number
3. Document everything

**WITHIN 24 HOURS:**
4. Contact your lawyer
5. Contact your insurance broker
6. Do NOT respond to complainant until lawyer advises

**WITHIN 48 HOURS:**
7. Review whether other clients have same risk
8. Consider pausing similar campaigns if systemic

### If You Receive a Lawyer Letter

1. Do NOT respond directly
2. Forward to your lawyer immediately
3. Pull all records for the phone number
4. Contact insurance broker
5. Follow lawyer's guidance exactly

---

## Cost Summary

```
YEAR 1 COMPLIANCE INVESTMENT:
═════════════════════════════

ONE-TIME:
─────────
Customer agreement (lawyer)      $2,500 - $5,000
Twilio brand registration        $4
Insurance (first year)           $3,000 - $4,500
────────────────────────────────────────────────
TOTAL ONE-TIME                   $5,504 - $9,504

MONTHLY ONGOING:
────────────────
Contact Center Compliance (DNC)  $200
Blacklist Alliance (litigator)   $500
Twilio A2P (per client)          $15-50
Insurance (amortized)            $250-375
────────────────────────────────────────────────
TOTAL MONTHLY                    $965 - $1,125

AMORTIZED ACROSS 10 CLIENTS:     ~$110/client/month
```

---

## Quick Reference: What to Check Before ANY Outbound

```
BEFORE SENDING ANY SMS OR MAKING ANY CALL:
══════════════════════════════════════════

1. ☐ Is there a valid consent record for this phone?
2. ☐ Has the consent been revoked?
3. ☐ Is the phone on federal DNC?
4. ☐ Is the phone on state DNC?
5. ☐ Is the phone on the litigator list?
6. ☐ Is the phone on our internal DNC?
7. ☐ Is it within quiet hours (8am-9pm local)?
8. ☐ Is it a Sunday or federal holiday?

ALL MUST PASS. ONE FAILURE = BLOCK.
```

---

*Compliance runbook for AgentSix v2. This document is non-negotiable.*
