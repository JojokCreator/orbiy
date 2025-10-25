import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cars' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    price: z.string(),
    description: z.string(),
    horizontalImage: image(),
    verticalImage: image(),
    imageAlt: z.string().optional(),
    features: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  cars,
};