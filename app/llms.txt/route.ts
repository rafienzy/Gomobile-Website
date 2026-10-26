import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL_URLS } from "@/lib/site";
import { SERVICES } from "@/app/solutions/data";
import { getCaseStudies } from "@/lib/content/case-studies";
import { getOffices } from "@/lib/content/offices";

/**
 * Serves /llms.txt (llmstxt.org): a plain Markdown summary of the site for
 * AI assistants, with links to the pages worth reading.
 *
 * Built from the same content the pages render, so a new service or case
 * study appears here without anyone remembering to edit this file. The prose
 * is kept factual on purpose: an assistant quotes it, so it should only say
 * what the site itself says.
 */
export const dynamic = "force-static";

function build() {
  const hq = getOffices().find((o) => o.featured) ?? getOffices()[0];
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Go Mobile is an independent media agency founded in 2016 and headquartered in Jakarta, Indonesia. " +
      "It plans and buys programmatic display, video, Connected TV (CTV) and OTT, rich media and paid social " +
      "for brands in Indonesia and Southeast Asia, and runs its own demand-side platform, GoNet DSP.",
    "",
    `- Office: ${hq.address}`,
    `- Email: ${hq.email}`,
    `- Phone: ${hq.phone}`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- [${s.title}](${SITE_URL}/solutions/${s.slug}): ${s.heroDesc}`),
    `- [GoNet DSP](${SITE_URL}/gonet): Go Mobile's independent real-time bidding platform, connected to 24 SSPs, with AI targeting and built-in brand safety.`,
    "",
    "## Case studies",
    "",
    ...getCaseStudies("published").map((c) => `- [${c.brand}](${SITE_URL}/case-study/${c.slug}): ${c.headline}`),
    "",
    "## Company",
    "",
    `- [About](${SITE_URL}/about): history, approach and team`,
    `- [Contact](${SITE_URL}/contact): send a campaign brief`,
    `- [Ad format preview](${SITE_URL}/ad-formats-demo): live examples of the ad formats Go Mobile builds`,
    "",
    "## Optional",
    "",
    `- [Instagram](${SOCIAL_URLS.instagram})`,
    `- [LinkedIn](${SOCIAL_URLS.linkedin})`,
    `- [TikTok](${SOCIAL_URLS.tiktok})`,
    `- [Threads](${SOCIAL_URLS.threads})`,
    `- [Privacy Policy](${SITE_URL}/privacy)`,
    `- [Terms of Service](${SITE_URL}/terms)`,
    "",
  ];
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
