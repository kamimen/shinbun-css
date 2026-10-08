// dist/ を作る: node scripts/build.mjs
// 依存なし。コメント（バナーを除く）と余分な空白を取り除くだけの簡易圧縮。
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
mkdirSync(dist, { recursive: true });

const src = readFileSync(join(root, "src/shinbun.css"), "utf8");
const banner = src.match(/^\/\*![\s\S]*?\*\//)[0];

const body = src
  .replace(banner, "")
  .replace(/\/\*[\s\S]*?\*\//g, "") // コメント
  .replace(/\s+/g, " ") // 空白の連続
  .replace(/\s*([{};,])\s*/g, "$1") // 記号まわり（: の前は子孫結合子なので触らない）
  .replace(/:\s+/g, ":") // 宣言の : の後ろ
  .replace(/;}/g, "}")
  .trim();

writeFileSync(join(dist, "shinbun.css"), src);
writeFileSync(join(dist, "shinbun.min.css"), `${banner}\n${body}\n`);
copyFileSync(join(root, "src/shinbun.js"), join(dist, "shinbun.js"));

const size = (p) => readFileSync(join(dist, p));
for (const f of ["shinbun.css", "shinbun.min.css", "shinbun.js"]) {
  const b = size(f);
  console.log(`${f.padEnd(16)} ${String(b.length).padStart(6)} B  (gzip ${gzipSync(b).length} B)`);
}
