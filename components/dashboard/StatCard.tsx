"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function StatCard({
  title,
  value,
  changePct,
  prefix,
}: {
  title: string;
  value: number;
  changePct: number;
  prefix?: string;
}) {
  const up = changePct >= 0;

  return (
    <Card className="rounded-xl">
      <CardContent className="p-4 space-y-2">
        <div className="text-sm text-muted-foreground">{title}</div>

        <div className="text-2xl font-semibold">
          {prefix ? `${prefix}${value.toLocaleString()}` : value.toLocaleString()}
        </div>

        <div
          className={cn(
            "flex items-center gap-1 text-xs",
            up ? "text-green-600" : "text-red-600"
          )}
        >
          {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <span>{Math.abs(changePct).toFixed(2)}%</span>
          <span className="text-muted-foreground">vs prev</span>
        </div>
      </CardContent>
    </Card>
  );
}
