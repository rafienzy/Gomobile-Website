import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getCaseStudies } from "@/lib/content/case-studies";
import { SERVICES } from "@/app/solutions/data";

/**
 * Generates /sitemap.xml at build time.
 *
 * Both slug lists are read from the same sources the pages themselves use, so
 * a new case study or service appears here the moment it renders, and a study
 * moved back to `status: "draft"` drops out. A hand-written list of URLs would
 * be wrong within a month.
 *
 * `priority` is a hint about relative importance within this site, not a
 * ranking lever, and search engines are free to ignore it. The ordering it
 * encodes is real though: the work is what wins briefs, so case studies and
 * services sit above the legal pages.
 *
 * Deliberately absent: /blog/<slug>. Those URLs redirect to /blog while the
 * journal is unwritten, and listing a redirect as canonical content is a way
 * to get the whole sitemap distrusted.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: priority >= 0.8 ? "monthly" : "yearly",
    priority,
  });

  return [
    entry("/", 1),

    entry("/solutions", 0.9),
    ...SERVICES.map((s) => entry(`/solutions/${s.slug}`, 0.8)),

    entry("/case-study", 0.9),
    ...getCaseStudies().map((c) => entry(`/case-study/${c.slug}`, 0.8)),

    entry("/gonet", 0.8),
    entry("/about", 0.7),
    entry("/contact", 0.7),

    /* A showcase rather than a landing page: reachable from the service pages
       and worth indexing, but not somewhere a search should land first. */
    entry("/ad-formats-demo", 0.4),

    /* Placeholder until the journal is written. Listed so the section is known
       to exist; raise this once there are posts. */
    entry("/blog", 0.3),

    entry("/privacy", 0.2),
    entry("/terms", 0.2),
  ];
}
