import { Suspense } from 'react';
import { notFound } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { BlogPostDetail } from "./BlogPostDetail";
import { getDbPost, getDbRelatedPosts } from "@/lib/db/blog";
import { SkeletonBox, SkeletonLine } from '../../components/Skeleton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getDbPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Go Mobile Blog`,
    description: post.excerpt,
  };
}

/* ── Only this part is async (DB fetch) ─────────────────────────────────── */
async function BlogContent({ slug }: { slug: string }) {
  const post = await getDbPost(slug);
  if (!post) notFound();
  const related = await getDbRelatedPosts(post.relatedSlugs ?? []);
  return <BlogPostDetail post={post} related={related} />;
}

/* ── Skeleton matching the post content area (no Nav) ───────────────────── */
function BlogPostSkeleton() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] animate-pulse" style={{ background: 'var(--card)' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-[136px] pb-14 md:pb-20 gap-4">
          <div className="flex gap-2">
            <SkeletonLine className="h-6 w-20" />
            <SkeletonLine className="h-6 w-16" />
          </div>
          <SkeletonLine className="h-10 w-3/4" />
          <SkeletonLine className="h-5 w-1/2" />
        </div>
      </div>
      {/* Body */}
      <div className="px-6 md:px-[136px] py-16 max-w-[860px] mx-auto flex flex-col gap-5">
        {[1, 0.95, 0.85, 1, 0.75].map((w, i) => (
          <SkeletonLine key={i} className="h-5" style={{ width: `${w * 100}%` }} />
        ))}
        <SkeletonLine className="h-8 w-2/3 mt-6" />
        {[1, 1, 0.8].map((w, i) => (
          <SkeletonLine key={i} className="h-5" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
      {/* Related posts */}
      <div className="px-6 md:px-[136px] pb-20">
        <SkeletonLine className="h-4 w-32 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBox key={i} className="overflow-hidden">
              <div className="animate-pulse h-[160px]" style={{ background: 'var(--border)' }} />
              <div className="p-5 flex flex-col gap-3">
                <SkeletonLine className="h-4 w-3/4" />
                <SkeletonLine className="h-4 w-1/2" />
              </div>
            </SkeletonBox>
          ))}
        </div>
      </div>
    </>
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      {/* Static — always visible */}
      <Nav />
      {/* Dynamic — skeleton while MongoDB loads */}
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogContent slug={slug} />
      </Suspense>
      <ContactCTA />
      <Footer />
    </main>
  );
}
