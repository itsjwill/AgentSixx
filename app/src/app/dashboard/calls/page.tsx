"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Phone,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  RefreshCw,
  Play,
  Pause,
  Clock,
  Download,
  FileText,
  Star,
  Voicemail,
  UserCheck,
  CalendarCheck,
  XCircle,
  Search,
} from "lucide-react";

// Overview stats
const callStats = {
  totalCalls: 2847,
  totalCallsChange: 18,
  connected: 1936,
  connectedRate: 68,
  appointments: 342,
  appointmentRate: 12,
  voicemails: 687,
  voicemailRate: 24,
  avgDuration: "2:34",
  avgDurationChange: 12,
};

// Call outcomes breakdown
const callOutcomes = [
  { label: "Appointment Booked", count: 342, percentage: 12, color: "bg-emerald-500", icon: CalendarCheck },
  { label: "Hot Lead", count: 289, percentage: 10.2, color: "bg-orange-500", icon: Star },
  { label: "Callback Scheduled", count: 456, percentage: 16, color: "bg-cyan-500", icon: PhoneIncoming },
  { label: "Interested", count: 512, percentage: 18, color: "bg-blue-500", icon: UserCheck },
  { label: "Voicemail Left", count: 687, percentage: 24.1, color: "bg-amber-500", icon: Voicemail },
  { label: "No Answer", count: 398, percentage: 14, color: "bg-zinc-500", icon: PhoneMissed },
  { label: "Not Interested", count: 163, percentage: 5.7, color: "bg-red-500", icon: XCircle },
];

// Best calling times
const bestTimes = [
  { time: "9:00 AM", calls: 124, connected: 92, rate: 74 },
  { time: "10:00 AM", calls: 156, connected: 118, rate: 76 },
  { time: "11:00 AM", calls: 142, connected: 98, rate: 69 },
  { time: "2:00 PM", calls: 167, connected: 125, rate: 75 },
  { time: "3:00 PM", calls: 189, connected: 148, rate: 78 },
  { time: "4:00 PM", calls: 178, connected: 132, rate: 74 },
  { time: "5:00 PM", calls: 134, connected: 89, rate: 66 },
];

// Live calls
const liveCalls = [
  { id: 1, lead: "Jennifer Adams", phone: "(602) 555-1234", status: "in-progress", duration: "1:24", quality: 92 },
  { id: 2, lead: "Robert Chen", phone: "(480) 555-5678", status: "ringing", duration: "0:08", quality: null },
  { id: 3, lead: "Lisa Wang", phone: "(623) 555-9012", status: "connected", duration: "2:45", quality: 88 },
];

// Call sequence
const callSequence = [
  { step: 1, day: "Day 1", status: "completed", calls: 847, connected: 578, rate: 68.2 },
  { step: 2, day: "Day 3", status: "completed", calls: 644, connected: 412, rate: 64.0 },
  { step: 3, day: "Day 5", status: "active", calls: 502, connected: 298, rate: 59.4 },
  { step: 4, day: "Day 8", status: "pending", calls: 0, connected: 0, rate: 0 },
  { step: 5, day: "Day 12", status: "pending", calls: 0, connected: 0, rate: 0 },
  { step: 6, day: "Day 17", status: "pending", calls: 0, connected: 0, rate: 0 },
];

