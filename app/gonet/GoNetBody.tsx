"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { useDemo } from "../context/DemoMode";
import { Icon } from "../components/Icon";

const STATS = [
  { num: 24,    suffix: "",    label: "SSPs via OpenRTB" },
  { num: 15,    suffix: "+",   label: "Ad Formats" },
  { num: 9,     suffix: "yrs", label: "In Operation" },
  { num: 98.7,  suffix: "%",   label: "Brand Safe Rate" },
  { num: 106.7, suffix: "%",   label: "KPI Achievement" },
];

const FEATURES = [
  {
    icon: "viewfinder",
    title: "AI Sensible Targeting",
    tag: "INTELLIGENCE",
    desc: "Full-page content analysis via computer vision. Real-time user profiling that adapts to intent and mood shifts — privacy-safe across WEB and IN-APP environments. No third-party cookie dependency.",
    bullets: ["Page-level contextual scoring", "Behavioural intent signals", "Mood & sentiment detection", "Privacy-safe by design"],
  },
  {
    icon: "shield",
    title: "Pre-bid Traffic Filter",
    tag: "BRAND SAFETY",
    desc: "Filters fraudulent impressions before they hit your budget. Every live bid is analysed against 3rd-party trackers and verification to protect brand safety goals — before the auction, not after.",
    bullets: ["IAS + DoubleVerify integration", "Invalid Traffic (IVT) rejection", "Content category blocking", "Seller verification via ads.txt"],
  },
  {
    icon: "bolt",
    title: "ML Price Optimiser",
    tag: "PERFORMANCE",
    desc: "Machine learning predicts optimal bid prices in real-time — maximising impression value while keeping CPMs efficient across every placement and format.",
    bullets: ["Bid price prediction per auction", "Win rate vs CPM trade-off model", "Placement-level value scoring", "Automatic floor optimisation"],
  },
  {
    icon: "chart-bar",
    title: "Reporting & Transparency",
    tag: "INSIGHTS",
    desc: "Full placement-level transparency. Every domain, every app, every placement — with real-time blocking capability and daily performance exports.",
    bullets: ["Domain + app-level reporting", "Real-time campaign dashboard", "Third-party tag compatibility", "Custom attribution windows"],
  },
  {
    icon: "link",
    title: "24 SSP Connections",
    tag: "SUPPLY",
    desc: "Direct OpenRTB integrations with 24 premium supply-side platforms across display, video, native, and in-app inventory. No daisy-chain reselling.",
    bullets: ["Xandr, Index, Magnite, Pubmatic", "OpenX, TripleLift, Sovrn", "In-app via IronSource, InMobi", "CTV via DistroScale, Beachfront"],
  },
  {
    icon: "device-mobile",
    title: "Cross-Environment",
    tag: "REACH",
    desc: "Unified buying across WEB, IN-APP, CTV, and OTT from a single DSP seat — with device-graph frequency capping to control reach across screens.",
    bullets: ["Desktop + mobile web", "iOS + Android in-app (MRAID)", "CTV via VAST/VPAID", "OTT pre-roll and mid-roll"],
  },
];

const LOREM_STATS = [
  { num: 24,    suffix: "",    label: "Lorem Ipsum" },
  { num: 15,    suffix: "+",   label: "Adipiscing Elit" },
  { num: 9,     suffix: "yrs", label: "Consectetur Inc" },
  { num: 98.7,  suffix: "%",   label: "Tempor Incididunt" },
  { num: 106.7, suffix: "%",   label: "Labore Et Dolore" },
];

