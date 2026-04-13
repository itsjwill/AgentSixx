"use client";

import { DashboardCard } from "@/components/custom/dashboard-card";
import { StatusBadge } from "@/components/custom/status-badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  Send,
  Bot,
  User,
  Sparkles,
  Search,
  Filter,
  CheckCheck,
  Archive,
  Tag,
  MoreHorizontal,
  AlertCircle,
  TrendingUp,
  Smile,
  Meh,
  Frown,
  Mic,
  Play,
  Pause,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  RefreshCw,
  Star,
  Users,
  Zap,
  Copy,
  ExternalLink,
  MoreVertical,
  X,
} from "lucide-react";

// Types
type ChannelType = "all" | "sms" | "email" | "call";
type MessageSender = "ai" | "human" | "lead";
type ConversationStatus = "hot" | "needs_response" | "engaged" | "qualified" | "callback" | "contacted" | "new";
type SentimentType = "positive" | "neutral" | "negative";

interface Message {
  id: string;
  from: MessageSender;
  text: string;
  time: string;
  timestamp: Date;
  read: boolean;
  channel: "sms" | "email" | "call";
}

interface Conversation {
  id: string;
  lead: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
    company?: string;
    location?: string;
    budget?: string;
    propertyType?: string;
  };
  status: ConversationStatus;
  sentiment: SentimentType;
  lastMessage: string;
  lastMessageTime: Date;
  unread: boolean;
  unreadCount: number;
  channel: "sms" | "email" | "call";
  messages: Message[];
  callTranscript?: string;
  callDuration?: string;
  assignedTo?: string;
  tags: string[];
  starred: boolean;
}

