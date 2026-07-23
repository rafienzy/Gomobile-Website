"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { useDemo } from "../context/DemoMode";

const STATS = [
  { v: "9", s: "yrs", l: "In Operation" },
  { v: "2400", s: "+", l: "Campaigns Launched" },
  { v: "120", s: "+", l: "Brand Partners" },
  { v: "24", s: "", l: "SSPs Connected" },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Performance over promises",
    desc: "We don't ship pretty decks. We ship lift, and we report it the way a CFO wants to read it.",
  },
  {
    icon: "🔬",
    title: "Engineering-first thinking",
    desc: "Our DSP, our pipelines, our creative builds — we own the stack so you don't pay middlemen.",
  },
  {
    icon: "🤝",
    title: "Real partnership",
    desc: "Your media team gets a strategist, a trader, and a creative tech lead — not an account inbox.",
  },
];

const LOREM_STATS = [
  { v: "9", s: "yrs", l: "Lorem Ipsum" },
  { v: "2400", s: "+", l: "Adipiscing Elit" },
  { v: "120", s: "+", l: "Consectetur Inc" },
  { v: "24", s: "", l: "Sed Do Eiusmod" },
];

const LOREM_VALUES = [
  { icon: "🎯", title: "Lorem ipsum dolor sit", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna." },
  { icon: "🔬", title: "Adipiscing elit tempor", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { icon: "🤝", title: "Consectetur incididunt", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
];

const TEAM = [
  { name: "Vinasia", role: "Finance", initials: "VI" },
  { name: "Gian Luis Wizny", role: "General Affairs", initials: "GW" },
  { name: "Rafi Abdillah", role: "Graphic Designer", initials: "RA" },
  { name: "Reiza Bhatara Bachri", role: "Business Development", initials: "RB" },
  { name: "Daniil Pisarenko", role: "Country Manager", initials: "DP" },
  { name: "Jessica Pauli", role: "Director of Client Services and Operations", initials: "JP" },
  { name: "Sangganing Pangasa", role: "Media Buyer", initials: "SP" },
  { name: "Cindy Sintya Riris", role: "Account Manager", initials: "CR" },
  { name: "Figo Maulana Said", role: "Communication Manager", initials: "FS" },
];

const LOREM_TEAM = [
  { name: "Lorem Ipsum", role: "Lorem Dolor", initials: "LI" },
  { name: "Dolor Sit", role: "Amet Consectetur", initials: "DS" },
  { name: "Adipiscing Elit", role: "Sed Eiusmod", initials: "AE" },
  { name: "Tempor Incididunt", role: "Ut Labore", initials: "TI" },
  { name: "Dolore Magna", role: "Aliqua Enim", initials: "DM" },
  { name: "Quis Nostrud", role: "Exercitation", initials: "QN" },
  { name: "Ullamco Laboris", role: "Nisi Aliquip", initials: "UL" },
  { name: "Commodo Consequat", role: "Duis Aute", initials: "CC" },
  { name: "Irure Dolor", role: "In Reprehenderit", initials: "ID" },
];

export function AboutBody() {
  const { isDemo } = useDemo();
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
          {(isDemo ? LOREM_STATS : STATS).map((s) => (
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
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
              {isDemo ? 'LOREM IPSUM' : 'WHAT WE BELIEVE'}
            </p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : <>Three things we<br />never compromise on.</>}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {(isDemo ? LOREM_VALUES : VALUES).map((v) => (
            <div
              key={v.title}
              className="value-card flex flex-col gap-5 p-10 rounded-[28px] min-h-[280px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}
              >
                {v.icon}
              </div>
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
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            {isDemo ? 'LOREM IPSUM' : 'THE PEOPLE'}
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            {isDemo ? <>Lorem ipsum<br />adipiscing elit.</> : 'Meet the team.'}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(isDemo ? LOREM_TEAM : TEAM).map((m) => (
            <div
              key={m.name}
              className="team-card flex flex-col items-center gap-4 p-6 md:p-8 rounded-[28px] text-center"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bricolage font-bold text-white"
                style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
              >
                {m.initials}
              </div>
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
