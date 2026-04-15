"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Shield, ArrowRight, Star, BadgeCheck, Sparkles, Calculator, TrendingUp, DollarSign, Menu, X } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";

const plans = [
  {
    name: "Starter",
    tagline: "Perfect for solo agents",
    price: 597,
    setup: 1497,
    description: "For agents doing 15-25 deals/year who need reliable lead follow-up",
    features: [
      { name: "Leads", value: "500/mo", included: true },
      { name: "Voice Minutes", value: "500/mo", included: true },
      { name: "SMS Included", value: "5,000/mo", included: true },
      { name: "Email", value: "Unlimited", included: true },
      { name: "Compliance Stack", value: "8-layer", included: true },
      { name: "CRM Integration", value: "1", included: true },
      { name: "Support", value: "Email", included: true },
      { name: "Slack War Room", value: "", included: false },
      { name: "Custom Voice Training", value: "", included: false },
    ],
    popular: false,
    color: "zinc",
  },
  {
    name: "Pro",
    tagline: "Most popular choice",
    price: 1297,
    setup: 2497,
    description: "For mid-producers doing 25-50 deals/year who want maximum ROI",
    features: [
      { name: "Leads", value: "1,000/mo", included: true },
      { name: "Voice Minutes", value: "2,000/mo", included: true },
      { name: "SMS Included", value: "10,000/mo", included: true },
      { name: "Email", value: "Unlimited", included: true },
      { name: "Compliance Stack", value: "8-layer", included: true },
      { name: "CRM Integrations", value: "Unlimited", included: true },
      { name: "Support", value: "Slack 15min SLA", included: true },
      { name: "Slack War Room", value: "Included", included: true },
      { name: "Custom Voice Training", value: "", included: false },
    ],
    popular: true,
    color: "emerald",
  },
  {
    name: "Growth",
    tagline: "For teams & top producers",
    price: 2497,
    setup: 4997,
    description: "For top producers & teams doing 50+ deals/year at scale",
    features: [
      { name: "Leads", value: "2,500/mo", included: true },
      { name: "Voice Minutes", value: "5,000/mo", included: true },
      { name: "SMS Included", value: "25,000/mo", included: true },
      { name: "Email", value: "Unlimited", included: true },
      { name: "Compliance Stack", value: "8-layer", included: true },
      { name: "CRM Integrations", value: "Unlimited", included: true },
      { name: "Support", value: "Direct Line", included: true },
      { name: "Slack War Room", value: "Priority", included: true },
      { name: "Custom Voice Training", value: "Included", included: true },
    ],
    popular: false,
    color: "violet",
  },
];

const comparisonItems = [
  { feature: "Monthly Cost", isa: "$2,500-4,000", agentSix: "From $597", winner: "agentSix" },
  { feature: "Response Time", isa: "15-60 minutes", agentSix: "Under 5 seconds", winner: "agentSix" },
  { feature: "Availability", isa: "9-5, weekdays", agentSix: "24/7/365", winner: "agentSix" },
  { feature: "Sick Days", isa: "Yes", agentSix: "Never", winner: "agentSix" },
  { feature: "Training Time", isa: "2-4 weeks", agentSix: "7-10 days", winner: "agentSix" },
  { feature: "Compliance", isa: "Your liability", agentSix: "8-layer protection", winner: "agentSix" },
  { feature: "Consistency", isa: "Variable", agentSix: "100% consistent", winner: "agentSix" },
  { feature: "Scale", isa: "Limited", agentSix: "Up to 2,500 leads/mo", winner: "agentSix" },
];

const testimonials = [
  { name: "Sarah M.", role: "Team Lead, KW Phoenix", quote: "Replaced our $3,500/mo ISA. Better results.", rating: 5 },
  { name: "Marcus J.", role: "Broker, Century 21", quote: "The compliance alone is worth it.", rating: 5 },
  { name: "Jennifer C.", role: "Solo Agent, RE/MAX", quote: "13x ROI in my first quarter.", rating: 5 },
];

