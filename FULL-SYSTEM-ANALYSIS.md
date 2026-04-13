# AgentSix Full System Analysis

> **Version:** 2.0 (Complete System Blueprint)  
> **Goal:** Agent dashboard theke EVERYTHING view + manage korte parbe  
> **Architecture:** n8n (backend) + Convex (database) + React Dashboard (frontend)  
> **Compliance:** Full TCPA stack included (10DLC, DNC, consent management, insurance)  
> **Design:** All features visible + Premium preview on click (🔒 = locked features)  
> **Date:** April 11, 2026

---

## TCPA Compliance Layer

```
COMPLIANCE INFRASTRUCTURE (Built into System):
══════════════════════════════════════════════

Every message send goes through this compliance check:

┌─────────────────────────────────────────────────────────────────────────────┐
│                       COMPLIANCE CHECK PIPELINE                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   BEFORE SEND:                                                              │
│   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐   │
│   │   Consent   │──►│    DNC      │──►│  Litigator  │──►│   Quiet     │   │
│   │   Check     │   │   Check     │   │   Check     │   │   Hours     │   │
│   └─────────────┘   └─────────────┘   └─────────────┘   └─────────────┘   │
│         │                 │                 │                 │            │
│         ▼                 ▼                 ▼                 ▼            │
│   Has consent?      On DNC list?     Known plaintiff?   8am-9pm local?    │
│         │                 │                 │                 │            │
│   ALL MUST PASS ────────────────────────────────────────────────►         │
│                                                                   │        │
│                                                            ┌──────▼──────┐ │
│                                                            │   SEND or   │ │
│                                                            │    BLOCK    │ │
│                                                            └─────────────┘ │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   CONVEX TABLES:                                                            │
│   • consentRecords - Timestamped opt-ins, 4-year retention                 │
│   • dncList - Federal, state, internal, litigator blocks                   │
│   • complianceLog - Full audit trail of all checks                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

COMPLIANCE FEATURES:
────────────────────
✅ A2P 10DLC Registration (carrier-approved)
✅ Daily DNC scrubbing (Federal + State)
✅ TCPA litigator list blocking
✅ Per-agent consent landing pages
✅ Automated STOP handling (<10 sec)
✅ Quiet hours enforcement (8am-9pm)
✅ E&O + TCPA insurance ($1M+)
```

---

## Executive Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                      AGENTOS COMPLETE SYSTEM                                │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         AGENT DASHBOARD                               │  │
│  │                                                                       │  │
│  │   VIEW (দেখতে পারবে)              MANAGE (করতে পারবে)                │  │
│  │   ──────────────────              ────────────────────                │  │
│  │   • All leads                     • Send SMS manually                 │  │
│  │   • All conversations             • Make calls (click-to-call)        │  │
│  │   • All appointments              • Book appointments                 │  │
│  │   • Pipeline stages               • Move leads in pipeline            │  │
│  │   • Analytics & ROI               • Add notes to leads                │  │
│  │   • AI performance                • Pause/resume campaigns            │  │
│  │   • Message templates             • Mark leads as DNC                 │  │
│  │   • Team activity                 • Reschedule appointments           │  │
│  │   • Revenue tracking              • Update lead status                │  │
│  │   • Source performance            • Create manual leads               │  │
│  │   • Hot lead alerts               • Set notification preferences      │  │
│  │   • Calendar sync                 • Customize AI tone                 │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ Real-time                              │
│                                    ▼                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         CONVEX DATABASE                               │  │
│  │                                                                       │  │
│  │   leads | conversations | appointments | deals | metrics | settings  │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ Webhooks                               │
│                                    ▼                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         n8n WORKFLOWS (17)                            │  │
│  │                                                                       │  │
│  │   Lead Intake → AI Process → Response → Booking → Sync → Alerts      │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ API Calls                              │
│                                    ▼                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         INTEGRATIONS                                  │  │
│  │                                                                       │  │
│  │   Zillow | REDX | Twilio | OpenAI | Calendly | Close CRM | Tracerfy │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Dashboard Design Philosophy: Show Everything + Premium Preview

```
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                       ║
║                    "SHOW EVERYTHING, BUY WHAT YOU WANT"                               ║
║                                                                                       ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   DESIGN PRINCIPLE:                                                                  ║
║   ─────────────────                                                                   ║
║   • ALL features visible in sidebar (no hidden features)                             ║
║   • Locked features show 🔒 badge                                                    ║
║   • Click on 🔒 → Opens premium preview modal                                        ║
║   • Premium preview = full demo with sample data                                     ║
║   • 1-click "Add to My System" to unlock                                             ║
║                                                                                       ║
║   SIDEBAR STRUCTURE:                                                                  ║
║   ┌─────────────────────────────┐                                                    ║
║   │ 📊 Dashboard                │ ← Always included                                  ║
║   │ 👥 Leads                    │ ← Always included                                  ║
║   │ 💬 Conversations            │ ← Always included                                  ║
║   │ 📅 Appointments             │ ← Always included                                  ║
║   │ 📊 Pipeline                 │ ← Always included                                  ║
║   │ 📈 Analytics                │ ← Always included                                  ║
║   │                             │                                                    ║
║   │ ─── LEAD GENERATION ───     │                                                    ║
║   │ 🏠 Expired SMS              │ ← Purchased or 🔒                                  ║
║   │ 🔑 FSBO SMS                 │ ← Purchased or 🔒                                  ║
║   │ 🏘️ Circle Prospecting       │ ← Purchased or 🔒                                  ║
║   │ 📞 AI Voice Calls 🔒        │ ← Phase 2                                          ║
║   │                             │                                                    ║
║   │ ─── NURTURE ───             │                                                    ║
║   │ ✉️ Email Drip 🔒            │ ← Phase 2                                          ║
║   │ 🎂 Birthday Auto 🔒         │ ← Phase 2                                          ║
║   │ 👥 Past Client 🔒           │ ← Phase 2                                          ║
║   │ ⭐ Review Collection 🔒     │ ← Phase 2                                          ║
║   │                             │                                                    ║
║   │ ─── MARKETING ───           │                                                    ║
║   │ 📱 Social Media 🔒          │ ← Phase 3                                          ║
║   │ 📧 Direct Mail 🔒           │ ← Phase 2                                          ║
║   │ 🏠 Home Valuation 🔒        │ ← Phase 3                                          ║
║   │ 💬 Chat Widget 🔒           │ ← Phase 3                                          ║
║   │ 🌐 Website Builder 🔒       │ ← Phase 3                                          ║
║   │                             │                                                    ║
║   │ ─── REPORTS ───             │                                                    ║
║   │ 📊 Market Reports 🔒        │ ← Phase 3                                          ║
║   │ 📋 Showing Feedback 🔒      │ ← Phase 3                                          ║
║   │                             │                                                    ║
║   │ ───────────────             │                                                    ║
║   │ ⚙️ Settings                 │ ← Always included                                  ║
║   │ 💳 Billing                  │ ← Always included                                  ║
║   └─────────────────────────────┘                                                    ║
║                                                                                       ║
║   BENEFITS:                                                                          ║
║   ─────────                                                                          ║
║   1. Agent always sees what's possible → constant upsell opportunity                 ║
║   2. Locked features aren't hidden → creates desire                                  ║
║   3. 1-click to preview → low friction exploration                                   ║
║   4. 1-click to add → easy upgrade path                                              ║
║   5. We enable features instantly after payment                                      ║
║   6. Dashboard grows with their business                                             ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### Premium Preview Modal (When Clicking 🔒 Feature)

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                    [X Close]  ║
║                                                                               ║
║   📞 AI VOICE CALLS — Premium Preview                                        ║
║   ═══════════════════════════════════                                         ║
║                                                                               ║
║   WHAT YOU GET:                                                               ║
║   ─────────────                                                               ║
║   ✓ AI makes calls to your leads automatically                               ║
║   ✓ Natural conversation, handles objections                                 ║
║   ✓ Books appointments directly to your calendar                             ║
║   ✓ Leaves voicemail if no answer                                            ║
║   ✓ Full transcripts in dashboard                                            ║
║   ✓ Works 24/7 - no sick days, no training                                   ║
║                                                                               ║
║   REPLACES: ISA Service ($795-1,800/mo)                                      ║
║   YOUR PRICE: $297/mo (500 calls) or $697/mo (2000 calls)                    ║
║   SAVINGS: 62-83%                                                            ║
║                                                                               ║
║   ─────────────────────────────────────────────────────────────────────────  ║
║                                                                               ║
║   LIVE DEMO PREVIEW (Sample Data):                                            ║
║   ┌─────────────────────────┐            ┌────────────────────────┐          ║
║   │  USAGE                  │            │ RECENT CALLS           │          ║
║   │  127 / 500 calls        │            │ Sarah M.    🔥 Hot Lead│          ║
║   │  █████████░░░░░░░ 25%   │            │ 4:23 min · 2 hrs ago  │          ║
║   │  373 calls remaining    │            │ [🎧 Listen] [📝 View] │          ║
║   └─────────────────────────┘            └────────────────────────┘          ║
║                                                                               ║
║   [  Add to My System - $297/mo  ]        [  Maybe Later  ]                  ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## Part 1: Complete Dashboard Pages (12 Pages)

### Dashboard Sitemap

```
AGENT DASHBOARD PAGES:
──────────────────────

/dashboard                    Home (Overview + Quick Actions)
/dashboard/leads              All Leads (List + Kanban)
/dashboard/leads/[id]         Lead Detail (Full Profile)
/dashboard/conversations      Message Inbox
/dashboard/appointments       Calendar + List View
/dashboard/pipeline           Deal Pipeline (Kanban)
/dashboard/analytics          Performance Stats
/dashboard/campaigns          Campaign Management
/dashboard/templates          Message Templates
/dashboard/team               Team Members (Scale plan)
/dashboard/settings           Preferences + Integrations
/dashboard/billing            Subscription + Usage

