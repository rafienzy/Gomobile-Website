/**
 * Blog post content source.
 *
 * Posts used to live in MongoDB behind /api/blog, with the admin panel as the
 * write path. That whole stack is gone: the journal is a placeholder, the
 * database was one more thing to run and pay for, and Strapi is the intended
 * CMS. Until Strapi lands, posts are static content in
 * `content/blog-posts.json`, the same arrangement case studies already use.
 * Array order in that file IS the display order.
 *
 * This module is the single read seam for post content. Swapping to Strapi
 * later means reimplementing these three functions and nothing else — make
 * them async at that point, since every caller already awaits or can.
 */
import type { BlogPost } from '@/lib/models/blog';
import data from '@/content/blog-posts.json';

const POSTS = data as BlogPost[];

export function getPosts(
  status: 'published' | 'draft' | 'all' = 'published'
): BlogPost[] {
  if (status === 'all') return POSTS;
  return POSTS.filter((p) => p.status === status);
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  if (!slugs.length) return [];
  // Caller order wins, so a post controls the order of its own "related" rail.
  return slugs
    .map((s) => POSTS.find((p) => p.slug === s && p.status === 'published'))
    .filter((p): p is BlogPost => p !== undefined);
}
