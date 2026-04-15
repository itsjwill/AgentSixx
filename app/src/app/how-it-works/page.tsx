"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader, FadeIn } from "@/components/layout/sections";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";
import { MagneticLink } from "@/components/motion/magnetic-button";

const onboardingSteps = [
  {
    step: 1,
    title: "Book Your Strategy Call",
    duration: "15 min",
    description: "We learn about your business, lead sources, and current pain points. No sales pitch, just discovery.",
    details: [
      "Review your current lead sources (Zillow, Realtor.com, Facebook, etc.)",
      "Understand your deal flow and conversion rates",
      "Identify where leads are falling through the cracks",
      "Define your ideal customer profile",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Compliance Setup",
    duration: "3-5 days",
    description: "We handle all the legal infrastructure. You sign one form, we do everything else.",
    details: [
      "A2P 10DLC registration for SMS compliance",
      "Federal + state DNC list integration",
      "TCPA litigator database exclusion setup",
      "Consent landing page creation at your-name.agentos.com",
      "Quiet hours configuration per timezone",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Voice ISA Agent Training",
    duration: "2-3 days",
    description: "We customize your Voice ISA (Inside Sales Agent) with your scripts, objection handling, and personality.",
    details: [
      "Custom greeting and introduction scripts",
      "Market-specific knowledge (your metro area)",
      "Objection handling for your niche",
      "Calendar integration for appointment booking",
      "Hot lead transfer rules to your phone",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Lead Source Integration",
    duration: "1-2 days",
    description: "We connect all your lead sources so every inquiry triggers instant Instant response.",
    details: [
      "Zillow Premier Agent webhook setup",
      "Realtor.com lead forwarding",
      "Facebook Lead Ads integration",
      "Website form capture",
      "CRM sync (Follow Up Boss, KVCore, etc.)",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Testing & Calibration",
    duration: "2-3 days",
    description: "We run 20+ test calls and conversations before going live. You approve everything.",
    details: [
      "20+ test inbound/outbound calls",
      "SMS conversation flow testing",
      "Appointment booking verification",
      "Hot lead escalation testing",
      "Edge case scenario handling",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Go Live + War Room Access",
    duration: "Day 7-10",
    description: "Your system goes live. You get dashboard access and your private Slack war room.",
    details: [
      "Dashboard access with real-time metrics",
      "Private Slack channel for escalations",
      "Agent mobile alerts for hot leads",
      "24/7 System handling all inbound/outbound",
      "Weekly performance reports",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const dailyOperations = [
  {
    time: "24/7",
    title: "System Handles Inbound Calls",
    description: "Every call to your number is answered instantly. Qualifies leads, books appointments, transfers hot ones to you live.",
    color: "emerald",
  },
  {
    time: "9am-6pm",
    title: "Outbound Campaign Active",
    description: "Automated calls opted-in leads from your pipeline. Timezone-aware, quiet hours enforced, TCPA compliant.",
    color: "cyan",
  },
  {
    time: "< 5 seconds",
    title: "Instant Lead Response",
    description: "New lead from Zillow/Facebook? Instantly responds via SMS + email before they contact another agent.",
    color: "blue",
  },
  {
    time: "15 min SLA",
    title: "Human Escalation",
    description: "Edge cases flagged to your Slack war room. Legal threats, life events, confused leads, human responds.",
    color: "purple",
  },
];

const resultsTimeline = [
  {
    week: "Week 1-2",
    title: "System Calibration",
    metrics: [
      { label: "Test calls completed", value: "20+" },
      { label: "Scripts refined", value: "3-5x" },
      { label: "Integration issues", value: "0" },
    ],
  },
  {
    week: "Week 3-4",
    title: "Early Traction",
    metrics: [
      { label: "Leads contacted", value: "100-200" },
      { label: "Conversations started", value: "40-60" },
      { label: "Appointments booked", value: "8-12" },
    ],
  },
  {
    week: "Month 2",
    title: "Full Operation",
    metrics: [
      { label: "Monthly outbound calls", value: "600+" },
      { label: "Response rate", value: "15-20%" },
      { label: "Qualified appointments", value: "15-25" },
    ],
  },
  {
    week: "Month 3+",
    title: "Optimization",
    metrics: [
      { label: "Appointment show rate", value: "70%+" },
      { label: "Deals from system leads", value: "2-4" },
      { label: "ROI on investment", value: "10-20x" },
    ],
  },
];

export default function HowItWorksPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    // Trigger PDF download from public folder
    const link = document.createElement("a");
    link.href = "/AgentSixx-Guide.pdf";
    link.download = "AgentSixx-Complete-Guide.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-[100dvh]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute top-1/2 right-1/3 w-[200px] sm:w-[300px] md:w-[350px] h-[200px] sm:h-[300px] md:h-[350px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />

          {/* Center Nav - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <span className="text-emerald-400 font-medium">How It Works</span>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Right CTA - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Dashboard
            </Link>
            <MagneticLink
                  href="/dashboard"
                  className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 text-black font-semibold shadow-[0_0_40px_-8px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-8px_rgba(16,185,129,0.7)] transition-shadow text-base sm:text-lg min-h-[48px] inline-flex items-center justify-center"
                >
                  Book Demo
                </MagneticLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <span className="text-emerald-400 font-medium py-2">How It Works</span>
              <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Compliance</Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
                <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/dashboard" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-center" onClick={() => setMobileMenuOpen(false)}>
                  Book Demo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 sm:mb-6"
          >
            <span className="text-emerald-400 text-xs sm:text-sm font-medium">From signup to live in 7-10 days</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            How{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              AgentSixx
            </span>{" "}
            Works For You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-2 mb-8"
          >
            We handle everything. You focus on closing deals. Here&apos;s exactly what happens after you sign up.
          </motion.p>

          {/* PDF Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-2"
          >
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all group w-full sm:w-auto justify-center sm:justify-start"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm sm:text-base">
                  {downloading ? "Downloading..." : "Download Complete Guide"}
                </div>
                <div className="text-zinc-500 text-xs sm:text-sm">PDF with full system details</div>
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <span className="text-zinc-500 text-sm">See how it works</span>
            <svg className="w-5 h-5 text-emerald-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Onboarding Timeline */}
      <Section>
        <SectionHeader
          label="Onboarding Process"
          title="Setup in 6 Simple Steps"
          description="We do the heavy lifting. You answer a few questions and approve the results."
          labelColor="emerald"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Timeline Line - hidden on mobile, visible on md+ */}
            <div className="absolute left-5 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-purple-500 hidden md:block" />

            {/* Steps */}
            <div className="space-y-6 sm:space-y-8 md:space-y-12">
              {onboardingSteps.map((step, index) => (
                <FadeIn key={step.step} delay={index * 0.1}>
                  <div className="relative flex gap-3 sm:gap-4 md:gap-8">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center z-10">
                      <span className="text-black font-bold text-sm sm:text-base md:text-xl">{step.step}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                              {step.icon}
                            </div>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">{step.title}</h3>
                          </div>
                          <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs sm:text-sm font-medium w-fit">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-zinc-400 mb-3 sm:mb-4 text-sm sm:text-base">{step.description}</p>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {step.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-500">
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="leading-tight">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Daily Operations */}
      <Section className="bg-zinc-900/30">
        <SectionHeader
          label="After Go-Live"
          title="How Your System Runs Daily"
          description="Once live, here's what happens every single day, automatically."
          labelColor="cyan"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {dailyOperations.map((op, index) => (
              <FadeIn key={op.title} delay={index * 0.1}>
                <div className={`p-4 sm:p-5 md:p-6 rounded-xl md:rounded-2xl bg-zinc-900/50 border border-zinc-800 transition-colors h-full ${
                    op.color === 'emerald' ? 'hover:border-emerald-500/30' :
                    op.color === 'cyan' ? 'hover:border-cyan-500/30' :
                    op.color === 'blue' ? 'hover:border-blue-500/30' :
                    'hover:border-purple-500/30'
                  }`}>
                  <div className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 ${
                    op.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                    op.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                    op.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    {op.time}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">{op.title}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{op.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Results Timeline */}
      <Section>
        <SectionHeader
          label="Expected Results"
          title="Your First 90 Days"
          description="Conservative projections based on real agent data. Your results may vary."
          labelColor="purple"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {resultsTimeline.map((period, index) => (
              <FadeIn key={period.week} delay={index * 0.1}>
                <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/30 transition-colors h-full">
                  <span className="text-purple-400 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider">{period.week}</span>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mt-1.5 sm:mt-2 mb-3 sm:mb-4">{period.title}</h3>
                  <div className="space-y-2 sm:space-y-3">
                    {period.metrics.map((metric) => (
                      <div key={metric.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                        <span className="text-zinc-500 text-[10px] sm:text-xs md:text-sm">{metric.label}</span>
                        <span className="text-white font-semibold text-xs sm:text-sm md:text-base">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* What You Get */}
      <Section className="bg-zinc-900/30">
        <SectionHeader
          label="What's Included"
          title="Everything In Your Package"
          description="No hidden fees. No surprise charges. This is what you get."
          labelColor="emerald"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <FadeIn>
              <div className="p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Done For You</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Full compliance setup (10DLC, DNC, TCPA)",
                    "Voice ISA agent trained on your scripts",
                    "Lead source integrations configured",
                    "Dashboard and war room setup",
                    "Ongoing system monitoring",
                    "Weekly performance optimization",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 text-sm sm:text-base leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">You Get Access To</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Real-time performance dashboard",
                    "Call recordings and transcripts",
                    "Lead conversation history",
                    "Appointment calendar sync",
                    "Private Slack war room (Pro+)",
                    "Monthly strategy calls (Pro+)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-zinc-300 text-sm sm:text-base leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Guarantee */}
      <Section>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-purple-500/5 border border-zinc-800 text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                90-Day Performance Guarantee
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-4 sm:mb-6 px-2">
                If we don&apos;t deliver at least <span className="text-emerald-400 font-semibold">8 qualified appointments</span> in your first 90 days, we refund your setup fee in full. No questions asked.
              </p>
              <p className="text-zinc-500 text-xs sm:text-sm">
                We put our money where our mouth is. If we can&apos;t perform, you don&apos;t pay.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-zinc-900/30">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 sm:mb-8">
              Book a 15-minute strategy call. We&apos;ll show you exactly how AgentSixx will work for your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl text-black font-semibold hover:opacity-90 transition-opacity text-center"
              >
                Book Strategy Call
              </Link>
              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Guide
              </button>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
