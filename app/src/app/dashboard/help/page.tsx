"use client";

import { DashboardCard } from "@/components/custom/dashboard-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Book,
  Bot,
  Users,
  Phone,
  MessageCircle,
  Plug,
  CreditCard,
  AlertTriangle,
  Play,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Circle,
  Clock,
  Mail,
  Headphones,
  Hash,
  Sparkles,
  FileText,
  Video,
  Lightbulb,
  Send,
  Bug,
  Star,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Globe,
  RefreshCw,
  Bell,
} from "lucide-react";

// Help Categories
const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Quick setup guides and first steps",
    icon: Book,
    articles: 12,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  {
    id: "ai-agent",
    title: "AI Agent Setup",
    description: "Configure your AI caller and scripts",
    icon: Bot,
    articles: 18,
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/5",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
  {
    id: "lead-management",
    title: "Lead Management",
    description: "Import, organize, and track leads",
    icon: Users,
    articles: 15,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "calling-sms",
    title: "Calling & SMS",
    description: "Voice calls, SMS campaigns, and compliance",
    icon: Phone,
    articles: 22,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    borderColor: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    id: "integrations",
    title: "Integrations",
    description: "Connect CRMs, dialers, and tools",
    icon: Plug,
    articles: 14,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    id: "billing",
    title: "Billing & Account",
    description: "Plans, invoices, and account settings",
    icon: CreditCard,
    articles: 8,
    color: "pink",
    gradient: "from-pink-500/20 to-pink-600/5",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and solutions",
    icon: AlertTriangle,
    articles: 25,
    color: "orange",
    gradient: "from-orange-500/20 to-orange-600/5",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
];

// Quick Start Steps
const quickStartSteps = [
  { id: 1, title: "Create your account", completed: true },
  { id: 2, title: "Verify phone number", completed: true },
  { id: 3, title: "Import your first leads", completed: true },
  { id: 4, title: "Configure AI agent voice", completed: false },
  { id: 5, title: "Set up call scripts", completed: false },
  { id: 6, title: "Connect your CRM", completed: false },
  { id: 7, title: "Launch first campaign", completed: false },
];

// Popular Articles
const popularArticles = [
  {
    title: "How to import leads from CSV",
    category: "Lead Management",
    views: 2847,
    readTime: "3 min",
  },
  {
    title: "Setting up TCPA compliance",
    category: "Calling & SMS",
    views: 2134,
    readTime: "5 min",
  },
  {
    title: "Customizing AI agent responses",
    category: "AI Agent Setup",
    views: 1923,
    readTime: "7 min",
  },
  {
    title: "Connecting Follow Up Boss",
    category: "Integrations",
    views: 1756,
    readTime: "4 min",
  },
  {
    title: "Understanding call analytics",
    category: "Getting Started",
    views: 1542,
    readTime: "6 min",
  },
];

// Video Tutorials
const videoTutorials = [
  {
    id: 1,
    title: "Complete Platform Walkthrough",
    duration: "12:34",
    thumbnail: "/api/placeholder/320/180",
    views: "5.2K",
    category: "Getting Started",
  },
  {
    id: 2,
    title: "AI Agent Voice Customization",
    duration: "8:45",
    thumbnail: "/api/placeholder/320/180",
    views: "3.8K",
    category: "AI Agent Setup",
  },
  {
    id: 3,
    title: "Lead Import Best Practices",
    duration: "6:22",
    thumbnail: "/api/placeholder/320/180",
    views: "2.9K",
    category: "Lead Management",
  },
  {
    id: 4,
    title: "Building Your First Campaign",
    duration: "15:10",
    thumbnail: "/api/placeholder/320/180",
    views: "4.1K",
    category: "Getting Started",
  },
];

// FAQs
const faqs = [
  {
    question: "How does the AI agent know what to say to leads?",
    answer: "Our AI agent is trained on thousands of successful real estate conversations and customized to your specific market, pricing, and service areas. It uses advanced natural language processing to understand lead intent and respond appropriately. You can further customize responses through script templates and objection handlers in your dashboard.",
  },
  {
    question: "What happens if a lead asks something the AI can't handle?",
    answer: "The AI will gracefully acknowledge the question and offer to have a human team member follow up. You'll receive an immediate notification via SMS, email, or Slack so you can personally respond. The system tracks these \"escalation\" moments to continuously improve over time.",
  },
  {
    question: "How do I integrate with my existing CRM?",
    answer: "We offer native integrations with Follow Up Boss, KVCore, Salesforce, HubSpot, and more. Simply go to Settings > Integrations, select your CRM, and follow the OAuth authorization flow. For other CRMs, we provide a webhook API and Zapier/Make integration options.",
  },
  {
    question: "What compliance measures are in place?",
    answer: "AgentSixx includes comprehensive TCPA compliance: A2P 10DLC registration, real-time DNC scrubbing, litigator list exclusion, quiet hours enforcement (8am-9pm local time), and timestamped consent tracking. We also support state-specific regulations and two-party consent requirements.",
  },
  {
    question: "Can I customize the AI's voice and personality?",
    answer: "Yes! You can choose from multiple voice options (male/female, various accents), adjust tone (professional, friendly, casual), customize scripts for different lead types, and even clone your own voice for the AI caller (Enterprise plan feature).",
  },
  {
    question: "How are voice minutes calculated?",
    answer: "Voice minutes are counted only for active voice calls - SMS conversations don't count toward your limit. Minutes are calculated from call connection to call end. Unused minutes roll over for up to 60 days on Pro and Growth plans.",
  },
  {
    question: "What's the difference between Lead Qualifier and Full SDR mode?",
    answer: "Lead Qualifier mode focuses on gathering information, qualifying interest, and setting appointments. Full SDR mode goes further with objection handling, value proposition delivery, and can even negotiate basic terms. Full SDR mode is available on Growth and Enterprise plans.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Most users are making their first AI calls within 30 minutes of signing up. Import your leads, choose a script template, configure your settings, and launch. Our Quick Start wizard guides you through each step.",
  },
];

// What's New Updates
const whatsNew = [
  {
    date: "Apr 10, 2026",
    title: "Enhanced Voicemail Detection",
    description: "95% accurate voicemail detection with smart callback scheduling",
    type: "feature",
  },
  {
    date: "Apr 5, 2026",
    title: "Slack Integration",
    description: "Real-time lead notifications and team alerts via Slack",
    type: "integration",
  },
  {
    date: "Mar 28, 2026",
    title: "Multi-language Support",
    description: "AI agent now supports Spanish and Portuguese conversations",
    type: "feature",
  },
  {
    date: "Mar 20, 2026",
    title: "Performance Improvements",
    description: "50% faster call connection times and reduced latency",
    type: "improvement",
  },
];

// System Status
const systemStatus = [
  { name: "AI Voice Engine", status: "operational", uptime: "99.99%" },
  { name: "SMS Gateway", status: "operational", uptime: "100%" },
  { name: "Dashboard & API", status: "operational", uptime: "99.98%" },
  { name: "CRM Sync", status: "operational", uptime: "99.95%" },
  { name: "Analytics", status: "operational", uptime: "100%" },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [feedbackType, setFeedbackType] = useState<"feature" | "bug" | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const completedSteps = quickStartSteps.filter((s) => s.completed).length;
  const progressPercentage = quickStartSteps.length > 0 ? (completedSteps / quickStartSteps.length) * 100 : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 pb-12"
    >
      {/* Header with Hero Search */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800 p-8 md:p-12"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            How can we help you today?
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AgentSixx Help Center
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
            Find answers, watch tutorials, and get support for your AI-powered lead calling system
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search for help articles, tutorials, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
            />
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-zinc-800">
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Quick Results</p>
                </div>
                <div className="p-2">
                  {popularArticles.slice(0, 3).map((article, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors text-left"
                    >
                      <FileText className="w-4 h-4 text-zinc-500" />
                      <div>
                        <p className="text-white text-sm font-medium">{article.title}</p>
                        <p className="text-xs text-zinc-500">{article.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-zinc-800/50 text-center">
                  <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                    View all results for &quot;{searchQuery}&quot;
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="text-zinc-500 text-sm">Popular:</span>
            {["Getting Started", "AI Setup", "Compliance", "Integrations"].map((tag) => (
              <button
                key={tag}
                className="px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Start Guide */}
      <motion.div variants={itemVariants}>
        <DashboardCard hover={false}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-semibold text-white">Quick Start Guide</h2>
              </div>
              <p className="text-zinc-400 text-sm">Complete these steps to get the most out of AgentSixx</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{completedSteps}/{quickStartSteps.length}</p>
              <p className="text-xs text-zinc-500">steps completed</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer",
                  step.completed
                    ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                    : "bg-zinc-800/30 border-zinc-800 hover:border-zinc-700"
                )}
              >
                {step.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-zinc-600 flex-shrink-0" />
                )}
                <span className={cn("text-sm font-medium", step.completed ? "text-emerald-400" : "text-zinc-300")}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-400 transition-colors">
                <Play className="w-4 h-4" />
                Watch Setup Video
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors">
                <FileText className="w-4 h-4" />
                Read Setup Guide
              </button>
            </div>
            <p className="text-xs text-zinc-500">Est. time: 15 minutes</p>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Help Categories Grid */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Browse by Category</h2>
          <button className="text-emerald-400 text-sm font-medium hover:text-emerald-300 flex items-center gap-1">
            View all articles
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative group cursor-pointer rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02]",
                  `bg-gradient-to-br ${category.gradient}`,
                  category.borderColor,
                  "hover:shadow-lg"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-zinc-900/50 border border-zinc-800", category.iconColor)}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold mb-1">{category.title}</h3>
                <p className="text-zinc-400 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{category.articles} articles</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Articles & Video Tutorials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Articles */}
        <motion.div variants={itemVariants}>
          <DashboardCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-semibold text-white">Popular Articles</h2>
            </div>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-800/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/10 transition-colors">
                    <FileText className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-zinc-500">{article.category}</span>
                      <span className="text-zinc-700">|</span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-600">
                    {article.views.toLocaleString()} views
                  </div>
                </motion.a>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        {/* Video Tutorials */}
        <motion.div variants={itemVariants}>
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-violet-400" />
                <h2 className="text-lg font-semibold text-white">Video Tutorials</h2>
              </div>
              <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View all
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoTutorials.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-video bg-zinc-800 rounded-lg overflow-hidden mb-2">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center group-hover:bg-emerald-500 group-hover:scale-110 transition-all">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <h4 className="text-white text-sm font-medium group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">{video.views} views</p>
                </motion.div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div variants={itemVariants}>
        <DashboardCard hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">Frequently Asked Questions</h2>
            </div>
            <span className="text-xs text-zinc-500">{faqs.length} questions</span>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-zinc-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-zinc-400 flex-shrink-0 transition-transform duration-200",
                      expandedFaq === index && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-zinc-400 text-sm leading-relaxed">{faq.answer}</p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800">
                          <span className="text-xs text-zinc-500">Was this helpful?</span>
                          <button className="text-xs text-zinc-400 hover:text-emerald-400 transition-colors">Yes</button>
                          <button className="text-xs text-zinc-400 hover:text-red-400 transition-colors">No</button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>

      {/* Contact Support & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Support */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <DashboardCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <Headphones className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-semibold text-white">Contact Support</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Live Chat */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">Live Chat</h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Online
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">Avg. response: 2 min</p>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Slack Community */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Hash className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">Slack Community</h3>
                    <span className="text-xs text-purple-400">Pro+</span>
                  </div>
                  <p className="text-sm text-zinc-400">15 min SLA guarantee</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Support */}
              <a
                href="mailto:support@agentos.io"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">Email Support</h3>
                  <p className="text-sm text-zinc-400">support@agentos.io</p>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Phone Support */}
              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-800 hover:border-zinc-700 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold">Phone Support</h3>
                    <span className="text-xs text-amber-400">Growth+</span>
                  </div>
                  <p className="text-sm text-zinc-400">Mon-Fri 9am-6pm EST</p>
                </div>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </DashboardCard>
        </motion.div>

        {/* System Status */}
        <motion.div variants={itemVariants}>
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">System Status</h2>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">All Operational</span>
              </div>
            </div>
            <div className="space-y-3">
              {systemStatus.map((system, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-zinc-300">{system.name}</span>
                  </div>
                  <span className="text-xs text-zinc-500">{system.uptime}</span>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-zinc-800 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              View Status Page
              <ExternalLink className="w-3 h-3" />
            </a>
          </DashboardCard>
        </motion.div>
      </div>

      {/* What's New & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What's New */}
        <motion.div variants={itemVariants}>
          <DashboardCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-semibold text-white">What&apos;s New</h2>
              </div>
              <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View changelog
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-4">
              {whatsNew.map((update, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    update.type === "feature" && "bg-emerald-500/10",
                    update.type === "integration" && "bg-violet-500/10",
                    update.type === "improvement" && "bg-cyan-500/10"
                  )}>
                    {update.type === "feature" && <Sparkles className="w-5 h-5 text-emerald-400" />}
                    {update.type === "integration" && <Plug className="w-5 h-5 text-violet-400" />}
                    {update.type === "improvement" && <RefreshCw className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm">{update.title}</h4>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        update.type === "feature" && "bg-emerald-500/10 text-emerald-400",
                        update.type === "integration" && "bg-violet-500/10 text-violet-400",
                        update.type === "improvement" && "bg-cyan-500/10 text-cyan-400"
                      )}>
                        {update.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{update.description}</p>
                    <p className="text-xs text-zinc-600 mt-2">{update.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>

        {/* Feedback */}
        <motion.div variants={itemVariants}>
          <DashboardCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">Send Feedback</h2>
            </div>
            <p className="text-zinc-400 text-sm mb-6">
              Help us improve AgentSixx by sharing your thoughts, feature requests, or bug reports.
            </p>

            {/* Feedback Type Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setFeedbackType("feature")}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                  feedbackType === "feature"
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                    : "bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                )}
              >
                <Lightbulb className="w-5 h-5" />
                <span className="font-medium">Feature Request</span>
              </button>
              <button
                onClick={() => setFeedbackType("bug")}
                className={cn(
                  "flex items-center justify-center gap-2 p-4 rounded-xl border transition-all",
                  feedbackType === "bug"
                    ? "bg-red-500/10 border-red-500/40 text-red-400"
                    : "bg-zinc-800/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                )}
              >
                <Bug className="w-5 h-5" />
                <span className="font-medium">Bug Report</span>
              </button>
            </div>

            {/* Feedback Form */}
            <AnimatePresence>
              {feedbackType && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={
                      feedbackType === "feature"
                        ? "Describe the feature you'd like to see..."
                        : "Describe the bug you encountered..."
                    }
                    className="w-full h-32 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setFeedbackType(null);
                        setFeedbackText("");
                      }}
                      className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!feedbackText.trim()}
                      className={cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all",
                        feedbackText.trim()
                          ? "bg-emerald-500 text-white hover:bg-emerald-400"
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      )}
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!feedbackType && (
              <div className="text-center py-4">
                <p className="text-xs text-zinc-500">Select a feedback type above to get started</p>
              </div>
            )}
          </DashboardCard>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-violet-500/10 border border-zinc-800 p-8 text-center"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-white mb-2">Still need help?</h3>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            Our support team is available 24/7 to help you get the most out of AgentSixx. Book a personalized demo or strategy call.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-400 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Start Live Chat
            </button>
            <button className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-zinc-300 rounded-xl font-medium hover:bg-zinc-800 hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
              Book Strategy Call
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
