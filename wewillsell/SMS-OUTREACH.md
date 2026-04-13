# AgentSix SMS Outreach Plan - Direct to 3000+ Agents

## Compliance First (Practice What We Preach!)

### Why It's OK to Text Them:
- B2B texting (business to business) = less restricted than B2C
- They're existing contacts in your CRM = prior relationship
- Real estate agents = business owners, not consumers
- Include opt-out in every message = covered

### Every SMS Must Have:
- Clear identification (who you are)
- Value/reason for contact
- Opt-out option (Reply STOP)

---

## SMS Sequence (4 messages over 10 days)

### SMS 1: Hook (Day 1)
```
Hey {{first_name}}, quick question - how fast do you respond to leads at 9pm on a Saturday?

We built an AI that responds in 5 seconds, 24/7, and books appointments while you sleep.

Agents using it are getting 15-25 extra appointments/month.

Want a 10-min demo? 

Reply YES or check it out: {{demo_link}}

- {{your_name}}, AgentSix

Reply STOP to opt out
```
**Character count: ~320 (will send as 2 SMS)**

### SMS 2: Social Proof (Day 3) - Only if no reply
```
{{first_name}} - Sarah from KW Phoenix switched from a $3,500/mo ISA to AgentSix.

Result: 23 appointments/month, 5-second response time, 1/3 the cost.

"It actually performs BETTER than my human ISA"

Worth 10 min to see how? {{demo_link}}

Reply STOP to opt out
```

### SMS 3: Pain Point (Day 6) - Only if no reply
```
{{first_name}}, did you know 78% of buyers go with the FIRST agent who responds?

Average agent takes 47 hours. 

AgentSix responds in 5 seconds. Every time. Even at 3am.

Quick demo? {{demo_link}}

Reply STOP to opt out
```

### SMS 4: Last Chance (Day 10) - Only if no reply
```
Last msg {{first_name}} - 

AgentSix beta pricing ends Friday:
- $0 setup (normally $2,500)
- 30% off monthly

Only taking 10 more beta partners.

Interested? Reply YES or book here: {{demo_link}}

Reply STOP to opt out
```

---

## Quick 1-Liner Versions (Higher Response)

Sometimes shorter = better. Test these:

### Version A: Question Hook
```
{{first_name}} - what if every lead got a response in 5 seconds, even at 2am? 

That's AgentSix. Quick demo? {{link}}

Reply STOP to opt out
```

### Version B: Direct Benefit
```
{{first_name}} - agents using AgentSix are booking 20+ extra appointments/month with AI.

Want to see how? {{link}}

Reply STOP to opt out
```

### Version C: Curiosity
```
{{first_name}} - heard of agents replacing their $3k/mo ISA with AI?

Booking MORE appointments at 1/3 the cost.

2-min video: {{link}}

Reply STOP to opt out
```

### Version D: Fear/FOMO
```
{{first_name}} - a Florida agent got hit with a $54k TCPA lawsuit for texting a DNC lead.

AgentSix has 8-layer protection + $2M insurance.

See how: {{link}}

Reply STOP to opt out
```

---

## Response Handling

### If they reply "YES" or interested:
```
Awesome {{first_name}}! 🔥

Here's my calendar - pick any time that works:
{{calendly_link}}

Or I can call you in 5 min if you're free now?
```

### If they reply with a question:
```
Great question! [Answer their question]

Want me to show you on a quick call? Takes 10 min.

{{calendly_link}}
```

### If they reply "STOP":
```
No problem {{first_name}}, you're removed. 

If you ever need AI lead response in the future, we're here.

Take care!
```
**Then immediately remove from list in Close CRM**

### If they reply "Not interested":
```
Got it {{first_name}}, appreciate you letting me know.

Mind if I ask - is it timing, price, or you're happy with current setup?

Either way, no more msgs from me. 👍
```

### If they reply "Too expensive":
```
Totally get it {{first_name}}.

Quick math though - if AgentSix books just 2 extra deals/year, that's $15-20k commission vs $10k cost.

We also have a Starter plan at $497/mo.

Worth a quick look? No pressure either way.
```

