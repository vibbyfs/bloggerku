"use client";

import Link from "next/link";
import Button from "../commons/Button";
import { FormEvent, useState } from "react";
import { addUser } from "@/app/services/user";
import { useRouter } from "next/navigation";

export default function FormAddUser() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await addUser(form);

      setForm({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
      });

      router.push("/dashboard");
    } catch (err) {
      console.log("ERROR HANDLE SUBMIT ADD USER", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-300 shadow-md rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Add New User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="your address"
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
