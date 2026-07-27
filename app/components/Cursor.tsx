"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export function Cursor() {
  const { theme } = useTheme();
  const pathname   = usePathname();
  const dotRef     = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const pos        = useRef({ x: -100, y: -100 });
  const delayed    = useRef({ x: -100, y: -100 });
  const raf        = useRef<number>(0);
  const hovering   = useRef(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  /*
   * Every hook below runs unconditionally, and the touch bail-out happens at
   * the return statement instead.
   *
   * It used to sit here, above these three effects. On a desktop that was
   * invisible, because isTouch never became true and the hook count never
   * changed. On a real touchscreen the first effect flipped isTouch, the next
   * render returned early, React counted three fewer hooks than the render
   * before it and threw "Rendered fewer hooks than expected". Cursor is
   * mounted in RootLayout, so that unmounted the entire app: the page painted
   * and then vanished. Device emulators report pointer:fine, so they never
   * reproduced it. Only real phones did.
   */

  /* ── Reset hover state on every route change ── */
  useEffect(() => {
    if (isTouch) return;
    const ring = ringRef.current;
    if (!ring) return;
    hovering.current = false;
    ring.style.borderColor = document.documentElement.classList.contains("dark")
      ? "rgba(255,255,255,0.35)"
      : "rgba(0,0,0,0.25)";
    ring.style.opacity = "1";
  }, [pathname, isTouch]);

  /* ── Update ring colour when theme changes ── */
  useEffect(() => {
    if (isTouch) return;
    if (!ringRef.current || hovering.current) return;
    ringRef.current.style.borderColor =
      theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";
  }, [theme, isTouch]);

  /* ── Main cursor logic ── */
  useEffect(() => {
    // Nothing to track on a touchscreen: no listeners, no MutationObserver and
    // no requestAnimationFrame loop, so phones do not burn battery on a cursor
    // they will never show.
    if (isTouch) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };

    const onEnter = () => {
      hovering.current = true;
      ring.style.borderColor = "#ef6600";
      ring.style.opacity     = "0.75";
    };

    const onLeave = () => {
      hovering.current = false;
      ring.style.borderColor = document.documentElement.classList.contains("dark")
        ? "rgba(255,255,255,0.35)"
        : "rgba(0,0,0,0.25)";
      ring.style.opacity = "1";
    };

    const loop = () => {
      const lerp = hovering.current ? 0.07 : 0.13;
      delayed.current.x += (pos.current.x - delayed.current.x) * lerp;
      delayed.current.y += (pos.current.y - delayed.current.y) * lerp;
      const scale = hovering.current ? "scale(2.4)" : "scale(1)";
      ring.style.transform = `translate(${delayed.current.x}px, ${delayed.current.y}px) translate(-50%,-50%) ${scale}`;
      raf.current = requestAnimationFrame(loop);
    };

    const attach = () => {
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, [isTouch]);

  // Safe here: every hook above has already run, so the count is identical on
  // both branches and React sees a stable list.
  if (isTouch) return null;

  return (
    <>
      {/* Fast dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-[10px] h-[10px] rounded-full"
        style={{ background: "#ef6600", willChange: "transform" }}
      />
      {/* Delayed ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none w-8 h-8 rounded-full border"
        style={{
          borderColor: theme === "dark" ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)",
          willChange: "transform",
          transition: "border-color 0.25s ease, opacity 0.25s ease, transform 0.04s linear",
        }}
      />
    </>
  );
}
