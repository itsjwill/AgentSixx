"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface InfiniteScrollProps {
  children: ReactNode;
  className?: string;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
}

export function InfiniteScroll({
  children,
  className,
  speed = "normal",
  reverse = false,
}: InfiniteScrollProps) {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  return (
    <div
      className={cn("relative flex overflow-hidden", className)}
      style={{ "--duration": speedMap[speed], "--gap": "2rem" } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 gap-[--gap]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 gap-[--gap]",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32 px-6", className)}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  labelColor?: "emerald" | "cyan" | "blue" | "purple";
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  labelColor = "emerald",
}: SectionHeaderProps) {
  const colorClasses = {
    emerald: "text-emerald-400",
    cyan: "text-cyan-400",
    blue: "text-blue-400",
    purple: "text-purple-400",
  };

  return (
    <div className={cn("text-center mb-16 md:mb-20", className)}>
      {label && (
        <FadeIn>
          <span
            className={cn(
              "uppercase tracking-wider text-sm mb-4 block font-medium",
              colorClasses[labelColor]
            )}
          >
            {label}
          </span>
        </FadeIn>
      )}
      <FadeIn delay={0.1}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          {title}
        </h2>
      </FadeIn>
      {description && (
        <FadeIn delay={0.2}>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">{description}</p>
        </FadeIn>
      )}
    </div>
  );
}
