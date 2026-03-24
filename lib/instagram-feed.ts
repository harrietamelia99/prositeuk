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
};

export async function getInstagramFeed(limit = 6): Promise<InstagramPost[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) return [];

  const endpoint = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url,timestamp&limit=${limit}&access_token=${accessToken}`;

  try {
    const response = await fetch(endpoint, { next: { revalidate: 1800 } });
    if (!response.ok) return [];
    const json = (await response.json()) as InstagramApiResponse;
    if (!json.data?.length) return [];
    return json.data.slice(0, limit);
  } catch {
    return [];
  }
}
