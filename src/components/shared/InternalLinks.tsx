import Link from 'next/link';
import { ArrowRight, Laptop } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { howToArticles, getDeviceSlug } from '@/lib/how-to';

interface InternalLinksProps {
  currentId: string;
}

export default function InternalLinks({ currentId }: InternalLinksProps) {
  // Deterministic related guides from static site data (Server Component)
  const relatedGuides = howToArticles
    .filter(article => article.id !== currentId)
    .slice(0, 5);

  if (relatedGuides.length === 0) {
    return null;
  }

  return (
    <Card className="not-prose">
      <CardHeader className="pb-3">
        <p className="eyebrow mb-1">Explore</p>
        <h2 className="font-headline text-lg font-extrabold text-foreground">Related Setup Guides</h2>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {relatedGuides.map((guide) => (
            <li key={guide.id}>
              <Link
                href={`/devices/${getDeviceSlug(guide.id)}`}
                title={guide.title}
                className="group flex items-center justify-between text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="line-clamp-1 group-hover:text-primary">{guide.title}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-white/[0.08]">
          <Link
            href="/devices"
            className="group flex items-center justify-between text-xs font-semibold text-primary transition-colors hover:underline"
          >
            <span>Browse All Device Guides</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
