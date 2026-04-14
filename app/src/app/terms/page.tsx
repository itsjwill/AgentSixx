"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, Menu, X, Zap } from "lucide-react";
import { Footer } from "@/components/shared/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using AgentSixx services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
  },
  {
    title: "2. Service Description",
    content: "AgentSixx provides an intelligent lead outreach platform for real estate professionals, including automated voice calls, SMS messaging, email campaigns, and compliance management tools. Our services are designed to help you connect with leads while maintaining full TCPA compliance.",
  },
  {
    title: "3. Account Registration",
    content: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Acceptable Use",
    items: [
      "Use the service only for lawful purposes and in compliance with all applicable laws",
      "Obtain proper consent before contacting any leads through our platform",
      "Honor all opt-out requests and maintain accurate DNC lists",
      "Not use the service for spam, harassment, or fraudulent activities",
      "Not attempt to circumvent any compliance features or safeguards",
      "Not share your account access with unauthorized parties",
    ],
  },
  {
    title: "5. Compliance Responsibilities",
    content: "While AgentSixx provides compliance tools and safeguards, you remain ultimately responsible for ensuring your outreach campaigns comply with TCPA, CAN-SPAM, and other applicable regulations. You must maintain proper consent records and honor all opt-out requests within the required timeframes.",
  },
  {
    title: "6. Fees and Payment",
    items: [
      "Subscription fees are billed monthly or annually as selected",
      "Usage overages (voice minutes, SMS) are billed at stated rates",
      "All fees are non-refundable except as stated in our guarantee",
      "We may change pricing with 30 days notice",
      "Failed payments may result in service suspension",
    ],
  },
  {
    title: "7. 90-Day Guarantee",
    content: "New customers are eligible for our 90-day appointment guarantee. If you do not book at least 8 qualified appointments within 90 days while following our recommended practices, you may request a full refund of subscription fees. This guarantee requires minimum lead volume of 500 leads, active engagement with the platform, and compliance with our usage guidelines.",
  },
  {
    title: "8. Intellectual Property",
    content: "AgentSixx and its licensors retain all rights to the platform, including software, content, trademarks, and other intellectual property. You receive a limited, non-exclusive license to use the service during your subscription. You may not copy, modify, distribute, or reverse engineer any part of our platform.",
  },
  {
    title: "9. Data Ownership",
    content: "You retain ownership of all lead data and content you upload to AgentSixx. You grant us a limited license to process this data as necessary to provide our services. We will not sell or share your data with third parties except as required to operate the platform.",
  },
  {
    title: "10. Service Availability",
    content: "We strive for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be announced in advance when possible. We are not liable for any damages resulting from service interruptions or outages.",
  },
  {
    title: "11. Limitation of Liability",
    content: "To the maximum extent permitted by law, AgentSixx liability is limited to the amount you paid for services in the 12 months preceding any claim. We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits or data.",
  },
  {
    title: "12. Indemnification",
    content: "You agree to indemnify and hold harmless AgentSixx, its officers, directors, employees, and agents from any claims, damages, or expenses arising from your use of the service, violation of these terms, or infringement of any third-party rights.",
  },
  {
    title: "13. Termination",
    content: "Either party may terminate this agreement with 30 days written notice. We may suspend or terminate your account immediately for violations of these terms. Upon termination, your access will cease and data will be handled according to our data retention policy.",
  },
  {
    title: "14. Governing Law",
    content: "These terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Austin, Texas, and you consent to personal jurisdiction in these courts.",
  },
  {
    title: "15. Contact Information",
    content: "For questions about these Terms of Service, please contact us at legal@agentsixx.com or through our contact page.",
  },
];

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
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
            <FileText className="w-4 h-4" />
            Legal Agreement
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Terms of Service
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-4">
            Please read these terms carefully before using AgentSixx services.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm text-zinc-500">
            Last updated: April 13, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="p-6 sm:p-8 rounded-xl bg-zinc-900/50 border border-zinc-800"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">{section.title}</h2>
              {section.content && (
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
            <p className="text-zinc-400 mb-4">
              If you have any questions about these Terms of Service, please contact our legal team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold text-center">
                Contact Us
              </Link>
              <a href="mailto:legal@agentsixx.com" className="px-6 py-3 border border-zinc-700 rounded-lg text-white text-center hover:border-zinc-600 transition-colors">
                legal@agentsixx.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
