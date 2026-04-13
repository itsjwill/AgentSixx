"use client";

import { StatusBadge } from "@/components/custom/status-badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Flame,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  MessageSquare,
  Clock,
  Calendar,
  Zap,
  DollarSign,
  Users,
  Target,
  Bell,
  CheckCircle2,
  AlertCircle,
  Play,
  Send,
  Upload,
  ChevronRight,
  Activity,
  Sparkles,
  PhoneCall,
  PhoneOff,
  UserPlus,
  CalendarCheck,
  MessageCircle,
  BarChart3,
  PieChart,
  Filter,
  RefreshCw,
  Settings,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// ============================================
// MOCK DATA - Realistic AgentSix Data
// ============================================

const mockUser = {
  name: "Marcus",
  company: "Apex Realty Group",
  avatar: "MR",
  plan: "Enterprise",
};

const mockStats = {
  totalLeads: 2847,
  leadsTrend: 12.5,
  callsToday: 156,
  callsYesterday: 142,
  appointmentsWeek: 23,
  appointmentsTrend: 8.3,
  revenuePipeline: 847500,
  revenueTrend: 15.2,
  activeCampaigns: 7,
  connectionRate: 34.2,
  avgCallDuration: "2:34",
  voicemailRate: 28.4,
};

const mockLiveActivity = [
  { id: 1, type: "call_started", lead: "Jennifer Martinez", phone: "(480) 555-1234", time: "Just now", status: "in_progress" },
  { id: 2, type: "appointment", lead: "Robert Chen", message: "Demo scheduled for tomorrow 2:00 PM", time: "2m ago" },
  { id: 3, type: "hot_lead", lead: "Sarah Williams", message: "Marked hot - requesting pricing", time: "4m ago" },
  { id: 4, type: "sms_received", lead: "Michael Brown", message: "Yes, I'm interested. Call me after 3pm", time: "7m ago" },
  { id: 5, type: "call_ended", lead: "David Lee", message: "Connected - 4:23 duration, follow-up needed", time: "12m ago" },
  { id: 6, type: "new_lead", lead: "Amanda Thompson", message: "Imported from Zillow campaign", time: "15m ago" },
  { id: 7, type: "sms_sent", lead: "James Wilson", message: "Follow-up SMS delivered", time: "18m ago" },
  { id: 8, type: "voicemail", lead: "Lisa Anderson", message: "Voicemail left - sequence position 2", time: "22m ago" },
];

const mockTodaySchedule = [
  { id: 1, time: "10:00 AM", lead: "Jennifer Martinez", type: "Follow-up Call", priority: "high", status: "in_progress" },
  { id: 2, time: "11:30 AM", lead: "Tech Startup Lead", type: "Discovery Call", priority: "medium", status: "upcoming" },
  { id: 3, time: "2:00 PM", lead: "Robert Chen", type: "Demo Presentation", priority: "high", status: "upcoming" },
  { id: 4, time: "3:30 PM", lead: "Sarah Williams", type: "Pricing Discussion", priority: "hot", status: "upcoming" },
  { id: 5, time: "4:45 PM", lead: "Batch Callback List", type: "Callback Queue (12)", priority: "medium", status: "upcoming" },
];

const mockPerformanceData = {
  weekly: [
    { day: "Mon", calls: 145, connections: 48, appointments: 4 },
    { day: "Tue", calls: 167, connections: 52, appointments: 6 },
    { day: "Wed", calls: 134, connections: 41, appointments: 3 },
    { day: "Thu", calls: 189, connections: 67, appointments: 8 },
    { day: "Fri", calls: 156, connections: 53, appointments: 5 },
    { day: "Sat", calls: 78, connections: 24, appointments: 2 },
    { day: "Sun", calls: 0, connections: 0, appointments: 0 },
  ],
};

