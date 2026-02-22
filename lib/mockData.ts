import { faker } from "@faker-js/faker";
import type { AnalyticsResponse } from "@/types/analytics";

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function makeAnalyticsMock(rangeDays: number): AnalyticsResponse {
  const today = new Date();

  const revenueTrend = Array.from({ length: rangeDays }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (rangeDays - 1 - i));
    return {
      date: dateKey(d),
      revenue: faker.number.int({ min: 2000, max: 15000 }),
    };
  });

  const categoryDistribution = [
    { name: "Electronics", value: faker.number.int({ min: 20, max: 45 }) },
    { name: "Fashion", value: faker.number.int({ min: 10, max: 35 }) },
    { name: "Home", value: faker.number.int({ min: 10, max: 30 }) },
    { name: "Other", value: faker.number.int({ min: 5, max: 20 }) },
  ];

  const totalRevenue = revenueTrend.reduce((a, b) => a + b.revenue, 0);
  const activeUsers = faker.number.int({ min: 900, max: 5500 });
  const orders = faker.number.int({ min: 120, max: 900 });
  const conversionRate = faker.number.float({
    min: 1.2,
    max: 6.8,
    fractionDigits: 2,
  });

  const recentOrders = Array.from({ length: 25 }).map(() => ({
    id: faker.string.uuid().slice(0, 8),
    customer: faker.person.fullName(),
    status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]) as
      | "Pending"
      | "Completed"
      | "Cancelled",
    amount: faker.number.int({ min: 20, max: 600 }),
    date: faker.date.recent({ days: 14 }).toISOString(),
  }));

  return {
    kpi: {
      totalRevenue,
      activeUsers,
      orders,
      conversionRate,
      revenueChangePct: faker.number.float({
        min: -10,
        max: 18,
        fractionDigits: 2,
      }),
      usersChangePct: faker.number.float({
        min: -8,
        max: 22,
        fractionDigits: 2,
      }),
      ordersChangePct: faker.number.float({
        min: -12,
        max: 16,
        fractionDigits: 2,
      }),
      conversionChangePct: faker.number.float({
        min: -2.5,
        max: 2.5,
        fractionDigits: 2,
      }),
    },
    revenueTrend,
    categoryDistribution,
    recentOrders,
  };
}
