import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET() {
  const monthly = Array.from({ length: 12 }).map((_, i) => ({
    month: String(i + 1),
    sales: faker.number.int({ min: 20000, max: 160000 }),
  }));

  const res = NextResponse.json({ monthly }, { status: 200 });
  res.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
  return res;
}
