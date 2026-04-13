"use client";

import { cn } from "@/lib/utils";

type LeadStatus = "new" | "contacted" | "engaged" | "hot" | "qualified" | "dead" | "dnc" | "connected" | "voicemail" | "callback";
type CampaignStatus = "draft" | "active" | "paused" | "completed";

const statusConfig: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: "New", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
  contacted: { label: "Contacted", bg: "bg-slate-500/10", text: "text-slate-400", dot: "bg-slate-500" },
  engaged: { label: "Engaged", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
  hot: { label: "Hot", bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-500" },
  qualified: { label: "Qualified", bg: "bg-teal-500/10", text: "text-teal-400", dot: "bg-teal-500" },
  dead: { label: "Dead", bg: "bg-gray-500/10", text: "text-gray-500", dot: "bg-gray-400" },
  dnc: { label: "DNC", bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-500" },
  connected: { label: "Connected", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
  voicemail: { label: "Voicemail", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500" },
  callback: { label: "Callback", bg: "bg-cyan-500/10", text: "text-cyan-400", dot: "bg-cyan-500" },
  draft: { label: "Draft", bg: "bg-slate-500/10", text: "text-slate-400", dot: "bg-slate-400" },
  active: { label: "Active", bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
  paused: { label: "Paused", bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-500" },
  completed: { label: "Completed", bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
};

interface StatusBadgeProps {
  status: LeadStatus | CampaignStatus | string;
  size?: "sm" | "md";
  animated?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = "sm", className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.new;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot, (status === "hot" || status === "active") && "animate-pulse")} />
      {config.label}
    </span>
  );
}
