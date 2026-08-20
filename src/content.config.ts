import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// A piece of text available in both languages.
const bilingual = z.object({
  en: z.string(),
  pt: z.string(),
});
const bilingualOptional = z.object({
  en: z.string().optional(),
  pt: z.string().optional(),
});

const filming = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/filming' }),
  schema: z.object({
    category: z.enum(['interview', 'short-film', 'videoclip', 'e2', 'reelsFilming']),
    title: bilingual,
    description: bilingualOptional.optional(),
    role: bilingualOptional.optional(), // e.g. "Director, Editor"
    videoUrl: z.string().optional(), // YouTube/Vimeo link
    thumbnail: z.string().optional(), // overrides auto-thumbnail
    year: z.number().optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
    // Set true on exactly one item across filming/stopmotion to make it
    // the homepage highlight video. First match wins if more than one.
    featured: z.boolean().default(false),
  }),
});

const photography = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/photography' }),
  schema: z.object({
    kind: z.enum(['event', 'landscape']),
    title: bilingual,
    description: bilingualOptional.optional(),
    location: bilingualOptional.optional(),
    date: z.string().optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
    images: z.array(
      z.object({
        src: z.string(),
        alt: bilingualOptional.optional(),
        // Grid span hint for the mosaic layout on larger screens.
        size: z.enum(['normal', 'wide', 'tall', 'large']).default('normal'),
      }),
    ),
  }),
});

const stopmotion = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stopmotion' }),
  schema: z.object({
    material: z.enum(['other', 'lego']),
    format: z.enum(['reel', 'short-film', 'film', 'upcoming']),
    // Vertical (9:16) clips — e.g. Shorts/Reels — get their own shelf on
    // the Stop Motion page instead of sitting in the main landscape grid.
    orientation: z.enum(['landscape', 'portrait']).default('landscape'),
    title: bilingual,
    description: bilingualOptional.optional(),
    videoUrl: z.string().optional(),
    thumbnail: z.string().optional(),
    year: z.number().optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
});

const other = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/other' }),
  schema: z.object({
    category: z.enum(['3d-design', 'motion-graphics', 'design-project']),
    title: bilingual,
    description: bilingualOptional.optional(),
    mediaType: z.enum(['video', 'image']).default('video'),
    videoUrl: z.string().optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    year: z.number().optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    role: bilingualOptional.optional(), // e.g. "Bride & Groom, Summer Wedding"
    quote: bilingual,
    avatar: z.string().optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
  }),
});

// A curated strip of stills for the homepage gallery marquee — mix in
// whatever's a good look: a still from a video, an event photo, a stop
// motion frame, a render, etc. See "home.gallery" in Home.astro for the
// on/off switch for the whole section.
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/gallery' }),
  schema: z.object({
    src: z.string(),
    alt: bilingualOptional.optional(),
    order: z.number().default(0),
    enabled: z.boolean().default(true),
  }),
});

export const collections = { filming, photography, stopmotion, other, testimonials, gallery };