const mockHotLeads = [
  { id: 1, name: "Sarah Williams", company: "Williams Investments", value: "$125,000", score: 95, lastContact: "4m ago", status: "hot" },
  { id: 2, name: "Robert Chen", company: "Chen Properties", value: "$89,000", score: 88, lastContact: "2h ago", status: "hot" },
  { id: 3, name: "Michael Brown", company: "Brown Capital", value: "$67,500", score: 82, lastContact: "1h ago", status: "qualified" },
  { id: 4, name: "Amanda Thompson", company: "Thompson RE Group", value: "$145,000", score: 79, lastContact: "3h ago", status: "engaged" },
  { id: 5, name: "David Lee", company: "Lee & Associates", value: "$52,000", score: 75, lastContact: "4h ago", status: "qualified" },
];

const mockCampaigns = [
  { id: 1, name: "Q1 Investor Outreach", status: "active", leads: 847, called: 623, connected: 198, appointments: 12, conversionRate: 1.9 },
  { id: 2, name: "Zillow Hot Leads", status: "active", leads: 234, called: 156, connected: 67, appointments: 8, conversionRate: 5.1 },
  { id: 3, name: "Past Client Re-engagement", status: "active", leads: 189, called: 145, connected: 89, appointments: 6, conversionRate: 4.1 },
  { id: 4, name: "Commercial Prospects", status: "paused", leads: 456, called: 234, connected: 78, appointments: 4, conversionRate: 1.7 },
];

const mockAlerts = [
  { id: 1, type: "urgent", title: "3 hot leads awaiting callback", message: "Sarah Williams, Robert Chen, and 1 other requested callbacks", time: "5m ago" },
  { id: 2, type: "warning", title: "Campaign 'Q1 Investor' at 73% completion", message: "Consider importing more leads to maintain call volume", time: "1h ago" },
  { id: 3, type: "info", title: "Voice minutes running low", message: "1,247 of 2,000 minutes used (62%). Consider upgrading.", time: "2h ago" },
  { id: 4, type: "success", title: "New integration available", message: "Connect Salesforce to sync leads automatically", time: "4h ago" },
];

const mockTeamActivity = [
  { id: 1, name: "AI Agent - Laura", role: "SDR", calls: 89, appointments: 5, status: "active", avatar: "LA" },
  { id: 2, name: "AI Agent - Marcus", role: "Closer", calls: 67, appointments: 8, status: "active", avatar: "MA" },
  { id: 3, name: "Human - You", role: "Manager", calls: 0, appointments: 0, status: "reviewing", avatar: mockUser.avatar },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const cardHover = {
  scale: 1.01,
  transition: { duration: 0.2 },
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity },
};

// ============================================
// HELPER COMPONENTS
// ============================================

