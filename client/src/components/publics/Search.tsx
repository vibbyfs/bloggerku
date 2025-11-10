import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <form className="flex items-center bg-white border border-gray-300 rounded-lg px-2 py-1 shadow-sm w-full">
      <Search className="text-gray-400 w-4 h-4 mr-1" />
      <input
        type="text"
        placeholder="Search title..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
      />
    </form>
  );
}
