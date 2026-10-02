import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Short name used on cards and in the file explorer path.
      cardTitle: z.string().optional(),
      brief: z.string(),
      kind: z.enum(['main', 'side']).default('main'),
      status: z.enum(['active', 'complete']).default('complete'),
      order: z.number().default(99),
      period: z.string().optional(),
      tech: z.array(z.string()).default([]),
      repo: z.string().optional(),
      highlight: z.object({ value: z.string(), label: z.string() }).optional(),
      team: z.array(z.string()).default([]),
      mentor: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      files: z
        .array(
          z.object({
            name: z.string(),
            caption: z.string(),
            image: image().optional(),
            // Videos live in public/media; give the path like /media/clip.mp4
            video: z.string().optional(),
            poster: image().optional(),
          }),
        )
        .default([]),
    }),
});

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      org: z.string(),
      location: z.string(),
      period: z.string(),
      start: z.coerce.date(),
      status: z.string(),
      supervisor: z.string().optional(),
      boxes: z.array(z.object({ heading: z.string(), text: z.string() })),
      records: z.array(z.object({ image: image(), caption: z.string() })).default([]),
    }),
});

export const collections = { projects, logs };
