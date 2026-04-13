"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Bell, Moon, Sun, Plus } from "lucide-react";

const mockUser = { name: "Demo User" };

export function Topbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="h-14 sm:h-16 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <motion.div
          className={cn(
            "relative flex items-center rounded-lg border transition-all bg-zinc-900/50",
            searchFocused
              ? "border-emerald-500/50 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
              : "border-zinc-800"
          )}
          animate={{ scale: searchFocused ? 1.01 : 1 }}
        >
          <Search className="w-4 h-4 text-zinc-500 ml-2 sm:ml-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-transparent text-sm outline-none placeholder:text-zinc-500 text-zinc-200"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="hidden md:flex mr-3 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
            /K
          </kbd>
        </motion.div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1.5 sm:gap-3 ml-2 sm:ml-4">
        {/* Quick Add */}
        <motion.button
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg text-xs sm:text-sm font-medium shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add Lead</span>
        </motion.button>

        {/* Notifications */}
        <motion.button
          className="relative p-1.5 sm:p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          <span className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
        </motion.button>

        {/* Theme Toggle - hidden on very small screens */}
        <motion.button
          onClick={toggleDark}
          className="hidden xs:block p-1.5 sm:p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          ) : (
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400" />
          )}
        </motion.button>

        {/* User Avatar */}
        <motion.button
          className="flex items-center gap-2 pl-2 sm:pl-3 pr-0.5 sm:pr-1 py-0.5 sm:py-1 rounded-full hover:bg-zinc-800/50 transition-colors border border-zinc-800"
          whileHover={{ scale: 1.01 }}
        >
          <span className="text-sm font-medium hidden md:inline text-zinc-300">{mockUser.name}</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-semibold text-white">
              {mockUser.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        </motion.button>
      </div>
    </header>
  );
}
