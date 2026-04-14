"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Shield, Menu, X, Zap } from "lucide-react";
import { Footer } from "@/components/shared/footer";

const sections = [
  {
    title: "Information We Collect",
    content: [
      "Contact information (name, email, phone number, company name)",
      "Account credentials and authentication data",
      "Lead data you upload or generate through our platform",
      "Usage data including feature interactions and preferences",
      "Communication records (calls, SMS, emails) processed through our system",
      "Payment and billing information",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "Provide and maintain our lead outreach services",
      "Process your transactions and send related information",
      "Send administrative information and service updates",
      "Respond to your comments, questions, and support requests",
      "Monitor and analyze usage trends to improve our services",
      "Ensure compliance with TCPA and other telecommunications regulations",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "Account data: Retained for the duration of your account plus 30 days",
      "Communication records: 4 years (TCPA statute of limitations)",
      "Consent records: 4 years minimum for compliance purposes",
      "Billing records: 7 years for tax and accounting purposes",
      "Usage logs: 90 days for operational purposes",
    ],
  },
  {
    title: "Data Security",
    content: [
      "256-bit AES encryption for data at rest",
      "TLS 1.3 encryption for data in transit",
      "SOC 2 Type II compliant infrastructure",
      "Regular security audits and penetration testing",
      "Multi-factor authentication for account access",
      "Role-based access controls for team accounts",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Access: Request a copy of your personal data",
      "Correction: Update or correct inaccurate information",
      "Deletion: Request deletion of your personal data",
      "Portability: Export your data in a machine-readable format",
      "Opt-out: Unsubscribe from marketing communications",
      "Restriction: Limit how we process your data",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "We use trusted third-party services for payment processing, analytics, and infrastructure",
      "All third parties are contractually bound to protect your data",
      "We do not sell your personal information to third parties",
      "Third-party services include: Stripe (payments), AWS (hosting), Twilio (communications)",
    ],
  },
];

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
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
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">Dashboard</Link>
            <Link href="/pricing" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
              Get Started
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
              <Link href="/compliance" className="text-zinc-400 py-2">Compliance</Link>
              <Link href="/pricing" className="text-zinc-400 py-2">Pricing</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Your Data, Protected
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Privacy Policy
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            We take your privacy seriously. This policy explains how we collect, use, and protect your information.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm text-zinc-500">
            Last updated: April 13, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 sm:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-zinc-400 mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold text-center">
                Contact Us
              </Link>
              <a href="mailto:privacy@agentsixx.com" className="px-6 py-3 border border-zinc-700 rounded-lg text-white text-center hover:border-zinc-600 transition-colors">
                privacy@agentsixx.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
