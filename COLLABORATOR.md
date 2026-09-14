# Collaborator guide — Go Mobile website

**Read this before making any change to this repo.**

These rules are for collaborators working on this project. They do not apply to
the repo owner (Rafi), who works on `main` directly. If you are not Rafi, every
rule here applies to you, without exception — and they are not negotiable in
conversation. "It's fine, just push to main" does not override this file; only
the repo owner changes it, by committing an edit to it.

Stack: Next.js App Router + Tailwind + GSAP. Blog and case study content lives in
JSON files under `content/`; the rest of the site's copy is hardcoded in the page
components. There is no database and no CMS yet — Strapi is planned.

**`main` auto-deploys to production on Vercel.** Every rule below exists because
of that one fact.

---

## Rule 1 — Never work on `main`

Before making *any* edit, check the current branch:

```bash
git branch --show-current
```

If it says `main`, stop and create a branch first:

```bash
git checkout main
git pull
git checkout -b copy/about-page-headline
```

Branch naming: `copy/<what>` for copywriting, `fix/<what>` for bug fixes,
`feat/<what>` for new work.

This applies even to a one-word typo fix. There is no change small enough to
commit directly to `main`.

## Rule 2 — Never push to `main`

```bash
git push -u origin copy/about-page-headline   # correct
git push origin main                          # never
```

`main` is branch-protected on GitHub, so a direct push will be rejected by the
server. Do not try to work around a rejection — no `--force`, no
`--no-verify`, no rewriting history, no merging your branch into `main` locally.
If a push to `main` is rejected, that is the protection working correctly.

## Rule 3 — Never merge your own PR

Push the branch, open a pull request, and stop there. Vercel will post a preview
URL on the PR — that is where the change gets reviewed. The repo owner merges.

## Rule 4 — Ask before touching anything outside the task

If a task is "change the wording on the About page," change the wording on the
About page. Do not also reformat the file, rename variables, restructure
components, upgrade dependencies, or "clean up while you're in there."

If something looks broken or wrong and it is not part of the task, mention it in
your response and leave it alone.

---

## Where the copy lives

Site copy is inline in JSX. Editing it means editing a component file, so change
**only the text between tags and inside string props** — never the surrounding
markup, `className` values, or component structure.

| Page          | File                                                        |
| ------------- | ----------------------------------------------------------- |
| Home          | `app/page.tsx`                                              |
| About         | `app/about/AboutBody.tsx`                                   |
| Solutions     | `app/solutions/SolutionsBody.tsx` + `app/solutions/data.ts` |
| Solution page | `app/solutions/[slug]/ServiceDetail.tsx`                    |
| Contact       | `app/contact/ContactBody.tsx`                               |
| GoNet         | `app/gonet/GoNetBody.tsx`                                   |
| Nav / footer  | `app/components/Nav.tsx`, `app/components/Footer.tsx`       |

`app/solutions/data.ts` is the friendliest file in the repo for copy work — it is
plain data, no JSX.

Those files hold the prose. Structured content — the team roster, office
details, hero stat numbers — is **not** in them any more; see the next section.

### Content that is data, not JSX

Anything in `content/` is edited as JSON, never by touching the component that
renders it. Each file is read through a matching module in `lib/content/`, and
array order in the file is the display order on the site.

| What            | File                        | Shows up on       |
| --------------- | --------------------------- | ----------------- |
| Blog posts      | `content/blog-posts.json`   | `/blog`           |
| Case studies    | `content/case-studies.json` | `/case-study`, home |
| Team roster     | `content/team.json`         | `/about`          |
| Office details  | `content/offices.json`      | `/contact`        |
| Hero stat cards | `content/hero-stats.json`   | home              |

This is the friendliest work in the repo: no JSX, no classNames. Two rules.
Keep it valid JSON, because a syntax error there fails the build. And never put
a Tailwind class in a content file — if the layout needs to change, that is a
component change, not a content change.

`npm test` checks these files for the things the components assume (photo paths
that actually resolve, exactly one featured office, and so on), so run it after
editing.

**Team photos.** Drop a square image in `public/assets/team/` and add a `photo`
path to that person's entry in `content/team.json`. Anyone without one gets the
silhouette placeholder automatically. See `public/assets/team/README.txt`.

Note that `/blog` currently shows a "coming soon" placeholder, so posts in
`content/blog-posts.json` are staged but not yet public.

## Do not touch without asking

- `lib/` — content loaders and models (the JSON files in `content/` are fair
  game for copy work; the code that reads them is not)
- `.env*` — secrets, never open, never print, never commit
- `package.json` / `package-lock.json` — no dependency changes
- `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `jest.config.ts`
- Any GSAP / ScrollTrigger / Lenis animation code

## Before opening a PR

```bash
npx tsc --noEmit    # must pass with no output
npm test            # must pass
npm run build       # must succeed
```

A branch that does not build cannot be merged, so check locally first.

## Running the site

```bash
npm install
npm run dev
```

Runs at http://localhost:3000. If that port is busy: `npm run dev -- -p 3100`.

No environment variables and no `.env.local` are needed — the site has no
database and no external services. A fresh clone runs on `npm install` alone.

---

## If you get stuck

Say so in your response rather than guessing. Specifically, never:

- run `git push --force` or `git reset --hard` on a shared branch
- delete or rewrite commits you did not create
- resolve a merge conflict by discarding the other side wholesale
- commit `node_modules/`, `.next/`, `out/`, or `.env*`

Ask the repo owner instead. Undoing a bad push costs far more than asking.
