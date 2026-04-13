"use client";

import { cn } from "@/lib/utils";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface NumberTickerProps {
  value: number;
  className?: string;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
}

export function NumberTicker({
  value,
  className,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  prefix = "",
  suffix = "",
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent =
            prefix +
            Intl.NumberFormat("en-US", {
              minimumFractionDigits: decimalPlaces,
              maximumFractionDigits: decimalPlaces,
            }).format(Number(latest.toFixed(decimalPlaces))) +
            suffix;
        }
      }),
    [springValue, decimalPlaces, prefix, suffix]
  );

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider text-white",
        className
      )}
    >
      {prefix}0{suffix}
    </span>
  );
}

interface StatCardProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  value,
  label,
  prefix = "",
  suffix = "",
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl md:text-5xl font-bold text-emerald-400">
        <NumberTicker value={value} prefix={prefix} suffix={suffix} delay={delay} />
      </div>
      <div className="text-zinc-500 mt-2">{label}</div>
    </div>
  );
}
