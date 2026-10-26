import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { CaseStudyBody } from "./CaseStudyBody";
import { getCaseStudies } from "@/lib/content/case-studies";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";

export const metadata = pageMetadata({
  path: "/case-study",
  title: "Case Studies | Go Mobile",
  description: "Campaigns that moved the numbers. Real brands, real lift, real results.",
});

export default function CaseStudyPage() {
  const cases = getCaseStudies("published");

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "Case Studies", path: "/case-study" }])} />
      <Nav />
      <PageHero
        title={<>Campaigns that<br />moved the <span className="text-gradient-animated">numbers</span>.</>}
        lede="A look at how we plan, buy, and optimize for brands across categories, and the lift we delivered."
      />
      <CaseStudyBody cases={cases} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
