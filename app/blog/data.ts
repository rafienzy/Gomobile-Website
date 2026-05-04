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
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-we-stopped-buying-open-exchange-impressions",
    img: "/assets/featured-case-1.png",
    category: "Programmatic",
    title: "Why we stopped buying open exchange impressions in Q2",
    excerpt:
      "After 18 months of A/B testing curated PMP deals against open exchange, the gap is too wide to ignore. Here's the data that changed how we trade.",
    author: "Reza Adhi",
    authorRole: "Head of Programmatic",
    date: "Apr 18, 2026",
    readTime: "8 min read",
    tags: ["PROGRAMMATIC", "PMP", "BRAND SAFETY"],
    relatedSlugs: [
      "why-our-dsp-rejects-23-percent",
      "mmm-is-back",
      "sea-ad-market-in-5-charts",
    ],
    body: {
      intro:
        "We ran the same creative, the same audience segments, and the same pacing rules across two parallel buys — one via open exchange, one via curated PMP deals negotiated directly with premium publishers. We did this for 18 months across seven clients in four SEA markets. The results forced us to change our default buying strategy permanently.",
      sections: [
        {
          heading: "The experiment design",
          content:
            "Each client had a mirrored campaign split 50/50 between open exchange and PMP inventory. We held creative, bid strategy, dayparting, and audience inputs constant. The only variable was the channel through which we acquired the impression. We tracked viewability, IVT rate, CTR, post-click engagement, and ultimately attributed conversions through a combination of pixel data and modeled incrementality.",
        },
        {
          heading: "What the data actually showed",
          content:
            "Open exchange delivered volume. PMP delivered results. On average across all seven clients, PMP inventory showed 2.3× higher viewability (74% vs 32%), 61% lower IVT rate, and a CTR that was 4.1× the open exchange baseline. But the number that changed our posture permanently was cost-per-outcome: PMP was cheaper per acquisition despite carrying a higher CPM, simply because so few open exchange impressions did any meaningful work.",
        },
        {
          heading: "Where open exchange still makes sense",
          content:
            "We haven't killed open exchange entirely. For reach extensions at the top of the funnel — pure brand awareness plays where frequency capping and domain quality matter less than scale — open exchange still has a role at very low CPMs. But for anything with a conversion objective attached, we now start from PMP and work outward only when we've exhausted premium supply.",
        },
        {
          heading: "What this means for how we structure campaigns",
          content:
            "Our default campaign architecture now splits budgets into three tiers: a 60% PMP core for performance goals, a 25% curated open marketplace layer (filtered to allowlisted domains only), and a 15% exploration budget on open exchange specifically to test new formats and gather signal. The performance delta between the PMP core and open exchange layer pays for the negotiation overhead several times over.",
        },
      ],
      conclusion:
        "The uncomfortable truth is that open exchange is optimised for volume, not for advertisers. PMP requires more upfront work — publisher relationships, deal ID management, and tighter inventory constraints. But the performance gap is now so well documented in our own data that we can't justify defaulting to open exchange for any client with a meaningful cost-per-outcome target. If you're still buying open exchange as your primary channel, run the split test. The numbers will change your mind.",
    },
  },
  {
    slug: "gamified-ads-outperform-static",
    img: "/assets/featured-case-2.png",
    category: "Creative",
    title: "Gamified ads outperform static by 6×, but only if you do this one thing.",
    excerpt:
      "First-frame engagement is the whole game. Most teams get the rest right and lose on the opening 800ms.",
    author: "Lina Chen",
    authorRole: "Creative Technology Lead",
    date: "Apr 11, 2026",
    readTime: "5 min read",
    tags: ["RICH MEDIA", "HTML5", "CREATIVE"],
    relatedSlugs: [
      "rich-media-build-times",
      "why-we-stopped-buying-open-exchange-impressions",
      "ctv-in-sea",
    ],
    body: {
      intro:
        "Gamified HTML5 ads consistently outperform static display by a significant margin in our internal benchmarks. But the 6× engagement lift we report isn't universal — it's conditional. We've run enough experiments to know exactly where gamified formats win, where they don't, and what single factor separates the campaigns that hit 6× from the ones that barely beat static.",
      sections: [
        {
          heading: "The first 800ms is the entire game",
          content:
            "When an HTML5 ad loads in a publisher environment, the user has already formed an intent to scroll past it before your animation loop even starts. The only way to interrupt that pattern is to present a clear, immediate invitation in the very first frame — something that communicates 'this is interactive and it will take you less than 3 seconds' without any instruction text. Our top-performing gamified units show a partial interaction state by default: a scratch panel that's already 30% revealed, a spin wheel mid-rotation, a drag handle already displaced from its resting position.",
        },
        {
          heading: "What teams get wrong",
          content:
            "Most teams spend their creative energy on the reward state — the 'win' animation, the coupon reveal, the product showcase that appears after the user completes the mechanic. That's fine, but it's the wrong priority. Users who make it to the reward are already converted to engagement. The attrition happens at the first frame. We've reviewed hundreds of HTML5 builds where the opening frame is a static image with a 'Tap to Play' CTA. That's not gamified — that's a static ad with instructions.",
        },
        {
          heading: "The formats that perform and the ones that don't",
          content:
            "Scratch-to-reveal consistently delivers the highest engagement rates across all demographics and markets — the tactile metaphor is universally understood. Spin wheels perform well in prize-led campaigns but poorly when the prize isn't immediately legible. Drag mechanics work in premium placements with adequate space but fail badly in smaller formats. Carousel swipe adapts well to mobile but underperforms on desktop. Know your placement before you choose your mechanic.",
        },
      ],
      conclusion:
        "The 6× figure is real but it requires one non-negotiable condition: an honest, immediate first frame that shows the user what they're being invited to do. Not a CTA. Not a logo. A mid-state interaction that looks like it's waiting for them. Everything else — the mechanic, the reward, the brand message — is secondary to solving that opening 800ms.",
    },
  },
  {
    slug: "ctv-in-sea",
    img: "/assets/featured-case-3.png",
    category: "CTV",
    title: "CTV in SEA: the inventory you actually want isn't on the obvious networks.",
    excerpt:
      "A breakdown of which CTV publishers deliver actual sit-down audiences vs background noise.",
    author: "Daniel Tan",
    authorRole: "Video & CTV Strategist",
    date: "Apr 4, 2026",
    readTime: "7 min read",
    tags: ["CTV", "OTT", "VIDEO"],
    relatedSlugs: [
      "why-we-stopped-buying-open-exchange-impressions",
      "sea-ad-market-in-5-charts",
      "google-cookie-reversal",
    ],
    body: {
      intro:
        "CTV in Southeast Asia is experiencing rapid growth, but the inventory landscape is far more fragmented than in North America or Europe. Buyers who approach SEA CTV the same way they'd approach a US upfront are going to make expensive mistakes. After two years of testing CTV placements across Indonesia, Singapore, Malaysia, Thailand, and Vietnam, here's what we've actually learned about where the quality inventory lives.",
      sections: [
        {
          heading: "The myth of the obvious networks",
          content:
            "The first instinct for most buyers entering SEA CTV is to go through the large global streaming platforms. The inventory exists, the brand safety controls are good, and the audience data is solid. But completion rates on these platforms often mask an uncomfortable reality: a significant portion of that 'completed view' inventory is on content that users have fallen asleep to, left running as background audio, or stepped away from. The brand safety is excellent. The attention quality is variable.",
        },
        {
          heading: "Where sit-down audiences actually live",
          content:
            "The most reliable sit-down viewing audiences in SEA are on local and regional OTT platforms — the mid-tier publishers that have genuine appointment-viewing content: local drama, live sports, news. Viewers come to these platforms with intent, they watch at a specific time, and they're less likely to be running the content as ambient noise. CPMs are often lower than global platforms because they're not positioned as premium, but viewability and completion metrics tell a different story.",
        },
        {
          heading: "How to buy it without a direct deal",
          content:
            "Most quality local OTT inventory in SEA is accessible programmatically through regional SSPs. You don't need direct publisher relationships for every buy, but you do need to know which deal IDs correspond to the inventory you actually want. We maintain an internal curated list of deal IDs by country and publisher tier that we review quarterly. The setup cost is the list-building; the ongoing cost is just normal DSP management.",
        },
        {
          heading: "Measuring what matters",
          content:
            "Standard completion rate is a necessary but insufficient metric for CTV. We layer in audio-on rate (a strong proxy for active viewing), cross-device retargeting lift (did the CTV exposure drive mobile search behaviour?), and where available, ACR data from smart TV manufacturers for household-level frequency management. Together these metrics give a much more honest picture of whether your CTV spend is reaching real viewers.",
        },
      ],
      conclusion:
        "SEA CTV is a real channel with real audiences, but it requires local knowledge to buy well. The premium brand associations are with the global platforms; the premium audiences are often somewhere else. Run a split test between global streaming inventory and curated local OTT on your next campaign. Measure completion, audio-on rate, and downstream search lift. The results will recalibrate where you allocate your video budget.",
    },
  },
  {
    slug: "mmm-is-back",
    img: "/assets/service-thumb-programmatic.png",
    category: "Measurement",
    title: "MMM is back. Here's how we're using it alongside MTA without losing our minds.",
    excerpt:
      "A pragmatic stack for blending media mix modeling with multi-touch attribution in a post-IDFA world.",
    author: "Joko Wibowo",
    authorRole: "Head of Analytics",
    date: "Mar 28, 2026",
    readTime: "10 min read",
    tags: ["MEASUREMENT", "ATTRIBUTION", "DATA"],
    relatedSlugs: [
      "incrementality-testing",
      "google-cookie-reversal",
      "why-we-stopped-buying-open-exchange-impressions",
    ],
    body: {
      intro:
        "Media mix modeling fell out of fashion when MTA made it seem obsolete. Now MTA is broken — IDFA opt-outs, signal loss from privacy changes, and the cookieless transition have eroded the data quality that made last-touch attribution credible. MMM is back, but the teams trying to run both simultaneously are discovering that the two methodologies disagree in interesting ways and you need a principled approach to resolve those disagreements or you'll just confuse your clients.",
      sections: [
        {
          heading: "Why MTA alone no longer works",
          content:
            "Multi-touch attribution depends on persistent user identifiers across touchpoints. In a post-IDFA, pre-cookie-deprecation environment, those identifiers are incomplete for a substantial fraction of your users. iOS traffic is particularly poorly tracked. The result is that MTA systematically under-credits upper-funnel touchpoints (video, display, CTV) that happen in cookieless environments and over-credits last-touch channels (paid search, email) where cookies still persist. Your channel mix looks more lower-funnel-dependent than it actually is.",
        },
        {
          heading: "Why MMM alone isn't enough either",
          content:
            "MMM doesn't have the granularity to guide in-flight optimisation. A 12-week model refresh cycle is fine for annual planning and budget allocation; it's useless for deciding whether to shift spend between ad groups on Thursday. It also can't give you creative-level or audience-level insight — you're working with aggregate spend and aggregate outcomes. You need both approaches for different decision horizons.",
        },
        {
          heading: "How we run the hybrid stack",
          content:
            "Our current setup runs a lightweight MMM on a 4-week refresh cycle using Robyn (Meta's open-source MMM library) for strategic channel allocation. We run MTA with significant skepticism, treating it primarily as a directional signal for creative and audience decisions rather than channel credit. We resolve disagreements between the two models by using incrementality tests (geo holdouts and PSA tests) as the ground truth. When MMM and MTA disagree on a channel, an incrementality test settles it.",
        },
        {
          heading: "The practical workflow",
          content:
            "Strategic budget allocation reviews happen monthly using MMM outputs. Creative and audience decisions happen weekly using MTA signals. Incrementality tests run continuously on 2-3 channels at a time, cycling through the full channel mix over a quarter. The test results feed back into the MMM as validation data, improving model accuracy over time. It's more overhead than either approach alone, but it's the honest answer to a measurement environment that's irreversibly fragmented.",
        },
      ],
      conclusion:
        "The measurement ecosystem in digital advertising is genuinely broken, and anyone claiming their single-source attribution methodology has all the answers is selling something. The pragmatic path is a hybrid stack with clear decision boundaries: MMM for strategy, MTA for tactics, incrementality tests for truth. It's more work. It's also the only approach we trust.",
    },
  },
  {
    slug: "google-cookie-reversal",
    img: "/assets/service-thumb-video.png",
    category: "Industry",
    title: "What the Google cookie reversal actually means for your media plan.",
    excerpt:
      "Spoiler: nothing if you've already moved to first-party data. Everything if you haven't.",
    author: "Maya Putri",
    authorRole: "Strategy Director",
    date: "Mar 21, 2026",
    readTime: "6 min read",
    tags: ["INDUSTRY", "COOKIES", "FIRST-PARTY DATA"],
    relatedSlugs: [
      "mmm-is-back",
      "incrementality-testing",
      "why-we-stopped-buying-open-exchange-impressions",
    ],
    body: {
      intro:
        "Google's decision to reverse the third-party cookie deprecation in Chrome generated a lot of media coverage and, in our observation, a lot of sigh-of-relief responses from teams who had been slow to adapt. This is the wrong reaction. The fundamental signal quality erosion that drove the move to first-party data strategies is ongoing regardless of what Chrome does, and teams that paused their first-party work because cookies 'came back' are going to be in a very difficult position when the next phase of identity fragmentation arrives.",
      sections: [
        {
          heading: "What actually changed",
          content:
            "Google reversed the universal third-party cookie deprecation but did not reverse the trajectory toward user control. The Privacy Sandbox continues development. IDFA opt-out on iOS remains unchanged. Firefox and Safari have blocked third-party cookies for years. Samsung Internet and other Android browsers have varied policies. What Google's reversal did was remove a hard deadline — it did not restore third-party cookies to their 2018 reach and reliability.",
        },
        {
          heading: "The teams it affects least",
          content:
            "Any advertiser that responded to the cookie deprecation announcement by building first-party data infrastructure — CRM integrations, clean room activations, server-side event tracking, contextual targeting investment — is essentially unaffected. Their targeting doesn't depend on third-party cookies. Their measurement is grounded in first-party signals. The reversal is noise for them.",
        },
        {
          heading: "The teams that should be concerned",
          content:
            "Teams that interpreted the reversal as an extension of the status quo and paused their first-party data projects are making a strategic error. The cookieless environment isn't a specific future date — it's the current reality for a large and growing share of web traffic. Running cookie-dependent campaigns today means underperforming on iOS, Firefox, and Safari. That's not a future problem; it's a current underperformance you're already absorbing.",
        },
        {
          heading: "What to actually do",
          content:
            "If you haven't started: begin with server-side event tracking and a basic CRM integration. These are the foundations everything else builds on. If you're mid-implementation: accelerate, don't pause. The reversal buys time, not safety. If you're already operating on first-party data: the reversal gives you a competitive window while slower teams relax their guard. Use it.",
        },
      ],
      conclusion:
        "The Google cookie reversal is a tactical reprieve, not a strategic vindication of cookie dependence. The signal environment will continue fragmenting. The advertisers who emerge stronger from this period are the ones who didn't let the reprieve slow them down.",
    },
  },
  {
    slug: "rich-media-build-times",
    img: "/assets/service-thumb-richmedia.png",
    category: "Creative",
    title: "Rich media build times are killing your iteration loop. We rewrote our toolchain.",
    excerpt:
      "Internal tools that cut average HTML5 build time from 4 days to 6 hours.",
    author: "Lina Chen",
    authorRole: "Creative Technology Lead",
    date: "Mar 14, 2026",
    readTime: "9 min read",
    tags: ["HTML5", "CREATIVE", "TOOLING"],
    relatedSlugs: [
      "gamified-ads-outperform-static",
      "why-we-stopped-buying-open-exchange-impressions",
      "ctv-in-sea",
    ],
    body: {
      intro:
        "When creative iteration takes 4 days per build cycle, you can only test 2-3 concepts per flight. When it takes 6 hours, you can test 12. The performance delta between your second-best and twelfth-best concept is enormous, and most teams never get to find it because their toolchain is the bottleneck. This is the story of how we cut our average HTML5 rich media build time by 85% and what we learned doing it.",
      sections: [
        {
          heading: "What was taking so long",
          content:
            "We did a time-audit on a typical rich media build before the rewrite. The actual animation coding was about 30% of the total time. The remaining 70% was: per-ad-network asset packaging (each DSP and publisher has different spec requirements), manual quality checks across device sizes, ad serving tag generation, version management across creative variants, and back-and-forth file transfers with clients. None of that 70% is creative work — it's workflow overhead.",
        },
        {
          heading: "The new toolchain",
          content:
            "We built an internal CLI that takes a single source HTML5 build and auto-generates exports for every major ad network specification — IAB standard sizes, platform-specific formats, with asset compression and polyfill injection handled automatically. A validation suite runs the build against each spec and flags issues before any human review. The output is a structured ZIP with everything pre-labelled and a QA report attached. What previously took a day of packaging takes about 8 minutes.",
        },
        {
          heading: "What changed about iteration",
          content:
            "The faster build cycle changed how we work with clients on creative. Instead of presenting 3 concepts and picking one to execute, we now present 3 directions and execute all of them as lightweight prototypes in the first sprint. Real performance data — CTR, engagement rate, completion — informs which direction gets full production investment. We find a winning concept 2-3× faster and the winning concept is better because it's been validated against actual user behaviour, not a creative brief.",
        },
      ],
      conclusion:
        "If your HTML5 build cycle is measured in days, the constraint is almost certainly not the creative work — it's the surrounding workflow. Audit where the time actually goes before investing in better creative talent or more detailed briefs. The leverage is usually in the packaging and QA automation, not the animation itself.",
    },
  },
  {
    slug: "why-our-dsp-rejects-23-percent",
    img: "/assets/service-thumb-social.png",
    category: "Programmatic",
    title: "Why our DSP rejects 23% of incoming bids before they reach the auction.",
    excerpt:
      "Pre-bid filtering is unsexy and saves 7 figures a year. A look at the rules engine that powers it.",
    author: "Arif Hakim",
    authorRole: "Platform Engineering Lead",
    date: "Mar 7, 2026",
    readTime: "11 min read",
    tags: ["DSP", "FRAUD", "BRAND SAFETY"],
    relatedSlugs: [
      "why-we-stopped-buying-open-exchange-impressions",
      "mmm-is-back",
      "sea-ad-market-in-5-charts",
    ],
    body: {
      intro:
        "Every bid request that reaches your DSP costs you something — compute time, evaluation overhead, and the cognitive load of maintaining the targeting logic that decides whether to bid. What most advertisers don't account for is what it costs when you bid on impressions you should have rejected before the auction. In GoNet, our in-house DSP, we reject 23% of incoming bid requests at the pre-bid layer. Here's exactly what we're filtering and why.",
      sections: [
        {
          heading: "The categories we filter pre-bid",
          content:
            "Pre-bid filtering happens in six categories: IVT and bot traffic (matched against live third-party lists from HUMAN and DoubleVerify), supply path quality (we reject impressions that arrive through more than 3 intermediary hops in the supply chain), domain category blocks (MFA sites, domain parking, incentivized traffic pools), viewability prediction below threshold (sub-50% predicted viewability using publisher-level historical data), geographic anomalies (bid requests claiming to originate from target markets but with IP evidence suggesting otherwise), and ad format compliance failures (bid requests that don't conform to the declared creative spec).",
        },
        {
          heading: "How the rules engine works",
          content:
            "The filtering layer runs before any targeting evaluation, which is intentional — there's no point running expensive audience matching logic against a bid you're going to reject on quality grounds. Rules execute in order of computational cost: the cheapest checks (format compliance, domain blocklist) run first; the more expensive checks (supply path analysis, viewability prediction) only run if the impression passes the initial filters. The whole process adds approximately 2ms to bid evaluation latency, well within OpenRTB response time requirements.",
        },
        {
          heading: "What the 23% actually represents",
          content:
            "Of the 23% we reject: roughly 40% are domain category blocks (MFA and low-quality sites), 30% are supply path quality failures, 20% are IVT matches, and the remaining 10% are split across viewability prediction failures and geographic anomalies. The distribution varies significantly by market — Indonesia has a higher rate of supply path anomalies than Singapore; Vietnam has elevated IVT rates compared to regional averages. We maintain per-market filter calibrations to account for this.",
        },
        {
          heading: "The financial impact",
          content:
            "Across our managed book of business, pre-bid filtering saves approximately $1.2M annually in wasted spend — impressions that would have been served but delivered no measurable audience value. The actual figure is probably higher because it doesn't account for the downstream cost of poor viewability on campaign metrics and the budget inefficiency of over-serving to fraudulent environments.",
        },
      ],
      conclusion:
        "Pre-bid filtering isn't glamorous work, but it's one of the highest-ROI investments in programmatic infrastructure. If you're running a DSP or working with one, understand what filtering happens before the auction — and what the rejection rate is. A DSP with a 0% pre-bid rejection rate isn't cleaner than ours; it's just passing the cost of those impressions to the advertiser.",
    },
  },
  {
    slug: "sea-ad-market-in-5-charts",
    img: "/assets/featured-case-1.png",
    category: "Industry",
    title: "The SEA ad market in 5 charts (and one uncomfortable trend).",
    excerpt:
      "Quarterly numbers from across Indonesia, Singapore, Philippines, and Vietnam — plus what's not in the deck.",
    author: "Reza Adhi",
    authorRole: "Head of Programmatic",
    date: "Feb 29, 2026",
    readTime: "4 min read",
    tags: ["INDUSTRY", "SEA", "MARKET DATA"],
    relatedSlugs: [
      "ctv-in-sea",
      "google-cookie-reversal",
      "why-we-stopped-buying-open-exchange-impressions",
    ],
    body: {
      intro:
        "Every quarter we compile internal trading data across our SEA markets and compare it against available industry benchmarks. This quarter's numbers were mostly in line with expectations — except for one trend that doesn't show up in the public reports but has significant implications for how we're planning Q3 budgets.",
      sections: [
        {
          heading: "Chart 1: Programmatic share of display is plateauing",
          content:
            "Programmatic's share of total display spend in SEA hit approximately 78% this quarter and has been flat for three consecutive quarters. This isn't a sign of stagnation — it reflects that programmatic has essentially absorbed all the addressable display inventory. The remaining 22% is primarily direct IO deals for premium placements, sponsorships, and inventory that isn't available via DSP for contractual or technical reasons. We're at peak programmatic share for display.",
        },
        {
          heading: "Chart 2: CTV is growing faster in Indonesia than anywhere else in the region",
          content:
            "Indonesia CTV spend grew 84% year-over-year in our portfolio — significantly ahead of Singapore (41%), Philippines (52%), and Vietnam (38%). The driver is smart TV penetration, which is accelerating as device prices fall. The implication: if you're buying CTV in SEA and not over-indexing on Indonesia, you're undersizing the biggest growth market.",
        },
        {
          heading: "Chart 3: Social's share of performance budgets is declining",
          content:
            "For the first time in our data, social media's share of performance-objective campaign budgets declined quarter-over-quarter across three of four markets. The shift is going primarily to programmatic native and search. This tracks with what we hear anecdotally — iOS signal loss has made social performance campaigns measurably less efficient for DTC and e-commerce clients, and the budget is following the efficiency.",
        },
        {
          heading: "The uncomfortable trend",
          content:
            "Here's what's not in the public reports: MFA (Made for Advertising) site traffic in SEA is growing. Our pre-bid filter is rejecting a higher volume of MFA-originated bid requests every quarter. These sites are multiplying because the economics work — they generate enough ad revenue from buyers who don't filter pre-bid to stay profitable. The advertisers funding these sites mostly don't know they're doing it. If you're not actively filtering MFA domains either at the DSP level or via your ad verification partner, a meaningful fraction of your budget is subsidising content farms.",
        },
      ],
      conclusion:
        "The headline numbers for SEA digital advertising are healthy. But the distribution of where that spend goes — and the quality of the inventory absorbing it — is increasingly uneven. The gap between programmatic buyers who filter well and those who don't is widening, and it's showing up in cost-per-outcome data. Standard industry benchmarks won't tell you this because they aggregate across both populations.",
    },
  },
  // ─── Paste into app/blog/data.ts → inside the BLOG_POSTS array ───
