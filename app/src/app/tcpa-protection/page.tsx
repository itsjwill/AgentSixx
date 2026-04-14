"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, XCircle, Scale, Menu, X, ArrowRight, Phone, MessageSquare, Clock, Zap } from "lucide-react";
import { Footer } from "@/components/shared/footer";

const violations = [
  { type: "Calling without consent", fine: "$500 - $1,500", risk: "high" },
  { type: "Ignoring DNC requests", fine: "$500 - $1,500", risk: "high" },
  { type: "Calling outside quiet hours", fine: "$500 - $1,500", risk: "high" },
  { type: "No caller ID", fine: "$500 - $1,500", risk: "medium" },
  { type: "Unsolicited SMS", fine: "$500 - $1,500", risk: "high" },
  { type: "Recording without consent", fine: "$500 - $5,000", risk: "high" },
];

const protections = [
  {
    icon: Phone,
    title: "Consent Verification",
    description: "Every contact is verified against timestamped consent records before any outreach begins.",
    status: "Automatic",
  },
  {
    icon: Clock,
    title: "Quiet Hours Enforcement",
    description: "Calls and texts only go out 8am-9pm in the lead's local timezone. No exceptions.",
    status: "Per-timezone",
  },
  {
    icon: MessageSquare,
    title: "Two-Party Consent",
    description: "Auto-disclosure for 11 states requiring two-party consent for call recording.",
    status: "State-aware",
  },
  {
    icon: XCircle,
    title: "Instant Opt-Out",
    description: "STOP requests processed within 10 seconds. Lead immediately added to internal DNC.",
    status: "10-second SLA",
  },
  {
    icon: Scale,
    title: "Litigator Exclusion",
    description: "Cross-reference against 3,400+ known TCPA litigators before every contact.",
    status: "Real-time",
  },
  {
    icon: Shield,
    title: "E&O Insurance",
    description: "$2M coverage for technology errors and omissions. Your safety net.",
    status: "Included",
  },
];

const twoPartyStates = [
  "California", "Connecticut", "Florida", "Illinois", "Maryland",
  "Massachusetts", "Montana", "Nevada", "New Hampshire", "Pennsylvania", "Washington"
];

export default function TCPAProtectionPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-red-500/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-900" />
            </div>
            <span className="text-lg sm:text-xl font-bold">AgentSixx</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-emerald-400 font-medium">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">Dashboard</Link>
            <Link href="/pricing" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
              Get Protected
            </Link>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-zinc-400 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/features" className="text-zinc-400 py-2">Features</Link>
              <Link href="/how-it-works" className="text-zinc-400 py-2">How It Works</Link>
              <Link href="/compliance" className="text-emerald-400 font-medium py-2">Compliance</Link>
              <Link href="/pricing" className="text-zinc-400 py-2">Pricing</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8">
            <AlertTriangle className="w-4 h-4" />
            TCPA Violations Cost $500-$1,500 Each
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">$500K lawsuit shield</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            AgentSixx has processed 2.3M+ contacts with zero TCPA violations. Here&apos;s how we protect you.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">$0</span>
              <p className="text-xs text-zinc-400">TCPA Violations</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">2.3M+</span>
              <p className="text-xs text-zinc-400">Contacts Made</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">$2M</span>
              <p className="text-xs text-zinc-400">E&O Coverage</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Table */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">What You&apos;re Risking Without Protection</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 text-sm font-medium text-zinc-400">Violation Type</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-zinc-400">Fine Per Violation</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-zinc-400">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {violations.map((v, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-4 px-4 text-sm text-white">{v.type}</td>
                    <td className="py-4 px-4 text-sm text-red-400 font-medium">{v.fine}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.risk === "high" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                        {v.risk.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-zinc-500 text-sm mt-6">
            Class action lawsuits can multiply these fines by thousands. One lawsuit = $500K+ liability.
          </p>
        </div>
      </section>

      {/* Protections */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">How AgentSixx Protects You</h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">Every outbound contact passes through 8 compliance layers before reaching a lead.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {protections.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-5 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">{p.status}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-zinc-400">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Party States */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Two-Party Consent States</h2>
          <p className="text-zinc-400 text-center mb-8">These 11 states require disclosure when recording calls. AgentSixx handles this automatically.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {twoPartyStates.map((state, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                {state}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-300">
              <span className="text-emerald-400 font-medium">Auto-disclosure enabled:</span> When calling leads in two-party consent states, AgentSixx automatically plays the recording disclosure before the conversation begins.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
            <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stop worrying about TCPA</h2>
            <p className="text-zinc-400 mb-6">Join 1,000+ agents who sleep well knowing their outreach is fully compliant.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pricing" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold flex items-center justify-center gap-2">
                View Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/compliance" className="px-6 py-3 border border-zinc-700 rounded-lg text-white hover:border-zinc-600 transition-colors">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
