import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { AdFormatsDemo } from "./AdFormatsDemo";
export const metadata = {
  title: "Ad Format Preview | Go Mobile",
  description: "See how Go Mobile's programmatic ad formats look in a real editorial environment: display, native, video, sticky, and more.",
};

export default function AdFormatsDemoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <AdFormatsDemo />
      <Footer />
    </main>
  );
}
