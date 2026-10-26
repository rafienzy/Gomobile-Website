import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { AdFormatsDemo } from "./AdFormatsDemo";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";
export const metadata = pageMetadata({
  path: "/ad-formats-demo",
  title: "Ad Format Preview | Go Mobile",
  description: "See how Go Mobile's programmatic ad formats look in a real editorial environment: display, native, video, sticky, and more.",
});

export default function AdFormatsDemoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "Ad Format Preview", path: "/ad-formats-demo" }])} />
      <Nav />
      <AdFormatsDemo />
      <Footer />
    </main>
  );
}
