'use client';

import { useState, useRef, useEffect } from 'react';
import type { BlogPost, ContentBlock, SEOMeta } from '@/lib/models/blog';
import { Field, ChipInput, AdminHeader, inputCls } from './components';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['Programmatic', 'Creative', 'CTV', 'Measurement', 'Industry'];

const ASSETS = [
  '/assets/featured-case-1.png',
  '/assets/featured-case-2.png',
  '/assets/featured-case-3.png',
  '/assets/service-thumb-programmatic.png',
  '/assets/service-thumb-video.png',
  '/assets/service-thumb-richmedia.png',
  '/assets/service-thumb-social.png',
];

type BType = ContentBlock['type'];

const BLOCK_TYPES: { type: BType; label: string; badge: string; desc: string }[] = [
  { type: 'paragraph',  label: 'Paragraph',  badge: 'P',  desc: 'Regular body text' },
  { type: 'heading2',   label: 'Heading 2',  badge: 'H2', desc: 'Large section heading' },
  { type: 'heading3',   label: 'Heading 3',  badge: 'H3', desc: 'Medium subheading' },
  { type: 'quote',      label: 'Quote',      badge: '"',  desc: 'Pull quote or blockquote' },
  { type: 'callout',    label: 'Callout',    badge: '!',  desc: 'Highlighted info box' },
  { type: 'bulletList', label: 'List',       badge: '≡',  desc: 'Bullet list (one per line)' },
  { type: 'image',      label: 'Image',      badge: '⬜', desc: 'Image from URL' },
  { type: 'divider',    label: 'Divider',    badge: '—',  desc: 'Horizontal separator' },
];

