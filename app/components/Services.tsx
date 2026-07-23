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

const SERVICES = [
  {
    slug: "programmatic-display",
    thumb: "/assets/service-thumb-programmatic.png",
    title: "Programmatic Display",
    desc: "Reach your audience with precision across premium publisher networks display, native, and in-app placements powered by our GoNet DSP.",
    tags: ["DISPLAY", "NATIVE ADS", "IN-APP"],
  },
  {
    slug: "video-ctv-ott",
    thumb: "/assets/service-thumb-video.png",
    title: "Video, CTV & OTT",
    desc: "In-stream and out-stream video ads, Connected TV, and OTT placements. We put your brand where screens are — and where attention is.",
    tags: ["IN-STREAM", "CTV", "OTT"],
  },
  {
    slug: "rich-media-html5",
    thumb: "/assets/service-thumb-richmedia.png",
    title: "Rich Media & HTML5",
    desc: "Interactive, code-based ads that engage users across devices. We build gamified banners, expandables, and high-impact creative formats.",
    tags: ["EXPANDABLE", "GAMIFIED", "HTML5"],
  },
  {
    slug: "social-media",
    thumb: "/assets/service-thumb-social.png",
    title: "Social Media Buying",
    desc: "Strategic paid campaigns across Meta, TikTok, and LinkedIn — audience-first planning, creative A/B testing, and funnel-based optimization.",
    tags: ["META", "TIKTOK", "LINKEDIN"],
  },
];

const LOREM_SERVICES = [
  { slug: "programmatic-display", thumb: "/assets/service-thumb-programmatic.png",
    title: "Lorem Ipsum Display", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.", tags: ["LOREM", "IPSUM", "DOLOR"] },
  { slug: "video-ctv-ott", thumb: "/assets/service-thumb-video.png",
    title: "Dolor Sit & Amet", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis.", tags: ["LOREM", "AMET", "DOLOR"] },
  { slug: "rich-media-html5", thumb: "/assets/service-thumb-richmedia.png",
    title: "Consectetur Adipiscing", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur.", tags: ["LOREM", "ELIT", "IPSUM"] },
  { slug: "social-media", thumb: "/assets/service-thumb-social.png",
    title: "Sed Eiusmod Tempor", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", tags: ["LOREM", "IPSUM", "DOLOR"] },
];

export function Services() {
  const { isDemo } = useDemo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    addReveal(el, el.querySelectorAll(".services-header"), { duration: 1.3, y: 50 });
    addReveal(el, el.querySelectorAll(".service-card"),    { stagger: 0.14, duration: 1.3, y: 70, start: "top 85%" });
    addReveal(el, el.querySelectorAll(".services-cta"),    { duration: 1.1, y: 40, start: "top 92%" });

    const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(".service-card"));
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const img = card.querySelector("img");
      const overlay = card.querySelector(".card-overlay");
      const content = card.querySelector(".card-content");
      if (!img) return;

      gsap.set(img, { scale: 1.01 });
      const tl = gsap.timeline({ paused: true });
      tl.to(img, { scale: 1.07, duration: 0.6, ease: "power2.out" }, 0);
      if (overlay) tl.to(overlay, { opacity: 0.97, duration: 0.4 }, 0);
      if (content) tl.to(content, { y: -8, duration: 0.5, ease: "power2.out" }, 0);

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
        tl.kill();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section ref={ref} className="px-6 md:px-[136px] py-16 md:py-24">
      <div className="services-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            {isDemo ? 'LOREM IPSUM' : 'WHAT WE DO'}
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            {isDemo ? <>Lorem ipsum dolor<br />sit amet consectetur.</> : <>Full-cycle digital<br />advertising solutions.</>}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(isDemo ? LOREM_SERVICES : SERVICES).map((s) => (
          <Link key={s.title} href={`/solutions/${s.slug}`}>
          <article
            className="service-card relative rounded-[28px] overflow-hidden h-[420px] md:h-[516px] flex flex-col justify-end p-8"
          >
            <Image src={s.thumb} alt={s.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover will-change-transform" />
            <div className="card-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
            <div className="card-content relative z-10 max-w-[397px] flex flex-col gap-2.5">
              <h3 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight text-white">
                {s.title}
              </h3>
              <p className="text-sm leading-[1.25] text-[#c9c9c9]">{s.desc}</p>
              <div className="flex gap-1.5 flex-wrap mt-1">
                {s.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </article>
          </Link>
        ))}
      </div>

      <div className="services-cta flex justify-center mt-10">
        <Link href="/solutions">
          <MagneticButton className="btn-outline h-[63px] min-w-[300px] md:min-w-[467px]">
            <span>LEARN MORE</span>
            <Arrow />
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
