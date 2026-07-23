"use client";
import { useState } from "react";
import { Icon } from "../components/Icon";

interface AdFmt {
  id: string; label: string; size: string;
  w: number; h: number;
  placement: string; tag: string;
  inMobile: boolean; inDesktop: boolean;
  isOverlay: boolean;
}

const FORMATS: AdFmt[] = [
  { id:"mobile-banner",          label:"Mobile Banner",          size:"320×50",  w:320,h:50,  placement:"Sticky Bottom Anchor",            tag:"ANCHOR",       inMobile:true,  inDesktop:false, isOverlay:false },
  { id:"large-mobile-banner",    label:"Large Mobile Banner",    size:"320×100", w:320,h:100, placement:"Sticky Top Anchor",               tag:"TOP ANCHOR",   inMobile:true,  inDesktop:false, isOverlay:false },
  { id:"square",                 label:"Square",                 size:"250×250", w:250,h:250, placement:"Sidebar / In-content Widget",     tag:"SQUARE",       inMobile:true,  inDesktop:true,  isOverlay:false },
  { id:"mrec",                   label:"Medium Rectangle",       size:"300×250", w:300,h:250, placement:"In-article / In-image Overlay",   tag:"MREC",         inMobile:true,  inDesktop:true,  isOverlay:false },
  { id:"large-rect",             label:"Large Rectangle",        size:"336×280", w:336,h:280, placement:"In-content / Below Heading",      tag:"LARGE RECT",   inMobile:true,  inDesktop:true,  isOverlay:false },
  { id:"interstitial-portrait",  label:"Mobile Interstitial",    size:"320×480", w:320,h:480, placement:"Full-page / Page Transition",     tag:"INTERSTITIAL", inMobile:true,  inDesktop:false, isOverlay:true  },
  { id:"interstitial-landscape", label:"Landscape Interstitial", size:"480×320", w:480,h:320, placement:"Landscape Full-screen",           tag:"LANDSCAPE",    inMobile:true,  inDesktop:false, isOverlay:true  },
  { id:"half-page",              label:"Half Page / Skyscraper", size:"300×600", w:300,h:600, placement:"Sticky Sidebar Column",           tag:"SKYSCRAPER",   inMobile:false, inDesktop:true,  isOverlay:false },
];

const DEFAULT_ON = new Set(["mobile-banner", "large-mobile-banner", "mrec", "large-rect", "half-page"]);

/* ── placeholder helpers ── */
function Lines({ n = 4, ws = [100, 92, 96, 65] }: { n?: number; ws?: number[] }) {
  return (
    <div className="flex flex-col gap-[6px]">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className="h-[9px] rounded-full" style={{ width: `${ws[i % ws.length]}%`, background: "var(--border)" }} />
      ))}
    </div>
  );
}

function Img({ h = 100, children }: { h?: number; children?: React.ReactNode }) {
  return (
    <div className="w-full rounded-xl relative overflow-hidden" style={{ height: h, background: "var(--card)", border: "1px solid var(--border)" }}>
      {children}
    </div>
  );
}

/* ── standalone ad unit box ── */
function AdBox({ f, fill, compact }: { f: AdFmt; fill?: boolean; compact?: boolean }) {
  const isFlat = f.h / f.w < 0.35;
  return (
    <div className={fill ? "w-full" : ""}>
      {!compact && (
        <p className="text-[9px] mb-1 font-helvetica" style={{ color: "var(--muted)" }}>
          Ads by Go Mobile · <span style={{ color: "#ef6600" }}>{f.tag}</span>
        </p>
      )}
      <div
        className="relative rounded-lg overflow-hidden flex flex-col items-center justify-center gap-1 text-center"
        style={{
          width: fill ? "100%" : `min(100%, ${f.w}px)`,
          aspectRatio: `${f.w}/${f.h}`,
          background: "linear-gradient(135deg, #ef6600 0%, #d94f00 40%, #cb0000 100%)",
        }}
      >
        <span className="font-helvetica font-bold text-white/90 text-[11px] tracking-widest">{f.size}</span>
        {!isFlat && <span className="text-white/40 text-[9px] px-2 leading-tight">{f.placement}</span>}
        <button
          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center font-bold"
          style={{ background: "rgba(0,0,0,0.45)", color: "white", fontSize: "9px" }}
          tabIndex={-1}
        >×</button>
      </div>
    </div>
  );
}

