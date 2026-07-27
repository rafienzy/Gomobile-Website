"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 14 banner creatives
const BANNERS = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/assets/rmb-creative/banner_${i + 1}.mp4`,
}));

function PhoneCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="gallery-card relative w-full"
      style={{ aspectRatio: "645 / 1290" }}
    >
      {/* Phone frame — sits on top as overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/phone-frame.webp"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full select-none"
        style={{ zIndex: 2, pointerEvents: "none" }}
      />

      {/*
        Content area — the blank white space below the address bar and above
        the bottom nav bar. Banner is centered here at natural size;
        object-fit:contain scales it down if it's too tall, never crops it.

        Frame 645×1290:
          address bar bottom ≈ 120px  → 9.3%
          bottom nav top     ≈ 1190px → 92.2%
          left inner edge    ≈ 20px   → 3.1%
          usable width       ≈ 606px  → 93.8%
      */}
      <div
        className="absolute flex items-center justify-center overflow-hidden"
        style={{
          top: "17%",
          left: "10%",
          width: "80%",
          height: "70%",
          zIndex: 3,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Banner number badge */}
      <div
        className="absolute bottom-[9%] right-[7%] z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
        style={{ background: "rgba(239,102,0,0.85)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ── Main gallery component ── */
export function Html5Gallery() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll(".gallery-card");
    gsap.set(cards, { y: 50, opacity: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () =>
        gsap.to(cards, { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "power3.out", overwrite: true }),
      onLeave: () =>
        gsap.to(cards, { y: -35, opacity: 0, duration: 0.6, stagger: 0.04, ease: "power2.in", overwrite: true }),
      onEnterBack: () =>
        gsap.to(cards, { y: 0, opacity: 1, duration: 1.1, stagger: { each: 0.08, from: "end" }, ease: "power3.out", overwrite: true }),
      onLeaveBack: () =>
        gsap.to(cards, { y: 50, opacity: 0, duration: 0.6, stagger: { each: 0.04, from: "end" }, ease: "power2.in", overwrite: true }),
    });
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-[136px] py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            HTML5 AD GALLERY
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            Every format, built in-house.
          </h2>
        </div>
        <p className="max-w-[340px] text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
          Interactive previews of our most popular HTML5 ad formats. Every unit is built from scratch, no templates.
        </p>
      </div>

      {/* 3-column phone grid — centred, max width keeps cards a clean size */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-48 gap-y-20 mx-32">
        {BANNERS.map((b, i) => (
          <PhoneCard key={b.id} src={b.src} index={i} />
        ))}
      </div>

      {/* CTA footer */}
      <div
        className="mt-10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div>
          <p className="font-bold" style={{ color: "var(--fg)" }}>Need a custom format?</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            We scope and build bespoke HTML5 units for any brief. Typical turnaround: 4 working days.
          </p>
        </div>
        <a
          href="#contact"
          className="btn-outline whitespace-nowrap h-[46px] px-8 text-sm flex items-center gap-2"
        >
          Discuss your brief →
        </a>
      </div>
    </section>
  );
}
