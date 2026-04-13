"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 transition-bg",
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--emerald-gradient:repeating-linear-gradient(100deg,#10b981_0%,#059669_7%,transparent_10%,transparent_12%,#10b981_16%)]
            [--cyan-gradient:repeating-linear-gradient(100deg,#06b6d4_0%,#0891b2_7%,transparent_10%,transparent_12%,#06b6d4_16%)]
            [--aurora:repeating-linear-gradient(100deg,#10b981_10%,#14b8a6_15%,#06b6d4_20%,#0ea5e9_25%,#3b82f6_30%)]
            [background-image:var(--emerald-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--cyan-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed]
            after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-40
            will-change-transform
            `,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
