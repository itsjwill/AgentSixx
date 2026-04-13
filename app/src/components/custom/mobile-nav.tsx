"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Phone,
  Users,
  MessageCircle,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Calls", href: "/dashboard/calls", icon: Phone },
  { label: "SMS", href: "/dashboard/sms", icon: MessageCircle },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800/50 px-1 xs:px-2 pb-safe">
      <div className="flex items-center justify-around py-1.5 xs:py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="flex-1 tap-target">
              <motion.div
                className={cn(
                  "flex flex-col items-center gap-0.5 xs:gap-1 py-1.5 xs:py-2 px-1 xs:px-2 rounded-lg transition-colors",
                  isActive ? "text-emerald-400" : "text-zinc-500"
                )}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="mobile-nav-active"
                      className="absolute -inset-1.5 xs:-inset-2 bg-emerald-500/10 rounded-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                </div>
                <span className="text-[9px] xs:text-[10px] font-medium">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
