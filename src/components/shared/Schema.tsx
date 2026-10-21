interface SchemaProps {
  schema: any;
  id: string;
  /** Opt this block back in to types that are dropped by default, e.g. ["FAQPage"]. */
  keep?: string[];
}

/**
 * One rule for structured data that rarely earns a Google rich result:
 * - FAQPage: Google no longer shows FAQ rich results for most sites; the markup still helps other engines and AI answers.
 * - HowTo: retired by Google.
 * - Product: the multi-duration subscription isn't a single eligible product listing.
 * These types are dropped site-wide, at the top level and inside `@graph`, unless the page passes them in `keep`.
 * Pages that opt in: /faq, /about, /pricing and /iptv-free-trial (FAQ blocks that are a main part of the page;
 * /pricing also keeps Product). Any FAQ marked up this way must match the visible questions and answers.
 */
const DROPPED_BY_DEFAULT = ['FAQPage', 'HowTo', 'Product'];

export function Schema({ schema, id, keep = [] }: SchemaProps) {
  if (!schema) return null;
  const dropped = (type: unknown) => typeof type === 'string' && DROPPED_BY_DEFAULT.includes(type) && !keep.includes(type);

  let output = schema;
  if (Array.isArray(schema['@graph'])) {
    const graph = schema['@graph'].filter((node: any) => !dropped(node?.['@type']));
    if (graph.length === 0) return null;
    output = { ...schema, '@graph': graph };
  } else if (dropped(schema['@type'])) {
    return null;
  }

  return (
    <script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(output).replace(/</g, '\\u003c') }}
    />
  );
}
