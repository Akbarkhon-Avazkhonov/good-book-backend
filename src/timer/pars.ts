/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { productSchema, promptTemplate } from 'src/lib/ai';

import { ChatOpenAI } from '@langchain/openai';

export async function pars(infoFromApi: any) {
  const llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
    temperature: 0.7, // чуть более креативно
  });

  const structuredLlm = llm.withStructuredOutput(productSchema);
  const prompt = await promptTemplate.invoke({ text: infoFromApi });
  const result = await structuredLlm.invoke(prompt);
  console.log('Результат парсинга:', result);
  return result;
}
