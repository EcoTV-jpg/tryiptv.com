
'use server';

import { unstable_cache as cache } from 'next/cache';
import { generateTextEmbedding } from '@/ai/flows/embedding-flow';
import { generateSemanticContentFlow } from '@/ai/flows/generate-semantic-content-flow';
import type { SemanticContent as SemanticContentType } from '@/lib/types/semantic-content';

export type SemanticContent = SemanticContentType;

function getFallbackSemanticContent(topic: string): SemanticContent {
  return {
    primaryEntity: topic,
    relatedEntities: [],
    semanticClusters: [],
    contextualKeywords: [topic],
  };
}

/**
 * Generates a semantic content structure for a given topic by calling an AI flow.
 * The result is cached to prevent re-running the analysis on every request.
 * @param topic The topic to analyze.
 * @returns A promise that resolves to a semantic content structure.
 */
export const generateSemanticContent = cache(async (topic: string): Promise<SemanticContent> => {
  const isProductionBuild = process.env.NEXT_PHASE === 'phase-production-build';
  const hasGeminiKey = Boolean(
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY
  );
  const aiSemanticContentEnabled = process.env.ENABLE_AI_SEMANTIC_CONTENT === 'true';

  if (isProductionBuild || !hasGeminiKey || !aiSemanticContentEnabled) {
    return getFallbackSemanticContent(topic);
  }

  try {
    const content = await generateSemanticContentFlow(topic);
    return content;
  } catch (error) {
    console.warn(`Using fallback semantic content for topic "${topic}":`, error);
    return getFallbackSemanticContent(topic);
  }
},
['semantic-content'],
{ revalidate: 3600, tags: ['seo'] }
);

/**
 * Generates a vector embedding for a given text string.
 * This is a fallback that returns a zero-vector.
 * @param text The text to generate an embedding for.
 * @returns A promise that resolves to an array of numbers representing the embedding.
 */
export const generateEmbedding = cache(async (text: string): Promise<number[]> => {
  try {
    const embedding = await generateTextEmbedding(text);
    return embedding;
  } catch (error) {
    console.error("Failed to generate embedding, returning zero-vector:", error);
    // Return a zero-vector as a fallback.
    // This will disable semantic similarity for related content but prevent errors.
    return new Array(768).fill(0);
  }
},
['text-embedding'],
{ revalidate: 3600 * 24 } // Embeddings for content are stable, cache for a day
);
