"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { Icon } from "./Icon";

/**
 * Inline SVG logo split into two stacked layers:
 *  - Layer 1: "go" path — always orange, normal rendering.
 *  - Layer 2: "mobile" SVG — mix-blend-mode:difference applied to the SVG
 *    ELEMENT (not the path), so it composites against the page background.
 *    White on dark → stays white. White on light → inverts to black.
 *
 * The blend mode MUST be on the SVG element, not a <path>, because
 * mix-blend-mode on a path only blends within the SVG's internal context.
 */
function GoMobileLogo({ className }: { className?: string }) {
  const goPath = "M16.7949 7.55307V21.1426C16.7949 24.1355 16.0704 26.36 14.6214 27.816C13.1725 29.272 11.0555 30 8.27043 30C6.80264 30 5.41013 29.8079 4.09288 29.4237C2.77562 29.0394 1.68419 28.4833 0.818573 27.7553L2.56863 24.3579C3.20843 24.9242 4.01761 25.3691 4.99614 25.6926C5.97466 26.0364 6.95318 26.2083 7.93171 26.2083C9.45595 26.2083 10.5756 25.8342 11.2907 25.0859C12.0246 24.3579 12.3915 23.2457 12.3915 21.7492V21.0516C11.2436 22.4065 9.64412 23.0839 7.59299 23.0839C6.20047 23.0839 4.92087 22.7604 3.75416 22.1132C2.60626 21.4459 1.6936 20.5157 1.01616 19.3225C0.33872 18.1294 0 16.7543 0 15.1972C0 13.64 0.33872 12.2649 1.01616 11.0718C1.6936 9.87865 2.60626 8.95853 3.75416 8.31141C4.92087 7.64407 6.20047 7.3104 7.59299 7.3104C9.79467 7.3104 11.4694 8.08896 12.6173 9.64609V7.55307H16.7949ZM8.46801 19.2012C9.63472 19.2012 10.585 18.8372 11.3189 18.1092C12.0716 17.361 12.448 16.3903 12.448 15.1972C12.448 14.004 12.0716 13.0435 11.3189 12.3155C10.585 11.5672 9.63472 11.1931 8.46801 11.1931C7.30131 11.1931 6.34161 11.5672 5.5889 12.3155C4.83619 13.0435 4.45983 14.004 4.45983 15.1972C4.45983 16.3903 4.83619 17.361 5.5889 18.1092C6.34161 18.8372 7.30131 19.2012 8.46801 19.2012ZM28.1193 24.1153C26.5198 24.1153 25.0802 23.7614 23.8006 23.0536C22.5398 22.3256 21.5519 21.3246 20.8368 20.0505C20.1217 18.7765 19.7642 17.3306 19.7642 15.7128C19.7642 14.095 20.1217 12.6491 20.8368 11.3751C21.5519 10.1011 22.5398 9.1102 23.8006 8.40241C25.0802 7.6744 26.5198 7.3104 28.1193 7.3104C29.7188 7.3104 31.1489 7.6744 32.4097 8.40241C33.6705 9.1102 34.6584 10.1011 35.3735 11.3751C36.0886 12.6491 36.4461 14.095 36.4461 15.7128C36.4461 17.3306 36.0886 18.7765 35.3735 20.0505C34.6584 21.3246 33.6705 22.3256 32.4097 23.0536C31.1489 23.7614 29.7188 24.1153 28.1193 24.1153ZM28.1193 20.2325C29.2483 20.2325 30.1704 19.8281 30.8855 19.0192C31.6194 18.1901 31.9863 17.088 31.9863 15.7128C31.9863 14.3377 31.6194 13.2457 30.8855 12.4368C30.1704 11.6077 29.2483 11.1931 28.1193 11.1931C26.9902 11.1931 26.0587 11.6077 25.3248 12.4368C24.5909 13.2457 24.224 14.3377 24.224 15.7128C24.224 17.088 24.5909 18.1901 25.3248 19.0192C26.0587 19.8281 26.9902 20.2325 28.1193 20.2325Z";

  const mobilePath = "M58.8377 7.31042C60.7383 7.31042 62.2437 7.91709 63.354 9.13044C64.4831 10.3236 65.0476 12.1234 65.0476 14.5298V23.8726H60.6442V15.2578C60.6442 13.9636 60.3902 13.003 59.8821 12.3761C59.3928 11.729 58.6872 11.4055 57.7651 11.4055C56.7301 11.4055 55.9116 11.7695 55.3094 12.4975C54.7072 13.2053 54.4061 14.2669 54.4061 15.6825V23.8726H50.0028V15.2578C50.0028 12.6896 49.0431 11.4055 47.1237 11.4055C46.1075 11.4055 45.2982 11.7695 44.696 12.4975C44.0939 13.2053 43.7928 14.2669 43.7928 15.6825V23.8726H39.3894V7.55309H43.5952V9.43378C44.1597 8.74621 44.8466 8.22043 45.6557 7.85643C46.4839 7.49243 47.3871 7.31042 48.3656 7.31042C49.4383 7.31042 50.4074 7.54298 51.273 8.0081C52.1386 8.45299 52.8349 9.11022 53.3618 9.97979C53.9827 9.13044 54.7637 8.47322 55.7046 8.0081C56.6643 7.54298 57.7087 7.31042 58.8377 7.31042ZM76.3858 24.1153C74.7863 24.1153 73.3467 23.7614 72.0671 23.0536C70.8063 22.3256 69.8184 21.3246 69.1033 20.0506C68.3882 18.7766 68.0307 17.3306 68.0307 15.7129C68.0307 14.0951 68.3882 12.6491 69.1033 11.3751C69.8184 10.1011 70.8063 9.11022 72.0671 8.40244C73.3467 7.67443 74.7863 7.31042 76.3858 7.31042C77.9853 7.31042 79.4154 7.67443 80.6762 8.40244C81.937 9.11022 82.9249 10.1011 83.64 11.3751C84.3551 12.6491 84.7126 14.0951 84.7126 15.7129C84.7126 17.3306 84.3551 18.7766 83.64 20.0506C82.9249 21.3246 81.937 22.3256 80.6762 23.0536C79.4154 23.7614 77.9853 24.1153 76.3858 24.1153ZM76.3858 20.2326C77.5148 20.2326 78.4369 19.8281 79.152 19.0192C79.8859 18.1901 80.2528 17.088 80.2528 15.7129C80.2528 14.3377 79.8859 13.2457 79.152 12.4368C78.4369 11.6077 77.5148 11.1931 76.3858 11.1931C75.2567 11.1931 74.3252 11.6077 73.5913 12.4368C72.8574 13.2457 72.4905 14.3377 72.4905 15.7129C72.4905 17.088 72.8574 18.1901 73.5913 19.0192C74.3252 19.8281 75.2567 20.2326 76.3858 20.2326ZM96.6318 7.31042C98.0431 7.31042 99.3227 7.66431 100.471 8.3721C101.637 9.05966 102.55 10.0405 103.209 11.3145C103.867 12.5683 104.197 14.0344 104.197 15.7129C104.197 17.3913 103.867 18.8676 103.209 20.1416C102.55 21.3954 101.637 22.3762 100.471 23.0839C99.3227 23.7715 98.0431 24.1153 96.6318 24.1153C94.543 24.1153 92.9529 23.4075 91.8615 21.9919V23.8726H87.6557V1.36501H92.0591V9.28211C93.1693 7.96765 94.6936 7.31042 96.6318 7.31042ZM95.8697 20.2326C96.9988 20.2326 97.9208 19.8281 98.6359 19.0192C99.3698 18.1901 99.7367 17.088 99.7367 15.7129C99.7367 14.3377 99.3698 13.2457 98.6359 12.4368C97.9208 11.6077 96.9988 11.1931 95.8697 11.1931C94.7406 11.1931 93.8091 11.6077 93.0752 12.4368C92.3602 13.2457 92.0026 14.3377 92.0026 15.7129C92.0026 17.088 92.3602 18.1901 93.0752 19.0192C93.8091 19.8281 94.7406 20.2326 95.8697 20.2326ZM107.144 7.55309H111.548V23.8726H107.144V7.55309ZM109.346 5.27806C108.537 5.27806 107.878 5.02528 107.37 4.51972C106.862 4.01416 106.608 3.38726 106.608 2.63903C106.608 1.8908 106.862 1.2639 107.37 0.758342C107.878 0.252781 108.537 0 109.346 0C110.155 0 110.814 0.242671 111.322 0.72801C111.83 1.21335 112.084 1.82003 112.084 2.54803C112.084 3.33671 111.83 3.99394 111.322 4.51972C110.814 5.02528 110.155 5.27806 109.346 5.27806ZM115.634 1.36501H120.038V23.8726H115.634V1.36501ZM139 15.7735C139 15.8342 138.972 16.2589 138.915 17.0475H127.427C127.634 18.0587 128.123 18.8574 128.895 19.4439C129.666 20.0303 130.626 20.3236 131.774 20.3236C132.564 20.3236 133.261 20.2022 133.863 19.9596C134.484 19.6967 135.058 19.2922 135.585 18.7462L137.927 21.4763C136.497 23.2356 134.408 24.1153 131.661 24.1153C129.949 24.1153 128.434 23.7614 127.117 23.0536C125.799 22.3256 124.783 21.3246 124.068 20.0506C123.353 18.7766 122.996 17.3306 122.996 15.7129C122.996 14.1153 123.344 12.6795 124.04 11.4055C124.755 10.1112 125.724 9.11022 126.947 8.40244C128.189 7.67443 129.572 7.31042 131.097 7.31042C132.583 7.31042 133.929 7.6542 135.133 8.34176C136.337 9.02933 137.278 10.0202 137.956 11.3145C138.652 12.5885 139 14.0748 139 15.7735ZM131.125 10.8898C130.127 10.8898 129.29 11.1931 128.613 11.7998C127.935 12.4065 127.521 13.2356 127.371 14.2872H134.851C134.7 13.2558 134.286 12.4368 133.609 11.8301C132.931 11.2032 132.103 10.8898 131.125 10.8898Z";

  return (
    <span
      role="img"
      aria-label="Go Mobile"
      style={{ display: "inline-block", position: "relative" }}
    >
      {/* Layer 1 — "go" (orange), sets the element's natural dimensions */}
      <svg
        width="139" height="30" viewBox="0 0 139 30"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path d={goPath} fill="#EF5600" />
      </svg>

      {/*
        Layer 2 — "mobile" (white).
        mix-blend-mode is on the SVG ELEMENT so it composites against the
        page background (not within the SVG's internal context).
        White on dark bg  → stays white.
        White on light bg → inverts to black.
      */}
      <svg
        width="139" height="30" viewBox="0 0 139 30"
        fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, mixBlendMode: "difference" }}
      >
        <path d={mobilePath} fill="white" />
      </svg>
    </span>
  );
}

