/**
 * @fileOverview A flow for generating text embeddings.
 *
 * - generateTextEmbedding - A function that generates a vector embedding for a given text.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';

const EmbeddingInputSchema = z.string();
const EmbeddingOutputSchema = z.array(z.number());

export async function generateTextEmbedding(
  text: z.infer<typeof EmbeddingInputSchema>
): Promise<z.infer<typeof EmbeddingOutputSchema>> {
  return embeddingFlow(text);
}

const embeddingFlow = ai.defineFlow(
  {
    name: 'embeddingFlow',
    inputSchema: EmbeddingInputSchema,
    outputSchema: EmbeddingOutputSchema,
  },
  async text => {
    const results = await ai.embed({
      embedder: 'googleai/text-embedding-004',
      content: text,
    });
    return results[0]?.embedding || [];
  }
);
