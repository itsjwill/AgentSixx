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
    sm: { width: 160, height: 40 },
    md: { width: 220, height: 56 },
    lg: { width: 300, height: 76 },
  };

  const { width, height } = sizes[size];

  const logoImage = (
    <Image
      src="/logo.png"
      alt="AgentSixx"
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
