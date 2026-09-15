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
