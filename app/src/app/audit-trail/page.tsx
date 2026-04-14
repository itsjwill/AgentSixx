"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Clock, Download, Search, Filter, CheckCircle, AlertCircle, Menu, X, ArrowRight, Shield, Calendar, Database, Zap } from "lucide-react";
import { Footer } from "@/components/shared/footer";

const auditTypes = [
  { type: "Consent Record", icon: CheckCircle, color: "emerald", description: "Timestamped proof of lead consent" },
  { type: "Call Recording", icon: FileText, color: "cyan", description: "Full audio with transcription" },
  { type: "SMS Log", icon: FileText, color: "blue", description: "Complete message history" },
  { type: "DNC Check", icon: Shield, color: "violet", description: "Compliance verification" },
  { type: "Opt-Out Record", icon: AlertCircle, color: "red", description: "STOP request processing" },
  { type: "Compliance Event", icon: Calendar, color: "yellow", description: "System-level audit" },
];

const sampleLogs = [
  { time: "2:34:21 PM", type: "DNC Check", status: "Pass", details: "Federal + CA State DNC cleared", lead: "Sarah M." },
  { time: "2:34:22 PM", type: "Consent Verify", status: "Pass", details: "Web form consent 3/15/26", lead: "Sarah M." },
  { time: "2:34:23 PM", type: "Quiet Hours", status: "Pass", details: "2:34 PM PT within 8am-9pm", lead: "Sarah M." },
  { time: "2:34:24 PM", type: "Litigator Check", status: "Pass", details: "Not in TCPA litigator DB", lead: "Sarah M." },
  { time: "2:34:25 PM", type: "Call Initiated", status: "Active", details: "Outbound voice call started", lead: "Sarah M." },
  { time: "2:35:47 PM", type: "Call Complete", status: "Success", details: "Duration: 1:22, Outcome: Qualified", lead: "Sarah M." },
];

const retentionPolicies = [
  { data: "Consent Records", retention: "4 years", reason: "TCPA statute of limitations" },
  { data: "Call Recordings", retention: "4 years", reason: "Litigation defense" },
  { data: "SMS/Email Logs", retention: "4 years", reason: "Complete audit trail" },
  { data: "DNC Check Logs", retention: "4 years", reason: "Compliance proof" },
  { data: "Opt-Out Records", retention: "Permanent", reason: "Never contact again" },
];

export default function AuditTrailPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-violet-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <FileText className="w-4 h-4" />
            4-Year Retention
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Complete{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">audit trail</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Every call, text, email, and compliance check is logged and retained for 4 years. Your defense in case of litigation.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">4 Years</span>
              <p className="text-xs text-zinc-400">Data Retention</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">100%</span>
              <p className="text-xs text-zinc-400">Events Logged</p>
            </div>
            <div className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-2xl font-bold text-emerald-400">1-Click</span>
              <p className="text-xs text-zinc-400">Export</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audit Types */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">What We Track</h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">Every interaction is logged with timestamps, outcomes, and compliance verification.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {auditTypes.map((audit, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-${audit.color}-500/10 flex items-center justify-center mb-3`}>
                  <audit.icon className={`w-5 h-5 text-${audit.color}-400`} />
                </div>
                <h3 className="font-semibold text-white mb-1">{audit.type}</h3>
                <p className="text-xs text-zinc-400">{audit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Log Example */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Real-Time Audit Log</h2>
          <p className="text-zinc-400 text-center mb-8">Every compliance check is visible in your dashboard. Here&apos;s what a typical outbound call looks like:</p>

          <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            {/* Log Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="pl-9 pr-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white placeholder:text-zinc-500 w-48 sm:w-64 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-zinc-400 hover:text-white">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            {/* Log Entries */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {sampleLogs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-xs text-zinc-500 font-mono w-20 flex-shrink-0">{log.time}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${
                    log.status === "Pass" ? "bg-emerald-500/10 text-emerald-400" :
                    log.status === "Active" ? "bg-cyan-500/10 text-cyan-400" :
                    "bg-violet-500/10 text-violet-400"
                  }`}>
                    {log.status}
                  </span>
                  <span className="text-sm text-white font-medium flex-shrink-0 w-28 sm:w-32 truncate">{log.type}</span>
                  <span className="text-xs text-zinc-400 flex-1 truncate hidden sm:block">{log.details}</span>
                  <span className="text-xs text-zinc-500 flex-shrink-0">{log.lead}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <p className="text-xs text-zinc-500">Showing 6 of 2,847 events</p>
              <button className="text-xs text-emerald-400 hover:text-emerald-300">View all in dashboard →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Retention Policy */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Data Retention Policy</h2>
          <p className="text-zinc-400 text-center mb-8">We retain your data for 4 years to match the TCPA statute of limitations.</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Data Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Retention</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-400">Reason</th>
                </tr>
              </thead>
              <tbody>
                {retentionPolicies.map((policy, i) => (
                  <tr key={i} className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 text-sm text-white font-medium">{policy.data}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        policy.retention === "Permanent" ? "bg-violet-500/10 text-violet-400" : "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {policy.retention}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-zinc-400">{policy.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-300">
              <span className="text-emerald-400 font-medium">Your data is your data:</span> Export your complete audit trail anytime in CSV, JSON, or PDF format. We make it easy to provide documentation if you ever need it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20">
            <Clock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">4 years of protection</h2>
            <p className="text-zinc-400 mb-6">Every call, text, and email logged and retained. Your defense if anyone ever questions your compliance.</p>
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
