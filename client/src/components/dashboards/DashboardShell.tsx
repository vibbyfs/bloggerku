"use client";

import { ReactNode, useState } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { Menu, X } from "lucide-react";
import AuthGuard from "@/components/commons/AuthGuard";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-black text-white h-screen sticky top-0 overflow-y-auto">
          <SidebarDashboard />
        </aside>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="absolute left-0 top-0 h-full w-64 bg-black text-white shadow-xl p-6 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarDashboard onNavigate={() => setOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
            <div className="h-14 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  className="md:hidden p-2 rounded border bg-white hover:bg-gray-50"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
                  Dashboard
                </h1>
              </div>
              <div className="text-xs text-gray-500"></div>
            </div>
          </header>
          <main className="p-6 flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
