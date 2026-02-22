"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import type { UserRow } from "@/hooks/useUsers";
import { exportUsersCSV, exportUsersExcel, exportUsersPDF } from "@/utils/userExport";

export default function UsersTable({ data }: { data: UserRow[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | "Active" | "Inactive">("All");

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const s = row.original.status;
          return (
            <span
              className={`px-2 py-1 rounded text-xs border ${
                s === "Active" ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
              }`}
            >
              {s}
            </span>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
      },
    ],
    []
  );

  // Filtered data (search + status)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);

      const matchesStatus = status === "All" ? true : u.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportRows = table.getRowModel().rows.map((r) => r.original);

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex gap-2 flex-wrap">
          <input
            className="border rounded-md px-3 py-2 text-sm bg-background"
            placeholder="Search name/email/id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-md px-3 py-2 text-sm bg-background"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="All">All status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

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

        {/* Export buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-3 py-2 border rounded-md text-sm"
            onClick={() => exportUsersCSV(exportRows, "users.csv")}
          >
            Export CSV
          </button>
          <button
            className="px-3 py-2 border rounded-md text-sm"
            onClick={() => exportUsersExcel(exportRows, "users.xlsx")}
          >
            Export Excel
          </button>
          <button
            className="px-3 py-2 border rounded-md text-sm"
            onClick={() => exportUsersPDF(exportRows, "users.pdf")}
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Table (scrollable on mobile) */}
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="min-w-[800px] w-full text-sm">
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
                  No users found.
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
