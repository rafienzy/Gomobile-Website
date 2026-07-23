import React from "react";

export function LegalBody({ updated, children }: { updated: string; children: React.ReactNode }) {
  return (
    <section className="px-6 md:px-[150px] pb-24 md:pb-32">
      <div className="legal-prose max-w-[820px] flex flex-col gap-10">
        <p className="font-helvetica text-sm" style={{ color: "var(--muted)" }}>
          Last updated: {updated}
        </p>
        {children}
      </div>
      <style>{`
        .legal-prose p { color: var(--muted); font-size: 1rem; line-height: 1.7; }
        .legal-prose ul { list-style: disc; padding-left: 1.4rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--muted); }
        .legal-prose li { line-height: 1.6; }
        .legal-prose strong { color: var(--fg); font-weight: 600; }
        .legal-prose a { text-decoration: underline; transition: opacity 0.2s; }
        .legal-prose a:hover { opacity: 0.7; }
      `}</style>
    </section>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2
        className="font-bricolage font-bold text-2xl md:text-[28px] leading-[1.2] tracking-tight"
        style={{ color: "var(--fg)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
