import { Suspense } from 'react';
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { CaseStudyBody } from "./CaseStudyBody";
import { getDbCaseStudies } from "@/lib/db/case-study";
import { SkeletonBox, SkeletonLine } from '../components/Skeleton';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Case Studies — Go Mobile",
  description: "Campaigns that moved the numbers. Real brands, real lift, real results.",
};

/* ── Only this part is async (DB fetch) ─────────────────────────────────── */
async function CaseStudyList() {
  const cases = await getDbCaseStudies('published');
  return <CaseStudyBody cases={cases} />;
}

/* ── Skeleton matching just the case study cards ─────────────────────────── */
function CaseStudyGridSkeleton() {
  return (
    <div className="px-6 md:px-[136px] pb-24 flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonBox key={i} className="overflow-hidden flex flex-col md:flex-row h-auto md:h-[280px]">
          <div className="animate-pulse w-full md:w-[420px] shrink-0 h-[220px] md:h-full rounded-[12px]"
            style={{ background: 'var(--border)' }} />
          <div className="flex flex-col justify-center gap-4 p-8 flex-1">
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-6 w-4/5" />
            <SkeletonLine className="h-6 w-3/5" />
            <div className="flex gap-6 mt-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex flex-col gap-1">
                  <SkeletonLine className="h-7 w-14" />
                  <SkeletonLine className="h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </SkeletonBox>
      ))}
    </div>
  );
}

export default function CaseStudyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      {/* Static — renders immediately */}
      <PageHero
        eyebrow="CASE STUDIES"
        title={<>Campaigns that<br />moved the <span className="text-gradient-animated">numbers</span>.</>}
        lede="A look at how we plan, buy, and optimize for brands across categories — and the lift we delivered."
      />
      {/* Dynamic — skeleton while MongoDB loads */}
      <Suspense fallback={<CaseStudyGridSkeleton />}>
        <CaseStudyList />
      </Suspense>
      <ContactCTA />
      <Footer />
    </main>
  );
}