// Detailed call history
const callHistory = [
  {
    id: 1,
    lead: "John Smith",
    phone: "(602) 555-0123",
    source: "Zillow",
    sourceIcon: "🏠",
    duration: "3:42",
    outcome: "Appointment Booked",
    status: "success",
    time: "10:24 AM",
    date: "Today",
    qualityScore: 94,
    sentiment: "positive",
    sequenceCall: 1,
    hasRecording: true,
    transcript: "AI: Hi, is this John? Great! This is Sarah from ABC Realty. I noticed you were looking at properties in the Westside area. Do you have a quick minute?\n\nJohn: Yeah, sure. We're actually pretty serious about finding something.\n\nAI: That's wonderful! Are you looking to buy in the next few months?\n\nJohn: Yes, we're pre-approved and ready to move quickly.\n\nAI: Perfect. I'd love to set you up with one of our top agents who specializes in that area. Would tomorrow at 2pm work for a quick call?\n\nJohn: That works great.\n\nAI: Excellent! You'll receive a calendar invite shortly. Looking forward to helping you find your perfect home!",
    keyPoints: ["Pre-approved buyer", "Ready to move quickly", "Interested in Westside area"],
    nextAction: "Demo scheduled for tomorrow 2:00 PM",
  },
  {
    id: 2,
    lead: "Sarah Johnson",
    phone: "(480) 555-5678",
    source: "Facebook",
    sourceIcon: "📘",
    duration: "0:45",
    outcome: "Voicemail Left",
    status: "voicemail",
    time: "10:18 AM",
    date: "Today",
    qualityScore: null,
    sentiment: null,
    sequenceCall: 2,
    hasRecording: true,
    transcript: null,
    voicemailScript: "Hi Sarah, this is a quick message from ABC Realty. I noticed you were interested in homes in Scottsdale. I have some great new listings that just hit the market. Give me a call back at your convenience, or I'll try you again in a couple days. Thanks!",
    keyPoints: [],
    nextAction: "Follow-up call scheduled Day 5",
  },
  {
    id: 3,
    lead: "Mike Williams",
    phone: "(623) 555-9012",
    source: "Realtor.com",
    sourceIcon: "🔑",
    duration: "5:12",
    outcome: "Hot Lead",
    status: "hot",
    time: "10:05 AM",
    date: "Today",
    qualityScore: 98,
    sentiment: "very_positive",
    sequenceCall: 1,
    hasRecording: true,
    transcript: "AI: Hello, may I speak with Mike Williams?\n\nMike: Speaking.\n\nAI: Hi Mike! This is from ABC Realty. I saw you were looking at properties in Glendale. Are you still in the market?\n\nMike: Yes, actually I need to move pretty quickly. I'm relocating for work and need to close within 45 days.\n\nAI: I completely understand the time pressure. What's your budget range?\n\nMike: Around $275K to $325K.\n\nAI: Great. We have several properties in that range. Would you like me to have an agent call you today?\n\nMike: Yes please, the sooner the better.\n\nAI: Perfect, I'm marking you as a priority. Someone will call you within the hour!",
    keyPoints: ["Relocating for work", "45-day timeline", "$275K-$325K budget", "URGENT"],
    nextAction: "Immediate callback required",
  },
  {
    id: 4,
    lead: "Emily Brown",
    phone: "(520) 555-3456",
    source: "Website",
    sourceIcon: "🌐",
    duration: "2:18",
    outcome: "Callback Scheduled",
    status: "callback",
    time: "9:52 AM",
    date: "Today",
    qualityScore: 76,
    sentiment: "neutral",
    sequenceCall: 3,
    hasRecording: true,
    transcript: "AI: Hi Emily, this is following up from ABC Realty. Is this a good time?\n\nEmily: Actually, I'm about to head into a meeting.\n\nAI: No problem at all. When would be a better time to chat?\n\nEmily: Maybe tomorrow afternoon? Around 3?\n\nAI: Perfect, I'll give you a call tomorrow at 3pm. Talk to you then!\n\nEmily: Sounds good, thanks.",
    keyPoints: ["Busy professional", "Callback tomorrow 3pm"],
    nextAction: "Callback scheduled Tomorrow 3:00 PM",
  },
  {
    id: 5,
    lead: "David Lee",
    phone: "(928) 555-7890",
    source: "Referral",
    sourceIcon: "🤝",
    duration: "4:05",
    outcome: "Interested",
    status: "success",
    time: "9:41 AM",
    date: "Today",
    qualityScore: 87,
    sentiment: "positive",
    sequenceCall: 1,
    hasRecording: true,
    transcript: "AI: Hi, is this David Lee?\n\nDavid: Yes, who's calling?\n\nAI: Hi David, I'm calling from ABC Realty. I understand you were referred to us by your colleague James?\n\nDavid: Oh yes, James mentioned you guys are good with investment properties.\n\nAI: Absolutely! Are you looking for rentals or fix-and-flip opportunities?\n\nDavid: Primarily rentals. I have cash ready for the right deal.\n\nAI: Excellent. We have several multi-family properties that cash investors love. Would you like more information?\n\nDavid: Yes, send me what you have and I'll review it.",
    keyPoints: ["Investor", "Cash buyer", "Looking for rentals", "Referred by James"],
    nextAction: "Send property listings via email",
  },
  {
    id: 6,
    lead: "Amanda Torres",
    phone: "(602) 555-4321",
    source: "Google Ads",
    sourceIcon: "🔍",
    duration: "1:34",
    outcome: "Not Interested",
    status: "rejected",
    time: "9:28 AM",
    date: "Today",
    qualityScore: 45,
    sentiment: "negative",
    sequenceCall: 2,
    hasRecording: true,
    transcript: "AI: Hi, may I speak with Amanda?\n\nAmanda: Yes?\n\nAI: Hi Amanda, this is following up about your home search inquiry.\n\nAmanda: Oh, we actually already found a place last week.\n\nAI: That's great news, congratulations! Is there anything else we can help you with?\n\nAmanda: No, we're all set. Thanks though.\n\nAI: No problem. Best of luck with your new home!",
    keyPoints: ["Already purchased elsewhere", "Removed from sequence"],
    nextAction: "Marked as closed - lost",
  },
];

