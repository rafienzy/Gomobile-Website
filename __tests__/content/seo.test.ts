/**
 * Canonical URLs and structured data are invisible on the page, so a mistake
 * here ships silently and only shows up weeks later as pages missing from
 * search. These tests pin the parts that went wrong once or depend on content
 * edited by hand.
 */
import { pageMetadata } from '@/lib/seo';
import {
  siteJsonLd,
  breadcrumbJsonLd,
  caseStudyJsonLd,
  blogPostingJsonLd,
  toIsoDate,
  HQ_ADDRESS,
  HQ_EMAIL,
  HQ_PHONE,
  ORG_ID,
} from '@/lib/structured-data';
import { getOffices } from '@/lib/content/offices';
import { getCaseStudies } from '@/lib/content/case-studies';
import { getPosts } from '@/lib/content/blog';
import { SOCIAL_URLS } from '@/lib/site';

describe('pageMetadata', () => {
  it('points the canonical and og:url at the page itself, not the homepage', () => {
    const m = pageMetadata({ path: '/solutions', title: 'Solutions | Go Mobile' });
    expect(m.alternates?.canonical).toBe('/solutions');
    expect((m.openGraph as { url?: string }).url).toBe('/solutions');
  });

  it('builds a complete openGraph object, since Next replaces the parent one wholesale', () => {
    const og = pageMetadata({ path: '/about', title: 'About', description: 'd' }).openGraph as Record<string, unknown>;
    expect(og).toMatchObject({ title: 'About', description: 'd', siteName: 'Go Mobile', type: 'website' });
  });
});

describe('siteJsonLd', () => {
  const org = siteJsonLd()['@graph'][0] as Record<string, unknown>;

  it('keeps the structured address in step with content/offices.json', () => {
    const hq = getOffices().find((o) => o.featured)!;
    expect(hq.address).toContain(HQ_ADDRESS.streetAddress.split(',')[0]);
    expect(hq.address).toContain(HQ_ADDRESS.postalCode);
    expect(hq.email).toBe(HQ_EMAIL);
    expect(hq.phone.replace(/\D/g, '')).toBe(HQ_PHONE.replace(/\D/g, ''));
  });

  it('links the Google Maps listing on the office Place, where schema.org allows hasMap', () => {
    const hq = getOffices().find((o) => o.featured)!;
    expect(org.hasMap).toBeUndefined();
    expect(org.location).toMatchObject({ '@type': 'LocalBusiness', hasMap: hq.mapUrl });
  });

  it('lists every footer social profile as sameAs', () => {
    expect(org.sameAs).toEqual(Object.values(SOCIAL_URLS));
  });
});

describe('breadcrumbJsonLd', () => {
  it('starts at Home and numbers from 1 with absolute URLs', () => {
    const b = breadcrumbJsonLd([{ name: 'Solutions', path: '/solutions' }]);
    expect(b.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gomobile.id' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://gomobile.id/solutions' },
    ]);
  });
});

describe('caseStudyJsonLd', () => {
  it('credits Go Mobile by reference and names the client', () => {
    const c = getCaseStudies()[0];
    const a = caseStudyJsonLd(c);
    expect(a.publisher).toEqual({ '@id': ORG_ID });
    expect(a.about).toEqual({ '@type': 'Organization', name: c.brand });
    expect(a.image.startsWith('https://gomobile.id/')).toBe(true);
  });
});

describe('toIsoDate', () => {
  it('converts the display format posts use', () => {
    expect(toIsoDate('Apr 18, 2026')).toBe('2026-04-18');
    expect(toIsoDate('Feb 29, 2028')).toBe('2028-02-29');
  });

  it('rejects dates that do not exist instead of rolling them over', () => {
    expect(toIsoDate('Feb 29, 2026')).toBeUndefined();
    expect(toIsoDate('April 18, 2026')).toBeUndefined();
  });
});

describe('blogPostingJsonLd', () => {
  const post = getPosts('all')[0];

  it('attributes a post with an author role to that person, working for Go Mobile', () => {
    const j = blogPostingJsonLd({ ...post, author: 'Rafi Abdilah', authorRole: 'Editor' });
    expect(j.author).toMatchObject({ '@type': 'Person', name: 'Rafi Abdilah', worksFor: { '@id': ORG_ID } });
  });

  it('attributes a team-bylined post to the organisation, not an invented person', () => {
    expect(blogPostingJsonLd({ ...post, authorRole: '' }).author).toEqual({ '@id': ORG_ID });
  });

  it('gives every published post a date the schema can parse', () => {
    for (const p of getPosts()) expect(blogPostingJsonLd(p).datePublished).toBe(toIsoDate(p.date));
    expect(getPosts().every((p) => toIsoDate(p.date))).toBe(true);
  });
});