// Add a comma after the last existing entry before pasting.

{
  "slug": "how-to-make-a-sandwich",
  "img": "/assets/featured-case-1.png",
  "category": "Programmatic",
  "title": "How to Make a Sandwich",
  "excerpt": "Making a sandwich might seem like the easiest thing in the world, and honestly",
  "author": "Rafi Abdillah",
  "authorRole": "Designer / Chef",
  "date": "May 4, 2026",
  "readTime": "5 min read",
  "body": {
    "intro": "",
    "sections": [],
    "conclusion": ""
  },
  "blocks": [
    {
      "id": "u1wgy0q",
      "type": "quote",
      "content": "Making a sandwich might seem like the easiest thing in the world—and honestly, it is. But a great sandwich? That takes just a little more thought. Whether you're putting together a quick lunch or testing out your CMS with some mock content, this guide walks you through the process step by step."
    },
    {
      "id": "0j5ho63",
      "type": "heading2",
      "content": "🥪 What You’ll Need"
    },
    {
      "id": "l8bvq3y",
      "type": "paragraph",
      "content": "At its core, a sandwich only requires a few basic components:"
    },
    {
      "id": "fhpfll3",
      "type": "bulletList",
      "content": "Bread – white, whole wheat, sourdough, or anything you like\nProtein – chicken, turkey, eggs, tofu, or even just cheese\nSpread – mayonnaise, mustard, butter, or sauce\nVegetables – lettuce, tomato, cucumber, onions (optional but recommended)\nExtras – cheese, pickles, or seasoning"
    },
    {
      "id": "8z47125",
      "type": "divider",
      "content": ""
    },
    {
      "id": "fz6e463",
      "type": "heading2",
      "content": "🔪 Step-by-Step Instructions"
    },
    {
      "id": "4ztue5k",
      "type": "heading3",
      "content": "1. Choose Your Bread"
    },
    {
      "id": "4gsabvm",
      "type": "paragraph",
      "content": "Start by selecting your bread. Soft bread works well for simple sandwiches, while crusty bread adds texture and structure."
    },
    {
      "id": "psy8z2f",
      "type": "heading3",
      "content": "2. Add Your Spread"
    },
    {
      "id": "7y68uxs",
      "type": "paragraph",
      "content": "Spread your choice of condiment evenly across one or both slices. This adds flavor and prevents the sandwich from being too dry."
    },
    {
      "id": "b8ri72b",
      "type": "heading3",
      "content": "3. Layer the Protein"
    },
    {
      "id": "hmcmhxr",
      "type": "paragraph",
      "content": "Place your main filling—like grilled chicken or sliced deli meat—on one slice of bread. Make sure it’s evenly distributed."
    },
    {
      "id": "1dbuigd",
      "type": "heading3",
      "content": "4. Add Vegetables"
    },
    {
      "id": "xghpcuz",
      "type": "paragraph",
      "content": "Layer your veggies on top. This adds crunch, freshness, and a bit of color."
    },
    {
      "id": "ys79ozx",
      "type": "heading3",
      "content": "5. Add Extras"
    },
    {
      "id": "nzpxuwq",
      "type": "paragraph",
      "content": "Cheese, pickles, or even a sprinkle of salt and pepper can elevate your sandwich."
    },
    {
      "id": "tfer2wv",
      "type": "heading3",
      "content": "6. Close and Slice"
    },
    {
      "id": "57yj777",
      "type": "paragraph",
      "content": "Place the second slice of bread on top. Press gently, then slice the sandwich in half if you like."
    },
    {
      "id": "tkrsju1",
      "type": "heading2",
      "content": "💡 Tips for a Better Sandwich"
    },
    {
      "id": "lq4694n",
      "type": "bulletList",
      "content": "Balance flavors – combine salty, fresh, and creamy elements\nDon’t overfill – too much stuffing makes it hard to eat\nToast if needed – a quick toast can improve texture\nUse fresh ingredients – it makes a noticeable difference"
    },
    {
      "id": "6f48xrp",
      "type": "heading2",
      "content": "🧪 Example Variation"
    },
    {
      "id": "fit42yp",
      "type": "paragraph",
      "content": "Simple Chicken Sandwich"
    },
    {
      "id": "a5zv1mc",
      "type": "bulletList",
      "content": "Whole wheat bread\nGrilled chicken breast\nLettuce and tomato\nMayonnaise\nA pinch of salt and pepper"
    },
    {
      "id": "rm7ayhe",
      "type": "heading2",
      "content": "📝 Final Thoughts"
    },
    {
      "id": "rtmmvzq",
      "type": "paragraph",
      "content": "A sandwich is more than just food—it’s a flexible, customizable meal that can match your taste, diet, and mood. Once you understand the basics, you can experiment endlessly.\n\nPerfect for testing your CMS—and even better for lunch."
    }
  ],
  "tags": [
    "PROGRAMMATIC",
    "SANDWICH",
    "COOK"
  ],
  "relatedSlugs": [
    "incrementality-testing",
    "why-our-dsp-rejects-23-percent",
    "mmm-is-back"
  ],
  "seo": {
    "metaTitle": "How to Make a Sandwich",
    "metaDescription": "Making a sandwich might seem like the easiest thing in the world, and honestly,",
    "focusKeyword": "how to make a sandwich",
    "ogTitle": "",
    "ogDescription": "",
    "ogImage": "",
    "canonical": "",
    "noIndex": false
  }
},
  {
    slug: "incrementality-testing",
    img: "/assets/featured-case-2.png",
    category: "Measurement",
    title: "Incrementality testing without breaking your campaign pacing.",
    excerpt:
      "A practical playbook for running geo holdouts on always-on campaigns.",
    author: "Joko Wibowo",
    authorRole: "Head of Analytics",
    date: "Feb 22, 2026",
    readTime: "8 min read",
    tags: ["MEASUREMENT", "INCREMENTALITY", "TESTING"],
    relatedSlugs: [
      "mmm-is-back",
      "google-cookie-reversal",
      "why-we-stopped-buying-open-exchange-impressions",
    ],
    body: {
      intro:
        "Incrementality testing is the closest thing to ground truth in digital attribution, and it's underused because it has a reputation for being disruptive to campaign delivery. Most teams worry that geo holdouts or PSA tests will tank their pacing metrics and create reporting anomalies they'll have to explain to clients. Having run 40+ incrementality tests across two years without a single significant pacing incident, we think that reputation is mostly unwarranted. Here's the practical playbook.",
      sections: [
        {
          heading: "The two test types and when to use each",
          content:
            "Geo holdout tests split your target geography into matched test and control groups, withholding ads from the control group. They're the cleanest test design but require your audience to be geographically addressable. PSA (public service ad) tests replace your ads in the control group with low-value PSA creative, which holds auction participation constant. Geo holdouts are our first choice for any campaign where geographic segmentation is practical. PSA tests work when your audience is defined by behavioural criteria that can't be geographically partitioned.",
        },
        {
          heading: "Matching test and control groups",
          content:
            "The quality of your test depends almost entirely on how well your test and control groups are matched before the test begins. We match on: prior conversion rates (at least 4 weeks of baseline), demographic composition, device mix, and day-of-week delivery patterns. Groups that are well-matched at baseline will give you a clean read on the treatment effect. Groups that aren't matched will produce results that look significant but are driven by pre-existing differences.",
        },
        {
          heading: "Keeping pacing intact",
          content:
            "The pacing concern is real but manageable. If you withhold 20% of your audience as a control group, your campaign will initially under-pace because your audience pool is smaller. The solution is to set your holdout percentage relative to the headroom in your pacing curve — never more than the percentage by which your current delivery is ahead of pace. For always-on campaigns running at 95%+ delivery, you should use a 5-10% holdout maximum. For campaigns with 30%+ delivery headroom, you can safely use larger holdout groups and get more statistical power.",
        },
        {
          heading: "What to do with the results",
          content:
            "An incrementality test result is a point-in-time measurement of a specific channel's contribution under specific conditions. It's valuable for validating attribution model assumptions and making strategic budget allocation decisions, but it should inform rather than override your day-to-day optimisation signals. When test results and attribution models disagree significantly (more than 30% on channel credit), we use the test result as the ground truth and recalibrate the attribution model rather than discarding the test.",
        },
      ],
      conclusion:
        "Incrementality testing isn't a special project — it should be a permanent fixture of your measurement practice. The barrier is mostly operational: the test design, the pacing management, and the result interpretation are learnable skills. The knowledge that comes from 12 months of continuous incrementality testing is significantly more reliable than any attribution model, and it compounds over time as your test history accumulates.",
    },
  },
];

export const FEATURED_POST = BLOG_POSTS[0];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
  return slugs
    .map((s) => BLOG_POSTS.find((p) => p.slug === s))
    .filter(Boolean) as BlogPost[];
}
