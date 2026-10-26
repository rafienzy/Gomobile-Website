import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { SolutionsBody } from "./SolutionsBody";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";
export const metadata = pageMetadata({
  path: "/solutions",
  title: "Digital Advertising Solutions in Indonesia | Go Mobile",
  description: "Programmatic, video, CTV, rich media, and social buying for brands in Indonesia and Southeast Asia, run from Jakarta.",
});

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "Solutions", path: "/solutions" }])} />
      <Nav />
      <PageHero
        title={
          <>
            Solutions built<br />for <span className="text-gradient-animated">performance</span>.
          </>
        }
      />
      <SolutionsBody />
      <ContactCTA />
      <Footer />
    </main>
  );
}
