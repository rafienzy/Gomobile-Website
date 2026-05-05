"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../../utils/scrollReveal";
import { Service, SERVICES } from "../data";
import type { CaseStudy } from "@/lib/models/case-study";
import { Html5Gallery } from "./Html5Gallery";
import { useDemo } from "../../context/DemoMode";

const LOREM_SERVICE: Service = {
  slug: "programmatic-display",
  eyebrow: "01 — LOREM IPSUM",
  title: "Lorem Ipsum Dolor",
  thumb: "/assets/service-thumb-programmatic.png",
  heroDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing — display, native, and in-app.",
  longDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  tags: ["LOREM", "IPSUM", "DOLOR", "SIT", "AMET"],
  stats: [
    { v: "24",    l: "Lorem Ipsum" },
    { v: "2.4B+", l: "Dolor Sit Amet" },
    { v: "98.7%", l: "Consectetur Rate" },
    { v: "106%",  l: "Avg Adipiscing" },
  ],
  features: [
    { icon: "🎯", title: "Lorem Ipsum Dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna." },
    { icon: "🛡️", title: "Adipiscing Elit Sit", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { icon: "⚡", title: "Consectetur Tempor", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { icon: "📊", title: "Incididunt Labore", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est." },
  ],
  process: [
    { num: "01", title: "Lorem Ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore." },
    { num: "02", title: "Dolor Sit Amet", desc: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo." },
    { num: "03", title: "Consectetur", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla." },
    { num: "04", title: "Adipiscing Elit", desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim." },
  ],
  relatedCases: [],
};

export function ServiceDetail({ data, relatedCases = [], relatedCasesSlot }: { data: Service; relatedCases?: CaseStudy[]; relatedCasesSlot?: React.ReactNode }) {
  const { isDemo } = useDemo();
  const d = isDemo ? LOREM_SERVICE : data;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    // ── Hero — scoped selectors + explicit set→to so client-nav always starts clean ──
    const heroImg   = el.querySelector(".svc-hero-img");
    const heroItems = el.querySelectorAll(".svc-hero-content > *");
    const heroTweens: gsap.core.Tween[] = [];

    if (heroImg) {
      heroTweens.push(
        gsap.fromTo(heroImg,
          { scale: 1.08 },
          { scale: 1, duration: 1.4, ease: "power3.out", overwrite: true }
        )
      );
    }
    if (heroItems.length) {
      gsap.set(heroItems, { y: 50, opacity: 0 });
      heroTweens.push(
        gsap.to(heroItems, {
          y: 0, opacity: 1, stagger: 0.12, duration: 1,
          ease: "power3.out", delay: 0.2, overwrite: true,
        })
      );
    }

    addReveal(el, el.querySelectorAll(".svc-stat"),     { stagger: 0.1,  duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".svc-feature"),  { stagger: 0.1,  duration: 1.2, y: 50, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".svc-step"),     { stagger: 0.12, duration: 1.2, y: 50, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".svc-section"),  { stagger: 0,    duration: 1.2, y: 40 });
    addReveal(el, el.querySelectorAll(".svc-case"),     { stagger: 0.12, duration: 1.2, y: 60, start: "top 88%" });

    return () => { heroTweens.forEach((t) => t.kill()); };
  }, []);

  const related = isDemo ? [] : relatedCases;
  const nextService = SERVICES[(SERVICES.findIndex((s) => s.slug === data.slug) + 1) % SERVICES.length];
  const nextSvc = isDemo ? { ...nextService, title: "Lorem Ipsum Dolor", eyebrow: "02 — LOREM IPSUM" } : nextService;

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <Image src={d.thumb} alt={d.title} fill sizes="100vw" className="svc-hero-img object-cover scale-[1.01]" priority />
        {/* Strong gradient so text stays readable at all scroll positions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
        <div className="svc-hero-content absolute inset-0 flex flex-col justify-end px-6 md:px-[136px] pb-14 md:pb-24">
          <div className="flex gap-2 flex-wrap mb-4">
            {d.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <p className="font-helvetica font-bold text-xs tracking-[9px] mb-3" style={{ color: "#ef6600" }}>{d.eyebrow}</p>
          <h1 className="font-bricolage font-bold text-4xl md:text-[72px] leading-none tracking-[-2px] text-white max-w-[800px]">
            {d.title}
          </h1>
          <p className="text-base md:text-xl text-white mt-4 max-w-[640px] leading-[1.5]" style={{ opacity: 0.88 }}>{d.heroDesc}</p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 md:px-[136px] py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {d.stats.map((s) => (
            <div key={s.l} className="svc-stat flex flex-col gap-2 p-7 md:p-9 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="font-bricolage font-extrabold text-4xl md:text-5xl leading-none tracking-[-2px] text-gradient">{s.v}</p>
              <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Long description ── */}
      <section className="px-6 md:px-[136px] pb-10">
        <div className="svc-section grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>OVERVIEW</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-3" style={{ color: "var(--fg)" }}>
              What this service actually delivers.
            </h2>
            {d.slug === "programmatic-display" && (
              <Link
                href="/ad-formats-demo"
                className="btn-outline inline-flex items-center gap-2 mt-6 text-sm px-5 py-3 rounded-full"
              >
                <span>Preview Ad Formats</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )}
          </div>
          <p className="text-base md:text-lg leading-[1.7]" style={{ color: "var(--muted)" }}>{d.longDesc}</p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="svc-section flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>CAPABILITIES</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              What's under the hood.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {d.features.map((f) => (
            <div key={f.title} className="svc-feature flex flex-col gap-4 p-8 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl"
                style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}>
                {f.icon}
              </div>
              <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>{f.title}</h3>
              <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HTML5 Gallery (Rich Media only) ── */}
      {d.html5Gallery && d.html5Gallery.length > 0 && (
        <Html5Gallery />
      )}

      {/* ── Process ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="svc-section flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>HOW IT WORKS</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              From brief to live.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {d.process.map((p) => (
            <div key={p.num} className="svc-step flex flex-col gap-6 p-8 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="font-bricolage font-extrabold text-[64px] leading-none tracking-[-2px] text-gradient">{p.num}</p>
              <div className="flex flex-col gap-2">
                <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>{p.title}</h3>
                <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related cases (slot takes priority; falls back to prop) ── */}
      {relatedCasesSlot ?? (related.length > 0 && (
        <section className="px-6 md:px-[136px] py-10 md:py-16">
          <div className="svc-section mb-10">
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>CASE STUDIES</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              See it in action.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((c) => (
              <Link key={c.slug} href={`/case-study/${c.slug}`}>
                <article className="svc-case group relative rounded-[24px] overflow-hidden h-[280px]">
                  <Image src={c.img} alt={c.brand} fill sizes="33vw" className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.07]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="flex gap-1.5 mb-2 flex-wrap">
                      {c.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                    </div>
                    <h3 className="font-bricolage font-bold text-xl text-white">{c.brand}</h3>
                    <p className="text-xs text-white/70 mt-1 leading-[1.5]">{c.headline}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* ── Next service ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <p className="font-helvetica font-bold text-xs tracking-[9px] mb-6" style={{ color: "#ef6600" }}>NEXT SERVICE</p>
        <Link href={`/solutions/${nextSvc.slug}`}>
          <article className="svc-case group relative rounded-[28px] overflow-hidden h-[220px] md:h-[280px]">
            <Image src={nextSvc.thumb} alt={nextSvc.title} fill sizes="100vw"
              className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-xs font-bold tracking-[6px] text-white/60 uppercase mb-2">{nextSvc.eyebrow}</p>
              <h3 className="font-bricolage font-bold text-2xl md:text-4xl text-white tracking-tight">{nextSvc.title}</h3>
            </div>
          </article>
        </Link>
      </section>
    </div>
  );
}
