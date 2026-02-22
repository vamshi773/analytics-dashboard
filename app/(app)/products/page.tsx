"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";
import { exportProductsCSV, exportProductsExcel, exportProductsPDF } from "@/utils/productExport";

const ProductsTable = dynamic(() => import("@/components/products/ProductsTable"), { ssr: false });

export default function ProductsPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const { data, isLoading, error } = useProducts({ q, category, status });

  const rows = data?.products ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-sm text-muted-foreground">Filter, paginate, export products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border p-3 rounded-lg">
        <div className="flex flex-wrap gap-2">
          <input
            className="border rounded-md px-3 py-2 text-sm bg-background sm:w-64"
            placeholder="Search name/id/category..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Other">Other</option>
          </select>

          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            className="border rounded-md px-3 py-2 text-sm"
            onClick={() => {
              setQ("");
              setCategory("All");
              setStatus("All");
            }}
          >
            Clear
          </button>
        </div>

        {/* Export */}
        <div className="flex flex-wrap gap-2">
          <button className="border px-3 py-2 rounded-md text-sm" onClick={() => exportProductsCSV(rows)}>
            Export CSV
          </button>
          <button className="border px-3 py-2 rounded-md text-sm" onClick={() => exportProductsExcel(rows)}>
            Export Excel
          </button>
          <button className="border px-3 py-2 rounded-md text-sm" onClick={() => exportProductsPDF(rows)}>
            Export PDF
          </button>
        </div>
      </div>

      {error && (
        <div className="border rounded-lg p-3 text-sm text-red-600">
          Failed to load products. Refresh the page.
        </div>
      )}

      {isLoading ? <Skeleton className="h-72 w-full" /> : <ProductsTable data={rows} />}
    </div>
  );
}
