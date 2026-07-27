import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getCaseStudy, getCaseStudies } from "@/lib/content/case-studies";
import { CaseStudyDetail } from "./CaseStudyDetail";

export function generateStaticParams() {
  return getCaseStudies("published").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: `${c.brand} Case Study — Go Mobile`,
    description: c.headline,
  };
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
      <Nav />
      <CaseStudyDetail data={data} nextCase={nextCase} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
