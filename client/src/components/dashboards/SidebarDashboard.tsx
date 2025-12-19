"use client";

import { logout } from "@/app/services/auth";
import { showSuccess } from "@/lib/toast";
import { AlbumIcon, LogOut, StickyNoteIcon, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  onNavigate?: () => void;
};

export default function SidebarDashboard({ onNavigate }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname?.startsWith(href);
  };

  const baseItem =
    "flex items-center gap-3 mt-1 rounded px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-150";

  return (
    <div className="w-64 text-white h-full flex flex-col">
      <h2 className="text-lg font-semibold py-4 px-3">My Dashboard</h2>
      <div className="mb-4 px-3 h-px bg-white/10" />
      <nav className="flex-1 space-y-1 px-1">
        <Link href="/dashboard" onClick={onNavigate}>
          <div
            className={`${baseItem} ${
              isActive("/dashboard") ? "bg-white/10" : "hover:bg-white/10"
            }`}
          >
            <StickyNoteIcon size={18} className="opacity-80" />
            <span>Posts</span>
          </div>
        </Link>

        <Link href="/dashboard/categories" onClick={onNavigate}>
          <div
            className={`${baseItem} ${
              isActive("/dashboard/categories")
                ? "bg-white/10"
                : "hover:bg-white/10"
            }`}
          >
            <AlbumIcon size={18} className="opacity-80" />
            <span>Categories</span>
          </div>
        </Link>

        <Link href="/dashboard/add-user" onClick={onNavigate}>
          <div
            className={`${baseItem} ${
              isActive("/dashboard/add-user")
                ? "bg-white/10"
                : "hover:bg-white/10"
            }`}
          >
            <Users size={18} className="opacity-80" />
            <span>Add User</span>
          </div>
        </Link>

        <button
          className={`${baseItem} w-full text-left hover:bg-white/10 cursor-pointer`}
          onClick={() => {
            logout();
            showSuccess("Logout successful!");
            if (onNavigate) onNavigate();
            router.push("/login");
          }}
        >
          <LogOut size={18} className="opacity-80" />
          <span>Logout</span>
        </button>
      </nav>
      <div className="mt-auto p-3 text-[11px] text-white/40">
        © 2025 Bloggerku
      </div>
    </div>
  );
}
