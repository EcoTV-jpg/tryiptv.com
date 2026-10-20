// The former public GET endpoint submitted the full sitemap on every request.
// Keep the route inert so stale links cannot trigger a submission.
export function GET() {
  return new Response('IndexNow submissions use the manual npm script.', { status: 410 });
}