const faqs = [
  {
    q: "What happens if I exceed my limits?",
    a: "We alert you at 80% usage. Voice overage: $0.15/min. SMS overage: $0.03/msg. Lead overage: $0.25/lead. No service interruption. You can set hard caps if preferred.",
  },
  {
    q: "Is there a long-term contract?",
    a: "90-day initial commitment to ensure proper setup and optimization, then month-to-month. Cancel anytime with 30 days notice.",
  },
  {
    q: "What's included in the setup fee?",
    a: "A2P registration, CRM integration, Voice ISA training on your scripts, compliance configuration, lead source connections, and hands-on onboarding. Most agents are live within 7-10 days.",
  },
  {
    q: "Do unused minutes roll over?",
    a: "Yes! Unused Voice minutes and SMS roll over for up to 60 days. Unused leads do not roll over.",
  },
  {
    q: "Can I upgrade or downgrade later?",
    a: "Absolutely. Upgrade anytime and we'll prorate the difference. Downgrade at the end of any billing cycle.",
  },
];

export default function PricingPage() {
  const [, setHoveredPlan] = useState<string | null>(null);
  const [dealsPerYear, setDealsPerYear] = useState(20);
  const [avgCommission, setAvgCommission] = useState(8000);
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ROI Calculations
  const planCosts: Record<string, { monthly: number; setup: number }> = {
    Starter: { monthly: 597, setup: 1497 },
    Pro: { monthly: 1297, setup: 2497 },
    Growth: { monthly: 2497, setup: 4997 },
  };

  const selectedCost = planCosts[selectedPlan];
  const yearOneCost = selectedCost.monthly * 12 + selectedCost.setup;
  const dealsToBreakEven = Math.ceil(yearOneCost / avgCommission);
  const extraDealsNeeded = Math.max(0, dealsToBreakEven);

  // Conservative estimate: 15% increase in deals with an autonomous ISA
  const projectedExtraDeals = Math.round(dealsPerYear * 0.15);
  const projectedExtraRevenue = projectedExtraDeals * avgCommission;
  const netYearOne = projectedExtraRevenue - yearOneCost;
  const projectedROI = ((projectedExtraRevenue - yearOneCost) / yearOneCost * 100).toFixed(0);
  const costPerDeal = (yearOneCost / dealsPerYear).toFixed(0);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects - Responsive */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-violet-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] bg-cyan-500/5 rounded-full blur-[100px] sm:blur-[120px] md:blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <span className="text-emerald-400 font-medium">Pricing</span>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Dashboard
            </Link>
            <Link href="/dashboard" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
              Book Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Compliance</Link>
              <span className="text-emerald-400 font-medium py-2">Pricing</span>
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

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            90-Day ROI Guarantee
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            The math{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              makes sense
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-2"
          >
            See exactly why 500+ agents switched from human Inside Sales Agents (ISAs) to AgentSixx.
            The numbers speak for themselves.
          </motion.p>
        </div>
      </section>

      {/* SECTION 1: Comparison Table - Show VALUE first */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8 sm:mb-12"
          >
            <span className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm font-medium">Why Switch?</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 sm:mt-3">AgentSixx vs. Human ISA</h2>
            <p className="text-zinc-400 mt-2 sm:mt-3 text-sm sm:text-base">See why the switch is a no-brainer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900/50 backdrop-blur-sm"
          >
            {/* Scrollable wrapper for mobile */}
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                {/* Table header */}
                <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="p-3 sm:p-5 text-xs sm:text-sm font-medium text-zinc-500"></div>
                  <div className="p-3 sm:p-5 text-center border-l border-zinc-800">
                    <span className="text-zinc-400 font-medium text-xs sm:text-sm">Human ISA</span>
                  </div>
                  <div className="p-3 sm:p-5 text-center border-l border-zinc-800 bg-emerald-500/5">
                    <span className="text-emerald-400 font-bold text-xs sm:text-sm">AgentSixx</span>
                  </div>
                </div>

                {/* Table rows */}
                {comparisonItems.map((item, i) => (
                  <div key={item.feature} className={`grid grid-cols-3 ${i !== comparisonItems.length - 1 ? "border-b border-zinc-800/50" : ""}`}>
                    <div className="p-3 sm:p-5 text-xs sm:text-sm text-white font-medium">{item.feature}</div>
                    <div className="p-3 sm:p-5 text-center text-xs sm:text-sm text-zinc-500 border-l border-zinc-800/50">{item.isa}</div>
                    <div className="p-3 sm:p-5 text-center text-xs sm:text-sm text-emerald-400 font-medium border-l border-zinc-800/50 bg-emerald-500/5">
                      {item.agentSix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile scroll hint */}
            <div className="sm:hidden text-center py-2 text-xs text-zinc-500 border-t border-zinc-800/50">
              Swipe to see more
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ROI Calculator - Show the MATH */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl opacity-50" />

            <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">ROI Calculator</h2>
                  <p className="text-zinc-400 text-xs sm:text-sm">See exactly what AgentSixx costs per deal</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Inputs */}
                <div className="space-y-5 sm:space-y-6">
                  {/* Deals per year */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs sm:text-sm text-zinc-400">Deals per year</label>
                      <span className="text-base sm:text-lg font-bold text-white">{dealsPerYear} deals</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={dealsPerYear}
                      onChange={(e) => setDealsPerYear(Number(e.target.value))}
                      className="w-full h-3 sm:h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-emerald-500 [&::-webkit-slider-thumb]:to-cyan-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg sm:[&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-5"
                    />
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                      <span>5</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Average commission */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-xs sm:text-sm text-zinc-400">Avg commission per deal</label>
                      <span className="text-base sm:text-lg font-bold text-white">${avgCommission.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="3000"
                      max="25000"
                      step="500"
                      value={avgCommission}
                      onChange={(e) => setAvgCommission(Number(e.target.value))}
                      className="w-full h-3 sm:h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-emerald-500 [&::-webkit-slider-thumb]:to-cyan-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg sm:[&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:h-5"
                    />
                    <div className="flex justify-between text-xs text-zinc-600 mt-1">
                      <span>$3K</span>
                      <span>$15K</span>
                      <span>$25K</span>
                    </div>
                  </div>

                  {/* Plan selector */}
                  <div>
                    <label className="text-xs sm:text-sm text-zinc-400 mb-2 sm:mb-3 block">Select plan</label>
                    <div className="flex gap-2">
                      {["Starter", "Pro", "Growth"].map((plan) => (
                        <button
                          key={plan}
                          onClick={() => setSelectedPlan(plan)}
                          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                            selectedPlan === plan
                              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black"
                              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                          }`}
                        >
                          {plan}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Main stat - Net profit reacts to ALL three sliders */}
                  <div className="bg-zinc-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-zinc-700/50">
                    <div className="text-xs sm:text-sm text-zinc-400 mb-1">Net profit (Year 1)</div>
                    <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${netYearOne >= 0 ? "from-emerald-400 to-cyan-400" : "from-red-400 to-amber-400"} bg-clip-text text-transparent`}>
                      {netYearOne >= 0 ? "+" : "-"}${Math.abs(netYearOne).toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                      {projectedExtraDeals} extra deals × ${avgCommission.toLocaleString()} − ${yearOneCost.toLocaleString()} cost
                    </div>
                  </div>

                  {/* Cost per deal + Break even */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-zinc-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-zinc-700/50">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 text-xs sm:text-sm mb-1">
                        <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                        Cost per deal
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">${costPerDeal}</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">vs ${((2500 * 12) / dealsPerYear).toFixed(0)} with a human ISA</div>
                    </div>

                    <div className="bg-zinc-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-zinc-700/50">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-400 text-xs sm:text-sm mb-1">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        Break even
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white">{extraDealsNeeded} deals</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Year 1 cost ${yearOneCost.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Projected ROI */}
                  <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-emerald-500/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                      <div>
                        <div className="text-xs sm:text-sm text-emerald-400 mb-1">If you close just {projectedExtraDeals} more deals...</div>
                        <div className="text-2xl sm:text-3xl font-bold text-white">
                          +${projectedExtraRevenue.toLocaleString()} <span className="text-sm sm:text-lg text-zinc-400">revenue</span>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <div className="text-xs sm:text-sm text-zinc-400">ROI</div>
                        <div className={`text-xl sm:text-2xl font-bold ${Number(projectedROI) > 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {Number(projectedROI) > 0 ? "+" : ""}{projectedROI}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-800 text-center text-xs sm:text-sm text-zinc-500">
                Based on conservative 15% increase in deal volume. Most agents using autonomous outreach see 20-30% improvement in lead conversion.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Social Proof - Build TRUST */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-10"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white">What agents are saying</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="flex gap-1 mb-2 sm:mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm mb-3 sm:mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-[10px] sm:text-xs font-bold text-black">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">{t.name}</p>
                    <p className="text-[10px] sm:text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Guarantee - Reduce RISK */}
      <section className="py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-emerald-500/20 text-center relative overflow-hidden"
          >
            {/* Shield icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 mb-4 sm:mb-6">
              <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">90-Day ROI Guarantee</h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 mb-4 sm:mb-6 max-w-xl mx-auto">
              If we don&apos;t deliver at least <span className="text-emerald-400 font-semibold">8 qualified appointments</span> in your first 90 days, we refund your setup fee in full. No questions asked.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center justify-center gap-2">
                <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Zero risk</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Month-to-month after 90 days</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <BadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Pricing Cards - Show PRICE last */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Choose your plan</h2>
            <p className="text-zinc-400 mt-2 sm:mt-3 text-sm sm:text-base">All plans include our 8-layer compliance stack</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative group ${plan.popular ? 'sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto lg:max-w-none' : ''}`}
              >
                {/* Animated border for popular plan */}
                {plan.popular && (
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-2xl sm:rounded-3xl opacity-100 blur-sm group-hover:blur-md transition-all" />
                )}

                <div className={`relative h-full p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm transition-all duration-300 ${
                  plan.popular
                    ? "bg-zinc-900 border-transparent"
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                }`}>
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                      <div className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-black text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5">
                        <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Plan header */}
                  <div className="mb-4 sm:mb-6 mt-2 sm:mt-0">
                    <p className={`text-xs sm:text-sm font-medium mb-1 ${
                      plan.popular ? "text-emerald-400" : "text-zinc-500"
                    }`}>
                      {plan.tagline}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold text-white">${plan.price}</span>
                      <span className="text-zinc-500 text-sm sm:text-base">/mo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 sm:mt-2">
                      + ${plan.setup.toLocaleString()} one-time setup
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-zinc-800">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start sm:items-center gap-2 sm:gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-zinc-700 flex-shrink-0 mt-0.5 sm:mt-0" />
                        )}
                        <span className={`text-xs sm:text-sm ${feature.included ? "text-zinc-300" : "text-zinc-600"}`}>
                          {feature.name}
                          {feature.value && feature.included && (
                            <span className="text-zinc-500"> — {feature.value}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/dashboard"
                    className={`block w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-center transition-all text-sm sm:text-base ${
                      plan.popular
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:opacity-90"
                        : "bg-zinc-800 text-white hover:bg-zinc-700"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <h4 className="text-white font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">{faq.q}</h4>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to grow?</h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 sm:mb-8 px-2">
              Join 500+ agents who&apos;ve transformed their lead follow-up with intelligent automation.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl text-black font-semibold text-base sm:text-lg hover:opacity-90 transition-opacity"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-zinc-500">
              15-minute call. See exactly how it works for your business.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
