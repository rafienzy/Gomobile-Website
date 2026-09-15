import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * NOT COLLECTING ANYTHING YET. Paste the measurement id below.
 * Find it in GA4 under Admin, Data streams, your web stream. It looks like
 * "G-ABC1234XYZ". Until it is set, this renders nothing at all: no script, no
 * network request, no cookie.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * A constant rather than an env var for the same reason as the form endpoint:
 * the id is public by nature, it ships in the HTML either way, and a
 * NEXT_PUBLIC_ var nobody sets on the build server would mean launch week goes
 * unmeasured with nothing to show that it had failed.
 *
 * Loaded with strategy="afterInteractive" so it never blocks first paint. The
 * site is prerendered and the hero is the first thing a visitor sees; analytics
 * has no business competing with it.
 */
const GA_MEASUREMENT_ID = "";

export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
