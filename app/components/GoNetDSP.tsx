"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Arrow } from "./Hero";
import { MagneticButton } from "./MagneticButton";
import { addReveal } from "../utils/scrollReveal";
import { Icon } from "./Icon";

const STATS = [
  { value: "24", label: "SSPs via OpenRTB", num: 24, suffix: "" },
  { value: "15+", label: "Ad Formats", num: 15, suffix: "+" },
  { value: "9yrs", label: "In Operation", num: 9, suffix: "yrs" },
];

const FEATURES = [
  {
    title: "AI Sensible Targeting",
    desc: "Full-page content analysis via computer vision. Real-time user profiling that adapts to intent and mood shifts — privacy-safe across WEB and IN-APP environments.",
  },
  {
    title: "Pre-bid Traffic Filter",
    desc: "Filters fraudulent impressions before they hit your budget. Every live bid is analyzed against 3rd-party trackers and verification to protect brand safety goals.",
  },
  {
    title: "ML Price Optimizer",
    desc: "Machine learning predicts optimal bid prices in real-time — maximizing impression value while keeping CPMs efficient across every placement and format.",
  },
];

export function GoNetDSP() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    addReveal(el, el.querySelectorAll(".gonet-header"), { stagger: 0, duration: 1.3, y: 60 });
    addReveal(el, el.querySelectorAll(".gonet-stat"),   { stagger: 0.14, duration: 1.2, y: 40, start: "top 85%" });
    addReveal(el, el.querySelectorAll(".gonet-card"),   { stagger: 0.16, duration: 1.3, y: 70, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".gonet-cta"),    { stagger: 0,    duration: 1.1, y: 40, start: "top 90%" });

    const statEls = el.querySelectorAll<HTMLElement>(".gonet-stat-value");
    const triggers: ScrollTrigger[] = [];
    statEls.forEach((node) => {
      const target = parseFloat(node.dataset.value || "0");
      const suffix = node.dataset.suffix || "";
      const obj = { val: 0 };
      const t = ScrollTrigger.create({
        trigger: node,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() {
              node.textContent = Math.round(obj.val) + suffix;
            },
          });
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-[136px] py-20 md:py-32">
      {/* Header row */}
      <div className="gonet-header flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
        <div className="flex flex-col gap-2">
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            OUR IN-HOUSE DSP
          </p>
          <h2
            className="font-bricolage font-bold text-[56px] md:text-[70px] leading-none tracking-[-5px]"
            style={{ color: "var(--fg)" }}
          >
            <span className="text-gradient">GO</span>NET
          </h2>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between md:justify-start gap-3 md:gap-10">
          {STATS.map((s, i) => (
            <div key={s.label} className="gonet-stat flex items-center gap-3 md:gap-10 min-w-0">
              <div className="text-left md:text-right min-w-0">
                <p
                  className="gonet-stat-value font-bricolage font-extrabold text-[32px] md:text-[64px] leading-none tracking-[-1.5px] md:tracking-[-2.88px] text-gradient"
                  data-value={s.num}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </p>
                <p className="font-bricolage font-medium text-[11px] md:text-base mt-1 tracking-tight leading-tight" style={{ color: "var(--fg)" }}>
                  {s.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <div className="w-px h-10 md:h-16 shrink-0" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards — fix #1: use CSS vars so light mode is readable */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-10">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="gonet-card glass-card flex flex-col gap-6 p-10 md:p-[42px] min-h-[380px] justify-between"
            style={{
              borderRadius: "28px",
            }}
          >
            {/* Icon bubble */}
            <div
              className="w-[72px] h-[72px] rounded-full flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}
            >
              <Icon name={i === 0 ? "viewfinder" : i === 1 ? "shield" : "bolt"} className="w-8 h-8 text-[#ef6600]" />
            </div>
            <div className="flex flex-col gap-3">
              {/* fix #1: var(--fg) instead of hardcoded text-white */}
              <h3
                className="font-helvetica font-bold text-2xl md:text-[28px] leading-[1.2] tracking-tight"
                style={{ color: "var(--fg)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm md:text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="gonet-cta flex justify-center">
        <Link href="/gonet">
          <MagneticButton className="btn-outline h-[63px] min-w-[300px] md:min-w-[420px]">
            <span>LEARN MORE ABOUT GONET</span>
            <Arrow />
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
