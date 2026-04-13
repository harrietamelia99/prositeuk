import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = await client.fetch(`*[_type == "job"] { _id, title, status, "slug": slug.current }`);
    return NextResponse.json({ count: jobs.length, jobs });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
