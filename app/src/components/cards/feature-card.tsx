"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  index?: number;
  className?: string;
  color?: "emerald" | "cyan" | "blue" | "purple";
}

export function FeatureCard({
  title,
  description,
  icon,
  index = 0,
  className,
  color = "emerald",
}: FeatureCardProps) {
  const colorClasses = {
    emerald: {
      icon: "from-emerald-500/20 to-cyan-500/20 border-emerald-500/20 text-emerald-400",
      hover: "group-hover:from-emerald-400 group-hover:to-cyan-400",
      line: "group-hover:via-emerald-500/50",
    },
    cyan: {
      icon: "from-cyan-500/20 to-blue-500/20 border-cyan-500/20 text-cyan-400",
      hover: "group-hover:from-cyan-400 group-hover:to-blue-400",
      line: "group-hover:via-cyan-500/50",
    },
    blue: {
      icon: "from-blue-500/20 to-indigo-500/20 border-blue-500/20 text-blue-400",
      hover: "group-hover:from-blue-400 group-hover:to-indigo-400",
      line: "group-hover:via-blue-500/50",
    },
    purple: {
      icon: "from-purple-500/20 to-pink-500/20 border-purple-500/20 text-purple-400",
      hover: "group-hover:from-purple-400 group-hover:to-pink-400",
      line: "group-hover:via-purple-500/50",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8",
        "hover:border-zinc-700/50 transition-all duration-500",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top shine */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Icon */}
      {icon && (
        <div
          className={cn(
            "mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br border",
            colors.icon,
            "transition-colors"
          )}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          "text-xl font-semibold text-white mb-3",
          "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r",
          colors.hover,
          "transition-all duration-300"
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {description}
      </p>

      {/* Bottom gradient */}
      <div
        className={cn(
          "absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent",
          colors.line,
          "transition-colors duration-500"
        )}
      />
    </motion.div>
  );
}

interface BentoGridItemProps {
  title: string;
  description?: string;
  header?: ReactNode;
  icon?: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  const colSpanClasses = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  const rowSpanClasses = {
    1: "md:row-span-1",
    2: "md:row-span-2",
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 overflow-hidden",
        "hover:border-zinc-700 transition-colors duration-300",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {header && <div className="mb-4 rounded-lg overflow-hidden">{header}</div>}
      {icon && <div className="mb-4 text-zinc-400 group-hover:text-zinc-300 transition-colors">{icon}</div>}
      <h3 className="font-bold text-lg text-zinc-100 mb-2 group-hover:text-white transition-colors">{title}</h3>
      {description && (
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{description}</p>
      )}
    </motion.div>
  );
}
