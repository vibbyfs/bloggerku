import { CircleUser } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-gray-900">
            <Image src="/logo.png" alt="empty" width={30} height={30} />
          </div>
        </div>

        <div className="flex items-center space-x-4 gap-4">
          <nav className="mr-2">
            <Link
              href="/"
              className="text-md font-bold text-gray-600 hover:text-black"
            >
              Blog
            </Link>
          </nav>

          <Link
            href="/login"
            className="flex items-center text-sm text-gray-700 hover:text-black"
          >
            <CircleUser className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
