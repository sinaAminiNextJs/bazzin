"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validTokens } from "@/public/datasets/tokens";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("tokenBazzin");
    if (!token || !validTokens.includes(token)) {
      router.replace("/");
    }
  }, [router]);
}
