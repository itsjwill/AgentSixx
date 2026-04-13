# AgentSix v2: Dashboard Specification

> **Pages:** 5 (not 12)  
> **Stack:** Next.js + Convex + TailwindCSS  
> **Philosophy:** View-only for clients, we operate

---

## Design Philosophy

```
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                       ║
║   v2 DASHBOARD PRINCIPLES:                                                           ║
║                                                                                       ║
║   1. SIMPLE → 5 pages only, not 12                                                   ║
║   2. VIEW-FIRST → Agents see results, not manage software                            ║
║   3. REAL-TIME → Convex subscriptions, no manual refresh                             ║
║   4. MOBILE-READY → Same pages, responsive design                                    ║
║   5. ACTION-LIMITED → Call, text, book, DNC. That's it.                              ║
║                                                                                       ║
║   WHAT AGENTS CAN DO:                                                                ║
║   • Call a lead                                                                      ║
║   • Text a lead                                                                      ║
║   • Email a lead                                                                     ║
║   • Book an appointment                                                              ║
║   • Mark lead as DNC                                                                 ║
║   • Edit lead info                                                                   ║
║   • Cancel/reschedule appointment                                                    ║
║                                                                                       ║
║   WHAT AGENTS CANNOT DO:                                                             ║
║   • Edit templates                                                                   ║
║   • Configure AI settings                                                            ║
║   • Run campaigns                                                                    ║
║   • A/B test anything                                                                ║
║   → If they need something, Slack war room                                           ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

---

## 5 Pages Overview

```
PAGE 1: HOME (/dashboard)
─────────────────────────
• Stats grid: leads, appointments, calls, hot leads
• Today's hot leads (top 3, one-click actions)
• Upcoming appointments (next 5)
• Recent activity feed (last 10 events)

PAGE 2: LEADS (/dashboard/leads)
────────────────────────────────
• List view with filters (status, source, date, hot)
• Click lead → opens right-side drawer
• Drawer: full conversation + actions
• Actions: call, text, email, book, edit, DNC

PAGE 3: APPOINTMENTS (/dashboard/appointments)
──────────────────────────────────────────────
• Calendar view (week/month toggle)
• List view below calendar
• Click appointment → drawer with lead info
• Actions: confirm, reschedule, cancel, notes

PAGE 4: VOICE (/dashboard/voice)
────────────────────────────────
• Stats: calls this week, appointments booked, avg duration
• Call history (last 30 days)
• Each row: lead, time, duration, outcome, transcript link
• Click → full transcript + audio playback

