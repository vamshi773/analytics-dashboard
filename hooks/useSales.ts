"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export type SalesMonth = { month: string; sales: number };

export function useSales() {
  return useSWR<{ monthly: SalesMonth[] }>("/api/sales", fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: true,
    errorRetryCount: 3,
  });
}