const emptySeo: SEOMeta = {
  metaTitle: '',
  metaDescription: '',
  focusKeyword: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonical: '',
  noIndex: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function autoResize(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

// ─── TypePicker ───────────────────────────────────────────────────────────────

function TypePicker({
  current,
  onSelect,
  onClose,
}: {
  current: BType;
  onSelect: (t: BType) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute left-0 top-full mt-1 z-50 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-2xl py-1.5 w-52"
    >
      {BLOCK_TYPES.map((bt) => (
        <button
          key={bt.type}
          type="button"
          onClick={() => { onSelect(bt.type); onClose(); }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/[0.07] transition-colors ${
            current === bt.type ? 'bg-orange-500/10' : ''
          }`}
        >
          <span
            className={`w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-bold shrink-0 ${
              current === bt.type
                ? 'bg-orange-500/20 text-orange-400'
                : 'bg-white/[0.07] text-white/50'
            }`}
          >
            {bt.badge}
          </span>
          <div>
            <div className="text-xs font-medium text-white/80">{bt.label}</div>
            <div className="text-[10px] text-white/30">{bt.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── BlockItem ────────────────────────────────────────────────────────────────

function BlockItem({
  block,
  canMoveUp,
  canMoveDown,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onUpdate: (u: Partial<ContentBlock>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [hovered, setHovered] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (taRef.current) autoResize(taRef.current);
  }, [block.content, block.type]);

  const bt = BLOCK_TYPES.find((b) => b.type === block.type)!;
  const taBase =
    'w-full bg-transparent resize-none focus:outline-none placeholder:text-white/20 leading-relaxed';

  function renderContent() {
    if (block.type === 'divider') {
      return (
        <div className="py-3 flex items-center gap-3">
          <hr className="flex-1 border-white/[0.10]" />
          <span className="text-white/15 text-[10px] font-mono tracking-widest">DIVIDER</span>
          <hr className="flex-1 border-white/[0.10]" />
        </div>
      );
    }

    if (block.type === 'image') {
      return (
        <div className="space-y-2 w-full">
          <input
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full bg-transparent text-sm text-white/60 placeholder:text-white/20 focus:outline-none border-b border-white/10 pb-1.5"
            placeholder="Paste image URL (https://...)..."
          />
          {block.content && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.content} alt="" className="max-h-56 rounded-xl object-cover opacity-80 border border-white/[0.07]" />
          )}
        </div>
      );
    }

    if (block.type === 'heading2') {
      return (
        <input
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full bg-transparent text-[30px] font-bold text-white/90 placeholder:text-white/15 focus:outline-none font-bricolage leading-tight"
          placeholder="Heading 2..."
        />
      );
    }

    if (block.type === 'heading3') {
      return (
        <input
          value={block.content}
          onChange={(e) => onUpdate({ content: e.target.value })}
          className="w-full bg-transparent text-xl font-semibold text-white/85 placeholder:text-white/15 focus:outline-none leading-tight"
          placeholder="Heading 3..."
        />
      );
    }

    if (block.type === 'quote') {
      return (
        <div className="pl-4 border-l-2 border-orange-500/40">
          <textarea
            ref={taRef}
            value={block.content}
            onChange={(e) => { onUpdate({ content: e.target.value }); autoResize(e.target); }}
            className={`${taBase} text-white/55 italic text-base`}
            placeholder="Enter a quote or pull text..."
            rows={2}
          />
        </div>
      );
    }

    if (block.type === 'callout') {
      return (
        <div className="bg-orange-500/[0.06] border border-orange-500/15 rounded-xl px-4 py-3">
          <textarea
            ref={taRef}
            value={block.content}
            onChange={(e) => { onUpdate({ content: e.target.value }); autoResize(e.target); }}
            className={`${taBase} text-white/75 text-sm`}
            placeholder="Highlight a key takeaway or important note..."
            rows={2}
          />
        </div>
      );
    }

    if (block.type === 'bulletList') {
      return (
        <div>
          <textarea
            ref={taRef}
            value={block.content}
            onChange={(e) => { onUpdate({ content: e.target.value }); autoResize(e.target); }}
            className={`${taBase} text-white/80 text-base`}
            placeholder="One item per line..."
            rows={3}
          />
          <p className="text-white/20 text-[10px] mt-1">Each line becomes a bullet point</p>
        </div>
      );
    }

    return (
      <textarea
        ref={taRef}
        value={block.content}
        onChange={(e) => { onUpdate({ content: e.target.value }); autoResize(e.target); }}
        className={`${taBase} text-white/75 text-base`}
        placeholder="Start writing..."
        rows={3}
      />
    );
  }

  return (
    <div
      className={`group relative flex gap-3 rounded-xl px-3 py-2.5 transition-colors ${
        hovered ? 'bg-white/[0.025]' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Type badge */}
      <div className="relative shrink-0 pt-0.5">
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          title="Change block type"
          className={`w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-bold transition-all ${
            hovered || showPicker
              ? 'bg-white/[0.07] text-white/50 hover:bg-orange-500/15 hover:text-orange-400'
              : 'bg-transparent text-transparent'
          }`}
        >
          {bt.badge}
        </button>
        {showPicker && (
          <TypePicker
            current={block.type}
            onSelect={(t) => onUpdate({ type: t })}
            onClose={() => setShowPicker(false)}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">{renderContent()}</div>

      {/* Actions */}
      <div
        className={`shrink-0 flex flex-col gap-0.5 pt-0.5 transition-opacity ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed text-xs transition-colors"
          title="Move up"
        >↑</button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed text-xs transition-colors"
          title="Move down"
        >↓</button>
        <button
          type="button"
          onClick={onDelete}
          className="w-6 h-6 flex items-center justify-center text-white/20 hover:text-red-400 text-xs transition-colors"
          title="Delete block"
        >✕</button>
      </div>
    </div>
  );
}

// ─── AddBlockButton ───────────────────────────────────────────────────────────

function AddBlockButton({ onAdd }: { onAdd: (type: BType) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  return (
    <div ref={ref} className="relative mt-4 px-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white/25 hover:text-white/55 text-sm transition-colors group"
      >
        <span className="w-6 h-6 rounded-full border border-white/[0.15] group-hover:border-orange-500/40 group-hover:text-orange-400 flex items-center justify-center text-xs transition-all">
          +
        </span>
        <span className="text-xs">Add block</span>
      </button>

      {open && (
        <div className="absolute left-3 top-full mt-1 z-50 bg-[#1a1a1a] border border-white/15 rounded-xl shadow-2xl py-2 w-64">
          <p className="text-[10px] text-white/30 px-3 pb-1.5 font-medium uppercase tracking-wider">
            Choose block type
          </p>
          <div className="grid grid-cols-2 gap-0.5 px-2">
            {BLOCK_TYPES.map((bt) => (
              <button
                key={bt.type}
                type="button"
                onClick={() => { onAdd(bt.type); setOpen(false); }}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/[0.07] text-left transition-colors"
              >
                <span className="w-7 h-7 flex items-center justify-center bg-white/[0.06] text-white/50 rounded-lg text-[10px] font-bold shrink-0">
                  {bt.badge}
                </span>
                <span className="text-xs text-white/65">{bt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SidebarSection ───────────────────────────────────────────────────────────

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-3 border-b border-white/[0.05] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-2 text-left"
      >
        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-white/20 text-[9px]">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="space-y-3">{children}</div>}
    </div>
  );
}

// ─── CharCounter ──────────────────────────────────────────────────────────────

function CharCounter({ current, max }: { current: number; max: number }) {
  const pct = current / max;
  const color = pct > 1 ? 'text-red-400' : pct > 0.85 ? 'text-yellow-400' : 'text-white/25';
  return <span className={`text-[10px] tabular-nums ${color}`}>{current}/{max}</span>;
}

// ─── Main: BlogEditor ─────────────────────────────────────────────────────────

interface Props {
  initial: BlogPost;
  allBlogSlugs: string[];
  onSave: (post: BlogPost, status: 'draft' | 'published') => void;
  onCancel: () => void;
  saving?: boolean;
}

export default function BlogEditor({ initial, allBlogSlugs, onSave, onCancel, saving }: Props) {
  const [post, setPost] = useState<BlogPost>(initial);
  const [blocks, setBlocks] = useState<ContentBlock[]>(
    initial.blocks?.length
      ? initial.blocks
      : [{ id: uid(), type: 'paragraph', content: '' }]
  );
  const [seo, setSeo] = useState<SEOMeta>(initial.seo ?? { ...emptySeo });
  const [sidebarTab, setSidebarTab] = useState<'post' | 'seo'>('post');
  const [tagInput, setTagInput] = useState('');
  const [slugLocked, setSlugLocked] = useState(!!initial.slug);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (titleRef.current) autoResize(titleRef.current);
  }, []);

  const set = <K extends keyof BlogPost>(k: K, v: BlogPost[K]) =>
    setPost((p) => ({ ...p, [k]: v }));

  const setSeoField = <K extends keyof SEOMeta>(k: K, v: SEOMeta[K]) =>
    setSeo((s) => ({ ...s, [k]: v }));

  function handleTitleChange(val: string) {
    set('title', val);
    if (!slugLocked) set('slug', toSlug(val));
    if (titleRef.current) autoResize(titleRef.current);
  }

  function updateBlock(id: string, updates: Partial<ContentBlock>) {
    setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  }

  function deleteBlock(id: string) {
    setBlocks((bs) => {
      const rem = bs.filter((b) => b.id !== id);
      return rem.length ? rem : [{ id: uid(), type: 'paragraph', content: '' }];
    });
  }

  function moveBlock(id: string, dir: 'up' | 'down') {
    setBlocks((bs) => {
      const i = bs.findIndex((b) => b.id === id);
      if (i < 0) return bs;
      const j = dir === 'up' ? i - 1 : i + 1;
      if (j < 0 || j >= bs.length) return bs;
      const next = [...bs];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function addBlock(type: BType) {
    setBlocks((bs) => [...bs, { id: uid(), type, content: '' }]);
  }

  function addTag() {
    const t = tagInput.trim().toUpperCase();
    if (t && !post.tags.includes(t)) set('tags', [...post.tags, t]);
    setTagInput('');
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!post.title.trim()) e.title = 'Title is required';
    if (!post.slug.trim()) e.slug = 'Slug is required';
    if (!post.excerpt.trim()) e.excerpt = 'Excerpt is required';
    if (!post.author.trim()) e.author = 'Author is required';
    setErrors(e);
    if (Object.keys(e).length > 0) setSidebarTab('post');
    return Object.keys(e).length === 0;
  }

  function handleSave(status: 'draft' | 'published') {
    if (!validate()) return;
    onSave({ ...post, blocks, seo }, status);
  }

  const metaTitlePreview = seo.metaTitle || post.title;
  const metaDescPreview = seo.metaDescription || post.excerpt;

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      <AdminHeader
        breadcrumbs={['Blog Posts', post.title || 'New Post']}
        onPrimary={() => handleSave('published')}
        primaryLabel="Publish"
        onSecondary={() => handleSave('draft')}
        secondaryLabel="Save as Draft"
        onCancel={onCancel}
        saving={saving}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* ── Sidebar ── */}
        <aside className="w-72 shrink-0 border-r border-white/[0.07] bg-[#0c0c0c] flex flex-col">
          {/* Tab switcher */}
          <div className="flex border-b border-white/[0.07] p-1 gap-1 shrink-0">
            {(['post', 'seo'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSidebarTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  sidebarTab === t
                    ? 'bg-white/[0.08] text-white'
                    : 'text-white/35 hover:text-white/60'
                }`}
              >
                {t === 'post' ? 'Post Settings' : '🔍 SEO'}
              </button>
            ))}
          </div>

          {/* Sidebar content */}
          <div className="flex-1 min-h-0 overflow-y-auto px-4">
            {sidebarTab === 'post' && (
              <>
                {/* Cover image */}
                <SidebarSection title="Cover Image">
                  <select
                    value={post.img}
                    onChange={(e) => set('img', e.target.value)}
                    className={inputCls()}
                  >
                    {ASSETS.map((a) => (
                      <option key={a} value={a}>{a.split('/').pop()}</option>
                    ))}
                  </select>
                  <div className="relative h-20 rounded-lg overflow-hidden border border-white/[0.07]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt="" className="w-full h-full object-cover opacity-70" />
                  </div>
                </SidebarSection>

                {/* Excerpt */}
                <SidebarSection title="Excerpt (listing summary)">
                  <textarea
                    value={post.excerpt}
                    onChange={(e) => set('excerpt', e.target.value)}
                    className={`${inputCls(!!errors.excerpt)} resize-none`}
                    rows={3}
                    placeholder="One or two sentences shown in the blog listing..."
                  />
                  {errors.excerpt && (
                    <p className="text-red-400 text-xs mt-1">{errors.excerpt}</p>
                  )}
                </SidebarSection>

                {/* Post details */}
                <SidebarSection title="Post Details">
                  <Field label="Slug (URL)" error={errors.slug}>
                    <input
                      value={post.slug}
                      onChange={(e) => { set('slug', toSlug(e.target.value)); setSlugLocked(true); }}
                      className={inputCls(!!errors.slug)}
                      placeholder="url-slug"
                    />
                    {!errors.slug && post.slug && (
                      <p className="text-white/20 text-[10px] mt-0.5">/blog/{post.slug}</p>
                    )}
                  </Field>
                  <Field label="Category">
                    <select
                      value={post.category}
                      onChange={(e) => set('category', e.target.value)}
                      className={inputCls()}
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Date">
                      <input
                        value={post.date}
                        onChange={(e) => set('date', e.target.value)}
                        className={inputCls()}
                        placeholder="Apr 18, 2026"
                      />
                    </Field>
                    <Field label="Read Time">
                      <input
                        value={post.readTime}
                        onChange={(e) => set('readTime', e.target.value)}
                        className={inputCls()}
                        placeholder="5 min read"
                      />
                    </Field>
                  </div>
                </SidebarSection>

                {/* Author */}
                <SidebarSection title="Author">
                  <Field label="Name" error={errors.author}>
                    <input
                      value={post.author}
                      onChange={(e) => set('author', e.target.value)}
                      className={inputCls(!!errors.author)}
                      placeholder="e.g. Reza Adhi"
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      value={post.authorRole}
                      onChange={(e) => set('authorRole', e.target.value)}
                      className={inputCls()}
                      placeholder="e.g. Head of Programmatic"
                    />
                  </Field>
                </SidebarSection>

                {/* Tags */}
                <SidebarSection title="Tags" defaultOpen={false}>
                  <ChipInput
                    chips={post.tags}
                    input={tagInput}
                    onInputChange={setTagInput}
                    onAdd={addTag}
                    onRemove={(t) => set('tags', post.tags.filter((x) => x !== t))}
                    placeholder="e.g. PROGRAMMATIC"
                    chipStyle="orange"
                  />
                </SidebarSection>

                {/* Related posts */}
                <SidebarSection title="Related Posts" defaultOpen={false}>
                  <div className="flex gap-1.5 flex-wrap min-h-[24px]">
                    {post.relatedSlugs.map((s) => (
                      <span
                        key={s}
                        className="flex items-center gap-1 bg-white/[0.05] border border-white/10 text-white/45 text-[10px] px-2 py-0.5 rounded-full font-mono"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => set('relatedSlugs', post.relatedSlugs.filter((x) => x !== s))}
                          className="opacity-50 hover:opacity-100"
                        >×</button>
                      </span>
                    ))}
                    {post.relatedSlugs.length === 0 && (
                      <span className="text-white/20 text-xs">None selected</span>
                    )}
                  </div>
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value && !post.relatedSlugs.includes(e.target.value))
                        set('relatedSlugs', [...post.relatedSlugs, e.target.value]);
                    }}
                    className={inputCls()}
                  >
                    <option value="">Add related post...</option>
                    {allBlogSlugs
                      .filter((s) => s !== post.slug && !post.relatedSlugs.includes(s))
                      .map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <p className="text-white/20 text-[10px]">Up to 3 posts. Appear at bottom of article.</p>
                </SidebarSection>
              </>
            )}

            {sidebarTab === 'seo' && (
              <>
                {/* Google preview */}
                <SidebarSection title="Google Search Preview">
                  <div className="bg-white rounded-xl p-3 text-left shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-4 h-4 bg-gray-200 rounded-full" />
                      <span className="text-[10px] text-gray-500">gomobile.co</span>
                    </div>
                    <p className="text-[#1a0dab] text-[14px] font-medium leading-tight truncate hover:underline cursor-pointer">
                      {metaTitlePreview || 'Post Title | Go Mobile'}
                    </p>
                    <p className="text-green-700 text-[10px] mt-0.5 truncate">
                      https://gomobile.co/blog/{post.slug || 'post-slug'}
                    </p>
                    <p className="text-[#545454] text-[11px] mt-1 leading-relaxed line-clamp-2">
                      {metaDescPreview || 'Meta description will appear here. Keep it under 160 characters for best results.'}
                    </p>
                  </div>
                </SidebarSection>

                {/* Core SEO */}
                <SidebarSection title="Core SEO">
                  <Field label="Focus Keyword">
                    <input
                      value={seo.focusKeyword}
                      onChange={(e) => setSeoField('focusKeyword', e.target.value)}
                      className={inputCls()}
                      placeholder="e.g. programmatic advertising SEA"
                    />
                    <p className="text-white/20 text-[10px] mt-0.5">
                      Use this keyword in title, first paragraph, and headings
                    </p>
                  </Field>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
                        Meta Title
                      </label>
                      <CharCounter current={seo.metaTitle.length} max={60} />
                    </div>
                    <input
                      value={seo.metaTitle}
                      onChange={(e) => setSeoField('metaTitle', e.target.value)}
                      className={inputCls(seo.metaTitle.length > 60)}
                      placeholder={post.title || 'Custom meta title...'}
                    />
                    <p className="text-white/20 text-[10px] mt-0.5">Blank = uses post title</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] text-white/40 font-medium uppercase tracking-wider">
                        Meta Description
                      </label>
                      <CharCounter current={seo.metaDescription.length} max={160} />
                    </div>
                    <textarea
                      value={seo.metaDescription}
                      onChange={(e) => setSeoField('metaDescription', e.target.value)}
                      className={`${inputCls(seo.metaDescription.length > 160)} resize-none`}
                      rows={3}
                      placeholder={post.excerpt || 'Custom meta description...'}
                    />
                    <p className="text-white/20 text-[10px] mt-0.5">Blank = uses excerpt</p>
                  </div>
                </SidebarSection>

                {/* Social / OG */}
                <SidebarSection title="Social Sharing (Open Graph)" defaultOpen={false}>
                  <Field label="OG Title">
                    <input
                      value={seo.ogTitle}
                      onChange={(e) => setSeoField('ogTitle', e.target.value)}
                      className={inputCls()}
                      placeholder={post.title || 'Title for social shares'}
                    />
                  </Field>
                  <Field label="OG Description">
                    <textarea
                      value={seo.ogDescription}
                      onChange={(e) => setSeoField('ogDescription', e.target.value)}
                      className={`${inputCls()} resize-none`}
                      rows={2}
                      placeholder={post.excerpt || 'Description for social shares'}
                    />
                  </Field>
                  <Field label="OG Image URL">
                    <input
                      value={seo.ogImage}
                      onChange={(e) => setSeoField('ogImage', e.target.value)}
                      className={inputCls()}
                      placeholder={post.img || 'https://...'}
                    />
                    <p className="text-white/20 text-[10px] mt-0.5">1200×630px recommended. Blank = cover image.</p>
                  </Field>
                </SidebarSection>

                {/* Advanced */}
                <SidebarSection title="Advanced" defaultOpen={false}>
                  <Field label="Canonical URL">
                    <input
                      value={seo.canonical}
                      onChange={(e) => setSeoField('canonical', e.target.value)}
                      className={inputCls()}
                      placeholder="https://gomobile.co/blog/..."
                    />
                    <p className="text-white/20 text-[10px] mt-0.5">Leave blank unless this is a duplicate page</p>
                  </Field>

                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <button
                      type="button"
                      onClick={() => setSeoField('noIndex', !seo.noIndex)}
                      className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
                        seo.noIndex ? 'bg-red-500' : 'bg-white/20'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${
                          seo.noIndex ? 'left-[18px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                    <div>
                      <p className="text-sm text-white/60">No-index this page</p>
                      <p className="text-[10px] text-white/25">Hides page from Google. Use for drafts/private content.</p>
                    </div>
                  </label>
                </SidebarSection>

                {/* SEO checklist */}
                <SidebarSection title="SEO Checklist" defaultOpen={false}>
                  {[
                    { label: 'Title set',           ok: !!post.title.trim() },
                    { label: 'Excerpt written',     ok: !!post.excerpt.trim() },
                    { label: 'Focus keyword set',   ok: !!seo.focusKeyword.trim() },
                    { label: 'Meta title ≤ 60 chars', ok: seo.metaTitle.length <= 60 || !seo.metaTitle },
                    { label: 'Meta desc ≤ 160 chars', ok: seo.metaDescription.length <= 160 || !seo.metaDescription },
                    { label: 'Slug configured',     ok: !!post.slug.trim() },
                    { label: 'Cover image set',     ok: !!post.img },
                    { label: 'Tags added',          ok: post.tags.length > 0 },
                    { label: 'Author set',          ok: !!post.author.trim() },
                    { label: 'Content blocks added', ok: blocks.some((b) => b.content.trim()) },
                  ].map(({ label, ok }) => (
                    <div key={label} className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                        ok ? 'bg-green-500/20 text-green-400' : 'bg-white/[0.05] text-white/20'
                      }`}>
                        {ok ? '✓' : '○'}
                      </span>
                      <span className={`text-xs ${ok ? 'text-white/55' : 'text-white/25'}`}>{label}</span>
                    </div>
                  ))}
                </SidebarSection>
              </>
            )}
          </div>
        </aside>

        {/* ── Main canvas ── */}
        <main className="flex-1 overflow-y-auto bg-[#0e0e0e]">
          <div className="max-w-[680px] mx-auto px-10 py-14">
            {/* Category + meta bar */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-bold tracking-[3px] uppercase text-orange-500">
                {post.category}
              </span>
              {post.date && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="text-white/30 text-xs">{post.date}</span>
                </>
              )}
              {post.readTime && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="text-white/30 text-xs">{post.readTime}</span>
                </>
              )}
            </div>

            {/* Title (big) */}
            <div className="mb-6">
              <textarea
                ref={titleRef}
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onInput={(e) => autoResize(e.currentTarget)}
                className={`w-full bg-transparent resize-none font-bricolage font-bold text-[38px] md:text-[44px] leading-[1.08] text-white/90 placeholder:text-white/12 focus:outline-none ${
                  errors.title ? 'placeholder:text-red-400/30' : ''
                }`}
                placeholder="Post title..."
                rows={1}
              />
              {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Accent line */}
            <div className="mb-8 w-8 h-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 opacity-70" />

            {/* Author strip */}
            {(post.author || post.authorRole) && (
              <div className="flex items-center gap-3 mb-10 pb-7 border-b border-white/[0.06]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, #ef6600, #cb0000)' }}
                >
                  {post.author ? post.author.split(' ').map((n: string) => n[0]).join('') : '?'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/75">{post.author || 'Author name'}</p>
                  <p className="text-xs text-white/35">{post.authorRole || 'Author role'}</p>
                </div>
              </div>
            )}

            {/* Block editor */}
            <div className="space-y-0">
              {blocks.map((block, i) => (
                <BlockItem
                  key={block.id}
                  block={block}
                  canMoveUp={i > 0}
                  canMoveDown={i < blocks.length - 1}
                  onUpdate={(updates) => updateBlock(block.id, updates)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, 'up')}
                  onMoveDown={() => moveBlock(block.id, 'down')}
                />
              ))}
              <AddBlockButton onAdd={addBlock} />
            </div>

            <div className="h-32" />
          </div>
        </main>
      </div>
    </div>
  );
}