PAGE 5: SETTINGS (/dashboard/settings)
──────────────────────────────────────
Tabs:
• General: business hours, timezone, AI tone
• Integrations: Zillow, Facebook, Calendar status
• Compliance: consent records, DNC, opt-out log
• Billing: plan, usage, invoices
• Notifications: SMS/email/push toggles
• Account: name, email, password
```

---

## Page 1: Home (`/dashboard`)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   AGENTOS                                                     [John Smith ▾]       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐ │
│   │   NEW LEADS     │  │   APPOINTMENTS  │  │   CALLS MADE    │  │   HOT LEADS   │ │
│   │      12         │  │       5         │  │      47         │  │      3        │ │
│   │   this week     │  │   this week     │  │   this week     │  │   waiting     │ │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘  └───────────────┘ │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   🔥 TODAY'S HOT LEADS                                                    [View All]│
│   ═══════════════════                                                               │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │ Sarah Miller        "Ready to buy, pre-approved"           [📞] [💬] [👁️] │  │
│   │ Zillow • 2 hours ago                                                        │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │ Mike Johnson        "Wants to see 456 Oak Ave"             [📞] [💬] [👁️] │  │
│   │ Facebook • 5 hours ago                                                      │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   📅 UPCOMING APPOINTMENTS                                               [View All] │
│   ════════════════════════                                                          │
│                                                                                     │
│   TODAY                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │ 2:00 PM   Sarah Miller         Phone Consultation           [Confirm]       │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│   ┌─────────────────────────────────────────────────────────────────────────────┐  │
│   │ 4:30 PM   Mike Johnson         Showing at 456 Oak Ave       [Confirm]       │  │
│   └─────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   📋 RECENT ACTIVITY                                                                │
│   ══════════════════                                                                │
│                                                                                     │
│   • AI booked appointment with Sarah Miller                          2 min ago     │
│   • New lead from Zillow: David Park                                15 min ago     │
│   • AI call completed: Mike Johnson (qualified)                     1 hour ago     │
│   • Lisa Chen replied to SMS                                        2 hours ago    │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 2: Leads (`/dashboard/leads`)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   LEADS                                                        [+ Add Lead]        │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   🔍 Search leads...                                                                │
│                                                                                     │
│   FILTERS:                                                                          │
│   [All Status ▾]  [All Sources ▾]  [All Dates ▾]  [Hot Only ☐]                     │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   NAME              SOURCE       STATUS           LAST CONTACT      ACTIONS        │
│   ──────────────────────────────────────────────────────────────────────────────── │
│                                                                                     │
│   🔥 Sarah Miller   Zillow       Qualified        2 hours ago       [📞][💬][👁️] │
│   📱 Mike Johnson   Facebook     Appointment      5 hours ago       [📞][💬][👁️] │
│   📧 Lisa Chen      Realtor.com  Qualifying       Yesterday         [📞][💬][👁️] │
│   📱 David Park     Zillow       Contacted        Yesterday         [📞][💬][👁️] │
│   ⛔ Tom Brown      Facebook     DNC              3 days ago        [👁️]          │
│                                                                                     │
│   Showing 1-20 of 147 leads                                    [← Previous] [Next →]│
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Lead Detail Drawer

```
┌──────────────────────────────────────────────────────────────────┐
│                                                         [X Close]│
│                                                                  │
│   SARAH MILLER                                          🔥 HOT   │
│   ══════════════                                                 ���
│                                                                  │
│   📱 +1 (555) 123-4567              [📞 Call]  [💬 Text]        │
│   📧 sarah@example.com              [📧 Email] [📅 Book]        │
│                                                                  │
│   ──────────────────────────────────────────────────────────────│
│                                                                  │
│   QUALIFICATION                                                  │
│   Timeline:        Immediate (within 30 days)                    │
│   Budget:          $350-400K                                     │
│   Motivation:      Relocating for job                            │
│   Decision Maker:  Yes                                           │
│   Pre-Approved:    Yes                                           │
│                                                                  │
│   ──────────────────────────────────────────────────────────────│
│                                                                  │
│   CONVERSATION                                                   │
│   ════════════                                                   │
│                                                                  │
│   [AI] Hi Sarah! This is John Smith's assistant...              │
│        ─ Today 10:15 AM                                          │
│                                                                  │
│   [Sarah] Yes! We're relocating from California...              │
│           ─ Today 10:23 AM                                       │
│                                                                  │
│   ──────────────────────────────────────────────────────────────│
│                                                                  │
│   Type a message...                                    [Send]    │
│                                                                  │
│   [Edit Info] [Mark DNC] [Archive]                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Page 3: Appointments (`/dashboard/appointments`)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   APPOINTMENTS                                       [Week ▾]  [+ Book Appointment] │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   ◀ April 2026                                                              ▶       │
│                                                                                     │
│   [Calendar Grid - Week/Month View]                                                 │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   THIS WEEK                                                                         │
│   ─────────                                                                         │
│                                                                                     │
│   THU, APRIL 10                                                                     │
│   │ 2:00 PM    Sarah Miller     Phone Consultation    📞 Scheduled   [Actions ▾]│  │
│   │ 4:30 PM    Mike Johnson     Showing               🏠 Confirmed   [Actions ▾]│  │
│                                                                                     │
│   FRI, APRIL 11                                                                     │
│   │ 10:00 AM   Lisa Chen        Buyer Consultation    📞 Scheduled   [Actions ▾]│  │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Page 4: Voice (`/dashboard/voice`)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   VOICE CALLS                                                                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   THIS WEEK                                                                         │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐       │
│   │ CALLS MADE    │  │ APPOINTMENTS  │  │ AVG DURATION  │  │ QUOTA         │       │
│   │     47        │  │      8        │  │    3:24       │  │ 1,247/2,000   │       │
│   └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   CALL HISTORY (Last 30 Days)                                                       │
│                                                                                     │
│   LEAD            TIME           DURATION   OUTCOME            TRANSCRIPT           │
│   ──────────────────────────────────────────────────────────────────────────────── │
│                                                                                     │
│   Sarah Miller    Today 10:15    4:32       ✅ Booked          [View]              │
│   Mike Johnson    Today 9:45     2:18       ✅ Qualified       [View]              │
│   Lisa Chen       Yesterday      3:45       ✅ Qualified       [View]              │
│   David Park      Yesterday      0:32       📭 Voicemail       [View]              │
│   Amy Wilson      Yesterday      1:15       ❌ Not Interested  [View]              │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Transcript Drawer

