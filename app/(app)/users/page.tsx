"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useUsers";
import dynamic from "next/dynamic";

const UsersTable = dynamic(() => import("@/components/users/UsersTable"), { ssr: false });

export default function UsersPage() {
  const { data, isLoading, error } = useUsers();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Search, filter by status, paginate, and export users
        </p>
      </div>

      {error && (
        <div className="border rounded-lg p-3 text-sm text-red-600">
          Failed to load users. Please refresh.
        </div>
      )}

      {isLoading || !data ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      ) : (
        <UsersTable data={data.users} />
      )}
    </div>
  );
}
