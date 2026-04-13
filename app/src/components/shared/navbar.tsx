"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./logo";

interface NavbarProps {
  activePage?: string;
}

const navLinks = [
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Compliance", href: "/compliance" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar({ activePage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-2xl bg-black/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo size="sm" />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors ${
                activePage === link.name
                  ? "text-emerald-400 font-medium"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-zinc-400 hover:text-white transition-colors px-4 py-2"
          >
            Dashboard
          </Link>
          <Link
            href="/pricing"
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden mt-4 pb-4 border-t border-zinc-800 pt-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-2 ${
                  activePage === link.name
                    ? "text-emerald-400 font-medium"
                    : "text-zinc-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="text-zinc-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="mt-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-black font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Demo
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
