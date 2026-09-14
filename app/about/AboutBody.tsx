"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { Icon } from "../components/Icon";
import type { TeamMember } from "@/lib/content/team";

const STATS = [
  { v: "9", s: "yrs", l: "In Operation" },
  { v: "2421", s: "", l: "Campaigns Launched" },
  { v: "120", s: "+", l: "Brand Partners" },
  { v: "24", s: "", l: "SSPs Connected" },
];

const VALUES = [
  {
    icon: "viewfinder",
    title: "Performance over promises",
    desc: "We don't ship pretty decks. We ship lift, and we report it the way a CFO wants to read it.",
  },
  {
    icon: "wrench",
    title: "Engineering-first thinking",
    desc: "Our DSP, our pipelines, our creative builds. We own the stack so you don't pay middlemen.",
  },
  {
    icon: "users",
    title: "Real partnership",
    desc: "Your media team gets a strategist, a trader, and a creative tech lead, not an account inbox.",
  },
];

/**
 * Square source art, cropped to a circle by `rounded-full` on the element.
 * Kept square so it stays reusable anywhere a square avatar is wanted; see
 * public/assets/team/avatar-placeholder.svg for the source and how to
 * re-export it.
 */
const AVATAR_PLACEHOLDER = "/assets/team/avatar-placeholder.png";

// The roster comes in as a prop, read from content/team.json by the page.
export function AboutBody({ team }: { team: TeamMember[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".about-stat"), { stagger: 0.1, duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".value-card"), { stagger: 0.12, duration: 1.2, y: 50 });
    addReveal(el, el.querySelectorAll(".timeline-item"), { stagger: 0.1, duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".team-card"), { stagger: 0.06, duration: 1, y: 30, start: "top 90%" });
    addReveal(el, el.querySelectorAll(".section-header"), { duration: 1.2, y: 40 });

    // Stat counters
    const statEls = el.querySelectorAll<HTMLElement>(".about-stat-value");
    const triggers: ScrollTrigger[] = [];
    statEls.forEach((node) => {
      const target = parseFloat(node.dataset.value || "0");
      const suffix = node.dataset.suffix || "";
      const obj = { val: 0 };
      const t = ScrollTrigger.create({
        trigger: node,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(obj, {
            val: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate() {
              node.textContent = Math.round(obj.val) + suffix;
            },
          }),
      });
      triggers.push(t);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={ref}>
      {/* Stats strip */}
      <section className="px-6 md:px-[136px] py-12 md:py-16">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-2 rounded-[28px] p-8 md:p-10"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          {STATS.map((s) => (
            <div key={s.l} className="about-stat flex flex-col items-start gap-2">
              <p
                className="about-stat-value font-bricolage font-extrabold text-5xl md:text-[64px] leading-none tracking-[-2.88px] text-gradient"
                data-value={s.v}
                data-suffix={s.s}
              >
                0{s.s}
              </p>
              <p className="text-sm md:text-base font-medium" style={{ color: "var(--muted)" }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-[136px] py-16 md:py-24">
        <div className="section-header flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight" style={{ color: "var(--fg)" }}>
              Three things we<br />never compromise on.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="value-card flex flex-col gap-5 p-10 rounded-[28px] min-h-[280px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <Icon name={v.icon} className="w-14 h-14 text-[#ef6600]" />
              <h3 className="font-bricolage font-bold text-2xl leading-[1.2] tracking-tight" style={{ color: "var(--fg)" }}>
                {v.title}
              </h3>
              <p className="text-sm md:text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-6 md:px-[136px] py-16 md:py-24">
        <div className="section-header mb-10">
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight" style={{ color: "var(--fg)" }}>
            Meet the team.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="team-card flex flex-col items-center gap-4 p-6 md:p-8 rounded-[28px] text-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              {/*
                Headshot when content/team.json supplies one, the shared
                silhouette placeholder otherwise. The placeholder is a real
                image rather than a styled div so both states go through the
                same element and land on the same pixel grid.

                Explicit 80x80 rather than fill: the circle is a fixed size,
                and fill makes the optimizer emit a srcSet all the way up to
                3840w for an avatar. object-cover so a non-square headshot is
                cropped instead of squashed.
              */}
              <Image
                src={m.photo ?? AVATAR_PLACEHOLDER}
                alt={m.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="font-bricolage font-bold text-base md:text-lg" style={{ color: "var(--fg)" }}>
                  {m.name}
                </p>
                <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted)" }}>
                  {m.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
