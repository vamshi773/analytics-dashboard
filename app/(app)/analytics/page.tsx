"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useSales } from "@/hooks/useSales";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useFilterStore } from "@/store/filterStore";

const RevenueLine = dynamic(() => import("@/components/charts/RevenueLine"), { ssr: false });
const MonthlySalesBar = dynamic(() => import("@/components/charts/MonthlySalesBar"), { ssr: false });

export default function AnalyticsPage() {
  const { rangeDays } = useFilterStore();
  const analytics = useAnalytics(rangeDays);
  const sales = useSales();

  const isLoading = analytics.isLoading || sales.isLoading;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Revenue + sales performance charts
        </p>
      </div>

      {(analytics.error || sales.error) && (
        <div className="border rounded-lg p-3 text-sm text-red-600">
          Error loading analytics data. Please refresh.
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="border rounded-lg p-3">
          <div className="font-medium mb-2">Revenue Trend (Last {rangeDays} days)</div>
          {isLoading || !analytics.data ? (
            <Skeleton className="h-72" />
          ) : (
            <RevenueLine data={analytics.data.revenueTrend} />
          )}
        </div>

        <div className="border rounded-lg p-3">
          <div className="font-medium mb-2">Monthly Sales (12 months)</div>
          {isLoading || !sales.data ? (
            <Skeleton className="h-72" />
          ) : (
            <MonthlySalesBar data={sales.data.monthly} />
          )}
        </div>
      </div>
    </div>
  );
}
