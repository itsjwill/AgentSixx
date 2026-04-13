"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Zap,
  Filter,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Clock,
  Calendar,
  Users,
  Flame,
  CalendarCheck,
  ShieldCheck,
  AlertTriangle,
  Ban,
  Phone,
  ArrowDown,
  X,
  MoreHorizontal,
  RefreshCw,
  Search,
  Bell,
  Settings,
  PieChart,
  Activity,
  MessageCircle,
  Sparkles,
  Timer,
  Target,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";

// ============================================
// MOCK DATA - Comprehensive Lead Database
// ============================================

const leadsDatabase = [
  { id: "L001", name: "John Smith", phone: "+1 (555) 234-5678", area: "Austin, TX", stage: 1, status: "active", lastContact: "2 min ago", sentiment: "positive", email: "john@email.com" },
  { id: "L002", name: "Sarah Johnson", phone: "+1 (555) 345-6789", area: "Denver, CO", stage: 1, status: "pending", lastContact: "5 min ago", sentiment: "neutral", email: "sarah.j@email.com" },
  { id: "L003", name: "Mike Williams", phone: "+1 (555) 456-7890", area: "Phoenix, AZ", stage: 2, status: "replied", lastContact: "8 min ago", sentiment: "positive", email: "mike.w@email.com" },
  { id: "L004", name: "Emily Brown", phone: "+1 (555) 567-8901", area: "Seattle, WA", stage: 3, status: "optout", lastContact: "12 min ago", sentiment: "negative", email: "emily.b@email.com" },
  { id: "L005", name: "David Lee", phone: "+1 (555) 678-9012", area: "Miami, FL", stage: 1, status: "hot", lastContact: "15 min ago", sentiment: "positive", email: "david.lee@email.com" },
  { id: "L006", name: "Lisa Wang", phone: "+1 (555) 789-0123", area: "Chicago, IL", stage: 2, status: "active", lastContact: "18 min ago", sentiment: "neutral", email: "lisa.w@email.com" },
  { id: "L007", name: "Robert Chen", phone: "+1 (555) 890-1234", area: "Boston, MA", stage: 4, status: "cold", lastContact: "22 min ago", sentiment: "negative", email: "robert.c@email.com" },
  { id: "L008", name: "Jennifer Adams", phone: "+1 (555) 901-2345", area: "San Diego, CA", stage: 3, status: "active", lastContact: "25 min ago", sentiment: "positive", email: "jennifer.a@email.com" },
  { id: "L009", name: "Marcus Thompson", phone: "+1 (555) 012-3456", area: "Portland, OR", stage: 5, status: "replied", lastContact: "28 min ago", sentiment: "positive", email: "marcus.t@email.com" },
  { id: "L010", name: "Amanda Garcia", phone: "+1 (555) 123-4567", area: "Las Vegas, NV", stage: 2, status: "active", lastContact: "32 min ago", sentiment: "neutral", email: "amanda.g@email.com" },
  { id: "L011", name: "Kevin Park", phone: "+1 (555) 234-5679", area: "Nashville, TN", stage: 1, status: "hot", lastContact: "35 min ago", sentiment: "positive", email: "kevin.p@email.com" },
  { id: "L012", name: "Rachel Kim", phone: "+1 (555) 345-6780", area: "Charlotte, NC", stage: 6, status: "active", lastContact: "40 min ago", sentiment: "neutral", email: "rachel.k@email.com" },
  { id: "L013", name: "Brandon Foster", phone: "+1 (555) 456-7891", area: "Houston, TX", stage: 3, status: "replied", lastContact: "45 min ago", sentiment: "positive", email: "brandon.f@email.com" },
  { id: "L014", name: "Jessica Martinez", phone: "+1 (555) 567-8902", area: "Atlanta, GA", stage: 4, status: "cold", lastContact: "50 min ago", sentiment: "negative", email: "jessica.m@email.com" },
  { id: "L015", name: "Tyler Robinson", phone: "+1 (555) 678-9013", area: "Dallas, TX", stage: 2, status: "active", lastContact: "55 min ago", sentiment: "positive", email: "tyler.r@email.com" },
];

// SMS Follow-up Sequence Data
const followUpStages = [
  { stage: 1, name: "Initial Contact", leads: 847, sent: 847, replied: 203, replyRate: 24.0, avgResponseTime: "4.2 min", convertedNext: 644, dropOff: 203, hotLeads: 48, appointments: 12, waitTime: "Instant" },
  { stage: 2, name: "Value Add", leads: 644, sent: 644, replied: 142, replyRate: 22.0, avgResponseTime: "8.5 min", convertedNext: 502, dropOff: 142, hotLeads: 31, appointments: 18, waitTime: "24 hours" },
  { stage: 3, name: "Social Proof", leads: 502, sent: 502, replied: 98, replyRate: 19.5, avgResponseTime: "12.3 min", convertedNext: 404, dropOff: 98, hotLeads: 22, appointments: 24, waitTime: "48 hours" },
  { stage: 4, name: "Direct Question", leads: 404, sent: 389, replied: 67, replyRate: 17.2, avgResponseTime: "18.7 min", convertedNext: 337, dropOff: 67, hotLeads: 15, appointments: 19, waitTime: "72 hours" },
  { stage: 5, name: "Urgency Push", leads: 337, sent: 298, replied: 45, replyRate: 15.1, avgResponseTime: "24.2 min", convertedNext: 292, dropOff: 45, hotLeads: 11, appointments: 14, waitTime: "5 days" },
  { stage: 6, name: "Final Breakup", leads: 292, sent: 187, replied: 23, replyRate: 12.3, avgResponseTime: "32.5 min", convertedNext: 0, dropOff: 23, hotLeads: 8, appointments: 6, waitTime: "7 days" },
];

