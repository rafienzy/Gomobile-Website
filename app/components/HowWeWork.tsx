"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { useDemo } from "../context/DemoMode";

const STEPS = [
  {
    num: "01",
    title: "Brief & Discovery",
    desc: "We understand your goals, audience, and current state. Define KPIs, budget, and what success actually looks like.",
  },
  {
    num: "02",
    title: "Strategy & Planning",
    desc: "Channel mix, targeting strategy, creative direction, and budget allocation, built for your category and audience.",
  },
  {
    num: "03",
    title: "Campaign Activation",
    desc: "Setup, trafficking, creative production, and go-live. From DSP configuration to the first impression served.",
  },
  {
    num: "04",
    title: "Optimize & Report",
    desc: "Real-time data, continuous bid and creative optimization, and transparent performance reports. We prove it worked.",
  },
];

const LOREM_STEPS = [
  { num: "01", title: "Lorem & Ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { num: "02", title: "Dolor Sit Amet", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute." },
  { num: "03", title: "Consectetur Adipiscing", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur sint occaecat." },
  { num: "04", title: "Sed Eiusmod Tempor", desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem." },
];

export function HowWeWork() {
  const { isDemo } = useDemo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    // Header: simple one-time entrance — never hides
    gsap.fromTo(
      el.querySelector(".hww-header"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      }
    );

    const mm = gsap.matchMedia();

    /* ── DESKTOP — pinned, scrubbed, fully reversible ── */
    mm.add("(min-width: 1024px)", () => {
      const cards    = Array.from(el.querySelectorAll<HTMLElement>(".step-card"));
      const dots     = Array.from(el.querySelectorAll<HTMLElement>(".hww-dot"));
      const segments = Array.from(el.querySelectorAll<HTMLElement>(".hww-seg"));

      gsap.set(cards,    { opacity: 0, y: 56 });
      gsap.set(dots,     { opacity: 0, scale: 0.3 });
      gsap.set(segments, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3.5,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Step 1 — dot + card
      tl.to(dots[0],  { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 0)
        .to(cards[0], { opacity: 1, y: 0,     duration: 0.6, ease: "power2.out"  }, 0);

      // Steps 2 → 4 — segment draw → dot pop → card rise
      for (let i = 1; i < cards.length; i++) {
        tl.to(segments[i - 1], { scaleX: 1, duration: 0.5, ease: "none"          }, ">")
          .to(dots[i],          { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, ">-0.05")
          .to(cards[i],         { opacity: 1, y: 0,     duration: 0.6, ease: "power2.out"  }, ">-0.1");
      }
    });

    /* ── MOBILE — simple stagger, no pin ── */
    mm.add("(max-width: 1023px)", () => {
      addReveal(el, el.querySelectorAll(".step-card"), {
        stagger: 0.16,
        duration: 1.4,
        y: 70,
        start: "top 85%",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="flex flex-col px-6 md:px-[136px]"
      style={{ minHeight: "100vh", paddingTop: "clamp(60px, 8vh, 100px)", paddingBottom: "clamp(40px, 6vh, 80px)" }}
    >
      {/* Header — always visible throughout the pin */}
      <div className="hww-header flex flex-col md:flex-row md:items-end gap-4 mb-10 md:mb-14">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            {isDemo ? 'LOREM IPSUM' : 'HOW WE WORK'}
          </p>
          <h2
            className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2"
            style={{ color: "var(--fg)" }}
          >
            {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : <>Four steps from brief<br />to results.</>}
          </h2>
        </div>
      </div>

      {/* Connector + cards stage */}
      <div className="relative flex-1 flex flex-col justify-center">

        {/* Dots & segments row (desktop only) */}
        <div className="hidden lg:block relative h-10 mb-8">

          {/* 3 segments between dots */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="hww-seg absolute top-1/2 -translate-y-1/2 h-[2px]"
              style={{
                left:  `${12.5 + i * 25}%`,
                width: "25%",
                background: "linear-gradient(90deg, #ef6600, #cb0000)",
              }}
            />
          ))}

          {/* 4 dots — centered above each column */}
          {(isDemo ? LOREM_STEPS : STEPS).map((_, i) => (
            <div
              key={i}
              className="hww-dot absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                left:       `${12.5 + i * 25}%`,
                background: "var(--bg)",
                border:     "2px solid #ef6600",
                boxShadow:  "0 0 10px rgba(239,102,0,0.45)",
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
              />
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {(isDemo ? LOREM_STEPS : STEPS).map((s) => (
            <div
              key={s.num}
              className="step-card flex flex-col gap-8 px-5 md:px-[21px] py-10 md:py-[39px] rounded-[28px]"
              style={{
                background: "var(--card)",
                border:     "1px solid var(--border)",
                minHeight:  "clamp(240px, 28vh, 340px)",
              }}
            >
              <p className="font-bricolage font-extrabold text-[64px] md:text-[72px] leading-none tracking-[-2.88px] text-gradient">
                {s.num}
              </p>
              <div className="flex flex-col gap-2">
                <h3
                  className="font-bricolage font-bold text-xl md:text-2xl leading-[1.25] tracking-tight"
                  style={{ color: "var(--fg)" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm md:text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
