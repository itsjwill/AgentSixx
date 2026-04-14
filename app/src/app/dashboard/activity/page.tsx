"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  UserPlus,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Search,
} from "lucide-react";

type Activity = {
  id: number;
  type: "new_lead" | "call" | "email" | "sms" | "appointment" | "status_change" | "score_change";
  lead: string;
  message: string;
  timestamp: string;
  icon: typeof UserPlus;
};

const ACTIVITY_LOG: Activity[] = [
  { id: 1, type: "new_lead", lead: "John Smith", message: "New lead from Zillow", timestamp: "2 min ago", icon: UserPlus },
  { id: 2, type: "call", lead: "David Lee", message: "Call completed — 8 min, interested in investment properties", timestamp: "15 min ago", icon: Phone },
  { id: 3, type: "email", lead: "Sarah Johnson", message: "Email opened — \"Properties in Scottsdale\"", timestamp: "32 min ago", icon: Mail },
  { id: 4, type: "status_change", lead: "Mike Wilson", message: "Moved to Negotiation stage", timestamp: "1 hr ago", icon: ArrowUpRight },
  { id: 5, type: "sms", lead: "Jennifer Adams", message: "SMS replied — ready to schedule a showing", timestamp: "1.5 hr ago", icon: MessageSquare },
  { id: 6, type: "appointment", lead: "Maria Garcia", message: "Showing scheduled for tomorrow 3 PM", timestamp: "2 hr ago", icon: Calendar },
  { id: 7, type: "new_lead", lead: "Robert Chen", message: "New lead from Cold Call campaign", timestamp: "3 hr ago", icon: UserPlus },
  { id: 8, type: "score_change", lead: "Amanda Foster", message: "Lead score increased to 71 (was 58)", timestamp: "4 hr ago", icon: TrendingUp },
  { id: 9, type: "call", lead: "Emily Roberts", message: "Callback scheduled — tomorrow at 3 PM", timestamp: "5 hr ago", icon: Phone },
  { id: 10, type: "email", lead: "Tom Baker", message: "Email sent — investment analysis attached", timestamp: "6 hr ago", icon: Mail },
  { id: 11, type: "appointment", lead: "Laura Chen", message: "Appointment completed, offer submitted", timestamp: "Yesterday", icon: CheckCircle },
  { id: 12, type: "sms", lead: "Michael Park", message: "SMS delivered — showing reminder", timestamp: "Yesterday", icon: MessageSquare },
  { id: 13, type: "new_lead", lead: "Rachel Kim", message: "New lead from Facebook Ads", timestamp: "Yesterday", icon: UserPlus },
  { id: 14, type: "call", lead: "Steven Liu", message: "Voicemail left — discussed cash flow analysis", timestamp: "2 days ago", icon: Phone },
  { id: 15, type: "status_change", lead: "Nicole Ramos", message: "Moved to Qualified stage", timestamp: "2 days ago", icon: ArrowUpRight },
];

const COLORS: Record<Activity["type"], string> = {
  new_lead: "text-emerald-400 bg-emerald-500/10",
  call: "text-blue-400 bg-blue-500/10",
  email: "text-cyan-400 bg-cyan-500/10",
  sms: "text-amber-400 bg-amber-500/10",
  appointment: "text-violet-400 bg-violet-500/10",
  status_change: "text-orange-400 bg-orange-500/10",
  score_change: "text-emerald-400 bg-emerald-500/10",
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "new_lead", label: "New Leads" },
  { id: "call", label: "Calls" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "Emails" },
  { id: "appointment", label: "Appointments" },
];

export default function ActivityPage() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = ACTIVITY_LOG.filter((a) => {
    const matchesFilter = filter === "all" || a.type === filter;
    const matchesSearch =
      !search ||
      a.lead.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 xs:w-6 xs:h-6" />
          Activity
        </h1>
        <p className="text-xs xs:text-sm text-zinc-500 mt-1">
          Full timeline of every lead interaction across your account
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by lead or activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-xs xs:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs xs:text-sm transition-colors",
                filter === f.id
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-transparent"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <Activity className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No activity matches your filters</p>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 divide-y divide-zinc-800">
          {filtered.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-start gap-3 p-3 xs:p-4 hover:bg-zinc-800/30 transition-colors"
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", COLORS[a.type])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-medium text-white text-sm truncate">{a.lead}</span>
                    <span className="text-xs text-zinc-500 capitalize">{a.type.replace(/_/g, " ")}</span>
                  </div>
                  <p className="text-xs xs:text-sm text-zinc-400 mt-0.5">{a.message}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {a.timestamp}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}