"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addReveal } from "../../utils/scrollReveal";
import type { BlogPost, ContentBlock } from "@/lib/models/blog";

function BlocksRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => {
        if (!block.content && block.type !== 'divider') return null;

        if (block.type === 'divider') {
          return <hr key={block.id} className="border-none h-px" style={{ background: 'var(--border)' }} />;
        }

        if (block.type === 'heading2') {
          return (
            <h2
              key={block.id}
              className="font-bricolage font-bold text-2xl md:text-3xl leading-[1.15] tracking-tight"
              style={{ color: 'var(--fg)' }}
            >
              {block.content}
            </h2>
          );
        }

        if (block.type === 'heading3') {
          return (
            <h3
              key={block.id}
              className="font-bricolage font-semibold text-xl md:text-2xl leading-[1.2] tracking-tight"
              style={{ color: 'var(--fg)' }}
            >
              {block.content}
            </h3>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={block.id}
              className="pl-5 border-l-2 border-orange-500/40"
            >
              <p className="text-lg md:text-xl leading-[1.7] italic" style={{ color: 'var(--muted)' }}>
                {block.content}
              </p>
            </blockquote>
          );
        }

        if (block.type === 'callout') {
          return (
            <div
              key={block.id}
              className="glass-card px-6 py-5 rounded-[16px] border-l-2 border-orange-500/40"
            >
              <p className="text-base leading-[1.8]" style={{ color: 'var(--fg)' }}>
                {block.content}
              </p>
            </div>
          );
        }

        if (block.type === 'bulletList') {
          const items = block.content.split('\n').filter(Boolean);
          return (
            <ul key={block.id} className="space-y-2 pl-4">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500/60 shrink-0" />
                  <span className="text-base md:text-lg leading-[1.8]" style={{ color: 'var(--muted)' }}>
                    {item.replace(/^[-•]\s*/, '')}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'image') {
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={block.id}
              src={block.content}
              alt=""
              className="w-full rounded-[16px] object-cover"
            />
          );
        }

        return (
          <p key={block.id} className="text-base md:text-lg leading-[1.8]" style={{ color: 'var(--muted)' }}>
            {block.content}
          </p>
        );
      })}
    </div>
  );
}

export function BlogPostDetail({ post, related = [] }: { post: BlogPost; related?: BlogPost[] }) {
  const ref  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    addReveal(el, el.querySelectorAll(".post-hero"),    { duration: 1.3, y: 60, start: "top 90%" });
    addReveal(el, el.querySelectorAll(".post-meta"),    { duration: 1,   y: 30, start: "top 90%" });
    addReveal(el, el.querySelectorAll(".post-body"),    { duration: 1.1, y: 40, start: "top 88%" });
    addReveal(el, el.querySelectorAll(".related-card"), { stagger: 0.1, duration: 1, y: 50, start: "top 88%" });
  }, []);

  return (
    <div ref={ref}>

      {/* ── Hero image (full margin) ── */}
      <section className="px-6 md:px-[136px] pt-32 md:pt-40 pb-0">
        <div className="post-hero relative rounded-[28px] overflow-hidden h-[300px] md:h-[520px]">
          <Image
            src={post.img}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover scale-[1.01]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Title + meta — centered, narrower ── */}
      <section className="px-6 py-10 md:py-14">
        <div className="post-meta max-w-[720px] mx-auto flex flex-col gap-4">
          <h1
            className="font-bricolage font-bold text-4xl md:text-[52px] leading-[1.05] tracking-tight"
            style={{ color: "var(--fg)" }}
          >
            {post.title}
          </h1>
          <p className="text-lg md:text-xl leading-[1.6]" style={{ color: "var(--muted)" }}>
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 pt-6 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #ef6600, #cb0000)" }}
            >
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-bold" style={{ color: "var(--fg)" }}>{post.author}</p>
              <p className="text-xs"            style={{ color: "var(--muted)" }}>{post.authorRole}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm" style={{ color: "var(--muted)" }}>{post.date}</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{post.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body — centered, narrower ── */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="post-body max-w-[720px] mx-auto flex flex-col gap-8">
          {post.blocks && post.blocks.length > 0 ? (
            <BlocksRenderer blocks={post.blocks} />
          ) : (
            <>
              <p className="text-lg md:text-xl leading-[1.8] font-medium" style={{ color: "var(--fg)" }}>
                {post.body.intro}
              </p>
              <div className="w-12 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #ef6600, #cb0000)" }} />
              {post.body.sections.map((s) => (
                <div key={s.heading} className="flex flex-col gap-4">
                  <h2
                    className="font-bricolage font-bold text-2xl md:text-3xl leading-[1.15] tracking-tight"
                    style={{ color: "var(--fg)" }}
                  >
                    {s.heading}
                  </h2>
                  <p className="text-base md:text-lg leading-[1.8]" style={{ color: "var(--muted)" }}>
                    {s.content}
                  </p>
                </div>
              ))}
              {post.body.conclusion && (
                <div className="glass-card p-8 md:p-10 rounded-[20px] flex flex-col gap-4">
                  <p className="text-base md:text-lg leading-[1.8]" style={{ color: "var(--fg)" }}>
                    {post.body.conclusion}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Related posts — full margin ── */}
      {related.length > 0 && (
        <section
          className="px-6 md:px-[136px] py-16 md:py-24"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex flex-col gap-10">
            <div>
              <h2
                className="font-bricolage font-bold text-3xl md:text-4xl leading-[1.1] tracking-tight mt-2"
                style={{ color: "var(--fg)" }}
              >
                More from the trade desk.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <article
                    className="related-card group glass-card flex flex-col rounded-[28px] overflow-hidden h-full"
                  >
                    <div className="relative h-[180px] overflow-hidden">
                      <Image
                        src={r.img}
                        alt={r.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-6 flex-1">
                      <span className="text-[11px] font-bold tracking-[2px] uppercase" style={{ color: "#ef6600" }}>
                        {r.category}
                      </span>
                      <h3
                        className="font-bricolage font-bold text-lg leading-[1.25] tracking-tight"
                        style={{ color: "var(--fg)" }}
                      >
                        {r.title}
                      </h3>
                      <p className="text-sm leading-[1.5] flex-1" style={{ color: "var(--muted)" }}>
                        {r.excerpt}
                      </p>
                      <p
                        className="text-xs mt-auto pt-4"
                        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
                      >
                        {r.date} · {r.readTime}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-bold tracking-tight transition-opacity hover:opacity-60"
              style={{ color: "var(--fg)" }}
            >
              <span>←</span>
              <span>Back to all posts</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
