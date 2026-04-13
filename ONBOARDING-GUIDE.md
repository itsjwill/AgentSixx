# AgentSix v2 - Complete Onboarding Guide

> **Done-For-You AI Outreach System for Real Estate Agents**
> 
> This document covers everything needed to onboard a new agent from signup to go-live.

---

## Table of Contents

1. [Overview](#overview)
2. [What to Collect from Agent](#what-to-collect-from-agent)
3. [Common Agent Questions & Answers](#common-agent-questions--answers)
4. [Technical Setup Process](#technical-setup-process)
5. [Onboarding Timeline](#onboarding-timeline)
6. [Templates & Scripts](#templates--scripts)
7. [Red Flags & Disqualifiers](#red-flags--disqualifiers)
8. [Post-Launch Support](#post-launch-support)

---

## Overview

### What We Deliver

| Feature | Description |
|---------|-------------|
| **AI Voice Outreach** | 6-call sequence over 17 days, voicemail drops, live transfer |
| **Instant Lead Response** | AI responds to SMS/email within seconds |
| **Follow-up SMS Sequence** | Automated text follow-ups after calls |
| **Appointment Booking** | AI qualifies leads and books directly to agent's calendar |
| **Compliance Infrastructure** | 8-layer TCPA protection |
| **Dashboard Access** | View-only access to leads, appointments, analytics |
| **Slack War Room** | 15-minute SLA support channel |

### Service Model

```
THIS IS DONE-FOR-YOU (DFY), NOT SAAS

Agent CAN:
├── View dashboard (leads, appointments, analytics)
├── Click-to-call/text/email leads manually
├── Mark leads as DNC
├── Send lead lists via Slack
└── View call recordings & transcripts

Agent CANNOT:
├── Edit AI scripts or prompts
├── Configure workflows
├── Upload leads directly
├── Change system settings
└── Access backend systems

WE HANDLE:
├── All technical setup
├── Lead list processing
├── AI configuration
├── Compliance management
├── Ongoing optimization
└── Support & troubleshooting
```

---

## What to Collect from Agent

### Required Information

#### 1. Basic Business Information

| Field | Description | Example |
|-------|-------------|---------|
| Full Legal Name | For contracts & compliance | John Michael Smith |
| Brokerage Name | Company affiliation | Keller Williams Phoenix |
| Real Estate License # | State license number | SA123456789 |
| License State(s) | Where they can operate | AZ, CA, NV |
| Business Email | Primary contact | john@kwphoenix.com |
| Mobile Phone | Backup contact & transfers | (602) 555-1234 |
| Business Address | For compliance records | 123 Main St, Phoenix AZ 85001 |

#### 2. Calendar & Availability

| Field | Description | Options |
|-------|-------------|---------|
| Calendar Platform | For integration | Google Calendar / Outlook / Calendly |
| Calendar Access | OAuth or invite | Agent grants access via link |
| Working Days | When AI can book | Mon-Fri / Mon-Sat / Custom |
| Working Hours | Available times | 9am-6pm (their timezone) |
| Appointment Duration | Default meeting length | 15min / 30min / 1 hour |
| Buffer Time | Gap between meetings | 0 / 15min / 30min |
| Timezone | For correct scheduling | America/Phoenix |
| Blackout Dates | Days to never book | Holidays, vacations |

#### 3. Lead Information

| Field | Description | Example |
|-------|-------------|---------|
| Primary Lead Source | Where leads come from | Zillow, Facebook, Realtor.com |
| Lead Type | Buyer, seller, or both | Buyer leads |
| Average Monthly Leads | Volume estimation | 50-100 leads/month |
| First Lead List | CSV/Sheet to start | [Google Sheet link] |
| Lead Quality Notes | Any context | "These are cold, never contacted" |

**Required Lead List Columns:**
```
first_name (required)
last_name (required)
phone (required)
email (optional but recommended)
address (optional)
lead_source (optional)
notes (optional)
```

#### 4. Phone Setup Preferences

| Option | Description | Timeline |
|--------|-------------|----------|
| **New System Number** | We provide local number | Instant (recommended to start) |
| **Port Existing Number** | Transfer their number to us | 2-4 weeks |
| **Area Code Preference** | Match their market | 602 for Phoenix, 480 for Scottsdale |

#### 5. Voice & Script Preferences

| Field | Options | Default |
|-------|---------|---------|
| AI Voice Gender | Male / Female | Female |
| AI Name | Laura, Mike, Sarah, custom | Laura |
| Tone | Professional / Friendly / Casual | Friendly-Professional |
| Specialty Mention | What they're known for | "I specialize in first-time homebuyers" |
| Unique Selling Point | Why choose them | "20 years experience in Phoenix" |
| Call-to-Action | What AI pushes toward | "Schedule a quick 15-minute call" |

#### 6. Compliance Requirements

| Field | Description | Action |
|-------|-------------|--------|
| Internal DNC List | Numbers to never call | Agent provides list |
| Calling Hours Override | Custom quiet hours | Default: 9am-8pm local |
| Consent Acknowledgment | Legal sign-off | Agent signs compliance agreement |
| Recording Disclosure Preference | How AI discloses | Default: "This call may be recorded" |

### Optional (Nice to Have)

| Field | Use Case |
|-------|----------|
| Company Logo (PNG/SVG) | Dashboard branding |
| Agent Headshot | Email signatures |
| Brand Colors (Hex) | UI customization |
| Email Signature HTML | For AI emails |
| Voicemail Script | Custom voicemail message |

---

## Common Agent Questions & Answers

### Setup & Getting Started

| Question | Answer |
|----------|--------|
| **"How long until I'm live?"** | 24-48 hours after you send us all required information and your first lead list. |
| **"Do I need to install any software?"** | No. Everything is web-based. Just login to your dashboard from any browser. |
| **"Do I need to learn anything technical?"** | No. We handle all the technical stuff. You just check your dashboard and show up to appointments. |
| **"Can I use my existing phone number?"** | Yes, but it takes 2-4 weeks to port. We recommend starting with a system number immediately, then porting yours later if you want. |
| **"What if I use a different CRM?"** | We use Close CRM as our backend. Your leads sync there automatically. You just use the dashboard we provide. |
| **"Can my assistant access the dashboard?"** | Yes, we can create additional login credentials for team members. |

### AI Calling

| Question | Answer |
|----------|--------|
| **"How does the AI actually sound?"** | Very human-like and natural. We use the latest voice AI technology. Would you like to hear a sample call? |
| **"Will people know it's AI?"** | Some might guess, but most don't. The AI is trained to have natural conversations and handle questions smoothly. |
| **"What if someone asks to speak to a real person?"** | The AI immediately offers to transfer them to you. If you're available, it's a live transfer. If not, it books a callback. |
| **"What times do calls go out?"** | Only during business hours in the lead's timezone: Mon-Fri 9am-6pm, Sat 9am-1pm. We also respect state-specific quiet hours. |
| **"How many calls per day?"** | Based on your plan: Starter = 50/day, Pro = 150/day, Growth = 500/day. |
| **"What if AI reaches a wrong number?"** | The AI apologizes, marks it as wrong number, and it's automatically removed. That number is never called again. |
| **"Does AI leave voicemails?"** | Yes, a professional voicemail is left every time. We have 6 different voicemail scripts to keep it fresh across the sequence. |
| **"What's the 6-call sequence?"** | Day 1, Day 3, Day 5, Day 8, Day 12, Day 17. Persistent but not annoying. Statistically, most conversions happen between calls 4-6. |

### Lead Management

| Question | Answer |
|----------|--------|
| **"How do I add new leads?"** | Send a CSV or Google Sheet to your Slack war room. We process and upload within 2 hours during business hours. |
| **"Can I upload leads myself?"** | Not directly. This ensures quality control and compliance. Just send us the list and we handle it. |
| **"How do I remove a lead or stop calls?"** | Click "Mark DNC" next to any lead in your dashboard. It's instant and permanent. |
| **"Can I see call recordings?"** | Yes, every call is recorded. Click any call in your dashboard to listen to the full recording and read the transcript. |
| **"What if a lead says 'don't call me'?"** | The AI immediately apologizes, ends the call politely, and auto-marks them as DNC. They're added to our permanent block list. |
| **"Can I add notes to leads?"** | Yes, you can add notes in the lead detail view. We can also see these notes for context. |

### Appointments & Calendar

| Question | Answer |
|----------|--------|
| **"How does appointment booking work?"** | The AI checks your connected calendar for available slots, offers times to the lead, and books directly. You get an instant notification. |
| **"What if the AI books a bad time?"** | You can reschedule or cancel in your dashboard. The AI automatically notifies the lead and offers new times. |
| **"Do I get reminders?"** | Yes, you get email + SMS reminders 24 hours before and 1 hour before each appointment. |
| **"What if I need to cancel last minute?"** | Cancel in dashboard, AI sends a polite reschedule message to the lead with new available times. |
| **"Can the AI book on weekends?"** | Only if you set weekend availability in your calendar settings. Default is Mon-Fri only. |
| **"What info is on the calendar invite?"** | Lead name, phone, email, lead source, and a summary of what they're looking for (if discussed on call). |

### Compliance & Legal

| Question | Answer |
|----------|--------|
| **"Will I get sued for these calls?"** | We have 8 layers of compliance protection: Federal DNC scrub, State DNC scrub, TCPA litigator list removal, Quiet hours enforcement, 10DLC SMS registration, Consent tracking, Call recording disclosure, Instant opt-out handling. This is enterprise-grade compliance. |
| **"What about the Do Not Call list?"** | We scrub every lead against both Federal and State DNC registries before any call is made. |
| **"Is AI calling legal?"** | Yes, when done correctly with proper compliance. We handle all of this for you. |
| **"What if someone files a complaint?"** | We maintain complete documentation: consent records, call recordings, DNC checks, and timestamps. We've got your back. |
| **"Do you comply with state-specific laws?"** | Yes. Different states have different rules (like California's stricter requirements). Our system automatically adjusts. |

### Results & Expectations

| Question | Answer |
|----------|--------|
| **"When will I see results?"** | Most agents see their first appointments within 48-72 hours of going live. |
| **"What's a typical conversion rate?"** | 5-15% of leads book appointments, depending on lead quality and source. Zillow leads typically convert higher than cold lists. |
| **"Can I see my stats?"** | Yes, your dashboard shows: calls made, connect rate, appointments booked, conversion rate, and more. |
| **"What if I'm not getting results?"** | Message us in Slack. We'll analyze your calls, check lead quality, and optimize. That's what we're here for. |
| **"How do you measure ROI?"** | We track cost per appointment. If your plan is $597/month and you get 10 appointments, that's $59.70 per appointment. One closing covers months of service. |

### Billing & Account

| Question | Answer |
|----------|--------|
| **"What's included in my plan?"** | AI calls (based on tier), SMS follow-ups, instant response, compliance, dashboard, Slack support, call recordings, and analytics. |
| **"Are there any hidden fees?"** | No. Voice minutes are included in your plan. The only extra cost would be if you exceed your monthly call limit. |
| **"What if I run out of minutes?"** | We notify you at 80% usage. You can upgrade your plan or purchase additional minutes. |
| **"Can I upgrade/downgrade my plan?"** | Yes, anytime. Changes take effect on your next billing cycle. |
| **"Can I cancel?"** | Yes, cancel anytime. We offer a 30-day money-back guarantee on your subscription (setup fee is non-refundable). |
| **"What happens to my data if I cancel?"** | You can export all your leads and call recordings. We retain data for 30 days after cancellation, then it's deleted. |

### Technical / Troubleshooting

| Question | Answer |
|----------|--------|
| **"The dashboard isn't loading"** | Try refreshing or clearing cache. If it persists, message Slack and we'll fix within 15 minutes. |
| **"I'm not getting notifications"** | Check your email spam folder. Also confirm your notification settings in Dashboard > Settings > Notifications. |
| **"A call went to someone who shouldn't be called"** | Send us the details in Slack. We'll investigate, add to DNC, and find how they got through our filters. |
| **"Calendar isn't syncing"** | Usually a permission issue. We'll send a new calendar connection link to re-authorize. |
| **"I want to change my AI's voice/script"** | Message us in Slack with what you'd like changed. We'll update within 24 hours. |

---

## Technical Setup Process

### Our Internal Checklist

#### Day 1 - Account Setup

```
□ Create Close CRM workspace
  - New workspace or sub-account
  - Custom fields configured
  - Pipeline stages set up

□ Create Convex agent record
  - agentId generated
  - Profile data stored
  - Settings configured

□ Create dashboard login
  - Generate credentials
  - Send welcome email
  - Verify access works

□ Set up phone number
  - Option A: Provision new Twilio number (instant)
  - Option B: Initiate port request (2-4 weeks)
  - Register for 10DLC compliance

□ Create Slack channel
  - #agent-[name]-war-room
  - Add agent + internal team
  - Post welcome message
```

#### Day 1-2 - Integrations

```
□ Connect calendar
  - Send OAuth link to agent
  - Verify connection successful
  - Test availability check

□ Configure Retell AI agent
  - Clone base agent template
  - Update agent name
  - Insert agent-specific details into prompt
  - Set voice preferences
  - Configure tools (transfer number, etc.)

□ Set up n8n workflows
  - Clone workflow templates
  - Update agent-specific variables
  - Connect to agent's Close CRM workspace
  - Test webhook endpoints

□ Configure notifications
  - Email notifications (new appointment, etc.)
  - SMS notifications (optional)
  - Slack alerts to war room
```

#### Day 2 - Lead Import

```
□ Receive lead list from agent
  - Verify required columns present
  - Check for obvious issues

□ Clean and validate data
  - Standardize phone format
  - Remove duplicates
  - Flag invalid entries

□ Compliance scrub
  - Federal DNC check
  - State DNC check
  - TCPA litigator list check
  - Internal DNC check

□ Import to Close CRM
  - Map fields correctly
  - Verify import success
  - Spot check random leads

□ Mark ready for calling
  - Set status to "New"
  - Set sequence position to 1
  - Verify in dashboard
```

#### Day 2 - Testing

```
□ Test call to agent
  - Call agent's personal phone
  - Agent hears AI voice
  - Agent approves voice/script

□ Test appointment booking
  - AI checks calendar
  - Books test appointment
  - Agent receives notification
  - Calendar event appears

□ Test SMS response
  - Send test SMS to system
  - AI responds appropriately
  - Conversation visible in dashboard

□ Test live transfer
  - AI initiates transfer
  - Agent's phone rings
  - Call connected successfully

□ Final agent approval
  - Agent confirms everything works
  - Any last script tweaks
  - Green light to go live
```

#### Day 3 - Go Live

```
□ Activate calling workflows
  - Enable WF-OB-1 (first calls)
  - Enable WF-OB-1B (follow-ups)
  - Verify schedules correct

□ Monitor first batch
  - Watch first 5-10 calls
  - Check for any issues
  - Verify outcomes routing correctly

□ Report to agent
  - Send "You're Live!" message
  - Share first call stats
  - Remind about Slack support

□ Set up ongoing monitoring
  - Daily stats check
  - Weekly optimization review
  - Monthly performance report
```

---

## Onboarding Timeline

### Standard Timeline (24-48 Hours)

```
HOUR 0: Agent Signs Up
         ├── Receives welcome email
         ├── Receives onboarding checklist
         └── Invited to Slack channel

HOURS 1-4: Agent Sends Info
         ├── Basic information
         ├── Calendar access granted
         └── First lead list sent

HOURS 4-12: We Set Up
         ├── Close CRM workspace created
         ├── Dashboard login sent
         ├── Phone number provisioned
         ├── Retell agent configured
         └── Workflows deployed

HOURS 12-20: Lead Processing
         ├── Lead list cleaned
         ├── Compliance scrub complete
         ├── Leads imported
         └── Ready for calling

HOURS 20-24: Testing
         ├── Test call to agent
         ├── Agent approves AI
         ├── Test booking works
         └── Final sign-off

HOUR 24-48: GO LIVE
         ├── Calling activated
         ├── First calls going out
         ├── Agent monitoring dashboard
         └── Appointments starting to book!
```

### If Agent Wants to Port Their Number

```
WEEK 1: Standard onboarding with temporary system number
WEEK 2-3: Port request processing
WEEK 4: Number ported, switched to agent's number
```

---

## Templates & Scripts

### Welcome Email Template

```
Subject: Welcome to AgentSix - Let's Get You Live! 🏠

Hi [AGENT NAME],

Welcome aboard! We're excited to help you automate your lead follow-up and book more appointments.

Here's what happens next:

STEP 1: Send Us Your Info (Today)
Reply to this email or send in Slack:
- Your real estate license number
- State(s) you're licensed in
- Preferred times for appointments (e.g., Mon-Fri 9am-5pm)

STEP 2: Connect Your Calendar (2 minutes)
Click here to connect: [CALENDAR_OAUTH_LINK]

STEP 3: Send Your First Lead List
Drop a CSV or Google Sheet link in your Slack channel with:
- First name, Last name, Phone number (required)
- Email, Address, Notes (optional)

STEP 4: Approve Your AI Voice (We'll call you)
We'll call your cell phone so you can hear your AI agent.
Let us know if you want any tweaks to the script or voice.

STEP 5: Go Live! 🚀
Once you approve, we flip the switch and your AI starts calling.

Your Slack War Room: [SLACK_CHANNEL_LINK]
Your Dashboard: [DASHBOARD_LINK]

Timeline: 24-48 hours from when you send everything.

Questions? Just message us in Slack - we respond within 15 minutes.

Let's get you some appointments!

The AgentSix Team
```

### Onboarding Checklist (Send to Agent)

```
===========================================
AGENTOS ONBOARDING CHECKLIST
===========================================

Hi [AGENT NAME]! Please send us the following:

REQUIRED (Need these to go live):
□ Full legal name
□ Brokerage name
□ Real estate license number
□ State(s) you're licensed in
□ Mobile phone number
□ Timezone
□ Available hours for appointments (e.g., Mon-Fri 9am-5pm)
□ Calendar access (click link we sent)
□ First lead list (CSV or Google Sheet)

LEAD LIST FORMAT:
Your list should have these columns:
- first_name (required)
- last_name (required)
- phone (required)
- email (optional)
- address (optional)
- notes (optional)

QUESTIONS TO ANSWER:
□ What's your main lead source? (Zillow, Facebook, etc.)
□ Buyer leads, seller leads, or both?
□ Any numbers that should NEVER be called? (your internal DNC)
□ Do you want a male or female AI voice?
□ Any special script instructions?

OPTIONAL:
□ Your logo (PNG or SVG)
□ Your headshot
□ Preferred area code for your AI phone number

Send everything to: [SLACK_CHANNEL] or reply to this email

Questions? We respond in Slack within 15 minutes!
===========================================
```

### Go Live Message

```
🚀 [AGENT NAME] - YOU'RE LIVE!

Your AI agent is now calling your leads.

WHAT'S HAPPENING:
- [X] leads loaded and ready
- Calls going out Mon-Fri 9am-6pm, Sat 9am-1pm
- 6-call sequence over 17 days
- Appointments book directly to your calendar

WHAT TO DO:
1. Keep an eye on your dashboard: [DASHBOARD_LINK]
2. When you get an appointment notification - show up and close!
3. Send us new leads anytime via this Slack channel
4. Questions? Message here - 15 min response time

FIRST 48 HOURS:
We're closely monitoring your calls. If we see anything to optimize, we'll handle it.

Let's book some appointments! 📅
```

### Weekly Report Template

```
===========================================
WEEKLY PERFORMANCE REPORT
[AGENT NAME] | Week of [DATE]
===========================================

CALLS:
- Total calls made: [X]
- Connected: [X] ([X]%)
- Voicemails: [X]
- No answer: [X]

RESULTS:
- Appointments booked: [X]
- Hot leads: [X]
- Callbacks scheduled: [X]
- Not interested: [X]
- DNC requests: [X]

CONVERSION:
- Lead → Appointment: [X]%
- Cost per appointment: $[X]

SEQUENCE PROGRESS:
- Call 1: [X] leads
- Call 2-3: [X] leads
- Call 4-6: [X] leads
- Completed sequence: [X] leads

RECOMMENDATIONS:
[Any optimization suggestions]

Questions? Reply in Slack!
===========================================
```

---

## Red Flags & Disqualifiers

### Red Flags During Sales/Onboarding

| Red Flag | What It Means | How to Handle |
|----------|---------------|---------------|
| "I only have 5-10 leads" | Not enough volume to see results | Require minimum 50 leads to start. Explain statistics. |
| "Can the AI close deals for me?" | Wrong expectations | Clarify: AI books appointments, agent closes. This is lead nurture, not replacement. |
| "I want to control everything myself" | Wants SaaS, not DFY | Explain our model. If they insist, they're not a fit. |
| "I don't care about compliance" | Liability risk for us | Hard requirement. Refuse service if they won't comply. |
| "Can you guarantee 20 appointments?" | Unrealistic expectations | Never guarantee numbers. Explain variables (lead quality, market, etc.) |
| "I'll sue if this doesn't work" | Problematic client | Do not onboard. Refund and walk away. |
| "Can I pay monthly with no commitment?" | May churn quickly | Our model is monthly, but set expectations about ramp-up time (2-4 weeks to optimize). |
| "My last 3 vendors failed me" | Serial complainer | Dig deeper. If it's always someone else's fault, they'll blame you too. |

### Disqualifiers (Do Not Onboard)

| Situation | Reason | Action |
|-----------|--------|--------|
| No real estate license | Legal/compliance risk | Require valid license |
| Explicitly wants to spam | Compliance violation | Refuse service |
| Abusive in communications | Support nightmare | Refund and decline |
| Asking for illegal modifications | Risk to business | Refuse service |
| Won't sign compliance agreement | Can't protect ourselves | Require signature or no service |
| Bad reviews about scamming | Reputation risk | Research and decline if true |

### Yellow Flags (Proceed with Caution)

| Yellow Flag | What It Means | Mitigation |
|-------------|---------------|------------|
| "I've never used a CRM" | May need extra hand-holding | Allocate more onboarding support |
| "I'm not very tech-savvy" | May struggle with dashboard | Offer extra training call |
| "My broker might not approve" | Could cancel after setup | Confirm broker approval before starting |
| "I want to start but not for 2 months" | May forget or change mind | Take deposit to hold, stay in touch |
| Very small market | Limited lead volume | Set realistic expectations |

---

## Post-Launch Support

### Slack War Room Protocol

```
RESPONSE TIME SLA:
- During business hours (9am-6pm ET): 15 minutes
- After hours: Next business day (urgent = 2 hours)

WHAT WE HANDLE IN SLACK:
- New lead list uploads
- Script change requests
- Question answering
- Issue troubleshooting
- Performance questions

ESCALATION PATH:
1. First response from support team
2. Technical issues → Engineering
3. Billing issues → Account manager
4. Complaints → Founder/leadership
```

### Common Support Requests

| Request | How to Handle | Turnaround |
|---------|---------------|------------|
| "Upload these new leads" | Process CSV, scrub, import | 2 hours |
| "Change my AI's script" | Update Retell prompt | 24 hours |
| "Why aren't calls going out?" | Check workflows, lead status | 15 minutes |
| "I want to pause calling" | Disable workflows | Immediate |
| "Resume calling" | Re-enable workflows | Immediate |
| "Add this number to DNC" | Add to internal DNC list | Immediate |
| "I want to hear a call" | Send recording link | 15 minutes |
| "Why did AI say X?" | Review transcript, explain | 1 hour |

### Weekly Health Check (Internal)

```
EVERY MONDAY - CHECK EACH ACTIVE AGENT:

□ Calls going out as scheduled?
□ Connect rate healthy (>40%)?
□ Appointments booking?
□ Any error alerts?
□ Lead supply sufficient?
□ Any Slack messages unanswered?

IF ISSUES FOUND:
- Fix immediately
- Notify agent proactively
- Document in agent notes
```

### Monthly Review (With Agent)

```
MONTHLY CALL AGENDA:

1. Performance review
   - Calls, connects, appointments
   - Compare to last month
   - Compare to benchmarks

2. What's working
   - Best performing lead sources
   - Best call times
   - Successful closes from appointments

3. What to optimize
   - Script tweaks needed?
   - Lead quality issues?
   - Schedule adjustments?

4. Lead pipeline
   - Current lead count
   - Upcoming lead sources
   - Need more leads?

5. Questions/feedback
   - Any concerns?
   - Feature requests?
   - Testimonial ask (if happy)
```

---

## Appendix

### A. Plan Comparison

| Feature | Starter ($597/mo) | Pro ($1,197/mo) | Growth ($1,997/mo) |
|---------|-------------------|-----------------|-------------------|
| AI Calls/Month | 500 | 1,500 | 5,000 |
| Voice Minutes | 500 | 1,500 | 5,000 |
| SMS Follow-ups | ✅ | ✅ | ✅ |
| Instant Response | ✅ | ✅ | ✅ |
| Dashboard | ✅ | ✅ | ✅ |
| Compliance Stack | ✅ | ✅ | ✅ |
| Slack Support | ✅ | ✅ | ✅ |
| Phone Number | System | Agent's Own | Multiple |
| Dedicated Manager | - | ✅ | ✅ |
| Weekly Optimization | - | ✅ | ✅ |
| API Access | - | - | ✅ |
| Setup Fee | $500 | $500 | $1,000 |

### B. Compliance Stack Details

| Layer | What It Does |
|-------|--------------|
| 1. Federal DNC Scrub | Remove numbers on national Do Not Call registry |
| 2. State DNC Scrub | Remove numbers on state-specific DNC lists |
| 3. TCPA Litigator Removal | Remove known lawsuit-happy numbers |
| 4. Quiet Hours Enforcement | No calls before 9am or after 8pm (local time) |
| 5. 10DLC Registration | Registered sender ID for SMS compliance |
| 6. Consent Tracking | Full audit trail of consent |
| 7. Recording Disclosure | AI announces call may be recorded |
| 8. Instant Opt-Out | DNC requests processed immediately |

### C. Tech Stack Reference

| Component | Technology |
|-----------|------------|
| CRM | Close CRM |
| Voice AI | Retell AI (Claude-powered) |
| Workflows | n8n |
| Database | Convex |
| Phone/SMS | Twilio |
| Dashboard | Next.js + React |
| Hosting | Vercel / Hostinger |

### D. Key Contacts

| Role | Contact |
|------|---------|
| Support | Slack war room |
| Technical Issues | [EMAIL] |
| Billing | [EMAIL] |
| Emergencies | [PHONE] |

---

## Changelog

| Date | Version | Changes |
|------|---------|---------|
| 2026-04-12 | 1.0 | Initial comprehensive guide |

---

*This document is internal. Do not share with agents directly - use the templates above for agent-facing communication.*
