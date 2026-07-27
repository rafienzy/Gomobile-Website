import type { Metadata } from "next";
import { Bricolage_Grotesque, Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Cursor } from "./components/Cursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { DemoModeProvider } from "./context/DemoMode";
import { DemoToggle } from "./components/DemoToggle";

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
  title: "Go Mobile | Your Ads. The Right People. Real Growth.",
  description:
    "Go Mobile is a digital marketing agency specializing in performance buying and programmatic advertising.",
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
        <DemoModeProvider>
          <ThemeProvider>
            <SmoothScroll />
            <Cursor />
            {children}
            <DemoToggle />
          </ThemeProvider>
        </DemoModeProvider>
      </body>
    </html>
  );
}
