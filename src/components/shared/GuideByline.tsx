import Link from "next/link";
import { getAuthorForPath } from "@/lib/site-data/authors";
import { Confirm } from "@/components/shared/Confirm";

const link = "font-semibold text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

/**
 * Byline for guides. Credits a confirmed author (linked to their profile) or, until one is confirmed,
 * the TryIPTV team (an honest organisation byline linked to /about). Inherits the hero's text alignment.
 */
export function GuideByline({ path }: { path: string }) {
  const author = getAuthorForPath(path);
  return (
    <p className="mt-4 text-sm leading-6 text-muted-foreground">
      {author ? (
        <>By <Link href={`/authors/${author.slug}`} className={link}>{author.name}</Link>, {author.role}</>
      ) : (
        <>By the <Link href="/about" className={link}>TryIPTV team</Link></>
      )}
      {!author && (
        <>
          {" "}
          <Confirm value={null} question={`Which real person writes or reviews ${path}? Add them to src/lib/site-data/authors.ts.`} />
        </>
      )}
    </p>
  );
}
