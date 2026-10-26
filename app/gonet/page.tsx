import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ContactCTA } from "../components/ContactCTA";
import { BackgroundGrain } from "../components/BackgroundGrain";
import { GoNetBody } from "./GoNetBody";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { JsonLd } from "../components/JsonLd";
export const metadata = pageMetadata({
  path: "/gonet",
  title: "GoNet DSP: Independent DSP for Indonesia | Go Mobile",
  description: "Our independent real-time bidding platform for Indonesia and Southeast Asia: 24 SSPs, AI targeting, and built-in brand safety.",
});

export default function GoNetPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <JsonLd data={breadcrumbJsonLd([{ name: "GoNet DSP", path: "/gonet" }])} />
      <JsonLd data={serviceJsonLd({ name: "GoNet DSP", description: metadata.description as string, path: "/gonet" })} />
      <Nav />
      <GoNetBody />
      <ContactCTA />
      <Footer />
    </main>
  );
}
