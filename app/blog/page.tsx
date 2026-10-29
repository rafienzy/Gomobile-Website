import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { BlogBody } from "./BlogBody";
import { getPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";

/*
 * Posts come from content/blog-posts.json; the first published one is the
 * featured card. The coming-soon screen in ./ComingSoon is kept for the case
 * where JOURNAL_LIVE in lib/content/blog.ts has to be switched off again.
 */

export const metadata = pageMetadata({
  path: "/blog",
  title: "Journal | Go Mobile",
  description:
    "Plain-language guides and field notes on programmatic, video and AI advertising in Indonesia, from the Go Mobile team.",
});

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "Journal", path: "/blog" }])} />
      <Nav />
      <PageHero
        title={<>Notes from the<br /><span className="text-gradient-animated">trade desk</span>.</>}
        lede="Working theories, guides and field notes from buying media every day across Indonesia and Southeast Asia."
      />
      <BlogBody posts={getPosts("published")} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
