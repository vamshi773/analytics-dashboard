"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { ProductsResponse } from "@/types/products";

export function useProducts(params: {
  q: string;
  category: string;
  status: string;
}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.status) qs.set("status", params.status);

  return useSWR<ProductsResponse>(`/api/products?${qs.toString()}`, fetcher, {
    refreshInterval: 30_000,
    revalidateOnFocus: true,
    errorRetryCount: 3,
  });
}
