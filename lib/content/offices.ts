/**
 * Office locations.
 *
 * Addresses and phone numbers are the kind of thing that has to be correct and
 * that nobody should need a pull request to fix, so they live in
 * `content/offices.json`. Array order IS the display order on /contact.
 *
 * Note what is deliberately NOT in the JSON: the Tailwind column span. That
 * used to be a `span: "md:col-span-2"` field sitting in the data, which handed
 * whoever edits an address the ability to break the grid. The JSON now carries
 * `featured` instead, and ContactBody decides what that looks like.
 *
 * Single read seam: swapping to Strapi means reimplementing getOffices() and
 * nothing else. Model this as a Strapi collection type.
 */
import data from '@/content/offices.json';

export type Office = {
  city: string;
  /** What this office is, shown above the city, e.g. "SEA Regional Hub". */
  label: string;
  address: string;
  phone: string;
  email: string;
  /** The primary office. Gets the wide card; everything else gets a narrow one. */
  featured: boolean;
};

const OFFICES = data as Office[];

export function getOffices(): Office[] {
  return OFFICES;
}
