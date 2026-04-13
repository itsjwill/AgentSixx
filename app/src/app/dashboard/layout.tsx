"use client";

import { Sidebar } from "@/components/custom/sidebar";
import { Topbar } from "@/components/custom/topbar";
import { MobileNav } from "@/components/custom/mobile-nav";
import { useState, createContext, useContext, useEffect } from "react";

// Context for sidebar state
export const SidebarContext = createContext<{
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="min-h-screen bg-zinc-950" style={{ backgroundColor: '#09090b' }}>
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))] pointer-events-none" />

        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div
          className="transition-[margin] duration-300 relative"
          style={{ marginLeft: isMobile ? 0 : (collapsed ? 72 : 260) }}
        >
          <div className="hidden md:block">
            <Topbar />
          </div>
          <main className="p-4 md:p-6 pb-20 md:pb-6 bg-zinc-950">{children}</main>
        </div>

        {/* Mobile bottom tab bar - visible only on mobile */}
        <MobileNav />
      </div>
    </SidebarContext.Provider>
  );
}
