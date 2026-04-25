"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { addReveal } from "../utils/scrollReveal";

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    // Glow fades in once and stays
    gsap.from(el.querySelectorAll(".cta-glow"), {
      scale: 0.5,
      opacity: 0,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });

    // Text items get full bidirectional reveal
    addReveal(el, el.querySelectorAll(".cta-item"), {
      stagger: 0.15,
      duration: 1.3,
      y: 60,
      start: "top 82%",
    });

    const dots = el.querySelectorAll(".cta-dot");
    const dotTween = gsap.to(dots, {
      y: -5,
      duration: 2.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.15, from: "random" },
    });

    return () => {
      dotTween.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden mx-6 md:mx-[136px] my-20 md:my-32 rounded-[40px] px-8 md:px-20 py-16 md:py-28 flex flex-col items-center text-center"
      style={{ background: "rgba(184,184,184,0.06)", border: "1px solid rgba(239,102,0,0.15)" }}
    >
      {/* Ambient glow */}
      <div
        className="cta-glow absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,102,0,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="cta-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(239,102,0,0.5), transparent)" }}
      />

      <p className="cta-item font-helvetica font-bold text-xs tracking-[9px] mb-4" style={{ color: "#ef6600" }}>
        LET&apos;S BUILD TOGETHER
      </p>

      <h2
        className="cta-item font-bricolage font-bold text-4xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-[-2.5px] max-w-3xl mb-6"
        style={{ color: "var(--fg)" }}
      >
        Ready to reach the right people?
      </h2>

      <p
        className="cta-item font-nunitoSans text-base md:text-lg leading-[1.6] max-w-xl mb-10"
        style={{ color: "var(--muted)" }}
      >
        Tell us about your next campaign. We&apos;ll handle the strategy, the buying, and the proof it worked.
      </p>

      <div className="cta-item flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto">
        <Link href="/contact" className="w-full sm:w-auto">
          <MagneticButton className="btn-primary h-[60px] px-10 text-[15px] whitespace-nowrap w-full sm:w-auto">
            GET IN TOUCH
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3.75 9h10.5M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
        </Link>
        <Link href="/case-study" className="w-full sm:w-auto">
          <MagneticButton className="btn-outline h-[60px] px-10 text-[15px] whitespace-nowrap w-full sm:w-auto">
            SEE OUR WORK
          </MagneticButton>
        </Link>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-8 right-10 opacity-20 hidden md:block">
        <DotGrid />
      </div>
      <div className="absolute bottom-8 left-10 opacity-20 hidden md:block rotate-180">
        <DotGrid />
      </div>
    </section>
  );
}

function DotGrid() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            className="cta-dot"
            cx={col * 20 + 10}
            cy={row * 20 + 10}
            r="2"
            fill="#ef6600"
          />
        ))
      )}
    </svg>
  );
}
