"use client";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV_COLS = [
  {
    heading: "Our Services",
    links: [
      { label: "Case Study", href: "/case-study" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Contacts", href: "/contact" },
    ],
  },
  {
    heading: "Go NET",
    links: [
      //{ label: "Go Predicts", href: "/gonet" },
      //{ label: "Go Design", href: "/gonet" },
      //{ label: "Go ASO", href: "/gonet" },
    ],
  },
];


function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="11" cy="11" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 9.5V15M7 7v.5M11 15v-3a2 2 0 014 0v3M11 9.5V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4c.3 1.5 1.3 2.7 2.7 3.1M14 4v9.5a3.5 3.5 0 11-3-3.46V6.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  const { theme } = useTheme();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const icons = el.querySelectorAll<HTMLElement>(".social-icon-btn");
    const cleanups: Array<() => void> = [];
    icons.forEach((btn) => {
      const onEnter = () =>
        gsap.to(btn, { scale: 1.2, duration: 0.4, ease: "back.out(3)" });
      const onLeave = () =>
        gsap.to(btn, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <footer ref={ref} className="px-6 md:px-[136px] pt-16 pb-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12">
        {/* Brand column */}
        <div className="flex flex-col gap-6 max-w-[380px]">
          {/* fix #2: plain <img> with explicit height so it never stretches */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={theme === "dark" ? "/assets/gomobile-darkmode.svg" : "/assets/gomobile-lightmode.svg"}
            alt="Go Mobile"
            width={100}
            height={22}
            className="h-4 md:h-5"
            priority
          />
          <p className="text-lg md:text-xl leading-[1.35] tracking-tight" style={{ color: "var(--muted)" }}>
            A single entry point into mobile marketing for businesses.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/gomobile.indonesia/" },
              { icon: <LinkedInIcon />, label: "LinkedIn", href: "https://www.linkedin.com/company/gomobileindonesia/" },
              { icon: <TikTokIcon />, label: "TikTok", href: "https://www.tiktok.com/@gomobileindo" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon-btn w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(184,184,184,0.1)",
                  color: "var(--fg)",
                  border: "1px solid var(--border)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation columns */}
        <div className="flex flex-wrap gap-12">
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="font-helvetica font-bold text-sm" style={{ color: "var(--fg)" }}>
                {col.heading}
              </p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-helvetica text-sm hover:opacity-70 transition"
                  style={{ color: "var(--muted)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p className="font-helvetica text-sm" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Go Mobile, Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
          ].map(({ label, href }) => (
            <Link key={label} href={href} className="font-helvetica text-sm hover:opacity-70 transition" style={{ color: "var(--muted)" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
