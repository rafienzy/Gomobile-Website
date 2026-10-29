/**
 * Schema.org structured data (JSON-LD), rendered by app/components/JsonLd.
 *
 * This is the machine-readable version of what the pages already say: who Go
 * Mobile is, where it is, what it sells, and what each case study is about.
 * Google uses it for the knowledge panel and rich results; AI assistants use it
 * to state facts about the agency and credit the site.
 *
 * Everything here is built from the same content the pages render, so a copy
 * edit updates the markup too. The organisation is defined once, under
 * ORG_ID, and every other node refers to it by that id instead of repeating it.
 */
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_URLS } from "@/lib/site";
import type { Service } from "@/app/solutions/data";
import type { CaseStudy } from "@/lib/models/case-study";
import type { BlogPost } from "@/lib/models/blog";
import { getOffices } from "@/lib/content/offices";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const org = { "@id": ORG_ID };
const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * The Jakarta office, split into the fields PostalAddress needs. It mirrors
 * the one-line address in content/offices.json; a test fails if the two
 * drift, so update both together.
 */
export const HQ_ADDRESS = {
  streetAddress:
    "Menara Astra, 37th Floor, Jl. Jenderal Sudirman Kav. 5–6, Karet Tengsin, Tanah Abang",
  addressLocality: "Jakarta Pusat",
  postalCode: "10220",
  addressCountry: "ID",
};
export const HQ_PHONE = "+62-818-903-358";
/** The Google Business Profile listing, read from content/offices.json. */
export const HQ_MAP_URL = getOffices().find((o) => o.featured)?.mapUrl;
export const HQ_EMAIL = "bd@gomobileagency.com";

/** Organization + WebSite, rendered once on every page from the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: "Go Mobile Indonesia",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png`, width: 512, height: 512 },
        description: SITE_DESCRIPTION,
        // From the About page: "Founded in 2016".
        foundingDate: "2016",
        email: HQ_EMAIL,
        telephone: HQ_PHONE,
        address: { "@type": "PostalAddress", ...HQ_ADDRESS },
        /*
         * schema.org has no advertising or marketing agency type, so the
         * company stays an Organization and says what kind it is through
         * additionalType and knowsAbout.
         *
         * The office is a LocalBusiness: that is the type that matches a
         * Google Business Profile, and as a Place it is where hasMap is valid
         * (on the Organization itself validators reject it). Its name matches
         * the Maps listing so the two are easy to pair.
         */
        additionalType: "https://en.wikipedia.org/wiki/Advertising_agency",
        knowsAbout: [
          "Programmatic advertising",
          "Performance marketing",
          "Connected TV and OTT advertising",
          "Rich media and HTML5 advertising",
          "Social media advertising",
          "Mobile user acquisition",
          "Demand-side platforms",
        ],
        location: {
          "@type": "LocalBusiness",
          name: "Go Mobile Indonesia",
          parentOrganization: org,
          address: { "@type": "PostalAddress", ...HQ_ADDRESS },
          telephone: HQ_PHONE,
          url: SITE_URL,
          ...(HQ_MAP_URL ? { hasMap: HQ_MAP_URL } : {}),
        },
        areaServed: ["Indonesia", "Southeast Asia"],
        sameAs: Object.values(SOCIAL_URLS),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: org,
        inLanguage: "en",
      },
    ],
  };
}

/** Home › … › current page. Pass the trail after Home; the last item is the page itself. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceJsonLd(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url: abs(s.path),
    provider: org,
    areaServed: ["Indonesia", "Southeast Asia"],
  };
}

export function solutionJsonLd(s: Service) {
  return serviceJsonLd({ name: s.title, description: s.heroDesc, path: `/solutions/${s.slug}` });
}

/**
 * Case studies carry no publish dates in content/case-studies.json, so none
 * are emitted. Add `datePublished` here once the content has real ones;
 * inventing them would be worse than leaving them out.
 */
export function caseStudyJsonLd(c: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${c.brand} Case Study`,
    description: c.headline,
    url: abs(`/case-study/${c.slug}`),
    mainEntityOfPage: abs(`/case-study/${c.slug}`),
    image: abs(c.img),
    author: org,
    publisher: org,
    about: { "@type": "Organization", name: c.brand },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * "Apr 18, 2026" → "2026-04-18". Post dates are typed by hand in that display
 * format, and schema.org needs ISO 8601. Returns undefined for anything that
 * is not a real calendar date (Feb 29 in a non-leap year, say) rather than
 * letting Date roll it over into the next month.
 */
export function toIsoDate(display: string): string | undefined {
  const m = display.trim().match(/^([A-Z][a-z]{2}) (\d{1,2}), (\d{4})$/);
  if (!m) return undefined;
  const month = MONTHS.indexOf(m[1]);
  const day = Number(m[2]);
  const year = Number(m[3]);
  if (month < 0) return undefined;
  const d = new Date(Date.UTC(year, month, day));
  if (d.getUTCMonth() !== month || d.getUTCDate() !== day) return undefined;
  return d.toISOString().slice(0, 10);
}

export function blogPostingJsonLd(p: BlogPost) {
  const url = abs(`/blog/${p.slug}`);
  const published = toIsoDate(p.date);
  const modified = p.updated ? toIsoDate(p.updated) : published;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: abs(p.img),
    datePublished: published,
    dateModified: modified,
    // A post with no authorRole is bylined to the team, so credit the company.
    author: p.authorRole
      ? { "@type": "Person", name: p.author, jobTitle: p.authorRole, worksFor: org }
      : org,
    publisher: org,
    mainEntityOfPage: url,
    url,
    inLanguage: "en",
  };
}
