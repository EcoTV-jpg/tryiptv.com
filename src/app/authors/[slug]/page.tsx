import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Schema } from "@/components/shared/Schema";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig, generateMetadata as generatePageMetadata } from "@/lib/site-config";
import { AUTHORS, GUIDE_AUTHORS } from "@/lib/site-data/authors";
import { TESTING_CONFIRMED } from "@/lib/site-data/company";

// Only confirmed, real authors get a profile page (see src/lib/site-data/authors.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) return {};
  const title = `${author.name}, ${author.role} | TryIPTV`;
  return generatePageMetadata({ title, description: author.bio.slice(0, 155), canonical: `/authors/${slug}` });
}

const link = "font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary";

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = AUTHORS.find((a) => a.slug === slug);
  if (!author) notFound();
  const base = siteConfig.url;
  const url = `${base}/authors/${author.slug}`;
  const guides = Object.entries(GUIDE_AUTHORS).filter(([, s]) => s === author.slug).map(([path]) => path);

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    dateModified: author.updated,
    mainEntity: {
      "@type": "Person",
      name: author.name,
      url,
      jobTitle: author.role,
      description: author.bio,
      knowsAbout: author.expertise,
      worksFor: { "@id": `${base}/#organization` },
      ...(author.image ? { image: `${base}${author.image}` } : {}),
      ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
    },
  };
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${base}/` },
    { name: "About TryIPTV", item: `${base}/about` },
    { name: author.name, item: url },
  ]);

  return (
    <>
      <Schema id="profile" schema={profileSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Section className="relative overflow-hidden border-b border-white/[0.07] pt-12 pb-14 sm:pt-16 sm:pb-20">
        <Container className="relative text-center">
          <Breadcrumb items={[{ label: "About TryIPTV", href: "/about" }, { label: author.name }]} align="center" />
          <SectionHeader as="h1" eyebrow={author.role} title={author.name} subtitle={author.bio} />
        </Container>
      </Section>
      <Section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="space-y-6 text-base leading-7 text-muted-foreground">
            {author.since && <p>Writing and reviewing TryIPTV guides since {author.since}.</p>}
            {author.expertise.length > 0 && <p>Areas covered: {author.expertise.join(", ")}.</p>}
            {guides.length > 0 && (
              <div>
                <h2 className="font-headline text-xl font-bold text-foreground">Guides by {author.name}</h2>
                <ul className="mt-3 list-disc space-y-1 pl-6">
                  {guides.map((g) => <li key={g}><Link href={g} className={link}>{g}</Link></li>)}
                </ul>
              </div>
            )}
            {author.sameAs?.length ? (
              <p>Elsewhere: {author.sameAs.map((s, i) => <span key={s}>{i ? ", " : ""}<a href={s} className={link} rel="noopener noreferrer" target="_blank">{new URL(s).hostname}</a></span>)}</p>
            ) : null}
            {TESTING_CONFIRMED && (
              <p>How we check our guides is explained on <Link href="/how-we-test" className={link}>How we test</Link>.</p>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
