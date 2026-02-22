"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  createdAt: string;
};

export function useUsers() {
  return useSWR<{ users: UserRow[] }>("/api/users", fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: true,
    errorRetryCount: 3,
  });
}
