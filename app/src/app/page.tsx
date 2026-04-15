"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section, FadeIn } from "@/components/layout/sections";
import { DemoBookingModal } from "@/components/custom/demo-booking-modal";
import { DemoPlayer } from "@/components/custom/demo-player";
import { TestimonialsSection } from "@/components/custom/testimonials-section";
import { TrustBadges } from "@/components/custom/trust-badges";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";
import { TiltCard } from "@/components/motion/tilt-card";
import { Meteors } from "@/components/motion/meteors";
import { cn } from "@/lib/utils";

const stats = [
  { value: "$0", label: "TCPA violations", color: "emerald" },
  { value: "8", label: "Compliance layers", color: "white" },
  { value: "5s", label: "Response time", color: "white" },
  { value: "24/7", label: "System coverage", color: "white" },
];

const features = [
  {
    title: "Voice ISA",
    subtitle: "Costs less than a Tuesday lunch meeting",
    description: "Answers every inbound call. Qualifies the lead. Books them on your calendar or transfers the hot ones to you live. Doesn't sound like a bot, leads ask to speak to Jennifer and get Jennifer.",
    benefits: ["Never misses a call", "Books to your calendar", "Transfers hot leads live", "Handles objections like a closer"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    color: "emerald",
  },
  {
    title: "Instant Lead Response",
    subtitle: "5 seconds. Every time. Even at 11pm.",
    description: "Zillow lead hits at 9:47pm. You're at dinner. AgentSixx already texted, emailed, and offered to call. By the time you check your phone, your calendar has a 10am showing on it.",
    benefits: ["Under 5-second SMS", "Email + voice combo", "Works while you're at a closing", "Any lead source. Zillow, FB, IDX"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "cyan",
  },
  {
    title: "Listing Lead Sourcing",
    subtitle: "We're your data provider too, not just your response layer",
    description: "Need more sellers? We pull direct seller data in your zip codes: high-equity owners, pre-foreclosure, absentee, probate, expired listings. Skip-traced phones, enriched, scored for intent, delivered straight into your pipeline. Pay once for data you'd normally split across three vendors.",
    benefits: ["Direct seller lists", "Skip-traced phones included", "Buyer leads by criteria", "Replaces BatchData + skip-trace stack"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: "amber",
  },
  {
    title: "Compliance Infrastructure",
    subtitle: "Sleep through the TCPA headlines",
    description: "Serial litigators are running $500K-per-case extortion on agents with sloppy consent. We block 3,400+ of them before your first SMS goes out. Quiet hours, DNC, consent timestamps, all handled, all timestamped, all yours if an attorney ever asks.",
    benefits: ["A2P 10DLC registered", "Federal + 50 state DNC", "3,400+ litigators blocked", "$2M E&O coverage"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "blue",
  },
];

const complianceLayers = [
  { name: "A2P 10DLC Registration", status: "Included" },
  { name: "Federal DNC Scrubbing", status: "Auto-updated" },
  { name: "State DNC Lists (50)", status: "All states" },
  { name: "TCPA Litigator Database", status: "3,400+ blocked" },
  { name: "Quiet Hours Enforcement", status: "Per-timezone" },
  { name: "Consent Tracking", status: "Timestamped" },
  { name: "Call Recording Disclosure", status: "11 states" },
  { name: "Tech E&O Insurance", status: "$2M coverage" },
];

const faqs = [
  {
    q: "How is this different from other lead-response tools?",
    a: "Most lead-response tools focus on speed and ignore compliance. We built compliance into the foundation. 8 layers of TCPA protection, $2M E&O insurance, and 4-year audit trail retention.",
  },
  {
    q: "Can you provide leads, or do I have to bring my own?",
    a: "Both. Most agents plug in their existing sources (Zillow, Facebook, CRM, website) and we handle the response. If you want more volume, especially direct seller leads for listings, we source that too. High-equity, pre-foreclosure, absentee, probate, expired, or buyer leads filtered by your criteria and territory. Skip-traced, phone-verified, scored for intent, and piped straight into your pipeline. Add it to any plan as a data bundle.",
  },
  {
    q: "What if I exceed my Voice minutes?",
    a: "We alert you at 80% usage. Additional minutes are $0.15/min for voice. No service interruption, and you can set hard caps.",
  },
  {
    q: "Is there a contract?",
    a: "90-day initial commitment, then month-to-month. Cancel anytime with 30 days notice after the initial period.",
  },
  {
    q: "What CRMs do you integrate with?",
    a: "Native integrations with Follow Up Boss, KVCore, Salesforce, and HubSpot. Plus webhook API and Zapier for others.",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Demo Booking Modal */}
      <DemoBookingModal isOpen={demoModalOpen} onClose={() => setDemoModalOpen(false)} />

      {/* Background - optimized for mobile performance */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[600px] h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] bg-emerald-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[128px]" />
        <div className="absolute top-1/3 right-1/4 w-[150px] sm:w-[250px] md:w-[350px] lg:w-[500px] h-[150px] sm:h-[250px] md:h-[350px] lg:h-[500px] bg-cyan-500/10 rounded-full blur-[60px] sm:blur-[80px] md:blur-[100px] lg:blur-[128px]" />
      </div>

      {/* Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 sm:bg-black/20 border-b border-white/5"
        initial={mounted ? { y: -100 } : { y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {[
              { name: "Features", href: "/features" },
              { name: "How It Works", href: "/how-it-works" },
              { name: "Compliance", href: "/compliance" },
              { name: "Pricing", href: "/pricing" },
              { name: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA - Right */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <Link href="/dashboard" className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all text-xs sm:text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Dashboard
            </Link>
            <button onClick={() => setDemoModalOpen(true)} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition" />
              <div className="relative px-3 sm:px-5 py-2 sm:py-2.5 bg-[#0a0a0a] rounded-lg text-xs sm:text-sm font-medium">
                Book Demo
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 -mr-2 text-zinc-400 hover:text-white transition-colors rounded-lg active:bg-white/10"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          >
            <nav className="flex flex-col px-4 py-4 max-h-[calc(100dvh-80px)] overflow-y-auto">
              {[
                  { name: "Features", href: "/features" },
                  { name: "How It Works", href: "/how-it-works" },
                  { name: "Compliance", href: "/compliance" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "FAQ", href: "/faq" },
                ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3.5 text-base text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors active:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 text-emerald-400 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-base font-medium active:bg-emerald-500/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); setDemoModalOpen(true); }}
                  className="w-full text-center py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-black font-semibold text-base active:opacity-90"
                >
                  Book Demo
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-24 md:pt-32 pb-8 sm:pb-12 md:pb-20 overflow-hidden">
        <Meteors number={24} className="z-0" />
        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* TCPA Trust Bar — redesigned */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 sm:mb-7 md:mb-9 inline-flex"
          >
            <div className="group relative flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(16,185,129,0.4)]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20">
                <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="relative text-xs sm:text-sm font-semibold tracking-wide text-emerald-300">
                <span className="text-emerald-400">$0</span>
                <span className="text-zinc-400 font-normal ml-1.5">TCPA violations since launch</span>
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 px-2"
            initial={mounted ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block leading-tight text-white/90">
              The agent who picks up
            </span>
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-1 sm:mt-2 leading-tight">
              first wins.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2 sm:px-4"
            initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            AgentSixx picks up every lead in 5 seconds. SMS, email, live voice.
            Books appointments while you&apos;re at a showing. While you&apos;re asleep.
            Bring your own leads, or let us source them, direct seller data in your zip codes, skip-traced and ready to call.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4"
            initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button onClick={() => setDemoModalOpen(true)} className="w-full sm:w-auto relative group min-h-[48px]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-60 group-hover:opacity-100 group-active:opacity-100 transition" />
              <div className="relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-black font-semibold text-base sm:text-lg">
                Book a Demo
              </div>
            </button>
            <Link href="/features" className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 active:bg-zinc-800/50 transition-colors text-base sm:text-lg font-medium text-center min-h-[48px] flex items-center justify-center">
              See How It Works
            </Link>
          </motion.div>

          {/* Demo Player. 60-second recorded call */}
          <div className="mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
            <DemoPlayer onFallbackClick={() => setDemoModalOpen(true)} />
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:flex-wrap md:items-center md:justify-center md:gap-10 lg:gap-12 pt-6 sm:pt-8 border-t border-white/5 max-w-lg sm:max-w-none mx-auto"
            initial={mounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-2 sm:p-0">
                <div className={`text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold ${stat.color === "emerald" ? "text-emerald-400" : "text-white"}`}>
                  {stat.value}
                </div>
                <div className="text-zinc-500 text-xs sm:text-sm mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - hidden on mobile */}
        <motion.div
          className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem / Solution */}
      <Section className="bg-zinc-900/50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start lg:items-center px-4 sm:px-6">
          <FadeIn direction="left">
            <span className="text-red-400 uppercase tracking-wider text-xs sm:text-sm font-medium">The Problem</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 mb-4 sm:mb-6 leading-tight">
              You paid $87 for that lead. It&apos;s already signed with someone else.
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {[
                "Zillow lead hits at 2:47pm, you're at an open house",
                "You call back at 6:30pm, almost 4 hours late",
                "They already booked a showing with the next agent",
                "Repeat 2-3x a week. That's a $40K/year leak.",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 text-sm sm:text-base flex-shrink-0">✕</span>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <span className="text-emerald-400 uppercase tracking-wider text-xs sm:text-sm font-medium">The Fix</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 mb-4 sm:mb-6 leading-tight">
              AgentSixx answers in <span className="text-emerald-400">5 seconds</span>. You wake up to a booked calendar.
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {[
                "SMS + email hit the lead in under 5 seconds",
                "Voice follow-up qualifies budget, timeline, and area",
                "Showing lands on your calendar, confirmed, not pending",
                "You get pinged: \"New showing Saturday 10am. Scottsdale\"",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm font-medium">How It Works</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">From lead to appointment in 3 steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 lg:gap-8">
            {[
              {
                step: "01",
                title: "Lead Comes In",
                description: "Zillow, Realtor.com, Facebook, your website, any source. Lead data flows into AgentSixx instantly.",
              },
              {
                step: "02",
                title: "System Engages in 5s",
                description: "Compliance check runs. If clear, System sends personalized SMS + email. If phone-ready, Automated calls.",
              },
              {
                step: "03",
                title: "Appointment Booked",
                description: "System qualifies the lead, handles objections, and books directly to your calendar. You get notified.",
              },
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.1}>
                <div className={`relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 h-full ${i === 2 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none' : ''}`}>
                  <div className="absolute -top-3 left-5 sm:left-6 lg:left-8 px-3 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-black text-xs sm:text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-4 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features" className="bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-emerald-400 uppercase tracking-wider text-xs sm:text-sm font-medium">Features</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">Three things. Done excellently.</h2>
            <p className="text-zinc-400 mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base px-2">We cut from 28 features to 3. Each one ships well, has clear ROI, and is battle-tested.</p>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {features.map((feature, i) => {
              const glowMap: Record<string, string> = {
                emerald: "rgba(16, 185, 129, 0.28)",
                cyan: "rgba(6, 182, 212, 0.28)",
                amber: "rgba(245, 158, 11, 0.28)",
                blue: "rgba(59, 130, 246, 0.28)",
              };
              const iconBg: Record<string, string> = {
                emerald: "bg-emerald-500/10 text-emerald-400",
                cyan: "bg-cyan-500/10 text-cyan-400",
                amber: "bg-amber-500/10 text-amber-400",
                blue: "bg-blue-500/10 text-blue-400",
              };
              return (
                <FadeIn key={feature.title} delay={i * 0.1}>
                  <TiltCard
                    rotationIntensity={6}
                    glowColor={glowMap[feature.color] || glowMap.emerald}
                    className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 active:border-emerald-500/30 transition-all"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6 lg:gap-8">
                      <div className="flex-1">
                        <div className={cn("inline-flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl mb-4", iconBg[feature.color] || iconBg.emerald)}>
                          {feature.icon}
                        </div>
                        <span className="text-zinc-500 text-xs sm:text-sm block">{feature.subtitle}</span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-1 mb-2 sm:mb-3">{feature.title}</h3>
                        <p className="text-zinc-400 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{feature.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          {feature.benefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2.5 text-sm text-zinc-300">
                              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Compliance */}
      <Section id="compliance" className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-emerald-400 uppercase tracking-wider text-xs sm:text-sm font-medium">Compliance</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">8 layers of TCPA protection</h2>
            <p className="text-zinc-400 mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base px-2">Other tools bolt on compliance as an afterthought. We built it into the foundation.</p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {complianceLayers.map((layer, i) => (
              <FadeIn key={layer.name} delay={i * 0.05}>
                <div className="p-3.5 sm:p-4 md:p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 active:border-emerald-500/30 transition-all h-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs text-emerald-400/70 truncate ml-2">{layer.status}</span>
                  </div>
                  <h4 className="text-white font-medium text-xs sm:text-sm leading-tight">{layer.name}</h4>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                <span className="text-emerald-400 font-semibold">$0 TCPA violations since launch.</span> Records retained for 4 years. Sleep well.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ROI Calculator */}
      <Section className="bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm font-medium">ROI</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">The math is simple</h2>
          </div>

          <FadeIn>
            <div className="p-5 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-300 mb-4">Your Investment (Pro)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-zinc-400 text-sm sm:text-base gap-4">
                      <span>Monthly subscription</span>
                      <span className="text-white font-medium">$1,297</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 md:pt-0 border-t border-zinc-800 md:border-t-0">
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-300 mb-4">Your Return</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-zinc-400 text-sm sm:text-base gap-4">
                      <span>Incremental deals/month</span>
                      <span className="text-emerald-400 font-medium">2-3</span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-400 text-sm sm:text-base gap-4">
                      <span>Avg commission</span>
                      <span className="text-emerald-400 font-medium">$8,000</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-zinc-800 pt-3 mt-3 gap-4">
                      <span className="text-white font-medium text-sm sm:text-base">Monthly ROI</span>
                      <span className="text-emerald-400 font-bold text-xl sm:text-2xl">13-20x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Testimonials - Enhanced */}
      <TestimonialsSection onDemoClick={() => setDemoModalOpen(true)} />

      {/* Guarantee */}
      <Section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 text-center relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/20 mb-5 sm:mb-6">
                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">90-Day ROI Guarantee</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-300 mb-4 sm:mb-5 max-w-2xl mx-auto leading-relaxed px-2">
                If we don&apos;t deliver at least <span className="text-emerald-400 font-semibold">8 qualified appointments</span> in your first 90 days, we refund your setup fee in full.
              </p>

              {/* Guarantee Terms, keep it simple */}
              <div className="bg-zinc-900/50 rounded-xl p-4 sm:p-5 mb-5 sm:mb-6 max-w-xl mx-auto border border-zinc-800/50">
                <p className="text-xs sm:text-sm text-zinc-400 mb-3">
                  <span className="text-emerald-400 font-medium">Guarantee Terms:</span> 90-day clock starts the day onboarding is complete and your first call goes out.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Real leads in your market</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Connected to your lead sources</span>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-3">
                  Lead quality audited during onboarding. We&apos;ll help you source quality leads if needed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm text-zinc-400">
                <span>Setup Fee Protected</span>
                <span className="hidden sm:inline text-zinc-600">|</span>
                <span>Quality Audit Included</span>
                <span className="hidden sm:inline text-zinc-600">|</span>
                <span>No Surprises</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-zinc-900/30 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-emerald-400 uppercase tracking-wider text-xs sm:text-sm font-medium">FAQ</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 leading-tight">Common questions</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left gap-4 min-h-[60px]"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base leading-snug">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${expandedFaq === i ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <Link href="/faq" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 active:text-emerald-300 font-medium text-sm sm:text-base py-2">
              View all FAQs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Book a 15-min demo. Close your next deal with it.
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Live walkthrough on a Zoom call, we plug it into your lead sources on screen and show you the first call happening in real time. 90-day guarantee: 8 booked appointments or your setup fee back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-black font-semibold text-base sm:text-lg hover:opacity-90 active:opacity-90 transition-opacity min-h-[48px]"
              >
                Book Your Demo
              </button>
              <button
                onClick={() => setDemoModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border border-zinc-700 text-white font-medium text-base sm:text-lg hover:bg-zinc-900 active:bg-zinc-800 transition-colors text-center min-h-[48px]"
              >
                Talk to Founder
              </button>
            </div>
            <p className="text-zinc-600 text-xs sm:text-sm mt-5 sm:mt-6">
              90-day guarantee · No long-term contract · Cancel anytime
            </p>
          </FadeIn>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
