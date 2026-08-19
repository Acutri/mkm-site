import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const projects = await getCollection(
    'projects',
    ({ data }) =>
      !data.draft &&
      data.showOnMap &&
      typeof data.lat === 'number' &&
      typeof data.lng === 'number'
  );

  const payload = projects
    .sort((a, b) => (b.data.year ?? 0) - (a.data.year ?? 0))
    .map((p) => ({
      slug: p.id,
      title: p.data.title,
      location: p.data.location,
      year: p.data.year,
      category: p.data.category,
      cover: p.data.cover,
      lat: p.data.lat,
      lng: p.data.lng,
    }));

  return new Response(JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  });
};
