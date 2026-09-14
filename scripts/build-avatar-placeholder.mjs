/**
 * Renders public/assets/team/avatar-placeholder.svg to PNG.
 *
 * The PNG is committed, so this only needs running when the SVG changes:
 *   npm run build:avatar
 *
 * PNG rather than shipping the SVG directly because next/image refuses to
 * optimize SVG unless `dangerouslyAllowSVG` is turned on, and turning that on
 * site-wide to save one small file is a bad trade.
 *
 * sharp comes in with Next, which is why it is not a direct dependency. If
 * this script ever fails to resolve it, the committed PNG is still fine — only
 * regeneration is blocked.
 */
import sharp from 'sharp';
import * as path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets', 'team');
const src = path.join(dir, 'avatar-placeholder.svg');
const out = path.join(dir, 'avatar-placeholder.png');

// 320px so the 80px circle still looks sharp on a 3x display.
const SIZE = 320;

await sharp(src, { density: 512 })
  .resize(SIZE, SIZE)
  .png({ compressionLevel: 9 })
  .toFile(out);

console.log(`wrote ${path.relative(process.cwd(), out)} at ${SIZE}x${SIZE}`);
