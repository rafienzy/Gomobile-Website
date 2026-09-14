# How we work on this repo

`main` is the live website. It deploys to production automatically. Everything
here exists so that nothing reaches customers without someone looking at it.

## The loop

Every piece of work — a typo, a new page, anything — goes through the same five
steps:

1. Start from an up-to-date `main`
2. Make a **new** branch
3. Work, commit, push
4. Open a pull request, then stop
5. Rafi reviews and merges

## Step by step

**1. Start fresh. Every time.**

```bash
git checkout main
git pull origin main
```

Skipping this is the single most common cause of merge conflicts. Your copy of
`main` goes stale within hours once two people are working.

**2. A new branch per task.**

```bash
git checkout -b copy/about-page
```

One branch = one piece of work = one PR. When that PR is merged, the branch is
finished — do not keep pushing to it. Start the next task from step 1 with a
new branch.

Naming: `copy/` for copywriting, `fix/` for bugs, `feat/` for new
functionality.

**3. Commit and push.**

```bash
git add -A
git commit -m "copy(about): tighten team intro"
git push -u origin copy/about-page
```

**4. Open the PR yourself, then stop.**

GitHub prints a link when you push. Open it, write a short description of what
you changed and why, and submit.

Then stop. Do not merge it. Do not push more unrelated work onto it. A PR is a
question, not an announcement.

**5. Check your own preview before asking for review.**

Vercel builds your branch at its own URL and posts a link on the PR — usually
within a minute. Open it and look at the pages you changed, in both light and
dark mode.

This URL is not the live site. Nobody but us can see it. Use it freely.

If it looks right, say so in the PR. If something's off, push a fix to the same
branch — the preview updates automatically.

## Staying in scope

If the task is copywriting, change words. That's it.

You will notice other things — a bug, an awkward layout, code that could be
tidier. Some of those will be real. **Write them in the PR description or as a
separate message. Do not fix them in the same PR.**

Two reasons. A reviewer checking wording can't also be checking a CSS change
they weren't expecting. And if something breaks, a PR that only touched words
is easy to undo — one that touched words *and* the nav is not.

A real fix is welcome. It just needs its own branch and its own PR.

## When `main` moves while you're working

If Rafi merges something before your PR is done, your branch is now behind.
GitHub will usually tell you. To catch up:

```bash
git pull origin main
```

Do this from your branch. It brings the new `main` into your work.

## Merge conflicts

A conflict means you and someone else changed the same line, and git won't
guess which version is right. Nothing is broken and nothing is lost.

**Do not resolve a conflict by taking one whole side.** Almost always the
correct answer is to combine them — keep their change *and* yours.

This has already caused a near-miss on this repo: one side had new wording, the
other had rewritten icon values on the same lines. Taking either side alone
would have silently broken every icon on the Solutions pages, with a PR that
looked completely green.

If you get a conflict and aren't certain what the combined version should be,
stop and ask. It is a two-minute conversation and an afternoon of debugging.

## Never

- push to `main`
- merge your own PR
- `git push --force`, `git reset --hard`, or anything that rewrites shared history
- commit `.env` files, or paste their contents anywhere
- commit `node_modules/`, `.next/`, or `out/`

If a push is rejected, that's the protection working. Don't look for a way
around it — ask.

## Running it locally

```bash
npm install
npm run dev
```

Then http://localhost:3000. You need a `.env.local` with the database
connection string — ask Rafi. Never commit it.

## If you're stuck

Say so. Guessing at git commands is how small problems become big ones.
Nothing here is urgent enough to be worth breaking the live site over.
