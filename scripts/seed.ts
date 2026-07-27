/**
 * One-time seed script: imports the hardcoded blog posts from the legacy
 * data.ts file into MongoDB.
 *
 * Case studies are NOT seeded — they are static content served from
 * content/case-studies.json. See lib/content/case-studies.ts.
 *
 * Run: npx tsx scripts/seed.ts
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'gomobile';

// ─── Import legacy hardcoded data ────────────────────────────────────────────
// We dynamically require to avoid TypeScript path alias issues in plain Node
const { BLOG_POSTS } = require('../app/blog/data');

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB:', dbName);
    const db = client.db(dbName);

    // ── Blog posts ────────────────────────────────────────────────────────────
    const blogCol = db.collection('blogs');
    const now = new Date();

    let blogSkipped = 0;
    let blogInserted = 0;

    for (const post of BLOG_POSTS) {
      const existing = await blogCol.findOne({ slug: post.slug });
      if (existing) {
        blogSkipped++;
        continue;
      }
      await blogCol.insertOne({
        ...post,
        status: 'published',
        createdAt: now,
        updatedAt: now,
      });
      blogInserted++;
      console.log(`  ✓ Blog: ${post.title}`);
    }

    console.log(`\nBlog posts: ${blogInserted} inserted, ${blogSkipped} skipped (already exist)`);

    // ── Indexes ────────────────────────────────────────────────────────────────
    await blogCol.createIndex({ slug: 1 }, { unique: true });
    await blogCol.createIndex({ status: 1, createdAt: -1 });

    console.log('\nIndexes ensured ✓');
    console.log('\nSeed complete!');
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
