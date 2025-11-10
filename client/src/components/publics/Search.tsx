"use client";
import { FormEvent, useState } from "react";

export default function SearchInput({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const [term, setTerm] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(term);
  }

  function handleReset() {
    setTerm("");
    onSearch("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 py-1 shadow-sm w-full mt-2"
    >
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="text"
        placeholder="Search title..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
      />
      <button type="submit"></button>
      <button
        type="button"
        onClick={handleReset}
        className="text-xs px-2 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
      >
        Reset
      </button>
    </form>
  );
}
