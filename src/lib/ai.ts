import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

// Схема: теперь ожидается "перефразированное описание"
const allowedGenres = [
  'Arts & Photography',
  'Biographies & Memoirs',
  'Business & Money',
  'Calendars',
  "Children's Books",
  'Comics & Graphic Novels',
  'Computers & Technology',
  'Cookbooks, Food & Wine',
  'Crafts, Hobbies & Home',
  'Education & Teaching',
  'Engineering & Transportation',
  'Health, Fitness & Dieting',
  'History',
  'Humor & Entertainment',
  'Law',
  'LGBTQ+ Books',
  'Literature & Fiction',
  'Medical Books',
  'Mystery, Thriller & Suspense',
  'Parenting & Relationships',
  'Politics & Social Sciences',
  'Reference',
  'Religion & Spirituality',
  'Romance',
  'Science & Math',
  'Science Fiction & Fantasy',
  'Self-Help',
  'Sports & Outdoors',
  'Teen & Young Adult',
  'Test Preparation',
  'Travel',
] as const;

export const productSchema = z.object({
  asin: z.string().describe('A unique numeric identifier for the book'),
  title: z
    .string()
    .describe(
      'The title of the book as displayed on the cover and in catalogs',
    ),
  author: z.string().describe('The name of the author of the book'),
  genre: z.enum(allowedGenres).describe('The literary genre of the book'),

  rating: z.number().describe('The average user rating of the book (1 to 5)'),
  reviewsCount: z.number().describe('The total number of user reviews'),
  cover: z.string().describe('URL or path to the book’s cover image'),
  description: z
    .string()
    .describe('A short, rephrased summary of the book’s content'),
  fullReview: z
    .string()
    .describe('A detailed review covering plot, themes, and writing style'),
  publishYear: z
    .number()
    .describe('The year the book was originally published'),
  pages: z.number().describe('Total number of pages in the book'),
  language: z.string().describe('The language of this particular edition'),
  originalLanguage: z
    .string()
    .describe('The language in which the book was originally written'),
  publisher: z.string().describe('The name of the publishing company'),
  isbn: z
    .string()
    .describe('The ISBN (International Standard Book Number) of the edition'),
  dimensions: z
    .string()
    .describe('The physical size of the book (e.g., "5.1 x 1.0 x 7.8")'),
  weight: z
    .string()
    .describe('The physical weight of the book (e.g., "1.2 pounds")'),
  tags: z
    .array(z.string())
    .describe('A list of keywords or topical labels describing the book'),
  themes: z
    .array(z.string())
    .describe('The central themes explored in the book'),
  awards: z
    .array(z.string())
    .describe('Awards or recognitions the book has received'),
  adaptations: z
    .array(z.string())
    .describe('Movies, shows, or other media based on the book'),
  reviewer: z.string().describe('The name of the person who wrote the review'),
  reviewerAvatar: z
    .string()
    .describe('URL or path to the reviewer’s avatar image'),
  reviewerBio: z.string().describe('A brief biography of the reviewer'),
  publishDate: z
    .string()
    .describe('Date the review was published (in ISO format: YYYY-MM-DD)'),
  readingTime: z
    .string()
    .describe('Estimated time it takes to read the review'),
  likes: z.number().describe('Number of likes or upvotes the review received'),
  dislikes: z
    .number()
    .describe('Number of dislikes or downvotes the review received'),
  keyQuotes: z
    .array(z.string())
    .describe('Memorable or iconic quotes from the book'),
  // similarBooks: z
  //   .array(
  //     z.object({
  //       id: z.number().describe('The ID of a similar book'),
  //       title: z.string().describe('The title of a similar book'),
  //       author: z.string().describe('The author of the similar book'),
  //     }),
  //   )
  //   .describe(
  //     'A list of recommended books that are similar in topic, style, or genre',
  //   ),
});

// Промпт для перефразирования
export const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a highly skilled assistant tasked with transforming Amazon book product pages into complete, structured metadata.

You will receive json from PAAPI of an Amazon book page (extracted via Paapi).
Your job is to extract any available information (title, author, publisher, dimensions, etc.) and paraphrase the book description and full review in a professional, human-readable tone.
And find information from the internet if some fields are missing.
Use this to generate a fully structured JSON object with the following fields:

- asin: string
- title: string
- author: string
- genre: string
- rating: number
- reviewsCount: number
- cover: string
- description: string
- fullReview: string
- publishYear: number
- pages: number
- language: string
- originalLanguage: string
- publisher: string
- isbn: string
- dimensions: string
- weight: string
- tags: array of strings
- themes: array of strings
- awards: array of strings
- adaptations: array of strings
- reviewer: string
- reviewerAvatar: string
- reviewerBio: string
- publishDate: string (YYYY-MM-DD)
- readingTime: string (e.g. "12 min read")
- likes: number
- dislikes: number
- keyQuotes: array of strings

Instructions:
- Extract all available information from the provided JSON.
- Find missing fields using the internet or other sources.
- Paraphrase the book description and full review in a professional, human-readable tone.
- Use images url from the PAAPI response or find suitable ones online.
- Paraphrase in a warm, rich, blog-style tone suitable for a literary website.
- All fields must be filled with plausible values. You may infer or invent realistic filler if something is missing.
- Dates must be in ISO format (e.g. "2024-01-05").
- Output only valid JSON. No comments or markdown.
- This is not a conversation. Just output the JSON.
- genre must be one of the following: ${allowedGenres.join(', ')}
`,
  ],
  ['human', '{text}'],
]);
