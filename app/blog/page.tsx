import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { ComingSoon } from "./ComingSoon";

/*
 * The journal is not written yet, so /blog shows a placeholder instead of the
 * post grid. BlogBody, the [slug] detail page and lib/db/blog are all left in
 * place: restoring the real listing means swapping this file back, not
 * rebuilding it.
 *
 * Dropping the MongoDB read also makes this route static, where it used to be
 * force-dynamic and hit the database on every request.
 */

export const metadata = {
  title: "Journal | Go Mobile",
  description:
    "Working theories, post-mortems, and field notes from buying media across Southeast Asia. Launching soon.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="JOURNAL"
        title={<>Coming<br /><span className="text-gradient-animated">soon</span>.</>}
        lede="We are writing up what we learn buying media across Southeast Asia every day. The first pieces land shortly."
      />
      <ComingSoon />
      <ContactCTA />
      <Footer />
    </main>
  );
}
