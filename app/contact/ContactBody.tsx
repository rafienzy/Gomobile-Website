"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import { Icon } from "../components/Icon";
import type { Office } from "@/lib/content/offices";

const BUDGETS =["< $10K", "$10K–$50K", "$50K–$150K", "$150K–$500K", "$500K+"];

/**
 * Opening lines seeded from a `?topic=` param, so a CTA elsewhere on the site
 * can drop the visitor into the form with the subject already stated.
 */
const TOPIC_PREFILL: Record<string, string> = {
  html5: "We'd like to discuss a custom HTML5 ad unit.\n\n",
};

/**
 * Where a submitted brief goes.
 *
 * Formspree. Note what is NOT encoded here: the recipient. Which inbox a brief
 * lands in is a setting in the Formspree dashboard, so moving delivery from one
 * person to a shared alias is a settings change, not a deploy. This id is
 * opaque, so unlike an address-in-the-URL service it also puts no email address
 * into the client bundle for scrapers to harvest.
 *
 * Formspree keeps a copy of every submission, which matters because email alone
 * makes a spam filter or a stray delete into a permanently lost lead.
 *
 * Any endpoint that takes a FormData POST and answers JSON works here, so
 * changing provider is this one line.
 *
 * Set to null and submitting shows the error panel with the mailto fallback.
 * It never shows the success panel, because a form that claims to have sent a
 * brief it threw away is worse than one that admits it is not set up.
 *
 * A plain constant rather than an env var on purpose: this value ships inside
 * the client bundle either way, so nothing is hidden by moving it to the
 * environment, and a NEXT_PUBLIC_ var that nobody sets on the build server
 * fails silently at exactly the moment a real lead is trying to reach us.
 */
const FORM_ENDPOINT: string | null = "https://formspree.io/f/mljeqqda";

