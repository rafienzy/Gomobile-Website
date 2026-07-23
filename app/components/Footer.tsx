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

function ThreadsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.322.145 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" fill="currentColor" />
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
              { icon: <ThreadsIcon />, label: "Threads", href: "https://www.threads.com/@gomobile.indonesia" },
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
