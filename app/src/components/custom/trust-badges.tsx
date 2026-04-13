"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Award, CheckCircle, FileCheck } from "lucide-react";

const badges = [
  {
    icon: Shield,
    title: "$2M E&O Coverage",
    description: "Errors & Omissions Insurance",
    color: "emerald",
  },
  {
    icon: Lock,
    title: "SOC 2 Compliant",
    description: "Enterprise Security Standard",
    color: "cyan",
  },
  {
    icon: FileCheck,
    title: "A2P 10DLC Registered",
    description: "Carrier-Approved Messaging",
    color: "violet",
  },
  {
    icon: Award,
    title: "TCPA Certified",
    description: "Full Compliance Guarantee",
    color: "amber",
  },
];

const integrations = [
  "Follow Up Boss",
  "KVCore",
  "Salesforce",
  "HubSpot",
  "Zillow",
  "Realtor.com",
  "Google Calendar",
  "Calendly",
];

export function TrustBadges() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center hover:border-zinc-700 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-${badge.color}-500/10 mb-3`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${badge.color}-400`} />
                </div>
                <h4 className="font-semibold text-white text-sm sm:text-base mb-1">{badge.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-500">{badge.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-zinc-500 mb-4">Integrates with your existing tools</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-xs sm:text-sm text-zinc-400"
              >
                {integration}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function SecurityBanner() {
  return (
    <div className="bg-emerald-500/5 border-y border-emerald-500/20 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>$2M E&O Coverage</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>8-Layer TCPA Protection</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>$0 Violations Since Launch</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>90-Day Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuaranteeBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
      </div>
      <div className="text-left">
        <div className="font-bold text-white text-sm sm:text-base">90-Day ROI Guarantee</div>
        <div className="text-xs sm:text-sm text-zinc-400">8 appointments or setup fee refunded</div>
      </div>
    </motion.div>
  );
}
