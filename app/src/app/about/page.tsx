"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Users, Shield, Target, Award, Heart, Mail, ArrowRight, Menu, X } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";

const team = [
  {
    name: "Jamisson William",
    role: "Founder & CEO",
    bio: "Former real estate tech executive. Built and sold two proptech startups.",
    image: "JW",
  },
  {
    name: "Rafiul Islam",
    role: "Head of Product",
    bio: "10 years in CRM and sales automation. Previously at Salesforce.",
    image: "RI",
  },
  {
    name: "David Park",
    role: "Head of Engineering",
    bio: "Voice systems specialist. Built voice systems at Google and Amazon.",
    image: "DP",
  },
  {
    name: "Jennifer Adams",
    role: "Head of Compliance",
    bio: "Former TCPA litigation attorney. Knows every loophole.",
    image: "JA",
  },
];

const values = [
  {
    icon: Shield,
    title: "Compliance First",
    description: "We believe growth without compliance is a ticking time bomb. Every feature we build passes through our 8-layer compliance check.",
  },
  {
    icon: Target,
    title: "Results Over Features",
    description: "We measure success by appointments booked, not features shipped. If it doesn't move the needle, we don't build it.",
  },
  {
    icon: Heart,
    title: "Agent Success",
    description: "Your success is our success. We only win when you close more deals with less effort.",
  },
  {
    icon: Award,
    title: "Transparency",
    description: "No hidden fees, no surprise charges, no BS. What you see is what you get.",
  },
];

const milestones = [
  { year: "2023", event: "Founded in Austin, TX", description: "Started with a simple idea: what if an autonomous system could handle lead follow-up without the TCPA risk?" },
  { year: "2024", event: "First 100 agents", description: "Launched beta with select real estate teams. Zero TCPA violations." },
  { year: "2025", event: "500+ agents", description: "Expanded nationwide. $2M in E&O coverage added." },
  { year: "2026", event: "Industry leader", description: "Now serving 1,000+ agents with 8-layer compliance stack." },
];

export default function AboutPage() {
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
          <Logo size="sm" />

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <span className="text-emerald-400 font-medium">About</span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Dashboard
            </Link>
            <Link href="/pricing" className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base">
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/features" className="text-zinc-400 hover:text-white transition-colors py-2">Features</Link>
              <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors py-2">How It Works</Link>
              <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors py-2">Compliance</Link>
              <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors py-2">Pricing</Link>
              <span className="text-emerald-400 font-medium py-2">About</span>
              <Link href="/pricing" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold text-center mt-2">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Built by agents,{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              for agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
          >
            We got tired of watching agents lose deals to slow follow-up and get sued for TCPA violations. So we built the solution ourselves.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-4">
                Real estate agents deserve technology that works as hard as they do. But most tools are built by engineers who&apos;ve never made a cold call or worried about a TCPA lawsuit.
              </p>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-4">
                We&apos;re different. Our founding team includes former agents, brokers, and a TCPA litigation attorney. We know the pain because we&apos;ve lived it.
              </p>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-medium">
                Our mission: Help every agent respond faster, book more appointments, and never worry about compliance again.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "1,000+", label: "Agents served" },
                { value: "$0", label: "TCPA violations" },
                { value: "2.3M", label: "Leads contacted" },
                { value: "47K", label: "Appointments booked" },
              ].map((stat, i) => (
                <div key={i} className="p-4 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Values</h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">The principles that guide everything we build.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Journey</h2>
            <p className="text-zinc-400 text-sm sm:text-base">From idea to industry leader.</p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 sm:gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm sm:text-base">
                    {milestone.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-full bg-zinc-800 mt-2" />}
                </div>
                <div className="pt-2 sm:pt-3 pb-6 sm:pb-8">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{milestone.event}</h3>
                  <p className="text-xs sm:text-sm text-zinc-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-zinc-900/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Meet the Team</h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto">The people building the future of real estate outreach.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center group hover:border-emerald-500/30 transition-colors"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-xl sm:text-2xl font-bold text-emerald-400">
                  {member.image}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-xs sm:text-sm text-emerald-400 mb-2">{member.role}</p>
                <p className="text-xs text-zinc-500">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to join us?</h2>
            <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto">
              See why 1,000+ agents trust AgentSixx for their lead outreach. Book a demo and we&apos;ll show you exactly how it works.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3 border border-zinc-700 rounded-lg text-white hover:border-zinc-600 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
