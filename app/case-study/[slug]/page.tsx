import { Suspense } from 'react';
import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { getDbCaseStudy, getDbCaseStudies } from "@/lib/db/case-study";
import { CaseStudyDetail } from "./CaseStudyDetail";
import { SkeletonBox, SkeletonLine } from '../../components/Skeleton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getDbCaseStudy(slug);
  if (!c) return {};
  return {
    title: `${c.brand} Case Study — Go Mobile`,
    description: c.headline,
  };
}

/* ── Only this part is async (DB fetch) ─────────────────────────────────── */
async function CaseStudyContent({ slug }: { slug: string }) {
  const data = await getDbCaseStudy(slug);
  if (!data) notFound();
  const allCases = await getDbCaseStudies('published');
  const idx = allCases.findIndex((c) => c.slug === slug);
  const nextCase = allCases[(idx + 1) % allCases.length] ?? null;
  return <CaseStudyDetail data={data} nextCase={nextCase} />;
}

/* ── Skeleton matching the case study content area (no Nav) ─────────────── */
function CaseStudyDetailSkeleton() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[75vh] animate-pulse" style={{ background: 'var(--card)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-[136px] pb-14 md:pb-24 gap-4">
          <div className="flex gap-2">
            <SkeletonLine className="h-6 w-16" />
            <SkeletonLine className="h-6 w-20" />
          </div>
          <SkeletonLine className="h-12 w-2/3" />
          <SkeletonLine className="h-5 w-1/2" />
          <SkeletonLine className="h-4 w-32 mt-1" />
        </div>
      </div>
      {/* Metrics */}
      <div className="px-6 md:px-[136px] py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="p-7 md:p-9 flex flex-col gap-3">
              <SkeletonLine className="h-10 w-24" />
              <SkeletonLine className="h-4 w-20" />
              <SkeletonLine className="h-3 w-full" />
            </SkeletonBox>
          ))}
        </div>
      </div>
      {/* Overview */}
      <div className="px-6 md:px-[136px] pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {['CHALLENGE', 'SOLUTION', 'RESULT'].map((l) => (
            <SkeletonBox key={l} className="p-8 md:p-10 flex flex-col gap-4">
              <SkeletonLine className="h-3 w-20" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-3/4" />
            </SkeletonBox>
          ))}
        </div>
      </div>
      {/* Approach */}
      <div className="px-6 md:px-[136px] pb-16">
        <div className="flex flex-col gap-3 mb-10">
          <SkeletonLine className="h-3 w-28" />
          <SkeletonLine className="h-8 w-56" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="p-8 md:p-10 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="animate-pulse w-10 h-10 rounded-full shrink-0" style={{ background: 'var(--border)' }} />
                <SkeletonLine className="h-5 w-48" />
              </div>
              <SkeletonLine className="h-4 w-full" />
              <SkeletonLine className="h-4 w-5/6" />
            </SkeletonBox>
          ))}
        </div>
      </div>
    </>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      {/* Static — always visible */}
      <Nav />
      {/* Dynamic — skeleton while MongoDB loads */}
      <Suspense fallback={<CaseStudyDetailSkeleton />}>
        <CaseStudyContent slug={slug} />
      </Suspense>
      <ContactCTA />
      <Footer />
    </main>
  );
}
