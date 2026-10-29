import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

/** Both share images in app/ are 1200×630 PNGs. */
const SHARE_IMAGE = { width: 1200, height: 630, type: "image/png", alt: SITE_NAME };

/**
 * Page-level metadata with a canonical URL and share card that point at the
 * page itself.
 *
 * Every page needs its own `alternates.canonical` and `openGraph.url`. When
 * these lived only in the root layout, every route inherited the homepage's
 * values, which told Google that every inner page was a duplicate of `/`.
 *
 * Next replaces a parent's `openGraph` object rather than merging into it, so
 * a page that set only `openGraph.url` would lose its title, description and
 * site name. This builds the whole object each time, images included: the
 * app/opengraph-image.png and app/twitter-image.png file convention is only
 * applied to routes that do not set their own openGraph/twitter, so without
 * the explicit entries below every inner page shares as a card with no image.
 *
 * `path` is root-relative; metadataBase in app/layout.tsx makes it absolute.
 */
export function pageMetadata({
  path,
  title,
  description,
  type = "website",
  image,
  article,
}: {
  path: string;
  title: string;
  description?: string;
  type?: "website" | "article";
  /** A page's own 1200×630 JPEG share card, in place of the site-wide one. */
  image?: { url: string; alt: string };
  /** ISO dates and tags for og:article, when `type` is "article". */
  article?: { publishedTime?: string; modifiedTime?: string; tags?: string[] };
}): Metadata {
  const og = image ? { ...SHARE_IMAGE, ...image, type: "image/jpeg" } : { ...SHARE_IMAGE, url: "/opengraph-image.png" };
  const tw = image ? og : { ...SHARE_IMAGE, url: "/twitter-image.png" };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      images: [og],
      ...(type === "article" ? article : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [tw],
    },
  };
}