const LINKS = [
  { label: "SOLUTIONS",  href: "/solutions"   },
  { label: "CASE STUDY", href: "/case-study"  },
  { label: "ABOUT",      href: "/about"       },
  { label: "BLOG",       href: "/blog"        },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const navRef  = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const nav   = navRef.current;
    const inner = innerRef.current;
    if (!nav) return;

    const shrinkTrigger = ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        if (inner) gsap.to(inner, { paddingTop: 6, paddingBottom: 6, duration: 0.4, ease: "power2.out" });
        gsap.to(nav, { top: 12, duration: 0.4, ease: "power2.out" });
      },
      onLeaveBack: () => {
        if (inner) gsap.to(inner, { paddingTop: 10, paddingBottom: 10, duration: 0.4, ease: "power2.out" });
        gsap.to(nav, {
          top: window.matchMedia("(min-width: 768px)").matches ? 92 : 24,
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });

    let hidden = false;
    let lastY   = window.scrollY;
    const onScroll = () => {
      const y  = window.scrollY;
      const dy = y - lastY;
      lastY    = y;
      if (Math.abs(dy) < 2) return;
      if (dy > 0 && y > 240 && !hidden) {
        hidden = true;
        gsap.to(nav, { yPercent: -140, duration: 0.45, ease: "power3.in",  overwrite: "auto" });
      } else if (dy < 0 && hidden) {
        hidden = false;
        gsap.to(nav, { yPercent: 0,    duration: 0.5,  ease: "power3.out", overwrite: "auto" });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      shrinkTrigger.kill();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed left-0 right-0 top-6 md:top-[92px] z-50 px-4 md:px-[150px]">

      {/* ── Mobile bar ── */}
      <div className="md:hidden flex items-center justify-between rounded-2xl px-5 py-3 glass">
        <Link href="/" aria-label="Go Mobile home">
          <GoMobileLogo className="h-4 w-auto" />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="leading-none"
          style={{ color: "var(--fg)" }}
        >
          <Icon name={open ? "xmark" : "bars"} className="w-6 h-6" />
        </button>
      </div>

      {/* ── Desktop bar ── */}
      <div className="hidden md:flex items-center justify-between">
        <Link href="/" aria-label="Go Mobile home">
          <GoMobileLogo className="h-5 w-auto" />
        </Link>

        <div
          ref={innerRef}
          className="flex items-center gap-5 rounded-full pl-12 pr-2.5 py-2.5 backdrop-blur-sm glass"
        >
          <ul className="flex gap-8 text-xs font-bold font-helvetica">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden transition-opacity hover:opacity-70"
            style={{ background: "rgba(128,128,128,0.15)" }}
          >
            <Image
              src={theme === "dark" ? "/assets/lightmode-btn.png" : "/assets/darkmode-btn.png"}
              alt={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              width={24}
              height={24}
              className="w-[18px] h-[18px] object-contain"
            />
          </button>
          <Link href="/contact">
            <MagneticButton className="btn-primary h-[46px] text-sm">LET&apos;S TALK</MagneticButton>
          </Link>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="md:hidden mt-2 rounded-2xl p-6 flex flex-col gap-4 glass" style={{ backdropFilter: "blur(40px) saturate(1.8)", WebkitBackdropFilter: "blur(40px) saturate(1.8)", background: theme === "dark" ? "rgba(10,10,10,0.92)" : "rgba(255,255,255,0.92)" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-bold font-helvetica nav-link"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            <button
              onClick={toggle}
              className="h-10 w-10 rounded-full flex items-center justify-center overflow-hidden transition-opacity hover:opacity-70"
              style={{ background: "rgba(128,128,128,0.15)" }}
            >
              <Image
                src={theme === "dark" ? "/assets/lightmode-btn.png" : "/assets/darkmode-btn.png"}
                alt={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                width={24}
                height={24}
                className="w-[18px] h-[18px] object-contain"
              />
            </button>
            <Link href="/contact" className="flex-1">
              <MagneticButton className="btn-primary h-[46px] text-sm w-full">LET&apos;S TALK</MagneticButton>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
