"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";

/**
 * Placeholder for /blog while the journal is unwritten.
 *
 * Deliberately makes no promise it cannot keep: no signup field (there is no
 * backend to receive one) and no invented article titles. It describes the
 * three kinds of writing planned, in the same words the blog lede already
 * used, and points at the case studies, which are live and are the thing a
 * visitor who wanted the blog is most likely to want next.
 */
const STRANDS = [
  {
    num: "01",
    title: "Working theories",
    desc: "What we believe about buying media in this region, and the evidence that got us there.",
  },
  {
    num: "02",
    title: "Post-mortems",
    desc: "Campaigns that missed, what the data actually said, and what we changed afterwards.",
  },
  {
    num: "03",
    title: "Field notes",
    desc: "The small things that only show up when you are in the auction every single day.",
  },
];

export function ComingSoon() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".cs-rule"),   { duration: 0.9, y: 20, start: "top 92%" });
    addReveal(el, el.querySelectorAll(".cs-strand"), { stagger: 0.12, duration: 1, y: 36, start: "top 90%" });
    addReveal(el, el.querySelectorAll(".cs-foot"),   { duration: 1, y: 28, start: "top 94%" });
  }, []);

  return (
    <div ref={ref} className="px-6 md:px-[150px] pb-20 md:pb-32">
      {/* Editorial rule: label left, status right */}
      <div
        className="cs-rule flex items-baseline justify-between gap-6 pt-6 mb-12 md:mb-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span
          className="font-helvetica font-bold text-[10px] md:text-[11px] tracking-[3px] uppercase"
          style={{ color: "var(--muted)" }}
        >
          What we are writing
        </span>
        <span
          className="font-helvetica font-bold text-[10px] md:text-[11px] tracking-[3px] uppercase whitespace-nowrap"
          style={{ color: "#ef6600" }}
        >
          In progress
        </span>
      </div>

      {/* The three strands. A single column with real spacing, not a card grid. */}
      <div className="flex flex-col gap-12 md:gap-16 max-w-[760px]">
        {STRANDS.map((s) => (
          <div key={s.num} className="cs-strand flex gap-6 md:gap-10">
            <span
              className="font-bricolage font-extrabold text-sm shrink-0 pt-1.5"
              style={{ color: "#ef6600" }}
            >
              {s.num}
            </span>
            <div className="flex flex-col gap-2.5">
              <h2
                className="font-bricolage font-bold text-2xl md:text-4xl leading-[1.1] tracking-tight"
                style={{ color: "var(--fg)" }}
              >
                {s.title}
              </h2>
              <p
                className="font-nunitoSans text-[15px] md:text-lg leading-[1.6] max-w-[560px]"
                style={{ color: "var(--muted)" }}
              >
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Send them somewhere that actually exists */}
      <div
        className="cs-foot mt-16 md:mt-24 pt-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:justify-between"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <p
          className="font-nunitoSans text-[15px] md:text-base leading-[1.6] max-w-[420px]"
          style={{ color: "var(--muted)" }}
        >
          Nothing published yet. The case studies are live, and they show the same thinking with the numbers attached.
        </p>
        <Link
          href="/case-study"
          className="btn-outline whitespace-nowrap h-[52px] px-8 text-sm self-start sm:self-auto"
        >
          Read the work →
        </Link>
      </div>
    </div>
  );
}
