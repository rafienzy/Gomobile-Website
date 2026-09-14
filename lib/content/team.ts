/**
 * Team roster.
 *
 * Changes on every hire and departure, which has nothing to do with a deploy,
 * so it lives in `content/team.json` rather than inline in AboutBody. Array
 * order IS the display order on /about.
 *
 * Single read seam: swapping to Strapi means reimplementing getTeam() and
 * nothing else. Model this as a Strapi collection type.
 */
import data from '@/content/team.json';

export type TeamMember = {
  name: string;
  role: string;
  /**
   * Optional headshot, as a path under `public/` (e.g.
   * "/assets/team/jessica-pauli.webp"). Cropped to a circle and centred, so
   * the face wants to be near the middle of a square source image. Omit it
   * and the card falls back to the silhouette placeholder, which is what
   * everyone gets until their photo lands.
   */
  photo?: string;
};

const TEAM = data as TeamMember[];

export function getTeam(): TeamMember[] {
  return TEAM;
}
