"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/components/dashboard/StatCard";
import FilterBar from "@/components/filters/FilterBar";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useFilterStore } from "@/store/filterStore";
import { useDrillStore } from "@/store/drillStore";

const RevenueLine = dynamic(() => import("@/components/charts/RevenueLine"), { ssr: false });
const CategoryPie = dynamic(() => import("@/components/charts/CategoryPie"), { ssr: false });
const OrdersTable = dynamic(() => import("@/components/tables/OrdersTable"), { ssr: false });
const LiveFeed = dynamic(() => import("@/components/dashboard/LiveFeed"), { ssr: false });

export default function DashboardPage() {
  const { rangeDays } = useFilterStore();
  const { data, isLoading, error } = useAnalytics(rangeDays);

  const {
    selectedCategory,
    setSelectedCategory,
    showRevenue,
    showCategory,
    toggleRevenue,
    toggleCategory,
  } = useDrillStore();

  if (error) {
    return (
      <div className="border rounded-lg p-3 text-sm text-red-600">
        Failed to load dashboard data. Refresh the page.
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-24" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  const k = data.kpi;

  return (
    <div className="space-y-4">
      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard title="Total Revenue" value={k.totalRevenue} changePct={k.revenueChangePct} prefix="₹" />
        <StatCard title="Active Users" value={k.activeUsers} changePct={k.usersChangePct} />
        <StatCard title="Orders" value={k.orders} changePct={k.ordersChangePct} />
        <StatCard title="Conversion Rate (%)" value={k.conversionRate} changePct={k.conversionChangePct} />
      </div>

      {/* Chart toggles */}
      <div className="flex gap-2 flex-wrap">
        <button className="border px-3 py-2 rounded-md text-sm" onClick={toggleRevenue}>
          {showRevenue ? "Hide" : "Show"} Revenue Trend
        </button>
        <button className="border px-3 py-2 rounded-md text-sm" onClick={toggleCategory}>
          {showCategory ? "Hide" : "Show"} Category Distribution
        </button>

        {selectedCategory && (
          <button
            className="border px-3 py-2 rounded-md text-sm bg-accent"
            onClick={() => setSelectedCategory(null)}
          >
            Clear Drill: {selectedCategory}
          </button>
        )}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border rounded-lg p-3">
          <div className="font-medium mb-2">Revenue Trend</div>
          {showRevenue ? <RevenueLine data={data.revenueTrend} /> : <div className="text-sm text-muted-foreground">Hidden</div>}
        </div>

        <div className="border rounded-lg p-3">
          <div className="font-medium mb-2">Category Distribution (click slice)</div>
          {showCategory ? (
            <CategoryPie
              data={data.categoryDistribution}
              onSliceClick={(name) => setSelectedCategory(name)}
            />
          ) : (
            <div className="text-sm text-muted-foreground">Hidden</div>
          )}
        </div>
      </div>

      {/* Orders + Live feed */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border rounded-lg p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-medium">Recent Orders</div>
            {selectedCategory && (
              <div className="text-xs text-muted-foreground">
                (Drill-down selected: {selectedCategory}) — demo only
              </div>
            )}
          </div>

          <OrdersTable data={data.recentOrders} />
        </div>

        <div className="border rounded-lg p-3">
          <div className="font-medium mb-2">Live Activity</div>
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}