// Mock data - Comprehensive real estate conversations
const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    lead: {
      name: "John Smith",
      phone: "(602) 555-0123",
      email: "john.smith@email.com",
      company: "Smith Investments LLC",
      location: "Phoenix, AZ",
      budget: "$350,000 - $500,000",
      propertyType: "Single Family",
    },
    status: "hot",
    sentiment: "positive",
    lastMessage: "Yes, I am definitely interested in scheduling a showing. What times work for you this weekend?",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
    unread: true,
    unreadCount: 3,
    channel: "sms",
    starred: true,
    tags: ["buyer", "pre-approved", "urgent"],
    messages: [
      { id: "m1", from: "ai", text: "Hi John! This is the AI assistant from Premier Realty. I saw you were looking at properties in Phoenix. Are you still interested in finding your dream home?", time: "10:15 AM", timestamp: new Date(Date.now() - 15 * 60 * 1000), read: true, channel: "sms" },
      { id: "m2", from: "lead", text: "Yes! I've been pre-approved for up to $450K. Looking for something with at least 3 bedrooms.", time: "10:18 AM", timestamp: new Date(Date.now() - 12 * 60 * 1000), read: true, channel: "sms" },
      { id: "m3", from: "ai", text: "That's fantastic! I found 5 properties that match your criteria perfectly. Would you like me to send over the details?", time: "10:19 AM", timestamp: new Date(Date.now() - 11 * 60 * 1000), read: true, channel: "sms" },
      { id: "m4", from: "lead", text: "Yes please! Also, does any of them have a pool? My wife really wants one.", time: "10:22 AM", timestamp: new Date(Date.now() - 8 * 60 * 1000), read: true, channel: "sms" },
      { id: "m5", from: "ai", text: "Great news - 3 of them have pools! I'll highlight those first. Here's the link to view all properties: [Property Gallery Link]", time: "10:23 AM", timestamp: new Date(Date.now() - 7 * 60 * 1000), read: true, channel: "sms" },
      { id: "m6", from: "lead", text: "Yes, I am definitely interested in scheduling a showing. What times work for you this weekend?", time: "10:30 AM", timestamp: new Date(Date.now() - 2 * 60 * 1000), read: false, channel: "sms" },
    ],
  },
  {
    id: "conv-2",
    lead: {
      name: "Sarah Johnson",
      phone: "(480) 555-0456",
      email: "sarah.j@gmail.com",
      location: "Scottsdale, AZ",
      budget: "$400,000 - $600,000",
      propertyType: "Condo/Townhouse",
    },
    status: "needs_response",
    sentiment: "neutral",
    lastMessage: "I noticed the HOA fees seem high. Can you explain what's included?",
    lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
    unread: true,
    unreadCount: 1,
    channel: "email",
    starred: false,
    tags: ["buyer", "first-time"],
    messages: [
      { id: "e1", from: "ai", text: "Subject: Properties in Scottsdale - Your Home Search\n\nHi Sarah,\n\nThank you for your interest in Scottsdale properties! Based on your preferences, I found these amazing options:\n\n1. The Vue at Camelback - $425,000 - 2BR/2BA - Mountain Views\n2. Optima Kierland - $485,000 - 2BR/2.5BA - Resort Living\n3. Scottsdale Waterfront - $520,000 - 3BR/2BA - Downtown Location\n\nWould you like to schedule virtual tours?\n\nBest regards,\nPremier Realty AI Assistant", time: "Yesterday 3:30 PM", timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), read: true, channel: "email" },
      { id: "e2", from: "lead", text: "Hi, thank you for these options! I'm really interested in the Optima Kierland property. It looks beautiful from the photos.\n\nHowever, I noticed the HOA fees seem high. Can you explain what's included? Also, is there any flexibility on the price?", time: "Today 10:00 AM", timestamp: new Date(Date.now() - 15 * 60 * 1000), read: false, channel: "email" },
    ],
  },
  {
    id: "conv-3",
    lead: {
      name: "Mike Wilson",
      phone: "(623) 555-0789",
      email: "mike.wilson@outlook.com",
      company: "Wilson Properties",
      location: "Glendale, AZ",
      budget: "$200,000 - $300,000",
      propertyType: "Investment Property",
    },
    status: "callback",
    sentiment: "positive",
    lastMessage: "Call scheduled for 5:00 PM today",
    lastMessageTime: new Date(Date.now() - 60 * 60 * 1000),
    unread: false,
    unreadCount: 0,
    channel: "call",
    starred: false,
    tags: ["investor", "cash-buyer"],
    callTranscript: "AI: Hi Mike, this is the AI assistant from Premier Realty calling about your investment property inquiry.\n\nMike: Oh yes, hi! I've been looking at multi-family properties in Glendale.\n\nAI: Perfect! We have several excellent investment opportunities. What's your target cap rate?\n\nMike: I'm looking for at least 7% cap rate. I've got about $250K to invest.\n\nAI: I have 3 properties that fit your criteria perfectly. Would you like me to send over the investment analyses?\n\nMike: Yes please. Actually, can we schedule a call for later today? I'll be available after 5pm.\n\nAI: Absolutely! I'll have one of our investment specialists call you at 5 PM. They'll go over all the numbers with you.\n\nMike: Sounds great, talk then!",
    callDuration: "4:23",
    messages: [
      { id: "c1", from: "ai", text: "[Call Recording] Investment property discussion - Multi-family properties in Glendale. Lead interested in 7%+ cap rate properties. Budget: $250K.", time: "9:00 AM", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), read: true, channel: "call" },
      { id: "c2", from: "ai", text: "Callback scheduled for 5:00 PM today with Investment Specialist.", time: "9:05 AM", timestamp: new Date(Date.now() - 60 * 60 * 1000), read: true, channel: "call" },
    ],
  },
  {
    id: "conv-4",
    lead: {
      name: "Emily Chen",
      phone: "(520) 555-0321",
      email: "emily.chen@techstartup.io",
      location: "Tempe, AZ",
      budget: "$300,000 - $400,000",
      propertyType: "Single Family",
    },
    status: "engaged",
    sentiment: "positive",
    lastMessage: "The virtual tour was amazing! When can we see it in person?",
    lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
    unread: false,
    unreadCount: 0,
    channel: "sms",
    starred: true,
    tags: ["buyer", "relocation"],
    messages: [
      { id: "s1", from: "ai", text: "Hi Emily! Following up on your inquiry about homes near ASU. Are you relocating for work?", time: "8:00 AM", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true, channel: "sms" },
      { id: "s2", from: "lead", text: "Yes! Starting a new job at a tech company. Need to move by end of month.", time: "8:15 AM", timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000), read: true, channel: "sms" },
      { id: "s3", from: "ai", text: "Exciting! Here's a virtual tour of a perfect 3BR home 10 min from downtown Tempe: [Tour Link]", time: "8:20 AM", timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), read: true, channel: "sms" },
      { id: "s4", from: "lead", text: "The virtual tour was amazing! When can we see it in person?", time: "9:00 AM", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), read: true, channel: "sms" },
    ],
  },
  {
    id: "conv-5",
    lead: {
      name: "David Martinez",
      phone: "(928) 555-0654",
      email: "david.m@contractor.net",
      company: "Martinez Construction",
      location: "Mesa, AZ",
      budget: "$150,000 - $250,000",
      propertyType: "Fixer-Upper",
    },
    status: "qualified",
    sentiment: "positive",
    lastMessage: "Perfect, let's move forward with the offer.",
    lastMessageTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    unread: false,
    unreadCount: 0,
    channel: "email",
    starred: true,
    tags: ["investor", "contractor", "cash-buyer"],
    messages: [
      { id: "em1", from: "ai", text: "Subject: Fixer-Upper Properties - Great Investment Opportunities\n\nHi David,\n\nI found 3 properties perfect for your flip business:\n\n1. 1245 E Main St - $175K - ARV $280K\n2. 782 N Center Ave - $195K - ARV $310K\n3. 456 W Oak Dr - $165K - ARV $255K\n\nAll have solid bones and are priced below market.\n\nBest,\nPremier Realty AI", time: "Yesterday 2:00 PM", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), read: true, channel: "email" },
      { id: "em2", from: "lead", text: "David here. Property #2 looks promising. What's the repair estimate and how fast can we close?", time: "Yesterday 6:00 PM", timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000), read: true, channel: "email" },
      { id: "em3", from: "human", text: "Hi David! Great choice. Based on our inspection, repair costs are estimated at $45-55K. We can close in as little as 14 days with cash. Want me to prepare the offer paperwork?", time: "Today 7:00 AM", timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), read: true, channel: "email" },
      { id: "em4", from: "lead", text: "Perfect, let's move forward with the offer. I'll have my attorney review and we can sign tomorrow.", time: "Today 8:00 AM", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), read: true, channel: "email" },
    ],
  },
  {
    id: "conv-6",
    lead: {
      name: "Lisa Thompson",
      phone: "(602) 555-9876",
      email: "lisa.t@family.org",
      location: "Chandler, AZ",
      budget: "$450,000 - $600,000",
      propertyType: "Single Family",
    },
    status: "contacted",
    sentiment: "neutral",
    lastMessage: "Thanks for reaching out. I'll discuss with my husband and get back to you.",
    lastMessageTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
    unread: false,
    unreadCount: 0,
    channel: "sms",
    starred: false,
    tags: ["buyer", "family"],
    messages: [
      { id: "sm1", from: "ai", text: "Hi Lisa! I'm following up on your home search in Chandler. Have you found anything you like yet?", time: "Yesterday 4:00 PM", timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000), read: true, channel: "sms" },
      { id: "sm2", from: "lead", text: "Thanks for reaching out. I'll discuss with my husband and get back to you.", time: "Yesterday 6:00 PM", timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), read: true, channel: "sms" },
    ],
  },
  {
    id: "conv-7",
    lead: {
      name: "Robert Kim",
      phone: "(480) 555-4321",
      email: "robert.kim@enterprise.com",
      company: "Kim Enterprises",
      location: "Paradise Valley, AZ",
      budget: "$1,000,000+",
      propertyType: "Luxury Home",
    },
    status: "hot",
    sentiment: "positive",
    lastMessage: "The estate is exactly what we're looking for. Let's schedule a private viewing.",
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unread: true,
    unreadCount: 2,
    channel: "email",
    starred: true,
    tags: ["luxury", "vip", "pre-approved"],
    messages: [
      { id: "lx1", from: "human", text: "Subject: Exclusive Paradise Valley Estates\n\nDear Mr. Kim,\n\nThank you for your interest in our luxury portfolio. I've personally curated a selection of Paradise Valley's finest estates for your consideration:\n\n- 7,200 sqft Mediterranean masterpiece - $2.1M\n- Modern contemporary with Camelback views - $1.8M\n- Private resort-style compound - $2.5M\n\nI'd be honored to arrange private viewings at your convenience.\n\nWarm regards,\nJennifer Adams\nLuxury Specialist", time: "Today 9:00 AM", timestamp: new Date(Date.now() - 60 * 60 * 1000), read: true, channel: "email" },
      { id: "lx2", from: "lead", text: "Jennifer,\n\nThe estate is exactly what we're looking for. The Mediterranean property looks stunning.\n\nLet's schedule a private viewing. We're available Thursday or Friday afternoon.\n\nBest,\nRobert", time: "Today 9:30 AM", timestamp: new Date(Date.now() - 30 * 60 * 1000), read: false, channel: "email" },
    ],
  },
  {
    id: "conv-8",
    lead: {
      name: "Amanda Foster",
      phone: "(623) 555-8765",
      email: "amanda.foster@gmail.com",
      location: "Peoria, AZ",
      budget: "$280,000 - $350,000",
      propertyType: "Single Family",
    },
    status: "new",
    sentiment: "neutral",
    lastMessage: "Just submitted inquiry form",
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unread: true,
    unreadCount: 1,
    channel: "sms",
    starred: false,
    tags: ["new-lead"],
    messages: [
      { id: "nl1", from: "ai", text: "Hi Amanda! Thank you for your interest in Peoria homes. I'm your AI assistant from Premier Realty. I see you're looking in the $280-350K range. What features are most important to you?", time: "Just now", timestamp: new Date(Date.now() - 5 * 60 * 1000), read: false, channel: "sms" },
    ],
  },
];

