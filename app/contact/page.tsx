import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { ContactBody } from "./ContactBody";
import { getOffices } from "@/lib/content/offices";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";
export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Go Mobile | Jakarta, Indonesia",
  description: "Tell us about your next campaign. Our Jakarta team handles the strategy, the buying, and the proof it worked.",
});

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <Nav />
      <PageHero
        title={
          <>
            Tell us what<br />
            you&apos;re <span className="text-gradient-animated">building</span>.
          </>
        }
      />
      <ContactBody offices={getOffices()} />
      <Footer />
    </main>
  );
}
