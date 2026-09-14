import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