---

## Sending Strategy

### Batch Sending (Don't Blast All at Once!)
| Day | Segment | Volume |
|-----|---------|--------|
| Day 1 | A-List (top agents) | 200 |
| Day 2 | A-List continued | 200 |
| Day 3 | B-List | 300 |
| Day 4 | B-List continued | 300 |
| Day 5-7 | Pause - handle responses | - |
| Day 8+ | C-List if results good | 500/day |

### Best Times to Send
- **Tuesday-Thursday**: Best response
- **10am-12pm**: Agents checking phone between showings
- **7pm-8pm**: After work, scrolling phone

### Avoid
- Monday morning (busy)
- Friday afternoon (checked out)
- Weekends (unless testing)

---

## Close CRM Setup

### Smart View for Outreach:
```
Filter:
- Status: Active
- Has Phone: Yes
- Tag: NOT "agentsix-contacted"
- Tag: NOT "opted-out"

Sort by: Deal volume (highest first)
```

### After Each Send:
1. Add tag "agentsix-sms-1" (or 2, 3, 4)
2. Log activity in Close CRM
3. Track replies

### After Opt-Out:
1. Add tag "opted-out"
2. Add to DNC list
3. Never contact again

---

## Tracking Spreadsheet

| Metric | Target | Actual |
|--------|--------|--------|
| SMS Sent | 3,000 | |
| Delivery Rate | >95% | |
| Reply Rate | >10% | |
| Positive Reply | >5% | |
| Demo Booked | >3% | |
| Demo Taken | >70% of booked | |
| Closed | >30% of demo | |

### Expected Results:
```
3,000 SMS sent
  → 300 replies (10%)
  → 150 interested (5%)
  → 90 demos booked (3%)
  → 63 demos taken (70%)
  → 19-25 sales (30%)
  → $17,000-22,000 MRR
```

---

## Tools for SMS Blasting

### Option 1: Close CRM Built-in SMS
- Already have it
- Logs automatically
- Good for <500/day

### Option 2: Twilio + n8n
- Higher volume
- Cheaper per SMS
- Can automate sequences

### Option 3: Instantly.ai SMS
- Built for outreach
- Auto follow-up
- Analytics

---

## A/B Test Plan

### Week 1: Test Message Variants
- Send Version A to 100 agents
- Send Version B to 100 agents
- Send Version C to 100 agents
- Send Version D to 100 agents

### Measure:
- Reply rate
- Positive reply rate
- Demo book rate

### Week 2: Scale Winner
- Take best performing message
- Send to remaining 2,600 agents

---

## Sample Conversation Flow

```
YOU: Hey Mike, quick question - how fast do you respond to leads at 9pm on a Saturday?

We built an AI that responds in 5 seconds, 24/7. Agents getting 20+ extra appointments/mo.

Quick demo? agentsix.com/demo

Reply STOP to opt out

MIKE: How much is it?

YOU: Great question Mike! 

Starter is $497/mo, Pro is $897/mo. Most agents go Pro for unlimited leads.

Compare that to a $3-4k/mo ISA that sleeps at night 😅

Want me to show you how it works? Takes 10 min.

MIKE: Sure, tomorrow work?

YOU: Perfect! Here's my calendar - grab any slot:
calendly.com/agentsix/demo

Talk tomorrow! 🔥

MIKE: Booked for 2pm

YOU: Got it - see you at 2pm tomorrow Mike. 

I'll show you exactly how it books appointments while you sleep.

Any specific questions you want me to cover?
```

---

## Quick Start

1. [ ] Deploy demo site (get link)
2. [ ] Create Calendly for demo booking
3. [ ] Segment Close CRM (A/B/C list)
4. [ ] Send first 100 SMS (A-List only)
5. [ ] Handle replies same day
6. [ ] Book demos
7. [ ] Take demos, close deals
8. [ ] Scale based on results
