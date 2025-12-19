"use client";

import Link from "next/link";
import Button from "../commons/Button";
import { FormEvent, useState } from "react";
import { loginUser, saveToken, setAuthToken } from "../../app/services/auth";
import { useRouter } from "next/navigation";
import { showError, showSuccess } from "@/lib/toast";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("staff1@mail.com");
  const [password, setPassword] = useState<string>("password");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      saveToken(data.accessToken);
      setAuthToken(data.accessToken);
      showSuccess("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      showError(err);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h1 className="text-2xl font-bold text-center mb-8">
              Login to Your Account
            </h1>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="••••••••"
              />
            </div>

            <Button label="Login" type="submit" className="w-full" />

            <div className="text-center mt-5">
              <p className="text-gray-500 text-sm">
                <Link href="/">
                  <span className="hover:text-blue-400">
                    Feel free to explore our blog section.
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
