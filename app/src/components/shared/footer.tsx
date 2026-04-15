"use client";

import Link from "next/link";

import { Logo } from "@/components/shared/logo";

export function Footer() {
  return (
    <footer className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-8 md:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-2 md:col-span-4 lg:col-span-2 mb-4 lg:mb-0">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size="sm" linkToHome={false} />
            </Link>
            <p className="text-zinc-500 max-w-xs text-sm sm:text-base leading-relaxed">
              The only TCPA-compliant Voice ISA, SMS, and email response for real estate agents.
            </p>
          </div>
          {[
            { title: "Product", links: [
              { name: "Features", href: "/features" },
              { name: "Pricing", href: "/pricing" },
              { name: "How It Works", href: "/how-it-works" }
            ]},
            { title: "Resources", links: [
              { name: "FAQ", href: "/faq" },
              { name: "Blog", href: "/blog" },
              { name: "Compliance", href: "/compliance" }
            ]},
            { title: "Company", links: [
              { name: "About", href: "/about" },
              { name: "Dashboard", href: "/dashboard" }
            ]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base text-white">{col.title}</h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-zinc-500 hover:text-white transition-colors text-sm py-1 inline-block">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 sm:pt-8 border-t border-zinc-800 gap-4">
          <p className="text-zinc-600 text-xs sm:text-sm order-2 sm:order-1">&copy; 2026 AgentSixx. All rights reserved.</p>
          <div className="flex items-center gap-6 order-1 sm:order-2">
            <Link href="/privacy" className="text-zinc-500 hover:text-white transition-colors text-sm py-1">Privacy</Link>
            <Link href="/terms" className="text-zinc-500 hover:text-white transition-colors text-sm py-1">Terms</Link>
            <Link href="/compliance" className="text-zinc-500 hover:text-white transition-colors text-sm py-1">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
