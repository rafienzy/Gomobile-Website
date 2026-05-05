import { Suspense } from 'react';
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { BlogBody } from "./BlogBody";
import { getDbPosts } from "@/lib/db/blog";
import { SkeletonBox, SkeletonLine } from '../components/Skeleton';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: "Blog — Go Mobile",
  description: "Insights on programmatic, performance, and the future of advertising.",
};

/* ── Only this part is async (DB fetch) ─────────────────────────────────── */
async function BlogPosts() {
  const posts = await getDbPosts('published');
  return <BlogBody posts={posts} />;
}

/* ── Skeleton matching just the blog grid ────────────────────────────────── */
function BlogGridSkeleton() {
  return (
    <div className="px-6 md:px-[136px] pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBox key={i} className="overflow-hidden">
          <div className="animate-pulse h-[220px] w-full rounded-[12px]" style={{ background: 'var(--border)' }} />
          <div className="p-6 flex flex-col gap-3">
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="h-5 w-full" />
            <SkeletonLine className="h-5 w-4/5" />
            <SkeletonLine className="h-4 w-full mt-1" />
            <SkeletonLine className="h-4 w-3/4" />
            <div className="flex gap-2 mt-2">
              <SkeletonLine className="h-3 w-16" />
              <SkeletonLine className="h-3 w-12" />
            </div>
          </div>
        </SkeletonBox>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      {/* Static — renders immediately */}
      <PageHero
        eyebrow="JOURNAL"
        title={<>Notes from the<br /><span className="text-gradient-animated">trade desk</span>.</>}
        lede="Working theories, post-mortems, and field notes from buying media every day across SEA."
      />
      {/* Dynamic — skeleton while MongoDB loads */}
      <Suspense fallback={<BlogGridSkeleton />}>
        <BlogPosts />
      </Suspense>
      <ContactCTA />
      <Footer />
    </main>
  );
}