// Voice capacity
const voiceCapacity = {
  used: 1247,
  total: 2000,
  plan: "Pro",
};

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCallData = callHistory.find(c => c.id === selectedCall);
  const maxTimeRate = Math.max(...bestTimes.map(t => t.rate));

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.phone.includes(searchQuery);
    const matchesOutcome = filterOutcome === "all" || call.outcome === filterOutcome;
    return matchesSearch && matchesOutcome;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "success": return { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" };
      case "hot": return { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" };
      case "voicemail": return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" };
      case "callback": return { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" };
      case "rejected": return { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" };
      default: return { bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/20" };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Call History</h1>
          <p className="text-zinc-400 text-sm mt-1">Monitor AI calls, outcomes, and performance</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <select className="px-2 sm:px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-300">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="px-3 sm:px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs sm:text-sm text-zinc-300 flex items-center gap-1.5 sm:gap-2 transition-colors">
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400">Total Calls</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">{callStats.totalCalls.toLocaleString()}</span>
            <span className="text-xs text-emerald-400">+{callStats.totalCallsChange}%</span>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/20 bg-zinc-900 p-4 ring-1 ring-emerald-500/20">
          <div className="flex items-center gap-2 mb-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-zinc-400">Connected</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">{callStats.connected.toLocaleString()}</span>
            <span className="text-xs text-zinc-500">{callStats.connectedRate}%</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400">Appointments</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">{callStats.appointments}</span>
            <span className="text-xs text-zinc-500">{callStats.appointmentRate}%</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Voicemail className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400">Voicemails</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">{callStats.voicemails}</span>
            <span className="text-xs text-zinc-500">{callStats.voicemailRate}%</span>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-400">Avg Duration</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-white">{callStats.avgDuration}</span>
            <span className="text-xs text-emerald-400">+{callStats.avgDurationChange}%</span>
          </div>
        </div>
      </div>

      {/* Live Calls + Voice Capacity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Calls Monitor */}
        <div className="rounded-xl border border-red-500/20 bg-zinc-900 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-lg font-semibold text-white">Live Calls</h2>
            <span className="text-xs bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full">
              {liveCalls.length} active
            </span>
          </div>
          <div className="space-y-3">
            {liveCalls.map((call) => (
              <div key={call.id} className="p-2.5 sm:p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0",
                      call.status === "in-progress" && "bg-emerald-500/20",
                      call.status === "ringing" && "bg-amber-500/20",
                      call.status === "connected" && "bg-cyan-500/20"
                    )}>
                      <PhoneCall className={cn(
                        "w-4 h-4 sm:w-5 sm:h-5",
                        call.status === "in-progress" && "text-emerald-400",
                        call.status === "ringing" && "text-amber-400 animate-pulse",
                        call.status === "connected" && "text-cyan-400"
                      )} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white text-sm sm:text-base truncate">{call.lead}</p>
                      <p className="text-[11px] sm:text-xs text-zinc-500">{call.phone}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-base sm:text-lg font-mono text-white">{call.duration}</span>
                    {call.quality && (
                      <p className="text-[10px] sm:text-xs text-emerald-400">Quality: {call.quality}%</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Minutes */}
        <div className="rounded-xl border border-violet-500/20 bg-zinc-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Voice Minutes</h2>
              <p className="text-xs text-zinc-500">{voiceCapacity.plan} Plan</p>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-violet-400">
              {voiceCapacity.used.toLocaleString()}/{voiceCapacity.total.toLocaleString()}
            </span>
          </div>
          <div className="h-4 bg-zinc-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
              style={{ width: `${voiceCapacity.total > 0 ? (voiceCapacity.used / voiceCapacity.total) * 100 : 0}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">{voiceCapacity.total - voiceCapacity.used} minutes remaining</span>
            <button className="text-violet-400 hover:text-violet-300">Upgrade →</button>
          </div>
        </div>
      </div>

      {/* Call Outcomes Breakdown */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Call Outcomes</h2>
            <p className="text-zinc-500 text-sm">Distribution of call results</p>
          </div>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {callOutcomes.map((outcome) => {
            const Icon = outcome.icon;
            return (
              <div key={outcome.label} className="p-3 sm:p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50 text-center">
                <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full mx-auto mb-1.5 sm:mb-2 flex items-center justify-center", outcome.color + "/20")}>
                  <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", outcome.color.replace("bg-", "text-"))} />
                </div>
                <p className="text-lg sm:text-xl font-bold text-white">{outcome.count}</p>
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 sm:mt-1 leading-tight">{outcome.label}</p>
                <p className="text-[10px] sm:text-xs text-zinc-600">{outcome.percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call Sequence + Best Times Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 6-Call Sequence */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">6-Call Sequence</h2>
              <p className="text-xs text-zinc-500">17-day automated follow-up</p>
            </div>
          </div>
          <div className="space-y-3">
            {callSequence.map((step) => (
              <div key={step.step} className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                  step.status === "completed" && "bg-emerald-500 text-white",
                  step.status === "active" && "bg-cyan-500 text-white animate-pulse",
                  step.status === "pending" && "bg-zinc-700 text-zinc-400"
                )}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{step.day}</span>
                    <span className="text-xs text-zinc-500">{step.calls} calls</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        step.status === "completed" && "bg-emerald-500",
                        step.status === "active" && "bg-cyan-500",
                        step.status === "pending" && "bg-zinc-700"
                      )}
                      style={{ width: step.status === "pending" ? "0%" : `${step.rate}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "text-sm font-medium w-12 text-right",
                  step.rate >= 60 ? "text-emerald-400" : "text-zinc-400"
                )}>
                  {step.rate > 0 ? `${step.rate}%` : "-"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Calling Times */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Best Calling Times</h2>
              <p className="text-xs text-zinc-500">Connection rate by hour</p>
            </div>
          </div>
          <div className="space-y-3">
            {bestTimes.map((time) => (
              <div key={time.time} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-zinc-400 w-16 sm:w-20 flex-shrink-0">{time.time}</span>
                <div className="flex-1 h-5 sm:h-6 bg-zinc-800 rounded-full overflow-hidden relative">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      time.rate === maxTimeRate ? "bg-emerald-500" : "bg-zinc-600"
                    )}
                    style={{ width: `${time.rate}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-medium text-white">
                    {time.rate}%
                  </span>
                </div>
                {time.rate === maxTimeRate && (
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-4">
            <Star className="w-3 h-3 inline text-amber-400 mr-1" />
            Best time: 3:00 PM with 78% connection rate
          </p>
        </div>
      </div>

      {/* Call History Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900">
        {/* Filters */}
        <div className="p-4 border-b border-zinc-800">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <select
              value={filterOutcome}
              onChange={(e) => setFilterOutcome(e.target.value)}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Outcomes</option>
              <option value="Appointment Booked">Appointment Booked</option>
              <option value="Hot Lead">Hot Lead</option>
              <option value="Callback Scheduled">Callback</option>
              <option value="Voicemail Left">Voicemail</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>
        </div>

        {/* Call List */}
        <div className="divide-y divide-zinc-800">
          {filteredCalls.map((call) => {
            const styles = getStatusStyles(call.status);
            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "p-4 hover:bg-zinc-800/30 cursor-pointer transition-colors",
                  selectedCall === call.id && "bg-zinc-800/50"
                )}
                onClick={() => setSelectedCall(call.id)}
              >
                <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 xs:gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Quality Score Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-medium text-sm xs:text-base">
                        {call.lead.split(" ").map(n => n[0]).join("")}
                      </div>
                      {call.qualityScore && (
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-5 h-5 xs:w-6 xs:h-6 rounded-full flex items-center justify-center text-[9px] xs:text-[10px] font-bold border-2 border-zinc-900",
                          call.qualityScore >= 80 ? "bg-emerald-500 text-white" :
                          call.qualityScore >= 60 ? "bg-yellow-500 text-black" :
                          "bg-red-500 text-white"
                        )}>
                          {call.qualityScore}
                        </div>
                      )}
                    </div>

                    {/* Call Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 mb-1">
                        <h3 className="font-semibold text-white text-sm xs:text-base truncate">{call.lead}</h3>
                        <span className={cn("px-1.5 xs:px-2 py-0.5 rounded-full text-[10px] xs:text-xs font-medium whitespace-nowrap", styles.bg, styles.text)}>
                          {call.outcome}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 xs:gap-3 text-[11px] xs:text-xs text-zinc-500">
                        <span className="hidden xs:inline">{call.phone}</span>
                        <span className="hidden xs:inline">•</span>
                        <span>{call.sourceIcon} {call.source}</span>
                        <span>•</span>
                        <span>Call #{call.sequenceCall}</span>
                      </div>
                      {call.keyPoints.length > 0 && (
                        <div className="hidden xs:flex flex-wrap gap-1 mt-2">
                          {call.keyPoints.slice(0, 3).map((point, i) => (
                            <span key={i} className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                              {point}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-3 xs:gap-4 flex-shrink-0 ml-auto xs:ml-0">
                    <div className="text-right">
                      <p className="text-sm font-mono text-white">{call.duration}</p>
                      <p className="text-[11px] xs:text-xs text-zinc-500">{call.time}</p>
                    </div>
                    {call.hasRecording && (
                      <button className="p-1.5 xs:p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
                        <Play className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call Detail Modal/Panel */}
      {selectedCallData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 md:left-64 bg-zinc-900 border-t border-zinc-800 p-4 sm:p-6 z-40 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{selectedCallData.lead}</h3>
                <p className="text-zinc-500 text-sm sm:text-base truncate">{selectedCallData.phone} • {selectedCallData.source}</p>
              </div>
              <button
                onClick={() => setSelectedCall(null)}
                className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recording Player */}
              <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                  </button>
                  <div className="flex-1">
                    <div className="h-2 bg-zinc-700 rounded-full mb-1">
                      <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>1:14</span>
                      <span>{selectedCallData.duration}</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                {/* Call Summary */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Quality Score</span>
                    <span className={cn(
                      "font-bold",
                      selectedCallData.qualityScore && selectedCallData.qualityScore >= 80 ? "text-emerald-400" :
                      selectedCallData.qualityScore && selectedCallData.qualityScore >= 60 ? "text-yellow-400" :
                      "text-red-400"
                    )}>
                      {selectedCallData.qualityScore || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Sentiment</span>
                    <span className={cn(
                      "capitalize",
                      selectedCallData.sentiment === "very_positive" && "text-emerald-400",
                      selectedCallData.sentiment === "positive" && "text-green-400",
                      selectedCallData.sentiment === "neutral" && "text-yellow-400",
                      selectedCallData.sentiment === "negative" && "text-red-400"
                    )}>
                      {selectedCallData.sentiment?.replace("_", " ") || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Next Action</span>
                    <span className="text-emerald-400 text-sm">{selectedCallData.nextAction}</span>
                  </div>
                </div>
              </div>

              {/* Transcript */}
              <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Transcript
                  </h4>
                  <button className="text-xs text-zinc-400 hover:text-white">Copy</button>
                </div>
                <div className="max-h-48 overflow-y-auto text-sm text-zinc-400 whitespace-pre-line">
                  {selectedCallData.transcript || selectedCallData.voicemailScript || "No transcript available"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
