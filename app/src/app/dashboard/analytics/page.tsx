"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Phone,
  Users,
  Calendar,
  Target,
  Clock,
  Zap,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Filter,
  RefreshCw,
  Award,
  PhoneCall,
  UserCheck,
  UserX,
  CalendarCheck,
  CalendarX,
  Percent,
  Timer,
  Crown,
  Medal,
  Trophy,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react";

// ============================================================================
// MOCK DATA - Realistic numbers for real estate AI calling system
// ============================================================================

const overviewStats = {
  totalRevenue: 847500,
  revenueTrend: 18.4,
  conversionRate: 12.8,
  conversionTrend: 2.3,
  avgDealValue: 28250,
  avgDealTrend: 5.7,
  platformROI: 847,
  roiTrend: 124,
};

const monthlyRevenue = [
  { month: "Aug", revenue: 52000, deals: 2 },
  { month: "Sep", revenue: 78500, deals: 3 },
  { month: "Oct", revenue: 94000, deals: 4 },
  { month: "Nov", revenue: 127500, deals: 5 },
  { month: "Dec", revenue: 156000, deals: 6 },
  { month: "Jan", revenue: 142000, deals: 5 },
  { month: "Feb", revenue: 197500, deals: 7 },
];

const revenueBySource = [
  { source: "Zillow", revenue: 312500, percentage: 37, color: "emerald" },
  { source: "Realtor.com", revenue: 212000, percentage: 25, color: "cyan" },
  { source: "Facebook Ads", revenue: 169500, percentage: 20, color: "purple" },
  { source: "Google Ads", revenue: 101750, percentage: 12, color: "amber" },
  { source: "Referrals", revenue: 51750, percentage: 6, color: "rose" },
];

const dailyCallsData = [
  { day: "Mon", calls: 156, connected: 89, appointments: 12 },
  { day: "Tue", calls: 182, connected: 104, appointments: 15 },
  { day: "Wed", calls: 198, connected: 118, appointments: 18 },
  { day: "Thu", calls: 167, connected: 95, appointments: 14 },
  { day: "Fri", calls: 204, connected: 122, appointments: 19 },
  { day: "Sat", calls: 89, connected: 52, appointments: 8 },
  { day: "Sun", calls: 45, connected: 28, appointments: 4 },
];

const weeklyCallsData = [
  { week: "W1", calls: 892, connected: 534, rate: 59.9 },
  { week: "W2", calls: 1041, connected: 608, rate: 58.4 },
  { week: "W3", calls: 978, connected: 598, rate: 61.1 },
  { week: "W4", calls: 1156, connected: 712, rate: 61.6 },
];

const hourlyPerformance = [
  { hour: "8AM", calls: 45, connections: 18, rate: 40 },
  { hour: "9AM", calls: 128, connections: 72, rate: 56 },
  { hour: "10AM", calls: 156, connections: 94, rate: 60 },
  { hour: "11AM", calls: 142, connections: 89, rate: 63 },
  { hour: "12PM", calls: 98, connections: 54, rate: 55 },
  { hour: "1PM", calls: 112, connections: 62, rate: 55 },
  { hour: "2PM", calls: 134, connections: 81, rate: 60 },
  { hour: "3PM", calls: 148, connections: 92, rate: 62 },
  { hour: "4PM", calls: 167, connections: 108, rate: 65 },
  { hour: "5PM", calls: 145, connections: 91, rate: 63 },
  { hour: "6PM", calls: 89, connections: 48, rate: 54 },
  { hour: "7PM", calls: 52, connections: 24, rate: 46 },
];

const callDurationTrends = [
  { period: "Week 1", avgDuration: 142, successful: 168, unsuccessful: 45 },
  { period: "Week 2", avgDuration: 156, successful: 178, unsuccessful: 42 },
  { period: "Week 3", avgDuration: 148, successful: 172, unsuccessful: 38 },
  { period: "Week 4", avgDuration: 162, successful: 185, unsuccessful: 35 },
];

const leadSourcePerformance = [
  {
    source: "Zillow",
    leads: 487,
    qualified: 312,
    converted: 47,
    conversionRate: 9.7,
    costPerLead: 24.50,
    revenue: 312500,
    roi: 2647
  },
  {
    source: "Realtor.com",
    leads: 356,
    qualified: 234,
    converted: 32,
    conversionRate: 9.0,
    costPerLead: 28.75,
    revenue: 212000,
    roi: 2072
  },
  {
    source: "Facebook Ads",
    leads: 892,
    qualified: 412,
    converted: 38,
    conversionRate: 4.3,
    costPerLead: 12.80,
    revenue: 169500,
    roi: 1485
  },
  {
    source: "Google Ads",
    leads: 423,
    qualified: 198,
    converted: 18,
    conversionRate: 4.3,
    costPerLead: 34.20,
    revenue: 101750,
    roi: 704
  },
  {
    source: "Referrals",
    leads: 89,
    qualified: 72,
    converted: 15,
    conversionRate: 16.9,
    costPerLead: 0,
    revenue: 51750,
    roi: 9999
  },
];

const leadQualityDistribution = [
  { quality: "Hot", count: 142, percentage: 12, color: "emerald" },
  { quality: "Warm", count: 378, percentage: 32, color: "cyan" },
  { quality: "Cold", count: 489, percentage: 41, color: "zinc" },
  { quality: "Unqualified", count: 178, percentage: 15, color: "rose" },
];

