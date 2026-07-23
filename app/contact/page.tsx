import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { ContactBody } from "./ContactBody";
export const metadata = {
  title: "Contact — Go Mobile",
  description: "Tell us about your next campaign. We'll handle the strategy, the buying, and the proof it worked.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="LET'S TALK"
        title={
          <>
            Tell us what<br />
            you&apos;re <span className="text-gradient-animated">building</span>.
          </>
        }
      />
      <ContactBody />
      <Footer />
    </main>
  );
}
