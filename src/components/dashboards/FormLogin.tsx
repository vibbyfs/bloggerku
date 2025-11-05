"use client";

import Link from "next/link";
import Button from "../commons/Button";
import { FormEvent, useState } from "react";
import { loginUser, saveToken, setAuthToken } from "../../app/services/auth";
import { useRouter } from "next/navigation";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      saveToken(data.accesToken);
      setAuthToken(data.accesToken);
      router.push("/dashboard");
    } catch (err) {
      console.log("ERROR HANDLE SUBMIT LOGIN", err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
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
            className="form-input w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray- mb-5"
            placeholder="••••••••"
          />
        </div>
        <div>
          <Button label="Login" type="submit" className="w-full" />
        </div>

        <Link href="/">
          <div className="flex justify-center mt-5">
            <p className="text-gray-500 hover:text-gray-600 pt-5 text-sm">
              No Account yet? Feel free to explore our blog section.
            </p>
          </div>
        </Link>
      </form>
    </>
  );
}
