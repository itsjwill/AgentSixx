"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Phone, Zap, Shield, MessageSquare, Calendar, Bell,
  ArrowRight, Play, Pause, Check, Star, ChevronRight,
  Mic, Volume2, Clock, Users, TrendingUp, Lock,
  Sparkles, Globe, Database, Headphones
} from "lucide-react";
import { Footer } from "@/components/shared/footer";

// Color class mappings for Tailwind JIT
const colorClasses: Record<string, { text: string; border: string; bg: string }> = {
  emerald: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  cyan: { text: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10" },
  violet: { text: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
};

// Animated counter component
function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${value}-${suffix}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value, suffix, duration, hasAnimated]);

  return (
    <span id={`counter-${value}-${suffix}`}>
      {count}{suffix}
    </span>
  );
}

// Audio waveform animation
function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-8">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-full"
          animate={isPlaying ? {
            height: [8, 24, 12, 28, 8, 20, 16, 32, 8],
          } : { height: 8 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Typing animation for demo
function TypingText({ text, isVisible }: { text: string; isVisible: boolean }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setDisplayText("");
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [text, isVisible]);

  return <>{displayText}<span className="animate-pulse">|</span></>;
}

const features = [
  {
    id: "voice",
    title: "Intelligent Voice Agent",
    tagline: "Your 24/7 ISA That Never Sleeps",
    description: "An intelligent system that handles inbound and outbound calls — qualifying leads, booking appointments, and transferring hot prospects to you live.",
    icon: Phone,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-400",
    bgGlow: "bg-emerald-500/20",
    stats: [
      { value: 24, suffix: "/7", label: "Availability" },
      { value: 68, suffix: "%", label: "Connect Rate" },
      { value: 6, suffix: "", label: "Call Sequence" },
    ],
    capabilities: [
      { icon: Phone, title: "Inbound Handling", desc: "Answers every call instantly, no hold music or voicemail black holes" },
      { icon: Mic, title: "Natural Voice", desc: "Powered by Claude AI — sounds human, handles interruptions naturally" },
      { icon: Calendar, title: "Direct Booking", desc: "Books appointments directly to your calendar with real-time availability" },
      { icon: Zap, title: "Live Transfers", desc: "Hot lead ready to talk? Transfers to your phone in real-time" },
      { icon: Volume2, title: "Smart Voicemail", desc: "6 rotating voicemail scripts — never leaves the same message twice" },
      { icon: Clock, title: "Optimal Timing", desc: "Calls at the best times based on timezone and response patterns" },
    ],
    demo: {
      type: "call",
      lines: [
        { speaker: "Agent", text: "Hi, this is Sarah from ABC Realty. I saw you were looking at homes in the Westside area. Do you have a minute?" },
        { speaker: "Lead", text: "Yeah, sure. We're thinking about moving in the next few months." },
        { speaker: "Agent", text: "That's exciting! Are you looking to buy, or are you exploring your options?" },
        { speaker: "Lead", text: "Definitely buying. We've been pre-approved already." },
        { speaker: "Agent", text: "Perfect. I'd love to connect you with one of our agents who specializes in Westside. Would tomorrow at 2pm work for a quick call?" },
      ],
    },
    testimonial: {
      quote: "Replaced my $3,500/mo ISA. The system booked 23 appointments in the first month.",
      author: "Sarah M.",
      role: "Keller Williams Phoenix",
      rating: 5,
    },
  },
  {
    id: "response",
    title: "Instant Lead Response",
    tagline: "5 Seconds, Not 5 Hours",
    description: "The moment a lead hits your inbox — Zillow, Facebook, or your website — Instantly responds before they even think about calling another agent.",
    icon: Zap,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-400",
    bgGlow: "bg-cyan-500/20",
    stats: [
      { value: 5, suffix: "s", label: "Response Time" },
      { value: 78, suffix: "%", label: "Reply Boost" },
      { value: 3, suffix: "x", label: "More Convos" },
    ],
    capabilities: [
      { icon: MessageSquare, title: "Multi-Channel", desc: "SMS + Email combo hits leads where they're most likely to respond" },
      { icon: Globe, title: "Source-Aware", desc: "Different responses for Zillow vs Facebook vs website — context matters" },
      { icon: Database, title: "Conversation Memory", desc: "System remembers the full history — no starting over when you jump in" },
      { icon: Bell, title: "Hot Lead Alerts", desc: "High-intent signals? You get Slack + SMS notification immediately" },
      { icon: Users, title: "Seamless Handoff", desc: "One click to take over — lead never knows they were talking to a system" },
      { icon: TrendingUp, title: "Smart Follow-Up", desc: "Follows up at optimal intervals — never annoying, always timely" },
    ],
    demo: {
      type: "chat",
      messages: [
        { sender: "lead", text: "I'm interested in 123 Oak Street", time: "2:34:00 PM" },
        { sender: "ai", text: "Hi! Thanks for your interest in 123 Oak Street — it's a great property! Are you looking to schedule a showing?", time: "2:34:05 PM" },
        { sender: "lead", text: "What's the HOA fee?", time: "2:35:12 PM" },
        { sender: "ai", text: "The HOA is $245/month and covers landscaping, pool, and gym. Would you like to see it Saturday at 10am or 2pm?", time: "2:35:14 PM" },
      ],
    },
    testimonial: {
      quote: "Went from 15-minute response times to under 5 seconds. Game changer.",
      author: "Marcus J.",
      role: "Century 21",
      rating: 5,
    },
  },
  {
    id: "compliance",
    title: "8-Layer Compliance Shield",
    tagline: "Your $500K Lawsuit Protection",
    description: "Every message runs through 8 compliance layers. TCPA, DNC, state regulations — we handle it all so you never get that scary legal letter.",
    icon: Shield,
    color: "violet",
    gradient: "from-violet-500 to-purple-400",
    bgGlow: "bg-violet-500/20",
    stats: [
      { value: 0, suffix: "", label: "Violations" },
      { value: 8, suffix: "", label: "Protection Layers" },
      { value: 2, suffix: "M", label: "E&O Coverage" },
    ],
    capabilities: [
      { icon: Check, title: "A2P 10DLC", desc: "Carrier-approved messaging — no spam filters, full deliverability" },
      { icon: Lock, title: "Federal DNC", desc: "Real-time check against national Do Not Call registry, updated daily" },
      { icon: Globe, title: "50-State DNC", desc: "Every state has different rules — we check them all automatically" },
      { icon: Shield, title: "Litigator Block", desc: "3,400+ known serial lawsuit filers blocked from your system" },
      { icon: Clock, title: "Quiet Hours", desc: "No contact before 8am or after 9pm in the lead's local timezone" },
      { icon: Database, title: "Consent Tracking", desc: "Timestamped proof of every opt-in — STOP/HELP handled instantly" },
    ],
    layers: [
      { name: "A2P 10DLC Registration", status: "Included", icon: "01" },
      { name: "Federal DNC Scrubbing", status: "Auto-updated", icon: "02" },
      { name: "50-State DNC Lists", status: "All covered", icon: "03" },
      { name: "TCPA Litigator Block", status: "3,400+ blocked", icon: "04" },
      { name: "Quiet Hours Enforcement", status: "Per timezone", icon: "05" },
      { name: "Consent Tracking", status: "Timestamped", icon: "06" },
      { name: "Recording Disclosure", status: "11 states", icon: "07" },
      { name: "E&O Insurance", status: "$2M coverage", icon: "08" },
    ],
    testimonial: {
      quote: "Peace of mind knowing I'm 100% compliant. Worth every penny.",
      author: "Jennifer K.",
      role: "Coldwell Banker",
      rating: 5,
    },
  },
];

const integrations = [
  { name: "Zillow", letter: "Z", category: "Lead Source", gradient: "from-blue-500 to-blue-600" },
  { name: "Realtor.com", letter: "R", category: "Lead Source", gradient: "from-red-500 to-red-600" },
  { name: "Facebook Ads", letter: "f", category: "Lead Source", gradient: "from-blue-600 to-indigo-600" },
  { name: "Google Ads", letter: "G", category: "Lead Source", gradient: "from-red-500 via-yellow-500 to-green-500" },
  { name: "Website Forms", letter: "W", category: "Lead Source", gradient: "from-emerald-500 to-teal-500" },
  { name: "Your CRM", letter: "CRM", category: "Syncs With", gradient: "from-violet-500 to-purple-500" },
  { name: "Google Calendar", letter: "G", category: "Calendar", gradient: "from-blue-500 to-cyan-500" },
  { name: "Calendly", letter: "C", category: "Calendar", gradient: "from-blue-400 to-blue-600" },
  { name: "Slack", letter: "S", category: "Alerts", gradient: "from-pink-500 via-purple-500 to-cyan-500" },
  { name: "SMS Alerts", letter: "SMS", category: "Alerts", gradient: "from-emerald-500 to-green-500" },
  { name: "Email", letter: "@", category: "Alerts", gradient: "from-amber-500 to-orange-500" },
  { name: "Webhooks", letter: "API", category: "Custom", gradient: "from-zinc-400 to-zinc-600" },
];

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  // Auto-advance demo
  useEffect(() => {
    if (!isPlaying) return;
    const feature = features[activeFeature];
    const lines = feature.demo?.lines || feature.demo?.messages || [];

    const timer = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= lines.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, activeFeature]);

  // Reset demo when switching features
  useEffect(() => {
    setIsPlaying(false);
    setCurrentLine(0);
  }, [activeFeature]);

  return (
    <main className="relative bg-[#09090b] text-white min-h-screen overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] bg-emerald-500/8 rounded-full blur-[100px] sm:blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] bg-cyan-500/8 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] lg:w-[700px] lg:h-[700px] bg-violet-500/8 rounded-full blur-[100px] sm:blur-[150px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:64px_64px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 backdrop-blur-2xl bg-zinc-950/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
            </div>
            <span className="text-lg sm:text-xl font-bold">AgentSixx</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link href="/features" className="text-emerald-400 font-medium">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Dashboard
            </Link>
            <Link href="/dashboard" className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-zinc-900">Book Demo</span>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col p-4 pt-6 space-y-3">
                <Link href="/features" className="text-emerald-400 font-medium py-2">Features</Link>
                <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors py-2">How It Works</Link>
                <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors py-2">Compliance</Link>
                <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors py-2">Pricing</Link>
                <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors py-2">FAQ</Link>
                <div className="flex gap-2 pt-4">
                  <Link href="/dashboard" className="flex-1 text-center py-3 text-zinc-400 rounded-xl border border-zinc-800 text-sm">Dashboard</Link>
                  <Link href="/dashboard" className="flex-1 text-center py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-zinc-900 font-semibold text-sm">Book Demo</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-white/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">Trusted by 500+ real estate agents</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6 leading-[1.1]"
          >
            Three powerful features.{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Zero headaches.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 text-center max-w-3xl mx-auto mb-12"
          >
            System that calls your leads, responds instantly, and keeps you compliant —
            all working together, 24/7, while you focus on closing deals.
          </motion.p>

          {/* Feature tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(index)}
                  className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-800/80 border-2 border-white/20 shadow-lg"
                      : "bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-2xl ${feature.bgGlow} blur-xl -z-10`}
                    />
                  )}
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient} ${isActive ? "shadow-lg" : ""}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold text-sm sm:text-base ${isActive ? "text-white" : "text-zinc-300"}`}>
                      {feature.title}
                    </div>
                    <div className={`text-xs hidden sm:block ${isActive ? colorClasses[feature.color].text : "text-zinc-500"}`}>
                      {feature.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Active Feature Detail */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeFeature}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className="py-16 sm:py-24 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            {(() => {
              const feature = features[activeFeature];
              const Icon = feature.icon;

              return (
                <>
                  {/* Feature header */}
                  <div className="text-center mb-16">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} shadow-2xl mb-6`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                      {feature.title}
                    </h2>
                    <p className={`text-lg font-medium ${colorClasses[feature.color].text} mb-2`}>
                      {feature.tagline}
                    </p>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-16">
                    {feature.stats.map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                      >
                        <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="text-zinc-500 text-sm sm:text-base mt-2">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Section Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                  >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 border border-white/10 mb-4`}>
                      <Sparkles className="w-4 h-4 text-white" />
                      <span className="text-sm text-zinc-300">Explore the capabilities</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">
                      What it <span className={`bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>actually does</span>
                    </h3>
                  </motion.div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-start">
                    {/* Capabilities - Takes 3 columns */}
                    <div className="order-2 lg:order-1 lg:col-span-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {feature.capabilities.map((cap, i) => {
                          const CapIcon = cap.icon;
                          return (
                            <motion.div
                              key={cap.title}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.08 }}
                              className="group relative"
                            >
                              {/* Card */}
                              <div className="relative p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-500 hover:bg-zinc-900/80 overflow-hidden h-full">
                                {/* Hover glow effect */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                                {/* Number badge */}
                                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-500 text-sm font-mono group-hover:bg-zinc-700/80 transition-colors">
                                  {String(i + 1).padStart(2, '0')}
                                </div>

                                {/* Icon with animated ring */}
                                <div className="relative mb-5">
                                  <div className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-md group-hover:opacity-40 transition-opacity`} />
                                  <div className={`relative inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                                    <CapIcon className="w-6 h-6 text-white" />
                                  </div>
                                </div>

                                {/* Content */}
                                <h4 className="relative text-white font-bold text-lg mb-2 group-hover:text-white transition-colors">{cap.title}</h4>
                                <p className="relative text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{cap.desc}</p>

                                {/* Bottom accent line */}
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Mini testimonial */}
                      {feature.testimonial && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800"
                        >
                          <div className="flex gap-1 mb-3">
                            {[...Array(feature.testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-zinc-300 italic mb-4">&ldquo;{feature.testimonial.quote}&rdquo;</p>
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                              <span className="text-white font-semibold text-sm">
                                {feature.testimonial.author.split(" ").map(n => n[0]).join("")}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">{feature.testimonial.author}</div>
                              <div className="text-zinc-500 text-xs">{feature.testimonial.role}</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Demo panel - Takes 2 columns */}
                    <div className="order-1 lg:order-2 lg:col-span-2 w-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative lg:sticky lg:top-32 mx-auto max-w-md sm:max-w-lg lg:max-w-none"
                      >
                        {/* Glow effect */}
                        <div className={`absolute -inset-3 sm:-inset-6 ${feature.bgGlow} rounded-[2rem] blur-2xl sm:blur-3xl opacity-50`} />

                        {/* Animated ring */}
                        <div className={`absolute -inset-[1px] bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-30`} />

                        {/* Demo card */}
                        <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800/80 overflow-hidden shadow-2xl">
                          {/* Header */}
                          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800/50 bg-zinc-900/80">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-md opacity-50`} />
                                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-xl`}>
                                  {feature.demo?.type === "call" ? (
                                    <Phone className="w-5 h-5 text-white" />
                                  ) : (
                                    <MessageSquare className="w-5 h-5 text-white" />
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="text-white font-bold text-base sm:text-lg">
                                  {feature.demo?.type === "call" ? "Live Call Demo" : "Live Chat"}
                                </div>
                                <div className="text-zinc-400 text-xs sm:text-sm flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-zinc-600"}`} />
                                  <span className="hidden sm:inline">{feature.demo?.type === "call" ? "Intelligent Agent → Lead" : "Instant response"}</span>
                                  <span className="sm:hidden">{feature.demo?.type === "call" ? "Agent → Lead" : "Instant"}</span>
                                </div>
                              </div>
                            </div>

                            {/* Play button */}
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className={`group relative p-3.5 rounded-xl bg-gradient-to-br ${feature.gradient} hover:scale-105 transition-all duration-300 shadow-lg`}
                            >
                              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity`} />
                              {isPlaying ? (
                                <Pause className="relative w-5 h-5 text-white" />
                              ) : (
                                <Play className="relative w-5 h-5 text-white" />
                              )}
                            </button>
                          </div>

                          {/* Audio waveform for call demo */}
                          {feature.demo?.type === "call" && (
                            <div className="px-5 py-3 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/50">
                              <AudioWaveform isPlaying={isPlaying} />
                              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-600"}`} />
                                {isPlaying ? "Playing..." : "Click to play"}
                              </div>
                            </div>
                          )}

                          {/* Conversation */}
                          <div className="p-4 sm:p-6 space-y-4 min-h-[280px]">
                            {/* Always show first message as preview */}
                            {feature.demo?.type === "call" && feature.demo.lines && (
                              <>
                                {/* First message always visible */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex"
                                >
                                  <div className="max-w-[85%] p-4 rounded-2xl bg-zinc-800 rounded-tl-sm">
                                    <div className="text-xs font-medium mb-1 text-emerald-400">Intelligent Agent</div>
                                    <div className="text-zinc-300">{feature.demo.lines[0].text}</div>
                                  </div>
                                </motion.div>

                                {/* Rest of conversation when playing */}
                                {(isPlaying || currentLine > 0) && feature.demo.lines.slice(1, currentLine + 1).map((line, i) => (
                                  <motion.div
                                    key={i + 1}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${line.speaker === "Lead" ? "justify-end" : ""}`}
                                  >
                                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                                      line.speaker === "Agent"
                                        ? "bg-zinc-800 rounded-tl-sm"
                                        : `bg-gradient-to-r ${feature.gradient} rounded-tr-sm`
                                    }`}>
                                      <div className={`text-xs font-medium mb-1 ${
                                        line.speaker === "Agent" ? "text-emerald-400" : "text-white/70"
                                      }`}>
                                        {line.speaker === "Agent" ? "Intelligent Agent" : "Lead"}
                                      </div>
                                      <div className={line.speaker === "Agent" ? "text-zinc-300" : "text-white"}>
                                        {i + 1 === currentLine && isPlaying ? (
                                          <TypingText text={line.text} isVisible={true} />
                                        ) : (
                                          line.text
                                        )}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}

                                {/* Click to continue hint */}
                                {!isPlaying && currentLine === 0 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center justify-center gap-2 text-zinc-500 text-sm pt-4"
                                  >
                                    <Play className="w-4 h-4" />
                                    <span>Press play to continue conversation</span>
                                  </motion.div>
                                )}
                              </>
                            )}

                            {/* Chat messages */}
                            {feature.demo?.type !== "call" && feature.demo?.messages && (
                              <>
                                {/* First message always visible */}
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex"
                                >
                                  <div className="max-w-[85%] p-4 rounded-2xl bg-zinc-800 rounded-tl-sm">
                                    <div className="text-zinc-300">{feature.demo.messages[0].text}</div>
                                    <div className="text-xs mt-2 text-zinc-600">{feature.demo.messages[0].time}</div>
                                  </div>
                                </motion.div>

                                {(isPlaying || currentLine > 0) && feature.demo.messages.slice(1, currentLine + 1).map((msg, i) => (
                                  <motion.div
                                    key={i + 1}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === "lead" ? "justify-end" : ""}`}
                                  >
                                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                                      msg.sender === "ai"
                                        ? "bg-zinc-800 rounded-tl-sm"
                                        : `bg-gradient-to-r ${feature.gradient} rounded-tr-sm`
                                    }`}>
                                      <div className={msg.sender === "ai" ? "text-zinc-300" : "text-white"}>
                                        {msg.text}
                                      </div>
                                      <div className={`text-xs mt-2 ${
                                        msg.sender === "ai" ? "text-zinc-600" : "text-white/50"
                                      }`}>
                                        {msg.time}
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}

                                {!isPlaying && currentLine === 0 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center justify-center gap-2 text-zinc-500 text-sm pt-4"
                                  >
                                    <Play className="w-4 h-4" />
                                    <span>Press play to see response</span>
                                  </motion.div>
                                )}
                              </>
                            )}

                            {/* Legacy empty state fallback */}
                            {!feature.demo?.lines && !feature.demo?.messages && (
                              <div className="text-center text-zinc-500 py-12">
                                <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>Demo coming soon</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Compliance layers grid */}
                  {feature.layers && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-16"
                    >
                      <h3 className="text-xl font-semibold text-white text-center mb-8 flex items-center justify-center gap-2">
                        <Shield className="w-5 h-5 text-violet-400" />
                        8 Layers of Protection
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {feature.layers.map((layer, i) => (
                          <motion.div
                            key={layer.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 transition-all text-center"
                          >
                            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                              {layer.icon}
                            </div>
                            <div className="text-white text-xs sm:text-sm font-medium mb-1 line-clamp-2">{layer.name}</div>
                            <div className="text-zinc-500 text-[10px] sm:text-xs">{layer.status}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              );
            })()}
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Quality Score Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Real-Time Analytics
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Know your numbers. <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Not guessing.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Track every call, every lead, every conversion. Real data so you know exactly what&apos;s working.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Call Quality Score */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">Call Quality Score</h3>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">87</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Connection Rate</span>
                    <span className="text-white font-medium">68%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Avg Call Duration</span>
                    <span className="text-white font-medium">2:34</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Conversation Quality</span>
                    <span className="text-white font-medium">92%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Voicemail Rate</span>
                    <span className="text-white font-medium">23%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[23%] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lead Quality Score */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-zinc-900/50 border border-zinc-800"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">Lead Quality Score</h3>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">73</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Valid Phone Numbers</span>
                    <span className="text-white font-medium">89%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[89%] bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Decision Makers Reached</span>
                    <span className="text-white font-medium">34%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[34%] bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Interested Leads</span>
                    <span className="text-white font-medium">23%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[23%] bg-gradient-to-r from-violet-500 to-purple-500 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Appointments Booked</span>
                    <span className="text-white font-medium">12%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-[12%] bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">2,847</div>
              <div className="text-zinc-500 text-xs sm:text-sm">Calls This Month</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">127</div>
              <div className="text-zinc-500 text-xs sm:text-sm">Hot Leads</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">34</div>
              <div className="text-zinc-500 text-xs sm:text-sm">Appointments</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-1">$48K</div>
              <div className="text-zinc-500 text-xs sm:text-sm">Pipeline Value</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Works with your stack
            </h2>
            <p className="text-zinc-400 text-lg">
              Connect to your existing tools in minutes. We handle the technical setup.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            {integrations.map((int, i) => (
              <motion.div
                key={int.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.03 * i }}
                className="group p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all text-center"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${int.gradient} flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all`}>
                  <span className="text-sm sm:text-lg font-bold text-white">
                    {int.letter}
                  </span>
                </div>
                <div className="text-white text-xs sm:text-sm font-medium truncate">{int.name}</div>
                <div className="text-zinc-500 text-[10px] sm:text-xs hidden sm:block">{int.category}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            <div className="relative p-6 sm:p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/25 mb-6"
              >
                <Headphones className="w-8 h-8 text-white" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to see it in action?
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                Book a 15-minute demo. We&apos;ll show you exactly how AgentSixx handles calls,
                responds to leads, and keeps you compliant.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-zinc-900 font-semibold hover:opacity-90 transition-all"
                >
                  Book a Demo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition-all"
                >
                  See How It Works
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
