"use client";
import { ReactNode, useEffect } from "react";
import { getSavedToken, setAuthToken } from "@/app/services/auth";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getSavedToken();
    if (!token) {
      router.replace("/login");
    } else {
      setAuthToken(token);
    }
  }, [router]);

  return <>{children}</>;
}
