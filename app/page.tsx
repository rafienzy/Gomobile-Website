import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { TrustedBy } from "./components/TrustedBy";
import { Services } from "./components/Services";
import { CaseStudies } from "./components/CaseStudies";
import { GoNetDSP } from "./components/GoNetDSP";
import { HowWeWork } from "./components/HowWeWork";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";
import { BackgroundGrain } from "./components/BackgroundGrain";
import { getCaseStudies } from "@/lib/content/case-studies";

export default function Home() {
  // Homepage features the first three in the running order from
  // content/case-studies.json. Reorder there, not here.
  const featured = getCaseStudies("published").slice(0, 3).map((c) => ({
    img: c.img,
    title: c.brand,
    slug: c.slug,
    desc: c.cardHeadline ?? c.headline,
    tags: c.tags.slice(0, 2),
  }));

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <Hero />
      <TrustedBy />
      <Services />
      <CaseStudies featured={featured} />
      <GoNetDSP />
      <HowWeWork />
      <ContactCTA />
      <Footer />
    </main>
  );
}
