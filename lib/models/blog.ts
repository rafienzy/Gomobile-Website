export type ContentBlock = {
  id: string;
  type: 'paragraph' | 'heading2' | 'heading3' | 'quote' | 'image' | 'divider' | 'callout' | 'bulletList';
  content: string;
};

export type SEOMeta = {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  noIndex: boolean;
};

export type BlogPost = {
  slug: string;
  img: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  date: string;
  /** Same format as `date`. Set it when a published post is meaningfully revised. */
  updated?: string;
  readTime: string;
  body: {
    intro: string;
    sections: { heading: string; content: string }[];
    conclusion: string;
  };
  blocks?: ContentBlock[];
  seo?: SEOMeta;
  tags: string[];
  relatedSlugs: string[];
  status: 'published' | 'draft';
  createdAt?: Date;
  updatedAt?: Date;
};

export type BlogPostInput = Omit<BlogPost, 'createdAt' | 'updatedAt'>;

export function validateBlogPost(data: Partial<BlogPost>): string[] {
  const errors: string[] = [];
  if (!data.slug) errors.push('slug is required');
  if (!data.title) errors.push('title is required');
  if (!data.category) errors.push('category is required');
  if (!data.excerpt) errors.push('excerpt is required');
  if (!data.author) errors.push('author is required');
  if (!data.date) errors.push('date is required');
  if (!Array.isArray(data.tags)) errors.push('tags must be an array');
  if (!Array.isArray(data.relatedSlugs)) errors.push('relatedSlugs must be an array');
  return errors;
}
