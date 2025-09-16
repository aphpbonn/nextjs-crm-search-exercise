import { NextResponse } from "next/server";
import { getAllContacts } from "@/lib/db";
import { delay } from "@/lib/utils";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();

  // Simulate a small network delay so loading states are visible.
  await delay(350);

  const all = getAllContacts();
  const filtered = q
    ? all.filter((c) => {
        const name = c.name.toLowerCase();
        const email = c.email.toLowerCase();
        return name.includes(q) || email.includes(q);
      })
    : all;

  // Return all filtered items and a total count.
  // For bigger datasets you would paginate.
  return NextResponse.json({
    items: filtered,
    total: filtered.length
  });
}