// Response templates
const responseTemplates = [
  {
    id: "t1",
    name: "Schedule Showing",
    category: "Scheduling",
    template: "Hi {{firstName}}! I'd love to schedule a showing. I have availability on {{dates}}. Which time works best for you?",
  },
  {
    id: "t2",
    name: "Send Property Details",
    category: "Information",
    template: "Here are the details for the property you asked about: {{propertyAddress}}. It features {{features}}. Would you like to see it in person?",
  },
  {
    id: "t3",
    name: "Follow Up - No Response",
    category: "Follow Up",
    template: "Hi {{firstName}}, just checking in! Are you still interested in finding a home in {{area}}? I'm here to help whenever you're ready.",
  },
  {
    id: "t4",
    name: "Price Reduction Alert",
    category: "Alerts",
    template: "Great news {{firstName}}! The property you loved at {{address}} just had a price reduction of {{amount}}. Want to make an offer?",
  },
  {
    id: "t5",
    name: "Pre-Approval Reminder",
    category: "Qualification",
    template: "Hi {{firstName}}! Having a pre-approval letter ready can make your offer stronger. Would you like me to connect you with our preferred lender?",
  },
];

// AI smart replies based on context
const generateSmartReplies = (conversation: Conversation): string[] => {
  const status = conversation.status;
  const lastMsg = conversation.lastMessage.toLowerCase();

  if (lastMsg.includes("schedule") || lastMsg.includes("showing") || lastMsg.includes("view")) {
    return [
      "I have openings Saturday at 10am, 2pm, or Sunday at 1pm. Which works best?",
      "Let me check the seller's availability and get back to you within the hour.",
      "Great! I'll send you a calendar invite. What's your preferred contact method?",
    ];
  }

  if (lastMsg.includes("price") || lastMsg.includes("cost") || lastMsg.includes("hoa")) {
    return [
      "The HOA covers water, trash, landscaping, pool, and gym access - great value!",
      "I can provide a full cost breakdown including taxes and HOA. Would that help?",
      "There may be room for negotiation. Want me to discuss with the seller?",
    ];
  }

  if (status === "hot") {
    return [
      "Perfect! Let's schedule a time to discuss next steps.",
      "I'll prepare the paperwork right away. When can you meet?",
      "Excellent! This property is getting a lot of interest. Let's move quickly.",
    ];
  }

  if (status === "needs_response") {
    return [
      "Thanks for your patience! I'm looking into this and will respond shortly.",
      "Great question! Let me get you the accurate information.",
      "I appreciate you reaching out. Here's what I found...",
    ];
  }

  return [
    "Thanks for your message! How can I help you today?",
    "I'd be happy to help with that. Let me check...",
    "Is there anything specific you'd like to know?",
  ];
};