// SMS Template Performance
const smsTemplates = [
  {
    id: 1,
    name: "Initial Intro",
    stage: 1,
    template: "Hey {{firstName}}! I saw you were looking at properties in {{area}}. Quick question - are you still in the market? I have some great options that just hit the market",
    sent: 847,
    delivered: 839,
    replied: 203,
    replyRate: 24.2,
    optOut: 8,
    lastEdited: "2 days ago",
    performance: "top",
    abTest: { variant: "A", isWinner: true },
    hasEmoji: true,
    emojiImpact: "+3.2%",
    bestTime: "10:30 AM",
    positiveReplies: 156,
    negativeReplies: 12,
    neutralReplies: 35,
  },
  {
    id: 2,
    name: "Value Add",
    stage: 2,
    template: "Hi {{firstName}}, just wanted to share - I put together a list of {{count}} homes in your price range that aren't on Zillow yet. Want me to send it over?",
    sent: 644,
    delivered: 638,
    replied: 142,
    replyRate: 22.3,
    optOut: 5,
    lastEdited: "3 days ago",
    performance: "good",
    abTest: { variant: "B", isWinner: false },
    hasEmoji: false,
    emojiImpact: "N/A",
    bestTime: "2:15 PM",
    positiveReplies: 108,
    negativeReplies: 8,
    neutralReplies: 26,
  },
  {
    id: 3,
    name: "Social Proof",
    stage: 3,
    template: "{{firstName}} - just helped a buyer in {{area}} save $15K under asking. Market's shifting. If you're still looking, now might be the time. Thoughts?",
    sent: 502,
    delivered: 497,
    replied: 98,
    replyRate: 19.7,
    optOut: 4,
    lastEdited: "5 days ago",
    performance: "good",
    abTest: null,
    hasEmoji: false,
    emojiImpact: "N/A",
    bestTime: "11:00 AM",
    positiveReplies: 72,
    negativeReplies: 6,
    neutralReplies: 20,
  },
  {
    id: 4,
    name: "Direct Question",
    stage: 4,
    template: "Hey {{firstName}}, quick yes or no - still house hunting? No pressure either way, just want to make sure I'm not bugging you if you've found something!",
    sent: 389,
    delivered: 385,
    replied: 67,
    replyRate: 17.4,
    optOut: 3,
    lastEdited: "1 week ago",
    performance: "average",
    abTest: { variant: "A", isWinner: true },
    hasEmoji: false,
    emojiImpact: "N/A",
    bestTime: "9:00 AM",
    positiveReplies: 41,
    negativeReplies: 14,
    neutralReplies: 12,
  },
  {
    id: 5,
    name: "Urgency",
    stage: 5,
    template: "{{firstName}}, heads up - rates dropped this week and {{count}} new listings hit {{area}}. A few are already pending. Want first dibs on the next one?",
    sent: 298,
    delivered: 294,
    replied: 45,
    replyRate: 15.3,
    optOut: 2,
    lastEdited: "1 week ago",
    performance: "average",
    abTest: { variant: "B", isWinner: false },
    hasEmoji: false,
    emojiImpact: "N/A",
    bestTime: "4:30 PM",
    positiveReplies: 28,
    negativeReplies: 8,
    neutralReplies: 9,
  },
  {
    id: 6,
    name: "Breakup",
    stage: 6,
    template: "Last message from me {{firstName}} - I'll assume timing isn't right. If things change, my number's saved. Best of luck with the search!",
    sent: 187,
    delivered: 184,
    replied: 23,
    replyRate: 12.5,
    optOut: 1,
    lastEdited: "2 weeks ago",
    performance: "low",
    abTest: null,
    hasEmoji: true,
    emojiImpact: "+1.8%",
    bestTime: "3:00 PM",
    positiveReplies: 15,
    negativeReplies: 2,
    neutralReplies: 6,
  },
];

// Live SMS Activity Feed
const liveSMSFeed = [
  { id: 1, leadId: "L001", lead: "John Smith", type: "reply", message: "Yes! I'm still looking. What do you have?", time: "2 min ago", stage: 1, status: "delivered" },
  { id: 2, leadId: "L002", lead: "Sarah Johnson", type: "sent", message: "Hey Sarah! I saw you were looking at properties...", time: "5 min ago", stage: 1, status: "sending" },
  { id: 3, leadId: "L003", lead: "Mike Williams", type: "reply", message: "Send me the list please", time: "8 min ago", stage: 2, status: "delivered" },
  { id: 4, leadId: "L004", lead: "Emily Brown", type: "optout", message: "STOP", time: "12 min ago", stage: 3, status: "processed" },
  { id: 5, leadId: "L005", lead: "David Lee", type: "reply", message: "What's your number? I'll call you", time: "15 min ago", stage: 1, status: "delivered" },
  { id: 6, leadId: "L006", lead: "Lisa Wang", type: "sent", message: "Hi Lisa, just wanted to share a list of homes...", time: "18 min ago", stage: 2, status: "delivered" },
  { id: 7, leadId: "L007", lead: "Robert Chen", type: "reply", message: "Not right now, maybe in 3 months", time: "22 min ago", stage: 4, status: "delivered" },
  { id: 8, leadId: "L008", lead: "Jennifer Adams", type: "sent", message: "Jennifer - just helped a buyer save $15K...", time: "25 min ago", stage: 3, status: "delivered" },
  { id: 9, leadId: "L009", lead: "Marcus Thompson", type: "reply", message: "YES! I want first dibs. Call me.", time: "28 min ago", stage: 5, status: "delivered" },
  { id: 10, leadId: "L010", lead: "Amanda Garcia", type: "sent", message: "Hi Amanda, I put together a list of homes...", time: "32 min ago", stage: 2, status: "failed" },
];

