"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../../utils/scrollReveal";
import type { CaseStudy } from "@/lib/models/case-study";
import { useDemo } from "../../context/DemoMode";

const LOREM_CASE: CaseStudy = {
  slug: "lorem-ipsum",
  brand: "Lorem Ipsum Corp",
  category: "Lorem",
  headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  img: "/assets/featured-case-1.png",
  period: "Q3 2025 · 12 weeks",
  tags: ["LOREM", "IPSUM", "DOLOR"],
  metrics: [
    { v: "+38%", l: "Lorem Ipsum",    desc: "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore." },
    { v: "2.4×", l: "Dolor Sit",      desc: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi." },
    { v: "12M",  l: "Amet Consect",   desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
    { v: "92%",  l: "Adipiscing VCR", desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia." },
  ],
  overview: {
    challenge: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.",
    solution: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa.",
    result: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
  },
  keyTakeaway: "Lorem ipsum dolor sit amet consectetur.",
  approach: [
    { title: "Lorem Ipsum Architecture", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim veniam." },
    { title: "Dolor Sit Amet Sequencing", desc: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor." },
    { title: "Consectetur Media Mix", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat." },
    { title: "Adipiscing Brand Safety", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor." },
  ],
  channels: ["Lorem", "Ipsum", "Dolor", "Sit Amet"],
  testimonial: {
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, and the results backed it up.",
    name: "Lorem Ipsum",
    role: "Head of Lorem, Dolor Sit Corp",
  },
  status: 'published' as const,
};

export function CaseStudyDetail({ data, nextCase }: { data: CaseStudy; nextCase?: CaseStudy | null }) {
  const { isDemo } = useDemo();
  const d = isDemo ? LOREM_CASE : data;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    // ── Hero — scoped selectors + fromTo so client-nav always starts clean ──
    const heroImg   = el.querySelector(".cs-hero-img");
    const heroItems = el.querySelectorAll(".cs-hero-content > *");
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

    addReveal(el, el.querySelectorAll(".cs-metric"),   { stagger: 0.1,  duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".cs-section"),  { stagger: 0.12, duration: 1.2, y: 50 });
    addReveal(el, el.querySelectorAll(".cs-approach"), { stagger: 0.12, duration: 1.2, y: 50, start: "top 88%" });

    // Metric counters
    const metricEls = el.querySelectorAll<HTMLElement>(".cs-metric-value");
    const triggers: ScrollTrigger[] = [];
    metricEls.forEach((node) => {
      const raw    = node.dataset.raw || "";
      const num    = parseFloat(raw.replace(/[^0-9.]/g, ""));
      if (isNaN(num)) return;
      const prefix = raw.match(/^[^0-9]*/)?.[0] || "";
      const suffix = raw.match(/[^0-9.]+$/)?.[0] || "";
      const obj    = { val: 0 };
      const t = ScrollTrigger.create({
        trigger: node, start: "top 88%", once: true,
        onEnter: () =>
          gsap.to(obj, {
            val: num, duration: 1.8, ease: "power2.out",
            onUpdate() {
              node.textContent = prefix + (Number.isInteger(num) ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
            },
          }),
      });
      triggers.push(t);
    });

    return () => {
      heroTweens.forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const next = isDemo && nextCase
    ? { ...nextCase, brand: "Lorem Ipsum Corp", headline: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.", tags: nextCase.tags }
    : nextCase ?? null;

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <Image
          src={d.img}
          alt={d.brand}
          fill
          sizes="100vw"
          className="cs-hero-img object-cover scale-[1.01]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
        <div className="cs-hero-content absolute inset-0 flex flex-col justify-end px-6 md:px-[136px] pb-14 md:pb-24">
          <div className="flex gap-2 flex-wrap mb-4">
            {d.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <h1 className="font-bricolage font-bold text-4xl md:text-[64px] leading-none tracking-[-2px] text-white max-w-[900px]">
            {d.brand}
          </h1>
          <p className="text-base md:text-xl text-white mt-3 max-w-[700px] leading-[1.5]" style={{ opacity: 0.88 }}>
            {d.headline}
          </p>
          <p className="text-sm text-white/50 mt-4 font-helvetica tracking-[2px] uppercase">{d.period}</p>
        </div>
      </section>

      {/* ── Metrics strip ── */}
      <section className="px-6 md:px-[136px] py-14 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {d.metrics.map((m) => (
            <div
              key={m.l}
              className="cs-metric flex flex-col gap-3 p-7 md:p-9 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p
                className="cs-metric-value font-bricolage font-extrabold text-4xl md:text-5xl leading-none tracking-[-2px] text-gradient"
                data-raw={m.v}
              >
                {m.v}
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--fg)" }}>{m.l}</p>
                <p className="text-xs mt-1 leading-[1.5]" style={{ color: "var(--muted)" }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { label: "CHALLENGE", text: d.overview.challenge },
            { label: "SOLUTION",  text: d.overview.solution },
            { label: "RESULT",    text: d.overview.result },
          ].map((o) => (
            <div
              key={o.label}
              className="cs-section flex flex-col gap-4 p-8 md:p-10 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <p className="font-helvetica font-bold text-xs tracking-[6px]" style={{ color: "#ef6600" }}>{o.label}</p>
              <p className="text-sm md:text-base leading-[1.65]" style={{ color: "var(--muted)" }}>{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Campaign snapshot — shown instead of Approach when present ── */}
      {d.campaignSnapshot?.length ? (
        <section className="px-6 md:px-[136px] py-10 md:py-16">
          <div className="cs-section mb-10">
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>CAMPAIGN SNAPSHOT</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              How it was built.
            </h2>
          </div>
          <div
            className="cs-approach rounded-[24px] overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <dl className="divide-y" style={{ borderColor: "var(--border)" }}>
              {d.campaignSnapshot.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 px-8 md:px-10 py-5 md:py-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  <dt
                    className="font-helvetica font-bold text-[11px] tracking-[2px] uppercase shrink-0 sm:w-[180px]"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.label}
                  </dt>
                  <dd className="text-base md:text-lg font-medium" style={{ color: "var(--fg)" }}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : d.approach.length ? (
        /* ── Approach ── */
        <section className="px-6 md:px-[136px] py-10 md:py-16">
          <div className="cs-section mb-10">
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
              {d.approachHeading?.eyebrow ?? "OUR APPROACH"}
            </p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              {d.approachHeading?.title ?? "How we executed it."}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {d.approach.map((a, i) => (
              <div
                key={a.title}
                className="cs-approach flex flex-col gap-4 p-8 md:p-10 rounded-[24px]"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-bricolage font-bold text-lg md:text-xl tracking-tight" style={{ color: "var(--fg)" }}>
                    {a.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-[1.65]" style={{ color: "var(--muted)" }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Channels ── */}
      <section className="px-6 md:px-[136px] py-10">
        <div
          className="cs-section flex flex-wrap items-center gap-4 p-8 md:p-10 rounded-[24px]"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <p className="font-helvetica font-bold text-xs tracking-[6px] mr-4" style={{ color: "#ef6600" }}>CHANNELS USED</p>
          {d.channels.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      {d.testimonial && (
        <section className="px-6 md:px-[136px] py-10 md:py-16">
          <div
            className="cs-section relative rounded-[28px] p-10 md:p-16 overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid rgba(239,102,0,0.2)" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,102,0,0.07), transparent 70%)" }}
            />
            <p className="text-5xl text-gradient mb-6 leading-none">"</p>
            <p className="font-bricolage font-semibold text-xl md:text-2xl leading-[1.4] max-w-[720px]" style={{ color: "var(--fg)" }}>
              {d.testimonial.quote}
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
              >
                {d.testimonial.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "var(--fg)" }}>{d.testimonial.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{d.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Next case ── */}
      {next && (
        <section className="px-6 md:px-[136px] py-10 md:py-16">
          <p className="font-helvetica font-bold text-xs tracking-[9px] mb-6" style={{ color: "#ef6600" }}>NEXT CASE STUDY</p>
          <Link href={`/case-study/${next.slug}`}>
            <article className="cs-section group relative rounded-[28px] overflow-hidden h-[280px] md:h-[360px]">
              <Image src={next.img} alt={next.brand} fill sizes="100vw" className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <div className="flex gap-2 mb-3">
                  {next.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <h3 className="font-bricolage font-bold text-2xl md:text-4xl text-white tracking-tight">{next.brand}</h3>
                <p className="text-sm text-white/80 mt-2 max-w-[600px]">{next.headline}</p>
              </div>
            </article>
          </Link>
        </section>
      )}
    </div>
  );
}