/** Shown wherever the form cannot take over. Also the address in the sidebar. */
const FALLBACK_EMAIL = "bd@gomobileagency.com";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export function ContactBody({ offices }: { offices: Office[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [budget, setBudget]   = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<SubmitStatus>("idle");

  // Read from window rather than useSearchParams: the latter would opt this
  // page out of static rendering, and the prefill is not worth that.
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    // hasOwn rather than a plain lookup: the key comes from the URL, and a
    // bare TOPIC_PREFILL[topic] also finds inherited members, so ?topic=
    // constructor would resolve to a function and setMessage would take it
    // for a state updater.
    if (topic && Object.hasOwn(TOPIC_PREFILL, topic)) setMessage(TOPIC_PREFILL[topic]);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".form-panel"),   { duration: 1.3, y: 60, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".info-panel"),   { duration: 1.2, y: 50, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".office-card"),  { stagger: 0.1, duration: 1, y: 40, start: "top 88%" });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    // Read the node now: after the first await, React may have cleared
    // currentTarget off the synthetic event.
    const form = e.currentTarget;

    if (!FORM_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        // Without this Formspree answers a redirect to its own thank-you page
        // rather than JSON, and there is no way to tell success from failure.
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);

      setStatus("sent");
      setMessage("");
    } catch {
      // Deliberately no success state on failure. The visitor gets the address
      // instead, so the lead has somewhere to go.
      setStatus("error");
    }
  };

  return (
    <div ref={ref} className="px-6 md:px-[136px] pb-24 md:pb-32">

      {/* ── Main grid: form + sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 mb-6">

        {/* Form */}
        <div className="form-panel glass-card rounded-[28px] p-8 md:p-12">
          {status === "sent" ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-center">
              <Icon name="check" className="w-16 h-16 text-[#ef6600]" />
              <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-tight tracking-tight" style={{ color: "var(--fg)" }}>
                We&apos;ve got it.
              </h2>
              <p className="text-base leading-[1.6] max-w-[380px]" style={{ color: "var(--muted)" }}>
                Expect to hear from us within one business day. We&apos;ll come back with questions, a proposal, or both.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/*
                Honeypots. Bots fill every field they find; people never see
                these. Two of them because the providers disagree on the name:
                Formspree drops a submission when _gotcha is filled, FormSubmit
                when _honey is. Carrying both means the trap keeps working
                across a change of endpoint.

                Positioned off-screen rather than display:none, because some
                bots skip hidden fields and would sail straight through.
              */}
              {["_gotcha", "_honey"].map((n) => (
                <input
                  key={n}
                  type="text"
                  name={n}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
              ))}
              {/* Subject line on the notification email, so a brief is
                  recognisable in the inbox without opening it. */}
              <input type="hidden" name="_subject" value="New brief from gomobile.id" />

              <div className="flex flex-col gap-1">
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Goals, timeline, target markets, existing creative, anything useful."
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

              {status === "error" && (
                <div
                  role="alert"
                  className="rounded-[16px] px-5 py-4 text-sm leading-[1.6]"
                  style={{
                    background: "rgba(203,0,0,0.08)",
                    border: "1px solid rgba(203,0,0,0.25)",
                    color: "var(--fg)",
                  }}
                >
                  That didn&apos;t go through, and we&apos;d rather tell you than pretend it did.
                  Please email{" "}
                  <a
                    href={`mailto:${FALLBACK_EMAIL}?subject=New brief from gomobile.id`}
                    className="font-bold underline"
                    style={{ color: "#ef6600" }}
                  >
                    {FALLBACK_EMAIL}
                  </a>{" "}
                  and we&apos;ll pick it up from there. Everything you typed is still in the form
                  above, so nothing is lost.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary h-[60px] text-[15px] self-start px-12"
                style={status === "sending" ? { opacity: 0.6, cursor: "wait" } : undefined}
              >
                {status === "sending" ? "SENDING" : "SEND BRIEF"}
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
            <Icon name="bolt" className="w-12 h-12 text-[#ef6600]" />
            <h3 className="font-bricolage font-bold text-xl tracking-tight" style={{ color: "var(--fg)" }}>
              1-business-day response
            </h3>
            <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>
              Every brief gets a real reply from a strategist, not a bot. We&apos;ll ask the right questions before we pitch anything.
            </p>
          </div>

          {/* What to expect */}
          <div className="glass-card rounded-[28px] p-8 flex flex-col gap-5">
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
            <a
              href={`mailto:${FALLBACK_EMAIL}`}
              className="font-bricolage font-bold text-lg tracking-tight transition-opacity hover:opacity-70"
              style={{ color: "var(--fg)" }}
            >
              {FALLBACK_EMAIL}
            </a>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Or call us at +62 818 903 358
            </p>
          </div>
        </div>
      </div>

      {/* ── Offices ── */}
      <div className="flex flex-col gap-6 mt-8">
        <div>
          <h2 className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight" style={{ color: "var(--fg)" }}>
            Where to find us.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {offices.map((o) => (
            <div
              key={o.city}
              /* A lone office takes the full row. Without this the featured
                 card keeps its 2-of-3 span and leaves a third of the row
                 empty, which reads as a card failing to load rather than as
                 a deliberate layout. */
              className={`office-card glass-card rounded-[28px] p-8 flex flex-col gap-4 ${
                offices.length === 1
                  ? "md:col-span-3"
                  : o.featured
                    ? "md:col-span-2"
                    : "md:col-span-1"
              }`}
            >
              <div className="flex flex-col gap-1">
                <p className="font-helvetica font-bold text-[11px] tracking-[3px] uppercase" style={{ color: "#ef6600" }}>
                  {o.label}
                </p>
                <h3 className="font-bricolage font-bold text-2xl tracking-tight" style={{ color: "var(--fg)" }}>
                  {o.city}
                </h3>
              </div>
              <p className="text-sm leading-[1.6]" style={{ color: "var(--muted)" }}>
                {o.address}
              </p>
              <div className="flex flex-col gap-1 mt-auto">
                <a
                  href={`tel:${o.phone.replace(/[^\d+]/g, "")}`}
                  className="text-sm transition-opacity hover:opacity-60"
                  style={{ color: "var(--fg)" }}
                >
                  {o.phone}
                </a>
                <a
                  href={`mailto:${o.email}`}
                  className="text-sm font-bold transition-opacity hover:opacity-60"
                  style={{ color: "#ef6600" }}
                >
                  {o.email}
                </a>
              </div>
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
