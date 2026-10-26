import { SITE_URL } from "@/lib/site";

/**
 * Serves /robots.txt, built at build time.
 *
 * A route rather than app/robots.ts because MetadataRoute.Robots has no way
 * to emit a Content-Signal line, and that line is the reason this exists.
 *
 * Googlebot asked for this file on 15 Sep 2026 and got a 404, which is what
 * prompted adding it. Everything here is public, so nothing is disallowed.
 * /blog/* redirects to /blog while the journal is unwritten; it is left
 * crawlable so that the redirect is followed and future post URLs are picked
 * up on their own.
 *
 * Not blocking AI crawlers (GPTBot, ClaudeBot, PerplexityBot and the rest) is
 * deliberate: for an agency, being quoted by an assistant is marketing.
 *
 * Content-Signal (contentsignals.org) states what the content may be used
 * for. search=yes allows search indexing and ai-input=yes allows AI
 * assistants to read pages to answer questions, which is how they end up
 * citing Go Mobile. ai-train is left unstated on purpose, which expresses no
 * preference either way about model training; add "ai-train=yes" or
 * "ai-train=no" once that is decided.
 */
export const dynamic = "force-static";

const BODY = `User-Agent: *
Content-Signal: search=yes, ai-input=yes
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
