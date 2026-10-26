import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getCaseStudy, getCaseStudies } from "@/lib/content/case-studies";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../../components/JsonLd";

export function generateStaticParams() {
  return getCaseStudies("published").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({
    path: `/case-study/${c.slug}`,
    title: `${c.brand} Case Study | Go Mobile`,
    description: c.headline,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getCaseStudy(slug);
  if (!data || data.status !== "published") notFound();

  // "Next case" follows the running order in content/case-studies.json, wrapping at the end.
  const allCases = getCaseStudies("published");
  const idx = allCases.findIndex((c) => c.slug === slug);
  const nextCase = allCases[(idx + 1) % allCases.length] ?? null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={caseStudyJsonLd(data)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Case Studies", path: "/case-study" },
          { name: data.brand, path: `/case-study/${data.slug}` },
        ])}
      />
      <Nav />
      <CaseStudyDetail data={data} nextCase={nextCase} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
