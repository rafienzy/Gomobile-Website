import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { GoNetBody } from "./GoNetBody";
export const metadata = {
  title: "GoNet DSP | Go Mobile",
  description: "Our independent real-time bidding platform: 24 SSPs, AI targeting, and built-in brand safety.",
};

export default function GoNetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <GoNetBody />
      <ContactCTA />
      <Footer />
    </main>
  );
}
