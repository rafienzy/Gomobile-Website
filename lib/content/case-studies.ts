/**
 * Case study content source.
 *
 * Case studies are static content — they change a handful of times a year and
 * are reviewed like code, so they live in `content/case-studies.json` rather
 * than a database. Array order in that file IS the display order.
 *
 * This module is the single read seam for case study content. Swapping to a
 * CMS (Strapi) later means reimplementing these two functions and nothing else.
 */
import type { CaseStudy } from '@/lib/models/case-study';
import data from '@/content/case-studies.json';

const CASE_STUDIES = data as CaseStudy[];

export function getCaseStudies(
  status: 'published' | 'draft' | 'all' = 'published'
): CaseStudy[] {
  if (status === 'all') return CASE_STUDIES;
  return CASE_STUDIES.filter((c) => c.status === status);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
