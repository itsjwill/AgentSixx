"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/app/dashboard/layout";
import {
  LayoutDashboard,
  Users,
  Phone,
  Shield,
  Settings,
  ChevronLeft,
  Zap,
  HelpCircle,
  BarChart3,
  MessageSquare,
  Calendar,
  MessageCircle,
  Mic,
  Crown,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Call History", href: "/dashboard/calls", icon: Phone },
  { label: "SMS Follow-up", href: "/dashboard/sms", icon: MessageCircle },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
];

const bottomItems = [
  { label: "Compliance", href: "/dashboard/compliance", icon: Shield },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

// Mock data for sidebar
const planInfo = {
  name: "Pro",
  voiceUsed: 1247,
  voiceTotal: 2000,
};

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 flex flex-col",
        "bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-800/50",
        "transition-[width] duration-300 ease-out"
      )}
      animate={{ width: collapsed ? 72 : 260 }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-zinc-800/50">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent whitespace-nowrap"
              >
                AgentSix
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10 flex-shrink-0", isActive && "text-white")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Slack War Room */}
      <div className="px-3 py-2">
        <a
          href="https://slack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all"
        >
          <MessageCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-purple-300">Slack War Room</p>
              <p className="text-[10px] text-purple-400/60">15 min SLA</p>
            </div>
          )}
        </a>
      </div>

      {/* Bottom Nav */}
      <div className="py-3 px-3 space-y-1 border-t border-zinc-800/50">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all duration-200",
                  isActive && "text-zinc-300 bg-zinc-800/50"
                )}
                whileHover={{ x: 2 }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Voice Minutes & Plan */}
      <div className="px-3 py-3 border-t border-zinc-800/50">
        {!collapsed ? (
          <div className="p-3 rounded-lg bg-zinc-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white">{planInfo.name} Plan</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mic className="w-3 h-3 text-violet-400" />
              <span className="text-xs text-zinc-400">Voice Minutes</span>
            </div>
            <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                style={{ width: `${(planInfo.voiceUsed / planInfo.voiceTotal) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              <span>{planInfo.voiceUsed.toLocaleString()} used</span>
              <span>{planInfo.voiceTotal.toLocaleString()} total</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Crown className="w-4 h-4 text-amber-400" />
            <div className="w-6 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full"
                style={{ width: `${(planInfo.voiceUsed / planInfo.voiceTotal) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-zinc-600 transition-all"
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
          <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
        </motion.div>
      </button>
    </motion.aside>
  );
}
