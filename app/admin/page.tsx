'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import type { BlogPost } from '@/lib/models/blog';
import BlogEditor from './BlogEditor';

/* ─── Constants ─────────────────────────────────────────────────────────── */

const SS_TOKEN = 'gm_admin_token';

/* ─── Types ─────────────────────────────────────────────────────────────── */

type View = 'dashboard' | 'blog-editor';
type Section = 'overview' | 'blog';

/* ─── Default templates ──────────────────────────────────────────────────── */

const defaultBlog: BlogPost = {
  slug: '',
  img: '/assets/featured-case-1.png',
  category: 'Programmatic',
  title: '',
  excerpt: '',
  author: '',
  authorRole: '',
  date: new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }),
  readTime: '5 min read',
  body: { intro: '', sections: [], conclusion: '' },
  blocks: [],
  tags: [],
  relatedSlugs: [],
  status: 'draft',
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ─── Root component ─────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [token, setToken] = useState('');
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SS_TOKEN);
    if (stored) { setToken(stored); setAuthed(true); }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) { setPwErr('Incorrect password. Try again.'); return; }
      const { token: t } = await res.json();
      sessionStorage.setItem(SS_TOKEN, t);
      setToken(t);
      setAuthed(true);
    } catch {
      setPwErr('Login failed. Please try again.');
    } finally {
      setLogging(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SS_TOKEN);
    setToken('');
    setAuthed(false);
    setPw('');
    setPwErr('');
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex">
        {/* Left decorative panel */}
        <div className="hidden lg:flex w-[420px] shrink-0 flex-col justify-between p-12 bg-[#0d0d0d] border-r border-white/[0.06] relative overflow-hidden">
          {/* Gradient blob */}
          <div
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #ef6600 0%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 right-0 w-[280px] h-[280px] rounded-full opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #cb0000 0%, transparent 70%)' }}
          />

          {/* Logo */}
          <div className="relative z-10">
            <Image
              src="/assets/gomobile-darkmode.svg"
              alt="Go Mobile"
              width={120}
              height={36}
              className="h-8 w-auto"
            />
          </div>

          {/* Copy */}
          <div className="relative z-10 flex flex-col gap-4">
            <h2 className="font-bricolage font-bold text-3xl leading-tight text-white">
              Your content,<br />
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                your control.
              </span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-[280px]">
              Draft blog posts, export TypeScript, and ship to production in minutes.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span className="text-white/30 text-xs">ISR active — pages revalidate hourly</span>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-white/20 text-xs">
            Go Mobile CMS · Internal use only
          </div>
        </div>

        {/* Right login form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <div className="mb-8">
              {/* Mobile logo */}
              <div className="lg:hidden mb-6">
                <Image
                  src="/assets/gomobile-darkmode.svg"
                  alt="Go Mobile"
                  width={100}
                  height={30}
                  className="h-7 w-auto"
                />
              </div>
              <h1 className="text-2xl font-bold text-white font-bricolage">Sign in to CMS</h1>
              <p className="text-white/40 text-sm mt-1">Enter your password to continue</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-white/40 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={pw}
                  onChange={(e) => {
                    setPw(e.target.value);
                    setPwErr('');
                  }}
                  className="w-full bg-white/[0.06] border border-white/[0.10] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/50 transition-colors placeholder:text-white/20"
                  placeholder="••••••••••••"
                  autoFocus
                />
                {pwErr && <p className="text-red-400 text-xs mt-1.5">{pwErr}</p>}
              </div>
              <button
                type="submit"
                disabled={logging}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl py-3 text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {logging ? 'Signing in…' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}

/* ─── Dashboard ──────────────────────────────────────────────────────────── */

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [view, setView] = useState<View>('dashboard');
  const [activeSection, setActiveSection] = useState<Section>('overview');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const blogRef = useRef<HTMLDivElement>(null);
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const authHeader = { Authorization: `Bearer ${token}` };

  const showToast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    setToast(msg);
    setToastType(type);
    setTimeout(() => setToast(''), 3500);
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      const bRes = await fetch('/api/blog?status=all', { headers: authHeader });
      if (bRes.ok) setBlogs(await bRes.json());
    } catch {
      showToast('Failed to load content', 'error');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  async function handleSaveBlog(post: BlogPost, status: 'draft' | 'published') {
    setSaving(true);
    try {
      const exists = blogs.some((b) => b.slug === post.slug);
      const url = exists ? `/api/blog/${post.slug}` : '/api/blog';
      const method = exists ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', ...authHeader },
        body: JSON.stringify({ ...post, status }),
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err.error || 'Save failed', 'error');
        return;
      }
      await fetchAll();
      setView('dashboard');
      setEditingBlog(null);
      showToast(status === 'published' ? 'Blog post published ✓' : 'Saved as draft ✓');
    } catch {
      showToast('Save failed', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteBlog(slug: string) {
    try {
      await fetch(`/api/blog/${slug}`, { method: 'DELETE', headers: authHeader });
      await fetchAll();
      setDeleteConfirm(null);
      showToast('Post deleted');
    } catch {
      showToast('Delete failed', 'error');
    }
  }

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function navTo(section: Section) {
    setActiveSection(section);
    if (section === 'blog') setTimeout(() => scrollTo(blogRef), 50);
    if (section === 'overview') {
      mainScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const publishedBlogs = blogs.filter((b) => b.status === 'published');
  const draftBlogs = blogs.filter((b) => b.status === 'draft');

  /* Editor full-screen takeovers */
  if (view === 'blog-editor') {
    return (
      <BlogEditor
        initial={editingBlog ?? defaultBlog}
        allBlogSlugs={blogs.map((b) => b.slug)}
        onSave={handleSaveBlog}
        onCancel={() => { setView('dashboard'); setEditingBlog(null); }}
        saving={saving}
      />
    );
  }

  const totalDrafts = draftBlogs.length;

  /* ── Main layout ── */
  return (
    <div className="h-screen flex overflow-hidden bg-[#0a0a0a] text-white">

      {/* ── Left sidebar ── */}
      <aside className="w-56 shrink-0 flex flex-col bg-[#0c0c0c] border-r border-white/[0.06] overflow-hidden">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.06] shrink-0">
          <Image
            src="/assets/gomobile-darkmode.svg"
            alt="Go Mobile"
            width={100}
            height={30}
            className="h-7 w-auto"
          />
        </div>

        {/* Nav */}
        <nav className="flex-1 min-h-0 overflow-y-auto py-4 px-3 flex flex-col gap-6">
          {/* Overview */}
          <div>
            <NavLabel>Overview</NavLabel>
            <NavItem
              icon="⊞"
              label="Dashboard"
              active={activeSection === 'overview'}
              onClick={() => navTo('overview')}
            />
          </div>

          {/* Content */}
          <div>
            <NavLabel>Content</NavLabel>
            <NavItem
              icon="✍"
              label="Blog Posts"
              active={activeSection === 'blog'}
              badge={draftBlogs.length}
              onClick={() => navTo('blog')}
            />
          </div>

          {/* Quick add */}
          <div>
            <NavLabel>Quick Add</NavLabel>
            <NavItem
              icon="+"
              label="New Blog Post"
              onClick={() => { setEditingBlog(null); setView('blog-editor'); }}
            />
          </div>

          {/* Account */}
          <div className="mt-auto">
            <NavLabel>Account</NavLabel>
            <NavItem
              icon="→"
              label="Sign Out"
              danger
              onClick={onLogout}
            />
          </div>
        </nav>

        {/* ISR status */}
        <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
            <span className="text-[10px] text-white/30 leading-tight">ISR · revalidates hourly</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 h-14 border-b border-white/[0.06] bg-[#0c0c0c]/80 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-white/80">
              {activeSection === 'overview' && 'Dashboard'}
              {activeSection === 'blog' && 'Blog Posts'}
            </h1>
            {totalDrafts > 0 && (
              <span className="px-2 py-0.5 bg-orange-500/15 text-orange-400 text-[10px] font-bold rounded-full">
                {totalDrafts} pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setEditingBlog(null); setView('blog-editor'); }}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              + New Post
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div ref={mainScrollRef} className="flex-1 min-h-0 overflow-y-auto">
          <div className="px-8 py-8 flex flex-col gap-8 max-w-5xl mx-auto w-full">

            {/* Welcome banner */}
            <div className="relative rounded-2xl overflow-hidden bg-[#111] border border-white/[0.07] px-8 py-7">
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-25 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #ef6600 0%, transparent 70%)' }}
              />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-1">
                    {getGreeting()}
                  </p>
                  <h2 className="font-bricolage font-bold text-2xl text-white leading-tight">
                    Go Mobile CMS
                  </h2>
                  {totalDrafts > 0 ? (
                    <p className="text-white/50 text-sm mt-1.5">
                      You have{' '}
                      <span className="text-orange-400 font-semibold">{totalDrafts} draft{totalDrafts !== 1 ? 's' : ''}</span>{' '}
                      waiting to be exported and published.
                    </p>
                  ) : (
                    <p className="text-white/50 text-sm mt-1.5">
                      All caught up — create a new post to get started.
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-3xl">✦</div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                value={loading ? '…' : publishedBlogs.length}
                label="Blog Posts"
                sub="published"
                icon="✍"
              />
              <StatCard
                value={loading ? '…' : totalDrafts}
                label="Drafts"
                sub="unpublished"
                icon="⏳"
                accent={totalDrafts > 0}
              />
              <StatCard
                value={loading ? '…' : blogs.length}
                label="Total"
                sub="all content"
                icon="⟳"
                green
              />
            </div>

            {/* Blog Posts section */}
            <div ref={blogRef} className="flex flex-col gap-4">
              <SectionHeader
                title="Blog Posts"
                published={publishedBlogs.length}
                drafts={draftBlogs.length}
                primaryLabel="+ New Blog Post"
                onPrimary={() => { setEditingBlog(null); setView('blog-editor'); }}
              />

              {loading && (
                <p className="text-white/30 text-sm px-1">Loading…</p>
              )}

              {!loading && draftBlogs.length > 0 && (
                <PostGroup label="Drafts" accent>
                  {draftBlogs.map((post) => (
                    <PostRow
                      key={post.slug}
                      title={post.title || '(Untitled)'}
                      meta={[post.category, post.date].filter(Boolean).join(' · ')}
                      img={post.img}
                      status="draft"
                      onEdit={() => { setEditingBlog(post); setView('blog-editor'); }}
                      onDelete={() => setDeleteConfirm(`blog:${post.slug}`)}
                    />
                  ))}
                </PostGroup>
              )}

              {!loading && (
                <PostGroup label="Published" dimmed>
                  {publishedBlogs.map((post) => (
                    <PostRow
                      key={post.slug}
                      title={post.title}
                      meta={[post.category, post.date].filter(Boolean).join(' · ')}
                      img={post.img}
                      status="published"
                      onEdit={() => { setEditingBlog(post); setView('blog-editor'); }}
                      onDuplicate={() => {
                        setEditingBlog({ ...post, slug: post.slug + '-copy', title: post.title + ' (Copy)', status: 'draft' });
                        setView('blog-editor');
                      }}
                    />
                  ))}
                </PostGroup>
              )}
            </div>

            {/* Workflow hint */}
            <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.015] flex items-start gap-3">
              <span className="text-base shrink-0 mt-0.5">💡</span>
              <p className="text-white/30 text-xs leading-relaxed">
                <strong className="text-white/50">Publishing workflow:</strong> Use{' '}
                <span className="text-white/50">Save as Draft</span> to store privately, or{' '}
                <span className="text-orange-400/70">Publish</span> to make it live instantly.
                Blog posts are stored in MongoDB — no code changes or deployments needed.
              </p>
            </div>

            {/* Case studies moved out of the CMS */}
            <div className="border border-white/[0.06] rounded-xl p-4 bg-white/[0.015] flex items-start gap-3 mb-10">
              <span className="text-base shrink-0 mt-0.5">📊</span>
              <p className="text-white/30 text-xs leading-relaxed">
                <strong className="text-white/50">Case studies live in the repo.</strong> They are
                edited in{' '}
                <code className="text-white/50 bg-white/[0.06] px-1 py-0.5 rounded">content/case-studies.json</code>{' '}
                and ship with a deploy, so changes get reviewed like code. Array order in that file
                is the order they appear on the site.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 bg-[#1a1a1a] border text-sm px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-xl ${
          toastType === 'error'
            ? 'border-red-500/30 text-red-400'
            : 'border-green-500/30 text-green-400'
        }`}>
          {toast}
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-white font-semibold mb-2">Delete draft?</h3>
            <p className="text-white/50 text-sm mb-5">This cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="border border-white/15 text-white/60 hover:text-white rounded-lg px-4 py-2 text-sm transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteBlog(deleteConfirm.replace('blog:', ''))}
                className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 rounded-lg px-4 py-2 text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/* ─── Sidebar primitives ─────────────────────────────────────────────────── */

function NavLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest px-2 mb-1">
      {children}
    </p>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  danger = false,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  danger?: boolean;
  badge?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-left text-sm transition-all ${
        active
          ? 'bg-orange-500/15 text-orange-400 font-semibold'
          : danger
          ? 'text-white/30 hover:text-red-400 hover:bg-red-500/[0.07]'
          : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
      }`}
    >
      <span className="text-[13px] shrink-0 w-4 text-center leading-none">{icon}</span>
      <span className="flex-1 truncate">{label}</span>
      {badge != null && badge > 0 && (
        <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded-full shrink-0">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─── Dashboard primitives ───────────────────────────────────────────────── */

function StatCard({
  value,
  label,
  sub,
  icon,
  accent = false,
  green = false,
}: {
  value: number | string;
  label: string;
  sub: string;
  icon: string;
  accent?: boolean;
  green?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 flex flex-col gap-3 ${
        accent
          ? 'bg-orange-500/[0.07] border-orange-500/20'
          : green
          ? 'bg-green-500/[0.05] border-green-500/15'
          : 'bg-white/[0.025] border-white/[0.06]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-base">{icon}</span>
        <span className={`text-xs font-medium ${accent ? 'text-orange-400/60' : green ? 'text-green-400/60' : 'text-white/25'}`}>
          {sub}
        </span>
      </div>
      <div>
        <p className={`text-3xl font-bold font-bricolage leading-none ${accent ? 'text-orange-400' : green ? 'text-green-400' : 'text-white'}`}>
          {value}
        </p>
        <p className="text-xs text-white/40 mt-1">{label}</p>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  published,
  drafts,
  primaryLabel,
  onPrimary,
}: {
  title: string;
  published: number;
  drafts: number;
  primaryLabel: string;
  onPrimary: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-bold text-white">{title}</h2>
        <p className="text-white/30 text-xs mt-0.5">
          {published} published
          {drafts > 0 && (
            <> · <span className="text-orange-400/70">{drafts} draft{drafts !== 1 ? 's' : ''}</span></>
          )}
        </p>
      </div>
      <button
        onClick={onPrimary}
        className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
      >
        {primaryLabel}
      </button>
    </div>
  );
}

function PostGroup({
  label,
  accent = false,
  dimmed = false,
  children,
}: {
  label: string;
  accent?: boolean;
  dimmed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className={`text-[10px] font-semibold uppercase tracking-widest mb-2 px-1 ${
        accent ? 'text-orange-400/60' : dimmed ? 'text-white/20' : 'text-white/35'
      }`}>
        {label}
      </p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function PostRow({
  title,
  meta,
  img,
  status,
  onEdit,
  onDelete,
  onExport,
  onDuplicate,
}: {
  title: string;
  meta: string;
  img?: string;
  status: 'draft' | 'published';
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onDuplicate?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-white/[0.025] border border-white/[0.06] rounded-xl px-3 py-2.5 hover:bg-white/[0.04] transition-colors group">
      {/* Thumbnail */}
      {img && (
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/[0.05]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{title}</p>
        <p className="text-xs text-white/30 truncate mt-0.5">{meta}</p>
      </div>
      <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {onEdit && (
          <button onClick={onEdit} className="text-white/50 hover:text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-white/[0.07] transition-all">
            Edit
          </button>
        )}
        {onDuplicate && (
          <button onClick={onDuplicate} className="text-white/40 hover:text-white text-xs px-2.5 py-1.5 rounded-lg hover:bg-white/[0.07] transition-all">
            Duplicate
          </button>
        )}
        {onExport && (
          <button onClick={onExport} className="text-orange-400/60 hover:text-orange-400 text-xs px-2.5 py-1.5 rounded-lg hover:bg-orange-500/[0.08] transition-all">
            Export
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="text-white/25 hover:text-red-400 text-xs px-2.5 py-1.5 rounded-lg hover:bg-red-500/[0.08] transition-all">
            Delete
          </button>
        )}
      </div>
      <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold ${
        status === 'draft' ? 'bg-orange-500/15 text-orange-400' : 'bg-green-500/12 text-green-400'
      }`}>
        {status === 'draft' ? 'DRAFT' : 'LIVE'}
      </span>
    </div>
  );
}

