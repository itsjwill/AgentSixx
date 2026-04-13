"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface StickyHeaderProps {
  children: ReactNode;
  className?: string;
}

export function StickyHeader({ children, className }: StickyHeaderProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(9, 9, 11, 0)", "rgba(9, 9, 11, 0.9)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(12px)"]
  );

  return (
    <motion.header
      className={cn("fixed top-0 left-0 right-0 z-50", className)}
      style={{ backgroundColor, backdropFilter: backdropBlur }}
    >
      {children}
    </motion.header>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight";
}

export function AnimatedNavLink({
  href,
  children,
  className,
  variant = "default",
}: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 text-sm font-medium transition-colors",
        variant === "default" && "text-zinc-400 hover:text-white",
        variant === "highlight" && "text-zinc-300 hover:text-emerald-400",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.span
        className={cn(
          "absolute -bottom-px left-0 h-px bg-gradient-to-r",
          variant === "default" && "from-zinc-400 to-zinc-600",
          variant === "highlight" && "from-emerald-400 to-cyan-400"
        )}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}

interface TabNavProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "default" | "pill";
  className?: string;
}

export function TabNav({
  tabs,
  activeTab,
  onChange,
  className,
}: TabNavProps) {
  return (
    <div
      className={cn(
        "inline-flex gap-1 p-1 rounded-full bg-zinc-900 border border-zinc-800",
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
            activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              className="absolute inset-0 rounded-full bg-zinc-800"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
