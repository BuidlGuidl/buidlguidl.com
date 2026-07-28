// Renders a JSON-LD structured data block. Place inside MetaHeader so it ships in the static HTML.
export const JsonLd = ({ data }: { data: Record<string, unknown> }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