```
┌──────────────────────────────────────────────────────────────────┐
│                                                         [X Close]│
│                                                                  │
│   CALL WITH SARAH MILLER                                         │
│   ══════════════════════                                         │
│                                                                  │
│   📅 Today at 10:15 AM                                           │
│   ⏱️ Duration: 4:32                                              │
│   ✅ Outcome: Appointment Booked                                 │
│                                                                  │
│   🔊 AUDIO                                              [▶ Play] │
│   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  0:00    │
│                                                                  │
│   📝 TRANSCRIPT                                                  │
│   ═════════════                                                  │
│                                                                  │
│   [AI] Hi, is this Sarah? This is John Smith's assistant...     │
│                                                                  │
│   [Sarah] Oh hi! Yes, this is Sarah...                          │
│                                                                  │
│   [AI] Great! So you mentioned you're looking to buy...         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Page 5: Settings (`/dashboard/settings`)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│   SETTINGS                                                                          │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   [General] [Integrations] [Compliance] [Billing] [Notifications] [Account]         │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│   GENERAL                                                                           │
│   ═══════                                                                           │
│                                                                                     │
│   Business Name:    [John Smith Real Estate                    ]                    │
│   Timezone:         [America/New_York (Eastern Time)         ▾]                    │
│   Business Hours:   [8:00 AM] to [9:00 PM]                                          │
│   Days Active:      ☑ Mon ☑ Tue ☑ Wed ☑ Thu ☑ Fri ☑ Sat ☐ Sun                     │
│   AI Tone:          ○ Professional  ● Friendly  ○ Casual                            │
│                                                                                     │
│                                                              [Save Changes]         │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

INTEGRATIONS TAB:
─────────────────
• Zillow Premier Agent      ✅ Connected
• Facebook Lead Ads         ✅ Connected  
• Realtor.com               ⚠️ Needs Reconnect
• Google Calendar           ✅ Connected

COMPLIANCE TAB:
───────────────
• Total opt-ins: 147 (Active: 142, Revoked: 5)
• Internal DNC entries: 23
• Consent page: johnsmith.agentos.com

BILLING TAB:
────────────
• Current Plan: Pro ($1,197/mo)
• Voice Usage: 1,247 / 2,000 minutes (62%)
• Invoices: April, March, Feb (setup)
```

---

## Sidebar Navigation

```
┌─────────────────────────────┐
│                             │
│   AGENTOS                   │
│                             │
│   ─────────────────────     │
│                             │
│   📊  Dashboard             │
│   👥  Leads                 │
│   📅  Appointments          │
│   📞  Voice                 │
│   ⚙️  Settings              │
│                             │
│   ─────────────────────     │
│                             │
│   💬  Slack War Room        │
│       → Opens Slack         │
│                             │
│   📞  Need Help?            │
│       support@agentos.com   │
│                             │
│   ─────────────────────     │
│                             │
│   Pro Plan                  │
│   1,247 / 2,000 min         │
│                             │
└─────────────────────────────┘
```

---

## What's NOT in v1 Dashboard

```
CUT FOR v2+:
────────────
• Pipeline kanban view
• Analytics deep dive
• Templates editor
• A/B test dashboard
• Team management
• Campaigns manager
• Market reports viewer
• Social media scheduler
• Direct mail tracker
• Premium preview modals (no à la carte in v2)
```

---

## Mobile Responsive

Same 5 pages, responsive design:
- Sidebar collapses to hamburger menu
- Cards stack vertically
- Drawers become full-screen modals
- Tables become card lists

**No separate mobile app for v1.** PWA install prompt is enough.

---

*Dashboard spec for AgentSix v2. Reference companion to IMPLEMENTATION.md.*
