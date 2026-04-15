"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Section, SectionHeader, FadeIn } from "@/components/layout/sections";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";

const complianceLayers = [
  {
    number: "01",
    title: "A2P 10DLC Registration",
    description: "All SMS sent through carrier-approved Application-to-Person messaging. No spam filters, no blocked numbers, full deliverability.",
    details: [
      "Brand registration with carriers",
      "Campaign registration and approval",
      "Throughput optimization",
      "Carrier compliance monitoring",
    ],
    status: "Included in setup",
  },
  {
    number: "02",
    title: "Federal DNC Scrubbing",
    description: "Real-time check against the national Do Not Call registry before every single contact attempt. Updated daily.",
    details: [
      "FTC DNC list integration",
      "Real-time lookup before each call/SMS",
      "Automatic blocking of matches",
      "Daily list updates",
    ],
    status: "Auto-updated daily",
  },
  {
    number: "03",
    title: "State DNC Lists (All 50)",
    description: "Many states have stricter DNC rules than federal. We check all 50 state lists to keep you compliant everywhere.",
    details: [
      "All 50 state DNC registries",
      "State-specific rule compliance",
      "Automatic jurisdiction detection",
      "Multi-state license support",
    ],
    status: "All states covered",
  },
  {
    number: "04",
    title: "TCPA Litigator Database",
    description: "Known serial litigators blocked automatically. These are people who sue businesses for TCPA violations as a profession.",
    details: [
      "3,400+ flagged numbers",
      "Continuous database updates",
      "Pattern recognition for new litigators",
      "Zero tolerance blocking",
    ],
    status: "3,400+ blocked",
  },
  {
    number: "05",
    title: "Quiet Hours Enforcement",
    description: "No calls or texts before 8 AM or after 9 PM in the lead's local timezone. Automatic timezone detection.",
    details: [
      "Per-lead timezone detection",
      "Automatic scheduling delays",
      "State-specific rules (some stricter)",
      "Holiday and weekend awareness",
    ],
    status: "Per-timezone",
  },
  {
    number: "06",
    title: "Consent Tracking",
    description: "Timestamped proof of consent for every lead. STOP/HELP keywords handled automatically and instantly.",
    details: [
      "Timestamped consent records",
      "Source attribution",
      "STOP/HELP automation",
      "Revocation handling",
    ],
    status: "Audit-ready",
  },
  {
    number: "07",
    title: "Call Recording Disclosure",
    description: "Automatic disclosure for 2-party consent states like California, Florida, and 9 others. System handles it naturally.",
    details: [
      "11 two-party consent states covered",
      "Natural disclosure scripting",
      "Recording consent confirmation",
      "State law compliance",
    ],
    status: "11 states",
  },
  {
    number: "08",
    title: "Tech E&O Insurance",
    description: "We carry $2M in Errors & Omissions coverage. If our system makes a compliance mistake, you're protected.",
    details: [
      "$2M E&O coverage",
      "Professional liability protection",
      "System error coverage",
      "Legal defense included",
    ],
    status: "$2M coverage",
  },
];

const violations = [
  { type: "Single TCPA violation", amount: "$500 - $1,500", note: "per violation" },
  { type: "Class action lawsuit", amount: "$50,000 - $500,000+", note: "typical settlement" },
  { type: "State AG enforcement", amount: "$10,000 - $100,000", note: "per incident" },
  { type: "FCC enforcement", amount: "$20,000+", note: "per violation" },
];

