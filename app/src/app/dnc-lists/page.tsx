"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Ban, CheckCircle, Database, Globe, RefreshCw, Menu, X, ArrowRight, AlertCircle, Zap } from "lucide-react";
import { Footer } from "@/components/shared/footer";

const dncSources = [
  { name: "Federal DNC Registry", records: "245M+", updated: "Daily", status: "active" },
  { name: "State DNC Lists (50 states)", records: "89M+", updated: "Weekly", status: "active" },
  { name: "TCPA Litigator Database", records: "3,400+", updated: "Real-time", status: "active" },
  { name: "Internal Opt-Out List", records: "Custom", updated: "Instant", status: "active" },
  { name: "Wireless Number Porting DB", records: "500M+", updated: "Daily", status: "active" },
  { name: "Reassigned Number Database", records: "200M+", updated: "Weekly", status: "active" },
];

const states = [
  { state: "California", extra: "Yes", notes: "Most restrictive" },
  { state: "Texas", extra: "Yes", notes: "Business exemptions" },
  { state: "Florida", extra: "Yes", notes: "Strict enforcement" },
  { state: "New York", extra: "Yes", notes: "Telemarketing rules" },
  { state: "Pennsylvania", extra: "Yes", notes: "Two-party consent" },
  { state: "Illinois", extra: "Yes", notes: "BIPA compliance" },
  { state: "Ohio", extra: "No", notes: "Federal only" },
  { state: "Georgia", extra: "No", notes: "Federal only" },
];

const features = [
  {
    icon: Database,
    title: "Real-Time Scrubbing",
    description: "Every phone number is checked against all DNC sources before any contact attempt. No exceptions.",
  },
  {
    icon: Globe,
    title: "50-State Coverage",
    description: "We maintain subscriptions to all state DNC lists, not just federal. Full nationwide protection.",
  },
  {
    icon: RefreshCw,
    title: "Auto-Updated Lists",
    description: "Federal list updates daily. State lists update weekly. Litigator database updates in real-time.",
  },
  {
    icon: Ban,
    title: "Instant Opt-Out",
    description: "When a lead says STOP, they're added to your internal DNC within 10 seconds. Guaranteed.",
  },
];

export default function DNCListsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Ban className="w-4 h-4" />
            Complete DNC Protection
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Federal + 50 State{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">DNC Scrubbing</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            We check every phone number against 6 different databases before any contact. Over 300M records updated daily.
          </motion.p>
        </div>
      </section>

      {/* Database Sources */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">DNC Databases We Check</h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">Every outbound contact is scrubbed against these 6 sources in real-time.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dncSources.map((source, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs text-emerald-400">{source.updated}</span>
                </div>
                <h3 className="font-semibold text-white mb-1">{source.name}</h3>
                <p className="text-2xl font-bold text-emerald-400">{source.records}</p>
                <p className="text-xs text-zinc-500">records</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How DNC Scrubbing Works</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* State Requirements */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">State-by-State Requirements</h2>
          <p className="text-zinc-400 text-center mb-8">Some states have additional DNC requirements beyond federal law.</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">State</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">State DNC</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Notes</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {states.map((s, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 text-sm text-white font-medium">{s.state}</td>
                    <td className="py-3 px-4">
                      {s.extra === "Yes" ? (
                        <span className="text-yellow-400 text-sm">Required</span>
                      ) : (
                        <span className="text-zinc-500 text-sm">Federal Only</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-zinc-400">{s.notes}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs">
                        <CheckCircle className="w-3 h-3" /> Covered
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-300">
              <span className="text-cyan-400 font-medium">All 50 states covered:</span> AgentSix maintains active subscriptions to every state DNC list in the country. You don&apos;t need to manage this yourself.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
            <Database className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">300M+ records. Zero manual work.</h2>
            <p className="text-zinc-400 mb-6">Let AgentSix handle DNC compliance so you can focus on closing deals.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pricing" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold flex items-center justify-center gap-2">
                View Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tcpa-protection" className="px-6 py-3 border border-zinc-700 rounded-lg text-white hover:border-zinc-600 transition-colors">
                TCPA Protection
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
