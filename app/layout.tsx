import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Cursor } from "./components/Cursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { Analytics } from "./components/Analytics";
import { SITE_URL } from "@/lib/site";

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

const TITLE = "Go Mobile | Your Ads. The Right People. Real Growth.";
const DESCRIPTION =
  "Go Mobile is a digital marketing agency specializing in performance buying and programmatic advertising.";

export const metadata: Metadata = {
  /*
   * metadataBase turns every relative metadata URL absolute. Without it the
   * share image and the canonical tag are emitted as paths, which crawlers and
   * chat apps cannot resolve, so previews silently fall back to nothing.
   */
  metadataBase: new URL(SITE_URL),

  title: TITLE,
  description: DESCRIPTION,

  /*
   * The apex is canonical. www currently serves a full second copy of the site
   * with no redirect, so until that redirect exists this tag is the only thing
   * telling a crawler which of the two is the real one.
   */
  alternates: { canonical: "/" },

  /*
   * openGraph and twitter both point at app/opengraph-image.png, which Next
   * picks up from the file name and sizes automatically. `type: "website"` and
   * an explicit url are what make a pasted link render as a card rather than
   * bare text in WhatsApp, LinkedIn and Slack.
   */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Go Mobile",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
