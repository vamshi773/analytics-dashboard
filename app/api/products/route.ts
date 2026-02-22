import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";

const categories = ["Electronics", "Fashion", "Home", "Other"] as const;
const statuses = ["Active", "Inactive"] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category"); // optional
  const status = searchParams.get("status"); // optional
  const q = (searchParams.get("q") ?? "").toLowerCase(); // optional

  const products = Array.from({ length: 80 }).map(() => ({
    id: faker.string.uuid().slice(0, 8),
    name: faker.commerce.productName(),
    category: faker.helpers.arrayElement(categories),
    price: Number(faker.commerce.price({ min: 10, max: 1500, dec: 0 })),
    stock: faker.number.int({ min: 0, max: 500 }),
    status: faker.helpers.arrayElement(statuses),
    createdAt: faker.date.recent({ days: 60 }).toISOString(),
  }));

  const filtered = products.filter((p) => {
    const okCategory = !category || category === "All" || p.category === category;
    const okStatus = !status || status === "All" || p.status === status;
    const okQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q);

    return okCategory && okStatus && okQ;
  });

  const res = NextResponse.json({ products: filtered }, { status: 200 });
  res.headers.set("Cache-Control", "public, max-age=30, stale-while-revalidate=60");
  return res;
}
