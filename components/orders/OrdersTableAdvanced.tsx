"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import type { OrderRow } from "@/types/analytics";
import { exportCSV, exportExcel, exportPDF } from "@/utils/exportUtils";

type Status = "All" | "Pending" | "Completed" | "Cancelled";

function StatusChip({
  label,
  active,
  onClick,
}: {
  label: Status;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border ${
        active ? "bg-accent" : "bg-background"
      }`}
    >
      {label}
    </button>
  );
}

export default function OrdersTableAdvanced({ data }: { data: OrderRow[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((o) => {
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q);

      const matchesStatus =
        status === "All" ? true : o.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  const columns = useMemo<ColumnDef<OrderRow>[]>(
    () => [
      { accessorKey: "id", header: "Order ID" },
      { accessorKey: "customer", header: "Customer" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          const cls =
            s === "Completed"
              ? "bg-green-500/10 border-green-500/30"
              : s === "Pending"
              ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-red-500/10 border-red-500/30";
          return (
            <span className={`px-2 py-1 rounded text-xs border ${cls}`}>
              {s}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => `₹${row.original.amount}`,
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => new Date(row.original.date).toLocaleString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportRows = table.getRowModel().rows.map((r) => r.original);

  return (
    <div className="space-y-3">
      {/* Filters row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["All", "Pending", "Completed", "Cancelled"] as Status[]).map((s) => (
            <StatusChip
              key={s}
              label={s}
              active={status === s}
              onClick={() => setStatus(s)}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            className="border rounded-md px-3 py-2 text-sm bg-background sm:w-64"
            placeholder="Search by order id or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="border rounded-md px-3 py-2 text-sm"
            onClick={() => {
              setSearch("");
              setStatus("All");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportCSV(exportRows, "orders.csv")}
        >
          Export CSV
        </button>
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportExcel(exportRows, "orders.xlsx")}
        >
          Export Excel
        </button>
        <button
          className="px-3 py-2 border rounded-md text-sm"
          onClick={() => exportPDF(exportRows, "orders.pdf")}
        >
          Export PDF
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-muted">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="p-2 text-left whitespace-nowrap">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td className="p-3 text-muted-foreground" colSpan={columns.length}>
                  No orders found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-accent">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1}
        </div>

        <button
          className="border px-3 py-2 rounded-md text-sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
