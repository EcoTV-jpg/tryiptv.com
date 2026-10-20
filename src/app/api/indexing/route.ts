import { NextResponse } from 'next/server';

/**
 * Google Indexing API endpoint (Disabled)
 *
 * Google strictly restricts the Indexing API to pages containing JobPosting
 * or BroadcastEvent embedded in a VideoObject markup.
 * Submitting standard website URLs violates Google Search Central policies
 * and is ignored by Google's indexing pipeline.
 *
 * This endpoint has been disabled to prevent policy violations and API quota penalties.
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Google Indexing API functionality is disabled. Per Google policy, the Indexing API only supports JobPosting and BroadcastEvent markup, not standard web pages.',
    },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Google Indexing API functionality is disabled.',
    },
    { status: 410 }
  );
}
