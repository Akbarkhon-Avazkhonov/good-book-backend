/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

// Схема: теперь ожидается "перефразированное описание"
export const productSchema = z.object({
  description: z.string().describe('The rephrased description of the product'),
});

// Промпт для перефразирования
export const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a helpful assistant skilled at rewriting Amazon product descriptions.
Your task is to take the raw HTML of an Amazon product page and extract the description.
Then, **rewrite** or **paraphrase** that description in natural, human-like language suitable for a blog or product showcase.

Instructions:
- Only output the rephrased description in JSON format (according to the schema).
- If no description is found in the HTML, return an empty string ("").`,
  ],
  ['human', '{text}'],
]);
