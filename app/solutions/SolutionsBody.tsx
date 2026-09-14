"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { Icon } from "../components/Icon";

const SOLUTIONS = [
  {
    slug: "programmatic-display",
    thumb: "/assets/service-thumb-programmatic.webp",
    eyebrow: "01 · PROGRAMMATIC",
    title: "Programmatic Display",
    desc: "Reach the right person at the right moment across premium publisher inventory. Display, native, and in-app, powered by our GoNet DSP and 24 SSP integrations.",
    features: ["Real-time bidding via OpenRTB", "AI-driven audience profiling", "Brand-safe inventory only", "WEB + IN-APP coverage"],
    tags: ["DISPLAY", "NATIVE", "IN-APP"],
  },
  {
    slug: "video-ctv-ott",
    thumb: "/assets/service-thumb-video.webp",
    eyebrow: "02 · VIDEO",
    title: "Video, CTV & OTT",
    desc: "In-stream, out-stream, Connected TV, and OTT placements. We put your brand where the screens are, and where the attention is.",
    features: ["Pre-roll, mid-roll, out-stream", "CTV across major OEMs", "OTT premium publishers", "VPAID + VAST 4.0 support"],
    tags: ["IN-STREAM", "CTV", "OTT"],
  },
  {
    slug: "rich-media-html5",
    thumb: "/assets/service-thumb-richmedia.webp",
    eyebrow: "03 · CREATIVE",
    title: "Rich Media & HTML5",
    desc: "Interactive, code-based ads built in-house. Gamified banners, expandables, scratch-to-reveal, and high-impact creative formats engineered for engagement.",
    features: ["Custom HTML5 builds", "Gamified mechanics", "Expandable & interscroller", "Cross-device responsive"],
    tags: ["HTML5", "GAMIFIED", "EXPANDABLE"],
  },
  {
    slug: "social-media",
    thumb: "/assets/service-thumb-social.webp",
    eyebrow: "04 · SOCIAL",
    title: "Social Media Buying",
    desc: "Strategic paid campaigns across Meta, TikTok, and LinkedIn. Audience-first planning, creative A/B testing, and funnel-based optimization end-to-end.",
    features: ["Meta + TikTok + LinkedIn", "Creative A/B at scale", "Full-funnel reporting", "Pixel + CAPI implementation"],
    tags: ["META", "TIKTOK", "LINKEDIN"],
  },
];

const ADDONS = [
  { icon: "chart-bar", title: "Analytics & Attribution", desc: "MMM, MTA, and incrementality testing. We measure what actually drove the lift." },
  { icon: "beaker", title: "Creative Testing", desc: "Rapid creative iteration cycles tied to performance data, not opinions." },
  { icon: "search", title: "Audience Research", desc: "First-party data strategy, segmentation, and lookalike modeling." },
  { icon: "shield", title: "Brand Safety & Verification", desc: "IAS, DV, and MOAT integration on every placement, every campaign." },
  { icon: "signal", title: "Data Clean Rooms", desc: "Privacy-safe activation across LiveRamp, AWS, and Google PAIR." },
  { icon: "film", title: "Production Support", desc: "Storyboard to delivery: video and static creative produced in-house." },
];

export function SolutionsBody() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".sol-row"), { stagger: 0.12, duration: 1.3, y: 60, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".addons-header"), { duration: 1.2, y: 40 });
    addReveal(el, el.querySelectorAll(".addon-card"), { stagger: 0.1, duration: 1.1, y: 50, start: "top 88%" });
  }, []);

  return (
    <div ref={ref}>
      {/* Big alternating solution rows */}
      <section className="px-6 md:px-[136px] py-10 md:py-16 flex flex-col gap-20 md:gap-28">
        {SOLUTIONS.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={s.title}
              className={`sol-row grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center`}
            >
              <Link href={`/solutions/${s.slug}`} className={`relative rounded-[28px] overflow-hidden h-[320px] md:h-[460px] block ${reverse ? "lg:order-2" : ""}`}>
                <Image src={s.thumb} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover scale-[1.01] transition-transform duration-700 hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex gap-1.5 flex-wrap">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </Link>
              <div className="flex flex-col gap-5">
                {/* Kept while the section eyebrows were dropped: this one is
                    wayfinding, numbering the service against the others. */}
                <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
                  {s.eyebrow}
                </p>
                <h2 className="font-bricolage font-bold text-3xl md:text-5xl leading-[1.05] tracking-tight" style={{ color: "var(--fg)" }}>
                  {s.title}
                </h2>
                <p className="text-base md:text-lg leading-[1.55]" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--fg)" }}>
                      <span className="text-gradient mt-0.5">→</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* Add-on capabilities */}
      <section className="px-6 md:px-[136px] py-20 md:py-32">
        <div className="addons-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight" style={{ color: "var(--fg)" }}>
              Everything else you<br />might need.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {ADDONS.map((a) => (
            <div
              key={a.title}
              className="addon-card flex flex-col gap-4 p-8 rounded-[28px] min-h-[220px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <Icon name={a.icon} className="w-12 h-12 text-[#ef6600]" />
              <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>
                {a.title}
              </h3>
              <p className="text-sm leading-[1.5]" style={{ color: "var(--muted)" }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