function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  iconBg,
  iconColor,
  highlight = false,
  prefix = "",
  suffix = "",
}: {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  highlight?: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const isPositive = trend && trend > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={cardHover}
      className={`relative rounded-xl border p-5 transition-all duration-300 ${
        highlight
          ? "border-emerald-500/30 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 ring-1 ring-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.25)]"
          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
            </div>
            <span className="text-sm font-medium text-zinc-400">{title}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white tracking-tight">
              {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
            </span>
          </div>
        </div>

        {trend !== undefined && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            isPositive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trend).toFixed(1)}%</span>
          </div>
        )}
      </div>

      {trendLabel && (
        <p className="mt-2 text-xs text-zinc-500">{trendLabel}</p>
      )}
    </motion.div>
  );
}

function LiveActivityItem({ item }: { item: typeof mockLiveActivity[0] }) {
  const getIcon = () => {
    switch (item.type) {
      case "call_started": return <PhoneCall className="w-4 h-4" />;
      case "call_ended": return <Phone className="w-4 h-4" />;
      case "appointment": return <CalendarCheck className="w-4 h-4" />;
      case "hot_lead": return <Flame className="w-4 h-4" />;
      case "sms_received": return <MessageCircle className="w-4 h-4" />;
      case "sms_sent": return <Send className="w-4 h-4" />;
      case "new_lead": return <UserPlus className="w-4 h-4" />;
      case "voicemail": return <PhoneOff className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getColors = () => {
    switch (item.type) {
      case "call_started": return "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30";
      case "call_ended": return "bg-blue-500/20 text-blue-400 ring-blue-500/30";
      case "appointment": return "bg-violet-500/20 text-violet-400 ring-violet-500/30";
      case "hot_lead": return "bg-orange-500/20 text-orange-400 ring-orange-500/30";
      case "sms_received": return "bg-cyan-500/20 text-cyan-400 ring-cyan-500/30";
      case "sms_sent": return "bg-teal-500/20 text-teal-400 ring-teal-500/30";
      case "new_lead": return "bg-indigo-500/20 text-indigo-400 ring-indigo-500/30";
      case "voicemail": return "bg-amber-500/20 text-amber-400 ring-amber-500/30";
      default: return "bg-zinc-500/20 text-zinc-400 ring-zinc-500/30";
    }
  };

  const isLive = item.type === "call_started";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
        isLive ? "bg-emerald-500/5 ring-1 ring-emerald-500/20" : "hover:bg-zinc-800/30"
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-1 ${getColors()}`}>
        {getIcon()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-white text-sm">{item.lead}</span>
          {isLive && (
            <motion.span
              animate={pulseAnimation}
              className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </motion.span>
          )}
        </div>
        <p className="text-xs text-zinc-500 truncate mt-0.5">
          {item.message || item.phone}
        </p>
      </div>
      <span className="text-[10px] text-zinc-600 whitespace-nowrap">{item.time}</span>
    </motion.div>
  );
}

