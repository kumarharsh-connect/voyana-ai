const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!;

type UnsplashResponse = {
  results: Array<{
    urls: {
      regular: string;
    };
  }>;
};

export async function fetchDestinationImage(destination: string) {
  const query = encodeURIComponent(`${destination} city travel landscape`);
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=1`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('UNSPLASH_FAILED');
  }

  const data = (await res.json()) as UnsplashResponse;

  return data.results[0]?.urls.regular ?? null;
}
