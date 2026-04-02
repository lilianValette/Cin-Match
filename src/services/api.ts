import { Config } from '@/constants/Config';

const BASE_URL = Config.TMDB_BASE_URL;
const TOKEN = Config.TMDB_ACCESS_TOKEN;

export async function tmdbFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  if (!TOKEN) {
    throw new Error('EXPO_PUBLIC_TMDB_ACCESS_TOKEN is not set');
  }

  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
