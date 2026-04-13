"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  linkToHome?: boolean;
}

export function Logo({ className = "", size = "md", linkToHome = true }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 32 },
    md: { width: 150, height: 40 },
    lg: { width: 180, height: 48 },
  };

  const { width, height } = sizes[size];

  const logoImage = (
    <Image
      src="/logo.png"
      alt="AgentSix"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
    />
  );

  if (linkToHome) {
    return (
      <Link href="/" className="flex items-center">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}
