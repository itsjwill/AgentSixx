"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  UserPlus,
  Phone,
  Calendar,
  AlertTriangle,
  Mail,
  MessageSquare,
  TrendingUp,
  Clock,
} from "lucide-react";

type Notification = {
  id: string;
  type: "lead" | "call" | "appointment" | "alert" | "email" | "sms" | "performance";
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
};

const ICONS = {
  lead: UserPlus,
  call: Phone,
  appointment: Calendar,
  alert: AlertTriangle,
  email: Mail,
  sms: MessageSquare,
  performance: TrendingUp,
} as const;

const COLORS = {
  lead: "text-emerald-400 bg-emerald-500/10",
  call: "text-blue-400 bg-blue-500/10",
  appointment: "text-violet-400 bg-violet-500/10",
  alert: "text-red-400 bg-red-500/10",
  email: "text-cyan-400 bg-cyan-500/10",
  sms: "text-amber-400 bg-amber-500/10",
  performance: "text-emerald-400 bg-emerald-500/10",
} as const;

const MOCK: Notification[] = [
  { id: "1", type: "lead", title: "New hot lead", description: "John Smith from Zillow, pre-approved, looking in Scottsdale.", timestamp: "2 min ago", unread: true },
  { id: "2", type: "appointment", title: "Showing booked", description: "Maria Garcia confirmed for tomorrow at 3 PM.", timestamp: "18 min ago", unread: true },
  { id: "3", type: "call", title: "Call completed", description: "David Lee. 8 min, marked interested.", timestamp: "32 min ago", unread: true },
  { id: "4", type: "sms", title: "SMS reply", description: "Jennifer Adams: \"Yes, please send the listings.\"", timestamp: "1 hr ago", unread: false },
  { id: "5", type: "performance", title: "Weekly milestone", description: "You booked 23 appointments this week, +18% vs last week.", timestamp: "2 hr ago", unread: false },
  { id: "6", type: "alert", title: "DNC list updated", description: "47 new numbers added from the state registry sync.", timestamp: "4 hr ago", unread: false },
  { id: "7", type: "email", title: "Email opened", description: "Mike Wilson opened \"Properties in Glendale\" 3 times.", timestamp: "5 hr ago", unread: false },
  { id: "8", type: "lead", title: "Lead re-engaged", description: "Amanda Foster replied after 45 days of silence.", timestamp: "Yesterday", unread: false },
];

export default function NotificationsPage() {
  const [items, setItems] = useState(MOCK);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const shown = filter === "unread" ? items.filter((i) => i.unread) : items;
  const unreadCount = items.filter((i) => i.unread).length;

  function markAllRead() {
    setItems((prev) => prev.map((i) => ({ ...i, unread: false })));
  }
  function clearAll() {
    setItems([]);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 xs:w-6 xs:h-6" />
            Notifications
          </h1>
          <p className="text-xs xs:text-sm text-zinc-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs xs:text-sm text-zinc-300 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden xs:inline">Mark all read</span>
          </button>
          <button
            onClick={clearAll}
            disabled={items.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs xs:text-sm text-zinc-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden xs:inline">Clear all</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-zinc-500" />
        {(["all", "unread"] as const).map((f) => (
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
            {f === "unread" && unreadCount > 0 && (
              <span className="ml-1.5 text-[10px] font-semibold">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {shown.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <Bell className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">
            {filter === "unread" ? "No unread notifications" : "No notifications"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {shown.map((n, i) => {
            const Icon = ICONS[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={cn(
                  "flex items-start gap-3 p-3 xs:p-4 rounded-xl border transition-colors cursor-pointer",
                  n.unread
                    ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    : "bg-zinc-900/30 border-zinc-900 hover:bg-zinc-900/60"
                )}
              >
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", COLORS[n.type])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className={cn("text-sm font-medium truncate", n.unread ? "text-white" : "text-zinc-400")}>
                      {n.title}
                    </h3>
                    {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
                  </div>
                  <p className="text-xs xs:text-sm text-zinc-500 line-clamp-2">{n.description}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {n.timestamp}
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