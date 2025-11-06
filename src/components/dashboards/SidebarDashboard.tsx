"use client";

import { logout } from "@/app/services/auth";
import { AlbumIcon, LogOut, StickyNoteIcon, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarDashboard() {
  const router = useRouter();
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-6 hidden md:block fixed z-100">
      <h2 className="text-lg font-bold mb-6">My Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/posts">
          <div className="flex items-center space-x-2 hover:text-gray-300 mt-3">
            <StickyNoteIcon size={18} />
            <span>Posts</span>
          </div>
        </Link>

        <Link href="/categories">
          <div className="flex items-center space-x-2 hover:text-gray-300 mt-3">
            <AlbumIcon size={18} />
            <span>Categories</span>
          </div>
        </Link>

        <Link href="/add-user">
          <div className="flex items-center space-x-2 hover:text-gray-300 mt-3">
            <Users size={18} />
            <span>Add Staff</span>
          </div>
        </Link>

        <div
          className="flex items-center space-x-2 hover:text-gray-300 mt-3 cursor-pointer"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </nav>
    </aside>
  );
}
