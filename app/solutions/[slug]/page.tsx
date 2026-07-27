import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getService, SERVICES } from "../data";
import { ServiceDetail } from "./ServiceDetail";
import { getCaseStudies } from "@/lib/content/case-studies";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.title} | Go Mobile`,
    description: s.heroDesc,
  };
}

function RelatedCases({ relatedSlugs }: { relatedSlugs: string[] }) {
  if (!relatedSlugs.length) return null;
  const cases = getCaseStudies("published").filter((c) => relatedSlugs.includes(c.slug));
  if (!cases.length) return null;

  return (
    <section className="px-6 md:px-[136px] py-10 md:py-16">
      <div className="mb-10">
        <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>CASE STUDIES</p>
        <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
          See it in action.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cases.map((c) => (
          <Link key={c.slug} href={`/case-study/${c.slug}`}>
            <article className="svc-case group relative rounded-[24px] overflow-hidden h-[280px]">
              <Image src={c.img} alt={c.brand} fill sizes="33vw"
                className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.07]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {c.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <h3 className="font-bricolage font-bold text-xl text-white">{c.brand}</h3>
                <p className="text-xs text-white/70 mt-1 leading-[1.5]">{c.headline}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getService(slug);
  if (!data) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <ServiceDetail
        data={data}
        relatedCasesSlot={<RelatedCases relatedSlugs={data.relatedCases ?? []} />}
      />
      <ContactCTA />
      <Footer />
    </main>
  );
}
