import { readdirSync, statSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import { join, extname } from "path";

const imagesDir = join(process.cwd(), "public", "images");
const files = readdirSync(imagesDir).filter((f) =>
  /\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(f)
);

const hash = createHash("md5");
for (const f of files.sort()) {
  const mtime = statSync(join(imagesDir, f)).mtimeMs;
  hash.update(`${f}:${mtime}`);
}
const ver = hash.digest("hex").slice(0, 8);

writeFileSync(
  join(process.cwd(), "lib", "imgver.ts"),
  `// Auto-generated — do not edit manually
export const imgVer = "?v=${ver}";
`
);

console.log(`✓ imgver.ts generated (v=${ver})`);
