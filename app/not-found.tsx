import Link from "next/link";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { BackgroundGrain } from "./components/BackgroundGrain";
import { PageHero } from "./components/PageHero";

export const metadata = {
  title: "Page not found | Go Mobile",
  /* Nothing here is worth indexing, and a 404 competing with real pages in
     search results is worse than no result at all. */
  robots: { index: false, follow: true },
};

/*
 * Shown for any URL that does not resolve.
 *
 * Built out of the same pieces as every other page rather than as a bare
 * message, because the default Next 404 is unstyled and reads as a broken
 * deployment rather than a mistyped address. Access logs showed real visitors
 * landing on paths that do not exist, so this is a page people actually see.
 *
 * The links are the point: a dead end should offer the three places someone
 * was most likely heading.
 */
export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundGrain />
      <Nav />
      <PageHero
        title={
          <>
            This page <span className="text-gradient-animated">moved on</span>.
          </>
        }
        lede="The address you followed does not exist, or it did once and no longer does. Nothing is broken, you have just landed somewhere empty."
      />

      <section className="px-6 md:px-[150px] pb-24 md:pb-32">
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn-primary h-[60px] text-[15px] px-10">
            BACK TO HOME
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M3.75 9h10.5M9 3.75L14.25 9L9 14.25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {[
            { href: "/solutions", label: "Solutions" },
            { href: "/case-study", label: "Case studies" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="h-[60px] px-8 rounded-full inline-flex items-center text-[15px] font-bold tracking-tight transition-opacity hover:opacity-70"
              style={{
                color: "var(--fg)",
                border: "1px solid var(--border)",
                background: "var(--card)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
