"use client";

import { useTheme } from "next-themes";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function MonthlySalesBar({
  data,
}: {
  data: Array<{ month: string; sales: number }>;
}) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const grid = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
  const text = dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)";
  const bar = dark ? "#34d399" : "#16a34a";

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fill: text }} />
          <YAxis tick={{ fill: text }} />
          <Tooltip
            contentStyle={{
              background: dark ? "rgba(20,20,20,0.95)" : "white",
              border: `1px solid ${grid}`,
              borderRadius: 8,
            }}
          />
          <Bar dataKey="sales" fill={bar} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
