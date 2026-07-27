export type CaseMetric = {
  v: string;
  l: string;
  desc: string;
};

export type CampaignSpec = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  brand: string;
  category: string;
  headline: string;
  subheadline?: string;
  /** Shorter headline for the listing card. Falls back to `headline`. */
  cardHeadline?: string;
  img: string;
  period: string;
  objective?: string;
  region?: string;
  tags: string[];
  metrics: CaseMetric[];
  overview: {
    challenge: string;
    solution: string;
    result: string;
  };
  keyTakeaway?: string;
  /** Per-case heading for the approach section. Falls back to a generic default. */
  approachHeading?: { eyebrow: string; title: string };
  approach: { title: string; desc: string }[];
  /**
   * Compact spec list shown INSTEAD of `approach` when present. Used for the
   * GoNet programmatic cases, where execution detail can't be published.
   */
  campaignSnapshot?: CampaignSpec[];
  channels: string[];
  testimonial?: { quote: string; name: string; role: string };
  status: 'published' | 'draft';
  /**
   * Editorial flags for copy that hasn't been confirmed by the client or team.
   * Never rendered — grep for `needsReview` before publishing.
   */
  needsReview?: string[];
};

export type CaseStudyInput = Omit<CaseStudy, 'createdAt' | 'updatedAt'>;

export function validateCaseStudy(data: Partial<CaseStudy>): string[] {
  const errors: string[] = [];
  if (!data.slug) errors.push('slug is required');
  if (!data.brand) errors.push('brand is required');
  if (!data.category) errors.push('category is required');
  if (!data.headline) errors.push('headline is required');
  if (!data.img) errors.push('img is required');
  if (!data.period) errors.push('period is required');
  if (!Array.isArray(data.tags)) errors.push('tags must be an array');
  if (!Array.isArray(data.metrics)) errors.push('metrics must be an array');
  if (!data.overview) errors.push('overview is required');
  if (!Array.isArray(data.approach)) errors.push('approach must be an array');
  if (!Array.isArray(data.channels)) errors.push('channels must be an array');
  return errors;
}