const conversionFunnel = [
  { stage: "Leads Generated", count: 2247, percentage: 100 },
  { stage: "Contacted", count: 1892, percentage: 84.2 },
  { stage: "Qualified", count: 1228, percentage: 54.7 },
  { stage: "Appointments Set", count: 412, percentage: 18.3 },
  { stage: "Showed Up", count: 348, percentage: 15.5 },
  { stage: "Deals Closed", count: 150, percentage: 6.7 },
];

const appointmentStats = {
  total: 412,
  showed: 348,
  noShow: 64,
  showRate: 84.5,
  showRateTrend: 3.2,
};

const appointmentsByDay = [
  { day: "Monday", appointments: 78, showed: 68, rate: 87.2 },
  { day: "Tuesday", appointments: 82, showed: 71, rate: 86.6 },
  { day: "Wednesday", appointments: 89, showed: 78, rate: 87.6 },
  { day: "Thursday", appointments: 76, showed: 62, rate: 81.6 },
  { day: "Friday", appointments: 56, showed: 45, rate: 80.4 },
  { day: "Saturday", appointments: 24, showed: 18, rate: 75.0 },
  { day: "Sunday", appointments: 7, showed: 6, rate: 85.7 },
];

const noShowReasons = [
  { reason: "Forgot", count: 24, percentage: 37.5 },
  { reason: "Schedule Conflict", count: 18, percentage: 28.1 },
  { reason: "Changed Mind", count: 12, percentage: 18.8 },
  { reason: "No Transportation", count: 6, percentage: 9.4 },
  { reason: "Unknown", count: 4, percentage: 6.2 },
];

const campaignPerformance = [
  {
    name: "Zillow Hot Leads Q1",
    calls: 1245,
    appointments: 89,
    deals: 12,
    revenue: 156000,
    cost: 8500,
    roi: 1735,
    status: "active"
  },
  {
    name: "Facebook Retargeting",
    calls: 892,
    appointments: 67,
    deals: 8,
    revenue: 98500,
    cost: 4200,
    roi: 2245,
    status: "active"
  },
  {
    name: "Expired Listings Blitz",
    calls: 567,
    appointments: 45,
    deals: 6,
    revenue: 78000,
    cost: 2800,
    roi: 2686,
    status: "active"
  },
  {
    name: "FSBO Outreach",
    calls: 423,
    appointments: 34,
    deals: 4,
    revenue: 52000,
    cost: 1900,
    roi: 2637,
    status: "paused"
  },
  {
    name: "Pre-Foreclosure",
    calls: 312,
    appointments: 28,
    deals: 3,
    revenue: 42000,
    cost: 1200,
    roi: 3400,
    status: "completed"
  },
];

const templatePerformance = [
  { template: "Warm Introduction", uses: 1892, appointments: 156, rate: 8.2 },
  { template: "Value Proposition", uses: 1456, appointments: 134, rate: 9.2 },
  { template: "Urgency Close", uses: 987, appointments: 98, rate: 9.9 },
  { template: "Soft Follow-up", uses: 756, appointments: 48, rate: 6.3 },
  { template: "Objection Handler", uses: 534, appointments: 52, rate: 9.7 },
];

const abTestResults = [
  {
    test: "Opening Script A vs B",
    variantA: { name: "Friendly Intro", rate: 8.4 },
    variantB: { name: "Direct Value", rate: 11.2 },
    winner: "B",
    confidence: 94,
    status: "completed"
  },
  {
    test: "Call Time: AM vs PM",
    variantA: { name: "Morning (9-12)", rate: 59.2 },
    variantB: { name: "Afternoon (2-5)", rate: 63.8 },
    winner: "B",
    confidence: 87,
    status: "completed"
  },
  {
    test: "Follow-up Delay",
    variantA: { name: "2 Hours", rate: 12.4 },
    variantB: { name: "24 Hours", rate: 9.8 },
    winner: "A",
    confidence: 91,
    status: "completed"
  },
  {
    test: "Voicemail Script",
    variantA: { name: "Short & Urgent", rate: 18.2 },
    variantB: { name: "Detailed Value", rate: 14.6 },
    winner: "A",
    confidence: 78,
    status: "running"
  },
];

