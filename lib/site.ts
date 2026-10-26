/**
 * Canonical origin for the site.
 *
 * No trailing slash: everything that uses this appends a path that starts with
 * one. The bare apex is canonical rather than www, which is also the direction
 * the www redirect should point once it exists.
 *
 * A constant rather than an env var deliberately. The value is public, it is
 * baked into a sitemap that has to be correct at build time, and a
 * NEXT_PUBLIC_ var nobody sets on the build server would silently emit a
 * sitemap full of localhost URLs.
 */
export const SITE_URL = "https://gomobile.id";

export const SITE_NAME = "Go Mobile";

/** Homepage title and description, also the defaults any page without its own inherits. */
export const SITE_TITLE = "Go Mobile | Programmatic Advertising Agency in Jakarta, Indonesia";
export const SITE_DESCRIPTION =
  "Go Mobile is a Jakarta-based digital marketing agency specializing in performance buying and programmatic advertising across Indonesia and Southeast Asia.";

/**
 * Official social profiles. The footer renders these and the Organization
 * structured data lists them as `sameAs`, which is how search engines and AI
 * assistants tie the profiles to the site. One list so the two cannot drift.
 */
export const SOCIAL_URLS = {
  instagram: "https://www.instagram.com/gomobile.indonesia/",
  linkedin: "https://www.linkedin.com/company/gomobileindonesia/",
  tiktok: "https://www.tiktok.com/@gomobileindo",
  threads: "https://www.threads.com/@gomobile.indonesia",
} as const;
