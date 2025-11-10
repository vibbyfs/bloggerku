"use client";
import FormLogin from "@/components/publics/FormLogin";
import { useEffect } from "react";
import { getSavedToken } from "@/app/services/auth";

export default function LoginPage() {
  useEffect(() => {
    if (getSavedToken()) {
      window.location.replace("/dashboard");
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <FormLogin />
    </div>
  );
}
