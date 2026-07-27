/**
 * Lorem ipsum placeholder data used when Demo Mode is active.
 * None of this data is ever rendered in production — it only shows when
 * a user visits the site with `?demo` in the URL and toggles the switch.
 */

import type { BlogPost } from '@/lib/models/blog';

/* ─── Lorem blog posts ─────────────────────────────────────────────────── */

export const LOREM_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'lorem-post-1',
    img: '/assets/featured-case-1.png',
    category: 'Programmatic',
    title: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed',
    excerpt:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
    author: 'Lorem Ipsum',
    authorRole: 'Head of Lorem',
    date: 'Jan 1, 2025',
    readTime: '5 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['LOREM', 'IPSUM', 'DOLOR'],
    relatedSlugs: ['lorem-post-2', 'lorem-post-3'],
    status: 'published',
  },
  {
    slug: 'lorem-post-2',
    img: '/assets/featured-case-2.png',
    category: 'CTV',
    title: 'Ut Labore et Dolore Magna Aliqua: Enim Ad Minim Veniam',
    excerpt:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    author: 'Dolor Sitat',
    authorRole: 'Senior Lorem Strategist',
    date: 'Jan 8, 2025',
    readTime: '4 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['LOREM', 'CTV'],
    relatedSlugs: ['lorem-post-1', 'lorem-post-3'],
    status: 'published',
  },
  {
    slug: 'lorem-post-3',
    img: '/assets/featured-case-3.png',
    category: 'Measurement',
    title: 'Duis Aute Irure Dolor in Reprehenderit in Voluptate Velit',
    excerpt:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    author: 'Amet Consectetur',
    authorRole: 'Lorem Analytics Lead',
    date: 'Jan 15, 2025',
    readTime: '6 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['MEASUREMENT', 'LOREM'],
    relatedSlugs: ['lorem-post-1', 'lorem-post-2'],
    status: 'published',
  },
  {
    slug: 'lorem-post-4',
    img: '/assets/featured-case-1.png',
    category: 'Creative',
    title: 'Excepteur Sint Occaecat Cupidatat Non Proident Sunt in Culpa',
    excerpt:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet.',
    author: 'Voluptate Velit',
    authorRole: 'Creative Lorem Director',
    date: 'Jan 22, 2025',
    readTime: '7 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['CREATIVE', 'IPSUM'],
    relatedSlugs: ['lorem-post-2', 'lorem-post-3'],
    status: 'published',
  },
  {
    slug: 'lorem-post-5',
    img: '/assets/featured-case-2.png',
    category: 'Industry',
    title: 'Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip',
    excerpt:
      'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
    author: 'Adipiscing Elit',
    authorRole: 'Lorem Market Intelligence',
    date: 'Feb 1, 2025',
    readTime: '5 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['INDUSTRY', 'LOREM'],
    relatedSlugs: ['lorem-post-1', 'lorem-post-4'],
    status: 'published',
  },
  {
    slug: 'lorem-post-6',
    img: '/assets/featured-case-3.png',
    category: 'Programmatic',
    title: 'Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem',
    excerpt:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore.',
    author: 'Natus Error',
    authorRole: 'Head of Ipsum Trading',
    date: 'Feb 8, 2025',
    readTime: '4 min read',
    body: { intro: '', sections: [], conclusion: '' },
    blocks: [],
    tags: ['PROGRAMMATIC', 'LOREM', 'DOLOR'],
    relatedSlugs: ['lorem-post-2', 'lorem-post-5'],
    status: 'published',
  },
];

/* ─── Lorem case study cards (used by CaseStudyBody listing) ──────────── */

export type LoremCase = {
  slug: string;
  img: string;
  brand: string;
  category: string;
  headline: string;
  metrics: { v: string; l: string }[];
  tags: string[];
};

export const LOREM_CASES: LoremCase[] = [
  {
    slug: 'lorem-case-1',
    img: '/assets/featured-case-1.png',
    brand: 'Lorem Ipsum Corp',
    category: 'Travel',
    headline:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt.',
    metrics: [
      { v: '+38%', l: 'Lorem Metric' },
      { v: '2.4×', l: 'Ipsum KPI' },
      { v: '12M', l: 'Dolor Reach' },
    ],
    tags: ['LOREM', 'IPSUM', 'DOLOR'],
  },
  {
    slug: 'lorem-case-2',
    img: '/assets/featured-case-2.png',
    brand: 'Adipiscing Elit Ltd',
    category: 'FMCG',
    headline:
      'Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco.',
    metrics: [
      { v: '6.1×', l: 'Lorem CTR' },
      { v: '27s', l: 'Avg Engagement' },
      { v: '$0.04', l: 'Cost per Lorem' },
    ],
    tags: ['RICH MEDIA', 'LOREM', 'IPSUM'],
  },
  {
    slug: 'lorem-case-3',
    img: '/assets/featured-case-3.png',
    brand: 'Consectetur Inc',
    category: 'Banking',
    headline:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.',
    metrics: [
      { v: '-22%', l: 'Lorem CAC' },
      { v: '+58%', l: 'Acquisitions' },
      { v: '98.7%', l: 'Ipsum Safe' },
    ],
    tags: ['PROGRAMMATIC', 'LOREM', 'DISPLAY'],
  },
  {
    slug: 'lorem-case-4',
    img: '/assets/featured-case-1.png',
    brand: 'Dolor Sit Group',
    category: 'Tech',
    headline:
      'Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.',
    metrics: [
      { v: '+47%', l: 'Lorem Lift' },
      { v: '-19%', l: 'Ipsum CPA' },
      { v: '2.2×', l: 'Lorem Test' },
    ],
    tags: ['CTV', 'LOREM', 'MOBILE'],
  },
  {
    slug: 'lorem-case-5',
    img: '/assets/featured-case-2.png',
    brand: 'Veniam Quis Corp',
    category: 'Lifestyle',
    headline:
      'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat dolor.',
    metrics: [
      { v: '-31%', l: 'Lorem CPL' },
      { v: '1.8×', l: 'Ipsum Volume' },
      { v: '+44%', l: 'Lorem Rate' },
    ],
    tags: ['SOCIAL', 'LOREM', 'IPSUM'],
  },
];
