"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill }: SpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={cn(
        "pointer-events-none absolute z-[1] h-[150%] w-[150%]",
        className
      )}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="600"
          cy="0"
          rx="600"
          ry="600"
          fill={fill || "url(#spotlight-gradient)"}
        />
        <defs>
          <radialGradient
            id="spotlight-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(600) rotate(90) scale(600)"
          >
            <stop stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="0.5" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="1" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function Spotlights({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />
      <Spotlight className="-top-20 right-0 md:right-60 md:-top-10" fill="url(#spotlight-gradient-2)" />
      <svg className="hidden">
        <defs>
          <radialGradient
            id="spotlight-gradient-2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(600) rotate(90) scale(600)"
          >
            <stop stopColor="#0ea5e9" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="1" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
