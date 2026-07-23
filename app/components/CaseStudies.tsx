"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./Hero";
import { MagneticButton } from "./MagneticButton";
import { addReveal } from "../utils/scrollReveal";
import { useDemo } from "../context/DemoMode";

const LOREM_DESC =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const CASES = [
  { img: "/assets/featured-case-1.png", title: "Singapore Airlines", slug: "singapore-airlines", desc: "Premium video drove a 38% lift in flight searches across SEA.", tags: ["CTV", "VIDEO"] },
  { img: "/assets/featured-case-2.png", title: "Indofood",           slug: "indofood",           desc: "Gamified rich media outperformed display CTR by 6× across in-app inventory.", tags: ["RICH MEDIA", "GAMIFIED"] },
  { img: "/assets/featured-case-3.png", title: "Bank Jago",          slug: "bank-jago",          desc: "Always-on programmatic delivered a 22% lower CAC than social-only baselines.", tags: ["PROGRAMMATIC", "NATIVE"] },
];
const LOREM_CASES_HOME = [
  { img: "/assets/featured-case-1.png", title: "Lorem Ipsum Corp",       slug: "singapore-airlines", desc: LOREM_DESC, tags: ["LOREM", "IPSUM"] },
  { img: "/assets/featured-case-2.png", title: "Adipiscing Elit Ltd",     slug: "indofood",           desc: LOREM_DESC, tags: ["DOLOR", "SIT"] },
  { img: "/assets/featured-case-3.png", title: "Consectetur Inc",         slug: "bank-jago",          desc: LOREM_DESC, tags: ["AMET", "ELIT"] },
];

export function CaseStudies() {
  const { isDemo } = useDemo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    addReveal(el, el.querySelectorAll(".cases-header"), { duration: 1.3, y: 50 });
    addReveal(el, el.querySelectorAll(".cases-cta"),    { duration: 1.1, y: 40, start: "top 92%" });

    const cards = el.querySelectorAll<HTMLElement>(".case-card");
    gsap.set(cards, {
      transformPerspective: 800,
      transformOrigin: "center top",
      rotateX: 8,
      y: 80,
      opacity: 0,
    });

    const triggers: ScrollTrigger[] = [];
    cards.forEach((card, i) => {
      const t = ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        onEnter: () => {
          gsap.to(card, {
            rotateX: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: i * 0.06,
            ease: "power3.out",
            onComplete: () => gsap.set(card, { clearProps: "transform" }),
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            rotateX: 8,
            y: 80,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          });
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-[136px] py-16 md:py-24">
      <div className="cases-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            {isDemo ? 'LOREM IPSUM' : 'CASE STUDIES'}
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : <>Campaigns that<br />moved the numbers.</>}
          </h2>
        </div>
        <p className="max-w-[317px] text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
          {isDemo ? LOREM_DESC : 'Real briefs, real budgets, real results. See how we turned campaign goals into numbers worth talking about.'}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {(isDemo ? LOREM_CASES_HOME : CASES).map((c) => (
          <Link key={c.title} href={`/case-study/${c.slug}`}>
          <article className="case-card relative rounded-[28px] overflow-hidden h-[320px] md:h-[391px]">
            <Image src={c.img} alt={c.title} fill sizes="100vw" className="object-cover scale-[1.01]" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 max-w-[680px]">
              <h3 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-white">
                {c.title}
              </h3>
              <p className="text-sm md:text-base text-white/90 mt-3 leading-[1.5]">{c.desc}</p>
              <div className="flex gap-1.5 mt-4">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full px-4 py-1 text-xs font-normal text-white bg-brand-gradient">{t}</span>
                ))}
              </div>
            </div>
          </article>
          </Link>
        ))}
      </div>

      <div className="cases-cta flex justify-center mt-10">
        <Link href="/case-study">
          <MagneticButton className="btn-outline h-[63px] min-w-[300px] md:min-w-[467px]">
            <span>LEARN MORE</span>
            <Arrow />
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
