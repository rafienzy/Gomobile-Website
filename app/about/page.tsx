import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { AboutBody } from "./AboutBody";
import { getTeam } from "@/lib/content/team";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";
export const metadata = pageMetadata({
  path: "/about",
  title: "About Go Mobile | Programmatic Agency in Jakarta",
  description: "Founded in 2016, Go Mobile is an independent Jakarta-based agency for performance buying and programmatic advertising across Indonesia and Southeast Asia.",
});

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
      <Nav />
      <PageHero
        title={
          <>
            A single entry point<br />into <span className="text-gradient-animated">mobile</span> marketing.
          </>
        }
        lede="Founded in 2016, Go Mobile is an independent media agency built around one belief: media buying should be transparent, accountable, and built on first-party data."
      />
      <AboutBody team={getTeam()} />
      <ContactCTA />
      <Footer />
    </main>
  );
}
