/**
 * Team, offices and hero stats are edited as JSON by people who are not
 * necessarily reading the components that consume them. These tests pin the
 * invariants those components quietly rely on, so a bad content edit fails
 * here with a clear message instead of at build time with a type error.
 */
import * as fs from 'fs';
import * as path from 'path';
import { getTeam } from '@/lib/content/team';
import { getOffices } from '@/lib/content/offices';
import { getHeroStats } from '@/lib/content/hero-stats';

describe('getTeam', () => {
  it('returns the roster in file order', () => {
    const team = getTeam();
    expect(team.length).toBeGreaterThan(0);
    expect(team[0].name).toBe('Daniil Pisarenko');
  });

  it('gives every member a name and a role', () => {
    for (const m of getTeam()) {
      expect(m.name.trim()).not.toBe('');
      expect(m.role.trim()).not.toBe('');
    }
  });

  it('points every photo at a file that actually exists in public/', () => {
    // Photo paths are typed by hand into JSON. Without this, a typo ships as a
    // broken image on the About page and nothing else complains.
    const missing = getTeam()
      .filter((m) => m.photo)
      .filter((m) => !fs.existsSync(path.join(process.cwd(), 'public', m.photo!)))
      .map((m) => `${m.name}: ${m.photo}`);
    expect(missing).toEqual([]);
  });

  it('uses root-relative photo paths, which is what next/image expects', () => {
    for (const m of getTeam()) {
      if (m.photo) expect(m.photo.startsWith('/')).toBe(true);
    }
  });

  it('ships the placeholder every photo-less member falls back to', () => {
    const placeholder = path.join(
      process.cwd(),
      'public/assets/team/avatar-placeholder.png'
    );
    expect(fs.existsSync(placeholder)).toBe(true);
  });
});

describe('getOffices', () => {
  it('returns every office', () => {
    expect(getOffices().length).toBeGreaterThan(0);
  });

  it('carries no Tailwind classes into the content layer', () => {
    // Guards the regression this extraction was meant to fix: layout belongs
    // to ContactBody, not to whoever is updating a phone number.
    for (const o of getOffices()) {
      expect(JSON.stringify(o)).not.toMatch(/col-span|md:|grid|flex/);
    }
  });

  it('marks exactly one office as featured, because only one wide card fits', () => {
    expect(getOffices().filter((o) => o.featured)).toHaveLength(1);
  });

  it('gives every office a reachable phone and email', () => {
    for (const o of getOffices()) {
      expect(o.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
      // The tel: href strips everything but digits and +, so there has to be
      // something left once it does.
      expect(o.phone.replace(/[^\d+]/g, '').length).toBeGreaterThan(6);
    }
  });
});

describe('getHeroStats', () => {
  it('returns at least two stats, or the hero has nothing to cycle through', () => {
    expect(getHeroStats().length).toBeGreaterThanOrEqual(2);
  });

  it('gives every stat a value and a label', () => {
    for (const s of getHeroStats()) {
      expect(s.value.trim()).not.toBe('');
      expect(s.label.trim()).not.toBe('');
    }
  });

  it('keeps labels to at most two lines, which is all the card has room for', () => {
    for (const s of getHeroStats()) {
      expect(s.label.split('\n').length).toBeLessThanOrEqual(2);
    }
  });
});