function ScheduleItem({ item }: { item: typeof mockTodaySchedule[0] }) {
  const priorityColors = {
    hot: "border-l-orange-500 bg-orange-500/5",
    high: "border-l-red-500 bg-red-500/5",
    medium: "border-l-yellow-500 bg-yellow-500/5",
    low: "border-l-zinc-500",
  };

  const statusColors = {
    in_progress: "text-emerald-400 bg-emerald-500/10",
    upcoming: "text-zinc-400 bg-zinc-500/10",
    completed: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg border-l-2 ${priorityColors[item.priority as keyof typeof priorityColors] || priorityColors.medium}`}>
      <div className="text-center min-w-[60px]">
        <span className="text-sm font-semibold text-white">{item.time}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white text-sm truncate">{item.lead}</p>
        <p className="text-xs text-zinc-500">{item.type}</p>
      </div>
      <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}>
        {item.status === "in_progress" ? "In Progress" : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
      </span>
    </div>
  );
}

function MiniBarChart({ data }: { data: typeof mockPerformanceData.weekly }) {
  const maxCalls = Math.max(...data.map(d => d.calls));

  return (
    <div className="flex items-end justify-between gap-2 h-32 px-2">
      {data.map((day, i) => (
        <div key={day.day} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full flex flex-col items-center gap-0.5 h-24 justify-end">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(day.calls / maxCalls) * 100}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full max-w-[24px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm relative group cursor-pointer"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {day.calls} calls
              </div>
            </motion.div>
          </div>
          <span className="text-[10px] text-zinc-500 font-medium">{day.day}</span>
        </div>
      ))}
    </div>
  );
}

function CampaignRow({ campaign }: { campaign: typeof mockCampaigns[0] }) {
  const progress = (campaign.called / campaign.leads) * 100;

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-white text-sm truncate">{campaign.name}</p>
          <StatusBadge status={campaign.status} size="sm" />
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex-1 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
            />
          </div>
          <span className="text-[10px] text-zinc-500 whitespace-nowrap">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="flex items-center gap-6 text-right">
        <div>
          <p className="text-sm font-semibold text-white">{campaign.connected}</p>
          <p className="text-[10px] text-zinc-500">Connected</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-400">{campaign.appointments}</p>
          <p className="text-[10px] text-zinc-500">Booked</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{campaign.conversionRate}%</p>
          <p className="text-[10px] text-zinc-500">Conv.</p>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ alert }: { alert: typeof mockAlerts[0] }) {
  const icons = {
    urgent: <AlertCircle className="w-4 h-4" />,
    warning: <AlertCircle className="w-4 h-4" />,
    info: <Bell className="w-4 h-4" />,
    success: <CheckCircle2 className="w-4 h-4" />,
  };

  const colors = {
    urgent: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${colors[alert.type as keyof typeof colors]}`}>
      <div className="mt-0.5">{icons[alert.type as keyof typeof icons]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white text-sm">{alert.title}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{alert.message}</p>
      </div>
      <span className="text-[10px] text-zinc-500">{alert.time}</span>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 bg-zinc-950 text-white min-h-screen"
    >
      {/* ============================================ */}
      {/* WELCOME HEADER */}
      {/* ============================================ */}
      <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/25">
              {mockUser.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {greeting()}, {mockUser.name}
              </h1>
              <p className="text-zinc-400 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Time Filter */}
          <div className="relative">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="appearance-none px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 pr-8 cursor-pointer hover:border-zinc-700 transition-colors"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>

          {/* Quick Actions */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-600/25"
          >
            <Play className="w-4 h-4" />
            Start Calling
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors border border-zinc-700"
          >
            <Upload className="w-4 h-4" />
            Import Leads
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg transition-colors border border-zinc-700"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* KEY PERFORMANCE CARDS */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        <StatCard
          title="Total Leads"
          value={mockStats.totalLeads}
          trend={mockStats.leadsTrend}
          trendLabel="vs last period"
          icon={Users}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />

        <StatCard
          title="Calls Today"
          value={mockStats.callsToday}
          trend={mockStats.callsYesterday > 0 ? ((mockStats.callsToday - mockStats.callsYesterday) / mockStats.callsYesterday * 100) : 0}
          trendLabel={`${mockStats.callsYesterday} yesterday`}
          icon={Phone}
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
          highlight
        />

        <StatCard
          title="Appointments"
          value={mockStats.appointmentsWeek}
          trend={mockStats.appointmentsTrend}
          trendLabel="This week"
          icon={CalendarCheck}
          iconBg="bg-violet-500/10"
          iconColor="text-violet-400"
        />

        <StatCard
          title="Pipeline Value"
          value={`$${(mockStats.revenuePipeline / 1000).toFixed(0)}K`}
          trend={mockStats.revenueTrend}
          trendLabel="Potential revenue"
          icon={DollarSign}
          iconBg="bg-amber-500/10"
          iconColor="text-amber-400"
        />

        <StatCard
          title="Active Campaigns"
          value={mockStats.activeCampaigns}
          trendLabel={`${mockStats.connectionRate}% connect rate`}
          icon={Target}
          iconBg="bg-cyan-500/10"
          iconColor="text-cyan-400"
        />
      </div>

      {/* ============================================ */}
      {/* MAIN CONTENT GRID */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN - Live Activity Feed */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden h-full">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h2 className="font-semibold text-white">Live Activity</h2>
                <motion.span
                  animate={pulseAnimation}
                  className="w-2 h-2 rounded-full bg-emerald-400"
                />
              </div>
              <button className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
                <Filter className="w-3 h-3" />
                Filter
              </button>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
              <AnimatePresence>
                {mockLiveActivity.map((item) => (
                  <LiveActivityItem key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
              <Link href="/dashboard/activity" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1">
                View All Activity <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CENTER COLUMN - Performance Chart + Schedule */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          {/* Performance Chart */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <h2 className="font-semibold text-white">Weekly Performance</h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Calls
                </span>
              </div>
            </div>
            <MiniBarChart data={mockPerformanceData.weekly} />
            <div className="mt-4 grid grid-cols-3 gap-1 xs:gap-2 sm:gap-4 pt-4 border-t border-zinc-800">
              <div className="text-center">
                <p className="text-base xs:text-lg font-bold text-white">869</p>
                <p className="text-[9px] xs:text-[10px] text-zinc-500">Total Calls</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-400">285</p>
                <p className="text-[10px] text-zinc-500">Connected</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-violet-400">28</p>
                <p className="text-[10px] text-zinc-500">Booked</p>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h2 className="font-semibold text-white">Today&apos;s Schedule</h2>
              </div>
              <span className="text-xs text-zinc-400">{mockTodaySchedule.length} items</span>
            </div>
            <div className="p-2 space-y-2">
              {mockTodaySchedule.slice(0, 4).map((item) => (
                <ScheduleItem key={item.id} item={item} />
              ))}
            </div>
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
              <Link href="/dashboard/schedule" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1">
                View Full Schedule <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - Hot Leads + Alerts */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          {/* Hot Leads */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <h2 className="font-semibold text-white">Top Leads</h2>
              </div>
              <Link href="/dashboard/leads?filter=hot" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-2">
              {mockHotLeads.slice(0, 4).map((lead) => (
                <div key={lead.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800/30 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
                    {lead.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white text-sm truncate">{lead.name}</p>
                      <StatusBadge status={lead.status} size="sm" />
                    </div>
                    <p className="text-xs text-zinc-500 truncate">{lead.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">{lead.value}</p>
                    <p className="text-[10px] text-zinc-500">{lead.lastContact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-400" />
                <h2 className="font-semibold text-white">Alerts</h2>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {mockAlerts.filter(a => a.type === "urgent").length}
                </span>
              </div>
              <button className="text-xs text-zinc-400 hover:text-white">Mark all read</button>
            </div>
            <div className="p-2 space-y-2">
              {mockAlerts.slice(0, 3).map((alert) => (
                <AlertItem key={alert.id} alert={alert} />
              ))}
            </div>
            <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
              <Link href="/dashboard/notifications" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1">
                View All Notifications <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* CAMPAIGN PERFORMANCE */}
      {/* ============================================ */}
      <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="font-semibold text-white">Campaign Performance</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/campaigns/new" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              New Campaign
            </Link>
            <Link href="/dashboard/campaigns" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {mockCampaigns.map((campaign) => (
            <CampaignRow key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </motion.div>

      {/* ============================================ */}
      {/* QUICK ACTIONS + TEAM ACTIVITY */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <motion.div variants={itemVariants} className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-sm font-medium text-white">Start Calling</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-sm font-medium text-white">Send Bulk SMS</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white">Import Leads</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                <PieChart className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm font-medium text-white">View Reports</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Team Activity */}
        <motion.div variants={itemVariants} className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <h2 className="font-semibold text-white">Team Activity</h2>
            </div>
          </div>
          <div className="p-2">
            {mockTeamActivity.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 hover:bg-zinc-800/30 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  member.role === "SDR"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-600"
                    : member.role === "Closer"
                    ? "bg-gradient-to-br from-violet-500 to-purple-600"
                    : "bg-gradient-to-br from-blue-500 to-cyan-600"
                }`}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">{member.name}</p>
                  <p className="text-xs text-zinc-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      member.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                    }`} />
                    <span className="text-xs text-zinc-400 capitalize">{member.status}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    {member.calls} calls / {member.appointments} booked
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ============================================ */}
      {/* BOTTOM NAV CARDS */}
      {/* ============================================ */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Link href="/dashboard/calls" className="group">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Call Center</p>
                <p className="text-xs text-zinc-500">Live calls & history</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/leads" className="group">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-blue-500/30 hover:bg-zinc-900/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Lead Database</p>
                <p className="text-xs text-zinc-500">{mockStats.totalLeads.toLocaleString()} total leads</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/analytics" className="group">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Analytics</p>
                <p className="text-xs text-zinc-500">Performance metrics</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/settings" className="group">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 hover:border-violet-500/30 hover:bg-zinc-900/80 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">Settings</p>
                <p className="text-xs text-zinc-500">Configure system</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
