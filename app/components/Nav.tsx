"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

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
          <Image
            src={theme === "dark" ? "/assets/gomobile-darkmode.svg" : "/assets/gomobile-lightmode.svg"}
            alt="Go Mobile"
            width={100}
            height={22}
            className="h-4 w-auto"
            priority
          />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="text-2xl leading-none"
          style={{ color: "var(--fg)" }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Desktop bar ── */}
      <div className="hidden md:flex items-center justify-between">
        <Link href="/" aria-label="Go Mobile home">
          <Image
            src={theme === "dark" ? "/assets/gomobile-darkmode.svg" : "/assets/gomobile-lightmode.svg"}
            alt="Go Mobile"
            width={100}
            height={22}
            className="h-5 w-auto"
            priority
          />
        </Link>

        <div
          ref={innerRef}
          className="flex items-center gap-5 rounded-full pl-12 pr-2.5 py-2.5 backdrop-blur-sm glass"
        >
          <ul className="flex gap-8 text-xs font-bold font-helvetica">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-link" style={{ color: "var(--fg)" }}>
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
        <div className="md:hidden mt-2 rounded-2xl p-6 flex flex-col gap-4 glass">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-bold font-helvetica nav-link"
              style={{ color: "var(--fg)" }}
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
