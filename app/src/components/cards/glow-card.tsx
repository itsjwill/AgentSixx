"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(16, 185, 129, 0.15)",
}: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-colors hover:border-zinc-700",
        className
      )}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface BeamCardProps {
  children: ReactNode;
  className?: string;
  beamProps?: {
    colorFrom?: string;
    colorTo?: string;
    duration?: number;
  };
}

export function BeamCard({ children, className, beamProps }: BeamCardProps) {
  const { colorFrom = "#10b981", colorTo = "#06b6d4", duration = 8 } = beamProps || {};

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50",
        className
      )}
      style={{ "--duration": duration } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 animate-border-beam"
        style={{
          background: `linear-gradient(90deg, transparent, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: "rect(0 auto auto 0)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
