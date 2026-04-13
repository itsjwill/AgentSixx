"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon?: React.ReactNode;
  className?: string;
  decimals?: number;
  delay?: number;
}

export function MetricCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  trend,
  icon,
  className,
  decimals = 0,
}: MetricCounterProps) {
  const displayValue = value.toFixed(decimals);
  const trendDirection = trend ? (trend > 0 ? "up" : trend < 0 ? "down" : "neutral") : null;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-zinc-500">{icon}</span>}
        <span className="text-sm text-zinc-400 font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-white">
          {prefix}{displayValue}{suffix}
        </span>
        {trendDirection && (
          <span
            className={cn(
              "flex items-center gap-0.5 text-sm font-medium px-2 py-0.5 rounded-full",
              trendDirection === "up" && "text-emerald-400 bg-emerald-500/10",
              trendDirection === "down" && "text-red-400 bg-red-500/10",
              trendDirection === "neutral" && "text-zinc-400 bg-zinc-800"
            )}
          >
            {trendDirection === "up" && <TrendingUp className="w-3.5 h-3.5" />}
            {trendDirection === "down" && <TrendingDown className="w-3.5 h-3.5" />}
            {trendDirection === "neutral" && <Minus className="w-3.5 h-3.5" />}
            {trend && `${trend > 0 ? "+" : ""}${trend}%`}
          </span>
        )}
      </div>
    </div>
  );
}
