import { Suspense } from 'react';
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getService } from "../data";
import { ServiceDetail } from "./ServiceDetail";
import { getDbCaseStudies } from "@/lib/db/case-study";
import { SkeletonBox, SkeletonLine } from '../../components/Skeleton';

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

/* ── Only related cases are async (everything else is hardcoded) ─────────── */
async function RelatedCases({ relatedSlugs }: { relatedSlugs: string[] }) {
  if (!relatedSlugs.length) return null;
  const allCases = await getDbCaseStudies('published');
  const cases = allCases.filter((c) => relatedSlugs.includes(c.slug));
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

/* ── Skeleton only for the related cases cards ───────────────────────────── */
function RelatedCasesSkeleton() {
  return (
    <section className="px-6 md:px-[136px] py-10 md:py-16">
      <div className="mb-10 flex flex-col gap-3">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-8 w-48" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonBox key={i} className="overflow-hidden h-[280px]">
            <div className="animate-pulse h-full w-full" style={{ background: 'var(--border)' }} />
          </SkeletonBox>
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
      {/*
        ServiceDetail renders immediately with all hardcoded service content.
        The relatedCasesSlot is injected as a Suspense boundary so only
        the related case study cards show a skeleton.
      */}
      <ServiceDetail
        data={data}
        relatedCasesSlot={
          <Suspense fallback={<RelatedCasesSkeleton />}>
            <RelatedCases relatedSlugs={data.relatedCases ?? []} />
          </Suspense>
        }
      />
      <ContactCTA />
      <Footer />
    </main>
  );
}
