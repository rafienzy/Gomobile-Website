import { redirect } from "next/navigation";

/*
 * No posts are published while the journal is a placeholder, so any direct
 * link to an individual post lands on /blog instead of rendering a draft.
 *
 * redirect() issues a 307, deliberately: these URLs are expected to work
 * again once the journal launches, and a 308 would be cached by browsers
 * long after that. BlogPostDetail and lib/db/blog are untouched, so bringing
 * the real page back means restoring this file from git.
 */

export const metadata = {
  title: "Journal | Go Mobile",
};

export default function BlogPostPage() {
  redirect("/blog");
}