/* ── in-image overlay ad (kompas.com style) ── */
function InImageAd({ f }: { f: AdFmt }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex flex-col"
      style={{ background: "linear-gradient(135deg, #ef6600 0%, #d94f00 40%, #cb0000 100%)" }}
    >
      <div className="flex items-center justify-between px-2 py-0.5" style={{ background: "rgba(0,0,0,0.3)" }}>
        <span className="text-[8px] text-white/60 font-helvetica">Advertisement</span>
        <button className="text-[8px] text-white/60 font-helvetica flex items-center gap-0.5" tabIndex={-1}>
          Close Ads ×
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-3 gap-0.5">
        <span className="font-helvetica font-bold text-white/90 text-[10px] tracking-widest">{f.size}</span>
        <span className="text-white/40 text-[8px]">{f.tag} · In-image Overlay</span>
      </div>
    </div>
  );
}

/* ── horizontal billboard strip ── */
function Billboard({ enabled, getF }: { enabled: Set<string>; getF: (id: string) => AdFmt }) {
  if (!enabled.has("large-rect") && !enabled.has("mrec")) return null;
  const f = enabled.has("large-rect") ? getF("large-rect") : getF("mrec");
  return (
    <div className="px-6 py-2" style={{ borderBottom: "1px solid var(--border)", background: "var(--card)" }}>
      <p className="text-[9px] mb-1 font-helvetica text-center" style={{ color: "var(--muted)" }}>
        Ads by Go Mobile · <span style={{ color: "#ef6600" }}>BILLBOARD</span>
      </p>
      <div
        className="w-full rounded-lg overflow-hidden flex items-center justify-center relative"
        style={{ height: 72, background: "linear-gradient(135deg, #ef6600 0%, #d94f00 40%, #cb0000 100%)" }}
      >
        <span className="font-helvetica font-bold text-white/90 text-[11px] tracking-widest">728×90 · Top Billboard</span>
        <button
          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center font-bold"
          style={{ background: "rgba(0,0,0,0.45)", color: "white", fontSize: "9px" }}
          tabIndex={-1}
        >×</button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   PHONE MOCKUP — kompas.com mobile style
──────────────────────────────────────── */
function PhoneMockup({ enabled, getF }: { enabled: Set<string>; getF: (id: string) => AdFmt }) {
  const on = (id: string) => enabled.has(id);
  return (
    <div className="flex justify-center">
      <div style={{ width: "clamp(280px, 85vw, 375px)" }}>
        <div
          className="rounded-[44px] p-3"
          style={{ background: "#1c1c1e", boxShadow: "0 30px 80px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.1)" }}
        >
          {/* Dynamic island */}
          <div className="flex justify-center mt-1 mb-2">
            <div className="h-[28px] w-[96px] rounded-full" style={{ background: "#0a0a0a" }} />
          </div>
          {/* Screen */}
          <div className="rounded-[36px] overflow-hidden flex flex-col" style={{ background: "var(--bg)" }}>

            {/* ① STICKY TOP ANCHOR 320×100 */}
            {on("large-mobile-banner") && (
              <div className="shrink-0 sticky top-0 z-10">
                <p className="text-[8px] text-center font-helvetica py-0.5" style={{ background: "rgba(239,102,0,0.15)", color: "#ef6600" }}>STICKY TOP</p>
                <AdBox f={getF("large-mobile-banner")} fill compact />
              </div>
            )}

            {/* ② Simulated nav bar */}
            <div className="shrink-0 flex items-center justify-between px-3 py-1.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="h-3 w-16 rounded-full" style={{ background: "var(--border)" }} />
              <div className="flex gap-1.5">
                {[18, 14, 14].map((w, i) => <div key={i} className="h-2.5 rounded-full" style={{ width: w, background: "var(--border)" }} />)}
              </div>
            </div>

            {/* ③ Article content — full height, page scrolls */}
            <div>

              {/* Hero image with in-image overlay ad */}
              <div className="relative" style={{ height: 160, background: "var(--card)" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-[60%] rounded-full" style={{ background: "var(--border)" }} />
                </div>
                {on("mrec") && <InImageAd f={getF("mrec")} />}
              </div>

              <div className="px-4 py-4 flex flex-col gap-4">
                {/* Breadcrumb */}
                <div className="flex gap-1.5 items-center">
                  <div className="h-2 w-14 rounded-full" style={{ background: "var(--border)" }} />
                  <div className="h-2 w-1 rounded-full" style={{ background: "var(--border)" }} />
                  <div className="h-2 w-10 rounded-full" style={{ background: "var(--border)" }} />
                </div>
                {/* Title */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-full rounded-full" style={{ background: "var(--border)" }} />
                  <div className="h-4 w-[90%] rounded-full" style={{ background: "var(--border)" }} />
                  <div className="h-4 w-[75%] rounded-full" style={{ background: "var(--border)" }} />
                </div>
                {/* Author row */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full" style={{ background: "var(--border)" }} />
                  <div className="flex flex-col gap-1">
                    <div className="h-2 w-24 rounded-full" style={{ background: "var(--border)" }} />
                    <div className="h-2 w-16 rounded-full" style={{ background: "rgba(128,128,128,0.15)" }} />
                  </div>
                </div>
                {/* Social share bar */}
                <div className="flex gap-2">
                  {[20, 20, 20, 20].map((w, i) => (
                    <div key={i} className="h-6 rounded-lg" style={{ width: w, background: "var(--card)", border: "1px solid var(--border)" }} />
                  ))}
                </div>

                {/* Para 1–2 */}
                <Lines n={4} />
                <Lines n={3} ws={[100, 88, 70]} />

                {/* ④ In-article MREC 300×250 */}
                {on("mrec") && <AdBox f={getF("mrec")} />}

                {/* Para 3–4 */}
                <Lines n={4} ws={[100, 94, 97, 55]} />
                <Lines n={3} ws={[100, 88, 60]} />

                {/* ⑤ In-article Large Rectangle 336×280 */}
                {on("large-rect") && <AdBox f={getF("large-rect")} />}

                {/* Para 5 */}
                <Lines n={4} ws={[100, 92, 86, 45]} />

                {/* ⑥ Square (optional) */}
                {on("square") && (
                  <div className="flex justify-center">
                    <AdBox f={getF("square")} />
                  </div>
                )}

                <Lines n={3} ws={[100, 88, 50]} />
              </div>
            </div>

            {/* ⑦ STICKY BOTTOM ANCHOR 320×50 */}
            {on("mobile-banner") && (
              <div className="shrink-0 sticky bottom-0 z-10">
                <AdBox f={getF("mobile-banner")} fill compact />
                <p className="text-[8px] text-center font-helvetica py-0.5" style={{ background: "rgba(239,102,0,0.15)", color: "#ef6600" }}>STICKY BOTTOM</p>
              </div>
            )}
          </div>
          {/* Home bar */}
          <div className="flex justify-center mt-3">
            <div className="w-28 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DESKTOP MOCKUP — kompas.com desktop style
───────────────────────────────────────── */
function DesktopMockup({ enabled, getF }: { enabled: Set<string>; getF: (id: string) => AdFmt }) {
  const on = (id: string) => enabled.has(id);
  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{ border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex gap-1.5">
          {["rgba(239,102,0,0.5)", "rgba(255,190,0,0.5)", "rgba(0,200,80,0.5)"].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex-1 max-w-[400px] mx-auto h-6 rounded-full flex items-center gap-2 px-3" style={{ background: "var(--bg)", border: "1px solid var(--border)" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "rgba(0,200,80,0.6)" }} />
          <span className="text-[10px] font-helvetica" style={{ color: "var(--muted)" }}>kompas.com/tren/read/2026/…</span>
        </div>
      </div>

      {/* Sticky nav simulation */}
      <div className="flex items-center justify-between px-6 py-2" style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
        <div className="h-3 w-24 rounded-full" style={{ background: "var(--border)" }} />
        <div className="flex gap-3">
          {[28, 22, 22, 26, 22, 20].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full" style={{ width: w, background: "rgba(128,128,128,0.15)" }} />
          ))}
        </div>
        <div className="h-6 w-28 rounded-full" style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.15))", border: "1px solid rgba(239,102,0,0.3)" }} />
      </div>

      {/* ① BILLBOARD — full-width above article */}
      <Billboard enabled={enabled} getF={getF} />

      {/* Sticky share bar (kompas.com style) */}
      <div className="flex items-center gap-3 px-6 py-2" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
        <span className="text-[9px] font-helvetica font-bold" style={{ color: "var(--muted)" }}>BAGIKAN:</span>
        {["#1877f2", "#1da1f2", "#25d366", "#0088cc"].map((c, i) => (
          <div key={i} className="w-5 h-5 rounded-full" style={{ background: c, opacity: 0.7 }} />
        ))}
        <div className="ml-auto text-[9px] font-helvetica" style={{ color: "var(--muted)" }}>KOMENTAR:</div>
      </div>

      {/* ② Main 2-column layout */}
      <div className="flex" style={{ background: "var(--bg)" }}>

        {/* Article column */}
        <div className="flex-1 min-w-0 px-6 py-5 flex flex-col gap-4">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-16 rounded-full" style={{ background: "rgba(128,128,128,0.2)" }} />
            <span className="text-[9px]" style={{ color: "var(--muted)" }}>/</span>
            <div className="h-2 w-10 rounded-full" style={{ background: "rgba(128,128,128,0.2)" }} />
          </div>

          {/* Article title */}
          <div className="flex flex-col gap-2">
            <div className="h-5 w-full rounded-full" style={{ background: "var(--border)" }} />
            <div className="h-5 w-[92%] rounded-full" style={{ background: "var(--border)" }} />
            <div className="h-5 w-[78%] rounded-full" style={{ background: "var(--border)" }} />
          </div>

          {/* Author + date */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full" style={{ background: "var(--card)", border: "2px solid var(--bg)" }} />
              <div className="w-6 h-6 rounded-full" style={{ background: "var(--border)", border: "2px solid var(--bg)" }} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="h-2 w-36 rounded-full" style={{ background: "var(--border)" }} />
              <div className="h-2 w-24 rounded-full" style={{ background: "rgba(128,128,128,0.15)" }} />
            </div>
          </div>

          {/* ③ Hero image with in-image ad overlay */}
          <Img h={200}>
            {/* image placeholder interior */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3 w-[50%] rounded-full" style={{ background: "var(--border)" }} />
            </div>
            {on("mrec") && <InImageAd f={getF("mrec")} />}
          </Img>

          {/* Para 1–2 */}
          <Lines n={4} />
          <Lines n={3} ws={[100, 88, 65]} />

          {/* ④ In-article MRec 300×250 */}
          {on("mrec") && (
            <div className="flex justify-center py-1">
              <AdBox f={getF("mrec")} />
            </div>
          )}

          {/* Para 3–4 */}
          <Lines n={4} ws={[100, 94, 97, 60]} />
          <Lines n={3} ws={[100, 90, 72]} />

          {/* ⑤ In-article Large Rectangle 336×280 */}
          {on("large-rect") && (
            <div className="py-1">
              <AdBox f={getF("large-rect")} />
            </div>
          )}

          {/* Para 5 */}
          <Lines n={4} ws={[100, 92, 88, 50]} />

          {/* ⑥ Square in-content */}
          {on("square") && (
            <div className="flex justify-center py-1">
              <AdBox f={getF("square")} />
            </div>
          )}

          <Lines n={3} ws={[100, 88, 45]} />
        </div>

        {/* ⑦ Right sidebar — sticky skyscraper */}
        <div
          className="shrink-0 w-[220px] px-4 py-5 flex flex-col gap-3"
          style={{ borderLeft: "1px solid var(--border)" }}
        >
          {/* Sidebar nav links */}
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 w-16 rounded-full mb-1" style={{ background: "var(--border)" }} />
            {[90, 75, 85, 70, 80].map((w, i) => (
              <div key={i} className="h-2 rounded-full" style={{ width: `${w}%`, background: "rgba(128,128,128,0.15)" }} />
            ))}
          </div>
          {/* Sticky 300×600 */}
          {on("half-page") && (
            <div className="sticky top-4">
              <AdBox f={getF("half-page")} />
            </div>
          )}
          {/* 250×250 below */}
          {on("square") && !on("half-page") && (
            <AdBox f={getF("square")} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── overlay modal ── */
function OverlayAd({ f, onClose }: { f: AdFmt; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div className="relative" style={{ maxWidth: f.w, width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <AdBox f={f} />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
          style={{ background: "var(--fg)", color: "var(--bg)" }}
        >×</button>
        <p className="text-center text-[10px] mt-2 font-helvetica tracking-widest" style={{ color: "var(--muted)" }}>
          CLICK OUTSIDE TO DISMISS
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN
══════════════════════════════════════ */
export function AdFormatsDemo() {
  const [enabled, setEnabled] = useState<Set<string>>(DEFAULT_ON);
  const [layout, setLayout] = useState<"mobile" | "desktop">("mobile");
  const [panelOpen, setPanelOpen] = useState(false);
  const [overlay, setOverlay] = useState<string | null>(null);

  const on = (id: string) => enabled.has(id);
  const getF = (id: string) => FORMATS.find((f) => f.id === id)!;
  const enabledCount = enabled.size;

  function toggle(id: string) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); if (overlay === id) setOverlay(null); }
      else next.add(id);
      return next;
    });
  }

  const activeOverlays = FORMATS.filter((f) => f.isOverlay && on(f.id));

  return (
    <>
      {/* Hero */}
      <section className="px-6 md:px-[136px] pt-32 pb-14">
        <p className="font-helvetica font-bold text-xs tracking-[9px] mb-3" style={{ color: "#ef6600" }}>AD FORMAT PREVIEW</p>
        <h1 className="font-bricolage font-bold text-4xl md:text-[64px] leading-none tracking-[-2px] mb-5" style={{ color: "var(--fg)" }}>
          See Ads in Context.
        </h1>
        <p className="text-base md:text-xl max-w-[600px] leading-[1.6]" style={{ color: "var(--muted)" }}>
          Toggle each programmatic format to see exact placement within a realistic editorial environment — mirroring how ads appear on premium Indonesian publishers.
        </p>
      </section>

      {/* Demo */}
      <section className="px-6 md:px-[136px] pb-32">
        {/* Layout toggle */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-1 p-1 rounded-full" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <button
              onClick={() => setLayout("mobile")}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={layout === "mobile" ? { background: "linear-gradient(135deg,#ef6600,#cb0000)", color: "white" } : { color: "var(--muted)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="7" y="2" width="10" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
              Mobile
            </button>
            <button
              onClick={() => setLayout("desktop")}
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={layout === "desktop" ? { background: "linear-gradient(135deg,#ef6600,#cb0000)", color: "white" } : { color: "var(--muted)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Desktop
            </button>
          </div>
          {/* Overlay previews */}
          {activeOverlays.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {activeOverlays.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOverlay(f.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg,rgba(239,102,0,0.15),rgba(203,0,0,0.10))", border: "1px solid rgba(239,102,0,0.3)", color: "var(--fg)" }}
                >
                  <span style={{ color: "#ef6600" }}>▶</span>Preview {f.size}
                </button>
              ))}
            </div>
          )}
        </div>

        {layout === "mobile"
          ? <PhoneMockup enabled={enabled} getF={getF} />
          : <DesktopMockup enabled={enabled} getF={getF} />
        }
      </section>

      {/* Overlay modal */}
      {overlay && on(overlay) && (
        <OverlayAd f={getF(overlay)} onClose={() => setOverlay(null)} />
      )}

      {/* ── Floating panel ── */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {panelOpen && (
          <div
            className="rounded-[20px] w-[272px] overflow-hidden"
            style={{ background: "var(--bg)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
          >
            <div className="px-4 py-3.5 flex items-center gap-2.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#ef6600,#cb0000)" }}>
                <span className="text-white font-bold text-[10px]">GM</span>
              </div>
              <div>
                <p className="font-bricolage font-bold text-sm leading-none" style={{ color: "var(--fg)" }}>Ad Formats</p>
                <p className="text-[9px] font-helvetica tracking-widest mt-0.5" style={{ color: "var(--muted)" }}>{enabledCount}/{FORMATS.length} ACTIVE</p>
              </div>
              <button onClick={() => setPanelOpen(false)} aria-label="Close" className="ml-auto w-6 h-6 rounded-full flex items-center justify-center" style={{ color: "var(--muted)" }}><Icon name="xmark" className="w-4 h-4" /></button>
            </div>
            <div className="px-2 py-2 flex flex-col gap-0.5 max-h-[380px] overflow-y-auto">
              {FORMATS.map((f) => {
                const active = on(f.id);
                const relevant = layout === "mobile" ? f.inMobile : f.inDesktop;
                return (
                  <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left w-full transition-all duration-150"
                    style={{
                      background: active ? "linear-gradient(90deg,rgba(239,102,0,0.12),rgba(203,0,0,0.07))" : "transparent",
                      border: active ? "1px solid rgba(239,102,0,0.25)" : "1px solid transparent",
                      opacity: relevant ? 1 : 0.4,
                    }}
                  >
                    <span
                      className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                      style={{ background: active ? "linear-gradient(135deg,#ef6600,#cb0000)" : "transparent", border: active ? "none" : "1.5px solid var(--border)" }}
                    >
                      {active && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3 5.5L8 1" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: active ? "var(--fg)" : "var(--muted)" }}>{f.label}</p>
                      <p className="text-[9px]" style={{ color: "var(--muted)", opacity: 0.6 }}>{f.size} · {f.tag}</p>
                    </div>
                    {!relevant && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full font-helvetica tracking-wide shrink-0" style={{ background: "var(--card)", color: "var(--muted)" }}>
                        {layout === "mobile" ? "DESKTOP" : "MOBILE"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
              <button onClick={() => setEnabled(new Set(FORMATS.map((f) => f.id)))} className="text-[10px] font-medium" style={{ color: "#ef6600" }}>Select All</button>
              <button onClick={() => setEnabled(new Set())} className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>Clear All</button>
            </div>
          </div>
        )}
        {/* FAB */}
        <button
          onClick={() => setPanelOpen((p) => !p)}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95"
          style={{ background: "linear-gradient(135deg,#ef6600,#cb0000)", boxShadow: "0 8px 32px rgba(239,102,0,0.4)" }}
        >
          {panelOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
          {!panelOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: "var(--fg)", color: "var(--bg)" }}>
              {enabledCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
