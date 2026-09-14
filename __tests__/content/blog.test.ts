/**
 * lib/content/blog is the single read seam for post content. These tests pin
 * the contract the rest of the app relies on, so a Strapi-backed
 * reimplementation later can be checked against the same expectations.
 */
import { getPosts, getPost, getRelatedPosts } from '@/lib/content/blog';
import posts from '@/content/blog-posts.json';

describe('getPosts', () => {
  it('returns only published posts by default', () => {
    const result = getPosts();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.status === 'published')).toBe(true);
  });

  it('returns every post when asked for all', () => {
    expect(getPosts('all')).toHaveLength(posts.length);
  });

  it('filters to drafts', () => {
    expect(getPosts('draft').every((p) => p.status === 'draft')).toBe(true);
  });

  it('preserves the order of the JSON file, which is the display order', () => {
    expect(getPosts('all').map((p) => p.slug)).toEqual(posts.map((p) => p.slug));
  });
});

describe('getPost', () => {
  it('finds a post by slug', () => {
    const slug = posts[0].slug;
    expect(getPost(slug)?.slug).toBe(slug);
  });

  it('returns undefined for an unknown slug', () => {
    expect(getPost('no-such-post')).toBeUndefined();
  });
});

describe('getRelatedPosts', () => {
  it('returns nothing for an empty list', () => {
    expect(getRelatedPosts([])).toEqual([]);
  });

  it('resolves slugs in the order they were given', () => {
    const [a, b] = [posts[1].slug, posts[0].slug];
    expect(getRelatedPosts([a, b]).map((p) => p.slug)).toEqual([a, b]);
  });

  it('drops slugs that match no post rather than emitting holes', () => {
    const real = posts[0].slug;
    expect(getRelatedPosts([real, 'ghost']).map((p) => p.slug)).toEqual([real]);
  });
});

describe('content/blog-posts.json', () => {
  it('has no duplicate slugs, since slug is the route key', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('points every relatedSlugs entry at a post that exists', () => {
    const known = new Set(posts.map((p) => p.slug));
    const dangling = posts.flatMap((p) =>
      p.relatedSlugs.filter((s) => !known.has(s)).map((s) => `${p.slug} -> ${s}`)
    );
    expect(dangling).toEqual([]);
  });
});
