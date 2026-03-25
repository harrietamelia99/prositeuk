import { NextResponse } from "next/server";

export const revalidate = 1800; // cache for 30 mins

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN ?? process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`,
      { next: { revalidate: 1800 } }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const data = await res.json();

    const posts = (data.data ?? [])
      .filter(
        (p: { media_type: string }) =>
          p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM"
      )
      .slice(0, 3);

    return NextResponse.json({ posts });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
