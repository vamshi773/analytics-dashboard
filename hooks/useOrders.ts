"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { AnalyticsResponse, OrderRow } from "@/types/analytics";

export function useOrders(rangeDays: number) {
  return useSWR<{ recentOrders: OrderRow[] }>(
    `/api/analytics?range=${rangeDays}`,
    async (url: string) => {
      const data = (await fetcher(url)) as AnalyticsResponse;
      return { recentOrders: data.recentOrders };
    },
    {
      refreshInterval: 10_000,
      revalidateOnFocus: true,
      errorRetryCount: 3,
    }
  );
}
