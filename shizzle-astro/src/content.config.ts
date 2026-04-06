import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const concerts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/concerts" }),
  schema: z.object({
    date: z.string(),
    city: z.string(),
    venue: z.string(),
    ticketUrl: z.string().optional(),
    featured: z.boolean().optional(),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/albums" }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    cover: z.string(),
    spotify: z.string().optional(),
  }),
});

export const collections = {
  concerts,
  albums,
};