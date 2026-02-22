"use client";

import { useTheme } from "next-themes";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

export default function CategoryPie({
  data,
  onSliceClick,
}: {
  data: Array<{ name: string; value: number }>;
  onSliceClick?: (name: string) => void;
}) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const COLORS = dark
    ? ["#60a5fa", "#34d399", "#fbbf24", "#f87171"]
    : ["#2563eb", "#16a34a", "#d97706", "#dc2626"];

  const border = dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              background: dark ? "rgba(20,20,20,0.95)" : "white",
              border: `1px solid ${border}`,
              borderRadius: 8,
            }}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
            onClick={(p: any) => {
              if (!onSliceClick) return;
              const name = p?.name;
              if (typeof name === "string") onSliceClick(name);
            }}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
