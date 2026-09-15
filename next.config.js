/*
 * Plain JavaScript, deliberately, not next.config.ts.
 *
 * Hostinger's build image ships a glibc older than 2.29, so Next's native SWC
 * binary refuses to load there and the build falls back to @next/swc-wasm-nodejs.
 * That fallback cannot compile a TypeScript config: it writes a temporary
 * <hash>.next.config file and then fails to import it, and the build dies
 * before it reaches a single page. A .js config needs no compile step, so
 * config loading no longer depends on SWC working at all.
 *
 * Keep this file as .js while the site builds on Hostinger.
 */

/*
 * Security headers.
 *
 * Applied to every route. Note that `headers()` is a server feature: if this
 * site ever moves to `output: 'export'`, none of these ship, and they have to
 * be reissued by whatever serves the files (an .htaccess block on Hostinger's
 * Apache, for instance). Worth remembering, because losing them is silent.
 */
const securityHeaders = [
  /*
   * Without HSTS the first request of a session can go out over plain HTTP and
   * be intercepted before the redirect to HTTPS ever lands.
   *
   * `preload` is deliberately absent. Submitting to the browser preload list
   * is close to a one-way door: removal takes months to reach users, and until
   * then any subdomain that cannot serve HTTPS is simply unreachable. Add it
   * only once the certificate setup is known to be stable, and knowingly.
   */
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },

  /* Stops the browser second-guessing a declared Content-Type, which is how a
   * file that is served as text ends up being run as script. */
  { key: "X-Content-Type-Options", value: "nosniff" },

  /* Send the full URL to ourselves, origin only to third parties, nothing at
   * all when leaving HTTPS for HTTP. Keeps referral attribution working for
   * outbound links without leaking the full path off-site. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  /*
   * Anti-clickjacking. frame-ancestors is the modern form and X-Frame-Options
   * is the fallback for older browsers that ignore it; both are here because
   * neither costs anything.
   *
   * This is a deliberately narrow CSP. A full content policy would be worth
   * having, but this site runs GSAP and Next both of which emit inline styles
   * and inline bootstrap script, so a restrictive script-src or style-src
   * needs testing page by page rather than being switched on blind.
   */
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },

  /* The site asks for none of these, so refuse them for everyone, including
   * anything that might end up embedded. */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Removes `x-powered-by: Next.js` from every response. It tells an attacker
   * which framework to look up advisories for and does nothing for us. */
  poweredByHeader: false,

  images: {
    /*
     * Next's default list ends 640, 750, 828, 1080, 1200, 1920, 2048, 3840.
     * The largest source art on the site is 1920x1080, and the optimizer never
     * upscales, so the 2048 and 3840 entries only ever re-encode the same
     * pixels under a wider label. Dropping them removes two variants per image
     * from the cache and from Vercel's image-transformation quota, and changes
     * nothing a visitor sees.
     *
     * Raise this again if art larger than 1920 is ever added.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  /*
   * www serves a full second copy of the site, on its own IP, with nothing
   * pointing either way. Search engines see two identical sites and split the
   * credit between them, and the sitemap declares the apex as canonical while
   * www quietly contradicts it.
   *
   * Doing it here rather than as a panel setting keeps the rule in the repo
   * where it is visible and survives a change of host. It is a server
   * redirect, so like headers() it does not survive `output: 'export'`; that
   * version would need the equivalent Apache rule instead.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gomobile.id" }],
        destination: "https://gomobile.id/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
