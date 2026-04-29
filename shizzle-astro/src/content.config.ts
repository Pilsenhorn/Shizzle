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

const social = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/social" }),
  schema: z.object({
    url: z.string(),
    thumbnail: z.string(),
    title: z.string().optional(),
  }),
})

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/settings" }),
  schema: z.object({
    bookingEmail: z.string(),
    instagram: z.string(),
    spotify: z.string(),
    youtube: z.string(),
    tiktok: z.string(),
    facebook: z.string(),
    linktree: z.string().optional(),

    contactTitle: z.string().optional(),
    contactText: z.string().optional(),
    contactTrust: z.array(z.string()).optional(),

    downloads: z
      .array(
        z.object({
          label: z.string(),
          file: z.string(),
        })
      )
      .optional(),
  }),
});



export const collections = {
  concerts,
  albums,
  pages,
  social,
  settings,
};