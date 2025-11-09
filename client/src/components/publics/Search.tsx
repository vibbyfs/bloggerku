import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

export default function SearchInput() {
  return (
    <form className="hidden md:flex items-center bg-white border border-gray-300 rounded-xl px-4 py-1 shadow-sm w-45">
      <Search className="text-gray-400 w-4 h-4 mr-2" />
      <input
        type="text"
        placeholder="Search title..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
      />
    </form>
  );
}