// Helper functions
const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getChannelIcon = (channel: string) => {
  switch (channel) {
    case "sms": return MessageSquare;
    case "email": return Mail;
    case "call": return Phone;
    default: return MessageSquare;
  }
};

const getChannelColor = (channel: string) => {
  switch (channel) {
    case "sms": return "emerald";
    case "email": return "blue";
    case "call": return "violet";
    default: return "zinc";
  }
};

const getSentimentIcon = (sentiment: SentimentType) => {
  switch (sentiment) {
    case "positive": return Smile;
    case "neutral": return Meh;
    case "negative": return Frown;
  }
};

const getSentimentColor = (sentiment: SentimentType) => {
  switch (sentiment) {
    case "positive": return "text-emerald-400";
    case "neutral": return "text-amber-400";
    case "negative": return "text-red-400";
  }
};

export default function ConversationsPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>("conv-1");
  const [activeChannel, setActiveChannel] = useState<ChannelType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedConversations, setSelectedConversations] = useState<Set<string>>(new Set());
  const [showTemplates, setShowTemplates] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [playingTranscript, setPlayingTranscript] = useState(false);
  const [dateRange, setDateRange] = useState("all");

  // Stats calculations
  const stats = useMemo(() => {
    const total = mockConversations.length;
    const unread = mockConversations.filter(c => c.unread).length;
    const avgResponseTime = "2.4 min"; // Mock
    const positiveCount = mockConversations.filter(c => c.sentiment === "positive").length;
    const sentimentScore = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
    return { total, unread, avgResponseTime, sentimentScore };
  }, []);

  // Filtered conversations
  const filteredConversations = useMemo(() => {
    return mockConversations.filter(conv => {
      // Channel filter
      if (activeChannel !== "all" && conv.channel !== activeChannel) return false;

      // Status filter
      if (selectedFilter !== "all") {
        if (selectedFilter === "unread" && !conv.unread) return false;
        if (selectedFilter === "starred" && !conv.starred) return false;
        if (selectedFilter !== "unread" && selectedFilter !== "starred" && conv.status !== selectedFilter) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          conv.lead.name.toLowerCase().includes(query) ||
          conv.lead.email.toLowerCase().includes(query) ||
          conv.lead.phone.includes(query) ||
          conv.lastMessage.toLowerCase().includes(query) ||
          conv.tags.some(t => t.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [activeChannel, selectedFilter, searchQuery]);

  const selectedConversation = mockConversations.find(c => c.id === selectedConversationId);
  const smartReplies = selectedConversation ? generateSmartReplies(selectedConversation) : [];

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedConversations.size === filteredConversations.length) {
      setSelectedConversations(new Set());
    } else {
      setSelectedConversations(new Set(filteredConversations.map(c => c.id)));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBulkAction = (action: string) => {
    // TODO: Implement bulk action handling
    setSelectedConversations(new Set());
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Conversations</h1>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">Unified inbox for all lead communications</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Sync</span>
            </button>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex-shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-xs text-zinc-400">Total Conversations</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.total}</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">+8%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-orange-500/20 bg-zinc-900 p-3 sm:p-4 ring-1 ring-orange-500/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-xs text-zinc-400">Unread Messages</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.unread}</span>
            <span className="text-xs text-orange-400">Needs attention</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-xs text-zinc-400">Avg Response Time</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.avgResponseTime}</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">-15%</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs text-zinc-400">Sentiment Score</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.sentimentScore}%</span>
            <Smile className="w-4 h-4 text-emerald-400" />
          </div>
        </motion.div>
      </div>

      {/* Channel Tabs & Filters */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Channel Tabs */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/50 rounded-lg border border-zinc-800 w-fit">
          {[
            { key: "all", label: "All", icon: Users, count: mockConversations.length },
            { key: "sms", label: "SMS", icon: MessageSquare, count: mockConversations.filter(c => c.channel === "sms").length },
            { key: "email", label: "Email", icon: Mail, count: mockConversations.filter(c => c.channel === "email").length },
            { key: "call", label: "Calls", icon: Phone, count: mockConversations.filter(c => c.channel === "call").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveChannel(tab.key as ChannelType)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                activeChannel === tab.key
                  ? tab.key === "sms" ? "bg-emerald-500/20 text-emerald-400"
                    : tab.key === "email" ? "bg-blue-500/20 text-blue-400"
                    : tab.key === "call" ? "bg-violet-500/20 text-violet-400"
                    : "bg-zinc-700 text-white"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className={cn(
                "px-1.5 py-0.5 text-[10px] rounded",
                activeChannel === tab.key
                  ? tab.key === "sms" ? "bg-emerald-500/10 text-emerald-400"
                    : tab.key === "email" ? "bg-blue-500/10 text-blue-400"
                    : tab.key === "call" ? "bg-violet-500/10 text-violet-400"
                    : "bg-zinc-600 text-zinc-300"
                  : "bg-zinc-800 text-zinc-500"
              )}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-2 flex-1 sm:flex-none sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-2 rounded-lg border transition-colors",
              showFilters
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
            )}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex-shrink-0 mb-4 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
              {[
                { key: "all", label: "All" },
                { key: "unread", label: "Unread" },
                { key: "starred", label: "Starred" },
                { key: "hot", label: "Hot Leads" },
                { key: "needs_response", label: "Needs Response" },
                { key: "callback", label: "Callbacks" },
                { key: "qualified", label: "Qualified" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                    selectedFilter === filter.key
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions Bar */}
      <AnimatePresence>
        {selectedConversations.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-shrink-0 flex items-center justify-between p-3 mb-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm text-emerald-400 font-medium">
                {selectedConversations.size} selected
              </span>
              <button
                onClick={() => setSelectedConversations(new Set())}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBulkAction("read")}
                className="px-3 py-1.5 bg-zinc-800 rounded-lg text-xs text-zinc-300 hover:bg-zinc-700 flex items-center gap-1.5"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark Read
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                className="px-3 py-1.5 bg-zinc-800 rounded-lg text-xs text-zinc-300 hover:bg-zinc-700 flex items-center gap-1.5"
              >
                <Archive className="w-3.5 h-3.5" />
                Archive
              </button>
              <button
                onClick={() => handleBulkAction("assign")}
                className="px-3 py-1.5 bg-zinc-800 rounded-lg text-xs text-zinc-300 hover:bg-zinc-700 flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                Assign
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Split Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0 overflow-hidden">
        {/* Conversation List */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col min-h-0">
          <DashboardCard hover={false} className="flex-1 flex flex-col overflow-hidden p-0">
            {/* List Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedConversations.size === filteredConversations.length && filteredConversations.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-xs text-zinc-500">
                  {filteredConversations.length} conversations
                </span>
              </div>
              <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            {/* Conversation Items */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-zinc-700 mb-3" />
                  <p className="text-zinc-500 text-sm">No conversations found</p>
                  <p className="text-zinc-600 text-xs mt-1">Try adjusting your filters</p>
                </div>
              ) : (
                filteredConversations.map((conversation, index) => {
                  const ChannelIcon = getChannelIcon(conversation.channel);
                  const channelColor = getChannelColor(conversation.channel);
                  const isSelected = selectedConversationId === conversation.id;
                  const isChecked = selectedConversations.has(conversation.id);

                  return (
                    <motion.div
                      key={conversation.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedConversationId(conversation.id)}
                      className={cn(
                        "flex items-start gap-3 p-4 cursor-pointer transition-colors border-b border-zinc-800/50",
                        isSelected
                          ? `bg-${channelColor}-500/5 border-l-2 border-l-${channelColor}-500`
                          : "hover:bg-zinc-800/30",
                        isSelected && channelColor === "emerald" && "border-l-emerald-500",
                        isSelected && channelColor === "blue" && "border-l-blue-500",
                        isSelected && channelColor === "violet" && "border-l-violet-500"
                      )}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          e.stopPropagation();
                          const newSet = new Set(selectedConversations);
                          if (isChecked) {
                            newSet.delete(conversation.id);
                          } else {
                            newSet.add(conversation.id);
                          }
                          setSelectedConversations(newSet);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 flex-shrink-0"
                      />

                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm",
                          conversation.channel === "sms" && "bg-gradient-to-br from-emerald-500 to-teal-600",
                          conversation.channel === "email" && "bg-gradient-to-br from-blue-500 to-indigo-600",
                          conversation.channel === "call" && "bg-gradient-to-br from-violet-500 to-purple-600"
                        )}>
                          {conversation.lead.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        {conversation.unread && (
                          <span className={cn(
                            "absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900",
                            conversation.channel === "sms" && "bg-emerald-500",
                            conversation.channel === "email" && "bg-blue-500",
                            conversation.channel === "call" && "bg-violet-500"
                          )} />
                        )}
                        {conversation.starred && (
                          <Star className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-amber-400 fill-amber-400" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={cn(
                            "font-medium truncate",
                            conversation.unread ? "text-white" : "text-zinc-400"
                          )}>
                            {conversation.lead.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 flex-shrink-0">
                            {formatTimestamp(conversation.lastMessageTime)}
                          </span>
                        </div>

                        {/* Channel & Status */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className={cn(
                            "flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]",
                            conversation.channel === "sms" && "bg-emerald-500/10 text-emerald-400",
                            conversation.channel === "email" && "bg-blue-500/10 text-blue-400",
                            conversation.channel === "call" && "bg-violet-500/10 text-violet-400"
                          )}>
                            <ChannelIcon className="w-2.5 h-2.5" />
                            {conversation.channel.toUpperCase()}
                          </div>
                          <StatusBadge status={conversation.status} size="sm" />
                        </div>

                        {/* Message Preview */}
                        <p className={cn(
                          "text-xs truncate",
                          conversation.unread ? "text-zinc-300" : "text-zinc-500"
                        )}>
                          {conversation.lastMessage}
                        </p>

                        {/* Tags */}
                        {conversation.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            {conversation.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 bg-zinc-800 text-zinc-500 text-[10px] rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {conversation.tags.length > 2 && (
                              <span className="text-[10px] text-zinc-600">
                                +{conversation.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Unread Count */}
                      {conversation.unreadCount > 0 && (
                        <span className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium text-white",
                          conversation.channel === "sms" && "bg-emerald-500",
                          conversation.channel === "email" && "bg-blue-500",
                          conversation.channel === "call" && "bg-violet-500"
                        )}>
                          {conversation.unreadCount}
                        </span>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </DashboardCard>
        </div>

        {/* Conversation Detail */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col min-h-0">
          {selectedConversation ? (
            <DashboardCard hover={false} className="flex-1 flex flex-col overflow-hidden p-0">
              {/* Detail Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium",
                    selectedConversation.channel === "sms" && "bg-gradient-to-br from-emerald-500 to-teal-600",
                    selectedConversation.channel === "email" && "bg-gradient-to-br from-blue-500 to-indigo-600",
                    selectedConversation.channel === "call" && "bg-gradient-to-br from-violet-500 to-purple-600"
                  )}>
                    {selectedConversation.lead.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-medium">{selectedConversation.lead.name}</h3>
                      <StatusBadge status={selectedConversation.status} />
                      {(() => {
                        const SentimentIcon = getSentimentIcon(selectedConversation.sentiment);
                        return <SentimentIcon className={cn("w-4 h-4", getSentimentColor(selectedConversation.sentiment))} />;
                      })()}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {selectedConversation.lead.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {selectedConversation.lead.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // Toggle starred
                    }}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      selectedConversation.starred
                        ? "text-amber-400 bg-amber-500/10"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    )}
                  >
                    <Star className={cn("w-4 h-4", selectedConversation.starred && "fill-current")} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Messages */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Call Transcript Player (if call) */}
                  {selectedConversation.channel === "call" && selectedConversation.callTranscript && (
                    <div className="p-4 border-b border-zinc-800 bg-violet-500/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4 text-violet-400" />
                          <span className="text-sm font-medium text-white">Call Recording</span>
                          <span className="text-xs text-zinc-500">{selectedConversation.callDuration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPlayingTranscript(!playingTranscript)}
                            className="p-2 rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/30 transition-colors"
                          >
                            {playingTranscript ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-zinc-900 rounded-lg max-h-32 overflow-y-auto">
                        <pre className="text-xs text-zinc-400 whitespace-pre-wrap font-mono">
                          {selectedConversation.callTranscript}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation.messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "flex",
                          message.from === "lead" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] p-4 rounded-2xl",
                            message.from === "lead"
                              ? selectedConversation.channel === "sms"
                                ? "bg-emerald-500/20 text-emerald-50 rounded-tr-sm"
                                : selectedConversation.channel === "email"
                                  ? "bg-blue-500/20 text-blue-50 rounded-tr-sm"
                                  : "bg-violet-500/20 text-violet-50 rounded-tr-sm"
                              : message.from === "ai"
                                ? "bg-zinc-800 text-zinc-200 rounded-tl-sm"
                                : "bg-cyan-500/20 text-cyan-50 rounded-tl-sm"
                          )}
                        >
                          {/* Sender Indicator */}
                          <div className="flex items-center gap-1.5 mb-2">
                            {message.from === "ai" ? (
                              <>
                                <Bot className="w-3.5 h-3.5 text-violet-400" />
                                <span className="text-[11px] text-violet-400 font-medium">AI Assistant</span>
                              </>
                            ) : message.from === "human" ? (
                              <>
                                <User className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-[11px] text-cyan-400 font-medium">Agent</span>
                              </>
                            ) : (
                              <>
                                <User className="w-3.5 h-3.5 text-zinc-400" />
                                <span className="text-[11px] text-zinc-400 font-medium">{selectedConversation.lead.name}</span>
                              </>
                            )}
                          </div>

                          {/* Message Content */}
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>

                          {/* Timestamp & Actions */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              <span className="text-[11px] text-zinc-500">{message.time}</span>
                              {message.read && message.from !== "lead" && (
                                <CheckCheck className="w-3 h-3 text-blue-400 ml-1" />
                              )}
                            </div>
                            {message.from !== "lead" && (
                              <div className="flex items-center gap-1">
                                <button className="p-1 rounded hover:bg-white/10 transition-colors">
                                  <Copy className="w-3 h-3 text-zinc-500" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI Smart Replies */}
                  <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                      <span className="text-[11px] text-zinc-500 font-medium">AI Suggested Replies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {smartReplies.map((reply, index) => (
                        <button
                          key={index}
                          onClick={() => setMessageInput(reply)}
                          className="px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-300 hover:bg-zinc-700 hover:border-zinc-600 transition-colors truncate max-w-[200px]"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={cn(
                          "p-2.5 rounded-lg transition-colors flex-shrink-0",
                          showTemplates
                            ? "bg-violet-500/20 text-violet-400"
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        )}
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Type your message..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-emerald-500 pr-24"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <select className="bg-transparent border-none text-xs text-zinc-400 focus:outline-none">
                            <option value="sms">SMS</option>
                            <option value="email">Email</option>
                          </select>
                        </div>
                      </div>
                      <button className={cn(
                        "p-3 rounded-xl transition-colors flex-shrink-0",
                        selectedConversation.channel === "sms" && "bg-emerald-500 hover:bg-emerald-400",
                        selectedConversation.channel === "email" && "bg-blue-500 hover:bg-blue-400",
                        selectedConversation.channel === "call" && "bg-violet-500 hover:bg-violet-400"
                      )}>
                        <Send className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Templates Dropdown */}
                    <AnimatePresence>
                      {showTemplates && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-3 p-3 bg-zinc-800 rounded-xl border border-zinc-700"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-white">Response Templates</span>
                            <button
                              onClick={() => setShowTemplates(false)}
                              className="p-1 rounded hover:bg-zinc-700"
                            >
                              <X className="w-3.5 h-3.5 text-zinc-500" />
                            </button>
                          </div>
                          <div className="space-y-2 max-h-48 overflow-y-auto">
                            {responseTemplates.map((template) => (
                              <button
                                key={template.id}
                                onClick={() => {
                                  setMessageInput(template.template);
                                  setShowTemplates(false);
                                }}
                                className="w-full p-3 bg-zinc-900 rounded-lg text-left hover:bg-zinc-700 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-white">{template.name}</span>
                                  <span className="text-[10px] px-2 py-0.5 bg-zinc-700 text-zinc-400 rounded">
                                    {template.category}
                                  </span>
                                </div>
                                <p className="text-xs text-zinc-500 truncate">{template.template}</p>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Lead Info Sidebar */}
                <div className="hidden xl:block w-72 border-l border-zinc-800 overflow-y-auto">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-white mb-4">Lead Information</h4>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      {selectedConversation.lead.company && (
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm text-zinc-300">{selectedConversation.lead.company}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-300">{selectedConversation.lead.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <DollarSign className="w-4 h-4 text-zinc-500" />
                        <span className="text-sm text-zinc-300">{selectedConversation.lead.budget}</span>
                      </div>
                      {selectedConversation.lead.propertyType && (
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-zinc-500" />
                          <span className="text-sm text-zinc-300">{selectedConversation.lead.propertyType}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500 font-medium">Tags</span>
                        <button className="text-xs text-emerald-400 hover:text-emerald-300">+ Add</button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedConversation.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full flex items-center gap-1"
                          >
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2">
                      <span className="text-xs text-zinc-500 font-medium">Quick Actions</span>
                      <div className="space-y-1.5">
                        <button className="w-full px-3 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Schedule Showing
                        </button>
                        <button className="w-full px-3 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Lead
                        </button>
                        <button className="w-full px-3 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          View in CRM
                        </button>
                        <button className="w-full px-3 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Assign to Agent
                        </button>
                      </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="mt-6">
                      <span className="text-xs text-zinc-500 font-medium">Recent Activity</span>
                      <div className="mt-3 space-y-3">
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-3 h-3 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300">Message received</p>
                            <p className="text-[10px] text-zinc-500">{formatTimestamp(selectedConversation.lastMessageTime)}</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3 h-3 text-blue-400" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300">Property list sent</p>
                            <p className="text-[10px] text-zinc-500">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-3 h-3 text-violet-400" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-300">Lead created</p>
                            <p className="text-[10px] text-zinc-500">Yesterday</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardCard>
          ) : (
            <DashboardCard hover={false} className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Select a conversation</h3>
                <p className="text-zinc-500 text-sm max-w-sm">
                  Choose a conversation from the list to view messages and respond to leads
                </p>
              </div>
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}