const agentPerformance = [
  {
    name: "Laura AI",
    avatar: "LA",
    calls: 2847,
    connected: 1712,
    appointments: 234,
    deals: 32,
    revenue: 425000,
    conversionRate: 13.7,
    avgCallDuration: "2:34",
    rank: 1
  },
  {
    name: "Alex AI",
    avatar: "AA",
    calls: 2156,
    connected: 1248,
    appointments: 178,
    deals: 24,
    revenue: 312500,
    conversionRate: 14.3,
    avgCallDuration: "2:48",
    rank: 2
  },
  {
    name: "Jordan AI",
    avatar: "JA",
    calls: 1892,
    connected: 1098,
    appointments: 145,
    deals: 18,
    revenue: 198000,
    conversionRate: 13.2,
    avgCallDuration: "2:22",
    rank: 3
  },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

const StatCard = ({
  title,
  value,
  trend,
  trendLabel = "vs last month",
  icon: Icon,
  iconColor = "text-zinc-400",
  bgColor = "bg-zinc-900",
  borderColor = "border-zinc-800",
  highlight = false,
  prefix = "",
  suffix = "",
  delay = 0
}: {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  highlight?: boolean;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`rounded-xl border ${borderColor} ${bgColor} p-4 xs:p-5 ${
      highlight ? "ring-1 ring-emerald-500/30" : ""
    }`}
  >
    <div className="flex items-center gap-2 mb-2 xs:mb-3">
      <div className={`w-7 h-7 xs:w-8 xs:h-8 rounded-lg bg-zinc-800 flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 xs:w-4 xs:h-4 ${iconColor}`} />
      </div>
      <span className="text-xs xs:text-sm text-zinc-400 font-medium">{title}</span>
    </div>
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className="text-2xl xs:text-3xl font-bold text-white">
        {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
      </span>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs xs:text-sm px-1.5 xs:px-2 py-0.5 rounded-full ${
          trend >= 0
            ? "text-emerald-400 bg-emerald-500/10"
            : "text-rose-400 bg-rose-500/10"
        }`}>
          {trend >= 0 ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    {trendLabel && (
      <p className="text-xs text-zinc-500 mt-1">{trendLabel}</p>
    )}
  </motion.div>
);

const SectionHeader = ({
  title,
  subtitle,
  icon: Icon,
  action
}: {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
}) => (
  <div className="flex items-start xs:items-center justify-between gap-2 mb-4">
    <div className="flex items-center gap-2 xs:gap-3">
      {Icon && (
        <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
        </div>
      )}
      <div>
        <h3 className="text-base xs:text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="text-xs text-zinc-500 hidden xs:block">{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

const ProgressBar = ({
  value,
  max,
  color = "emerald",
  height = "h-2",
  showLabel = false
}: {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}) => {
  const percentage = Math.round((value / max) * 100);
  const colorClasses: Record<string, string> = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    zinc: "bg-zinc-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${height} bg-zinc-800 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${colorClasses[color]} rounded-full`}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-zinc-400 w-10 text-right">{percentage}%</span>
      )}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "calls", label: "Calls", icon: Phone },
    { id: "leads", label: "Leads", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "agents", label: "Agents", icon: Award },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-400" />
            Analytics Dashboard
          </h1>
          <p className="text-zinc-400 text-xs xs:text-sm mt-1">
            Track performance, revenue, and ROI across your AI calling system
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 xs:gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 xs:px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs xs:text-sm text-zinc-300 focus:outline-none focus:border-emerald-500 flex-1 xs:flex-none min-w-[120px]"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden xs:inline">Refresh</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 px-3 xs:px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs xs:text-sm text-white font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden xs:inline">Export Report</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto scrollbar-hide -mx-4 px-4 xs:mx-0 xs:px-1"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-4 py-1.5 xs:py-2 rounded-lg text-xs xs:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-emerald-600 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span className="hidden xs:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* ================================================================ */}
        {/* OVERVIEW TAB */}
        {/* ================================================================ */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Revenue Stats Row */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(overviewStats.totalRevenue)}
                trend={overviewStats.revenueTrend}
                icon={DollarSign}
                iconColor="text-emerald-400"
                highlight
                delay={0}
              />
              <StatCard
                title="Conversion Rate"
                value={overviewStats.conversionRate}
                suffix="%"
                trend={overviewStats.conversionTrend}
                icon={Target}
                iconColor="text-cyan-400"
                delay={0.1}
              />
              <StatCard
                title="Avg Deal Value"
                value={formatCurrency(overviewStats.avgDealValue)}
                trend={overviewStats.avgDealTrend}
                icon={TrendingUp}
                iconColor="text-purple-400"
                delay={0.2}
              />
              <StatCard
                title="Platform ROI"
                value={overviewStats.platformROI}
                suffix="%"
                trend={overviewStats.roiTrend}
                trendLabel="return on investment"
                icon={Zap}
                iconColor="text-amber-400"
                delay={0.3}
              />
            </div>

            {/* Revenue Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-6">
              {/* Monthly Revenue Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Monthly Revenue"
                  subtitle="Revenue trend over the last 7 months"
                  icon={BarChart3}
                />
                <div className="mt-4 xs:mt-6">
                  <div className="flex items-end gap-1.5 xs:gap-3 h-36 xs:h-48">
                    {monthlyRevenue.map((data, i) => {
                      const maxRevenue = Math.max(...monthlyRevenue.map(d => d.revenue));
                      const height = (data.revenue / maxRevenue) * 100;
                      return (
                        <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg relative group cursor-pointer"
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                              {formatCurrency(data.revenue)} ({data.deals} deals)
                            </div>
                          </motion.div>
                          <span className="text-[10px] xs:text-xs text-zinc-500">{data.month}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 xs:mt-4 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs xs:text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-emerald-500" />
                        <span className="text-zinc-400">Revenue</span>
                      </div>
                    </div>
                    <div className="text-zinc-400 text-xs xs:text-sm">
                      Projected: <span className="text-emerald-400 font-semibold">$215,000</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Revenue by Source */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Revenue by Source"
                  subtitle="Top performing channels"
                  icon={PieChart}
                />
                <div className="space-y-4 mt-4">
                  {revenueBySource.map((source, i) => (
                    <motion.div
                      key={source.source}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">{source.source}</span>
                        <span className="text-sm text-zinc-400">{formatCurrency(source.revenue)}</span>
                      </div>
                      <ProgressBar value={source.percentage} max={100} color={source.color} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 xs:p-5"
              >
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-lg xs:text-2xl font-bold text-white">4,067</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Total Calls Made</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <span className="text-emerald-400">+12.4%</span>
                  <span className="text-zinc-500 hidden xs:inline">from last month</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 xs:p-5"
              >
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 xs:w-5 xs:h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-lg xs:text-2xl font-bold text-white">61.2%</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Connection Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <span className="text-emerald-400">+3.1%</span>
                  <span className="text-zinc-500 hidden xs:inline">from last month</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 xs:p-5"
              >
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 xs:w-5 xs:h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg xs:text-2xl font-bold text-white">412</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Appointments Set</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <span className="text-emerald-400">+18.7%</span>
                  <span className="text-zinc-500 hidden xs:inline">from last month</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 xs:p-5"
              >
                <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                  <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 xs:w-5 xs:h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-lg xs:text-2xl font-bold text-white">150</p>
                    <p className="text-[10px] xs:text-xs text-zinc-500">Deals Closed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <span className="text-emerald-400">+24.2%</span>
                  <span className="text-zinc-500 hidden xs:inline">from last month</span>
                </div>
              </motion.div>
            </div>

            {/* Conversion Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5 overflow-x-auto"
            >
              <SectionHeader
                title="Conversion Funnel"
                subtitle="Lead journey from generation to close"
                icon={Activity}
              />
              <div className="mt-4 xs:mt-6 relative min-w-[500px] xs:min-w-0">
                <div className="flex items-center justify-between gap-1 xs:gap-2">
                  {conversionFunnel.map((stage, i) => {
                    const width = 100 - (i * 15);
                    return (
                      <div key={stage.stage} className="flex-1 text-center">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          className="mx-auto mb-2 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-lg"
                          style={{
                            width: `${width}%`,
                            height: 40 + (6 - i) * 4,
                            transformOrigin: 'bottom'
                          }}
                        />
                        <p className="text-sm xs:text-xl font-bold text-white">{stage.count.toLocaleString()}</p>
                        <p className="text-[9px] xs:text-xs text-zinc-500 mt-1 line-clamp-2">{stage.stage}</p>
                        <p className="text-[9px] xs:text-xs text-emerald-400">{stage.percentage}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* CALLS TAB */}
        {/* ================================================================ */}
        {activeTab === "calls" && (
          <motion.div
            key="calls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Call Stats */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
              <StatCard
                title="Total Calls"
                value="4,067"
                trend={12.4}
                icon={Phone}
                iconColor="text-emerald-400"
                delay={0}
              />
              <StatCard
                title="Connected Calls"
                value="2,489"
                trend={8.2}
                icon={PhoneCall}
                iconColor="text-cyan-400"
                delay={0.1}
              />
              <StatCard
                title="Connection Rate"
                value="61.2"
                suffix="%"
                trend={3.1}
                icon={Percent}
                iconColor="text-purple-400"
                delay={0.2}
              />
              <StatCard
                title="Avg Duration"
                value="2:34"
                trend={5.8}
                icon={Timer}
                iconColor="text-amber-400"
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {/* Daily Calls Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Calls by Day"
                  subtitle="Daily call volume breakdown"
                  icon={BarChart3}
                />
                <div className="mt-4">
                  <div className="flex items-end gap-1.5 xs:gap-3 h-36 xs:h-48">
                    {dailyCallsData.map((data, i) => {
                      const maxCalls = Math.max(...dailyCallsData.map(d => d.calls));
                      return (
                        <div key={data.day} className="flex-1 flex flex-col items-center gap-1.5 xs:gap-2">
                          <div className="w-full flex flex-col items-center gap-1 h-28 xs:h-40">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${(data.calls / maxCalls) * 100}%` }}
                              transition={{ duration: 0.5, delay: i * 0.05 }}
                              className="w-full bg-emerald-500/60 rounded-t relative"
                            >
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(data.connected / data.calls) * 100}%` }}
                                transition={{ duration: 0.5, delay: i * 0.05 + 0.2 }}
                                className="absolute bottom-0 w-full bg-emerald-500 rounded-t"
                              />
                            </motion.div>
                          </div>
                          <span className="text-[10px] xs:text-xs text-zinc-500">{data.day}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-3 xs:mt-4 flex items-center gap-4 xs:gap-6 text-[10px] xs:text-xs">
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-emerald-500/60" />
                      <span className="text-zinc-400">Total</span>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2">
                      <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-emerald-500" />
                      <span className="text-zinc-400">Connected</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection Rate Over Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Weekly Connection Rate"
                  subtitle="Connection success trend"
                  icon={TrendingUp}
                />
                <div className="mt-4 space-y-4">
                  {weeklyCallsData.map((week, i) => (
                    <motion.div
                      key={week.week}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-sm text-zinc-400 w-8">{week.week}</span>
                      <div className="flex-1">
                        <ProgressBar value={week.rate} max={100} color="cyan" />
                      </div>
                      <span className="text-sm text-white font-medium w-12 text-right">{week.rate}%</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-zinc-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Average Rate</span>
                    <span className="text-lg font-bold text-cyan-400">60.3%</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Best Performing Times */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Best Performing Hours"
                subtitle="Optimal times for call connections"
                icon={Clock}
              />
              <div className="mt-4 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 xs:gap-2">
                {hourlyPerformance.map((hour, i) => {
                  const intensity = hour.rate / 65;
                  return (
                    <motion.div
                      key={hour.hour}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.03 }}
                      className="text-center"
                    >
                      <div
                        className="h-12 xs:h-16 rounded-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                        style={{
                          backgroundColor: `rgba(16, 185, 129, ${intensity * 0.6})`,
                          border: hour.rate >= 60 ? '1px solid rgba(16, 185, 129, 0.5)' : 'none'
                        }}
                      >
                        <span className="text-[10px] xs:text-sm font-bold text-white">{hour.rate}%</span>
                      </div>
                      <span className="text-[9px] xs:text-xs text-zinc-500 mt-1 block">{hour.hour}</span>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-3 xs:mt-4 flex items-center justify-center gap-3 xs:gap-4 text-[10px] xs:text-xs">
                <span className="text-zinc-500">Low</span>
                <div className="flex items-center gap-0.5 xs:gap-1">
                  {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                    <div
                      key={i}
                      className="w-4 xs:w-6 h-2 xs:h-3 rounded"
                      style={{ backgroundColor: `rgba(16, 185, 129, ${opacity * 0.6})` }}
                    />
                  ))}
                </div>
                <span className="text-zinc-500">High</span>
              </div>
            </motion.div>

            {/* Call Duration Trends */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Call Duration Trends"
                subtitle="Average call length over time"
                icon={Timer}
              />
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-4">
                {callDurationTrends.map((period, i) => (
                  <motion.div
                    key={period.period}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-3 xs:p-4 rounded-lg bg-zinc-800/50"
                  >
                    <p className="text-[10px] xs:text-xs text-zinc-500 mb-1 xs:mb-2">{period.period}</p>
                    <p className="text-xl xs:text-2xl font-bold text-white">{formatDuration(period.avgDuration)}</p>
                    <div className="mt-2 xs:mt-3 flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs">
                      <span className="text-emerald-400">{formatDuration(period.successful)}</span>
                      <span className="text-zinc-500 hidden xs:inline">successful</span>
                    </div>
                    <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs mt-1">
                      <span className="text-rose-400">{formatDuration(period.unsuccessful)}</span>
                      <span className="text-zinc-500 hidden xs:inline">unsuccessful</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* LEADS TAB */}
        {/* ================================================================ */}
        {activeTab === "leads" && (
          <motion.div
            key="leads"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Lead Stats */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
              <StatCard
                title="Total Leads"
                value="2,247"
                trend={15.3}
                icon={Users}
                iconColor="text-emerald-400"
                delay={0}
              />
              <StatCard
                title="Qualified Leads"
                value="1,228"
                trend={12.8}
                icon={UserCheck}
                iconColor="text-cyan-400"
                delay={0.1}
              />
              <StatCard
                title="Conversion Rate"
                value="6.7"
                suffix="%"
                trend={1.2}
                icon={Target}
                iconColor="text-purple-400"
                delay={0.2}
              />
              <StatCard
                title="Avg Cost/Lead"
                value="$18.45"
                trend={-8.2}
                icon={DollarSign}
                iconColor="text-amber-400"
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {/* Lead Source Performance Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Lead Source Performance"
                  subtitle="Which sources convert best"
                  icon={BarChart3}
                />
                <div className="mt-4 overflow-x-auto -mx-4 px-4 xs:mx-0 xs:px-0">
                  <table className="w-full min-w-[400px]">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-3">Source</th>
                        <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-3">Leads</th>
                        <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-3">Conv.</th>
                        <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-3 hidden xs:table-cell">CPL</th>
                        <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-3">ROI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {leadSourcePerformance.map((source, i) => (
                        <motion.tr
                          key={source.source}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          <td className="py-2 xs:py-3">
                            <span className="text-white font-medium text-xs xs:text-sm">{source.source}</span>
                          </td>
                          <td className="py-2 xs:py-3 text-right text-zinc-400 text-xs xs:text-sm">{source.leads.toLocaleString()}</td>
                          <td className="py-2 xs:py-3 text-right text-xs xs:text-sm">
                            <span className={`${source.conversionRate >= 10 ? 'text-emerald-400' : 'text-zinc-400'}`}>
                              {source.conversionRate}%
                            </span>
                          </td>
                          <td className="py-2 xs:py-3 text-right text-zinc-400 text-xs xs:text-sm hidden xs:table-cell">
                            {source.costPerLead === 0 ? 'Free' : `$${source.costPerLead}`}
                          </td>
                          <td className="py-2 xs:py-3 text-right text-xs xs:text-sm">
                            <span className="text-emerald-400 font-medium">
                              {source.roi >= 9999 ? 'Inf' : `${source.roi}%`}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Lead Quality Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Lead Quality Distribution"
                  subtitle="Breakdown by lead temperature"
                  icon={PieChart}
                />
                <div className="mt-4 xs:mt-6 flex items-center justify-center">
                  <div className="relative w-36 h-36 xs:w-48 xs:h-48">
                    {/* Donut Chart */}
                    <svg className="w-full h-full transform -rotate-90">
                      {leadQualityDistribution.reduce((acc, item) => {
                        const total = leadQualityDistribution.reduce((sum, d) => sum + d.percentage, 0);
                        const offset = acc.offset;
                        const strokeDasharray = total > 0 ? (item.percentage / total) * 100 * 3.14 * 0.8 : 0;
                        const strokeDashoffset = -offset * 3.14 * 0.8;
                        const colorMap: Record<string, string> = {
                          emerald: '#10b981',
                          cyan: '#06b6d4',
                          zinc: '#71717a',
                          rose: '#f43f5e',
                        };

                        acc.elements.push(
                          <circle
                            key={item.quality}
                            cx="96"
                            cy="96"
                            r="76"
                            fill="none"
                            stroke={colorMap[item.color]}
                            strokeWidth="24"
                            strokeDasharray={`${strokeDasharray} 1000`}
                            strokeDashoffset={strokeDashoffset}
                            className="transition-all duration-500"
                          />
                        );
                        acc.offset += item.percentage;
                        return acc;
                      }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-lg xs:text-2xl font-bold text-white">1,187</p>
                        <p className="text-[10px] xs:text-xs text-zinc-500">Total Leads</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 xs:mt-4 grid grid-cols-2 gap-2 xs:gap-3">
                  {leadQualityDistribution.map((item) => {
                    const colorMap: Record<string, string> = {
                      emerald: 'bg-emerald-500',
                      cyan: 'bg-cyan-500',
                      zinc: 'bg-zinc-500',
                      rose: 'bg-rose-500',
                    };
                    return (
                      <div key={item.quality} className="flex items-center gap-1.5 xs:gap-2">
                        <span className={`w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full ${colorMap[item.color]}`} />
                        <span className="text-xs xs:text-sm text-zinc-400">{item.quality}</span>
                        <span className="text-xs xs:text-sm text-white font-medium ml-auto">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Cost Per Lead by Source */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Cost Per Lead Comparison"
                subtitle="Efficiency across different lead sources"
                icon={DollarSign}
              />
              <div className="mt-4 grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-4">
                {leadSourcePerformance.map((source, i) => (
                  <motion.div
                    key={source.source}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`p-3 xs:p-4 rounded-lg ${
                      source.costPerLead === 0
                        ? 'bg-emerald-500/10 border border-emerald-500/20'
                        : 'bg-zinc-800/50'
                    }`}
                  >
                    <p className="text-xs xs:text-sm text-zinc-400 mb-1 xs:mb-2">{source.source}</p>
                    <p className="text-lg xs:text-2xl font-bold text-white">
                      {source.costPerLead === 0 ? 'Free' : `$${source.costPerLead}`}
                    </p>
                    <p className="text-[10px] xs:text-xs text-zinc-500 mt-1">{source.leads} leads</p>
                    <div className="mt-2 xs:mt-3 flex items-center gap-1">
                      <div
                        className="h-1 rounded-full bg-emerald-500"
                        style={{ width: `${Math.min((1 / (source.costPerLead || 0.1)) * 100, 100)}%` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* APPOINTMENTS TAB */}
        {/* ================================================================ */}
        {activeTab === "appointments" && (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Appointment Stats */}
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4">
              <StatCard
                title="Total Appointments"
                value={appointmentStats.total}
                trend={18.7}
                icon={Calendar}
                iconColor="text-emerald-400"
                delay={0}
              />
              <StatCard
                title="Showed Up"
                value={appointmentStats.showed}
                trend={21.2}
                icon={CalendarCheck}
                iconColor="text-cyan-400"
                delay={0.1}
              />
              <StatCard
                title="Show Rate"
                value={appointmentStats.showRate}
                suffix="%"
                trend={appointmentStats.showRateTrend}
                icon={Percent}
                iconColor="text-purple-400"
                highlight
                delay={0.2}
              />
              <StatCard
                title="No Shows"
                value={appointmentStats.noShow}
                trend={-12.5}
                icon={CalendarX}
                iconColor="text-rose-400"
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {/* Appointments by Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Appointments by Day"
                  subtitle="Show rates across the week"
                  icon={Calendar}
                />
                <div className="mt-4 space-y-2 xs:space-y-3">
                  {appointmentsByDay.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 xs:gap-4"
                    >
                      <span className="text-xs xs:text-sm text-zinc-400 w-12 xs:w-24 truncate">{day.day}</span>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-5 xs:h-6 bg-zinc-800 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${day.rate}%` }}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                          />
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] xs:text-xs text-white font-medium">
                            {day.showed}/{day.appointments}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs xs:text-sm font-medium w-10 xs:w-12 text-right ${
                        day.rate >= 85 ? 'text-emerald-400' : day.rate >= 80 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {day.rate}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* No-Show Reasons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="No-Show Reasons"
                  subtitle="Understanding why appointments are missed"
                  icon={UserX}
                />
                <div className="mt-4 space-y-4">
                  {noShowReasons.map((reason, i) => (
                    <motion.div
                      key={reason.reason}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs xs:text-sm text-white">{reason.reason}</span>
                        <span className="text-xs xs:text-sm text-zinc-400">{reason.count} ({reason.percentage}%)</span>
                      </div>
                      <ProgressBar value={reason.percentage} max={100} color="rose" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 xs:mt-6 p-3 xs:p-4 rounded-lg bg-zinc-800/50">
                  <p className="text-xs xs:text-sm text-zinc-400">
                    <span className="text-amber-400 font-medium">Pro tip:</span> Send reminder SMS 2 hours before to reduce &quot;Forgot&quot; by 60%
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Show Rate Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Show Rate Trend"
                subtitle="Monthly appointment show rate performance"
                icon={TrendingUp}
              />
              <div className="mt-4 flex items-end gap-1.5 xs:gap-3 h-36 xs:h-48">
                {[78.2, 81.5, 79.8, 83.2, 82.1, 84.5, 85.8].map((rate, i) => {
                  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 xs:gap-2">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${rate}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg relative group cursor-pointer"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 px-2 py-1 rounded text-xs text-white">
                          {rate}%
                        </div>
                      </motion.div>
                      <span className="text-[10px] xs:text-xs text-zinc-500">{months[i]}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* CAMPAIGNS TAB */}
        {/* ================================================================ */}
        {activeTab === "campaigns" && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Campaign Performance Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Campaign Performance"
                subtitle="ROI per campaign"
                icon={Target}
                action={
                  <button className="flex items-center gap-1.5 xs:gap-2 px-2 xs:px-3 py-1 xs:py-1.5 bg-zinc-800 rounded-lg text-xs xs:text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                    <Filter className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                    <span className="hidden xs:inline">Filter</span>
                  </button>
                }
              />
              <div className="mt-4 overflow-x-auto -mx-4 px-4 xs:mx-0 xs:px-0">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Campaign</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Calls</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3 hidden xs:table-cell">Appts</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Deals</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Revenue</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3 hidden sm:table-cell">Cost</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">ROI</th>
                      <th className="text-center text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {campaignPerformance.map((campaign, i) => (
                      <motion.tr
                        key={campaign.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="hover:bg-zinc-800/30 transition-colors"
                      >
                        <td className="py-2 xs:py-4">
                          <span className="text-white font-medium text-xs xs:text-sm">{campaign.name}</span>
                        </td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm">{campaign.calls.toLocaleString()}</td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm hidden xs:table-cell">{campaign.appointments}</td>
                        <td className="py-2 xs:py-4 text-right text-emerald-400 text-xs xs:text-sm">{campaign.deals}</td>
                        <td className="py-2 xs:py-4 text-right text-white font-medium text-xs xs:text-sm">{formatCurrency(campaign.revenue)}</td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm hidden sm:table-cell">{formatCurrency(campaign.cost)}</td>
                        <td className="py-2 xs:py-4 text-right text-xs xs:text-sm">
                          <span className="text-emerald-400 font-bold">{campaign.roi}%</span>
                        </td>
                        <td className="py-2 xs:py-4 text-center">
                          <span className={`px-1.5 xs:px-2 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : campaign.status === 'paused'
                              ? 'bg-amber-500/10 text-amber-400'
                              : 'bg-zinc-500/10 text-zinc-400'
                          }`}>
                            {campaign.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6">
              {/* Template Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="Best Performing Templates"
                  subtitle="Script effectiveness analysis"
                  icon={FileText}
                />
                <div className="mt-4 space-y-2 xs:space-y-3">
                  {templatePerformance.map((template, i) => (
                    <motion.div
                      key={template.template}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="p-2.5 xs:p-3 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1.5 xs:mb-2">
                        <span className="text-xs xs:text-sm text-white font-medium">{template.template}</span>
                        <span className={`text-xs xs:text-sm font-bold ${
                          template.rate >= 9 ? 'text-emerald-400' : 'text-cyan-400'
                        }`}>
                          {template.rate}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 xs:gap-4 text-[10px] xs:text-xs text-zinc-500">
                        <span>{template.uses.toLocaleString()} uses</span>
                        <span>{template.appointments} appts</span>
                      </div>
                      <div className="mt-1.5 xs:mt-2">
                        <ProgressBar value={template.rate} max={12} color="cyan" height="h-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* A/B Test Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
              >
                <SectionHeader
                  title="A/B Test Results"
                  subtitle="Experiment outcomes"
                  icon={Activity}
                />
                <div className="mt-4 space-y-3 xs:space-y-4">
                  {abTestResults.map((test, i) => (
                    <motion.div
                      key={test.test}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="p-3 xs:p-4 rounded-lg bg-zinc-800/30"
                    >
                      <div className="flex items-center justify-between mb-2 xs:mb-3 gap-2">
                        <span className="text-xs xs:text-sm text-white font-medium line-clamp-1">{test.test}</span>
                        <span className={`px-1.5 xs:px-2 py-0.5 rounded-full text-[10px] xs:text-xs flex-shrink-0 ${
                          test.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {test.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 xs:gap-3">
                        <div className={`p-1.5 xs:p-2 rounded ${test.winner === 'A' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-zinc-800/50'}`}>
                          <div className="flex items-center gap-1 mb-1">
                            {test.winner === 'A' && <Trophy className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />}
                            <span className="text-[10px] xs:text-xs text-zinc-400 truncate">A: {test.variantA.name}</span>
                          </div>
                          <span className={`text-sm xs:text-lg font-bold ${test.winner === 'A' ? 'text-emerald-400' : 'text-zinc-400'}`}>
                            {test.variantA.rate}%
                          </span>
                        </div>
                        <div className={`p-1.5 xs:p-2 rounded ${test.winner === 'B' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-zinc-800/50'}`}>
                          <div className="flex items-center gap-1 mb-1">
                            {test.winner === 'B' && <Trophy className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-emerald-400" />}
                            <span className="text-[10px] xs:text-xs text-zinc-400 truncate">B: {test.variantB.name}</span>
                          </div>
                          <span className={`text-sm xs:text-lg font-bold ${test.winner === 'B' ? 'text-emerald-400' : 'text-zinc-400'}`}>
                            {test.variantB.rate}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-1.5 xs:mt-2 text-[10px] xs:text-xs text-zinc-500">
                        Confidence: <span className="text-white">{test.confidence}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* AGENTS TAB */}
        {/* ================================================================ */}
        {activeTab === "agents" && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Agent Leaderboard"
                subtitle="Top performers this month"
                icon={Trophy}
              />
              <div className="mt-4 xs:mt-6 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-6">
                {agentPerformance.map((agent, i) => {
                  const rankColors = [
                    { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: Crown },
                    { bg: 'bg-zinc-400/10', border: 'border-zinc-400/30', text: 'text-zinc-300', icon: Medal },
                    { bg: 'bg-amber-700/10', border: 'border-amber-700/30', text: 'text-amber-600', icon: Award },
                  ];
                  const colors = rankColors[i];
                  const IconComponent = colors.icon;

                  return (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className={`p-4 xs:p-6 rounded-xl ${colors.bg} border ${colors.border} relative`}
                    >
                      <div className="absolute -top-2 -right-2 xs:-top-3 xs:-right-3">
                        <div className={`w-8 h-8 xs:w-10 xs:h-10 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 xs:w-5 xs:h-5 ${colors.text}`} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
                        <div className={`w-10 h-10 xs:w-14 xs:h-14 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                          <span className={`text-sm xs:text-lg font-bold ${colors.text}`}>{agent.avatar}</span>
                        </div>
                        <div>
                          <h4 className="text-sm xs:text-lg font-bold text-white">{agent.name}</h4>
                          <p className={`text-xs xs:text-sm ${colors.text}`}>Rank #{agent.rank}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 xs:gap-4">
                        <div>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Revenue</p>
                          <p className="text-sm xs:text-lg font-bold text-white">{formatCurrency(agent.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Conversion</p>
                          <p className="text-sm xs:text-lg font-bold text-emerald-400">{agent.conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Calls</p>
                          <p className="text-xs xs:text-sm font-medium text-zinc-300">{agent.calls.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[10px] xs:text-xs text-zinc-500">Deals</p>
                          <p className="text-xs xs:text-sm font-medium text-zinc-300">{agent.deals}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Agent Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5"
            >
              <SectionHeader
                title="Detailed Comparison"
                subtitle="Side-by-side agent performance metrics"
                icon={BarChart3}
              />
              <div className="mt-4 overflow-x-auto -mx-4 px-4 xs:mx-0 xs:px-0">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Agent</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Calls</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3 hidden sm:table-cell">Connected</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Conn%</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3 hidden xs:table-cell">Appts</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Deals</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Revenue</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3">Conv%</th>
                      <th className="text-right text-[10px] xs:text-xs font-medium text-zinc-500 uppercase pb-2 xs:pb-3 hidden md:table-cell">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50">
                    {agentPerformance.map((agent, i) => (
                      <motion.tr
                        key={agent.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                      >
                        <td className="py-2 xs:py-4">
                          <div className="flex items-center gap-2 xs:gap-3">
                            <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                              <span className="text-[10px] xs:text-sm font-medium text-zinc-300">{agent.avatar}</span>
                            </div>
                            <span className="text-white font-medium text-xs xs:text-sm">{agent.name}</span>
                          </div>
                        </td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm">{agent.calls.toLocaleString()}</td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm hidden sm:table-cell">{agent.connected.toLocaleString()}</td>
                        <td className="py-2 xs:py-4 text-right text-cyan-400 text-xs xs:text-sm">{agent.calls > 0 ? ((agent.connected / agent.calls) * 100).toFixed(1) : 0}%</td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm hidden xs:table-cell">{agent.appointments}</td>
                        <td className="py-2 xs:py-4 text-right text-emerald-400 text-xs xs:text-sm">{agent.deals}</td>
                        <td className="py-2 xs:py-4 text-right text-white font-medium text-xs xs:text-sm">{formatCurrency(agent.revenue)}</td>
                        <td className="py-2 xs:py-4 text-right text-purple-400 font-bold text-xs xs:text-sm">{agent.conversionRate}%</td>
                        <td className="py-2 xs:py-4 text-right text-zinc-400 text-xs xs:text-sm hidden md:table-cell">{agent.avgCallDuration}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Agent Activity Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 xs:p-5 overflow-x-auto"
            >
              <SectionHeader
                title="Activity Distribution"
                subtitle="Calls by agent per day of week"
                icon={Activity}
              />
              <div className="mt-4 min-w-[400px]">
                <div className="grid grid-cols-8 gap-1 xs:gap-2">
                  <div />
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center text-[10px] xs:text-xs text-zinc-500">{day}</div>
                  ))}
                  {agentPerformance.map((agent, agentIndex) => (
                    <>
                      <div key={`label-${agent.name}`} className="text-xs xs:text-sm text-zinc-400 flex items-center truncate">{agent.name}</div>
                      {[0.9, 1.0, 0.95, 0.88, 1.0, 0.5, 0.3].map((intensity, dayIndex) => (
                        <motion.div
                          key={`${agent.name}-${dayIndex}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + (agentIndex * 7 + dayIndex) * 0.02 }}
                          className="h-6 xs:h-8 rounded cursor-pointer transition-transform hover:scale-105"
                          style={{
                            backgroundColor: `rgba(16, 185, 129, ${intensity * 0.6 * (1 - agentIndex * 0.15)})`,
                          }}
                        />
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Options Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 xs:gap-4 p-3 xs:p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
      >
        <div className="text-xs xs:text-sm text-zinc-400">
          Updated: <span className="text-white">2 min ago</span>
        </div>
        <div className="flex items-center gap-2 xs:gap-3 flex-wrap">
          <button className="flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-4 py-1.5 xs:py-2 bg-zinc-800 rounded-lg text-xs xs:text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
            <FileText className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span className="hidden xs:inline">PDF</span>
          </button>
          <button className="flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-4 py-1.5 xs:py-2 bg-zinc-800 rounded-lg text-xs xs:text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
            <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span className="hidden xs:inline">Email</span>
          </button>
          <button className="flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-4 py-1.5 xs:py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs xs:text-sm text-white font-medium transition-colors">
            <Download className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
            <span>CSV</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