const LOREM_FEATURES = [
  { icon: "viewfinder", title: "Lorem Ipsum Dolor", tag: "LOREM IPSUM", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.", bullets: ["Lorem ipsum dolor sit", "Adipiscing elit tempor", "Consectetur incididunt", "Sed do eiusmod labore"] },
  { icon: "shield", title: "Adipiscing Elit Sit", tag: "LOREM IPSUM", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.", bullets: ["Quis nostrud exercitation", "Ullamco laboris nisi", "Aliquip ex ea commodo", "Consequat duis aute"] },
  { icon: "bolt", title: "Consectetur Tempor", tag: "LOREM IPSUM", desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint.", bullets: ["Irure dolor reprehenderit", "Voluptate velit esse", "Cillum dolore fugiat", "Nulla pariatur excepteur"] },
  { icon: "chart-bar", title: "Incididunt Labore", tag: "LOREM IPSUM", desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem.", bullets: ["Occaecat cupidatat non", "Proident sunt in culpa", "Officia deserunt mollit", "Anim id est laborum"] },
  { icon: "link", title: "Dolore Magna Aliqua", tag: "LOREM IPSUM", desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.", bullets: ["Perspiciatis unde omnis", "Natus error sit amet", "Voluptatem accusantium", "Doloremque laudantium"] },
  { icon: "device-mobile", title: "Enim Ad Minim", tag: "LOREM IPSUM", desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.", bullets: ["Ipsam voluptatem quia", "Aspernatur aut odit", "Consequuntur magni", "Dolores eos ratione"] },
];

export function GoNetBody() {
  const { isDemo } = useDemo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    // ── Hero — scoped to ref so client-nav always starts clean ──
    const heroItems = el.querySelectorAll(".gn-hero > *");
    const heroTweens: gsap.core.Tween[] = [];
    if (heroItems.length) {
      gsap.set(heroItems, { y: 50, opacity: 0 });
      heroTweens.push(
        gsap.to(heroItems, {
          y: 0, opacity: 1, stagger: 0.12, duration: 1,
          ease: "power3.out", delay: 0.1, overwrite: true,
        })
      );
    }

    // Stat counters
    const statEls = el.querySelectorAll<HTMLElement>(".gn-stat-value");
    const triggers: ScrollTrigger[] = [];
    statEls.forEach((node) => {
      const target = parseFloat(node.dataset.value || "0");
      const suffix = node.dataset.suffix || "";
      const obj = { val: 0 };
      const t = ScrollTrigger.create({
        trigger: node, start: "top 88%", once: true,
        onEnter: () => gsap.to(obj, {
          val: target, duration: 1.8, ease: "power2.out",
          onUpdate() {
            node.textContent = (Number.isInteger(target) ? Math.round(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        }),
      });
      triggers.push(t);
    });

    addReveal(el, el.querySelectorAll(".gn-stat"),    { stagger: 0.09, duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".gn-feature"), { stagger: 0.1,  duration: 1.2, y: 50, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".gn-section"), { duration: 1.2, y: 40 });
    addReveal(el, el.querySelectorAll(".gn-spec"),    { stagger: 0.05, duration: 0.9, y: 30, start: "top 90%" });
    addReveal(el, el.querySelectorAll(".gn-ssp"),     { stagger: 0.05, duration: 0.8, y: 20, start: "top 90%" });

    return () => {
      heroTweens.forEach((t) => t.kill());
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section
        className="relative px-6 md:px-[136px] pt-[160px] md:pt-[240px] pb-20 md:pb-32 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(239,102,0,0.1), transparent 70%)" }}
        />
        <div className="gn-hero relative flex flex-col items-start gap-6 max-w-[800px]">
          <div className="flex items-center gap-3">
            <span className="chip">IN-HOUSE DSP</span>
            <span className="text-xs font-bold tracking-[6px] uppercase" style={{ color: "var(--muted)" }}>Est. 2018</span>
          </div>
          <h1 className="font-bricolage font-bold leading-none tracking-[-5px]" style={{ fontSize: "clamp(72px, 12vw, 140px)", color: "var(--fg)" }}>
            {isDemo ? <><span className="text-gradient">LOREM</span>IPSUM</> : <><span className="text-gradient">GO</span>NET</>}
          </h1>
          <p className="text-lg md:text-2xl leading-[1.5] max-w-[640px]" style={{ color: "var(--muted)" }}>
            {isDemo ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, no third-party cookies required.' : 'Our independent real-time bidding platform for APP & WEB traffic — connecting to 24 SSPs with AI-powered targeting and built-in brand safety, no third-party cookies required.'}
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            {(isDemo ? ["Lorem Ipsum", "Dolor Sit", "Consectetur", "Adipiscing Elit", "Sed Do Eiusmod"] : ["OpenRTB 2.5+", "24 SSPs", "AI Targeting", "Pre-bid Safety", "ML Optimisation"]).map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 md:px-[136px] pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {(isDemo ? LOREM_STATS : STATS).map((s) => (
            <div key={s.label} className="gn-stat flex flex-col gap-2 p-6 rounded-[20px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p
                className="gn-stat-value font-bricolage font-extrabold text-4xl leading-none tracking-[-2px] text-gradient"
                data-value={s.num}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="gn-section flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>{isDemo ? 'LOREM IPSUM' : 'PLATFORM CAPABILITIES'}</p>
            <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
              {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : <>What GoNet does<br />that others can't.</>}
            </h2>
          </div>
          <p className="max-w-[360px] text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
            Built from the ground up for SEA inventory — no resold third-party DSP seats, no black-box fees.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {(isDemo ? LOREM_FEATURES : FEATURES).map((f) => (
            <div key={f.title} className="gn-feature flex flex-col gap-5 p-10 rounded-[28px] min-h-[360px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}>
                  <Icon name={f.icon} className="w-7 h-7 text-[#ef6600]" />
                </div>
                <span className="text-[10px] font-bold tracking-[2px] px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(239,102,0,0.12)", color: "#ef6600" }}>
                  {f.tag}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bricolage font-bold text-2xl tracking-tight" style={{ color: "var(--fg)" }}>{f.title}</h3>
                <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </div>
              <ul className="flex flex-col gap-2 mt-auto">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "var(--fg)" }}>
                    <span className="text-gradient mt-0.5 shrink-0">→</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── SSP Partners ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="gn-section mb-10">
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>{isDemo ? 'LOREM IPSUM' : 'SUPPLY PARTNERS'}</p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : '24 SSPs, direct OpenRTB.'}
          </h2>
        </div>
        <p className="gn-section max-w-[820px] text-lg md:text-xl leading-[1.6]" style={{ color: "var(--muted)" }}>
          {isDemo
            ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip.'
            : 'GoNet plugs directly into 24 premium supply-side platforms over OpenRTB — including Xandr, Index Exchange, Magnite, PubMatic, OpenX, TripleLift, Sovrn, and Sharethrough, with in-app inventory via InMobi and IronSource and CTV supply through DistroScale and Beachfront. Every integration is direct: no daisy-chain reselling, no resold DSP seats.'}
        </p>
      </section>

      {/* ── How it connects ── */}
      <section className="px-6 md:px-[136px] py-10 md:py-16">
        <div className="gn-section mb-10">
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>{isDemo ? 'LOREM IPSUM' : 'HOW IT WORKS'}</p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            {isDemo ? <>Lorem ipsum dolor<br />sit amet.</> : 'Bid to impression in <80ms.'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {(isDemo ? [
            { num: "01", title: "Lorem Ipsum",    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
            { num: "02", title: "Dolor Sit Amet", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo." },
            { num: "03", title: "Consectetur",    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla." },
            { num: "04", title: "Adipiscing Elit",desc: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim." },
          ] : [
            { num: "01", title: "Bid Request",    desc: "Publisher sends a bid request via OpenRTB 2.5+. GoNet receives up to 2.4B requests daily." },
            { num: "02", title: "Pre-bid Filter", desc: "Request evaluated for brand safety, fraud signals, and audience match before entering the auction." },
            { num: "03", title: "AI Bid Decision",desc: "ML model scores the impression opportunity and submits a calculated optimal bid price in real-time." },
            { num: "04", title: "Ad Served",      desc: "If bid wins, the creative is returned and rendered. Impression logged, attribution pixel fires." },
          ]).map((step) => (
            <div key={step.num} className="gn-feature flex flex-col gap-4 p-8 rounded-[24px]"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <p className="font-bricolage font-extrabold text-5xl leading-none tracking-[-2px] text-gradient">{step.num}</p>
              <div className="flex flex-col gap-2">
                <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>{step.title}</h3>
                <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