export default function CompliancePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-[100dvh]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-blue-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="sm" />

          {/* Center Nav - Desktop */}
          <div className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-emerald-400 font-medium">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Right CTA - Desktop */}
          <Link href="/dashboard" className="hidden lg:flex px-3 sm:px-4 py-2 bg-emerald-500 rounded-lg text-black text-sm sm:text-base font-medium hover:bg-emerald-400 transition-colors">
            Book Demo
          </Link>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800"
          >
            <div className="flex flex-col p-4 space-y-3">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors py-2">Features</Link>
              <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors py-2">How It Works</Link>
              <Link href="/compliance" className="text-emerald-400 font-medium py-2">Compliance</Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors py-2">Pricing</Link>
              <Link href="/faq" className="text-zinc-400 hover:text-white transition-colors py-2">FAQ</Link>
              <Link href="/dashboard" className="mt-2 px-4 py-3 bg-emerald-500 rounded-lg text-black font-medium text-center">
                Book Demo
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium">$0 TCPA violations since launch</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            8 layers of{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              TCPA protection
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto px-2"
          >
            Other tools bolt on compliance as an afterthought. We built it into the foundation.
            Every outbound message runs through all 8 layers before sending.
          </motion.p>
        </div>
      </section>

      {/* Risk Warning */}
      <Section className="bg-red-500/5 border-y border-red-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">The Cost of Non-Compliance</h2>
              <p className="text-sm sm:text-base text-zinc-400">TCPA violations are expensive. One mistake can cost you everything.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              {violations.map((v, i) => (
                <motion.div
                  key={v.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-zinc-900/50 border border-red-500/20 text-center"
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-red-400 mb-1">{v.amount}</div>
                  <div className="text-white font-medium text-xs sm:text-sm">{v.type}</div>
                  <div className="text-zinc-500 text-[10px] sm:text-xs mt-1">{v.note}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 8 Compliance Layers */}
      <Section>
        <SectionHeader
          label="The Compliance Stack"
          title="How we protect you"
          labelColor="emerald"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
          {complianceLayers.map((layer, i) => (
            <FadeIn key={layer.number} delay={i * 0.05}>
              <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-lg sm:text-xl">{layer.number}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white">{layer.title}</h3>
                      <span className="text-emerald-400 text-xs sm:text-sm font-medium mt-1 sm:mt-0">{layer.status}</span>
                    </div>
                    <p className="text-sm sm:text-base text-zinc-400 mb-3 sm:mb-4">{layer.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
                      {layer.details.map((detail) => (
                        <div key={detail} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-500">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="leading-tight">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Audit Trail */}
      <Section className="bg-zinc-900/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-cyan-400 uppercase tracking-wider text-xs sm:text-sm font-medium">Audit Trail</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2 mb-3 sm:mb-4">
                4 years of records. Instantly accessible.
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 mb-4 sm:mb-6">
                TCPA has a 4-year statute of limitations. We retain every consent record, every contact attempt,
                every response, timestamped and searchable. If you ever get challenged, the proof is ready.
              </p>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  "Timestamped consent records",
                  "Full conversation transcripts",
                  "Call recordings with disclosure confirmation",
                  "DNC check logs for every contact",
                  "Opt-out/STOP handling proof",
                  "Exportable compliance reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-zinc-300">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn direction="right">
              <div className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Sample Audit Record</h3>
                <div className="space-y-3 sm:space-y-4 font-mono text-xs sm:text-sm">
                  <div className="p-2 sm:p-3 rounded bg-zinc-800/50">
                    <span className="text-zinc-500">Lead ID:</span>
                    <span className="text-white ml-2">lead_abc123</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded bg-zinc-800/50">
                    <span className="text-zinc-500">Consent:</span>
                    <span className="text-emerald-400 ml-2 break-all">2026-04-12T10:32:15Z</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded bg-zinc-800/50">
                    <span className="text-zinc-500">DNC Check:</span>
                    <span className="text-emerald-400 ml-2">CLEAR (8 layers)</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded bg-zinc-800/50">
                    <span className="text-zinc-500">Contact:</span>
                    <span className="text-white ml-2">SMS sent 10:32:18Z</span>
                  </div>
                  <div className="p-2 sm:p-3 rounded bg-zinc-800/50">
                    <span className="text-zinc-500">Retention:</span>
                    <span className="text-cyan-400 ml-2">Until 2030-04-12</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/20 mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Outreach without the lawsuit risk
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zinc-400 mb-6 sm:mb-8 max-w-2xl mx-auto">
                See how our compliance stack protects you while scaling your lead outreach.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl text-black font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  Book Demo
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 transition-colors text-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
