/**
 * The three figures the homepage hero cycles through.
 *
 * These go stale on a quarterly cadence that has nothing to do with shipping
 * code, so they live in `content/hero-stats.json`. Array order IS the cycling
 * order.
 *
 * Hero splits each label on `\n` and renders one line per part, so a newline
 * in the JSON is a deliberate line break in the card, not an accident.
 *
 * Single read seam: swapping to Strapi means reimplementing getHeroStats() and
 * nothing else. Model this as a Strapi single type with a repeatable component.
 */
import data from '@/content/hero-stats.json';

export type HeroStat = {
  value: string;
  label: string;
};

const HERO_STATS = data as HeroStat[];

export function getHeroStats(): HeroStat[] {
  return HERO_STATS;
}
