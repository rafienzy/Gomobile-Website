import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Cursor } from "./components/Cursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { Analytics } from "./components/Analytics";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { siteJsonLd } from "@/lib/structured-data";
import { JsonLd } from "./components/JsonLd";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  /*
   * metadataBase turns every relative metadata URL absolute. Without it the
   * share image and the canonical tag are emitted as paths, which crawlers and
   * chat apps cannot resolve, so previews silently fall back to nothing.
   */
  metadataBase: new URL(SITE_URL),

  title: SITE_TITLE,
  description: SITE_DESCRIPTION,

  /*
   * Deliberately no canonical and no openGraph.url here. Every route inherits
   * this object, so a canonical set here marks every page as a copy of the
   * homepage. Each page sets its own through pageMetadata() in lib/seo.ts.
   * The apex is canonical, and www currently serves a second copy of the site
   * with no redirect, so those per-page tags are also what tell a crawler
   * which of the two is the real one.
   *
   * openGraph and twitter both point at app/opengraph-image.png, which Next
   * picks up from the file name and sizes automatically. These are the
   * fallbacks for routes without their own, such as the 404.
   */
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${nunito.variable} ${nunitoSans.variable}`}
    >
      <body className="font-nunitoSans antialiased">
        <JsonLd data={siteJsonLd()} />
        <ThemeProvider>
          <SmoothScroll />
          <Cursor />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