TOTAL: 12 pages
```

---

### Page 1: Dashboard Home (/dashboard)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────┐                                                                │
│  │ 🏠 Home │  Good morning, John! Here's your business at a glance.        │
│  │ 👥 Leads│                                                                │
│  │ 💬 Chat │  ═══════════════════════════════════════════════════════════  │
│  │ 📅 Appts│                                                                │
│  │ 📊 Pipe │  TODAY'S SNAPSHOT                                              │
│  │ 📈 Stats│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ 📢 Camps│  │     12     │ │     8      │ │     3      │ │    4.2s    │  │
│  │ 📝 Temps│  │ New Leads  │ │ AI Replied │ │ Appts Set  │ │ Avg Speed  │  │
│  │ 👨‍👩‍👧 Team │  │   ▲ 20%    │ │   100%     │ │   ▲ 50%    │ │  ▼ 0.8s   │  │
│  │ ⚙️ Setup│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│  │ 💳 Bill │                                                                │
│  │         │  THIS MONTH                                                    │
│  │         │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │         │  │    347     │ │     52     │ │      8     │ │   $96K     │  │
│  │         │  │Total Leads │ │Appointments│ │  Listings  │ │  Pipeline  │  │
│  │         │  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
│  │         │                                                                │
│  │         │  ═══════════════════════════════════════════════════════════  │
│  │         │                                                                │
│  │         │  🔥 HOT LEADS (Action Needed)         📅 TODAY'S APPOINTMENTS │
│  │         │  ┌─────────────────────────────┐     ┌────────────────────────┐│
│  │         │  │ 🔥 Sarah M.        5m ago   │     │ 2:00 PM                ││
│  │         │  │    Expired - 123 Oak St     │     │ Tom H. - Listing       ││
│  │         │  │    "Yes, I want to sell"    │     │ 123 Main St            ││
│  │         │  │    [📞 Call] [👁 View]      │     │ [✓] [↻] [✗]            ││
│  │         │  ├─────────────────────────────┤     ├────────────────────────┤│
│  │         │  │ 🟠 Mike T.         2h ago   │     │ 4:00 PM                ││
│  │         │  │    Buyer - Looking 3BR      │     │ Lisa R. - Buyer        ││
│  │         │  │    "What areas do you..."   │     │ Virtual Meeting        ││
│  │         │  │    [📞 Call] [👁 View]      │     │ [✓] [↻] [✗]            ││
│  │         │  └─────────────────────────────┘     └────────────────────────┘│
│  │         │                                                                │
│  │         │  ═══════════════════════════════════════════════════════════  │
│  │         │                                                                │
│  │         │  📊 QUICK PIPELINE                  ⚡ RECENT ACTIVITY         │
│  │         │  ┌─────────────────────────────┐    ┌─────────────────────────┐│
│  │         │  │ New        ████████░░  45   │    │ • 2m: New lead - James  ││
│  │         │  │ Contacted  ██████████  123  │    │ • 5m: Appt booked Sarah ││
│  │         │  │ Qualified  ██████░░░░  67   │    │ • 12m: AI replied Mike  ││
│  │         │  │ Appt Set   ████░░░░░░  28   │    │ • 1h: HOT lead - Tom    ││
│  │         │  │ Listed     ██░░░░░░░░  8    │    │ • 2h: SMS sent - Jane   ││
│  │         │  │ Closed     █░░░░░░░░░  4    │    │ • 3h: Lead qualified    ││
│  │         │  └─────────────────────────────┘    └─────────────────────────┘│
│  │         │                                                                │
│  │         │  [+ Add Manual Lead]  [📊 Full Analytics]  [⚙️ Settings]       │
│  │         │                                                                │
│  └─────────┘                                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Today's stats (new leads, responses, appointments, speed)
- Monthly stats (total leads, appointments, listings, pipeline value)
- Hot leads requiring action
- Today's appointments
- Pipeline overview
- Recent activity feed

**MANAGE করতে পারবে:**
- Quick call any hot lead (click-to-call)
- View lead details
- Confirm/reschedule/cancel appointments
- Add manual lead
- Navigate to any section

---

### Page 2: All Leads (/dashboard/leads)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LEADS                                          [🔍 Search] [+ Add Lead]   │
│                                                                             │
│  VIEW: [📋 List] [📊 Kanban]          FILTER: [All ▼] [Source ▼] [Date ▼]  │
│                                                                             │
│  QUICK FILTERS:                                                             │
│  [All 347] [🔥 Hot 12] [🟠 Warm 45] [🆕 New 28] [Expired 145] [FSBO 67]    │
│  [Buyer 98] [Circle 37] [📅 Has Appt 52] [🚫 DNC 23]                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ □ │ Lead           │ Type    │ Status │ Source  │ Last     │ Actions   ││
│  ├───┼────────────────┼─────────┼────────┼─────────┼──────────┼───────────┤│
│  │ □ │ 🔥 Sarah M.    │ Expired │ HOT    │ REDX    │ 5m ago   │ 📞 👁 ✏️  ││
│  │   │ 123 Oak St     │         │        │         │          │ 📅 🚫     ││
│  ├───┼────────────────┼─────────┼────────┼─────────┼──────────┼───────────┤│
│  │ □ │ 🟠 Mike T.     │ Buyer   │ Warm   │ Zillow  │ 2h ago   │ 📞 👁 ✏️  ││
│  │   │ Looking 3BR    │         │        │         │          │ 📅 🚫     ││
│  ├───┼────────────────┼─────────┼────────┼─────────┼──────────┼───────────┤│
│  │ □ │ 🆕 Jane D.     │ FSBO    │ New    │ BatchD  │ Just now │ 📞 👁 ✏️  ││
│  │   │ 456 Pine Ave   │         │        │         │          │ 📅 🚫     ││
│  ├───┼────────────────┼─────────┼────────┼─────────┼──────────┼───────────┤│
│  │ □ │ Tom H.         │ Expired │ Appt   │ REDX    │ 1d ago   │ 📞 👁 ✏️  ││
│  │   │ 789 Main St    │         │ Set    │         │          │ 📅 🚫     ││
│  ├───┼────────────────┼─────────┼────────┼─────────┼──────────┼───────────┤│
│  │ □ │ Lisa R.        │ Buyer   │ Qual   │ FB Ads  │ 3h ago   │ 📞 👁 ✏️  ││
│  │   │ First-time     │         │        │         │          │ 📅 🚫     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  BULK ACTIONS: [Select All] [📨 Send SMS] [🚫 Mark DNC] [📁 Export]        │
│                                                                             │
│  Showing 1-25 of 347 leads                              [◄ Prev] [Next ►]  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

KANBAN VIEW:
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  NEW (45)      CONTACTED    QUALIFIED    APPT SET    LISTED     CLOSED     │
│                  (123)        (67)         (28)        (8)        (4)      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ ┌────────┐ │
│  │Jane D.  │  │Tom H.   │  │Lisa R.  │  │Sarah M. │  │Mike T. │ │Amy K.  │ │
│  │FSBO     │  │Expired  │  │Buyer    │  │Expired  │  │Expired │ │Buyer   │ │
│  │$389K    │  │$425K    │  │$350K    │  │$425K    │  │$299K   │ │$450K   │ │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └────────┘ └────────┘ │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                        │
│  │James K. │  │Pete S.  │  │Nancy W. │  │Bob J.   │  DRAG & DROP           │
│  │Buyer    │  │FSBO     │  │Circle   │  │Buyer    │  to move leads         │
│  │$275K    │  │$510K    │  │$320K    │  │$400K    │                        │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- All leads (347 total)
- Filter by type (Expired, FSBO, Buyer, Circle)
- Filter by status (Hot, Warm, New, Has Appointment, DNC)
- Filter by source (Zillow, REDX, Facebook, etc.)
- Search by name or address
- List view or Kanban view
- Last contact time
- Lead source

**MANAGE করতে পারবে:**
- 📞 Click-to-call any lead
- 👁 View lead details
- ✏️ Edit lead info
- 📅 Book appointment
- 🚫 Mark as DNC (Do Not Contact)
- Bulk select and send SMS
- Bulk export to CSV
- Drag-drop in Kanban to change status
- Add new lead manually

---

### Page 3: Lead Detail (/dashboard/leads/[id])

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ← Back to Leads                                    [✏️ Edit] [🗑 Delete]   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  SARAH MARTINEZ                                     Status: 🔥 HOT      ││
│  │  ══════════════════════════════════════════════════════════════════    ││
│  │                                                                         ││
│  │  QUICK ACTIONS:                                                         ││
│  │  [📞 Call Now] [💬 Send SMS] [📧 Send Email] [📅 Book Appt] [🚫 DNC]   ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌──────────────────────────────┐  ┌────────────────────────────────────┐  │
│  │ 👤 CONTACT INFO              │  │ 🏠 PROPERTY INFO                   │  │
│  │                              │  │                                    │  │
│  │ Phone: (555) 123-4567  📋    │  │ Address: 123 Oak Street            │  │
│  │ Email: sarah@email.com 📋    │  │ City: Cleveland, OH 44113          │  │
│  │ Best Time: Afternoons        │  │                                    │  │
│  │                              │  │ Beds: 4  |  Baths: 3               │  │
│  │ Source: REDX (Expired)       │  │ Sqft: 2,450                        │  │
│  │ Created: Apr 10, 2026        │  │ List Price: $425,000               │  │
│  │ Last Contact: 5 min ago      │  │ Status: Expired (45 days)          │  │
│  │                              │  │                                    │  │
│  │ [Edit Contact Info]          │  │ [View on Zillow] [View on MLS]     │  │
│  │                              │  │                                    │  │
│  └──────────────────────────────┘  └────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 🤖 AI QUALIFICATION SCORE                                              ││
│  │                                                                         ││
│  │ Overall Score: 92/100  ████████████████████░░  HIGHLY QUALIFIED        ││
│  │                                                                         ││
│  │ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐            ││
│  │ │ Motivation      │ │ Timeline        │ │ Decision Maker  │            ││
│  │ │ ████████████ 9  │ │ ████████░░░ 7   │ │ ██████████ 10   │            ││
│  │ │ Must sell       │ │ 30 days         │ │ Yes, confirmed  │            ││
│  │ │ (relocating)    │ │                 │ │                 │            ││
│  │ └─────────────────┘ └─────────────────┘ └─────────────────┘            ││
│  │                                                                         ││
│  │ ┌─────────────────┐ ┌─────────────────┐                                ││
│  │ │ Price Flexible  │ │ Engagement      │  AI INSIGHTS:                  ││
│  │ │ ████████░░░ 8   │ │ ██████████ 10   │  • Ready to list immediately   ││
│  │ │ Yes, willing to │ │ Very responsive │  • Frustrated with last agent  ││
│  │ │ negotiate       │ │                 │  • Relocating - urgent         ││
│  │ └─────────────────┘ └─────────────────┘  • Price flexible if fast      ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 💬 CONVERSATION HISTORY                              [Send Manual SMS]  ││
│  │                                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │                                                                     │ ││
│  │ │  🤖 AI • Today 2:15 PM                                              │ ││
│  │ │  ┌───────────────────────────────────────────────────────────────┐  │ ││
│  │ │  │ Hi Sarah, I noticed your home at 123 Oak St just came off    │  │ ││
│  │ │  │ the market. Still looking to sell?                           │  │ ││
│  │ │  └───────────────────────────────────────────────────────────────┘  │ ││
│  │ │                                                                     │ ││
│  │ │                                        Sarah • Today 2:18 PM  👤    │ ││
│  │ │   ┌───────────────────────────────────────────────────────────────┐ │ ││
│  │ │   │ Yes, we need to sell. Our last agent didn't do much.         │ │ ││
│  │ │   │ We're relocating in 45 days.                                 │ │ ││
│  │ │   └───────────────────────────────────────────────────────────────┘ │ ││
│  │ │                                                                     │ ││
│  │ │  🤖 AI • Today 2:18 PM                                              │ ││
│  │ │  ┌───────────────────────────────────────────────────────────────┐  │ ││
│  │ │  │ I totally understand the frustration. 45 days is tight but   │  │ ││
│  │ │  │ doable with the right strategy. Would you be open to a quick │  │ ││
│  │ │  │ 15-min call to discuss how we can fix it?                    │  │ ││
│  │ │  └───────────────────────────────────────────────────────────────┘  │ ││
│  │ │                                                                     │ ││
│  │ │                                        Sarah • Today 2:22 PM  👤    │ ││
│  │ │   ┌───────────────────────────────────────────────────────────────┐ │ ││
│  │ │   │ Sure, I can do tomorrow afternoon                            │ │ ││
│  │ │   └───────────────────────────────────────────────────────────────┘ │ ││
│  │ │                                                                     │ ││
│  │ │  🤖 AI • Today 2:22 PM                                              │ ││
│  │ │  ┌───────────────────────────────────────────────────────────────┐  │ ││
│  │ │  │ Perfect! I have 2pm or 4pm available. Which works better?    │  │ ││
│  │ │  └───────────────────────────────────────────────────────────────┘  │ ││
│  │ │                                                                     │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │                                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ Type your message...                                    [📎] [Send] │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ┌──────────────────────────────┐  ┌────────────────────────────────────┐  │
│  │ 📅 APPOINTMENTS              │  │ 📝 NOTES                           │  │
│  │                              │  │                                    │  │
│  │ Upcoming:                    │  │ Apr 11, 3:00 PM - You              │  │
│  │ • Apr 12, 2:00 PM           │  │ "Hot lead! Relocating in 45 days.  │  │
│  │   Listing Presentation       │  │  Previous agent issues. Need to    │  │
│  │   [Confirm] [Reschedule]     │  │  move fast on pricing strategy."   │  │
│  │                              │  │                                    │  │
│  │ Past:                        │  │ Apr 10, 10:00 AM - AI              │  │
│  │ • None                       │  │ "Lead responded positively to      │  │
│  │                              │  │  initial outreach. High motivation │  │
│  │ [+ Schedule New]             │  │  detected."                        │  │
│  │                              │  │                                    │  │
│  │                              │  │ [+ Add Note]                       │  │
│  │                              │  │                                    │  │
│  └──────────────────────────────┘  └────────────────────────────────────┘  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 📊 ACTIVITY TIMELINE                                                   ││
│  │                                                                         ││
│  │ Apr 11, 2:22 PM  💬 AI sent appointment options                        ││
│  │ Apr 11, 2:22 PM  💬 Sarah replied "Sure, I can do tomorrow"            ││
│  │ Apr 11, 2:18 PM  🤖 AI classified as HOT (score: 92)                   ││
│  │ Apr 11, 2:18 PM  💬 Sarah replied "Yes, we need to sell..."            ││
│  │ Apr 11, 2:15 PM  💬 AI sent initial outreach SMS                       ││
│  │ Apr 11, 2:15 PM  📥 Lead created from REDX expired data                ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Complete contact info (phone, email, best time)
- Property details (address, beds, baths, sqft, price)
- AI qualification score (motivation, timeline, decision maker, etc.)
- AI insights (bullet points)
- Full conversation history (AI + lead messages)
- Upcoming and past appointments
- Notes (from agent + AI)
- Complete activity timeline

**MANAGE করতে পারবে:**
- 📞 One-click call
- 💬 Send manual SMS (type and send)
- 📧 Send email
- 📅 Book/reschedule appointment
- 🚫 Mark as DNC
- ✏️ Edit contact/property info
- 📝 Add notes
- 🗑 Delete lead
- Change lead status
- Confirm/reschedule appointments

---

### Page 4: Conversations (/dashboard/conversations)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONVERSATIONS                                    [All] [Unread (7)] [Hot] │
│                                                                             │
│  ┌────────────────────────┐  ┌──────────────────────────────────────────┐  │
│  │                        │  │                                          │  │
│  │ INBOX                  │  │ 🔥 Sarah M.                    HOT LEAD │  │
│  │                        │  │ Expired - 123 Oak St                     │  │
│  │ ┌────────────────────┐ │  │                                          │  │
│  │ │🔵 Sarah M.     2m  │ │  │ ┌──────────────────────────────────────┐ │  │
│  │ │🔥 "Sure, I can..." │ │  │ │                                      │ │  │
│  │ └────────────────────┘ │  │ │  Today                                │ │  │
│  │ ┌────────────────────┐ │  │ │                                      │ │  │
│  │ │🔵 Mike T.      1h  │ │  │ │  🤖 AI 2:15 PM                       │ │  │
│  │ │🟠 "Looking 3BR..." │ │  │ │  Hi Sarah, I noticed your home...   │ │  │
│  │ └────────────────────┘ │  │ │                                      │ │  │
│  │ ┌────────────────────┐ │  │ │                     Sarah 2:18 PM 👤 │ │  │
│  │ │🔵 Jane D.      3h  │ │  │ │  Yes, we need to sell. Our last...  │ │  │
│  │ │🆕 "What's the..."  │ │  │ │                                      │ │  │
│  │ └────────────────────┘ │  │ │  🤖 AI 2:18 PM                       │ │  │
│  │ ┌────────────────────┐ │  │ │  I totally understand the...        │ │  │
│  │ │   Tom H.       1d  │ │  │ │                                      │ │  │
│  │ │   "Tuesday works"  │ │  │ │                     Sarah 2:22 PM 👤 │ │  │
│  │ └────────────────────┘ │  │ │  Sure, I can do tomorrow afternoon  │ │  │
│  │ ┌────────────────────┐ │  │ │                                      │ │  │
│  │ │   Lisa R.      2d  │ │  │ │  🤖 AI 2:22 PM                       │ │  │
│  │ │   "Not right now"  │ │  │ │  Perfect! I have 2pm or 4pm...      │ │  │
│  │ └────────────────────┘ │  │ │                                      │ │  │
│  │ ┌────────────────────┐ │  │ └──────────────────────────────────────┘ │  │
│  │ │   Pete S.      3d  │ │  │                                          │  │
│  │ │   "Send me info"   │ │  │ ┌──────────────────────────────────────┐ │  │
│  │ └────────────────────┘ │  │ │ Type a message...          [📎] [⏎] │ │  │
│  │                        │  │ └──────────────────────────────────────┘ │  │
│  │ 🔍 Search...           │  │                                          │  │
│  │                        │  │ QUICK ACTIONS:                           │  │
│  └────────────────────────┘  │ [📞 Call] [📅 Book Appt] [👁 Full Profile]│  │
│                              │                                          │  │
│                              └──────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- All conversations (inbox style)
- Unread conversations (blue dot indicator)
- Hot lead conversations (fire icon)
- Message preview
- Full conversation thread
- Timestamp on each message

**MANAGE করতে পারবে:**
- Send manual SMS reply
- Click-to-call from conversation
- Book appointment from conversation
- Mark conversation as read
- Navigate to full lead profile
- Search conversations

---

### Page 5: Appointments (/dashboard/appointments)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  APPOINTMENTS                               [📅 Calendar] [📋 List]        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │         APRIL 2026                                                      ││
│  │  ◄    Week of April 11-17    ►                     [+ New Appointment] ││
│  │                                                                         ││
│  │  SUN     MON      TUE      WED      THU      FRI      SAT              ││
│  │   6       7        8        9       10       11       12               ││
│  │                                                                         ││
│  │                                            ┌─────┐  ┌─────┐            ││
│  │                                            │2 PM │  │10 AM│            ││
│  │                                            │Tom  │  │Sarah│            ││
│  │                                            ├─────┤  ├─────┤            ││
│  │                                            │4 PM │  │2 PM │            ││
│  │                                            │Lisa │  │James│            ││
│  │                                            └─────┘  └─────┘            ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  TODAY - Friday, April 11                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 2:00 PM │ Tom H.          │ Listing Appointment    │ [✓] [↻] [✗] [👁] ││
│  │         │ 123 Main St     │ Expired → Listing      │                   ││
│  │         │ 📞 555-123-4567 │ 🔥 Hot Lead            │                   ││
│  ├─────────┼─────────────────┼────────────────────────┼───────────────────┤│
│  │ 4:00 PM │ Lisa R.         │ Buyer Consultation     │ [✓] [↻] [✗] [👁] ││
│  │         │ Virtual (Zoom)  │ First-time buyer       │                   ││
│  │         │ 📞 555-234-5678 │ 🟠 Warm Lead           │                   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  TOMORROW - Saturday, April 12                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 10:00 AM│ Sarah M.        │ Listing Presentation   │ [✓] [↻] [✗] [👁] ││
│  │         │ 123 Oak St      │ Expired → Listing      │                   ││
│  │         │ 📞 555-123-4567 │ 🔥 Hot Lead            │                   ││
│  ├─────────┼─────────────────┼────────────────────────┼───────────────────┤│
│  │ 2:00 PM │ James K.        │ Showing                │ [✓] [↻] [✗] [👁] ││
│  │         │ 456 Pine Ave    │ Buyer - 3BR search     │                   ││
│  │         │ 📞 555-345-6789 │ 🟠 Warm Lead           │                   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  STATS THIS WEEK:                                                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │      8       │ │     87%      │ │      2       │ │      1       │       │
│  │  Scheduled   │ │  Show Rate   │ │   Listings   │ │  No Shows    │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Calendar view (week/month)
- List view by day
- All appointment details
- Lead info for each appointment
- Show rate statistics
- Upcoming + past appointments

**MANAGE করতে পারবে:**
- ✓ Confirm appointment
- ↻ Reschedule (opens calendar picker)
- ✗ Cancel appointment
- 👁 View lead profile
- + Create new appointment
- Click-to-call from appointment

---

### Page 6: Pipeline (/dashboard/pipeline)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DEAL PIPELINE                           Total Value: $2.4M    [+ Add Deal]│
│                                                                             │
│  ┌───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐ │
│  │ PROSPECT  │ CONTACTED │ QUALIFIED │ APPT SET  │  LISTED   │  CLOSED   │ │
│  │ 45 leads  │ 123 leads │ 67 leads  │ 28 leads  │ 8 deals   │ 4 deals   │ │
│  │  $540K    │  $1.4M    │  $800K    │  $340K    │  $180K    │  $96K     │ │
│  ├───────────┼───────────┼───────────┼───────────┼───────────┼───────────┤ │
│  │           │           │           │           │           │           │ │
│  │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ │
│  │ │Jane D.│ │ │Tom H. │ │ │Lisa R.│ │ │Sarah M│ │ │Mike T.│ │ │Amy K. │ │ │
│  │ │FSBO   │ │ │Expired│ │ │Buyer  │ │ │Expired│ │ │Expired│ │ │Buyer  │ │ │
│  │ │$389K  │ │ │$425K  │ │ │$350K  │ │ │$425K  │ │ │$299K  │ │ │$450K  │ │ │
│  │ │       │ │ │       │ │ │       │ │ │🔥 Hot │ │ │Listed │ │ │Closed │ │ │
│  │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ │
│  │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ ┌───────┐ │ │
│  │ │James K│ │ │Pete S.│ │ │Nancy W│ │ │Bob J. │ │ │Kim L. │ │ │Dan P. │ │ │
│  │ │Buyer  │ │ │FSBO   │ │ │Circle │ │ │Buyer  │ │ │FSBO   │ │ │Expired│ │ │
│  │ │$275K  │ │ │$510K  │ │ │$320K  │ │ │$400K  │ │ │$285K  │ │ │$375K  │ │ │
│  │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ └───────┘ │ │
│  │    ...    │    ...    │    ...    │    ...    │    ...    │    ...    │ │
│  │           │           │           │           │           │           │ │
│  │  DRAG & DROP TO MOVE DEALS BETWEEN STAGES                             │ │
│  │                                                                         │ │
│  └───────────┴───────────┴───────────┴───────────┴───────────┴───────────┘ │
│                                                                             │
│  PIPELINE ANALYTICS:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Avg Days in Stage:  Prospect→Contact: 1d | Contact→Qual: 3d | ...      ││
│  │ Conversion Rate:    Prospect→Closed: 2.3% | Appt→Listed: 28.5%         ││
│  │ Avg Deal Value:     $28,500 commission                                  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Full pipeline (Kanban style)
- Deal count and value per stage
- Total pipeline value
- Individual deal cards
- Pipeline analytics (avg days, conversion rates)

**MANAGE করতে পারবে:**
- Drag-drop deals between stages
- Click deal to view details
- Add new deal manually
- Edit deal value
- Mark deal as won/lost

---

### Page 7: Analytics (/dashboard/analytics)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ANALYTICS                    [This Week ▼]  [Export PDF]  [Export CSV]    │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  CONVERSION FUNNEL                                                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  Leads ────────► Contacted ────────► Qualified ────────► Appt ────► Won ││
│  │   347              312                89                 52         8   ││
│  │  (100%)           (90%)              (26%)              (15%)     (2.3%)││
│  │                                                                         ││
│  │  ████████████████████████████████████████████████████████████████████  ││
│  │  ██████████████████████████████████████████████████████████████        ││
│  │  ██████████████████████████████████                                     ││
│  │  ████████████████████████                                               ││
│  │  █████████                                                              ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  KEY METRICS                                                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Avg Response     │  │ Response Rate    │  │ Booking Rate     │          │
│  │     4.2 sec      │  │      90%         │  │      15%         │          │
│  │  ▼ 0.8s vs last  │  │  ▲ 5% vs last    │  │  ▲ 3% vs last    │          │
│  │     week         │  │     week         │  │     week         │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  PERFORMANCE BY SOURCE                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Source      │ Leads │ Appts │ Listed │ Conv % │ Revenue   │ Cost/Lead  ││
│  ├─────────────┼───────┼───────┼────────┼────────┼───────────┼────────────┤│
│  │ Expired     │  145  │  23   │   4    │ 15.9%  │ $48,000   │   $0.50    ││
│  │ Buyer Leads │   98  │  18   │   2    │ 18.4%  │ $32,000   │   $15.00   ││
│  │ FSBO        │   67  │   8   │   1    │ 11.9%  │ $12,000   │   $0.75    ││
│  │ Circle      │   37  │   3   │   1    │  8.1%  │  $4,000   │   $0.25    ││
│  │ TOTAL       │  347  │  52   │   8    │ 15.0%  │ $96,000   │   $2.85    ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  AI PERFORMANCE                           TOP PERFORMING MESSAGES           │
│  ┌────────────────────────────┐          ┌──────────────────────────────┐  │
│  │ Messages Sent: 1,247       │          │ 1. "Quick question about     │  │
│  │ Responses: 562 (45%)       │          │    your home..." - 52%       │  │
│  │ Appointments: 52 (9.2%)    │          │                              │  │
│  │                            │          │ 2. "I noticed your listing   │  │
│  │ Best Day: Tuesday (58%)    │          │    expired..." - 48%         │  │
│  │ Best Time: 10-11 AM        │          │                              │  │
│  │                            │          │ 3. "Still looking for a      │  │
│  │ Thompson Sampling:         │          │    buyer?" - 41%             │  │
│  │ Active templates: 12       │          │                              │  │
│  │ Top performer: Template A  │          │ WORST: "Hi there..." - 18%   │  │
│  └────────────────────────────┘          └──────────────────────────────┘  │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  ROI CALCULATOR                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  Your Monthly Investment:           $997                                ││
│  │  Deals Closed This Month:           4                                   ││
│  │  Estimated Commission:              $48,000                             ││
│  │  ─────────────────────────────────────────                              ││
│  │  Your ROI:                          4,714% 🚀                           ││
│  │                                                                         ││
│  │  Without AgentSix (estimate):        1-2 deals = $12,000                 ││
│  │  With AgentSix (actual):             4 deals = $48,000                   ││
│  │  ─────────────────────────────────────────                              ││
│  │  Extra Income from AgentSix:         $36,000 this month                  ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Complete conversion funnel
- Key metrics (response time, response rate, booking rate)
- Week-over-week trends
- Performance by lead source
- AI performance stats
- Top/worst performing messages
- Thompson Sampling results
- ROI calculator

**MANAGE করতে পারবে:**
- Change date range (week/month/quarter)
- Export to PDF
- Export to CSV

---

### Page 8: Campaigns (/dashboard/campaigns)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CAMPAIGNS                                                 [+ New Campaign] │
│                                                                             │
│  ACTIVE CAMPAIGNS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ 📢 Expired Listing Outreach                           [⏸ Pause]    │ ││
│  │ │                                                                     │ ││
│  │ │ Status: ● ACTIVE     Started: Apr 1, 2026     Daily Limit: 50      │ ││
│  │ │                                                                     │ ││
│  │ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │ ││
│  │ │ │   145    │ │   65     │ │   23     │ │   45%    │               │ ││
│  │ │ │  Sent    │ │ Replied  │ │ Appts    │ │ Response │               │ ││
│  │ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │ ││
│  │ │                                                                     │ ││
│  │ │ [View Details] [Edit Settings] [View Leads]                        │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │                                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ 📢 FSBO Conversion                                    [⏸ Pause]    │ ││
│  │ │                                                                     │ ││
│  │ │ Status: ● ACTIVE     Started: Apr 5, 2026     Daily Limit: 30      │ ││
│  │ │                                                                     │ ││
│  │ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │ ││
│  │ │ │    67    │ │   28     │ │    8     │ │   42%    │               │ ││
│  │ │ │  Sent    │ │ Replied  │ │ Appts    │ │ Response │               │ ││
│  │ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │ ││
│  │ │                                                                     │ ││
│  │ │ [View Details] [Edit Settings] [View Leads]                        │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │                                                                         ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ 📢 Buyer Lead Response                                [⏸ Pause]    │ ││
│  │ │                                                                     │ ││
│  │ │ Status: ● ACTIVE     Started: Mar 15, 2026    Auto-response: ON    │ ││
│  │ │                                                                     │ ││
│  │ │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │ ││
│  │ │ │    98    │ │   98     │ │   18     │ │   100%   │               │ ││
│  │ │ │ Received │ │ Replied  │ │ Appts    │ │ Response │               │ ││
│  │ │ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │ ││
│  │ │                                                                     │ ││
│  │ │ [View Details] [Edit Settings] [View Leads]                        │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  PAUSED CAMPAIGNS                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 📢 Circle Prospecting                                   [▶ Resume]     ││
│  │ Status: ⏸ PAUSED    Paused: Apr 8, 2026    Reason: Agent request      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- All active campaigns
- Campaign stats (sent, replied, appointments, response rate)
- Paused campaigns
- Campaign start date
- Daily limits

**MANAGE করতে পারবে:**
- ⏸ Pause any campaign
- ▶ Resume paused campaign
- Edit campaign settings
- Change daily limits
- View leads from campaign
- Create new campaign

---

### Page 9: Templates (/dashboard/templates)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  MESSAGE TEMPLATES                                         [+ New Template] │
│                                                                             │
│  FILTER: [All] [Expired] [FSBO] [Buyer] [Follow-up]                        │
│                                                                             │
│  TOP PERFORMERS (Thompson Sampling)                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │ 🥇 TEMPLATE A - Expired Initial                          52% response  ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ "Hi {{firstName}}, quick question about your home at {{address}}.  │ ││
│  │ │ I noticed it just came off the market. Still looking to sell?"     │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │ Sent: 234  |  Replies: 122  |  Appts: 18  |  [Edit] [Duplicate]        ││
│  │                                                                         ││
│  │ 🥈 TEMPLATE B - Expired Follow-up                        48% response  ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ "Hey {{firstName}}, following up on my message about {{address}}.  │ ││
│  │ │ Curious if you've given any more thought to selling?"              │ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │ Sent: 156  |  Replies: 75  |  Appts: 12  |  [Edit] [Duplicate]         ││
│  │                                                                         ││
│  │ 🥉 TEMPLATE C - FSBO Initial                             41% response  ││
│  │ ┌─────────────────────────────────────────────────────────────────────┐ ││
│  │ │ "Hi {{firstName}}, saw you're selling {{address}} on your own.     │ ││
│  │ │ Quick question - open to hearing what an agent could do different?"│ ││
│  │ └─────────────────────────────────────────────────────────────────────┘ ││
│  │ Sent: 89  |  Replies: 36  |  Appts: 8  |  [Edit] [Duplicate]           ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  ALL TEMPLATES                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Template         │ Type     │ Sent │ Response │ Status │ Actions       ││
│  ├──────────────────┼──────────┼──────┼──────────┼────────┼───────────────┤│
│  │ Buyer Welcome    │ Buyer    │ 98   │ 67%      │ Active │ [✏️] [📋] [🗑]││
│  │ FSBO Day 3       │ FSBO     │ 45   │ 38%      │ Active │ [✏️] [📋] [🗑]││
│  │ Circle Initial   │ Circle   │ 37   │ 22%      │ Active │ [✏️] [📋] [🗑]││
│  │ Nurture Monthly  │ Follow-up│ 120  │ 15%      │ Active │ [✏️] [📋] [🗑]││
│  │ Old Template X   │ Expired  │ 50   │ 12%      │ Paused │ [✏️] [📋] [🗑]││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  💡 Thompson Sampling automatically tests templates and uses winners more.  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Top performing templates (ranked by Thompson Sampling)
- All templates with stats
- Response rates per template
- Template content
- Which templates are active/paused

**MANAGE করতে পারবে:**
- ✏️ Edit template text
- 📋 Duplicate template
- 🗑 Delete template
- Create new template
- Pause/activate templates
- See A/B test results

---

### Page 10: Team (/dashboard/team) - Scale Plan Only

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  TEAM MEMBERS                                              [+ Invite Member]│
│                                                                             │
│  YOUR PLAN: Scale (5 seats)    USED: 3/5 seats                              │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │ ┌──────┐  John Smith (You)                              ADMIN          ││
│  │ │ 👤   │  john@realestate.com                                          ││
│  │ └──────┘  Last active: Just now                                         ││
│  │           This Month: 145 leads handled | 23 appointments | 4 listings  ││
│  │                                                                         ││
│  │ ┌──────┐  Sarah Johnson                                 AGENT          ││
│  │ │ 👤   │  sarah@realestate.com                          [Edit] [Remove]││
│  │ └──────┘  Last active: 2 hours ago                                      ││
│  │           This Month: 98 leads handled | 18 appointments | 2 listings   ││
│  │                                                                         ││
│  │ ┌──────┐  Mike Williams                                 AGENT          ││
│  │ │ 👤   │  mike@realestate.com                           [Edit] [Remove]││
│  │ └──────┘  Last active: 1 day ago                                        ││
│  │           This Month: 67 leads handled | 11 appointments | 2 listings   ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  TEAM PERFORMANCE                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Member        │ Leads │ Response Time │ Appts │ Listings │ Conversion  ││
│  ├───────────────┼───────┼───────────────┼───────┼──────────┼─────────────┤│
│  │ John Smith    │  145  │     4.1s      │  23   │    4     │   15.9%     ││
│  │ Sarah Johnson │   98  │     4.5s      │  18   │    2     │   18.4%     ││
│  │ Mike Williams │   67  │     5.2s      │  11   │    2     │   16.4%     ││
│  │ TEAM TOTAL    │  310  │     4.5s      │  52   │    8     │   16.8%     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  LEAD ROUTING RULES                                                         │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ ● Round Robin (current)  - Leads distributed evenly                     ││
│  │ ○ By Source              - Zillow→John, Facebook→Sarah, etc.           ││
│  │ ○ By Zip Code            - Geographic assignment                        ││
│  │ ○ By Performance         - Top performers get more leads                ││
│  │                                                        [Save Settings]  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- All team members
- Individual performance stats
- Team totals
- Lead routing rules
- Seat usage

**MANAGE করতে পারবে:**
- Invite new team member
- Edit member permissions
- Remove member
- Change lead routing rules
- View individual member activity

---

### Page 11: Settings (/dashboard/settings)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SETTINGS                                                                   │
│                                                                             │
│  ┌──────────────────────┐                                                   │
│  │ 👤 Profile           │  ═══════════════════════════════════════════════ │
│  │ 🔔 Notifications     │                                                   │
│  │ 📅 Calendar          │  PROFILE                                         │
│  │ 🎨 AI Preferences    │  ┌─────────────────────────────────────────────┐  │
│  │ 🔗 Integrations      │  │ Name: John Smith                  [Edit]   │  │
│  │ 🏢 Business Info     │  │ Email: john@realestate.com                 │  │
│  │                      │  │ Phone: (555) 123-4567             [Edit]   │  │
│  └──────────────────────┘  │ Brokerage: ABC Realty             [Edit]   │  │
│                            │ License #: 12345678               [Edit]   │  │
│                            │ Profile Photo: [Upload]                     │  │
│                            └─────────────────────────────────────────────┘  │
│                                                                             │
│                            NOTIFICATIONS                                    │
│                            ┌─────────────────────────────────────────────┐  │
│                            │                      SMS   Email   Push     │  │
│                            │ Hot Lead Alerts:     [✓]   [✓]    [✓]      │  │
│                            │ New Appointments:    [✓]   [✓]    [✓]      │  │
│                            │ Lead Replies:        [✓]   [ ]    [✓]      │  │
│                            │ Daily Summary:       [ ]   [✓]    [ ]      │  │
│                            │ Weekly Report:       [ ]   [✓]    [ ]      │  │
│                            │                                             │  │
│                            │ Quiet Hours: 9 PM - 8 AM           [Edit]  │  │
│                            └─────────────────────────────────────────────┘  │
│                                                                             │
│                            CALENDAR SYNC                                    │
│                            ┌─────────────────────────────────────────────┐  │
│                            │ Google Calendar: Connected ✓   [Disconnect] │  │
│                            │                                             │  │
│                            │ Availability:                               │  │
│                            │ Mon-Fri: 9:00 AM - 6:00 PM       [Edit]    │  │
│                            │ Saturday: 10:00 AM - 2:00 PM     [Edit]    │  │
│                            │ Sunday: Not available            [Edit]    │  │
│                            │                                             │  │
│                            │ Appointment Duration: 30 min     [Edit]    │  │
│                            │ Buffer Between: 15 min           [Edit]    │  │
│                            └─────────────────────────────────────────────┘  │
│                                                                             │
│                            AI PREFERENCES                                   │
│                            ┌─────────────────────────────────────────────┐  │
│                            │ AI Tone: Professional     [Change]          │  │
│                            │   Options: Professional / Friendly / Casual │  │
│                            │                                             │  │
│                            │ Auto-Response: ON         [Toggle]          │  │
│                            │ Follow-up Timing:                           │  │
│                            │   Day 1: Immediate                          │  │
│                            │   Day 3: Follow-up #1    [Edit]             │  │
│                            │   Day 5: Follow-up #2    [Edit]             │  │
│                            │   Day 7: Final attempt   [Edit]             │  │
│                            └─────────────────────────────────────────────┘  │
│                                                                             │
│                            INTEGRATIONS                                     │
│                            ┌─────────────────────────────────────────────┐  │
│                            │ Zillow: Connected ✓      [Manage]           │  │
│                            │ Facebook Leads: Connected ✓ [Manage]        │  │
│                            │ Google Calendar: Connected ✓ [Manage]       │  │
│                            │ Close CRM: Not connected  [Connect]         │  │
│                            │ Follow Up Boss: Not connected [Connect]     │  │
│                            └─────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Profile information
- Notification settings
- Calendar sync status
- AI preferences
- Connected integrations

**MANAGE করতে পারবে:**
- Edit profile (name, phone, brokerage, license)
- Toggle notifications (SMS, email, push)
- Set quiet hours
- Edit availability schedule
- Change AI tone (professional/friendly/casual)
- Toggle auto-response
- Edit follow-up timing
- Connect/disconnect integrations

---

### Page 12: Billing (/dashboard/billing)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  AgentSix                              🔔 3  👤 John Smith  ▼            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BILLING & SUBSCRIPTION                                                     │
│                                                                             │
│  CURRENT PLAN                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  PRO PLAN                                              $997/month       ││
│  │  ─────────────────────────────────────────────────────────────────     ││
│  │                                                                         ││
│  │  ✓ Lead Response Engine (5-sec AI response)                            ││
│  │  ✓ Listing Engine (Expired + FSBO outreach)                            ││
│  │  ✓ Up to 2,000 leads/month                                             ││
│  │  ✓ Thompson Sampling optimization                                       ││
│  │  ✓ Priority Slack support                                               ││
│  │  ✓ Weekly performance call                                              ││
│  │                                                                         ││
│  │  Next billing date: May 11, 2026                                        ││
│  │                                                                         ││
│  │  [Upgrade to Scale] [Cancel Plan]                                       ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  USAGE THIS MONTH                                                           │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  Leads Processed: 347 / 2,000                    ████████░░░░░ 17%     ││
│  │  SMS Sent: 1,247 / 5,000                         █████░░░░░░░░ 25%     ││
│  │  AI Responses: 562 / Unlimited                   ██████████████ N/A    ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  PAYMENT METHOD                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ 💳 Visa ending in 4242                     Expires: 12/27              ││
│  │    [Update Card] [Add Backup Card]                                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  BILLING HISTORY                                                            │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Date        │ Description              │ Amount    │ Status │ Receipt  ││
│  ├─────────────┼──────────────────────────┼───────────┼────────┼──────────┤│
│  │ Apr 11, 2026│ Pro Plan - Monthly       │   $997    │  Paid  │ [📄]     ││
│  │ Apr 1, 2026 │ Pro Setup Fee            │ $2,500    │  Paid  │ [📄]     ││
│  │ Mar 11, 2026│ Starter Plan - Monthly   │   $497    │  Paid  │ [📄]     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**VIEW করতে পারবে:**
- Current plan details
- Usage stats (leads, SMS, etc.)
- Payment method
- Billing history
- Receipts

**MANAGE করতে পারবে:**
- Upgrade plan
- Cancel plan
- Update payment card
- Download invoices/receipts

---

## Part 2: Complete Data Flow

### How Data Moves Through System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLETE DATA FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  LEAD SOURCES                                                               │
│  ────────────                                                               │
│                                                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │
│  │ Zillow  │  │Facebook │  │ Website │  │  REDX   │  │BatchData│          │
│  │  Leads  │  │  Leads  │  │  Form   │  │Expireds │  │  FSBO   │          │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘          │
│       │            │            │            │            │                │
│       └────────────┴────────────┴────────────┴────────────┘                │
│                                   │                                        │
│                                   ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         n8n: WF-AOS-INTAKE                          │   │
│  │                                                                     │   │
│  │  • Receive webhook                                                  │   │
│  │  • Normalize data                                                   │   │
│  │  • Dedup check                                                      │   │
│  │  • Create lead record                                               │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                        │
│                                   ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         n8n: WF-AOS-CLASSIFY                        │   │
│  │                                                                     │   │
│  │  • OpenAI classification                                            │   │
│  │  • Determine: Buyer / Seller / Investor                             │   │
│  │  • Determine: Hot / Warm / Cold                                     │   │
│  │  • Score motivation, timeline, etc.                                 │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                        │
│                    ┌──────────────┴──────────────┐                         │
│                    │                             │                         │
│                    ▼                             ▼                         │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐         │
│  │  n8n: WF-AOS-RESPONSE       │  │  n8n: WF-AOS-LISTING-REPLY  │         │
│  │  (Buyer Leads)              │  │  (Seller Leads)             │         │
│  │                             │  │                             │         │
│  │  • Select template          │  │  • Select template          │         │
│  │  • Generate AI response     │  │  • Generate AI response     │         │
│  │  • Send via Twilio          │  │  • Send via Twilio          │         │
│  └──────────────┬──────────────┘  └──────────────┬──────────────┘         │
│                 │                                │                         │
│                 └────────────────┬───────────────┘                         │
│                                  │                                         │
│                                  ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         n8n: WF-AOS-BOOKING                         │   │
│  │                                                                     │   │
│  │  • Check if lead wants appointment                                  │   │
│  │  • Get agent availability (Calendly)                                │   │
│  │  • Book appointment                                                 │   │
│  │  • Send confirmation SMS                                            │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                        │
│                                   ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    n8n: WF-AOS-DASHBOARD-SYNC                       │   │
│  │                                                                     │   │
│  │  • Push lead to Convex                                              │   │
│  │  • Push conversation to Convex                                      │   │
│  │  • Push appointment to Convex                                       │   │
│  │  • Update metrics                                                   │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                        │
│                                   ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         CONVEX DATABASE                             │   │
│  │                                                                     │   │
│  │  leads | conversations | appointments | deals | metrics | settings  │   │
│  │                                                                     │   │
│  └────────────────────────────────┬────────────────────────────────────┘   │
│                                   │                                        │
│                                   │ Real-time subscriptions                │
│                                   ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         AGENT DASHBOARD                             │   │
│  │                                                                     │   │
│  │  Agent sees EVERYTHING:                                             │   │
│  │  • New lead appears in real-time                                    │   │
│  │  • Conversation updates live                                        │   │
│  │  • Appointment shows on calendar                                    │   │
│  │  • Stats update immediately                                         │   │
│  │                                                                     │   │
│  │  Agent can DO EVERYTHING:                                           │   │
│  │  • Call lead (click-to-call)                                        │   │
│  │  • Send manual SMS                                                  │   │
│  │  • Book/reschedule appointments                                     │   │
│  │  • Move leads in pipeline                                           │   │
│  │  • Pause/resume campaigns                                           │   │
│  │  • Add notes                                                        │   │
│  │  • Change settings                                                  │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  AGENT TAKES ACTION                                                         │
│  ──────────────────                                                         │
│                                                                             │
│  Agent clicks "Send SMS"                                                    │
│       │                                                                     │
│       ▼                                                                     │
│  Dashboard → Convex API → n8n Webhook → Twilio → Lead's Phone              │
│       │                                                                     │
│       ▼                                                                     │
│  Convex updated → Dashboard shows "Message sent"                           │
│                                                                             │
│  ═══════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  LEAD REPLIES                                                               │
│  ────────────                                                               │
│                                                                             │
│  Lead sends SMS reply                                                       │
│       │                                                                     │
│       ▼                                                                     │
│  Twilio Webhook → n8n: WF-AOS-BUYER-REPLY → AI processes                   │
│       │                                                                     │
│       ▼                                                                     │
│  AI response sent → Convex updated → Dashboard shows new message           │
│       │                                                                     │
│       ▼                                                                     │
│  If HOT → WF-AOS-ALERTS → SMS/Email to agent "🔥 Hot lead!"                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Complete Feature Matrix

### What Agent Can VIEW (দেখতে পারবে)

| Feature | Dashboard Page | Data Source |
|---------|----------------|-------------|
| All leads | /leads | Convex: leads |
| Lead details | /leads/[id] | Convex: leads |
| All conversations | /conversations | Convex: conversations |
| AI qualification scores | /leads/[id] | Convex: leads.qualification |
| Appointments | /appointments | Convex: appointments |
| Pipeline | /pipeline | Convex: deals |
| Daily stats | /dashboard | Convex: metrics |
| Monthly stats | /analytics | Convex: metrics |
| Response times | /analytics | Convex: metrics |
| Conversion rates | /analytics | Convex: metrics |
| Source performance | /analytics | Convex: metrics |
| AI performance | /analytics | Convex: templates |
| Top messages | /templates | Convex: templates |
| Thompson Sampling results | /templates | Convex: templates |
| Campaign stats | /campaigns | Convex: campaigns |
| Team performance | /team | Convex: users |
| Billing history | /billing | Stripe API |
| Usage stats | /billing | Convex: usage |
| Activity timeline | /leads/[id] | Convex: activities |

### What Agent Can MANAGE (করতে পারবে)

| Action | Dashboard Page | Backend |
|--------|----------------|---------|
| Send manual SMS | /leads/[id], /conversations | n8n → Twilio |
| Click-to-call | /leads, /leads/[id] | Browser tel: link |
| Book appointment | /leads/[id] | n8n → Calendly |
| Reschedule appointment | /appointments | n8n → Calendly |
| Cancel appointment | /appointments | n8n → Calendly |
| Add notes | /leads/[id] | Convex: notes |
| Edit lead info | /leads/[id] | Convex: leads |
| Mark as DNC | /leads | Convex: leads |
| Move in pipeline | /pipeline | Convex: deals |
| Pause campaign | /campaigns | n8n workflow |
| Resume campaign | /campaigns | n8n workflow |
| Edit templates | /templates | Convex: templates |
| Create template | /templates | Convex: templates |
| Invite team member | /team | Convex: users |
| Change routing rules | /team | Convex: settings |
| Edit notification prefs | /settings | Convex: settings |
| Change AI tone | /settings | Convex: settings |
| Edit availability | /settings | Calendly API |
| Connect integration | /settings | OAuth flow |
| Update payment | /billing | Stripe portal |
| Export data | /analytics, /leads | CSV download |

---

## Part 4: Database Schema (Convex)

```typescript
// COMPLETE CONVEX SCHEMA FOR AGENTOS

