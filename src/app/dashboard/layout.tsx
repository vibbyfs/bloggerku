// src/app/dashboard/layout.tsx
import React from "react";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // layout khusus untuk semua halaman di /dashboard/*
  return (
    <html>
      <body>
        <main className="min-h-screen bg-gray-50">
          {/* Tidak ada Navbar di sini */}
          {children}
        </main>
      </body>
    </html>
  );
}
