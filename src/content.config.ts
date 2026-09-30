import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    builder: z.string().optional(),
    tonnage: z.number().nonnegative().optional(),
    floorArea: z.number().nonnegative().optional(),
    location: z.string(),
    year: z.number().int().optional(),
    category: z.string().default('Commercial'),
    summary: z.string().optional(),
    cover: z.string().optional(),
    images: z.array(z.string()).default([]),
    lat: z.number().optional(),
    lng: z.number().optional(),
    showOnMap: z.boolean().default(true),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const staff = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/staff' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    order: z.number().default(99),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { projects, staff, pages };