// Conversation History
const conversationHistory: Record<string, Array<{ id: number; type: string; message: string; time: string; status: string }>> = {
  "L001": [
    { id: 1, type: "sent", message: "Hey John! I saw you were looking at properties in Austin. Quick question - are you still in the market? I have some great options that just hit the market", time: "Apr 10, 2:30 PM", status: "delivered" },
    { id: 2, type: "reply", message: "Hey! Yeah I'm still looking. What do you have?", time: "Apr 10, 2:34 PM", status: "received" },
    { id: 3, type: "sent", message: "Great! I put together a list of 12 homes in your price range that aren't on Zillow yet. Want me to send it over?", time: "Apr 11, 10:30 AM", status: "delivered" },
    { id: 4, type: "reply", message: "Yes please send it!", time: "Apr 11, 10:32 AM", status: "received" },
    { id: 5, type: "sent", message: "Done! Check your email. Also, I just helped a buyer in Austin save $15K under asking. Market's shifting. Want to chat about strategy?", time: "Apr 12, 11:00 AM", status: "delivered" },
    { id: 6, type: "reply", message: "Yes! I'm still looking. What do you have?", time: "2 min ago", status: "received" },
  ],
  "L003": [
    { id: 1, type: "sent", message: "Hey Mike! I saw you were looking at properties in Phoenix. Quick question - are you still in the market?", time: "Apr 9, 9:00 AM", status: "delivered" },
    { id: 2, type: "reply", message: "Yes, but only condos under 300k", time: "Apr 9, 9:15 AM", status: "received" },
    { id: 3, type: "sent", message: "Perfect! I have 8 condos that match exactly. Want me to send the list?", time: "Apr 10, 2:15 PM", status: "delivered" },
    { id: 4, type: "reply", message: "Send me the list please", time: "8 min ago", status: "received" },
  ],
  "L005": [
    { id: 1, type: "sent", message: "Hey David! I saw you were looking at properties in Miami. Still house hunting?", time: "Apr 8, 11:00 AM", status: "delivered" },
    { id: 2, type: "reply", message: "Yes very interested. Waterfront only.", time: "Apr 8, 11:05 AM", status: "received" },
    { id: 3, type: "sent", message: "Love it! I have 3 waterfront listings that just came on. One has a private dock. Interested?", time: "Apr 9, 10:30 AM", status: "delivered" },
    { id: 4, type: "reply", message: "What's your number? I'll call you", time: "15 min ago", status: "received" },
  ],
};

// Scheduled Messages
const scheduledMessages = [
  { id: 1, lead: "Kevin Park", message: "Hey Kevin, heads up - rates dropped this week...", scheduledFor: "Today, 2:00 PM", stage: 2, status: "pending" },
  { id: 2, lead: "Rachel Kim", message: "Last message from me Rachel - I'll assume...", scheduledFor: "Today, 4:30 PM", stage: 6, status: "pending" },
  { id: 3, lead: "Brandon Foster", message: "Brandon, quick yes or no - still house hunting?", scheduledFor: "Tomorrow, 9:00 AM", stage: 4, status: "pending" },
  { id: 4, lead: "Jessica Martinez", message: "Jessica - just helped a buyer save $15K...", scheduledFor: "Tomorrow, 11:30 AM", stage: 3, status: "pending" },
  { id: 5, lead: "Tyler Robinson", message: "Hi Tyler, I put together a list of homes...", scheduledFor: "Tomorrow, 2:15 PM", stage: 2, status: "pending" },
  { id: 6, lead: "Amanda Garcia", message: "Amanda, heads up - 5 new listings hit Las Vegas...", scheduledFor: "Apr 15, 10:00 AM", stage: 3, status: "pending" },
  { id: 7, lead: "Marcus Thompson", message: "Marcus - following up on those listings...", scheduledFor: "Apr 15, 3:00 PM", stage: 5, status: "pending" },
  { id: 8, lead: "Lisa Wang", message: "Lisa, quick question - still looking in Chicago?", scheduledFor: "Apr 16, 9:30 AM", stage: 3, status: "pending" },
];

// Response Time Heatmap Data
const heatmapData = [
  { day: "Mon", hours: [2, 5, 8, 12, 18, 24, 28, 32, 35, 30, 25, 18, 22, 28, 32, 35, 30, 22, 15, 8, 4, 2, 1, 1] },
  { day: "Tue", hours: [1, 3, 6, 10, 15, 22, 30, 38, 42, 45, 40, 32, 35, 40, 45, 42, 35, 28, 18, 10, 5, 2, 1, 1] },
  { day: "Wed", hours: [2, 4, 7, 12, 18, 25, 32, 40, 45, 48, 42, 35, 38, 42, 48, 45, 38, 30, 20, 12, 6, 3, 1, 1] },
  { day: "Thu", hours: [1, 3, 5, 10, 16, 24, 30, 38, 42, 45, 40, 33, 36, 40, 44, 42, 36, 28, 18, 10, 5, 2, 1, 1] },
  { day: "Fri", hours: [2, 4, 6, 10, 14, 20, 26, 32, 36, 38, 34, 28, 30, 34, 38, 35, 28, 20, 14, 8, 4, 2, 1, 1] },
  { day: "Sat", hours: [4, 6, 8, 12, 16, 20, 22, 24, 26, 28, 26, 24, 22, 24, 26, 24, 20, 16, 12, 8, 5, 3, 2, 2] },
  { day: "Sun", hours: [3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 18, 16, 18, 20, 22, 20, 16, 12, 10, 6, 4, 3, 2, 1] },
];

// Common Reply Keywords
const replyKeywords = [
  { keyword: "yes", count: 142, sentiment: "positive" },
  { keyword: "interested", count: 98, sentiment: "positive" },
  { keyword: "send", count: 87, sentiment: "positive" },
  { keyword: "call", count: 76, sentiment: "positive" },
  { keyword: "later", count: 45, sentiment: "neutral" },
  { keyword: "maybe", count: 38, sentiment: "neutral" },
  { keyword: "busy", count: 32, sentiment: "neutral" },
  { keyword: "no", count: 28, sentiment: "negative" },
  { keyword: "stop", count: 23, sentiment: "negative" },
  { keyword: "remove", count: 12, sentiment: "negative" },
];

// Quick Reply Templates
const quickReplies = [
  "Great! I'll send the list right now.",
  "Perfect timing! When works for a quick call?",
  "Understood! I'll check back in a few weeks.",
  "No problem! Your info is saved for when you're ready.",
  "Awesome! What's your email? I'll send details.",
];

