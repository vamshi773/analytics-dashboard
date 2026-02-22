import { NextResponse } from "next/server";
import { makeAnalyticsMock } from "@/lib/mockData";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const range = searchParams.get("range") ?? "7";
  const rangeDays = Math.min(Math.max(parseInt(range, 10) || 7, 1), 90);

  const data = makeAnalyticsMock(rangeDays);

  const res = NextResponse.json(data, { status: 200 });
  // cache for 10s, allow stale while revalidate
  res.headers.set("Cache-Control", "public, max-age=10, stale-while-revalidate=30");
  return res;
}
