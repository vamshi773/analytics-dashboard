"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { AnalyticsResponse } from "@/types/analytics";

export function useAnalytics(rangeDays: number) {
  return useSWR<AnalyticsResponse>(`/api/analytics?range=${rangeDays}`, fetcher, {
    refreshInterval: 10_000,
    revalidateOnFocus: true,
    errorRetryCount: 3,
  });
}
