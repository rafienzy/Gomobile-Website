"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../utils/scrollReveal";
import type { BlogPost } from "@/lib/models/blog";

const TOPICS = ["All", "Programmatic", "Creative", "CTV", "Measurement", "Industry"];

export function BlogBody({ posts: livePosts = [] }: { posts?: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState("All");

  const allPosts = livePosts;
  const featuredPost = livePosts[0] ?? null;

  const filtered = topic === "All" ? allPosts : allPosts.filter((p) => p.category === topic);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".featured-card"), { duration: 1.3, y: 60, start: "top 85%" });
    addReveal(el, el.querySelectorAll(".topic-bar"), { duration: 1, y: 30, start: "top 90%" });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll(".post-card"),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power3.out" }
    );
  }, [topic]);

  return (
    <div ref={ref}>
      {/* Featured */}
      <section className="px-6 md:px-[136px] pb-12 md:pb-20">
        <Link href={`/blog/${featuredPost.slug}`}>
          <article
            className="featured-card group relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0 rounded-[28px] overflow-hidden cursor-pointer"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="relative h-[280px] md:h-[480px] overflow-hidden">
              <Image
                src={featuredPost.img}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.06]"
              />
            </div>
            <div className="flex flex-col justify-between gap-8 p-8 md:p-12">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="chip">FEATURED</span>
                  <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "var(--muted)" }}>
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="font-bricolage font-bold text-3xl md:text-[40px] leading-[1.1] tracking-tight" style={{ color: "var(--fg)" }}>
                  {featuredPost.title}
                </h2>
                <p className="text-base md:text-lg leading-[1.55]" style={{ color: "var(--muted)" }}>
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
                >
                  {featuredPost.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-bold" style={{ color: "var(--fg)" }}>
                    {featuredPost.author}
                  </p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {featuredPost.date} · {featuredPost.readTime}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* Topic filter */}
      <section className="px-6 md:px-[136px]">
        <div className="topic-bar flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const isActive = t === topic;
            return (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="px-5 py-2 rounded-full text-xs font-bold tracking-tight transition"
                style={{
                  background: isActive ? "var(--fg)" : "transparent",
                  color: isActive ? "var(--bg)" : "var(--fg)",
                  border: `1px solid ${isActive ? "var(--fg)" : "var(--border)"}`,
                }}
              >
                {t.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 md:px-[136px] py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}>
              <article
                className="post-card group flex flex-col rounded-[28px] overflow-hidden cursor-pointer h-full"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="flex flex-col gap-4 p-7 flex-1">
                  <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#ef6600" }}>
                    {p.category}
                  </span>
                  <h3 className="font-bricolage font-bold text-xl md:text-[22px] leading-[1.2] tracking-tight" style={{ color: "var(--fg)" }}>
                    {p.title}
                  </h3>
                  <p className="text-sm leading-[1.5] flex-1" style={{ color: "var(--muted)" }}>
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
                      >
                        {p.author.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="text-xs font-bold" style={{ color: "var(--fg)" }}>
                        {p.author}
                      </p>
                    </div>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {p.readTime}
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
