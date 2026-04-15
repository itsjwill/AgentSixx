"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Menu, X, CheckCircle } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";
import { MagneticButton } from "@/components/motion/magnetic-button";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get a response within 24 hours",
    value: "hello@agentsixx.com",
    action: "mailto:hello@agentsixx.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri, 9am-6pm EST",
    value: "(555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: Calendar,
    title: "Book a Demo",
    description: "15-minute strategy call",
    value: "Schedule Now",
    action: "/pricing",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available 24/7 for Pro+ plans",
    value: "Start Chat",
    action: "#",
  },
];

const faqs = [
  {
    q: "How quickly can I get started?",
    a: "Most agents are live within 7-10 days. This includes A2P registration, CRM integration, and Voice ISA training.",
  },
  {
    q: "Do you offer demos?",
    a: "Yes! Book a 15-minute call and we'll show you exactly how AgentSixx works with your lead sources.",
  },
  {
    q: "What if I need help after onboarding?",
    a: "Pro and Growth plans include Slack support with 15-minute SLA. Starter plans get email support.",
  },
];

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    plan: "pro",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

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
          <Logo size="sm" />

          <div className="hidden lg:flex items-center gap-8">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors">How It Works</Link>
            <Link href="/compliance" className="text-zinc-400 hover:text-white transition-colors">Compliance</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2">
              Dashboard
            </Link>
            <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold text-sm sm:text-base">
              Contact
            </span>
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
              <Link href="/about" className="text-zinc-400 hover:text-white transition-colors py-2">About</Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            Get in Touch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              talk
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Have questions? Ready to see a demo? Our team is here to help you get more appointments with less effort.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {contactMethods.map((method, i) => (
              <motion.a
                key={i}
                href={method.action}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 sm:p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <method.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">{method.title}</h3>
                <p className="text-xs text-zinc-500 mb-2">{method.description}</p>
                <p className="text-xs sm:text-sm text-emerald-400 font-medium">{method.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400 text-sm sm:text-base mb-6">We&apos;ll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Send us a message</h2>
                  <p className="text-zinc-400 text-sm mb-6">Fill out the form and we&apos;ll be in touch within 24 hours.</p>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Name *</label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Phone</label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Company</label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                          placeholder="ABC Realty"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Interested Plan</label>
                      <select
                        value={formState.plan}
                        onChange={(e) => setFormState({ ...formState, plan: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="starter">Starter - $597/mo</option>
                        <option value="pro">Pro - $1,297/mo (Most Popular)</option>
                        <option value="growth">Growth - $2,497/mo</option>
                        <option value="enterprise">Enterprise - Custom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-zinc-400 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                        placeholder="Tell us about your business and what you're looking for..."
                      />
                    </div>

                    <MagneticButton
                      type="submit"
                      strength={0.2}
                      className="w-full px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-500 text-black font-semibold text-base shadow-[0_0_40px_-8px_rgba(16,185,129,0.5)] hover:shadow-[0_0_60px_-8px_rgba(16,185,129,0.7)] transition-shadow min-h-[48px] inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </MagneticButton>
                  </form>
                </>
              )}
            </motion.div>

            {/* Info Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Office Info */}
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm">123 Tech Avenue, Suite 400</p>
                      <p className="text-zinc-400 text-sm">Austin, TX 78701</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm">Monday - Friday</p>
                      <p className="text-zinc-400 text-sm">9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Common Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="pb-4 border-b border-zinc-800 last:border-0 last:pb-0">
                      <h4 className="text-sm font-medium text-white mb-1">{faq.q}</h4>
                      <p className="text-xs sm:text-sm text-zinc-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium mt-4 hover:text-emerald-300"
                >
                  View all FAQs
                  <span>→</span>
                </Link>
              </div>

              {/* Response Time */}
              <div className="p-4 sm:p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Average Response Time</p>
                    <p className="text-emerald-400 text-lg font-bold">Under 4 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
