"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Play,
  Pause,
  Plus,
  Users,
  Phone,
  Calendar,
  TrendingUp,
  MoreVertical,
} from "lucide-react";

type Campaign = {
  id: number;
  name: string;
  status: "active" | "paused" | "draft";
  leads: number;
  called: number;
  connected: number;
  appointments: number;
  conversionRate: number;
};

const CAMPAIGNS: Campaign[] = [
  { id: 1, name: "Zillow Lead Response", status: "active", leads: 1247, called: 1198, connected: 523, appointments: 67, conversionRate: 5.4 },
  { id: 2, name: "Facebook Warm Nurture", status: "active", leads: 892, called: 834, connected: 341, appointments: 38, conversionRate: 4.3 },
  { id: 3, name: "Past Client Re-engagement", status: "active", leads: 234, called: 234, connected: 178, appointments: 29, conversionRate: 12.4 },
  { id: 4, name: "Commercial Prospects", status: "paused", leads: 456, called: 234, connected: 78, appointments: 4, conversionRate: 1.7 },
  { id: 5, name: "First-Time Buyer Outreach", status: "active", leads: 678, called: 612, connected: 289, appointments: 47, conversionRate: 6.9 },
  { id: 6, name: "Expired Listings", status: "draft", leads: 0, called: 0, connected: 0, appointments: 0, conversionRate: 0 },
];

const STATUS_META = {
  active: { label: "Active", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", dot: "bg-emerald-400" },
  paused: { label: "Paused", color: "text-amber-400 bg-amber-500/10 border-amber-500/30", dot: "bg-amber-400" },
  draft: { label: "Draft", color: "text-zinc-400 bg-zinc-800/50 border-zinc-700", dot: "bg-zinc-500" },
} as const;

export default function CampaignsPage() {
  const [filter, setFilter] = useState<"all" | Campaign["status"]>("all");
  const shown = filter === "all" ? CAMPAIGNS : CAMPAIGNS.filter((c) => c.status === filter);
  const totalLeads = CAMPAIGNS.reduce((acc, c) => acc + c.leads, 0);
  const totalAppts = CAMPAIGNS.reduce((acc, c) => acc + c.appointments, 0);
  const activeCount = CAMPAIGNS.filter((c) => c.status === "active").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 xs:w-6 xs:h-6" />
            Campaigns
          </h1>
          <p className="text-xs xs:text-sm text-zinc-500 mt-1">
            {activeCount} active, {totalLeads.toLocaleString()} leads, {totalAppts} appointments booked
          </p>
        </div>
        <Link
          href="/dashboard/campaigns/new"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs xs:text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "active", "paused", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs xs:text-sm capitalize transition-colors",
              filter === f
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 border border-transparent"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <Megaphone className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No campaigns match this filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shown.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm xs:text-base truncate">{c.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1.5", STATUS_META[c.status].color)}>
                      <span className={cn("w-1.5 h-1.5 rounded-full", STATUS_META[c.status].dot)} />
                      {STATUS_META[c.status].label}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                  <MoreVertical className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                <Stat icon={Users} label="Leads" value={c.leads.toLocaleString()} />
                <Stat icon={Phone} label="Called" value={c.called.toLocaleString()} />
                <Stat icon={TrendingUp} label="Connected" value={c.connected.toLocaleString()} />
                <Stat icon={Calendar} label="Appts" value={c.appointments.toString()} />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Conversion</p>
                  <p className="text-sm font-semibold text-emerald-400">{c.conversionRate}%</p>
                </div>
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    c.status === "active"
                      ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400"
                  )}
                >
                  {c.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {c.status === "active" ? "Pause" : "Resume"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-zinc-500 mb-0.5">
        <Icon className="w-3 h-3" />
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}