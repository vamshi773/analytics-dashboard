"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useFilterStore } from "@/store/filterStore";
import { exportCSV, exportExcel, exportPDF } from "@/utils/exportUtils";

type Order = {
  id: string;
  customer: string;
  status: string;
  amount: number;
  date: string;
};

export default function OrdersTable({ data }: { data: Order[] }) {
  const { search } = useFilterStore();

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "Order ID" },
      { accessorKey: "customer", header: "Customer" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }: any) => `₹${row.original.amount}`,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }: any) => new Date(row.original.date).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter: search },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _, value) =>
      JSON.stringify(row.original).toLowerCase().includes(value.toLowerCase()),
  });

  const filteredRows = table.getRowModel().rows.map((r) => r.original);

  return (
    <div className="space-y-3">
      {/* Export buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportCSV(filteredRows, "orders.csv")}
        >
          Export CSV
        </button>
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportExcel(filteredRows, "orders.xlsx")}
        >
          Export Excel
        </button>
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportPDF(filteredRows, "orders.pdf")}
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
<table className="w-full text-sm border rounded-lg overflow-hidden">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th key={h.id} className="p-2 text-left">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-accent">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          className="border px-3 py-1 rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1}
        </span>

        <button
          className="border px-3 py-1 rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
