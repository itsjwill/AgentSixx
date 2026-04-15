"use client";

import { cn, random } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [meteors, setMeteors] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const newMeteors = Array.from({ length: number }, (_, i) => ({
      id: i,
      style: {
        top: `${random(-5, 30)}%`,
        left: `${random(0, 100)}%`,
        animationDelay: `${random(0, 5)}s`,
        animationDuration: `${random(2, 10)}s`,
      },
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "animate-meteor absolute h-0.5 w-0.5 rotate-[215deg] rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff10]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2",
            "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-emerald-400 before:to-transparent"
          )}
          style={meteor.style}
        />
      ))}
    </div>
  );
}
