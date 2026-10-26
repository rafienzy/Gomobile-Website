import { notFound, redirect } from "next/navigation";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { ContactCTA } from "../../components/ContactCTA";
import { BackgroundGrain } from "../../components/BackgroundGrain";
import { JsonLd } from "../../components/JsonLd";
import { BlogPostDetail } from "./BlogPostDetail";
import { JOURNAL_LIVE, getPost, getPosts, getRelatedPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";

/*
 * Until JOURNAL_LIVE is flipped, any direct link to an individual post lands
 * on /blog instead of rendering a draft.
 *
 * redirect() issues a 307, deliberately: these URLs are expected to work
 * once the journal launches, and a 308 would be cached by browsers long
 * after that.
 */

export function generateStaticParams() {
  return JOURNAL_LIVE ? getPosts("published").map((p) => ({ slug: p.slug })) : [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = JOURNAL_LIVE ? getPost(slug) : undefined;
  if (!post) return { title: "Journal | Go Mobile" };
  return pageMetadata({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Go Mobile Journal`,
    description: post.excerpt,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!JOURNAL_LIVE) redirect("/blog");

  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.status !== "published") notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Journal", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Nav />
      <BlogPostDetail post={post} related={getRelatedPosts(post.relatedSlugs)} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
