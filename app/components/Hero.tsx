"use client";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";
import Link from "next/link";

const STATS = [
  { value: "2400+", label: "TOTAL CAMPAIGN\nLAUNCHED" },
  { value: "24",    label: "SSPS VIA\nOPENRTB" },
  { value: "106.7%",label: "AVG DELIVERY\nACCURACY" },
];

function Accolade({ logo, alt, rank, label, w }: { logo: string; alt: string; rank: string; label: string; w: number }) {
  return (
    <div className="flex flex-col gap-3 items-start">
      <Image src={logo} alt={alt} width={w} height={20} className="h-5 w-auto" style={{ width: "auto" }} />
      <div className="flex gap-1 items-center" style={{ color: "var(--fg)" }}>
        <span className="font-bricolage text-xl">{rank}</span>
        <span className="font-bricolage font-light text-[12px] leading-none whitespace-pre-line">{label}</span>
      </div>
    </div>
  );
}

export function Hero() {
  const { theme } = useTheme();
  const mode = theme === "dark" ? "darkmode" : "lightmode";
  const heroRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedIdx, setDisplayedIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mobile card refs
  const valueRef  = useRef<HTMLDivElement>(null);
  const labelRef  = useRef<HTMLDivElement>(null);
  // Desktop card refs
  const valueRef2 = useRef<HTMLDivElement>(null);
  const labelRef2 = useRef<HTMLDivElement>(null);

  const nextIdxRef = useRef<number>(0);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line",  { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out" });
      gsap.from(".hero-stat",  { y: 30, opacity: 0, stagger: 0.1,  duration: 0.8, delay: 0.4, ease: "power2.out" });
      gsap.from(".hero-card",  { y: 40, opacity: 0, duration: 1,   delay: 0.3,   ease: "power3.out" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const runTransition = (nextIdx: number) => {
    const vals = [valueRef.current, valueRef2.current].filter(Boolean) as HTMLElement[];
    const lbls = [labelRef.current, labelRef2.current].filter(Boolean) as HTMLElement[];
    if (vals.length === 0) return;

    setIsAnimating(true);
    nextIdxRef.current = nextIdx;
    setActiveIdx(nextIdx);

    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayedIdx(nextIdxRef.current);
        gsap.set([...vals, ...lbls], { y: 40, opacity: 0 });
        gsap.to(vals, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
        gsap.to(lbls, {
          y: 0, opacity: 1, duration: 0.55, delay: 0.07, ease: "power3.out",
          onComplete: () => setIsAnimating(false),
        });
      },
    });
    tl.to(vals, { y: -36, opacity: 0, duration: 0.3, ease: "power2.in" }, 0);
    tl.to(lbls, { y: -36, opacity: 0, duration: 0.3, ease: "power2.in" }, 0.04);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((cur) => {
        const next = (cur + 1) % STATS.length;
        runTransition(next);
        return cur;
      });
    }, 3000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stat = STATS[displayedIdx];

  return (
    <section ref={heroRef} className="relative pt-[100px] md:pt-[180px] lg:pt-[294px] pb-24 px-6 md:px-[150px]">

      {/* ── Mobile layout (< lg) ── */}
      <div className="flex flex-col items-center gap-7 lg:hidden">

        {/* Title */}
        <h1
          className="font-bricolage font-semibold text-[40px] leading-none tracking-[-2px] text-center w-full"
          style={{ color: "var(--fg)" }}
        >
          <span className="hero-line block">Your Ads.</span>
          <span className="hero-line block">The Right People.</span>
          <span className="hero-line block">
            Real <span className="text-gradient-animated">Growth</span>.
          </span>
        </h1>

        {/* Stats card */}
        <div
          className="hero-card rounded-[28px] p-[28px_32px] h-[194px] w-full max-w-[344px] flex flex-col justify-between overflow-hidden relative"
          style={{
            background: "var(--card)",
            border: "7px solid var(--border)",
            backdropFilter: "blur(9px)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-[28px]"
            style={{ background: "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(239,102,0,0.12), transparent 70%)" }}
          />
          <div ref={valueRef} className="relative">
            <p className="font-bricolage font-extrabold text-[72px] leading-none tracking-[-2.88px] text-gradient-animated">
              {stat.value}
            </p>
          </div>
          <div ref={labelRef} className="relative text-center">
            <p className="font-bricolage font-bold text-lg leading-[1.25] tracking-tight" style={{ color: "var(--fg)" }}>
              {stat.label.split("\n").map((l, i) => (
                <span key={i} className="block">{l}</span>
              ))}
            </p>
          </div>
        </div>

        {/* Description + CTA */}
        <div className="flex flex-col gap-4 items-center text-center w-full max-w-[344px]">
          <p className="font-nunitoSans text-sm leading-[1.5] tracking-tight" style={{ color: "var(--fg)" }}>
            We are digital marketing agency that specializes in performance buying and programmatic advertising.
            We help brands reach their audience across every screen, and prove that it worked.
          </p>
          <Link href="/case-study">
            <MagneticButton className="btn-primary w-fit h-[48px]">
              <span>SEE OUR WORK</span>
              <Arrow />
            </MagneticButton>
          </Link>
        </div>

        {/* Accolades — 2×2 grid with cross dividers */}
        <div className="relative grid grid-cols-2 w-full max-w-[344px] mt-1">
          <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "var(--border)" }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px"  style={{ background: "var(--border)" }} />
          <div className="hero-stat p-5"><Accolade logo={`/assets/clutch-${mode}.svg`}  alt="Clutch"  w={74} rank="#1" label={"Media Buying &\nPlanning Agencies"} /></div>
          <div className="hero-stat p-5"><Accolade logo={`/assets/iab-${mode}.svg`}     alt="IAB"     w={42} rank="#1" label={"Performance\nEcosystem"} /></div>
          <div className="hero-stat p-5"><Accolade logo={`/assets/adindex-${mode}.svg`} alt="AdIndex" w={90} rank="#1" label={"Agency |\neCommerce Index"} /></div>
          <div className="hero-stat p-5"><Accolade logo={`/assets/mma-${mode}.svg`}     alt="MMA"     w={90} rank=""   label={"Top 10 Indonesia\nDigital/Specialist Agencies"} /></div>
        </div>
      </div>

      {/* ── Desktop layout (≥ lg) ── */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_444px] gap-10 items-start">

        {/* Left */}
        <div className="flex flex-col justify-between min-h-[569px] max-w-[676px]">
          <h1 className="font-bricolage font-semibold text-[80px] leading-none tracking-[-2.88px]" style={{ color: "var(--fg)" }}>
            <span className="hero-line block">Your Ads.</span>
            <span className="hero-line block">The Right People.</span>
            <span className="hero-line block">
              Real <span className="text-gradient-animated">Growth</span>.
            </span>
          </h1>

          <div className="flex flex-wrap gap-5 items-center mt-10">
            <div className="hero-stat">
              <Accolade logo={`/assets/clutch-${mode}.svg`} alt="Clutch" w={74} rank="#1" label={"Media Buying &\nPlanning Agencies"} />
            </div>
            <div className="w-px h-24 hero-stat" style={{ background: "var(--border)" }} />
            <div className="hero-stat">
              <Accolade logo={`/assets/iab-${mode}.svg`} alt="IAB" w={42} rank="#1" label={"Performance\nEcosystem"} />
            </div>
            <div className="w-px h-24 hero-stat" style={{ background: "var(--border)" }} />
            <div className="hero-stat">
              <Accolade logo={`/assets/adindex-${mode}.svg`} alt="AdIndex" w={90} rank="#1" label={"Agency |\neCommerce Index"} />
            </div>
            <div className="w-px h-24 hero-stat" style={{ background: "var(--border)" }} />
            <div className="hero-stat">
              <Accolade logo={`/assets/mma-${mode}.svg`} alt="MMA" w={90} rank="" label={"Top 10 Indonesia\nDigital/Specialist Agencies"} />
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-[69px]">
          <div
            className="hero-card rounded-[28px] p-[47px_59px_43px] h-[344px] flex flex-col justify-between overflow-hidden relative"
            style={{
              background: "var(--card)",
              border: "7px solid var(--border)",
              backdropFilter: "blur(9px)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{ background: "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(239,102,0,0.12), transparent 70%)" }}
            />
            <div ref={valueRef2} className="relative">
              <p className="font-bricolage font-extrabold text-[78px] md:text-[98px] leading-none tracking-[-2.88px] text-gradient-animated">
                {stat.value}
              </p>
            </div>
            <div ref={labelRef2} className="relative flex flex-col gap-4">
              <p className="font-bricolage font-bold text-xl md:text-2xl leading-[1.25] tracking-tight" style={{ color: "var(--fg)" }}>
                {stat.label.split("\n").map((l, i) => (
                  <span key={i} className="block">{l}</span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[22px]">
            <p className="font-nunitoSans text-base leading-[1.5] tracking-tight" style={{ color: "var(--fg)" }}>
              We are digital marketing agency that specializes in performance buying and programmatic advertising.
              We help brands reach their audience across every screen, and prove that it worked.
            </p>
            <Link href="/case-study">
              <MagneticButton className="btn-primary w-fit h-[52px]">
                <span>SEE OUR WORK</span>
                <Arrow />
              </MagneticButton>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.75 9h10.5M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
