"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";

const BUDGETS = ["< $10K", "$10K–$50K", "$50K–$150K", "$150K–$500K", "$500K+"];

const OFFICES = [
  { city: "Jakarta",   address: "Menara BCA, Jl. MH Thamrin No.1, Jakarta 10310",  email: "jakarta@gomobile.id"   },
  { city: "Singapore", address: "1 Raffles Place, #20-61 Tower 2, Singapore 048616", email: "sg@gomobile.id"    },
  { city: "Kuala Lumpur", address: "Level 18, Menara IMC, Jl. Sultan Ismail, KL 50250", email: "kl@gomobile.id" },
];

export function ContactBody() {
  const ref = useRef<HTMLDivElement>(null);
  const [budget, setBudget]   = useState("");
  const [sent, setSent]       = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".form-panel"),   { duration: 1.3, y: 60, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".info-panel"),   { duration: 1.2, y: 50, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".office-card"),  { stagger: 0.1, duration: 1, y: 40, start: "top 88%" });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div ref={ref} className="px-6 md:px-[136px] pb-24 md:pb-32">

      {/* ── Main grid: form + sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 mb-6">

        {/* Form */}
        <div className="form-panel glass-card rounded-[28px] p-8 md:p-12">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}
              >
                ✓
              </div>
              <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-tight tracking-tight" style={{ color: "var(--fg)" }}>
                We&apos;ve got it.
              </h2>
              <p className="text-base leading-[1.6] max-w-[380px]" style={{ color: "var(--muted)" }}>
                Expect to hear from us within one business day. We&apos;ll come back with questions, a proposal, or both.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
                  GET IN TOUCH
                </p>
                <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-tight tracking-tight" style={{ color: "var(--fg)" }}>
                  Send us a brief.
                </h2>
              </div>

              {/* Name + company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Your name" name="name" placeholder="Rafi Wibowo" required />
                <Field label="Company" name="company" placeholder="FMCG Co." required />
              </div>

              {/* Email + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Work email" name="email" type="email" placeholder="you@company.com" required />
                <Field label="Phone (optional)" name="phone" type="tel" placeholder="+62 812 ..." />
              </div>

              {/* Budget */}
              {/*
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-[1.5px]" style={{ color: "var(--muted)" }}>
                  Estimated monthly budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => {
                    const active = budget === b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className="px-4 py-2 rounded-full text-xs font-bold tracking-tight transition-all duration-200"
                        style={{
                          background: active ? "linear-gradient(65deg,#ef6600,#cb0000)" : "transparent",
                          color:  active ? "#fff" : "var(--fg)",
                          border: `1px solid ${active ? "transparent" : "var(--border)"}`,
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
              */}

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-[1.5px]" style={{ color: "var(--muted)" }}>
                  Tell us about your campaign
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Goals, timeline, target markets, existing creative — anything useful."
                  className="rounded-[16px] px-5 py-4 text-sm leading-[1.6] resize-none outline-none transition-all duration-200"
                  style={{
                    background: "rgba(128,128,128,0.08)",
                    border: "1px solid var(--border)",
                    color: "var(--fg)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(239,102,0,0.5)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <button
                type="submit"
                className="btn-primary h-[60px] text-[15px] self-start px-12"
              >
                SEND BRIEF
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.75 9h10.5M9 3.75L14.25 9L9 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar info */}
        <div className="info-panel flex flex-col gap-4">
          {/* Response time */}
          <div
            className="glass-card rounded-[28px] p-8 flex flex-col gap-4"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl"
              style={{ background: "linear-gradient(135deg, rgba(239,102,0,0.2), rgba(203,0,0,0.12))" }}
            >
              ⚡
            </div>
            <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>
              1-business-day response
            </h3>
            <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>
              Every brief gets a real reply from a strategist, not a bot. We&apos;ll ask the right questions before we pitch anything.
            </p>
          </div>

          {/* What to expect */}
          <div className="glass-card rounded-[28px] p-8 flex flex-col gap-5">
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
              WHAT HAPPENS NEXT
            </p>
            {[
              { step: "01", text: "We review your brief and align on goals." },
              { step: "02", text: "A strategist calls to clarify scope and market." },
              { step: "03", text: "We send a channel plan and budget allocation." },
              { step: "04", text: "Campaign goes live within 5 business days." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <span
                  className="font-bricolage font-extrabold text-sm shrink-0 mt-0.5"
                  style={{ color: "#ef6600" }}
                >
                  {item.step}
                </span>
                <p className="text-sm leading-[1.5]" style={{ color: "var(--muted)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Direct email */}
          <div className="glass-card rounded-[28px] p-8 flex flex-col gap-3">
            <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
              PREFER EMAIL?
            </p>
            <a
              href="mailto:hello@gomobile.id"
              className="font-bricolage font-bold text-lg tracking-tight transition-opacity hover:opacity-70"
              style={{ color: "var(--fg)" }}
            >
              hello@gomobile.id
            </a>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Or call us at +62 21 5088 0123
            </p>
          </div>
        </div>
      </div>

      {/* ── Offices ── */}
      <div className="flex flex-col gap-6 mt-8">
        <div>
          <p className="font-helvetica font-bold text-xs tracking-[9px]" style={{ color: "#ef6600" }}>
            OFFICES
          </p>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2" style={{ color: "var(--fg)" }}>
            Where to find us.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {OFFICES.map((o) => (
            <div key={o.city} className="office-card glass-card rounded-[28px] p-8 flex flex-col gap-4">
              <h3 className="font-bricolage font-bold text-2xl tracking-tight" style={{ color: "var(--fg)" }}>
                {o.city}
              </h3>
              <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>
                {o.address}
              </p>
              <a
                href={`mailto:${o.email}`}
                className="text-sm font-bold transition-opacity hover:opacity-60 mt-auto"
                style={{ color: "#ef6600" }}
              >
                {o.email}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Reusable input field ── */
function Field({
  label, name, type = "text", placeholder, required = false,
}: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-[1.5px]" style={{ color: "var(--muted)" }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-[14px] px-5 py-3.5 text-sm outline-none transition-all duration-200"
        style={{
          background: "rgba(128,128,128,0.08)",
          border: "1px solid var(--border)",
          color: "var(--fg)",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(239,102,0,0.5)")}
        onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
}
