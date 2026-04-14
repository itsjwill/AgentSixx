"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Phone,
  Video,
  Plus,
} from "lucide-react";

type Appt = {
  id: number;
  lead: string;
  type: "showing" | "call" | "video" | "closing";
  time: string;
  location: string;
  status: "confirmed" | "pending" | "tentative";
  dateOffset: number;
};

const APPTS: Appt[] = [
  { id: 1, lead: "Maria Garcia", type: "showing", time: "9:00 AM", location: "1247 Oak Ridge Dr, Scottsdale", status: "confirmed", dateOffset: 0 },
  { id: 2, lead: "John Smith", type: "call", time: "11:30 AM", location: "Phone call", status: "confirmed", dateOffset: 0 },
  { id: 3, lead: "Sarah Johnson", type: "video", time: "2:00 PM", location: "Zoom", status: "pending", dateOffset: 0 },
  { id: 4, lead: "David Lee", type: "showing", time: "4:30 PM", location: "892 Camelback Rd, Phoenix", status: "confirmed", dateOffset: 0 },
  { id: 5, lead: "Jennifer Adams", type: "showing", time: "10:00 AM", location: "555 Desert View Ln, Tempe", status: "confirmed", dateOffset: 1 },
  { id: 6, lead: "Mike Wilson", type: "closing", time: "1:00 PM", location: "Stewart Title, Scottsdale office", status: "confirmed", dateOffset: 1 },
  { id: 7, lead: "Robert Chen", type: "call", time: "3:30 PM", location: "Phone call", status: "tentative", dateOffset: 1 },
  { id: 8, lead: "Amanda Foster", type: "showing", time: "11:00 AM", location: "2100 E Thomas Rd, Phoenix", status: "confirmed", dateOffset: 2 },
  { id: 9, lead: "Tom Baker", type: "video", time: "2:30 PM", location: "Google Meet", status: "confirmed", dateOffset: 2 },
  { id: 10, lead: "Laura Chen", type: "closing", time: "10:00 AM", location: "Fidelity Title, Phoenix office", status: "confirmed", dateOffset: 3 },
];

const TYPE_META = {
  showing: { label: "Showing", color: "text-violet-400 bg-violet-500/10 border-violet-500/30", icon: MapPin },
  call: { label: "Call", color: "text-blue-400 bg-blue-500/10 border-blue-500/30", icon: Phone },
  video: { label: "Video", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30", icon: Video },
  closing: { label: "Closing", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30", icon: CalendarIcon },
} as const;

const STATUS_META = {
  confirmed: { label: "Confirmed", color: "text-emerald-400 bg-emerald-500/10" },
  pending: { label: "Pending", color: "text-amber-400 bg-amber-500/10" },
  tentative: { label: "Tentative", color: "text-zinc-400 bg-zinc-700/40" },
} as const;

function formatDate(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function SchedulePage() {
  const [offset, setOffset] = useState(0);
  const appts = APPTS.filter((a) => a.dateOffset === offset);
  const totalToday = APPTS.filter((a) => a.dateOffset === 0).length;
  const totalWeek = APPTS.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3">
        <div>
          <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 xs:w-6 xs:h-6" />
            Schedule
          </h1>
          <p className="text-xs xs:text-sm text-zinc-500 mt-1">
            {totalToday} today, {totalWeek} this week
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs xs:text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          New Appointment
        </button>
      </div>

      {/* Day Navigator */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/80 p-3">
        <button
          onClick={() => setOffset((o) => Math.max(0, o - 1))}
          disabled={offset === 0}
          className="p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <p className="text-sm xs:text-base font-semibold text-white">{formatDate(offset)}</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : `${offset} days out`}
          </p>
        </div>
        <button
          onClick={() => setOffset((o) => Math.min(6, o + 1))}
          disabled={offset === 6}
          className="p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Appointment list */}
      {appts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-10 text-center">
          <CalendarIcon className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-sm text-zinc-500">No appointments on this day</p>
        </div>
      ) : (
        <div className="space-y-2">
          {appts.map((a, i) => {
            const meta = TYPE_META[a.type];
            const Icon = meta.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 p-3 xs:p-4 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 transition-colors"
              >
                <div className="text-center min-w-[60px]">
                  <p className="text-sm font-semibold text-white">{a.time}</p>
                </div>
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border", meta.color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm truncate flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      {a.lead}
                    </span>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full", meta.color)}>
                      {meta.label}
                    </span>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full", STATUS_META[a.status].color)}>
                      {STATUS_META[a.status].label}
                    </span>
                  </div>
                  <p className="text-xs xs:text-sm text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {a.location}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}