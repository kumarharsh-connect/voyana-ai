type GeoapifyLocation = {
  lat: number;
  lng: number;
  address: string;
  placeId: string | null;
};
export async function geocodePlace(
  query: string
): Promise<GeoapifyLocation | null> {
  const url = new URL('https://api.geoapify.com/v1/geocode/search');

  url.searchParams.set('text', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  url.searchParams.set('apiKey', process.env.GEOAPIFY_API_KEY!);

  const res = await fetch(url.toString());

  if (!res.ok) {
    console.error('Geoapify error:', await res.text());
    return null;
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  const place = data.results[0];

  return {
    lat: place.lat,
    lng: place.lon,
    address: place.formatted,
    placeId: place.place_id ?? null,
  };
}
