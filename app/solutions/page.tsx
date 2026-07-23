import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { PageHero } from "../components/PageHero";
import { SolutionsBody } from "./SolutionsBody";
export const metadata = {
  title: "Solutions — Go Mobile",
  description: "Programmatic, video, rich media, and social — every layer of your digital campaign.",
};

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        eyebrow="WHAT WE DO"
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
