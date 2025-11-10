"use client";
import { ReactNode, useEffect } from "react";
import { getSavedToken } from "@/app/services/auth";

export default function PublicGuard({ children }: { children: ReactNode }) {
  useEffect(() => {
    const token = getSavedToken();
    if (token) {
      window.location.replace("/dashboard");
    }
  }, []);

  return <>{children}</>;
}
