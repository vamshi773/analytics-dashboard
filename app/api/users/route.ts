import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

export async function GET() {
  const users = Array.from({ length: 40 }).map(() => ({
    id: faker.string.uuid().slice(0, 8),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
  }));

  const res = NextResponse.json({ users }, { status: 200 });
  res.headers.set("Cache-Control", "public, max-age=30, stale-while-revalidate=60");
  return res;
}
