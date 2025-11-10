// src/app/dashboard/layout.tsx
import React from "react";
import DashboardShell from "../../components/dashboards/DashboardShell";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
