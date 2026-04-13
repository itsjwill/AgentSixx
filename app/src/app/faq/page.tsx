"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  HelpCircle, Shield, CreditCard, Headphones,
  Lock, TrendingUp, Phone, Settings, Users, ChevronDown,
  Search, MessageSquare, ArrowRight, Menu, X, Zap
} from "lucide-react";
import { Footer } from "@/components/shared/footer";

const faqCategories = [
  {
    name: "General",
    icon: HelpCircle,
    color: "emerald",
    faqs: [
      {
        q: "What exactly is AgentSix?",
        a: "AgentSix is a done-for-you Intelligent Outreach system built specifically for real estate agents. Unlike DIY SaaS tools, we handle everything: Intelligent Voice calls to your leads, instant SMS/email responses, appointment booking, and full TCPA compliance. Think of it as having a 24/7 ISA that never sleeps, never calls in sick, costs a fraction of the price, and won't expose you to lawsuits.",
      },
      {
        q: "How is this different from other Intelligent tools I've seen?",
        a: "Most Intelligent tools focus on speed and leave compliance as 'your problem.' We built compliance into the foundation with 8 layers of TCPA protection. Other key differences: (1) We're done-for-you, not DIY — we set everything up. (2) We have real Intelligent Voice calls, not just chatbots. (3) We carry $2M E&O insurance. (4) We have a 90-day ROI guarantee. Other tools leave you exposed to $500-$1,500 per violation lawsuits.",
      },
      {
        q: "Who is AgentSix best suited for?",
        a: "AgentSix works for: (1) Solo agents doing 15+ deals/year who can't afford a human ISA but need better lead follow-up. (2) Mid-producers doing 25-50 deals/year who are frustrated with inconsistent ISAs. (3) Top producers and teams doing 50+ deals/year who need to scale without compliance risk. We're NOT a good fit if you're brand new with no lead flow, or if you want to DIY everything yourself.",
      },
      {
        q: "Is this a software I have to learn, or do you do everything?",
        a: "We do everything. This is done-for-you, not SaaS. You don't need to learn any software, configure anything, or become a tech expert. We handle: A2P registration, CRM integration, Voice training, compliance setup, lead source connections, and ongoing optimization. You just approve the scripts, check your dashboard, and show up to appointments.",
      },
      {
        q: "How long does it take to get started?",
        a: "Most agents are fully live within 7-10 days. The timeline breaks down as: Day 1-2: Onboarding call, script approval. Day 2-5: A2P 10DLC registration (carrier approval). Day 5-7: CRM integration, Intelligent Voice training. Day 7-10: Testing, final approval, go-live. We handle all the technical work — you just need to approve scripts and connect your calendar.",
      },
      {
        q: "What do I need to provide to get started?",
        a: "Just a few things: (1) Access to your CRM (or we help you set one up). (2) Your calendar link for appointment booking. (3) Your lead sources (Zillow, Facebook, etc.) or we help you connect them. (4) 15-30 minutes for an onboarding call. (5) Your approval on the Voice scripts. That's it — we handle everything else.",
      },
    ],
  },
  {
    name: "Intelligent Voice",
    icon: Phone,
    color: "cyan",
    faqs: [
      {
        q: "How does the Intelligent Voice calling work?",
        a: "When a new lead comes in, our Automated calls them within minutes (or on a schedule you set). The system has a natural human voice, introduces itself, qualifies the lead, handles objections, and either books an appointment or schedules a callback. The entire conversation is recorded, transcribed, and logged in your dashboard. Hot leads can be transferred to you live.",
      },
      {
        q: "Does the system sound robotic?",
        a: "No. We use the latest voice Intelligent technology (Retell AI with Claude). The voice is natural, conversational, and can handle interruptions, pauses, and back-and-forth dialogue. Most leads don't realize they're talking to a system until told. We also adjust speaking speed, tone, and personality based on your preferences.",
      },
      {
        q: "Can the system handle objections and tough questions?",
        a: "Yes. The system is trained on 50+ common real estate objections: 'I'm just looking,' 'I already have an agent,' 'Your price is too high,' 'I'm not ready yet,' etc. It responds naturally and tries to keep the conversation moving toward an appointment. For questions it can't answer, it gracefully offers to have you follow up personally.",
      },
      {
        q: "What if a lead wants to speak to a real person immediately?",
        a: "The system can transfer calls to you live. You set the rules: only during business hours, only for certain lead types, only if they explicitly ask, etc. When a transfer happens, you get the lead's info on screen before the call connects. If you're unavailable, the Automatically books a callback instead.",
      },
      {
        q: "Does the system leave voicemails?",
        a: "Yes. When a call goes to voicemail, the system leaves a professional, personalized voicemail. We have 6 different voicemail scripts that rotate across the calling sequence so leads don't hear the same message twice. All voicemails are logged and transcribed in your dashboard.",
      },
      {
        q: "How many calls can the system make per day?",
        a: "There's no daily limit — it depends on your plan's monthly minutes. A typical 3-minute call uses 3 minutes. On the Pro plan (2,000 minutes/month), that's roughly 650+ calls. The System respects quiet hours (no calls before 9am or after 8pm in the lead's timezone) and can be scheduled for specific times.",
      },
      {
        q: "Are calls recorded? How do I listen to them?",
        a: "Yes, all calls are recorded and transcribed. In your dashboard, you can listen to any call, read the full transcript, and see the outcome (appointment booked, callback scheduled, not interested, etc.). Recordings are kept for 4 years for compliance documentation.",
      },
      {
        q: "Can I customize what the System says?",
        a: "Absolutely. During onboarding, we train the system on your specific scripts, market, pricing, and service areas. You approve all messaging before go-live. If you want changes later, just tell us in Slack and we update within 24 hours. Growth plan includes fully custom Voice training.",
      },
    ],
  },
  {
    name: "SMS & Email",
    icon: MessageSquare,
    color: "violet",
    faqs: [
      {
        q: "How fast does the System respond to leads?",
        a: "Under 5 seconds. When a lead submits a form, texts your number, or emails you, the Instantly responds instantly. Speed-to-lead is the #1 factor in conversion — agents who respond in under 5 minutes are 100x more likely to connect than those who wait an hour. We make sure you're always first.",
      },
      {
        q: "Are SMS and email unlimited?",
        a: "Yes, SMS and email are unlimited on all plans. You only pay for Intelligent Voice minutes. Send as many texts and emails as you need to nurture your leads.",
      },
      {
        q: "Can the system have back-and-forth text conversations?",
        a: "Yes. The System handles multi-turn conversations naturally. It can answer questions, overcome objections, qualify leads, and work toward booking an appointment — all via text. If a lead asks something complex, the system offers to have you call them directly.",
      },
      {
        q: "What happens if a lead replies at 2am?",
        a: "The Instantly responds instantly, 24/7. This is a huge advantage over human ISAs who only work business hours. Late-night inquiries are often the most motivated buyers — the system engages them immediately while your competitors are asleep.",
      },
      {
        q: "Can I see all the conversations?",
        a: "Yes. Every SMS, email, and call is logged in your dashboard with full conversation history. You can filter by lead, by outcome, by date, or search for specific keywords. This is also your compliance audit trail.",
      },
      {
        q: "Does the System personalize messages?",
        a: "Yes. Messages include the lead's name, property they inquired about, and contextual details. The system also adjusts tone based on the conversation — more casual for chatty leads, more professional for serious buyers. It doesn't feel like a mass blast.",
      },
    ],
  },
  {
    name: "Compliance",
    icon: Shield,
    color: "amber",
    faqs: [
      {
        q: "What is TCPA and why should I care?",
        a: "TCPA (Telephone Consumer Protection Act) regulates how businesses can contact consumers via phone and text. Violations cost $500-$1,500 per contact. A single class action lawsuit can cost $50K-$500K+. Real estate agents are frequent targets because they often use outdated lead lists and don't track consent. AgentSix handles all compliance so you're protected.",
      },
      {
        q: "What are the 8 layers of compliance protection?",
        a: "1) A2P 10DLC registration — your messages send from registered numbers. 2) Federal DNC scrubbing — we check the national Do Not Call list. 3) All 50 state DNC lists — we check every state registry. 4) TCPA litigator database — we block 3,400+ known serial litigators. 5) Quiet hours enforcement — no contact before 9am or after 8pm local time. 6) Consent tracking — we document when and how consent was given. 7) Call recording disclosure — proper disclosure for 2-party consent states. 8) $2M E&O insurance — coverage for system-related errors.",
      },
      {
        q: "Do I need to register for 10DLC myself?",
        a: "No. We handle the entire A2P 10DLC registration as part of your setup fee. This process normally takes 4-6 weeks and requires filling out carrier-specific forms, brand registration, campaign registration, and approval cycles. We do all of it for you. Your messages send from our compliant infrastructure.",
      },
      {
        q: "What if a lead texts STOP?",
        a: "It's handled instantly and automatically. The lead is added to your internal DNC list, consent is revoked with a timestamp, and no further contact is made — ever. All documented in your audit trail. Same for HELP (they get support info) and any opt-out language.",
      },
      {
        q: "How long do you keep compliance records?",
        a: "4 years — the full TCPA statute of limitations. Every consent record, every contact attempt, every opt-out, every response is timestamped and searchable. If you ever get challenged (unlikely given our protection), the proof is ready to go.",
      },
      {
        q: "What if I get a TCPA complaint anyway?",
        a: "First, it's extremely unlikely given our 8-layer protection. We've had $0 in violations since launch. But if it happens: (1) We provide full audit trail documentation to your attorney. (2) Our $2M E&O insurance covers system-related errors. (3) Our compliance team helps you respond. You're not alone.",
      },
      {
        q: "Do you handle state-specific regulations?",
        a: "Yes. Different states have different rules. California has stricter requirements. Some states are 'two-party consent' for call recording. Some have unique quiet hours. Our system automatically adjusts based on the lead's location. You don't have to think about it.",
      },
      {
        q: "What about TCPA for real estate specifically?",
        a: "Real estate is a high-risk industry for TCPA because agents often: use purchased lead lists, call old leads without fresh consent, and don't document opt-outs properly. We solve all of this. Fresh consent tracking, automatic DNC management, and full documentation. Many agents come to us after a scare or near-miss with litigation.",
      },
    ],
  },
  {
    name: "Results & ROI",
    icon: TrendingUp,
    color: "emerald",
    faqs: [
      {
        q: "What results can I realistically expect?",
        a: "Most agents see: (1) 5x faster response time (under 5 seconds vs. 15+ minutes). (2) 40-60% more leads contacted (24/7 coverage). (3) 2-3 additional appointments per month. (4) 13-20x ROI on their investment. Results vary based on lead quality and volume, but our 90-day guarantee ensures you see at least 8 qualified appointments.",
      },
      {
        q: "How does the 90-day ROI guarantee work?",
        a: "If we don't deliver at least 8 qualified appointments in your first 90 days, we refund your setup fee in full. No hoops, no fine print. A 'qualified appointment' is a lead who shows up (or reschedules) for a conversation about buying/selling. We track this in your dashboard so there's no ambiguity.",
      },
      {
        q: "How quickly will I see results?",
        a: "Most agents see their first system-booked appointment within the first week of going live. Full ROI typically materializes within 60-90 days as the system processes your lead pipeline. The system gets smarter over time as it learns what works for your specific market and leads.",
      },
      {
        q: "What if I don't have many leads right now?",
        a: "The system works best with consistent lead flow. If you're getting fewer than 20 leads/month, you might want to focus on lead generation first. That said, the system maximizes every lead you do get — so even low-volume agents see better conversion rates. We can discuss your situation on a demo call.",
      },
      {
        q: "Do you have case studies or success stories?",
        a: "Yes. Sarah M. (KW Phoenix) replaced her $3,500/mo ISA and booked 23 appointments in the first month. Marcus J. (Century 21) went from 15-minute response times to under 5 seconds and saw 22x ROI. We can share more relevant examples on your demo call based on your market and situation.",
      },
      {
        q: "How do you calculate ROI?",
        a: "Simple math: If you're on Pro ($1,197/mo) and close 2 extra deals per month at $8,000 average commission, that's $16,000 in extra income vs. $1,197 cost = 13x ROI. Even one extra deal per month is 6-7x ROI. Most agents close 2-3 extra deals/month once the system is optimized.",
      },
    ],
  },
  {
    name: "Integrations",
    icon: Settings,
    color: "cyan",
    faqs: [
      {
        q: "What CRMs do you integrate with?",
        a: "Native integrations: Follow Up Boss, KVCore, Salesforce, HubSpot, Close CRM, and Pipedrive. For other CRMs: webhook API and Zapier integration. If your CRM isn't listed, ask us — we've integrated with 30+ different systems. Setup is included in your onboarding.",
      },
      {
        q: "What lead sources can I connect?",
        a: "Any lead source that can send a webhook, email, or API call: Zillow, Realtor.com, Facebook Lead Ads, Google Ads, your website forms, landing pages, etc. We also integrate with popular lead vendors like BoldLeads, CINC, Ylopo, and Real Geeks. We'll help you set up connections during onboarding.",
      },
      {
        q: "What calendar tools do you integrate with?",
        a: "Google Calendar, Outlook, Calendly, Cal.com, and most scheduling tools. The system checks your real-time availability and books directly. You get a notification with lead details before the appointment.",
      },
      {
        q: "Do I need technical skills to set this up?",
        a: "No. This is done-for-you. We handle all integrations, API connections, and technical configuration. You just need to give us login access (which we keep secure) or authorize via OAuth. Most agents spend less than an hour total on technical setup.",
      },
      {
        q: "Can you integrate with my existing phone system?",
        a: "We provide dedicated phone numbers for Automated calls and SMS. These can be local numbers matching your market area code. If you want to port your existing number to us, we can discuss that option (takes 2-4 weeks). Most agents use a dedicated number and keep their personal line separate.",
      },
      {
        q: "What about MLS integration?",
        a: "We don't directly integrate with MLS (no API access), but we integrate with CRMs that sync MLS data. If you need the system to reference specific listings, we can train it on your inventory or connect to your IDX feed.",
      },
    ],
  },
  {
    name: "Pricing & Billing",
    icon: CreditCard,
    color: "violet",
    faqs: [
      {
        q: "What are the pricing tiers?",
        a: "Starter: $597/mo (500 leads, 500 Voice mins, 5,000 SMS). Pro: $1,297/mo (1,000 leads, 2,000 Voice mins, 10,000 SMS). Growth: $2,497/mo (2,500 leads, 5,000 Voice mins, 25,000 SMS). All plans include 8-layer compliance and unlimited email.",
      },
      {
        q: "What's included in the setup fee?",
        a: "The one-time setup fee covers: A2P 10DLC registration, CRM integration, Intelligent Voice training on your scripts, compliance configuration, lead source connections, and hands-on onboarding calls. It's done-for-you setup, not DIY. Starter: $1,497, Pro: $2,497, Growth: $4,997.",
      },
      {
        q: "What are the overage rates?",
        a: "Voice: $0.15/min. SMS: $0.03/msg. Leads: $0.25/lead. We alert you at 80% usage so there are no surprises. You can also set hard caps to prevent overages entirely.",
      },
      {
        q: "What happens if I exceed my Intelligent Voice minutes?",
        a: "We alert you at 80% usage so there are no surprises. If you exceed your limit, additional minutes are billed at $0.15/min. There's no service interruption — the system keeps working. You can also set a hard cap if you prefer to pause calls rather than pay overages.",
      },
      {
        q: "Do unused minutes roll over?",
        a: "Yes! Unused Intelligent Voice minutes roll over for up to 60 days. SMS and email are unlimited, so no rollover needed there. We want you to use your minutes, not lose them.",
      },
      {
        q: "Is there a contract or can I cancel anytime?",
        a: "90-day initial commitment, then month-to-month. The 90 days lets us properly onboard you, optimize the system, and demonstrate ROI. After that, cancel anytime with 30 days notice. We keep your data available for export for 30 days after cancellation.",
      },
      {
        q: "What's included in the 90-day ROI guarantee?",
        a: "If we don't deliver at least 8 qualified appointments in your first 90 days, we refund your setup fee in full. The monthly subscription is non-refundable (you're using the service), but the setup fee is covered. This shows our confidence in the system.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes. Upgrades take effect immediately — we prorate the difference. Downgrades take effect at the start of your next billing cycle. No penalties either way. Most agents start on Pro and either stay or upgrade to Growth.",
      },
      {
        q: "Do you offer team or brokerage pricing?",
        a: "Yes. Teams of 3+ agents get volume discounts. Brokerages with 10+ agents get custom enterprise pricing with white-label options. Contact us for a custom quote.",
      },
    ],
  },
  {
    name: "Security",
    icon: Lock,
    color: "amber",
    faqs: [
      {
        q: "How do you protect my data?",
        a: "Enterprise-grade security: (1) All data encrypted at rest (AES-256) and in transit (TLS 1.3). (2) SOC 2 Type II compliant infrastructure. (3) Regular security audits and penetration testing. (4) Role-based access controls. (5) Secure OAuth for CRM connections — we never store your passwords.",
      },
      {
        q: "Where is my data stored?",
        a: "All data is stored in US-based data centers (AWS) with redundant backups. We comply with CCPA and other US privacy regulations. Data never leaves the US unless you specifically request it.",
      },
      {
        q: "Who has access to my leads and conversations?",
        a: "Only you and our support team (when troubleshooting). We never sell, share, or use your data for other purposes. Our support team access is logged and auditable. You own your data — export anytime.",
      },
      {
        q: "What happens to my data if I cancel?",
        a: "Your data remains available for 30 days after cancellation for export. After that, it's permanently deleted from our systems. Call recordings and compliance records can be exported in bulk before cancellation.",
      },
      {
        q: "Do you have insurance coverage?",
        a: "Yes. $2M E&O (Errors & Omissions) insurance covers system-related compliance errors. This protects you if something goes wrong on our end. We also maintain $5M general liability and $1M cyber liability coverage.",
      },
    ],
  },
  {
    name: "Support",
    icon: Headphones,
    color: "emerald",
    faqs: [
      {
        q: "What kind of support do you offer?",
        a: "Starter: Email support with 4-hour SLA during business hours. Pro: Dedicated Slack channel with 15-minute SLA during business hours. Growth: Direct phone line to your account manager + priority Slack. All plans get emergency support for critical issues 24/7.",
      },
      {
        q: "Do you offer training and onboarding?",
        a: "Yes. All plans include: (1) Initial onboarding call with your implementation specialist. (2) Script review and approval session. (3) Dashboard training. (4) Go-live support. Pro adds monthly strategy calls. Growth adds weekly optimization calls with your dedicated account manager.",
      },
      {
        q: "What if I have issues outside business hours?",
        a: "The Intelligent system runs 24/7 with automatic monitoring. Critical issues (system down, compliance alerts) trigger our on-call team immediately. Non-urgent questions are answered next business day. The system is highly reliable — 99.9% uptime.",
      },
      {
        q: "Can I talk to a human?",
        a: "Always. We're done-for-you, not chatbot-for-you. Every support channel connects you to real team members who know your account. On Pro and Growth, you have a dedicated Slack channel with people who know your specific setup.",
      },
      {
        q: "How do I request changes to my Voice scripts?",
        a: "Message us in Slack (Pro/Growth) or email (Starter). Describe what you want changed, and we update the system within 24 hours. No technical knowledge required — just tell us what you want in plain English.",
      },
    ],
  },
  {
    name: "Comparison",
    icon: Users,
    color: "cyan",
    faqs: [
      {
        q: "How does AgentSix compare to a human ISA?",
        a: "Cost: Human ISA costs $2,500-$4,000/mo; AgentSix starts at $597/mo. Speed: Human ISA responds in 15-60 min; AgentSix responds in 5 sec. Availability: Human works 9-5; AgentSix works 24/7. Sick days: Human ISAs call in sick; System never does. Compliance: Human ISAs make mistakes; AgentSix has 8-layer protection. Consistency: Humans have bad days; System is 100% consistent.",
      },
      {
        q: "What about other Intelligent tools like Ylopo AI or CINC AI?",
        a: "Key differences: (1) Most competitors are DIY SaaS — you configure everything. We're done-for-you. (2) Most focus on text/email only. We do Intelligent Voice calls. (3) Most ignore compliance. We have 8-layer protection + insurance. (4) Most don't guarantee results. We have a 90-day ROI guarantee. We're purpose-built for real estate agents who want results, not another tool to manage.",
      },
      {
        q: "Why not just hire a virtual assistant?",
        a: "VAs have limitations: (1) They work set hours, not 24/7. (2) They need training, management, and oversight. (3) They make compliance mistakes. (4) They cost $2,000-$3,000/mo for quality work. (5) They quit, get sick, and need vacation. AgentSix handles everything automatically with perfect consistency.",
      },
      {
        q: "Can I use AgentSix alongside my existing ISA?",
        a: "Yes. Many teams use AgentSix for instant response and initial qualification, then hand off warm leads to human ISAs for complex follow-up. This maximizes both speed and human touch. The System handles volume; humans handle nuance.",
      },
      {
        q: "What makes your Intelligent Voice better than others?",
        a: "We use Retell AI with Claude — the most advanced conversational technology available. The voice is natural, handles interruptions, adjusts tone based on conversation flow, and can navigate complex discussions. Most competitor voice systems is just pre-recorded prompts or robotic text-to-speech. Ours has actual conversations.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentCategory = faqCategories.find((c) => c.name === activeCategory);
  const currentFaqs = currentCategory?.faqs || [];

  // Search across all categories
  const searchResults = searchQuery.length > 2
    ? faqCategories.flatMap(cat =>
        cat.faqs.filter(faq =>
          faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(faq => ({ ...faq, category: cat.name }))
      )
    : [];

  const displayFaqs = searchQuery.length > 2 ? searchResults : currentFaqs;

  const getCategoryColor = (color: string) => {
    const colors: Record<string, string> = {
      emerald: "from-emerald-500 to-emerald-600",
      cyan: "from-cyan-500 to-cyan-600",
      violet: "from-violet-500 to-violet-600",
      amber: "from-amber-500 to-amber-600",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
            </div>
            <span className="text-lg sm:text-xl font-bold">AgentSix</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link>
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <span className="text-emerald-400 font-medium">FAQ</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity">
              Book Demo
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800"
          >
            <div className="px-4 py-4 space-y-3">
              <Link href="/" className="block py-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/features" className="block py-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/compliance" className="block py-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Compliance</Link>
              <Link href="/pricing" className="block py-2 text-zinc-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <span className="block py-2 text-emerald-400 font-medium">FAQ</span>
              <Link
                href="/dashboard"
                className="block w-full text-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Demo
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0)}+ Questions Answered
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            How can we{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              help you?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-6 sm:mb-10 px-2"
          >
            Everything you need to know about AgentSix. Search below or browse by category.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-16 sm:pr-4 py-3 sm:py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm sm:text-base placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-sm"
                >
                  Clear
                </button>
              )}
            </div>
            {searchQuery.length > 2 && (
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-zinc-500">
                Found {searchResults.length} results for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      {!searchQuery && (
        <section className="px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Horizontal scroll, Tablet+: Wrap */}
            <div className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setExpandedFaq(0);
                    }}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category.name
                        ? "bg-gradient-to-r " + getCategoryColor(category.color) + " text-white shadow-lg"
                        : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {category.name}
                    <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full ${
                      activeCategory === category.name
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}>
                      {category.faqs.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Category Header (when not searching) */}
          {!searchQuery && currentCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${getCategoryColor(currentCategory.color)} flex items-center justify-center`}>
                  <currentCategory.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">{currentCategory.name}</h2>
                  <p className="text-xs sm:text-sm text-zinc-500">{currentCategory.faqs.length} questions</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ Items */}
          <div className="space-y-3 sm:space-y-4">
            {displayFaqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex items-start justify-between p-4 sm:p-6 text-left"
                >
                  <div className="flex-1 pr-3 sm:pr-4">
                    {'category' in faq && (
                      <span className="inline-block text-[10px] sm:text-xs text-emerald-400 font-medium mb-1.5 sm:mb-2 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded">
                        {String(faq.category)}
                      </span>
                    )}
                    <span className="block font-semibold text-white text-sm sm:text-base md:text-lg leading-tight sm:leading-normal">{faq.q}</span>
                  </div>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 transition-transform mt-0.5 ${
                    expandedFaq === i ? "rotate-180 bg-emerald-500/20" : ""
                  }`}>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${expandedFaq === i ? "text-emerald-400" : "text-zinc-400"}`} />
                  </div>
                </button>
                {expandedFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-4 sm:px-6 pb-4 sm:pb-6"
                  >
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed whitespace-pre-line">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* No results */}
          {searchQuery.length > 2 && searchResults.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <p className="text-zinc-400 text-sm sm:text-base mb-4">No results found for &ldquo;{searchQuery}&rdquo;</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-emerald-400 hover:underline text-sm sm:text-base"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-2xl sm:rounded-3xl blur-xl" />
            <div className="relative p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 mb-4 sm:mb-6">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">Still have questions?</h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto">
                Can&apos;t find what you&apos;re looking for? Book a 15-minute demo and we&apos;ll answer all your questions personally.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-black text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
                <a
                  href="mailto:support@agentos.io"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-zinc-700 rounded-xl text-white text-sm sm:text-base hover:bg-zinc-800 transition-colors"
                >
                  Email Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
