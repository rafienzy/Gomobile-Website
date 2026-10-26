/**
 * Renders schema.org structured data as a JSON-LD script tag. Server-only and
 * invisible; the builders live in lib/structured-data.ts.
 *
 * `<` is escaped so that copy containing "</script>" cannot close the tag
 * early. JSON parsers read < back as "<", so the data is unchanged.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
