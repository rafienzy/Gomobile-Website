import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { AboutBody } from "./AboutBody";
export const metadata = {
  title: "About | Go Mobile",
  description: "We are a digital marketing agency specializing in performance buying and programmatic advertising.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="ABOUT US"
        title={
          <>
            A single entry point<br />into <span className="text-gradient-animated">mobile</span> marketing.
          </>
        }
        lede="Founded in 2016, Go Mobile is an independent media agency built around one belief: media buying should be transparent, accountable, and built on first-party data."
      />
      <AboutBody />
      <ContactCTA />
      <Footer />
    </main>
  );
}
