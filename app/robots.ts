import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Generates /robots.txt at build time.
 *
 * Googlebot asked for this file on 15 Sep 2026 and got a 404, which is what
 * prompted adding it. A 404 is not fatal, crawlers treat it as "no rules, crawl
 * everything", but it also means nothing points them at the sitemap.
 *
 * Everything here is public, so nothing is disallowed. The one path worth a
 * thought is /blog/*, which redirects to /blog while the journal is unwritten;
 * it is left crawlable so that the redirect is followed and any future post
 * URLs are picked up on their own.
 *
 * Not blocking AI crawlers (GPTBot, ClaudeBot, Bytespider and the rest) is a
 * deliberate default rather than an oversight: for an agency site, being
 * quotable by an assistant is closer to marketing than to theft. Reverse it by
 * adding entries to `rules` if that view ever changes.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
