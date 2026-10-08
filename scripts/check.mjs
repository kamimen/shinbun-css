// マニフェスト・CSS・JS・文書・例が食い違っていないかを確かめる: node scripts/check.mjs
// 公開インターフェースの定義は src/manifest.json（唯一の定義）。
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const css = read("src/shinbun.css");
const js = read("src/shinbun.js");
const manifest = JSON.parse(read("src/manifest.json"));
const pkg = JSON.parse(read("package.json"));
const errors = [];
const fail = (msg) => errors.push(msg);

// コメントと文字列を除いた CSS（解析用）
const code = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/"(?:[^"\\]|\\.)*"/g, '""');
const set = (re, text, group = 0) => new Set([...text.matchAll(re)].map((m) => m[group]));
const diff = (a, b) => [...a].filter((x) => !b.has(x));

// 1. クラス: CSS ↔ マニフェスト
const cssClasses = set(/\.(sb-[a-z0-9_-]+)/g, code, 1);
const manClasses = new Set(manifest.classes.map((c) => c.name));
for (const c of diff(cssClasses, manClasses)) fail(`クラス .${c} が src/manifest.json にない`);
for (const c of diff(manClasses, cssClasses)) fail(`src/manifest.json のクラス .${c} が CSS にない`);
for (const c of manifest.classes) {
  if (!manifest.groups.includes(c.group)) fail(`クラス .${c.name} の group「${c.group}」が groups にない`);
  if (c.parent && !manClasses.has(c.parent)) fail(`クラス .${c.name} の parent「${c.parent}」が存在しない`);
  if (!c.description) fail(`クラス .${c.name} に description がない`);
}

// 2. カスタムプロパティ: CSS ↔ マニフェスト
const cssProps = new Set([...set(/(--sb-[a-z0-9-]+)\s*:/g, code, 1), ...set(/var\((--sb-[a-z0-9-]+)/g, code, 1)]);
const manProps = new Set([...manifest.tokens.map((t) => t.name), ...manifest.internalTokens]);
for (const p of diff(cssProps, manProps)) fail(`カスタムプロパティ ${p} が src/manifest.json にない`);
for (const p of diff(manProps, cssProps)) fail(`src/manifest.json の ${p} が CSS で使われていない`);

// 3. 属性: CSS・JS ↔ マニフェスト
const usedAttrs = new Set([...set(/\[(data-sb-[a-z-]+)/g, code, 1), ...set(/(data-sb-[a-z-]+)/g, js, 1)]);
const manAttrs = new Set([...manifest.attributes.map((a) => a.name), ...manifest.placement.map((a) => a.name)]);
for (const a of diff(usedAttrs, manAttrs)) fail(`属性 ${a} が src/manifest.json にない`);
for (const a of diff(manAttrs, usedAttrs)) fail(`src/manifest.json の属性 ${a} が CSS・JS で使われていない`);

// 4. JS: 公開する関数
for (const f of manifest.js) {
  if (!new RegExp(`export function ${f.name}\\b`).test(js)) fail(`src/manifest.json の関数 ${f.name} が src/shinbun.js にない`);
}
for (const m of js.matchAll(/export function (\w+)/g)) {
  if (!manifest.js.some((f) => f.name === m[1])) fail(`関数 ${m[1]} が src/manifest.json にない`);
}

// 5. 文書: 文書の中のバッククォートで囲んだ名前が、マニフェストにあること
const docs = ["docs/SPEC.md", "README.md", "README_en.md", "docs/PLAN.md", "docs/API.md"].filter((f) => {
  try { read(f); return true; } catch { return false; }
});
for (const f of docs) {
  const text = read(f);
  for (const m of text.matchAll(/`\.(sb-[a-z0-9_-]+)`/g)) {
    if (!manClasses.has(m[1])) fail(`${f}: 存在しないクラス .${m[1]}`);
  }
  for (const m of text.matchAll(/`(--sb-[a-z0-9-]+)`/g)) {
    if (!manProps.has(m[1])) fail(`${f}: 存在しないカスタムプロパティ ${m[1]}`);
  }
  for (const m of text.matchAll(/`(data-sb-[a-z-]+)[`=]/g)) {
    if (!manAttrs.has(m[1])) fail(`${f}: 存在しない属性 ${m[1]}`);
  }
}

// 6. 構造: レイヤー宣言、括弧の対応、バナー
if (!/@layer sb\.tokens, sb\.base, sb\.layout, sb\.components, sb\.utilities;/.test(code)) fail("@layer の宣言がない");
if ((code.match(/{/g) || []).length !== (code.match(/}/g) || []).length) fail("波括弧の数が合わない");
if (!css.startsWith("/*! shinbun.css v")) fail("先頭にバナーコメントがない");

// 7. 例: 例の HTML が使う sb- クラスと data-sb- 属性は、すべてマニフェストにある
for (const f of readdirSync(join(root, "examples")).filter((n) => n.endsWith(".html"))) {
  const html = read(`examples/${f}`);
  const used = set(/\b(sb-[a-z0-9_-]+)/g, [...html.matchAll(/class="([^"]*)"/g)].map((m) => m[1]).join(" "), 1);
  for (const c of used) if (!manClasses.has(c)) fail(`examples/${f} が存在しないクラス .${c} を使っている`);
  for (const m of html.matchAll(/\b(data-sb-[a-z-]+)=/g)) {
    if (!manAttrs.has(m[1])) fail(`examples/${f} が存在しない属性 ${m[1]} を使っている`);
  }
}

// 8. バージョンの一致
for (const [name, text] of [["src/shinbun.css", css], ["src/shinbun.js", js]]) {
  if (!text.includes(`v${pkg.version}`)) fail(`${name} のバナーが package.json の version (${pkg.version}) と一致しない`);
}

// 9. 生成物が最新であること（配置の属性の CSS、docs/API.md）
try {
  execFileSync(process.execPath, [join(root, "scripts/gen.mjs"), "--check"], { stdio: "pipe" });
} catch (e) {
  fail(String(e.stderr || e.message).trim().split("\n").join(" / "));
}

if (errors.length) {
  console.error(errors.map((e) => `✘ ${e}`).join("\n"));
  process.exit(1);
}
console.log(
  `✔ OK: クラス ${manClasses.size} 個、カスタムプロパティ ${manifest.tokens.length} 個、属性 ${manAttrs.size} 個、関数 ${manifest.js.length} 個`,
);
