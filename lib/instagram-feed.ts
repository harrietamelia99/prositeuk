export type InstagramPost = {
  id: string;
  caption?: string;
  media_url?: string;
  permalink: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  thumbnail_url?: string;
};

type InstagramApiResponse = {
  data?: InstagramPost[];
  error?: { message: string };
};

export async function getInstagramFeed(limit = 9): Promise<InstagramPost[]> {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
  if (!accessToken) return [];

  const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

  try {
    const response = await fetch(endpoint, { next: { revalidate: 1800 } });
    if (!response.ok) return [];
    const json = (await response.json()) as InstagramApiResponse;
    if (!json.data?.length) return [];

    return json.data
      .filter((p) => p.media_type === "IMAGE" || p.media_type === "CAROUSEL_ALBUM")
      .slice(0, limit);
  } catch {
    return [];
  }
}
