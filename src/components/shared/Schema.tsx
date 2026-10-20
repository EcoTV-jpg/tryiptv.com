
interface SchemaProps {
  schema: any;
  id: string;
}

export function Schema({ schema, id }: SchemaProps) {
  if (!schema) return null;
  // Google retired FAQ and HowTo appearances. The site's multi-duration
  // subscription AggregateOffer is not an eligible single-product listing.
  if (['FAQPage', 'HowTo', 'Product'].includes(schema['@type'])) return null;
  return (
    <script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
    />
  );
}
