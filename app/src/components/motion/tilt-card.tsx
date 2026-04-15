"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  rotationIntensity?: number;
  glowColor?: string;
}

export function TiltCard({
  children,
  className,
  containerClassName,
  rotationIntensity = 10,
  glowColor = "rgba(16, 185, 129, 0.25)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [rotationIntensity, -rotationIntensity]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-rotationIntensity, rotationIntensity]),
    { stiffness: 300, damping: 30 }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={cn("[perspective:1000px] h-full", containerClassName)}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        className={cn("relative h-full transition-shadow duration-300", className)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: hovering
            ? `0 25px 50px -12px ${glowColor}, 0 0 0 1px ${glowColor}`
            : "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div className="h-full" style={{ transform: "translateZ(40px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
