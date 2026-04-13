# n8n Workflow Catalog for AgentSix v2

> **Total Workflows:** 30 (10 Core + 20 Dashboard API)  
> **Total API Endpoints:** 156  
> **Database Tables:** 48  
> **Focus:** Voice + Lead Response + Compliance + Dashboard Data  
> **Platform:** n8n self-hosted on Railway + Convex for real-time data
> **Coverage:** 100% of all dashboard features

---

## Table of Contents

1. [Workflow Overview](#workflow-overview)
2. [Core Workflows (WF-01 to WF-10)](#core-workflows)
3. [Dashboard API Workflows (WF-11 to WF-25)](#dashboard-api-workflows)
4. [API Endpoints Summary](#api-endpoints-summary)
5. [Database Schema](#database-schema)
6. [Webhook Endpoints](#webhook-endpoints)
7. [Real-time Data (WebSocket)](#real-time-data)
8. [Future Workflows (v3+)](#future-workflows)

---

## Workflow Overview

```
AgentSix n8n WORKFLOWS (30 total):
══════════════════════════════════

CORE - INTAKE & COMPLIANCE (3):
├── WF-01: Lead Intake Webhook
├── WF-02: Compliance Gate (subworkflow)
└── WF-05: Opt Out Handler

CORE - LEAD RESPONSE (3):
├── WF-03: AI First Touch
├── WF-04: Inbound Message Handler
└── WF-06: Appointment Booking

CORE - VOICE (2):
├── WF-07: Voice Outbound (scheduled)
└── WF-08: Voice Call Complete

CORE - ALERTS & ESCALATION (2):
├── WF-09: Hot Lead Alert
└── WF-10: Slack War Room Escalation

DASHBOARD API - OVERVIEW & STATS (3):
├── WF-11: Dashboard Stats API
├── WF-12: Activity Feed API
└── WF-26: Alerts & Notifications API

DASHBOARD API - CALLS (3):
├── WF-13: Call History API
├── WF-14: Call Analytics API
└── WF-27: Voice Usage & Quota API

DASHBOARD API - SMS (2):
├── WF-15: SMS Management API
└── WF-16: SMS Queue & Scheduler

DASHBOARD API - LEADS (2):
├── WF-17: Lead Management API
└── WF-18: Lead Scoring Engine

DASHBOARD API - APPOINTMENTS (1):
└── WF-19: Appointment Management API

DASHBOARD API - ANALYTICS (1):
└── WF-20: Analytics Aggregation API

DASHBOARD API - CONVERSATIONS (1):
└── WF-21: Conversations & Inbox API

DASHBOARD API - COMPLIANCE (2):
├── WF-22: Compliance Management API
└── WF-23: Audit & Reporting API

DASHBOARD API - SETTINGS (3):
├── WF-24: User Settings API
├── WF-25: Integrations & Billing API
└── WF-28: Account Security API

DASHBOARD API - HELP & SUPPORT (2):
├── WF-29: Help Center API
└── WF-30: System Status & Feedback API
```

---

## Core Workflows

### WF-01: Lead Intake Webhook

**Purpose:** Receive leads from all sources, validate, check compliance, create lead record

**Trigger:** HTTP webhook at `/webhook/lead/[clientSlug]`

**Inputs:**
```json
{
  "source": "zillow|facebook|realtor|website|referral|cold_call|open_house",
  "sourceRecordId": "optional-id",
  "contact": {
    "firstName": "Sarah",
    "lastName": "Miller",
    "phone": "+15551234567",
    "email": "sarah@example.com",
    "address": "123 Main St",
    "city": "Columbus",
    "state": "OH",
    "zip": "43215"
  },
  "propertyInterest": {
    "address": "456 Oak Ave",
    "priceRange": "$300-400K",
    "propertyType": "single_family"
  },
  "message": "Interested in a showing"
}
```

**Logic:**
1. Extract phone, normalize to E.164 (+1XXXXXXXXXX)
2. Look up clientId from clientSlug
3. Call WF-02 (Compliance Gate) with phone + clientId
4. If blocked → log to compliance_checks, return error
5. If pass → create lead in Convex
6. Calculate initial lead score (WF-18)
7. Emit event `lead.created`
8. Trigger WF-03 (AI First Touch)
9. Update dashboard stats cache

---

### WF-02: Compliance Gate (Subworkflow)

**Purpose:** Check all compliance rules before ANY outbound contact

**Trigger:** Called from other workflows

**Checks (in order):**
1. DNC Federal → Contact Center Compliance API
2. DNC State → Same vendor, state-specific
3. Litigator → Blacklist Alliance API
4. Consent → Query Convex consent_records
5. Quiet Hours → Check lead timezone, 8am-9pm local

**Output:**
```json
{
  "result": "pass|block",
  "blockReason": "dnc_federal|dnc_state|litigator|no_consent|quiet_hours",
  "checkDetails": { ... }
}
```

---

### WF-03: AI First Touch

**Purpose:** Send first contact message within 10 seconds of lead arrival

**Flow:**
1. Load client-specific AI prompt template from Convex
2. Build context: source, name, property interest, time
3. Call Claude API with FIRST_TOUCH_SMS prompt
4. Send SMS via Twilio
5. Write message to `messages` table
6. Call Claude API with FIRST_TOUCH_EMAIL prompt
7. Send email via Resend
8. Update lead.qualificationState = `contacted`
9. Update SMS sequence position to Stage 1

---

### WF-04: Inbound Message Handler

**Purpose:** Process incoming SMS, qualify lead, respond or escalate

**Trigger:** Twilio webhook on SMS receive

**Flow:**
1. Normalize phone, look up lead
2. CHECK STOP/HELP FIRST (compliance)
3. Write inbound message to `messages` table
4. Load conversation history
5. Call Claude with QUALIFICATION prompt
6. Parse response for intent & next action
7. Route: edge_case → WF-10, booking → WF-06, else respond
8. Update conversation status & sentiment
9. Push to real-time activity feed

---

### WF-05: Opt Out Handler

**Purpose:** Process STOP requests within 10 seconds (TCPA requirement)

**SLA: 10 SECONDS MAX**

**Flow:**
1. Update lead.qualificationState = `opted_out`
2. Revoke all consent records
3. Add phone to internal DNC list
4. Send confirmation SMS
5. Stop all scheduled workflows for this phone
6. Log to compliance_checks & audit_log
7. Update compliance dashboard stats

---

### WF-06: Appointment Booking

**Purpose:** Book appointments when AI detects booking intent

**Flow:**
1. Check client's Google Calendar for availability
2. If available → create event, send confirmation, write to appointments
3. If not → offer 3 alternatives via AI
4. On success: Alert agent, update lead stage
5. Create appointment record with all metadata
6. Update dashboard appointment stats

---

### WF-07: Voice Outbound (Scheduled)

**Purpose:** Make scheduled outbound AI voice calls

**Trigger:** Cron at 10am client-local time

**Daily Limits:**
- Starter: 10 calls/day
- Pro: 20 calls/day
- Growth: 50 calls/day

**Flow:**
1. Check voice quota remaining
2. Query eligible leads (contacted, qualifying, not opted out)
3. For each lead: compliance gate recheck → Retell call
4. Log call initiation to calls table
5. Update live calls monitor

---

### WF-08: Voice Call Complete

**Purpose:** Process completed voice calls, route outcomes

**Trigger:** Retell webhook on call completion

**Outcomes:**
- no_answer → schedule SMS follow-up
- voicemail → schedule SMS follow-up
- answered_not_interested → move to nurture
- answered_qualified → send follow-up SMS
- answered_booked → WF-06 appointment
- answered_edge_case → WF-10 escalation

**Always:**
- Write call record with transcript, quality score
- Update voice minutes used
- Push to activity feed
- Update call analytics

---

### WF-09: Hot Lead Alert

**Purpose:** Immediately notify agent of hot leads

**Flow:**
1. Check agent's notification hours
2. Send SMS to agent's phone
3. Send push notification
4. Post to Slack war room
5. Update lead.isHot = true
6. Add to hot leads dashboard list

---

### WF-10: Slack War Room Escalation

**Purpose:** Escalate edge cases to human operators

**Triggers:**
- Legal threats
- Life events (death, divorce)
- Compliance flags
- Multiple failed AI responses
- Abusive messages
- Technical confusion

**SLA:**
- Starter: 4 hours
- Pro: 15 minutes
- Growth: 5 minutes

---

## Dashboard API Workflows

### WF-11: Dashboard Stats API

**Purpose:** Provide all overview statistics for the main dashboard

**Endpoints:**
```
GET /api/stats/overview?timeframe={today|week|month|quarter}
GET /api/stats/kpis
GET /api/stats/trends
```

**Returns:**
```json
{
  "totalLeads": 2847,
  "leadsTrend": 12.5,
  "callsToday": 156,
  "callsYesterday": 142,
  "appointmentsWeek": 23,
  "appointmentsTrend": 8.3,
  "revenuePipeline": 847500,
  "revenueTrend": 15.2,
  "activeCampaigns": 7,
  "connectionRate": 34.2,
  "avgCallDuration": "2:34",
  "voicemailRate": 28.4,
  "voiceMinutesUsed": 1247,
  "voiceMinutesTotal": 2000
}
```

**Data Sources:**
- leads table (counts, status)
- calls table (today's calls, outcomes)
- appointments table (this week)
- campaigns table (active count)
- voice_usage table (minutes)

---

### WF-12: Activity Feed API

**Purpose:** Real-time activity stream for dashboard

**Endpoints:**
```
GET /api/activity/live?limit=20
GET /api/activity/history?type={all|calls|sms|leads}&limit=50
WebSocket: ws://api/activity/stream
```

**Activity Types:**
- call_started, call_ended
- appointment_booked
- hot_lead_flagged
- sms_received, sms_sent
- new_lead
- voicemail_left
- lead_qualified

**Returns:**
```json
{
  "activities": [
    {
      "id": "act_123",
      "type": "call_ended",
      "leadId": "lead_456",
      "leadName": "John Smith",
      "message": "3:24 call - Appointment booked",
      "timestamp": "2026-04-13T10:30:00Z",
      "metadata": { "duration": 204, "outcome": "booked" }
    }
  ]
}
```

---

### WF-13: Call History API

**Purpose:** Full call history with transcripts and recordings

**Endpoints:**
```
GET /api/calls/history?outcome={all|appointment|voicemail|...}&search={query}&limit=50&offset=0
GET /api/calls/{id}
GET /api/calls/{id}/transcript
GET /api/calls/{id}/recording (audio stream)
GET /api/calls/live (active calls)
GET /api/calls/stats?timeframe={today|7days|30days}
GET /api/calls/outcomes?timeframe={today|7days|30days}
GET /api/calls/best-times
GET /api/calls/sequence-progress
```

**Call Record:**
```json
{
  "id": "call_123",
  "leadId": "lead_456",
  "leadName": "John Smith",
  "phone": "+16025551234",
  "source": "zillow",
  "duration": 154,
  "outcome": "Appointment Booked",
  "status": "success",
  "qualityScore": 87,
  "sentiment": "positive",
  "sequenceStep": 2,
  "hasRecording": true,
  "recordingUrl": "https://...",
  "transcript": "...",
  "keyPoints": ["Interested in 4BR", "Budget $400K", "Pre-approved"],
  "startTime": "2026-04-13T10:30:00Z",
  "endTime": "2026-04-13T10:32:34Z"
}
```

---

### WF-14: Call Analytics API

**Purpose:** Aggregated call analytics and performance data

**Endpoints:**
```
GET /api/analytics/calls/daily?days=30
GET /api/analytics/calls/hourly
GET /api/analytics/calls/outcomes
GET /api/analytics/calls/duration-trends
GET /api/analytics/calls/sequence-performance
```

---

### WF-15: SMS Management API

**Purpose:** SMS history, templates, and conversation management

**Endpoints:**
```
GET /api/sms/stats?timeframe={7days|30days|90days}
GET /api/sms/funnel-stages
GET /api/sms/templates
PUT /api/sms/templates/{id}
POST /api/sms/templates
DELETE /api/sms/templates/{id}
GET /api/sms/conversation/{leadId}
POST /api/sms/send
GET /api/sms/analytics/heatmap
GET /api/sms/analytics/keywords
```

**SMS Stats:**
```json
{
  "totalSent": 2847,
  "totalReplies": 578,
  "replyRate": 20.3,
  "optOuts": 23,
  "optOutRate": 0.8,
  "hotLeadsGenerated": 127,
  "appointmentsFromSMS": 45,
  "pendingQueue": 34,
  "scheduledToday": 156
}
```

**Template:**
```json
{
  "id": "tpl_123",
  "name": "Initial Intro",
  "stage": 1,
  "template": "Hey {{firstName}}! I saw you were looking at properties in {{area}}...",
  "sent": 847,
  "delivered": 839,
  "replied": 203,
  "replyRate": 24.2,
  "optOut": 8,
  "performance": "top",
  "hasEmoji": true,
  "bestTime": "10:30 AM"
}
```

---

### WF-16: SMS Queue & Scheduler

**Purpose:** Manage scheduled SMS and queue operations

**Endpoints:**
```
GET /api/sms/queue?status={pending|scheduled|sent}
GET /api/sms/scheduled
POST /api/sms/scheduled
DELETE /api/sms/scheduled/{id}
POST /api/sms/queue/pause
POST /api/sms/queue/resume
POST /api/sms/bulk-schedule
```

---

### WF-17: Lead Management API

**Purpose:** Full CRUD for leads with filtering and bulk operations

**Endpoints:**
```
GET /api/leads?source={}&status={}&stage={}&search={}&sort={}&order={}&limit=50&offset=0
GET /api/leads/{id}
POST /api/leads
PUT /api/leads/{id}
DELETE /api/leads/{id}
GET /api/leads/sources/stats
GET /api/leads/pipeline/stats
POST /api/leads/import (CSV)
GET /api/leads/export?format={csv|xlsx}
POST /api/leads/{id}/call
POST /api/leads/{id}/sms
POST /api/leads/{id}/email
PUT /api/leads/{id}/tags
PUT /api/leads/{id}/assign
PUT /api/leads/{id}/stage
POST /api/leads/bulk-action
```

**Lead Record:**
```json
{
  "id": "lead_456",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+16025551234",
  "source": "zillow",
  "sourceIcon": "home",
  "status": "hot",
  "score": 92,
  "aiProbability": 78,
  "stage": "qualified",
  "budget": { "min": 350000, "max": 450000 },
  "timeline": "1-3 months",
  "location": "Phoenix, AZ",
  "propertyType": "single_family",
  "notes": "First-time buyer, pre-approved",
  "tags": ["pre-approved", "motivated"],
  "assignedTo": "user_123",
  "activities": {
    "total": 12,
    "calls": 3,
    "emails": 5,
    "sms": 4
  },
  "lastContact": "2 min ago",
  "nextAction": "Call scheduled 2:00 PM",
  "createdAt": "2026-04-10T08:00:00Z"
}
```

---

### WF-18: Lead Scoring Engine

**Purpose:** AI-powered lead scoring based on multiple factors

**Endpoints:**
```
GET /api/leads/{id}/score
POST /api/leads/{id}/recalculate-score
GET /api/leads/scoring/factors
PUT /api/leads/scoring/factors (configure weights)
GET /api/leads/scoring/distribution
```

**Scoring Factors:**
1. Response Time (0-15 points)
2. Budget Match (0-15 points)
3. Timeline Urgency (0-20 points)
4. Engagement Level (0-20 points)
5. Pre-Approval Status (0-15 points)
6. Source Quality (0-15 points)

**Score Distribution:**
- Hot (80-100): Immediate attention
- Warm (50-79): Active nurturing
- Cold (0-49): Long-term nurture

---

### WF-19: Appointment Management API

**Purpose:** Full appointment CRUD with calendar integration

**Endpoints:**
```
GET /api/appointments?date={}&status={}&type={}
GET /api/appointments/calendar?month={YYYY-MM}
GET /api/appointments/{id}
POST /api/appointments
PUT /api/appointments/{id}
DELETE /api/appointments/{id}
POST /api/appointments/{id}/confirm
POST /api/appointments/{id}/reschedule
POST /api/appointments/{id}/cancel
POST /api/appointments/{id}/send-reminder
GET /api/appointments/history
GET /api/appointments/stats
GET /api/appointments/upcoming?days=7
```

**Appointment Record:**
```json
{
  "id": "apt_123",
  "leadId": "lead_456",
  "leadName": "John Smith",
  "leadPhone": "+16025551234",
  "type": "showing",
  "property": "456 Oak Ave, Phoenix AZ",
  "dealType": "Buy",
  "date": "2026-04-15",
  "time": "2:00 PM",
  "duration": 60,
  "status": "confirmed",
  "confirmationSent": true,
  "reminderSent": false,
  "source": "ai_booked",
  "notes": "First showing, bring comps",
  "outcome": null
}
```

---

### WF-20: Analytics Aggregation API

**Purpose:** Comprehensive analytics for all dashboard metrics

**Endpoints:**
```
GET /api/analytics/overview?timeframe={month|quarter|year}
GET /api/analytics/revenue/monthly
GET /api/analytics/revenue/by-source
GET /api/analytics/leads/source-performance
GET /api/analytics/leads/quality-distribution
GET /api/analytics/funnel
GET /api/analytics/appointments/stats
GET /api/analytics/appointments/by-day
GET /api/analytics/appointments/no-show-reasons
GET /api/analytics/campaigns
GET /api/analytics/templates
GET /api/analytics/ab-tests
GET /api/analytics/agents
GET /api/analytics/export?format={pdf|csv}
```

**Overview Stats:**
```json
{
  "totalRevenue": 847500,
  "revenueTrend": 18.4,
  "conversionRate": 12.8,
  "conversionTrend": 2.1,
  "avgDealValue": 28200,
  "avgDealTrend": 5.3,
  "platformROI": 847,
  "roiTrend": 12.0
}
```

---

### WF-21: Conversations & Inbox API

**Purpose:** Unified inbox for all communication channels

**Endpoints:**
```
GET /api/conversations?channel={all|sms|email|call}&status={}&starred={}&search={}
GET /api/conversations/{id}
GET /api/conversations/{id}/messages
POST /api/conversations/{id}/messages
PUT /api/conversations/{id}/read
PUT /api/conversations/{id}/star
PUT /api/conversations/{id}/archive
GET /api/conversations/templates
POST /api/conversations/{id}/smart-reply
GET /api/conversations/unread-count
```

**Conversation:**
```json
{
  "id": "conv_123",
  "leadId": "lead_456",
  "lead": {
    "name": "John Smith",
    "phone": "+16025551234",
    "email": "john@example.com",
    "avatar": "JS",
    "company": "ABC Realty",
    "budget": "$350K-$450K"
  },
  "status": "hot",
  "sentiment": "positive",
  "channel": "sms",
  "lastMessage": "Yes! I'm still looking",
  "lastMessageTime": "2 min ago",
  "unread": true,
  "unreadCount": 2,
  "starred": false,
  "messages": [...]
}
```

---

### WF-22: Compliance Management API

**Purpose:** DNC management, consent tracking, calling windows

**Endpoints:**
```
GET /api/compliance/scores
GET /api/compliance/dnc/stats
GET /api/compliance/dnc/recent
POST /api/compliance/dnc/add
DELETE /api/compliance/dnc/{phone}
POST /api/compliance/dnc/sync
GET /api/compliance/dnc/search?phone={}
GET /api/compliance/calling-windows
GET /api/compliance/consent/stats
GET /api/compliance/consent/records?status={}
POST /api/compliance/consent/record
GET /api/compliance/two-party-states
GET /api/compliance/regulations
```

**Compliance Scores:**
```json
{
  "overall": 94,
  "dncCompliance": 98,
  "tcpaCompliance": 92,
  "stateRegulations": 96,
  "timeRestrictions": 91
}
```

---

### WF-23: Audit & Reporting API

**Purpose:** Compliance audit logs and report generation

**Endpoints:**
```
GET /api/compliance/audit-log?type={}&limit=50
GET /api/compliance/alerts
PUT /api/compliance/alerts/{id}/resolve
GET /api/compliance/reports
POST /api/compliance/reports/generate
GET /api/compliance/reports/{id}/download
```

**Audit Log Entry:**
```json
{
  "id": "audit_123",
  "action": "DNC_ADDED",
  "type": "dnc",
  "user": "System",
  "timestamp": "2026-04-13T10:30:00Z",
  "details": {
    "phone": "+16025551234",
    "reason": "STOP received",
    "source": "sms_optout"
  }
}
```

---

### WF-24: User Settings API

**Purpose:** User profile, AI agent config, notifications

**Endpoints:**
```
GET /api/settings/profile
PUT /api/settings/profile
GET /api/settings/ai-agent
PUT /api/settings/ai-agent
GET /api/settings/voices
POST /api/settings/voices/preview/{voiceId}
GET /api/settings/notifications
PUT /api/settings/notifications
GET /api/settings/team
POST /api/settings/team/invite
PUT /api/settings/team/{memberId}/role
DELETE /api/settings/team/{memberId}
GET /api/settings/api-keys
POST /api/settings/api-keys
DELETE /api/settings/api-keys/{keyId}
```

**AI Agent Settings:**
```json
{
  "voiceId": "voice_kate",
  "voiceName": "Kate",
  "speed": 1.05,
  "personality": "professional",
  "responsiveness": 0.9,
  "interruptionSensitivity": 0.8,
  "voicemailDetection": true,
  "maxCallDuration": 600,
  "useBackchannel": true
}
```

---

### WF-25: Integrations & Billing API

**Purpose:** Third-party integrations and billing management

**Endpoints:**
```
GET /api/settings/integrations
POST /api/settings/integrations/{id}/connect
DELETE /api/settings/integrations/{id}/disconnect
POST /api/settings/integrations/{id}/sync
GET /api/settings/billing
GET /api/settings/billing/invoices
GET /api/settings/billing/invoices/{id}/download
POST /api/settings/billing/update-payment
POST /api/settings/export-data
DELETE /api/settings/account
```

**Integration:**
```json
{
  "id": "int_crm_followupboss",
  "name": "Follow Up Boss",
  "category": "crm",
  "icon": "followupboss",
  "connected": true,
  "lastSync": "2 min ago",
  "status": "healthy"
}
```

---

### WF-26: Alerts & Notifications API

**Purpose:** Dashboard alerts, system notifications, and user alerts

**Endpoints:**
```
GET /api/alerts?type={urgent|warning|info|success}&unread=true
GET /api/alerts/{id}
PUT /api/alerts/{id}/dismiss
PUT /api/alerts/{id}/read
DELETE /api/alerts/{id}
POST /api/alerts/dismiss-all
GET /api/notifications/preferences
PUT /api/notifications/preferences
```

**Alert Types:**
- `urgent` - Hot leads, compliance issues, SLA breaches
- `warning` - Low voice minutes, expiring consent
- `info` - New features, system updates
- `success` - Deals closed, goals achieved

**Alert Record:**
```json
{
  "id": "alert_123",
  "type": "urgent",
  "severity": "high",
  "title": "Hot Lead Requires Attention",
  "message": "John Smith has requested a callback within 1 hour",
  "timestamp": "2026-04-13T10:30:00Z",
  "read": false,
  "dismissed": false,
  "actionUrl": "/dashboard/leads/lead_456",
  "metadata": { "leadId": "lead_456" }
}
```

---

### WF-27: Voice Usage & Quota API

**Purpose:** Track voice minutes usage, quotas, and AI agent status

**Endpoints:**
```
GET /api/voice/usage
GET /api/voice/quota
GET /api/voice/history?days=30
GET /api/agents/status
GET /api/agents/{id}/status
POST /api/agents/{id}/pause
POST /api/agents/{id}/resume
GET /api/calls/scheduled/today
POST /api/calls/batch-start
POST /api/calls/batch-stop
```

**Voice Usage:**
```json
{
  "usedMinutes": 1247,
  "totalMinutes": 2000,
  "remainingMinutes": 753,
  "usagePercent": 62.35,
  "plan": "Pro",
  "billingPeriodStart": "2026-04-01",
  "billingPeriodEnd": "2026-04-30",
  "projectedUsage": 1850,
  "overage": false
}
```

**Agent Status:**
```json
{
  "id": "agent_laura",
  "name": "Laura SDR",
  "status": "active",
  "currentCalls": 2,
  "callsToday": 45,
  "connectionsToday": 18,
  "avgCallDuration": "2:34",
  "lastCallAt": "2 min ago"
}
```

---

### WF-28: Account Security API

**Purpose:** Password management, 2FA, session control

**Endpoints:**
```
POST /api/settings/account/password
POST /api/settings/account/2fa/setup
POST /api/settings/account/2fa/verify
DELETE /api/settings/account/2fa
GET /api/settings/account/sessions
DELETE /api/settings/account/sessions/{id}
DELETE /api/settings/account/sessions/all
PUT /api/settings/account/session-timeout
POST /api/settings/profile/avatar (multipart/form-data)
GET /api/settings/account/login-history?limit=20
```

**Session Record:**
```json
{
  "id": "sess_123",
  "device": "Chrome on MacOS",
  "ip": "192.168.1.1",
  "location": "Phoenix, AZ",
  "lastActive": "2 min ago",
  "createdAt": "2026-04-13T08:00:00Z",
  "current": true
}
```

**2FA Setup Response:**
```json
{
  "secret": "JBSWY3DPEHPK3PXP",
  "qrCode": "data:image/png;base64,...",
  "backupCodes": ["12345678", "87654321", ...]
}
```

---

### WF-29: Help Center API

**Purpose:** Help articles, tutorials, FAQs, onboarding

**Endpoints:**
```
GET /api/help/search?q={query}
GET /api/help/categories
GET /api/help/categories/{id}/articles
GET /api/help/articles/{id}
GET /api/help/articles/popular
GET /api/help/tutorials
GET /api/help/faqs
GET /api/help/whats-new
GET /api/user/onboarding-progress
PUT /api/user/onboarding-progress
POST /api/user/onboarding/complete-step
```

**Help Article:**
```json
{
  "id": "art_123",
  "title": "How to Set Up Your AI Voice Agent",
  "category": "getting-started",
  "content": "...",
  "readTime": "5 min",
  "views": 1234,
  "helpful": 89,
  "updatedAt": "2026-04-01"
}
```

**Onboarding Progress:**
```json
{
  "completed": 3,
  "total": 7,
  "steps": [
    { "id": "profile", "name": "Complete Profile", "completed": true },
    { "id": "voice", "name": "Configure AI Voice", "completed": true },
    { "id": "integrations", "name": "Connect CRM", "completed": true },
    { "id": "import", "name": "Import Leads", "completed": false },
    { "id": "first_call", "name": "Make First Call", "completed": false },
    { "id": "first_appointment", "name": "Book Appointment", "completed": false },
    { "id": "review", "name": "Review Analytics", "completed": false }
  ]
}
```

---

### WF-30: System Status & Feedback API

**Purpose:** System health, support tickets, user feedback

**Endpoints:**
```
GET /api/system/status
GET /api/system/status/history?days=7
POST /api/feedback
GET /api/feedback/my
POST /api/support/ticket
GET /api/support/tickets
GET /api/support/tickets/{id}
POST /api/support/tickets/{id}/reply
```

**System Status:**
```json
{
  "overall": "operational",
  "services": [
    { "name": "AI Voice Engine", "status": "operational", "uptime": "99.99%" },
    { "name": "SMS Gateway", "status": "operational", "uptime": "99.95%" },
    { "name": "Dashboard", "status": "operational", "uptime": "100%" },
    { "name": "CRM Sync", "status": "degraded", "uptime": "98.5%", "message": "Slow sync times" },
    { "name": "Analytics", "status": "operational", "uptime": "99.9%" }
  ],
  "incidents": [
    { "id": "inc_123", "title": "CRM Sync Delays", "status": "investigating", "startedAt": "2026-04-13T09:00:00Z" }
  ]
}
```

**Support Ticket:**
```json
{
  "id": "ticket_123",
  "subject": "Voice agent not making calls",
  "status": "open",
  "priority": "high",
  "createdAt": "2026-04-13T10:00:00Z",
  "messages": [...]
}
```

---

## Additional Endpoints (Gap Coverage)

These endpoints complete the gaps found in the cross-check:

### Calls - Additional
```
GET /api/calls/{id}/recording/download    # Download audio file
GET /api/calls/scheduled/today            # Today's scheduled calls
POST /api/calls/batch-start               # Start calling session
```

### Leads - Additional
```
GET /api/leads/import/history             # Import history
GET /api/leads/{id}/activities            # Per-lead activity log
GET /api/sms/funnel-stages/{stage}/leads  # Leads per SMS stage
```

### SMS - Additional
```
GET /api/sms/live                         # REST fallback for live feed
GET /api/sms/quick-replies                # Quick reply templates
GET /api/sms/compliance                   # SMS-specific compliance
```

### Compliance - Additional
```
GET /api/compliance/recording-disclosure  # Recording disclosure settings
PUT /api/compliance/recording-disclosure  # Update disclosure script
```

---

## API Endpoints Summary

| Category | Endpoint Count | Workflows |
|----------|---------------|-----------|
| Dashboard Stats | 5 | WF-11 |
| Activity Feed | 3 | WF-12 |
| Alerts & Notifications | 8 | WF-26 |
| Calls | 15 | WF-13, WF-14 |
| Voice Usage & Agents | 11 | WF-27 |
| SMS | 20 | WF-15, WF-16 |
| Leads | 22 | WF-17, WF-18 |
| Appointments | 12 | WF-19 |
| Analytics | 15 | WF-20 |
| Conversations | 10 | WF-21 |
| Compliance | 18 | WF-22, WF-23 |
| Settings | 18 | WF-24, WF-25 |
| Account Security | 10 | WF-28 |
| Help Center | 11 | WF-29 |
| System & Feedback | 8 | WF-30 |
| **TOTAL** | **156** | **20 API workflows** |

---

## Database Schema

### Core Tables (13)

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | id, email, name, company, plan, timezone |
| `leads` | Lead records | id, name, phone, email, source, status, score, stage |
| `calls` | Call history | id, leadId, duration, outcome, qualityScore, transcript |
| `sms_messages` | SMS records | id, leadId, direction, message, status, stage |
| `appointments` | Appointments | id, leadId, type, date, time, status, outcome |
| `conversations` | Unified inbox | id, leadId, channel, status, sentiment, unread |
| `messages` | All messages | id, conversationId, from, text, timestamp, channel |
| `campaigns` | Marketing campaigns | id, name, status, leadsCount, metrics |
| `activities` | Activity feed | id, type, leadId, message, timestamp |
| `alerts` | System alerts | id, type, severity, title, message, read |
| `dnc_list` | Do Not Call | id, phone, source, reason, addedAt |
| `consent_records` | Consent tracking | id, leadId, type, status, expiresAt |
| `compliance_audit_log` | Audit trail | id, action, type, user, timestamp, details |

### Configuration Tables (10)

| Table | Purpose |
|-------|---------|
| `lead_sources` | Source config (Zillow, Facebook, etc.) |
| `pipeline_stages` | Sales pipeline stages |
| `sms_templates` | SMS template library |
| `sms_sequences` | Follow-up sequence config |
| `appointment_types` | Appointment type config |
| `response_templates` | Quick reply templates |
| `state_regulations` | State-by-state rules |
| `integrations` | Available integrations |
| `voices` | AI voice options |
| `scoring_factors` | Lead scoring weights |

### User/Org Tables (8)

| Table | Purpose |
|-------|---------|
| `user_settings` | User preferences |
| `notification_preferences` | Notification config |
| `team_members` | Organization members |
| `user_integrations` | Connected integrations |
| `api_keys` | API key management |
| `invoices` | Billing invoices |
| `voice_usage` | Voice minute tracking |
| `subscription_plans` | Plan details |

### Analytics Tables (7)

| Table | Purpose |
|-------|---------|
| `call_analytics` | Aggregated call stats |
| `lead_analytics` | Lead source performance |
| `revenue_records` | Revenue tracking |
| `campaign_analytics` | Campaign performance |
| `ab_tests` | A/B test config |
| `ab_test_results` | Test results |
| `agent_performance` | AI agent metrics |

### Supporting Tables (5)

| Table | Purpose |
|-------|---------|
| `lead_tags` | Tags on leads |
| `lead_activities` | Per-lead activity history |
| `conversation_tags` | Tags on conversations |
| `sms_queue` | Scheduled SMS queue |
| `compliance_reports` | Generated reports |

### Security & Session Tables (3)

| Table | Purpose |
|-------|---------|
| `user_sessions` | Active login sessions |
| `two_factor_auth` | 2FA secrets and backup codes |
| `login_history` | Login activity log |

### Help & Support Tables (5)

| Table | Purpose |
|-------|---------|
| `help_categories` | Help article categories |
| `help_articles` | Help/documentation content |
| `help_tutorials` | Video tutorial metadata |
| `support_tickets` | Support ticket records |
| `user_feedback` | Feature requests & bug reports |

### System Tables (2)

| Table | Purpose |
|-------|---------|
| `system_status` | Service health status |
| `onboarding_progress` | User onboarding tracking |

**TOTAL: 48 Tables**

---

## Webhook Endpoints

### Inbound (External → AgentSix)

```
POST /webhook/lead/:clientSlug          → WF-01 Lead Intake
POST /webhook/twilio/sms                → WF-04 Inbound Message
POST /webhook/twilio/status             → Update delivery status
POST /webhook/retell/call-complete      → WF-08 Voice Call Complete
POST /webhook/calendly/booked           → Sync appointments
POST /webhook/stripe/subscription       → Update billing
POST /webhook/zapier/trigger            → External automation
```

### Outbound (AgentSix → External)

```
Twilio SMS API          → Send SMS
Twilio Voice API        → Make calls (via Retell)
Retell AI API           → AI voice calls
Google Calendar API     → Book appointments
Resend API              → Send emails
Slack API               → War room alerts
Claude API              → AI responses
Stripe API              → Billing
```

---

## Real-time Data

### WebSocket Endpoints

```
ws://api/activity/stream     → Live activity feed
ws://api/calls/live          → Active calls monitor
ws://api/sms/feed            → Live SMS activity
ws://api/conversations/new   → New message notifications
```

### Polling Fallback

For clients without WebSocket support:
```
GET /api/activity/poll?since={timestamp}    → Poll every 5s
GET /api/calls/live/poll                    → Poll every 3s
```

---

## Future Workflows (v3+)

### Planned for v2.5
```
WF-26: Expired Listing Outreach
WF-27: FSBO Outreach  
WF-28: Circle Prospecting
WF-29: Review Collection
WF-30: Past Client Nurture
```

### Planned for v3
```
WF-31: Social Media Posting
WF-32: Market Report Generator
WF-33: Direct Mail Trigger
WF-34: Home Valuation Landing Page
WF-35: Open House Sign-In
```

---

## Implementation Priority

### Phase 1: Core (Week 1-2)
- WF-01 to WF-10 (Core workflows)
- Basic database schema
- Twilio + Retell integration

### Phase 2: Dashboard Data (Week 3-4)
- WF-11 to WF-14 (Stats, Activity, Calls)
- WF-17, WF-18 (Leads)
- Real-time activity feed

### Phase 3: Communication (Week 5-6)
- WF-15, WF-16 (SMS)
- WF-21 (Conversations)
- WF-19 (Appointments)

### Phase 4: Analytics & Compliance (Week 7-8)
- WF-20 (Analytics)
- WF-22, WF-23 (Compliance)
- WF-24, WF-25 (Settings)

---

## n8n Scaling Notes

**The scaling wall is real:**

At ~15-25 concurrent workflow executions, n8n struggles. Plan for migration:

- **Clients 1-10:** All workflows in n8n
- **Clients 10-20:** Hot paths move to code (webhook intake, AI response)
- **Clients 20+:** n8n for batch jobs only, main APIs in Next.js + Convex

---

*Last Updated: April 13, 2026*
*Total Workflows: 25 | API Endpoints: 121 | Database Tables: 43*
