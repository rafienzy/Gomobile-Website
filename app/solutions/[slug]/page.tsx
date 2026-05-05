import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getService } from "../data";
import { ServiceDetail } from "./ServiceDetail";
import { getDbCaseStudies } from "@/lib/db/case-study";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} — Go Mobile`,
    description: s.heroDesc,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) notFound();

  const allCases = await getDbCaseStudies('published');
  const relatedCases = allCases.filter((c) => (data.relatedCases ?? []).includes(c.slug));

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <ServiceDetail data={data} relatedCases={relatedCases} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
