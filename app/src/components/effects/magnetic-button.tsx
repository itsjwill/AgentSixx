"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 rounded-full bg-white text-zinc-900 font-semibold",
        "hover:bg-zinc-100 transition-colors",
        className
      )}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

interface FluidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function FluidButton({ children, className, onClick }: FluidButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative overflow-hidden px-8 py-4 rounded-full font-semibold",
        "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white",
        "hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300",
        "shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500"
        initial={{ x: "100%" }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

interface OutlineButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function OutlineButton({ children, className, onClick }: OutlineButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 rounded-full font-semibold",
        "border-2 border-zinc-700 text-zinc-300",
        "hover:border-emerald-500 hover:text-emerald-400 transition-colors duration-300",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlowButton({ children, className, onClick }: GlowButtonProps) {
  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 rounded-full font-semibold",
        "bg-zinc-900 text-white border border-zinc-800",
        "hover:border-emerald-500/50 transition-colors duration-300",
        "before:absolute before:inset-0 before:rounded-full before:bg-emerald-500/20 before:blur-xl before:opacity-0",
        "hover:before:opacity-100 before:transition-opacity before:-z-10",
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
