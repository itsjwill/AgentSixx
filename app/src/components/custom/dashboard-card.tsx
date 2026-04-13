"use client";

import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function DashboardCard({
  children,
  className,
  hover = true,
  glow = false,
  onClick,
}: DashboardCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-zinc-800 bg-zinc-900 p-5 overflow-hidden transition-all duration-200",
        hover && "cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/80",
        glow && "ring-1 ring-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]",
        className
      )}
      onClick={onClick}
    >
      {/* Top gradient border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
