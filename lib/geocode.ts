const cache = new Map<string, [number, number] | null>();

export async function geocodeLocation(location: string): Promise<[number, number] | null> {
  const key = location.toLowerCase().trim();
  if (cache.has(key)) return cache.get(key)!;

  try {
    const query = encodeURIComponent(`${location}, UK`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1&countrycodes=gb`,
      {
        headers: { "User-Agent": "PROSITEUK/1.0 (https://prositeuk.com)" },
        next: { revalidate: 86400 },
      }
    );
    const data = await res.json();
    if (data[0]) {
      const coords: [number, number] = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
      cache.set(key, coords);
      return coords;
    }
  } catch (e) {
    console.error("Geocoding error for:", location, e);
  }

  cache.set(key, null);
  return null;
}
