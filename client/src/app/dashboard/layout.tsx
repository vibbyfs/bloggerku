// src/app/dashboard/layout.tsx
import SidebarDashboard from "@/components/dashboards/SidebarDashboard";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="hidden sm:block w-64 bg-white">
        <SidebarDashboard />
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
