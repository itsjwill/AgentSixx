"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Megaphone,
  Target,
  Users,
  Phone,
  MessageSquare,
  Mail,
  Check,
} from "lucide-react";

const CHANNELS = [
  { id: "voice", label: "Voice", icon: Phone, description: "Autonomous calls via Voice ISA" },
  { id: "sms", label: "SMS", icon: MessageSquare, description: "Text message sequences" },
  { id: "email", label: "Email", icon: Mail, description: "Email nurture" },
];

const SOURCES = [
  { id: "zillow", label: "Zillow" },
  { id: "facebook", label: "Facebook Ads" },
  { id: "realtor", label: "Realtor.com" },
  { id: "google", label: "Google Ads" },
  { id: "website", label: "Website" },
  { id: "referral", label: "Referral" },
];

export default function NewCampaignPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("book_appointments");
  const [channels, setChannels] = useState<string[]>(["voice"]);
  const [sources, setSources] = useState<string[]>([]);
  const [dailyLimit, setDailyLimit] = useState(100);

  function toggle(list: string[], id: string, setter: (v: string[]) => void) {
    setter(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard/campaigns");
  }

  const canSubmit = name.trim().length > 0 && channels.length > 0 && sources.length > 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link href="/dashboard/campaigns" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to campaigns
      </Link>

      <div>
        <h1 className="text-xl xs:text-2xl font-bold text-white flex items-center gap-2">
          <Megaphone className="w-5 h-5 xs:w-6 xs:h-6" />
          New Campaign
        </h1>
        <p className="text-xs xs:text-sm text-zinc-500 mt-1">
          Configure channels, sources, and pace. Voice scripts can be approved after creation.
        </p>
      </div>

      <form onSubmit={handleCreate} className="space-y-6">
        {/* Name */}
        <Section title="Campaign name" description="Internal name, shown on the campaigns list.">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q2 Past Client Re-engagement"
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            required
          />
        </Section>

        {/* Goal */}
        <Section title="Primary goal" description="What do you want the Voice ISA to optimize for?">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: "book_appointments", label: "Book appointments", icon: Target },
              { id: "qualify_leads", label: "Qualify leads", icon: Users },
              { id: "re_engage", label: "Re-engage cold leads", icon: Phone },
            ].map((g) => {
              const Icon = g.icon;
              const selected = goal === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors",
                    selected
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      : "bg-zinc-800/50 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Channels */}
        <Section title="Channels" description="Pick at least one. Voice is recommended for best conversion.">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const selected = channels.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => toggle(channels, c.id, setChannels)}
                  className={cn(
                    "p-3 rounded-lg border text-left transition-colors",
                    selected
                      ? "bg-emerald-500/10 border-emerald-500/40"
                      : "bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon className={cn("w-4 h-4", selected ? "text-emerald-400" : "text-zinc-400")} />
                    {selected && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className={cn("text-sm font-medium", selected ? "text-emerald-400" : "text-white")}>{c.label}</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{c.description}</p>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Sources */}
        <Section title="Lead sources" description="Which connected sources should feed this campaign?">
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => {
              const selected = sources.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(sources, s.id, setSources)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs xs:text-sm transition-colors border",
                    selected
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                      : "bg-zinc-800/50 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Daily limit */}
        <Section title="Daily contact limit" description="Max new attempts per day across selected channels.">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={dailyLimit}
              onChange={(e) => setDailyLimit(Number(e.target.value))}
              className="flex-1 accent-emerald-500"
            />
            <div className="min-w-[60px] text-right">
              <p className="text-sm font-semibold text-white">{dailyLimit}</p>
              <p className="text-[10px] text-zinc-500">per day</p>
            </div>
          </div>
        </Section>

        {/* Actions */}
        <div className="flex flex-col xs:flex-row gap-2 justify-end pt-4 border-t border-zinc-800">
          <Link
            href="/dashboard/campaigns"
            className="px-4 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm text-center transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={!canSubmit}
            className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-sm font-medium transition-colors"
          >
            Create campaign
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      {children}
    </div>
  );
}