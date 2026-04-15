"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, Clock, ArrowRight, Tag, Menu, X, Search } from "lucide-react";
import { Footer } from "@/components/shared/footer";
import { Logo } from "@/components/shared/logo";

const categories = ["All", "Autonomous Outreach", "Compliance", "Lead Generation", "Case Studies", "Product Updates"];

const blogPosts = [
  {
    title: "How Voice ISAs (Inside Sales Agents) Are Revolutionizing Real Estate Lead Follow-Up",
    excerpt: "Learn how top-producing agents are using an autonomous ISA to respond to leads in seconds, not hours, and booking 3x more appointments.",
    category: "Autonomous Outreach",
    readTime: "5 min read",
    date: "Apr 10, 2026",
    featured: true,
    image: "AUTO",
  },
  {
    title: "TCPA Compliance in 2026: What Every Real Estate Agent Needs to Know",
    excerpt: "The complete guide to staying compliant with TCPA regulations while scaling your outreach. Avoid $500-$1,500 per-violation fines.",
    category: "Compliance",
    readTime: "8 min read",
    date: "Apr 5, 2026",
    featured: true,
    image: "TC",
  },
  {
    title: "Case Study: How Sarah M. Replaced Her $3,500/mo ISA with AgentSixx",
    excerpt: "A deep dive into how one Keller Williams team lead cut costs by 70% while booking more appointments than ever.",
    category: "Case Studies",
    readTime: "6 min read",
    date: "Mar 28, 2026",
    featured: false,
    image: "CS",
  },
  {
    title: "The 5-Second Rule: Why Lead Response Time Makes or Breaks Deals",
    excerpt: "Studies show that responding to leads within 5 minutes increases conversion by 21x. Here's how to achieve sub-5-second response times.",
    category: "Lead Generation",
    readTime: "4 min read",
    date: "Mar 20, 2026",
    featured: false,
    image: "LG",
  },
  {
    title: "Introducing Smart Voicemail: 6 Rotating Scripts That Actually Get Callbacks",
    excerpt: "Our latest feature uses a Voice ISA to leave personalized voicemails that sound natural and get 40% more callbacks.",
    category: "Product Updates",
    readTime: "3 min read",
    date: "Mar 15, 2026",
    featured: false,
    image: "PU",
  },
  {
    title: "A2P 10DLC Registration: The Complete Guide for Real Estate Agents",
    excerpt: "Everything you need to know about A2P 10DLC registration, why it matters, and how AgentSixx handles it for you.",
    category: "Compliance",
    readTime: "7 min read",
    date: "Mar 10, 2026",
    featured: false,
    image: "CP",
  },
];

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <main className="relative bg-[#0a0a0a] text-white min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] md:blur-[128px]" />
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
            <span className="text-emerald-400 font-medium">Blog</span>
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
              <span className="text-emerald-400 font-medium py-2">Blog</span>
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
            <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
            AgentSixx Blog
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            Insights for{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              modern agents
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
          >
            Tips, strategies, and industry insights to help you close more deals with autonomous outreach.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-4 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-black"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-8 sm:py-12 px-4 sm:px-6 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">Featured</h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {featuredPosts.map((post, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-5 sm:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-zinc-500 text-[10px] sm:text-xs">{post.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                    <span className="text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
            {selectedCategory === "All" ? "All Articles" : selectedCategory}
          </h2>

          {regularPosts.length === 0 && featuredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {regularPosts.map((post, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-4 sm:p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  <div className="w-full h-32 sm:h-40 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 flex items-center justify-center mb-4">
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-400/50">{post.image}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-3 h-3 text-zinc-500" />
                    <span className="text-zinc-500 text-[10px] sm:text-xs">{post.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 text-center"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Stay ahead of the curve</h2>
            <p className="text-zinc-400 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Get weekly insights on autonomous outreach, compliance updates, and strategies to close more deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-zinc-500 text-xs mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
