export interface ServiceFeature { icon: string; title: string; desc: string }
export interface ServiceProcess  { num: string; title: string; desc: string }
export interface ServiceStat     { v: string; l: string }
export interface Html5AdUnit     { title: string; type: string; w: number; h: number; bg: string; accent: string; badge: string }

export interface Service {
  slug: string;
  eyebrow: string;
  title: string;
  thumb: string;
  heroDesc: string;
  longDesc: string;
  tags: string[];
  stats: ServiceStat[];
  features: ServiceFeature[];
  process: ServiceProcess[];
  html5Gallery?: Html5AdUnit[];
  relatedCases: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "programmatic-display",
    eyebrow: "01 — PROGRAMMATIC",
    title: "Programmatic Display",
    thumb: "/assets/service-thumb-programmatic.png",
    heroDesc: "Precision audience buying across 24 SSPs — display, native, and in-app.",
    longDesc: "Our programmatic practice is built on GoNet DSP — our independent real-time bidding platform connected to 24 SSPs via OpenRTB. We bring AI-powered audience profiling, pre-bid brand safety filtering, and ML bid optimization to every impression we buy. No black-box fees, no inflated CPMs.",
    tags: ["DISPLAY", "NATIVE", "IN-APP", "WEB", "APP"],
    stats: [
      { v: "24", l: "SSPs Connected" },
      { v: "2.4B+", l: "Daily Bid Requests" },
      { v: "98.7%", l: "Brand Safe Rate" },
      { v: "106%", l: "Avg Delivery Accuracy" },
    ],
    features: [
      { icon: "🎯", title: "AI Audience Profiling", desc: "Real-time user profiling that adapts to intent and mood shifts. Privacy-safe, no third-party cookie dependency across WEB and IN-APP environments." },
      { icon: "🛡️", title: "Pre-bid Brand Safety", desc: "Every bid request is filtered against IAS, DV, and MOAT before auction entry. Fraudulent impressions never reach your budget." },
      { icon: "⚡", title: "ML Price Optimizer", desc: "Machine learning predicts optimal bid prices in real-time — maximizing impression value while keeping CPMs efficient across every placement and format." },
      { icon: "📊", title: "Transparent Reporting", desc: "Full placement-level transparency. You see every domain, app, and placement your budget touches — with the ability to block in real-time." },
      { icon: "🔄", title: "Dynamic Creative", desc: "Creative rotation based on audience signal, time-of-day, and performance data. DCO ensures the right message reaches the right person." },
      { icon: "📱", title: "Cross-Device", desc: "Unified reach across desktop, mobile web, and in-app — with device-graph matching to deduplicate reach and cap frequency across screens." },
    ],
    process: [
      { num: "01", title: "Audience Architecture", desc: "We map your target audience across first-party data, contextual signals, and behavioral segments. Suppression lists built from CRM data." },
      { num: "02", title: "Inventory Curation", desc: "Private Marketplace deals negotiated with premium publishers. Open exchange layered on top with strict domain and app whitelists." },
      { num: "03", title: "Campaign Activation", desc: "DSP configuration, creative trafficking, and bid strategy setup. Live within 48 hours of brief sign-off." },
      { num: "04", title: "Always-On Optimization", desc: "Daily bid floor adjustments, creative rotation, audience refinement. Reporting every 48 hours with recommended actions." },
    ],
    relatedCases: ["bank-jago", "maybank", "ocbc"],
  },
  {
    slug: "video-ctv-ott",
    eyebrow: "02 — VIDEO",
    title: "Video, CTV & OTT",
    thumb: "/assets/service-thumb-video.png",
    heroDesc: "In-stream, out-stream, Connected TV and OTT — built for lean-forward and lean-back audiences.",
    longDesc: "Video is the highest-attention format in digital advertising. We buy premium in-stream placements on CTV OEMs, OTT platforms, and mobile web — with full VPAID + VAST 4.0 support, brand safety pre-screening, and measurable completion metrics at every level.",
    tags: ["IN-STREAM", "OUT-STREAM", "CTV", "OTT", "MOBILE VIDEO"],
    stats: [
      { v: "92%",  l: "Avg VCR" },
      { v: "40+",  l: "CTV Publishers" },
      { v: "-44%", l: "CPM vs Paid Social" },
      { v: "VAST 4.0", l: "Supported" },
    ],
    features: [
      { icon: "📺", title: "CTV & OEMs", desc: "Premium in-stream on Samsung TV Plus, LG Channels, Viu, meWatch, and 40+ CTV publishers across SEA. Full household targeting via IP graph." },
      { icon: "🎬", title: "OTT Premium", desc: "Non-skippable and skippable in-stream on leading OTT platforms. Content-adjacent targeting ensures brand-safe, contextually relevant environments." },
      { icon: "📱", title: "Mobile Video", desc: "In-stream and out-stream on mobile web and in-app. Rewarded video available for gaming environments. MRAID + VPAID fully supported." },
      { icon: "✂️", title: "Creative Sequencing", desc: "30s awareness → 15s consideration → 6s decision. Sequential messaging that adapts creative to audience funnel stage across a single campaign." },
      { icon: "📐", title: "VAST 4.0 Support", desc: "Full VAST 4.0 compliance including interactive overlays, companion ads, and cross-device measurement pixels." },
      { icon: "📈", title: "Completion Analytics", desc: "Quartile-level completion tracking (25%, 50%, 75%, 100%) with skip behavior analysis and audience engagement scoring." },
    ],
    process: [
      { num: "01", title: "Inventory Selection", desc: "We curate a CTV + OTT + mobile video mix based on your audience, market, and brand safety requirements. PMP deals preferred for premium placements." },
      { num: "02", title: "Creative Spec Review", desc: "Your video assets reviewed and adapted per format spec. We provide a checklist and handle any transcoding or format conversion required." },
      { num: "03", title: "Sequencing Setup", desc: "Audience pools and creative sequences built per funnel stage. Frequency caps set per sequence layer to prevent overexposure." },
      { num: "04", title: "Measurement & Reporting", desc: "VCR, skip rate, quartile completion, and brand uplift survey (optional) reported weekly. Placement-level transparency included." },
    ],
    relatedCases: ["singapore-airlines", "ocbc"],
  },
  {
    slug: "rich-media-html5",
    eyebrow: "03 — CREATIVE",
    title: "Rich Media & HTML5",
    thumb: "/assets/service-thumb-richmedia.png",
    heroDesc: "Interactive, code-based ads engineered in-house for maximum engagement.",
    longDesc: "Our in-house HTML5 creative studio designs and builds gamified banners, expandable units, interscrollers, and scratch-to-reveal mechanics from scratch. Every unit is engineered to IAB specs, mobile-optimized, and built to work across all major ad servers. No off-the-shelf templates — every build is bespoke.",
    tags: ["HTML5", "GAMIFIED", "EXPANDABLE", "INTERSCROLLER", "DCO"],
    stats: [
      { v: "6×",  l: "vs Standard CTR" },
      { v: "27s", l: "Avg Engagement Time" },
      { v: "4d",  l: "Avg Build Time" },
      { v: "IAB", l: "Certified Builds" },
    ],
    features: [
      { icon: "🎮", title: "Gamified Units", desc: "Scratch-to-reveal, spin-to-win, quiz mechanics, and mini-games. Interaction rates 5–8× standard display benchmarks." },
      { icon: "📐", title: "Expandable Banners", desc: "Two-stage expandables with animation. Panel expands on click or hover to reveal product detail, video, or interactive content." },
      { icon: "🌀", title: "Interscroller & Adhesion", desc: "Full-screen interscroller and sticky adhesion units for mobile web. Highest viewability rates in the format library." },
      { icon: "🎨", title: "DCO Integration", desc: "Dynamic Creative Optimization — feeds, localization, A/B variant testing, and weather/time triggers all built into the HTML5 layer." },
      { icon: "✅", title: "Cross-Server Compatible", desc: "Built to spec for CM360, GAM, Xandr, The Trade Desk, and all major ad servers. MRAID + VPAID certified." },
      { icon: "⚡", title: "Fast Load", desc: "All units engineered under IAB polite load limits (200kb initial). Zero CLS, zero layout shift. Tested across iOS Safari, Android Chrome, and in-app webviews." },
    ],
    process: [
      { num: "01", title: "Brief & Concept", desc: "We receive your creative brief, brand assets, and campaign objective. Our creative team proposes 2–3 interaction concepts with effort estimates." },
      { num: "02", title: "Design & Prototype", desc: "Figma storyboards signed off before build begins. Prototypes shared via staging environment for client review on device." },
      { num: "03", title: "Build & QA", desc: "HTML5 build in-house. QA across 12 device/browser combinations. Ad server tagging and tracking pixels integrated before handover." },
      { num: "04", title: "Trafficking & Reporting", desc: "We traffic your rich media across placements and monitor engagement metrics: interaction rate, dwell time, expand rate, and secondary clicks." },
    ],
    html5Gallery: [
      { title: "Scratch to Reveal", type: "Gamified",      w: 300, h: 250, bg: "#1a1a2e", accent: "#ef6600", badge: "GAME" },
      { title: "Expandable Banner", type: "Expandable",    w: 320, h: 100, bg: "#0f2027", accent: "#cb0000", badge: "EXP" },
      { title: "Interscroller",     type: "Full-screen",   w: 320, h: 480, bg: "#16213e", accent: "#ff6b35", badge: "FULL" },
      { title: "Spin to Win",       type: "Gamified",      w: 300, h: 250, bg: "#1a0a2e", accent: "#ef6600", badge: "GAME" },
      { title: "Video Overlay",     type: "Rich Video",    w: 300, h: 250, bg: "#0a1628", accent: "#cb0000", badge: "VID" },
      { title: "Product Carousel",  type: "Interactive",   w: 300, h: 250, bg: "#1c1c1c", accent: "#ef6600", badge: "DCO" },
    ],
    relatedCases: ["indofood"],
  },
  {
    slug: "social-media",
    eyebrow: "04 — SOCIAL",
    title: "Social Media Buying",
    thumb: "/assets/service-thumb-social.png",
    heroDesc: "Audience-first paid social across Meta, TikTok, and LinkedIn.",
    longDesc: "We plan and execute paid social campaigns with the same trading rigour we apply to programmatic. Audience architecture built from first-party data, creative A/B testing at scale, full-funnel attribution via CAPI + pixel, and weekly performance reporting tied to business outcomes — not vanity metrics.",
    tags: ["META", "TIKTOK", "LINKEDIN", "REELS", "SPARK ADS"],
    stats: [
      { v: "Meta",    l: "Business Partner" },
      { v: "TikTok",  l: "Certified Partner" },
      { v: "-28%",    l: "Avg CPL Reduction" },
      { v: "CAPI",    l: "Server-side Tracking" },
    ],
    features: [
      { icon: "📘", title: "Meta Ads", desc: "Full-funnel Meta campaigns across Feed, Reels, Stories, and Messenger. Advantage+ audience, CAPI integration, and dynamic product ads for e-commerce." },
      { icon: "🎵", title: "TikTok Ads", desc: "TopView, In-Feed, Spark Ads, and Branded Effects. Creator-native creative strategy built for the For You Page — not repurposed from other channels." },
      { icon: "💼", title: "LinkedIn Ads", desc: "B2B targeting via job title, industry, company size, and seniority. Sponsored Content, Message Ads, and Lead Gen Forms managed end-to-end." },
      { icon: "🧪", title: "Creative A/B Testing", desc: "Structured creative experiments: hook variants, format tests, and copy angle testing. Statistical significance required before scaling winning variants." },
      { icon: "📡", title: "CAPI Integration", desc: "Server-side Conversions API implementation for Meta and TikTok. Closes the iOS 14.5+ attribution gap — typically recovers 30–40% of previously unattributed events." },
      { icon: "🔄", title: "Full-Funnel Strategy", desc: "Awareness, consideration, and conversion campaigns orchestrated with frequency control across stages. Retargeting pools built from first-party web and CRM data." },
    ],
    process: [
      { num: "01", title: "Audience Mapping", desc: "First-party data upload, lookalike seeding, and interest/behavior layering. Suppression lists applied to exclude existing customers from acquisition campaigns." },
      { num: "02", title: "Creative Strategy", desc: "Hook-first creative briefs tailored to each platform's native format. We write copy, review creative, and manage the approval workflow before launch." },
      { num: "03", title: "Campaign Build", desc: "Account structure, campaign hierarchy, ad set configuration, and tracking verification. Pre-launch QA checklist signed off before go-live." },
      { num: "04", title: "Optimization & Reporting", desc: "Weekly performance review with recommendations. Budget shifts actioned within 24 hours. Monthly creative refresh to combat fatigue." },
    ],
    relatedCases: ["iqos", "maybank"],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
