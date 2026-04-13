"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  gradient = "from-emerald-400 via-cyan-400 to-blue-400",
  className,
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        gradient,
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  duration = 0.05,
}: TextGenerateEffectProps) {
  const wordArray = words.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: duration,
          },
        },
      }}
    >
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface FlipWordsProps {
  words: string[];
  className?: string;
  duration?: number;
}

export function FlipWords({
  words,
  className,
  duration = 3000,
}: FlipWordsProps) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      key={words[0]}
    >
      <motion.span
        animate={{
          content: words,
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
            transition={{
              duration: (duration / 1000) / words.length,
              delay: i * ((duration / 1000) / words.length),
              repeat: Infinity,
              repeatDelay: (duration / 1000) - ((duration / 1000) / words.length),
            }}
            className="absolute"
            style={{ display: i === 0 ? "inline" : "none" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  );
}
