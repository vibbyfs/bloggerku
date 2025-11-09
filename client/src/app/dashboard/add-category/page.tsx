"use client";

import { createCategory } from "@/app/services/categories";
import Button from "@/components/commons/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const router = useRouter();
  const [name, setName] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createCategory(name);

      setName("");
      router.push("/dashboard/categories");
    } catch (err) {
      console.log("ERROR HANDLE SUBMIT ADD CATEGORY", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Form New Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your name category"
            />
          </div>

          <Button label="Submit" type="submit" className="w-full" />
        </form>

        <div className="mt-3">
          <Link href="/dashboard">
            <Button label="Back" type="submit" className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}
