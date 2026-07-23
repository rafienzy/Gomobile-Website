"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { useDemo } from "../context/DemoMode";
import { Icon } from "../components/Icon";

const SOLUTIONS = [
  {
    slug: "programmatic-display",
    thumb: "/assets/service-thumb-programmatic.png",
    eyebrow: "01 — PROGRAMMATIC",
    title: "Programmatic Display",
    desc: "Reach the right person at the right moment across premium publisher inventory. Display, native, and in-app — powered by our GoNet DSP and 24 SSP integrations.",
    features: ["Real-time bidding via OpenRTB", "AI-driven audience profiling", "Brand-safe inventory only", "WEB + IN-APP coverage"],
    tags: ["DISPLAY", "NATIVE", "IN-APP"],
  },
  {
    slug: "video-ctv-ott",
    thumb: "/assets/service-thumb-video.png",
    eyebrow: "02 — VIDEO",
    title: "Video, CTV & OTT",
    desc: "In-stream, out-stream, Connected TV, and OTT placements. We put your brand where the screens are — and where the attention is.",
    features: ["Pre-roll, mid-roll, out-stream", "CTV across major OEMs", "OTT premium publishers", "VPAID + VAST 4.0 support"],
    tags: ["IN-STREAM", "CTV", "OTT"],
  },
  {
    slug: "rich-media-html5",
    thumb: "/assets/service-thumb-richmedia.png",
    eyebrow: "03 — CREATIVE",
    title: "Rich Media & HTML5",
    desc: "Interactive, code-based ads built in-house. Gamified banners, expandables, scratch-to-reveal, and high-impact creative formats engineered for engagement.",
    features: ["Custom HTML5 builds", "Gamified mechanics", "Expandable & interscroller", "Cross-device responsive"],
    tags: ["HTML5", "GAMIFIED", "EXPANDABLE"],
  },
  {
    slug: "social-media",
    thumb: "/assets/service-thumb-social.png",
    eyebrow: "04 — SOCIAL",
    title: "Social Media Buying",
    desc: "Strategic paid campaigns across Meta, TikTok, and LinkedIn. Audience-first planning, creative A/B testing, and funnel-based optimization end-to-end.",
    features: ["Meta + TikTok + LinkedIn", "Creative A/B at scale", "Full-funnel reporting", "Pixel + CAPI implementation"],
    tags: ["META", "TIKTOK", "LINKEDIN"],
  },
];

const ADDONS = [
  { icon: "chart-bar", title: "Analytics & Attribution", desc: "MMM, MTA, and incrementality testing — we measure what actually drove the lift." },
  { icon: "beaker", title: "Creative Testing", desc: "Rapid creative iteration cycles tied to performance data, not opinions." },
  { icon: "search", title: "Audience Research", desc: "First-party data strategy, segmentation, and lookalike modeling." },
  { icon: "shield", title: "Brand Safety & Verification", desc: "IAS, DV, and MOAT integration on every placement, every campaign." },
  { icon: "signal", title: "Data Clean Rooms", desc: "Privacy-safe activation across LiveRamp, AWS, and Google PAIR." },
  { icon: "film", title: "Production Support", desc: "Storyboard to delivery — video and static creative produced in-house." },
];

const LOREM_SOLUTIONS = [
  { slug: "programmatic-display", thumb: "/assets/service-thumb-programmatic.png", eyebrow: "01 — LOREM IPSUM", title: "Lorem Ipsum Dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim.", features: ["Lorem ipsum dolor sit", "Adipiscing elit tempor", "Consectetur incididunt ut", "Sed do eiusmod labore"], tags: ["DISPLAY", "NATIVE", "IN-APP"] },
  { slug: "video-ctv-ott", thumb: "/assets/service-thumb-video.png", eyebrow: "02 — LOREM IPSUM", title: "Adipiscing Elit Sit", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.", features: ["Quis nostrud exercitation", "Ullamco laboris nisi", "Aliquip ex ea commodo", "Consequat duis aute irure"], tags: ["IN-STREAM", "CTV", "OTT"] },
  { slug: "rich-media-html5", thumb: "/assets/service-thumb-richmedia.png", eyebrow: "03 — LOREM IPSUM", title: "Consectetur Tempor", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint.", features: ["Irure dolor reprehenderit", "Voluptate velit esse", "Cillum dolore fugiat nulla", "Pariatur excepteur sint"], tags: ["HTML5", "GAMIFIED", "EXPANDABLE"] },
  { slug: "social-media", thumb: "/assets/service-thumb-social.png", eyebrow: "04 — LOREM IPSUM", title: "Incididunt Ut Labore", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem.", features: ["Occaecat cupidatat non", "Proident sunt in culpa", "Officia deserunt mollit", "Anim id est laborum"], tags: ["META", "TIKTOK", "LINKEDIN"] },
];

const LOREM_ADDONS = [
  { icon: "chart-bar", title: "Lorem Ipsum Dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — sed do eiusmod tempor." },
  { icon: "beaker", title: "Adipiscing Elit Sit", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi." },
  { icon: "search", title: "Consectetur Tempor", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore." },
  { icon: "shield", title: "Sed Do Eiusmod", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia." },
  { icon: "signal", title: "Incididunt Labore", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium." },
  { icon: "film", title: "Dolore Magna Aliqua", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit." },
];

export function SolutionsBody() {
  const { isDemo } = useDemo();
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
        {(isDemo ? LOREM_SOLUTIONS : SOLUTIONS).map((s, i) => {
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
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
              {isDemo ? 'LOREM IPSUM' : 'CAPABILITIES'}
            </p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : <>Everything else you<br />might need.</>}
            </h2>
          </div>
          <p className="max-w-[340px] text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
            {isDemo ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.' : 'We back every campaign with the strategy, data, and creative production it takes to perform.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {(isDemo ? LOREM_ADDONS : ADDONS).map((a) => (
            <div
              key={a.title}
              className="addon-card flex flex-col gap-4 p-8 rounded-[28px] min-h-[220px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}
              >
                <Icon name={a.icon} className="w-6 h-6 text-[#ef6600]" />
              </div>
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