// ═══════════════════════════════════════════════════════════
// CORE TABLES
// ═══════════════════════════════════════════════════════════

// AGENTS (Customers - the real estate agents)
export const agents = defineTable({
  // Profile
  name: v.string(),
  email: v.string(),
  phone: v.string(),
  brokerage: v.optional(v.string()),
  licenseNumber: v.optional(v.string()),
  profilePhoto: v.optional(v.string()),
  
  // Subscription
  plan: v.union(v.literal("starter"), v.literal("pro"), v.literal("scale")),
  stripeCustomerId: v.optional(v.string()),
  subscriptionStatus: v.union(
    v.literal("active"), 
    v.literal("past_due"), 
    v.literal("cancelled"),
    v.literal("trial")
  ),
  
  // Limits
  leadsPerMonth: v.number(),
  smsPerMonth: v.number(),
  usersAllowed: v.number(),
  
  // Settings
  aiTone: v.union(v.literal("professional"), v.literal("friendly"), v.literal("casual")),
  autoResponse: v.boolean(),
  quietHoursStart: v.optional(v.string()), // "21:00"
  quietHoursEnd: v.optional(v.string()),   // "08:00"
  
  // Notifications
  notifications: v.object({
    hotLeadSms: v.boolean(),
    hotLeadEmail: v.boolean(),
    hotLeadPush: v.boolean(),
    appointmentSms: v.boolean(),
    appointmentEmail: v.boolean(),
    appointmentPush: v.boolean(),
    leadReplySms: v.boolean(),
    dailyEmail: v.boolean(),
    weeklyEmail: v.boolean(),
  }),
  
  // Calendar
  calendarConnected: v.boolean(),
  calendlyUrl: v.optional(v.string()),
  availability: v.optional(v.object({
    monday: v.optional(v.string()),    // "09:00-18:00"
    tuesday: v.optional(v.string()),
    wednesday: v.optional(v.string()),
    thursday: v.optional(v.string()),
    friday: v.optional(v.string()),
    saturday: v.optional(v.string()),
    sunday: v.optional(v.string()),
  })),
  appointmentDuration: v.optional(v.number()), // minutes
  appointmentBuffer: v.optional(v.number()),   // minutes
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_email", ["email"])
.index("by_stripeId", ["stripeCustomerId"]);


// LEADS
export const leads = defineTable({
  agentId: v.id("agents"),
  
  // Contact Info
  firstName: v.string(),
  lastName: v.optional(v.string()),
  phone: v.string(),
  email: v.optional(v.string()),
  bestTime: v.optional(v.string()),
  
  // Property Info
  propertyAddress: v.optional(v.string()),
  propertyCity: v.optional(v.string()),
  propertyState: v.optional(v.string()),
  propertyZip: v.optional(v.string()),
  propertyBeds: v.optional(v.number()),
  propertyBaths: v.optional(v.number()),
  propertySqft: v.optional(v.number()),
  propertyPrice: v.optional(v.number()),
  
  // Classification
  type: v.union(
    v.literal("expired"),
    v.literal("fsbo"),
    v.literal("buyer"),
    v.literal("circle"),
    v.literal("referral"),
    v.literal("manual")
  ),
  source: v.string(), // "zillow", "redx", "facebook", "website", etc.
  status: v.union(
    v.literal("new"),
    v.literal("contacted"),
    v.literal("qualified"),
    v.literal("appointment"),
    v.literal("listed"),
    v.literal("closed"),
    v.literal("lost"),
    v.literal("dnc")
  ),
  temperature: v.union(
    v.literal("hot"),
    v.literal("warm"),
    v.literal("cold")
  ),
  
  // AI Qualification
  qualification: v.optional(v.object({
    overallScore: v.number(),        // 0-100
    motivation: v.number(),          // 1-10
    motivationReason: v.optional(v.string()),
    timeline: v.optional(v.string()),
    timelineScore: v.number(),       // 1-10
    priceFlexibility: v.boolean(),
    priceFlexibilityScore: v.number(),
    isDecisionMaker: v.boolean(),
    decisionMakerScore: v.number(),
    engagement: v.number(),          // 1-10
    aiInsights: v.array(v.string()), // bullet points
  })),
  
  // Pipeline
  pipelineStage: v.optional(v.string()),
  dealValue: v.optional(v.number()),
  
  // Tracking
  lastContactAt: v.optional(v.number()),
  lastMessageDirection: v.optional(v.union(v.literal("inbound"), v.literal("outbound"))),
  totalMessages: v.number(),
  unreadCount: v.number(),
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_agent_status", ["agentId", "status"])
.index("by_agent_temperature", ["agentId", "temperature"])
.index("by_agent_type", ["agentId", "type"])
.index("by_phone", ["phone"]);


// CONVERSATIONS
export const conversations = defineTable({
  agentId: v.id("agents"),
  leadId: v.id("leads"),
  
  messages: v.array(v.object({
    id: v.string(),
    role: v.union(v.literal("ai"), v.literal("lead"), v.literal("agent")),
    content: v.string(),
    timestamp: v.number(),
    twilioSid: v.optional(v.string()),
    status: v.optional(v.string()), // "sent", "delivered", "read", "failed"
  })),
  
  unread: v.boolean(),
  lastMessageAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_lead", ["leadId"])
.index("by_agent_unread", ["agentId", "unread"]);


// APPOINTMENTS
export const appointments = defineTable({
  agentId: v.id("agents"),
  leadId: v.id("leads"),
  
  type: v.union(
    v.literal("listing"),
    v.literal("buyer_consult"),
    v.literal("showing"),
    v.literal("follow_up"),
    v.literal("other")
  ),
  
  scheduledAt: v.number(),
  duration: v.number(), // minutes
  
  location: v.optional(v.string()),
  locationAddress: v.optional(v.string()),
  isVirtual: v.boolean(),
  meetingLink: v.optional(v.string()),
  
  notes: v.optional(v.string()),
  
  status: v.union(
    v.literal("scheduled"),
    v.literal("confirmed"),
    v.literal("completed"),
    v.literal("cancelled"),
    v.literal("no_show"),
    v.literal("rescheduled")
  ),
  
  // Reminders
  reminderSentAt: v.optional(v.number()),
  confirmationSentAt: v.optional(v.number()),
  
  // External IDs
  calendlyEventId: v.optional(v.string()),
  googleCalendarEventId: v.optional(v.string()),
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_lead", ["leadId"])
.index("by_agent_date", ["agentId", "scheduledAt"]);


// DEALS
export const deals = defineTable({
  agentId: v.id("agents"),
  leadId: v.id("leads"),
  
  type: v.union(v.literal("listing"), v.literal("buyer")),
  
  propertyAddress: v.string(),
  propertyCity: v.string(),
  propertyState: v.string(),
  
  listPrice: v.optional(v.number()),
  salePrice: v.optional(v.number()),
  commission: v.optional(v.number()),
  
  stage: v.union(
    v.literal("prospect"),
    v.literal("contacted"),
    v.literal("qualified"),
    v.literal("appointment"),
    v.literal("listed"),
    v.literal("under_contract"),
    v.literal("closed"),
    v.literal("lost")
  ),
  
  expectedCloseDate: v.optional(v.number()),
  actualCloseDate: v.optional(v.number()),
  
  notes: v.optional(v.string()),
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_lead", ["leadId"])
.index("by_agent_stage", ["agentId", "stage"]);


// NOTES
export const notes = defineTable({
  agentId: v.id("agents"),
  leadId: v.id("leads"),
  
  content: v.string(),
  author: v.union(v.literal("agent"), v.literal("ai"), v.literal("system")),
  authorName: v.optional(v.string()),
  
  createdAt: v.number(),
})
.index("by_lead", ["leadId"]);


// ACTIVITIES (Timeline)
export const activities = defineTable({
  agentId: v.id("agents"),
  leadId: v.id("leads"),
  
  type: v.union(
    v.literal("lead_created"),
    v.literal("message_sent"),
    v.literal("message_received"),
    v.literal("call_made"),
    v.literal("call_received"),
    v.literal("appointment_booked"),
    v.literal("appointment_completed"),
    v.literal("status_changed"),
    v.literal("note_added"),
    v.literal("ai_qualified"),
    v.literal("moved_in_pipeline")
  ),
  
  description: v.string(),
  metadata: v.optional(v.any()),
  
  createdAt: v.number(),
})
.index("by_lead", ["leadId"])
.index("by_agent", ["agentId"]);


// ═══════════════════════════════════════════════════════════
// AI & AUTOMATION TABLES
// ═══════════════════════════════════════════════════════════

// TEMPLATES (for Thompson Sampling)
export const templates = defineTable({
  agentId: v.id("agents"),
  
  name: v.string(),
  type: v.union(
    v.literal("expired_initial"),
    v.literal("expired_followup"),
    v.literal("fsbo_initial"),
    v.literal("fsbo_followup"),
    v.literal("buyer_initial"),
    v.literal("buyer_followup"),
    v.literal("circle_initial"),
    v.literal("nurture")
  ),
  
  content: v.string(),
  variables: v.array(v.string()), // ["firstName", "address", etc.]
  
  // Thompson Sampling
  alpha: v.number(), // successes + prior
  beta: v.number(),  // failures + prior
  trials: v.number(),
  successes: v.number(),
  
  // Stats
  responseRate: v.number(), // calculated
  appointmentRate: v.number(),
  
  active: v.boolean(),
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_agent_type", ["agentId", "type"]);


// CAMPAIGNS
export const campaigns = defineTable({
  agentId: v.id("agents"),
  
  name: v.string(),
  type: v.union(
    v.literal("expired_outreach"),
    v.literal("fsbo_outreach"),
    v.literal("buyer_response"),
    v.literal("circle_prospecting"),
    v.literal("nurture")
  ),
  
  status: v.union(
    v.literal("active"),
    v.literal("paused"),
    v.literal("completed")
  ),
  
  settings: v.object({
    dailyLimit: v.optional(v.number()),
    autoResponse: v.boolean(),
    followUpDays: v.optional(v.array(v.number())), // [1, 3, 5, 7]
  }),
  
  // Stats
  totalSent: v.number(),
  totalReplied: v.number(),
  totalAppointments: v.number(),
  responseRate: v.number(),
  
  startedAt: v.number(),
  pausedAt: v.optional(v.number()),
  
  createdAt: v.number(),
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_agent_status", ["agentId", "status"]);


// ═══════════════════════════════════════════════════════════
// ANALYTICS TABLES
// ═══════════════════════════════════════════════════════════

// DAILY METRICS
export const metrics = defineTable({
  agentId: v.id("agents"),
  date: v.string(), // "2026-04-11"
  
  // Lead metrics
  newLeads: v.number(),
  leadsContacted: v.number(),
  leadsQualified: v.number(),
  leadsConverted: v.number(),
  
  // Message metrics
  messagesSent: v.number(),
  messagesReceived: v.number(),
  responseRate: v.number(),
  
  // Appointment metrics
  appointmentsBooked: v.number(),
  appointmentsCompleted: v.number(),
  appointmentsCancelled: v.number(),
  showRate: v.number(),
  
  // Performance metrics
  avgResponseTime: v.number(), // seconds
  bookingRate: v.number(),
  
  // Revenue metrics
  listingsTaken: v.number(),
  dealsClosed: v.number(),
  revenue: v.number(),
  
  // By source breakdown
  bySource: v.optional(v.array(v.object({
    source: v.string(),
    leads: v.number(),
    appointments: v.number(),
    revenue: v.number(),
  }))),
  
  createdAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_agent_date", ["agentId", "date"]);


// USAGE (for billing limits)
export const usage = defineTable({
  agentId: v.id("agents"),
  month: v.string(), // "2026-04"
  
  leadsProcessed: v.number(),
  smsSent: v.number(),
  aiResponses: v.number(),
  
  updatedAt: v.number(),
})
.index("by_agent_month", ["agentId", "month"]);


// ═══════════════════════════════════════════════════════════
// TEAM TABLES (Scale plan)
// ═══════════════════════════════════════════════════════════

// TEAM MEMBERS
export const teamMembers = defineTable({
  agentId: v.id("agents"), // parent agent (admin)
  
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  
  role: v.union(v.literal("admin"), v.literal("agent")),
  
  // Stats
  leadsHandled: v.number(),
  appointmentsBooked: v.number(),
  listingsTaken: v.number(),
  
  lastActiveAt: v.optional(v.number()),
  
  createdAt: v.number(),
})
.index("by_agent", ["agentId"])
.index("by_email", ["email"]);


// LEAD ROUTING
export const leadRouting = defineTable({
  agentId: v.id("agents"),
  
  method: v.union(
    v.literal("round_robin"),
    v.literal("by_source"),
    v.literal("by_zip"),
    v.literal("by_performance")
  ),
  
  rules: v.optional(v.array(v.object({
    condition: v.string(), // "source:zillow", "zip:44113"
    assignTo: v.id("teamMembers"),
  }))),
  
  updatedAt: v.number(),
})
.index("by_agent", ["agentId"]);
```

---

## Part 5: API Endpoints (Dashboard → Backend)

### Dashboard Actions API

```typescript
// All endpoints the dashboard calls to perform actions

// ═══════════════════════════════════════════════════════════
// LEAD ACTIONS
// ═══════════════════════════════════════════════════════════

POST /api/leads/send-sms
Body: { leadId, message }
→ Convex mutation → n8n webhook → Twilio → SMS sent
→ Response: { success, messageSid }

POST /api/leads/update-status
Body: { leadId, status }
→ Convex mutation
→ Response: { success }

POST /api/leads/mark-dnc
Body: { leadId }
→ Convex mutation → n8n webhook (update DNC list)
→ Response: { success }

POST /api/leads/add-note
Body: { leadId, content }
→ Convex mutation
→ Response: { noteId }

POST /api/leads/create
Body: { firstName, lastName, phone, email, type, ... }
→ Convex mutation
→ Response: { leadId }

DELETE /api/leads/:id
→ Convex mutation
→ Response: { success }


// ═══════════════════════════════════════════════════════════
// APPOINTMENT ACTIONS
// ═══════════════════════════════════════════════════════════

POST /api/appointments/book
Body: { leadId, type, datetime, location }
→ Convex mutation → n8n webhook → Calendly → Confirmation SMS
→ Response: { appointmentId, calendlyEventId }

POST /api/appointments/reschedule
Body: { appointmentId, newDatetime }
→ Convex mutation → n8n webhook → Calendly → Notification SMS
→ Response: { success }

POST /api/appointments/cancel
Body: { appointmentId, reason }
→ Convex mutation → n8n webhook → Calendly → Notification SMS
→ Response: { success }

POST /api/appointments/confirm
Body: { appointmentId }
→ Convex mutation → Confirmation SMS
→ Response: { success }


// ═══════════════════════════════════════════════════════════
// CAMPAIGN ACTIONS
// ═══════════════════════════════════════════════════════════

POST /api/campaigns/pause
Body: { campaignId }
→ Convex mutation → n8n webhook (pause workflow)
→ Response: { success }

POST /api/campaigns/resume
Body: { campaignId }
→ Convex mutation → n8n webhook (resume workflow)
→ Response: { success }

PUT /api/campaigns/:id/settings
Body: { dailyLimit, autoResponse, followUpDays }
→ Convex mutation
→ Response: { success }


// ═══════════════════════════════════════════════════════════
// TEMPLATE ACTIONS
// ═══════════════════════════════════════════════════════════

POST /api/templates/create
Body: { name, type, content }
→ Convex mutation
→ Response: { templateId }

PUT /api/templates/:id
Body: { content }
→ Convex mutation
→ Response: { success }

DELETE /api/templates/:id
→ Convex mutation
→ Response: { success }


// ═══════════════════════════════════════════════════════════
// SETTINGS ACTIONS
// ═══════════════════════════════════════════════════════════

PUT /api/settings/profile
Body: { name, phone, brokerage, ... }
→ Convex mutation
→ Response: { success }

PUT /api/settings/notifications
Body: { hotLeadSms, hotLeadEmail, ... }
→ Convex mutation
→ Response: { success }

PUT /api/settings/ai
Body: { aiTone, autoResponse, followUpDays }
→ Convex mutation
→ Response: { success }

PUT /api/settings/availability
Body: { monday, tuesday, ..., duration, buffer }
→ Convex mutation → Calendly API
→ Response: { success }


// ═══════════════════════════════════════════════════════════
// EXPORT ACTIONS
// ═══════════════════════════════════════════════════════════

GET /api/export/leads?format=csv
→ Generate CSV from Convex
→ Response: CSV file download

GET /api/export/analytics?format=pdf&range=month
→ Generate PDF report
→ Response: PDF file download
```

---

## Part 6: Summary Checklist

### Agent Dashboard Features (Complete List)

```
AGENT DASHBOARD - COMPLETE FEATURE LIST
═══════════════════════════════════════════════════════════

VIEW (দেখতে পারবে):
────────────────────

□ All leads (list + kanban view)
□ Lead details (contact, property, qualification)
□ AI qualification scores (motivation, timeline, etc.)
□ AI insights (bullet points)
□ Full conversation history
□ All appointments (calendar + list)
□ Deal pipeline (kanban)
□ Daily/weekly/monthly analytics
□ Conversion funnel
□ Response times + rates
□ Source performance breakdown
□ AI performance stats
□ Top performing messages
□ Thompson Sampling results
□ Campaign stats
□ Team member stats (Scale plan)
□ Billing history + usage
□ Activity timeline per lead
□ Recent activity feed
□ Hot lead alerts
□ Notification history


MANAGE (করতে পারবে):
─────────────────────

□ Send manual SMS
□ Click-to-call (tel: link)
□ Send email
□ Book appointment
□ Reschedule appointment
□ Cancel appointment
□ Confirm appointment
□ Add notes to leads
□ Edit lead info
□ Delete lead
□ Mark as DNC
□ Change lead status
□ Move in pipeline (drag-drop)
□ Pause campaign
□ Resume campaign
□ Edit campaign settings
□ Create message template
□ Edit message template
□ Delete template
□ Add team member (Scale)
□ Remove team member
□ Change lead routing rules
□ Edit profile
□ Change notification preferences
□ Set quiet hours
□ Change AI tone
□ Toggle auto-response
□ Edit availability schedule
□ Connect integrations
□ Update payment method
□ Export data (CSV/PDF)
□ Create manual lead


PAGES (12 Total):
─────────────────

1. /dashboard - Home (overview + quick actions)
2. /dashboard/leads - All Leads (list + kanban)
3. /dashboard/leads/[id] - Lead Detail
4. /dashboard/conversations - Message Inbox
5. /dashboard/appointments - Calendar
6. /dashboard/pipeline - Deal Pipeline
7. /dashboard/analytics - Performance Stats
8. /dashboard/campaigns - Campaign Management
9. /dashboard/templates - Message Templates
10. /dashboard/team - Team Members (Scale)
11. /dashboard/settings - Preferences
12. /dashboard/billing - Subscription


DATABASE TABLES (17 Total):
───────────────────────────

1. agents
2. leads
3. conversations
4. appointments
5. deals
6. notes
7. activities
8. templates
9. campaigns
10. metrics
11. usage
12. teamMembers
13. leadRouting


n8n WORKFLOWS (17 Total):
─────────────────────────

See N8N-WORKFLOWS.md for complete list
```

---

## Files in Folder

```
realststemailsell/
├── README.md                        Business model overview
├── N8N-WORKFLOWS.md                 17 workflows detailed
├── LANDING-PAGE-DASHBOARD-PLAN.md   Landing page + demo design
├── DASHBOARD-SPEC.md                Basic dashboard spec
├── FULL-SYSTEM-ANALYSIS.md          [THIS FILE] Complete system
├── IMPLEMENTATION.md                Technical setup guide
├── AGENT-AI-PLATFORM-COMPLETE-PLAN.md  Master plan
├── AGENT-SYSTEM-RESEARCH.md         Market research
├── ARN-BUSINESS-PLAN.md             Lead response plan
└── SYSTEM-SCALABILITY-DEEP-DIVE.md  Scale architecture
```

---

## Part 7: Real-Time Dashboard Features

### Live Updates (Agent dekhe instantly update hobe)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         REAL-TIME FEATURES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INSTANT UPDATES (Convex Real-Time Subscriptions):                          │
│  ────────────────────────────────────────────────                           │
│                                                                             │
│  ✓ New lead appears immediately (no refresh needed)                        │
│  ✓ New message shows in conversation thread instantly                      │
│  ✓ Hot lead alert pops up in real-time                                     │
│  ✓ Appointment booking reflects immediately                                 │
│  ✓ Stats update live (today's numbers change as events happen)             │
│  ✓ Pipeline cards move automatically when status changes                   │
│  ✓ Activity feed updates in real-time                                      │
│  ✓ Team member activity visible live (Scale plan)                          │
│                                                                             │
│  NOTIFICATIONS:                                                              │
│  ─────────────                                                               │
│                                                                             │
│  Browser Push:                                                               │
│  ┌─────────────────────────────────────┐                                    │
│  │ 🔥 HOT LEAD: Sarah M.              │                                    │
│  │ "Yes, I want to sell"               │                                    │
│  │ [View Lead] [Call Now]              │                                    │
│  └─────────────────────────────────────┘                                    │
│                                                                             │
│  In-App Toast:                                                               │
│  ┌─────────────────────────────────────┐                                    │
│  │ 📅 New appointment booked           │                                    │
│  │ Tom H. - Tomorrow 2:00 PM           │                                    │
│  │                              [View] │                                    │
│  └─────────────────────────────────────┘                                    │
│                                                                             │
│  Sound Alerts:                                                               │
│  • Ping sound for new hot lead                                              │
│  • Chime for appointment booked                                             │
│  • Notification sound for new message                                       │
│  • (All toggleable in settings)                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Live Data Sync Flow

```
                   REAL-TIME DATA FLOW
                   ═══════════════════
                   
LEAD REPLIES SMS
      │
      ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Twilio    │ ──► │    n8n      │ ──► │   Convex    │
│  (Webhook)  │     │ (Process)   │     │ (Database)  │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              │ Real-time subscription
                                              ▼
                                        ┌─────────────┐
                                        │  Dashboard  │
                                        │ (Updates!)  │
                                        └─────────────┘
                                              │
                                              ▼
                                    AGENT SEES INSTANTLY:
                                    • New message in chat
                                    • Lead status change
                                    • Hot lead alert (if qualified)
                                    • Stats updated
```

---

## Part 8: Mobile Dashboard Experience

### Mobile-Responsive Design

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                         MOBILE DASHBOARD                                       │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Phone seo dashboard access korbe:                                            │
│                                                                               │
│  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐             │
│  │    ┌─────────┐  │   │    ┌─────────┐  │   │    ┌─────────┐  │             │
│  │    │AgentSix ≡│  │   │    │◄ Leads  │  │   │    │◄ Sarah  │  │             │
│  │    └─────────┘  │   │    └─────────┘  │   │    └─────────┘  │             │
│  │                 │   │                 │   │                 │             │
│  │  Today          │   │  🔍 Search...   │   │  🔥 HOT LEAD   │             │
│  │  ┌───┐ ┌───┐   │   │                 │   │                 │             │
│  │  │ 12│ │ 8 │   │   │  ┌───────────┐  │   │  Sarah Martinez │             │
│  │  │New│ │Rep│   │   │  │🔥 Sarah M.│  │   │  (555) 123-4567 │             │
│  │  └───┘ └───┘   │   │  │ Expired   │  │   │  [📞] [💬] [📅] │             │
│  │                 │   │  │ HOT       │  │   │                 │             │
│  │  🔥 Hot Leads  │   │  └───────────┘  │   │  ────────────── │             │
│  │  ┌───────────┐  │   │  ┌───────────┐  │   │  Conversation:  │             │
│  │  │ Sarah M.  │  │   │  │ Mike T.   │  │   │                 │             │
│  │  │ "Yes, I..." │  │   │  │ Buyer    │  │   │  🤖 Hi Sarah... │             │
│  │  │ [📞] [👁]  │  │   │  │ Warm     │  │   │                 │             │
│  │  └───────────┘  │   │  └───────────┘  │   │  👤 Yes, I want │             │
│  │                 │   │                 │   │     to sell...  │             │
│  │  📅 Today       │   │  ┌───────────┐  │   │                 │             │
│  │  • 2 PM Tom H. │   │  │ Jane D.   │  │   │  ┌───────────┐  │             │
│  │  • 4 PM Lisa R.│   │  │ FSBO      │  │   │  │ Message... │  │             │
│  │                 │   │  │ New       │  │   │  └───────────┘  │             │
│  │  ≡ Menu        │   │  └───────────┘  │   │                 │             │
│  │                 │   │                 │   │  [Send]         │             │
│  └─────────────────┘   └─────────────────┘   └─────────────────┘             │
│                                                                               │
│     HOME              LEADS              LEAD DETAIL                          │
│                                                                               │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  MOBILE-SPECIFIC FEATURES:                                                   │
│  ─────────────────────────                                                   │
│                                                                               │
│  ✓ Swipe to call (swipe right on lead = instant call)                       │
│  ✓ Pull to refresh (all pages)                                               │
│  ✓ Bottom navigation (quick access to 5 main sections)                       │
│  ✓ Floating action button (+ new lead, + quick SMS)                          │
│  ✓ Touch-optimized buttons (larger tap targets)                              │
│  ✓ Push notifications (even when app closed)                                 │
│  ✓ Offline mode (view cached leads, queue messages)                          │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 9: Quick Actions (1-Click Operations)

### Speed Actions from Any Screen

```
QUICK ACTIONS - ANYWHERE IN DASHBOARD
═════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  FROM LEAD LIST:                                                            │
│  ───────────────                                                            │
│                                                                             │
│  [📞] One-click call (opens phone dialer)                                   │
│  [💬] Quick SMS (opens mini composer)                                       │
│  [📅] Quick book (shows available slots)                                    │
│  [🔥→❄️] Toggle hot/cold (one click)                                        │
│  [🚫] Mark DNC (with confirmation)                                          │
│                                                                             │
│  FROM CONVERSATION:                                                          │
│  ─────────────────                                                           │
│                                                                             │
│  [📞] Call this lead                                                        │
│  [📅] Book appointment (date picker appears)                                │
│  [📝] Add note (quick note modal)                                           │
│  [⭐] Mark as hot lead                                                       │
│                                                                             │
│  FROM APPOINTMENTS:                                                          │
│  ─────────────────                                                           │
│                                                                             │
│  [✓] Confirm appointment (sends SMS)                                        │
│  [↻] Reschedule (calendar picker)                                           │
│  [✗] Cancel (with reason dropdown)                                          │
│  [📞] Call attendee                                                         │
│                                                                             │
│  KEYBOARD SHORTCUTS (Power Users):                                          │
│  ─────────────────────────────────                                          │
│                                                                             │
│  CMD/CTRL + K    Global search (search anything)                            │
│  CMD/CTRL + N    New lead                                                   │
│  CMD/CTRL + M    New message                                                │
│  CMD/CTRL + B    Book appointment                                           │
│  CMD/CTRL + 1-5  Navigate sections                                          │
│  ESC             Close modal/back                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Command Palette (CMD+K)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔍 Search leads, actions, settings...                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  RECENT                                                                      │
│  ────────────────────────────────────────────────                           │
│  → Sarah Martinez (last viewed 5 min ago)                                   │
│  → Mike Thompson (last viewed 2 hours ago)                                  │
│                                                                             │
│  QUICK ACTIONS                                                               │
│  ────────────────────────────────────────────────                           │
│  + Create new lead                                                          │
│  📅 Book appointment                                                         │
│  📢 Pause all campaigns                                                      │
│  📊 View analytics                                                           │
│  ⚙️ Settings                                                                 │
│                                                                             │
│  LEADS (3 results)                                                           │
│  ────────────────────────────────────────────────                           │
│  Sarah Martinez - Expired - HOT                                             │
│  Sam Miller - Buyer - Warm                                                  │
│  Sandra Morrison - FSBO - New                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 10: Complete Agent Control Center

### AI Automation Control

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      AGENT AI CONTROL PANEL                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WHAT AGENT CONTROLS:                                                        │
│  ────────────────────                                                        │
│                                                                             │
│  1. AUTO-RESPONSE TOGGLE                                                    │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Auto-Response: [ON ●────○ OFF]                                  │    │
│     │                                                                  │    │
│     │ When ON: AI automatically responds to all incoming leads        │    │
│     │ When OFF: All leads go to inbox for manual response             │    │
│     │                                                                  │    │
│     │ ⚠️ Turning off will queue all leads until you respond manually  │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  2. CAMPAIGN CONTROL (Individual)                                           │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Expired Outreach    [⏸ PAUSE]  Daily: 50   Sent Today: 32      │    │
│     │ FSBO Conversion     [⏸ PAUSE]  Daily: 30   Sent Today: 18      │    │
│     │ Buyer Response      [● ACTIVE] Auto: ON    Responded: 12       │    │
│     │ Circle Prospecting  [▶ RESUME] Paused since Apr 8              │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  3. AI TONE SETTINGS                                                        │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ AI Communication Style:                                          │    │
│     │                                                                  │    │
│     │ ○ Professional - "Hello, I hope this message finds you well..." │    │
│     │ ● Friendly - "Hey! I noticed your home just came off market..." │    │
│     │ ○ Casual - "Hi there! Quick question about your place..."       │    │
│     │                                                                  │    │
│     │ [Preview AI Messages]                                           │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  4. FOLLOW-UP TIMING CONTROL                                                │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Automatic Follow-up Schedule:                                    │    │
│     │                                                                  │    │
│     │ First Contact: Immediately (when lead comes in)                 │    │
│     │ Follow-up #1:  Day [3 ▼]  (after no response)                   │    │
│     │ Follow-up #2:  Day [5 ▼]                                        │    │
│     │ Follow-up #3:  Day [7 ▼]                                        │    │
│     │ Final Attempt: Day [14 ▼]                                       │    │
│     │                                                                  │    │
│     │ [✓] Stop following up after lead marks DNC                      │    │
│     │ [✓] Stop following up after appointment booked                  │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  5. WORKING HOURS (AI respects these)                                       │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ AI Active Hours:                                                 │    │
│     │                                                                  │    │
│     │ Mon-Fri: [8:00 AM ▼] to [9:00 PM ▼]                            │    │
│     │ Saturday: [9:00 AM ▼] to [6:00 PM ▼]                           │    │
│     │ Sunday: [Disabled ✓]                                            │    │
│     │                                                                  │    │
│     │ ⚠️ Messages outside these hours will be queued for next day    │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  6. LEAD QUALIFICATION THRESHOLDS                                           │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │ Mark as HOT when:                                                │    │
│     │                                                                  │    │
│     │ [✓] Lead says "yes", "interested", "want to sell/buy"          │    │
│     │ [✓] Lead asks about pricing                                     │    │
│     │ [✓] Lead mentions timeline (moving, divorce, etc.)              │    │
│     │ [✓] Lead requests appointment                                   │    │
│     │                                                                  │    │
│     │ HOT Score Threshold: [80 ▼] out of 100                         │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 11: Data Ownership & Export

### Agent Data Control

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DATA OWNERSHIP & EXPORT                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AGENT OWNS ALL DATA - CAN EXPORT ANYTIME:                                  │
│  ─────────────────────────────────────────                                  │
│                                                                             │
│  EXPORT OPTIONS:                                                             │
│  ───────────────                                                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  📥 EXPORT DATA                                                     │   │
│  │                                                                     │   │
│  │  What to Export:                                                    │   │
│  │  ────────────────                                                   │   │
│  │  [✓] All Leads (347 records)                                       │   │
│  │  [✓] All Conversations (1,247 messages)                            │   │
│  │  [✓] All Appointments (52 records)                                 │   │
│  │  [✓] All Notes (89 notes)                                          │   │
│  │  [ ] Analytics Data                                                 │   │
│  │  [ ] Template Performance                                           │   │
│  │                                                                     │   │
│  │  Format:                                                            │   │
│  │  ────────                                                           │   │
│  │  ● CSV (Excel compatible)                                          │   │
│  │  ○ JSON (Developer format)                                         │   │
│  │  ○ PDF Report (Summary only)                                       │   │
│  │                                                                     │   │
│  │  Date Range:                                                        │   │
│  │  ────────────                                                       │   │
│  │  ○ All Time                                                         │   │
│  │  ● Last 30 Days                                                     │   │
│  │  ○ Custom Range: [Apr 1] to [Apr 30]                               │   │
│  │                                                                     │   │
│  │                                      [Download Export]              │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  WHAT'S INCLUDED IN EXPORT:                                                 │
│  ──────────────────────────                                                 │
│                                                                             │
│  LEADS CSV:                                                                  │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ Name, Phone, Email, Address, Type, Source, Status, Temperature,   │    │
│  │ Qualification Score, Last Contact, Created Date, Notes Count,     │    │
│  │ Messages Count, Appointments Count, Deal Stage, Deal Value        │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  CONVERSATIONS CSV:                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ Lead Name, Message Direction, Message Content, Timestamp,          │    │
│  │ AI/Agent/Lead, Delivery Status                                     │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  PORTABILITY GUARANTEE:                                                      │
│  ──────────────────────                                                      │
│                                                                             │
│  ✓ You own your data 100%                                                   │
│  ✓ Export anytime, no restrictions                                          │
│  ✓ Data format compatible with other CRMs                                   │
│  ✓ If you cancel, data available for 30 days                                │
│  ✓ GDPR/CCPA compliant                                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 12: Complete Integration Control

### Agent-Controlled Integrations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      INTEGRATION MANAGEMENT                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  CONNECTED INTEGRATIONS (Agent Controls All):                               │
│  ────────────────────────────────────────────                               │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │  📱 LEAD SOURCES                                                    │   │
│  │  ───────────────                                                    │   │
│  │                                                                     │   │
│  │  Zillow                Connected ✓              [Manage] [Disconnect]│   │
│  │  └─ Receiving leads from: Premier Agent Portal                     │   │
│  │  └─ Last lead: 5 minutes ago                                       │   │
│  │                                                                     │   │
│  │  Facebook Lead Ads    Connected ✓              [Manage] [Disconnect]│   │
│  │  └─ Pages: ABC Realty Cleveland                                    │   │
│  │  └─ Forms: Home Valuation, Buyer Inquiry                           │   │
│  │                                                                     │   │
│  │  Realtor.com          Not Connected            [Connect]            │   │
│  │                                                                     │   │
│  │  Website Forms        Connected ✓              [Manage] [Disconnect]│   │
│  │  └─ Webhook active: abc-realty.com/contact                         │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  📅 CALENDAR                                                        │   │
│  │  ──────────                                                         │   │
│  │                                                                     │   │
│  │  Google Calendar      Connected ✓              [Manage] [Disconnect]│   │
│  │  └─ Syncing with: john@abcrealty.com                               │   │
│  │  └─ Two-way sync enabled                                           │   │
│  │                                                                     │   │
│  │  Calendly             Connected ✓              [Manage] [Disconnect]│   │
│  │  └─ Event types: 15-min call, 30-min consultation                  │   │
│  │  └─ Booking link: calendly.com/johnsmith                           │   │
│  │                                                                     │   │
│  │  ───────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  📊 CRM EXPORT (Optional)                                           │   │
│  │  ─────────────────────                                              │   │
│  │                                                                     │   │
│  │  Follow Up Boss       Not Connected            [Connect]            │   │
│  │  └─ Auto-sync leads to Follow Up Boss                              │   │
│  │                                                                     │   │
│  │  Close CRM            Not Connected            [Connect]            │   │
│  │                                                                     │   │
│  │  KvCORE               Not Connected            [Connect]            │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  WEBHOOK MANAGEMENT (Advanced):                                              │
│  ──────────────────────────────                                              │
│                                                                             │
│  [View Incoming Webhooks] [View Outgoing Webhooks] [API Keys]               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Summary: Agent Dashboard Complete Control

```
╔═════════════════════════════════════════════════════════════════════════════╗
║                                                                             ║
║                    AGENTOS DASHBOARD - COMPLETE CONTROL                     ║
║                                                                             ║
╠═════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║   ✅ VIEW EVERYTHING:                                                       ║
║   ───────────────────                                                       ║
║   • Every lead, every conversation, every appointment                       ║
║   • Full AI qualification details and scores                                ║
║   • Complete analytics and performance data                                 ║
║   • All campaign stats and template performance                             ║
║   • Team activity (Scale plan)                                              ║
║   • Billing and usage                                                       ║
║                                                                             ║
║   ✅ MANAGE EVERYTHING:                                                     ║
║   ─────────────────────                                                     ║
║   • One-click call, SMS, email any lead                                     ║
║   • Book/reschedule/cancel appointments                                     ║
║   • Move leads through pipeline                                             ║
║   • Pause/resume any campaign                                               ║
║   • Edit any template                                                       ║
║   • Add/remove team members                                                 ║
║   • Change all settings                                                     ║
║                                                                             ║
║   ✅ CONTROL AI:                                                            ║
║   ──────────────                                                            ║
║   • Toggle auto-response ON/OFF                                             ║
║   • Set AI tone (professional/friendly/casual)                              ║
║   • Configure follow-up timing                                              ║
║   • Set working hours                                                       ║
║   • Adjust qualification thresholds                                         ║
║                                                                             ║
║   ✅ OWN DATA:                                                              ║
║   ────────────                                                              ║
║   • Export all data anytime (CSV, JSON, PDF)                                ║
║   • GDPR/CCPA compliant                                                     ║
║   • 30-day access after cancellation                                        ║
║   • No lock-in, fully portable                                              ║
║                                                                             ║
║   ✅ REAL-TIME:                                                             ║
║   ─────────────                                                             ║
║   • Live updates (no refresh needed)                                        ║
║   • Instant notifications (browser, SMS, email)                             ║
║   • Mobile responsive                                                       ║
║   • Works offline (queues actions)                                          ║
║                                                                             ║
╚═════════════════════════════════════════════════════════════════════════════╝
```

---

## Phase 2 Add-On Features (Agent Selects)

```
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                       ║
║              PHASE 2 ADD-ON FEATURES — AGENTS ALREADY PAY FOR THESE                   ║
║                                                                                       ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   FEATURE                  │ REPLACES                 │ THEY PAY    │ OUR PRICE       ║
║   ─────────────────────────│──────────────────────────│─────────────│──────────       ║
║                            │                          │             │                 ║
║   AI Voice Calls (500/mo)  │ ISA Services:            │             │                 ║
║                            │ • AgentAssistant         │ $795+/mo    │ $297/mo         ║
║                            │ • Conversion Monsters    │ $1,800+/mo  │                 ║
║                            │                          │             │ SAVE 62-83%     ║
║                            │                          │             │                 ║
║   AI Voice Calls (2000/mo) │ Full ISA Team:           │             │                 ║
║                            │ • US-based hire          │ $3,500-5K   │ $697/mo         ║
║                            │ • Virtual (Philippines)  │ $1,000-1.5K │                 ║
║                            │                          │             │ SAVE 80%+       ║
║                            │                          │             │                 ║
║   Email Drip Campaigns     │ Email Platforms:         │             │                 ║
║                            │ • Mailchimp              │ $50-200/mo  │ $47/mo          ║
║                            │ • ActiveCampaign         │ $49-149/mo  │                 ║
║                            │                          │             │ SAVE 6-76%      ║
║                            │                          │             │                 ║
║   Review Collection        │ Review Platforms:        │             │                 ║
║                            │ • BirdEye                │ $199-349/mo │ $97/mo          ║
║                            │ • Podium                 │ $289-449/mo │                 ║
║                            │                          │             │ SAVE 51-76%     ║
║                            │                          │             │                 ║
║   Birthday/Anniversary     │ Manual or VA:            │             │                 ║
║   Auto                     │ • VA time (2-4 hrs/wk)   │ $200-400/mo │ $47/mo          ║
║                            │                          │             │ SAVE 76-88%     ║
║                            │                          │             │                 ║
║   Past Client Nurture      │ Usually Forgotten:       │             │                 ║
║                            │ • 89% would refer again  │ Lost $$     │ $97/mo          ║
║                            │ • Only 12% actually do   │             │ ROI: Infinite   ║
║                            │                          │             │                 ║
║   Direct Mail (50/mo)      │ Postcard Services:       │             │                 ║
║                            │ • Wise Pelican           │ $300-500/mo │ $197/mo         ║
║                            │ • PostcardMania          │ $750+/mo    │                 ║
║                            │                          │             │ SAVE 34-74%     ║
║                            │                          │             │                 ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   IF AGENT BUYS ALL SEPARATELY:     $5,044 - $7,047/mo                               ║
║   WITH AGENTOS (all Phase 2):       $1,479/mo                                        ║
║                                                                                       ║
║   TOTAL SAVINGS:                    $3,565 - $5,568/mo (71-79%)                      ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### Dashboard Pages for Phase 2 Features

```
NEW DASHBOARD PAGES (with Phase 2 features enabled):
────────────────────────────────────────────────────

/dashboard/voice                AI Voice Call History + Recordings
  ├── Call log with outcomes (hot_lead, voicemail, callback, etc.)
  ├── Listen to recordings
  ├── View transcripts
  ├── Usage: 127/500 calls this month
  └── Upgrade to 2000/mo option

/dashboard/email                Email Campaign Dashboard
  ├── Sequence performance (opens, clicks)
  ├── Drip campaign status per lead
  ├── Pause/resume sequences
  └── Template A/B test results

/dashboard/reviews              Review Collection Dashboard
  ├── Review requests sent vs completed
  ├── Recent reviews (pulled from Google/Zillow)
  ├── Review score over time
  └── Negative review alerts

/dashboard/nurture              Past Client & Birthday Dashboard
  ├── Upcoming birthdays (7 days)
  ├── Upcoming home anniversaries
  ├── Past client outreach status
  └── Referral tracking

/dashboard/mail                 Direct Mail Dashboard
  ├── Mailings sent this month: 47/50
  ├── Just Listed/Sold auto-triggers
  ├── Farm area campaigns
  └── Delivery status tracking
```

---

*Full System Analysis v2.2 - April 11, 2026*
