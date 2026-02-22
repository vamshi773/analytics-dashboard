export type KPI = {
  totalRevenue: number;
  activeUsers: number;
  orders: number;
  conversionRate: number; // percentage
  revenueChangePct: number;
  usersChangePct: number;
  ordersChangePct: number;
  conversionChangePct: number;
};

export type RevenuePoint = { date: string; revenue: number };
export type CategorySlice = { name: string; value: number };

export type OrderRow = {
  id: string;
  customer: string;
  status: "Pending" | "Completed" | "Cancelled";
  amount: number;
  date: string;
};

export type AnalyticsResponse = {
  kpi: KPI;
  revenueTrend: RevenuePoint[];
  categoryDistribution: CategorySlice[];
  recentOrders: OrderRow[];
};
