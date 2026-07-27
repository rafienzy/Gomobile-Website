"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 14 banner creatives
const BANNERS = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  src: `/assets/rmb-creative/banner_${i + 1}.mp4`,
}));

/**
 * The track renders every banner twice. Once the drift passes the halfway
 * point we subtract exactly half the scroll width, and because the second
 * half is identical to the first the correction is invisible: the strip
 * reads as an endless loop without ever hitting a dead end.
 */
const TRACK = [...BANNERS, ...BANNERS];

const DRIFT_PX_PER_SEC = 26;   // slow enough to read a banner, fast enough to notice
const RESUME_DELAY_MS  = 2800; // how long the drift stays out of the way after a nudge

function PhoneCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="gallery-card relative shrink-0 w-[168px] sm:w-[190px] md:w-[210px]"
      style={{ aspectRatio: "645 / 1290" }}
    >
      {/* Phone frame — sits on top as overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/phone-frame.webp"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 w-full h-full select-none"
        style={{ zIndex: 2, pointerEvents: "none" }}
      />

      {/*
        Content area — the blank white space below the address bar and above
        the bottom nav bar. Banner is centered here at natural size;
        object-fit:contain scales it down if it's too tall, never crops it.
      */}
      <div
        className="absolute flex items-center justify-center overflow-hidden"
        style={{
          top: "17%",
          left: "10%",
          width: "80%",
          height: "70%",
          zIndex: 3,
        }}
      >
        {/*
          No autoPlay: an IntersectionObserver in the parent starts each clip
          as it scrolls into the strip and pauses it on the way out, so only
          the handful on screen ever decode. preload="none" keeps the other
          two dozen off the network until they are actually needed.
        */}
        <video
          muted
          loop
          playsInline
          preload="none"
          className="rmb-video"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* Banner number badge */}
      <div
        className="absolute bottom-[9%] right-[7%] z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
        style={{ background: "rgba(239,102,0,0.85)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ── Main gallery component ── */
export function Html5Gallery() {
  const ref         = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Drift state lives in refs so the rAF loop never re-subscribes.
  const hoverRef      = useRef(false);
  const nudgeUntilRef = useRef(0);

  // Two thumbs, a full rail apart, so the pill can wrap without ever jumping.
  // Written to directly rather than through state: the scroll handler fires
  // every frame while the strip drifts, and re-rendering all 28 cards that
  // often just to move a pill would be wasteful.
  const thumbARef = useRef<HTMLDivElement>(null);
  const thumbBRef = useRef<HTMLDivElement>(null);

  const [paused, setPaused] = useState(false);

  /* Section reveal */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const strip = el.querySelector(".gallery-strip");
    if (!strip) return;
    gsap.set(strip, { y: 40, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () =>
        gsap.to(strip, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", overwrite: true }),
    });
    return () => st.kill();
  }, []);

  /* Play only the clips that are actually on screen */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { root: scroller, rootMargin: "0px 240px", threshold: 0 },
    );
    scroller.querySelectorAll<HTMLVideoElement>(".rmb-video").forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  /* Continuous drift, yielded to the user on hover or on any manual scroll */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let last = performance.now();
    let raf  = 0;

    const step = (now: number) => {
      const dt = Math.min(now - last, 64); // clamp so a backgrounded tab doesn't lurch
      last = now;

      const idle = !hoverRef.current && now >= nudgeUntilRef.current;
      if (idle) {
        const half = scroller.scrollWidth / 2;
        let next = scroller.scrollLeft + (DRIFT_PX_PER_SEC * dt) / 1000;
        if (next >= half) next -= half;
        scroller.scrollLeft = next;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Scrollbar thumb + backward wrap */
  useEffect(() => {
    const scroller = scrollerRef.current;
    const a = thumbARef.current;
    const b = thumbBRef.current;
    if (!scroller || !a || !b) return;

    // The rail stands for one full loop, and the thumb is the share of it on
    // screen. Rather than confine the thumb to the rail and snap it back at
    // the seam, it travels the whole rail and runs off the right while its
    // twin, parked exactly one rail-width behind, runs on from the left. The
    // clip hides the overhang, so the pill reads as one continuous belt that
    // never resets, which is what the looping strip is actually doing.
    const paint = () => {
      const half = scroller.scrollWidth / 2;
      if (!half) return;
      const w = Math.min(1, scroller.clientWidth / half) * 100;
      const p = ((scroller.scrollLeft % half) / half) * 100;
      a.style.width = `${w}%`;
      b.style.width = `${w}%`;
      a.style.left  = `${p}%`;
      b.style.left  = `${p - 100}%`;
    };

    const onScroll = () => {
      const half = scroller.scrollWidth / 2;
      // Scrolling left off the front would dead-end at 0, so hop to the
      // matching position in the duplicate half instead.
      if (half && scroller.scrollLeft < 1 && performance.now() >= nudgeUntilRef.current) {
        scroller.scrollLeft = half;
        return;
      }
      paint();
    };

    paint();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", paint);
    };
  }, []);

  /* Any deliberate input parks the drift for a beat */
  const holdDrift = () => {
    nudgeUntilRef.current = performance.now() + RESUME_DELAY_MS;
    setPaused(true);
    window.setTimeout(() => {
      if (!hoverRef.current && performance.now() >= nudgeUntilRef.current) setPaused(false);
    }, RESUME_DELAY_MS + 50);
  };

  const nudge = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card   = scroller.querySelector<HTMLElement>(".gallery-card");
    const amount = card ? (card.offsetWidth + 20) * 2 : 400;
    holdDrift();
    scroller.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="px-6 md:px-[136px] py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            HTML5 AD GALLERY
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            Every format, built in-house.
          </h2>
        </div>
        <p className="max-w-[340px] text-base leading-[1.5]" style={{ color: "var(--muted)" }}>
          Interactive previews of our most popular HTML5 ad formats. Every unit is built from scratch, no templates.
        </p>
      </div>

      <div className="gallery-strip">
        {/* Scroller. Edges are masked rather than covered, so the fade works on
            whatever background the section happens to sit on. */}
        <div
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-label="HTML5 ad format previews, scrollable"
          onPointerEnter={() => { hoverRef.current = true; setPaused(true); }}
          onPointerLeave={() => { hoverRef.current = false; if (performance.now() >= nudgeUntilRef.current) setPaused(false); }}
          onWheel={holdDrift}
          onTouchStart={holdDrift}
          onKeyDown={holdDrift}
          className="no-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain py-2 outline-none"
          style={{
            maskImage:        "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
            WebkitMaskImage:  "linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)",
          }}
        >
          {TRACK.map((b, i) => (
            <PhoneCard key={i} src={b.src} index={i % BANNERS.length} />
          ))}
        </div>

        {/* Control bar */}
        <div className="flex items-center gap-5 mt-6">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="hidden sm:inline font-helvetica font-bold text-[10px] tracking-[3px] uppercase whitespace-nowrap"
              style={{ color: "var(--muted)" }}
            >
              {paused ? "Scroll or drag" : "Auto-scrolling"}
            </span>
          </div>

          {/* Scrollbar rail */}
          <div
            className="relative flex-1 h-[4px] rounded-full overflow-hidden"
            style={{ background: "var(--border)" }}
            aria-hidden
          >
            <div
              ref={thumbARef}
              className="absolute top-0 h-full rounded-full"
              style={{ width: "25%", left: 0, background: "linear-gradient(65deg,#ef6600,#cb0000)" }}
            />
            <div
              ref={thumbBRef}
              className="absolute top-0 h-full rounded-full"
              style={{ width: "25%", left: "-100%", background: "linear-gradient(65deg,#ef6600,#cb0000)" }}
            />
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowButton dir={-1} onClick={() => nudge(-1)} />
            <ArrowButton dir={1}  onClick={() => nudge(1)} />
          </div>
        </div>
      </div>

      {/* CTA footer */}
      <div
        className="mt-10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <div>
          <p className="font-bold" style={{ color: "var(--fg)" }}>Need a custom format?</p>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            We scope and build bespoke HTML5 units for any brief. Typical turnaround: 4 working days.
          </p>
        </div>
        <Link
          href="/contact?topic=html5"
          className="btn-outline whitespace-nowrap h-[46px] px-8 text-sm flex items-center gap-2"
        >
          Discuss your brief →
        </Link>
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next formats" : "Previous formats"}
      className="rmb-arrow w-11 h-11 rounded-full flex items-center justify-center shrink-0"
      style={{ border: "1px solid var(--border)", background: "var(--card)", color: "var(--fg)" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: dir === 1 ? undefined : "rotate(180deg)" }}>
        <path d="M3.75 9h10.5M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
