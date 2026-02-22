"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/store/filterStore";
import { useOrders } from "@/hooks/useOrders";

const OrdersTableAdvanced = dynamic(
  () => import("@/components/orders/OrdersTableAdvanced"),
  { ssr: false }
);

export default function OrdersPage() {
  const { rangeDays } = useFilterStore();
  const { data, isLoading, error } = useOrders(rangeDays);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          Filter by status chips, search, paginate, export
        </p>
      </div>

      {error && (
        <div className="border rounded-lg p-3 text-sm text-red-600">
          Failed to load orders. Please refresh.
        </div>
      )}

      {isLoading || !data ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-72 w-full" />
        </div>
      ) : (
        <OrdersTableAdvanced data={data.recentOrders} />
      )}
    </div>
  );
}