export default function SMSPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(1);
  const [queuePaused, setQueuePaused] = useState(false);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"funnel" | "templates" | "analytics" | "scheduled" | "compliance">("funnel");
  const [liveIndicator, setLiveIndicator] = useState(true);
  const [showConversation, setShowConversation] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState("");

  // Simulate live indicator pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveIndicator(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate stats
  const totalSent = followUpStages.reduce((acc, s) => acc + s.sent, 0);
  const totalReplied = followUpStages.reduce((acc, s) => acc + s.replied, 0);
  const overallReplyRate = totalSent > 0 ? ((totalReplied / totalSent) * 100).toFixed(1) : "0.0";
  const totalOptOuts = smsTemplates.reduce((acc, t) => acc + t.optOut, 0);
  const totalHotLeads = followUpStages.reduce((acc, s) => acc + s.hotLeads, 0);
  const totalAppointments = followUpStages.reduce((acc, s) => acc + s.appointments, 0);
  const optOutRate = totalSent > 0 ? ((totalOptOuts / totalSent) * 100).toFixed(2) : "0.00";

  // Queue stats
  const pendingSMS = 156;
  const scheduledToday = 48;
  const currentlySending = !queuePaused;

  // Sentiment totals
  const totalPositive = smsTemplates.reduce((acc, t) => acc + t.positiveReplies, 0);
  const totalNegative = smsTemplates.reduce((acc, t) => acc + t.negativeReplies, 0);
  const totalNeutral = smsTemplates.reduce((acc, t) => acc + t.neutralReplies, 0);
  const totalSentiment = totalPositive + totalNegative + totalNeutral;

  const selectedLeadData = selectedLead ? leadsDatabase.find(l => l.id === selectedLead) : null;
  const selectedConversation = selectedLead ? conversationHistory[selectedLead] || [] : [];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="px-4 xs:px-6 py-3 xs:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 xs:gap-4">
              <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg xs:text-xl sm:text-2xl font-bold text-white truncate">SMS Follow-up System</h1>
                <p className="text-zinc-400 text-xs xs:text-sm truncate">AI-powered lead nurturing</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-full xs:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 w-full xs:w-48 sm:w-64 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>
              <select className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
              <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-medium rounded-lg text-sm transition-all shadow-lg shadow-emerald-500/20">
                + New Template
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 xs:p-6 space-y-4 xs:space-y-6">
        {/* Overview Stats Row - 6 Cards */}
        <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 xs:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-3 xs:p-4"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-blue-400" />
              <span className="text-[10px] xs:text-xs text-zinc-400">Total SMS Sent</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl xs:text-2xl font-bold text-white">{totalSent.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-400">+18.3%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur p-3 xs:p-4 ring-1 ring-emerald-500/20"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <MessageCircle className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-300">Total Replies</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl xs:text-2xl font-bold text-white">{totalReplied}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-400">+23.1%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-3 xs:p-4"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <Target className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-cyan-400" />
              <span className="text-[10px] xs:text-xs text-zinc-400">Reply Rate</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl xs:text-2xl font-bold text-white">{overallReplyRate}%</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-400">+2.3%</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-orange-500/30 bg-orange-500/5 backdrop-blur p-3 xs:p-4"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <Flame className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-orange-400" />
              <span className="text-[10px] xs:text-xs text-orange-300">Hot Leads</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl xs:text-2xl font-bold text-white">{totalHotLeads}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-400">+12</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-violet-500/30 bg-violet-500/5 backdrop-blur p-3 xs:p-4"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <CalendarCheck className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-violet-400" />
              <span className="text-[10px] xs:text-xs text-violet-300">Appointments</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl xs:text-2xl font-bold text-white">{totalAppointments}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />
              <span className="text-[10px] xs:text-xs text-emerald-400">+8</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-3 xs:p-4"
          >
            <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2">
              <Ban className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-zinc-500" />
              <span className="text-[10px] xs:text-xs text-zinc-400">Opt-out Rate</span>
            </div>
            <div className="flex items-baseline gap-1 xs:gap-2 flex-wrap">
              <span className="text-xl xs:text-2xl font-bold text-white">{optOutRate}%</span>
              <span className="text-[10px] xs:text-xs text-emerald-400 bg-emerald-500/10 px-1.5 xs:px-2 py-0.5 rounded-full">Low</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] xs:text-xs text-zinc-500">{totalOptOuts} opt-outs</span>
            </div>
          </motion.div>
        </div>

        {/* SMS Queue Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 xs:gap-6">
              <div className="flex items-center gap-2 xs:gap-3">
                <div className={`w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full ${currentlySending ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="text-xs xs:text-sm font-medium text-white">
                  {currentlySending ? 'Queue Active' : 'Queue Paused'}
                </span>
              </div>
              <div className="hidden xs:block h-8 w-px bg-zinc-700" />
              <div className="flex items-center gap-3 xs:gap-4">
                <div>
                  <p className="text-[10px] xs:text-xs text-zinc-500">Pending</p>
                  <p className="text-base xs:text-lg font-bold text-white">{pendingSMS}</p>
                </div>
                <div>
                  <p className="text-[10px] xs:text-xs text-zinc-500 whitespace-nowrap">Scheduled</p>
                  <p className="text-base xs:text-lg font-bold text-cyan-400">{scheduledToday}</p>
                </div>
                <div className="hidden xs:block">
                  <p className="text-[10px] xs:text-xs text-zinc-500">Currently Sending</p>
                  <div className="flex items-center gap-2">
                    {currentlySending ? (
                      <>
                        <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                        <span className="text-base xs:text-lg font-bold text-emerald-400">3 / sec</span>
                      </>
                    ) : (
                      <span className="text-base xs:text-lg font-bold text-zinc-500">Paused</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQueuePaused(!queuePaused)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  queuePaused
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                    : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30'
                }`}
              >
                {queuePaused ? (
                  <>
                    <Play className="w-4 h-4" />
                    Resume Queue
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause Queue
                  </>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-sm transition-colors">
                <Clock className="w-4 h-4" />
                Schedule Bulk
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4 overflow-x-auto scrollbar-hide -mx-6 px-6">
          {[
            { id: "funnel", label: "Follow-up Funnel", shortLabel: "Funnel", icon: Activity },
            { id: "templates", label: "Templates", shortLabel: "Templates", icon: Copy },
            { id: "analytics", label: "Response Analytics", shortLabel: "Analytics", icon: PieChart },
            { id: "scheduled", label: "Scheduled", shortLabel: "Scheduled", icon: Calendar },
            { id: "compliance", label: "Compliance", shortLabel: "Compliance", icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3 xs:px-4 py-2 rounded-lg text-xs xs:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">{tab.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Main Content - Split Panel Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Panel - Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {/* Funnel Tab */}
              {activeTab === "funnel" && (
                <motion.div
                  key="funnel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Enhanced Follow-up Funnel */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-5">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                          Follow-up Funnel
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                        </h2>
                        <p className="text-zinc-500 text-sm">6-stage automated nurturing sequence</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Active
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-orange-500" />
                          Hot Lead
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-zinc-600" />
                          Dropped
                        </span>
                      </div>
                    </div>

                    {/* Visual Funnel with Conversion Arrows */}
                    <div className="space-y-4">
                      {followUpStages.map((stage, index) => {
                        const widthPercent = followUpStages[0].leads > 0 ? (stage.leads / followUpStages[0].leads) * 100 : 0;
                        const isExpanded = expandedStage === stage.stage;
                        const conversionRate = index > 0 && followUpStages[index - 1].leads > 0
                          ? ((stage.leads / followUpStages[index - 1].leads) * 100).toFixed(0)
                          : "100";

                        return (
                          <div key={stage.stage}>
                            {/* Conversion Arrow Between Stages */}
                            {index > 0 && (
                              <div className="flex items-center justify-center py-2">
                                <div className="flex items-center gap-2 text-xs text-zinc-500">
                                  <ArrowDown className="w-4 h-4 text-cyan-400" />
                                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 font-medium">
                                    {conversionRate}% converted
                                  </span>
                                  <span className="text-zinc-600">|</span>
                                  <span className="text-zinc-600">
                                    Wait: {stage.waitTime}
                                  </span>
                                </div>
                              </div>
                            )}

                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.08 }}
                            >
                              <button
                                onClick={() => setExpandedStage(isExpanded ? null : stage.stage)}
                                className="w-full text-left group"
                              >
                                <div className="flex items-center gap-2 xs:gap-4">
                                  <div className="w-20 xs:w-28 sm:w-36 flex items-center gap-1 xs:gap-2 flex-shrink-0">
                                    <span className="w-6 h-6 xs:w-7 xs:h-7 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-[10px] xs:text-xs font-bold text-white flex-shrink-0">
                                      {stage.stage}
                                    </span>
                                    <span className="text-xs xs:text-sm text-zinc-300 truncate group-hover:text-white transition-colors">
                                      {stage.name}
                                    </span>
                                  </div>
                                  <div className="flex-1 h-10 xs:h-12 bg-zinc-800/50 rounded-xl overflow-hidden relative min-w-0">
                                    <motion.div
                                      className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 rounded-xl flex items-center justify-between px-2 xs:px-4"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${widthPercent}%` }}
                                      transition={{ duration: 0.6, delay: index * 0.1 }}
                                    >
                                      <span className="text-xs xs:text-sm font-bold text-white drop-shadow-md whitespace-nowrap">
                                        {stage.leads}
                                      </span>
                                      <div className="hidden xs:flex items-center gap-3">
                                        <span className="text-xs font-medium text-white/80">
                                          {stage.replied} replied
                                        </span>
                                        <span className="text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">
                                          {stage.replyRate}%
                                        </span>
                                      </div>
                                    </motion.div>
                                    {/* Progress marker */}
                                    <div
                                      className="absolute top-0 h-full w-0.5 bg-white/30"
                                      style={{ left: `${widthPercent}%` }}
                                    />
                                  </div>
                                  <div className="w-16 xs:w-24 text-right flex items-center justify-end gap-1 xs:gap-2 flex-shrink-0">
                                    <div>
                                      <span className="text-xs xs:text-sm font-medium text-orange-400">{stage.hotLeads}</span>
                                      <span className="text-[10px] xs:text-xs text-zinc-600 ml-0.5 xs:ml-1 hidden xs:inline">hot</span>
                                    </div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-3 h-3 xs:w-4 xs:h-4 text-zinc-500" />
                                    ) : (
                                      <ChevronDown className="w-3 h-3 xs:w-4 xs:h-4 text-zinc-500" />
                                    )}
                                  </div>
                                </div>
                              </button>

                              {/* Expanded Details */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="ml-10 sm:ml-14 mt-3 mb-2"
                                  >
                                    <div className="p-3 xs:p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                                      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2 xs:gap-4 text-xs xs:text-sm">
                                        <div>
                                          <p className="text-zinc-500 text-xs mb-1">Sent</p>
                                          <p className="text-white font-semibold">{stage.sent.toLocaleString()}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 text-xs mb-1">Replied</p>
                                          <p className="text-emerald-400 font-semibold">{stage.replied}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 text-xs mb-1">Hot Leads</p>
                                          <p className="text-orange-400 font-semibold">{stage.hotLeads}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 text-xs mb-1">Appointments</p>
                                          <p className="text-violet-400 font-semibold">{stage.appointments}</p>
                                        </div>
                                        <div>
                                          <p className="text-zinc-500 text-xs mb-1">Avg Response</p>
                                          <p className="text-cyan-400 font-semibold">{stage.avgResponseTime}</p>
                                        </div>
                                      </div>
                                      <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-between">
                                        <span className="text-xs text-zinc-500">
                                          {stage.dropOff} dropped off ({stage.leads > 0 ? ((stage.dropOff / stage.leads) * 100).toFixed(1) : 0}%)
                                        </span>
                                        <button className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                                          View leads <ArrowRight className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Funnel Summary */}
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 xs:gap-4">
                        <div className="text-center p-2 xs:p-3 rounded-lg bg-zinc-800/30">
                          <p className="text-lg xs:text-2xl font-bold text-white">{followUpStages[0].leads}</p>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Total Entered</p>
                        </div>
                        <div className="text-center p-2 xs:p-3 rounded-lg bg-orange-500/10">
                          <p className="text-lg xs:text-2xl font-bold text-orange-400">{totalHotLeads}</p>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Became Hot Leads</p>
                        </div>
                        <div className="text-center p-2 xs:p-3 rounded-lg bg-violet-500/10">
                          <p className="text-lg xs:text-2xl font-bold text-violet-400">{totalAppointments}</p>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Appointments Set</p>
                        </div>
                        <div className="text-center p-2 xs:p-3 rounded-lg bg-emerald-500/10">
                          <p className="text-lg xs:text-2xl font-bold text-emerald-400">
                            {followUpStages[0]?.leads > 0 ? ((totalAppointments / followUpStages[0].leads) * 100).toFixed(1) : 0}%
                          </p>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Conversion Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Templates Tab */}
              {activeTab === "templates" && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-0 mb-4 xs:mb-6">
                      <div>
                        <h2 className="text-base xs:text-lg font-semibold text-white">Template Performance</h2>
                        <p className="text-zinc-500 text-xs xs:text-sm">A/B testing, emoji impact, sentiment</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs xs:text-sm text-zinc-400 hover:text-white flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                          <Filter className="w-3.5 h-3.5 xs:w-4 xs:h-4" /> <span className="hidden xs:inline">Filter</span>
                        </button>
                        <button className="text-xs xs:text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors">
                          <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4" /> <span className="hidden xs:inline">AI </span>Optimize
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4">
                      {smsTemplates.map((template) => (
                        <motion.div
                          key={template.id}
                          layout
                          className={`p-3 xs:p-4 rounded-xl border transition-all cursor-pointer ${
                            selectedTemplate === template.id
                              ? "border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20"
                              : "border-zinc-800 bg-zinc-800/30 hover:border-zinc-700"
                          }`}
                          onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
                        >
                          <div className="flex items-start justify-between gap-2 xs:gap-3 mb-2 xs:mb-3">
                            <div className="flex flex-wrap items-center gap-1.5 xs:gap-2">
                              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                                {template.stage}
                              </span>
                              <span className="text-sm font-medium text-white">{template.name}</span>
                              {template.performance === "top" && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                                  <Zap className="w-3 h-3" /> Top
                                </span>
                              )}
                              {template.abTest && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  template.abTest.isWinner
                                    ? 'bg-cyan-500/20 text-cyan-400'
                                    : 'bg-zinc-700 text-zinc-400'
                                }`}>
                                  A/B {template.abTest.variant} {template.abTest.isWinner && 'Winner'}
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <p className={`text-lg font-bold ${
                                template.replyRate >= 20 ? "text-emerald-400" :
                                template.replyRate >= 15 ? "text-yellow-400" : "text-zinc-400"
                              }`}>
                                {template.replyRate}%
                              </p>
                              <p className="text-xs text-zinc-500">reply rate</p>
                            </div>
                          </div>

                          <p className="text-sm text-zinc-400 line-clamp-2 mb-3">{template.template}</p>

                          {/* Quick Stats Row */}
                          <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5 xs:gap-2 text-center text-[10px] xs:text-xs">
                            <div className="p-1.5 xs:p-2 rounded-lg bg-zinc-800/50">
                              <p className="text-zinc-500">Sent</p>
                              <p className="font-semibold text-white">{template.sent}</p>
                            </div>
                            <div className="p-1.5 xs:p-2 rounded-lg bg-zinc-800/50">
                              <p className="text-zinc-500">Replied</p>
                              <p className="font-semibold text-emerald-400">{template.replied}</p>
                            </div>
                            <div className="p-1.5 xs:p-2 rounded-lg bg-zinc-800/50">
                              <p className="text-zinc-500">Best Time</p>
                              <p className="font-semibold text-cyan-400">{template.bestTime}</p>
                            </div>
                            <div className="p-1.5 xs:p-2 rounded-lg bg-zinc-800/50">
                              <p className="text-zinc-500">Emoji</p>
                              <p className={`font-semibold ${template.hasEmoji ? 'text-emerald-400' : 'text-zinc-500'}`}>
                                {template.hasEmoji ? template.emojiImpact : 'None'}
                              </p>
                            </div>
                          </div>

                          {/* Sentiment Bar */}
                          <div className="mt-3 pt-3 border-t border-zinc-800/50">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-zinc-500">Sentiment:</span>
                              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden flex">
                                <div
                                  className="h-full bg-emerald-500"
                                  style={{ width: `${template.replied > 0 ? (template.positiveReplies / template.replied) * 100 : 0}%` }}
                                />
                                <div
                                  className="h-full bg-yellow-500"
                                  style={{ width: `${template.replied > 0 ? (template.neutralReplies / template.replied) * 100 : 0}%` }}
                                />
                                <div
                                  className="h-full bg-red-500"
                                  style={{ width: `${template.replied > 0 ? (template.negativeReplies / template.replied) * 100 : 0}%` }}
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-400">{template.positiveReplies}</span>
                                <span className="text-zinc-600">/</span>
                                <span className="text-yellow-400">{template.neutralReplies}</span>
                                <span className="text-zinc-600">/</span>
                                <span className="text-red-400">{template.negativeReplies}</span>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Template Details */}
                          <AnimatePresence>
                            {selectedTemplate === template.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-zinc-700/50"
                              >
                                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 mb-4">
                                  <p className="text-xs text-zinc-500 mb-1">Full Template:</p>
                                  <p className="text-sm text-zinc-300">{template.template}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-zinc-500">Last edited: {template.lastEdited}</span>
                                  <div className="flex items-center gap-1">
                                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                      <Eye className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                                      <Copy className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Response Sentiment */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                      <h3 className="text-base xs:text-lg font-semibold text-white mb-4">Response Sentiment</h3>
                      <div className="flex items-center justify-center py-4 xs:py-6">
                        {/* Pie Chart Visualization */}
                        <div className="relative w-36 h-36 xs:w-48 xs:h-48">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="20"
                              strokeDasharray={`${totalSentiment > 0 ? (totalPositive / totalSentiment) * 251.2 : 0} 251.2`}
                              strokeDashoffset="0"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#eab308"
                              strokeWidth="20"
                              strokeDasharray={`${totalSentiment > 0 ? (totalNeutral / totalSentiment) * 251.2 : 0} 251.2`}
                              strokeDashoffset={`${totalSentiment > 0 ? -(totalPositive / totalSentiment) * 251.2 : 0}`}
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth="20"
                              strokeDasharray={`${totalSentiment > 0 ? (totalNegative / totalSentiment) * 251.2 : 0} 251.2`}
                              strokeDashoffset={`${totalSentiment > 0 ? -((totalPositive + totalNeutral) / totalSentiment) * 251.2 : 0}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-2xl xs:text-3xl font-bold text-white">{totalSentiment}</span>
                            <span className="text-[10px] xs:text-xs text-zinc-500">Total Replies</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center gap-3 xs:gap-6 mt-4">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <ThumbsUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-400" />
                          <span className="text-xs xs:text-sm text-zinc-300">
                            {totalPositive} <span className="text-zinc-500">({totalSentiment > 0 ? ((totalPositive / totalSentiment) * 100).toFixed(0) : 0}%)</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <Minus className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-yellow-400" />
                          <span className="text-xs xs:text-sm text-zinc-300">
                            {totalNeutral} <span className="text-zinc-500">({totalSentiment > 0 ? ((totalNeutral / totalSentiment) * 100).toFixed(0) : 0}%)</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <ThumbsDown className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-red-400" />
                          <span className="text-xs xs:text-sm text-zinc-300">
                            {totalNegative} <span className="text-zinc-500">({totalSentiment > 0 ? ((totalNegative / totalSentiment) * 100).toFixed(0) : 0}%)</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Common Reply Keywords */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                      <h3 className="text-base xs:text-lg font-semibold text-white mb-4">Top Reply Keywords</h3>
                      <div className="space-y-2">
                        {replyKeywords.map((kw, index) => (
                          <div key={kw.keyword} className="flex items-center gap-2 xs:gap-3">
                            <span className="w-5 xs:w-6 text-[10px] xs:text-xs text-zinc-500">{index + 1}.</span>
                            <span className={`text-xs xs:text-sm font-medium ${
                              kw.sentiment === 'positive' ? 'text-emerald-400' :
                              kw.sentiment === 'neutral' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              &quot;{kw.keyword}&quot;
                            </span>
                            <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  kw.sentiment === 'positive' ? 'bg-emerald-500' :
                                  kw.sentiment === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${replyKeywords[0]?.count > 0 ? (kw.count / replyKeywords[0].count) * 100 : 0}%` }}
                              />
                            </div>
                            <span className="text-xs xs:text-sm text-zinc-400 w-8 xs:w-12 text-right">{kw.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Response Time Heatmap */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                    <h3 className="text-base xs:text-lg font-semibold text-white mb-4">Best Time to Send (Response Heatmap)</h3>
                    <div className="overflow-x-auto -mx-4 xs:mx-0 px-4 xs:px-0 scrollbar-hide">
                      <div className="min-w-[500px] xs:min-w-[700px]">
                        {/* Hour labels */}
                        <div className="flex items-center mb-2">
                          <div className="w-12" />
                          {[...Array(24)].map((_, i) => (
                            <div key={i} className="flex-1 text-center text-xs text-zinc-600">
                              {i % 3 === 0 ? `${i}:00` : ''}
                            </div>
                          ))}
                        </div>
                        {/* Heatmap rows */}
                        {heatmapData.map((row) => (
                          <div key={row.day} className="flex items-center gap-1 mb-1">
                            <div className="w-12 text-xs text-zinc-500">{row.day}</div>
                            {row.hours.map((value, i) => (
                              <div
                                key={i}
                                className="flex-1 h-6 rounded-sm"
                                style={{
                                  backgroundColor: `rgba(16, 185, 129, ${value / 50})`,
                                }}
                                title={`${row.day} ${i}:00 - ${value} responses`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs">
                      <span className="text-zinc-500">Low</span>
                      <div className="flex gap-0.5">
                        {[0.1, 0.3, 0.5, 0.7, 0.9].map((opacity) => (
                          <div
                            key={opacity}
                            className="w-6 h-4 rounded-sm"
                            style={{ backgroundColor: `rgba(16, 185, 129, ${opacity})` }}
                          />
                        ))}
                      </div>
                      <span className="text-zinc-500">High</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scheduled Tab */}
              {activeTab === "scheduled" && (
                <motion.div
                  key="scheduled"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-5">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-lg font-semibold text-white">Scheduled Messages</h2>
                        <p className="text-zinc-500 text-sm">{scheduledMessages.length} messages queued</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-zinc-400 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
                          <Calendar className="w-4 h-4" /> Bulk Schedule
                        </button>
                        <button className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">
                          <XCircle className="w-4 h-4" /> Cancel All
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {scheduledMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl bg-zinc-800/30 border border-zinc-800 hover:border-zinc-700 transition-colors"
                        >
                          <div className="flex items-center gap-3 xs:contents">
                            <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                              <Timer className="w-4 h-4 xs:w-5 xs:h-5 text-cyan-400" />
                            </div>
                            <div className="flex-1 min-w-0 xs:hidden">
                              <span className="text-sm font-medium text-white">{msg.lead}</span>
                              <p className="text-xs text-cyan-400">{msg.scheduledFor}</p>
                            </div>
                            <div className="flex items-center gap-1 xs:hidden">
                              <button className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-red-400 transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 hidden xs:block">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-white">{msg.lead}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400">
                                Stage {msg.stage}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-500 truncate">{msg.message}</p>
                          </div>
                          <p className="text-xs text-zinc-500 truncate xs:hidden pl-11">{msg.message}</p>
                          <div className="text-right hidden xs:block flex-shrink-0">
                            <p className="text-sm font-medium text-cyan-400">{msg.scheduledFor}</p>
                            <p className="text-xs text-zinc-500">{msg.status}</p>
                          </div>
                          <div className="hidden xs:flex items-center gap-1 flex-shrink-0">
                            <button className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-red-400 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Compliance Tab */}
              {activeTab === "compliance" && (
                <motion.div
                  key="compliance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6">
                    {/* DNC List Status */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Ban className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">DNC List</h3>
                          <p className="text-xs text-zinc-500">Do Not Contact registry</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Total on DNC</span>
                          <span className="text-sm font-medium text-white">47</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Added this week</span>
                          <span className="text-sm font-medium text-emerald-400">+3</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Last sync</span>
                          <span className="text-sm font-medium text-cyan-400">2 min ago</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-emerald-400">All DNC numbers blocked</span>
                        </div>
                      </div>
                    </div>

                    {/* Opt-out Compliance */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">Opt-out Handling</h3>
                          <p className="text-xs text-zinc-500">STOP keyword detection</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Keywords monitored</span>
                          <span className="text-sm font-medium text-white">12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Avg. response time</span>
                          <span className="text-sm font-medium text-emerald-400">Instant</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Processed today</span>
                          <span className="text-sm font-medium text-cyan-400">3</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs text-emerald-400">Auto-removal active</span>
                        </div>
                      </div>
                    </div>

                    {/* TCPA Score */}
                    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 backdrop-blur p-4 xs:p-5 xs:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">TCPA Compliance</h3>
                          <p className="text-xs text-zinc-500">Overall compliance score</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center py-4">
                        <div className="relative w-24 h-24">
                          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#27272a"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#22c55e"
                              strokeWidth="10"
                              strokeDasharray={`${0.98 * 251.2} 251.2`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-emerald-400">98%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-zinc-400">Consent verification</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          <span className="text-zinc-400">Time restrictions honored</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <AlertTriangle className="w-3 h-3 text-yellow-400" />
                          <span className="text-zinc-400">1 lead missing consent date</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Live Monitor & Conversation */}
          <div className="space-y-4 xs:space-y-6">
            {/* Live SMS Monitor */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h2 className="text-base xs:text-lg font-semibold text-white flex items-center gap-2">
                  Live Monitor
                </h2>
                <span className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs">
                  <span className={`w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full ${liveIndicator ? 'bg-emerald-500' : 'bg-emerald-400'} animate-pulse`} />
                  <span className="text-emerald-400 font-medium">LIVE</span>
                </span>
              </div>

              <div className="space-y-2 max-h-[300px] xs:max-h-[400px] overflow-y-auto">
                {liveSMSFeed.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                      setSelectedLead(activity.leadId);
                      setShowConversation(true);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      selectedLead === activity.leadId
                        ? 'bg-emerald-500/10 border border-emerald-500/30'
                        : 'bg-zinc-800/30 hover:bg-zinc-800/50 border border-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "reply" ? "bg-emerald-500/20 text-emerald-400" :
                      activity.type === "sent" ? "bg-blue-500/20 text-blue-400" :
                      activity.type === "optout" ? "bg-red-500/20 text-red-400" :
                      "bg-zinc-700 text-zinc-400"
                    }`}>
                      {activity.type === "reply" ? <MessageCircle className="w-4 h-4" /> :
                       activity.type === "sent" ? <Send className="w-4 h-4" /> :
                       activity.type === "optout" ? <Ban className="w-4 h-4" /> :
                       <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{activity.lead}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          activity.status === "sending" ? "bg-amber-500/20 text-amber-400" :
                          activity.status === "delivered" ? "bg-emerald-500/20 text-emerald-400" :
                          activity.status === "failed" ? "bg-red-500/20 text-red-400" :
                          "bg-zinc-700 text-zinc-400"
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">{activity.message}</p>
                      <p className="text-xs text-zinc-600 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="w-full mt-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                View all activity <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Preview Panel */}
            <AnimatePresence>
              {showConversation && selectedLeadData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur overflow-hidden"
                >
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-zinc-800 bg-zinc-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                          {selectedLeadData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{selectedLeadData.name}</h3>
                          <p className="text-xs text-zinc-500">{selectedLeadData.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowConversation(false)}
                          className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Conversation Messages */}
                  <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                    {selectedConversation.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[85%] ${
                          msg.type === 'sent'
                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white'
                            : 'bg-zinc-800 text-zinc-200'
                        } rounded-2xl px-4 py-2`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.type === 'sent' ? 'text-white/70' : 'text-zinc-500'}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Reply */}
                  <div className="p-4 border-t border-zinc-800">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickReplies.slice(0, 3).map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => setQuickReplyText(reply)}
                          className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
                        >
                          {reply.substring(0, 30)}...
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={quickReplyText}
                        onChange={(e) => setQuickReplyText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500"
                      />
                      <button className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 transition-all">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
              <h2 className="text-base xs:text-lg font-semibold text-white mb-3 xs:mb-4">Response Quality</h2>
              <div className="space-y-3 xs:space-y-4">
                <div>
                  <div className="flex justify-between text-xs xs:text-sm mb-2">
                    <span className="text-zinc-400">Positive Responses</span>
                    <span className="text-emerald-400 font-medium">68%</span>
                  </div>
                  <div className="h-1.5 xs:h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs xs:text-sm mb-2">
                    <span className="text-zinc-400">Neutral</span>
                    <span className="text-yellow-400 font-medium">24%</span>
                  </div>
                  <div className="h-1.5 xs:h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-yellow-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "24%" }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs xs:text-sm mb-2">
                    <span className="text-zinc-400">Negative/Opt-out</span>
                    <span className="text-red-400 font-medium">8%</span>
                  </div>
                  <div className="h-1.5 xs:h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "8%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 xs:mt-6 pt-3 xs:pt-4 border-t border-zinc-800 space-y-2 xs:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs xs:text-sm text-zinc-400">Avg Response Time</span>
                  <span className="text-white font-medium text-xs xs:text-sm">4.2 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs xs:text-sm text-zinc-400">Best Day</span>
                  <span className="text-white font-medium text-xs xs:text-sm">Tuesday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs xs:text-sm text-zinc-400">Best Time</span>
                  <span className="text-white font-medium text-xs xs:text-sm">10:30 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs xs:text-sm text-zinc-400">Avg to Convert</span>
                  <span className="text-cyan-400 font-medium text-xs xs:text-sm">2.4 SMS</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur p-4 xs:p-5">
              <h2 className="text-base xs:text-lg font-semibold text-white mb-3 xs:mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full p-2.5 xs:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-left flex items-center gap-2.5 xs:gap-3 transition-colors group">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-emerald-500/30 group-hover:to-cyan-500/30 transition-colors flex-shrink-0">
                    <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs xs:text-sm font-medium text-white">Send Bulk SMS</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500 truncate">Message multiple leads</p>
                  </div>
                </button>
                <button className="w-full p-2.5 xs:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-left flex items-center gap-2.5 xs:gap-3 transition-colors group">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs xs:text-sm font-medium text-white">AI Generate Template</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500 truncate">High-converting messages</p>
                  </div>
                </button>
                <button className="w-full p-2.5 xs:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-left flex items-center gap-2.5 xs:gap-3 transition-colors group">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors flex-shrink-0">
                    <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-violet-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs xs:text-sm font-medium text-white">A/B Test Manager</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500 truncate">Compare variants</p>
                  </div>
                </button>
                <button className="w-full p-2.5 xs:p-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-left flex items-center gap-2.5 xs:gap-3 transition-colors group">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors flex-shrink-0">
                    <Flame className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs xs:text-sm font-medium text-white">View Hot Leads</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500 truncate">{totalHotLeads} leads ready</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
