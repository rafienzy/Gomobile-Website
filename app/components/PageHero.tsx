"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PageHeroProps {
  title: React.ReactNode;
  lede?: string;
}

export function PageHero({ title, lede }: PageHeroProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".ph-title", { y: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".ph-lede", { y: 30, opacity: 0, duration: 0.9, delay: 0.25, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative pt-[160px] md:pt-[240px] pb-12 md:pb-20 px-6 md:px-[150px]"
    >
      <h1
        className="ph-title font-bricolage font-semibold text-5xl md:text-[80px] leading-none tracking-[-2.88px] max-w-[900px]"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h1>
      {lede && (
        <p
          className="ph-lede mt-8 max-w-[640px] font-nunitoSans text-base md:text-lg leading-[1.5]"
          style={{ color: "var(--muted)" }}
        >
          {lede}
        </p>
      )}
    </section>
  );
}
