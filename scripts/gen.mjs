// src/manifest.json から、次の 2 つを生成する。依存なし。
//   1. src/shinbun.css の「配置の属性」ブロック（data-sb-span などのセレクター）
//   2. docs/API.md（API リファレンス）
//
// node scripts/gen.mjs          生成する
// node scripts/gen.mjs --check  生成物が最新かを検証する（古ければ終了コード 1）
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const manifest = JSON.parse(read("src/manifest.json"));
const pkg = JSON.parse(read("package.json"));
const checkOnly = process.argv.includes("--check");

// ---------------------------------------------------------------------------
// 1. CSS の配置属性ブロック
// ---------------------------------------------------------------------------
function placementCss() {
  const lines = [];
  for (const a of manifest.placement) {
    const [from, to] = a.range;
    lines.push(`  /* ${a.name}: ${a.description} 値は ${from}〜${to}。 */`);
    for (let n = from; n <= to; n++) {
      lines.push(`  .sb-page > [${a.name}="${n}"] { ${a.property}: ${n}; }`);
    }
  }
  return lines.join("\n");
}

const BEGIN = "  /* BEGIN GENERATED: placement */";
const END = "  /* END GENERATED: placement */";

function nextCss() {
  const css = read("src/shinbun.css");
  const a = css.indexOf(BEGIN);
  const b = css.indexOf(END);
  if (a < 0 || b < 0 || b < a) throw new Error("src/shinbun.css に生成ブロックのマーカーがない");
  return css.slice(0, a + BEGIN.length) + "\n" + placementCss() + "\n" + css.slice(b);
}

// ---------------------------------------------------------------------------
// 2. docs/API.md
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/\|/g, "\\|");

function apiMd() {
  const out = [];
  const push = (...l) => out.push(...l);
  push(
    `# API リファレンス (v${pkg.version})`,
    "",
    "> このファイルは `src/manifest.json` から `scripts/gen.mjs` が生成します。**手で編集しないでください**（`npm run gen` で更新します）。",
    "",
    "考え方と用語は [SPEC.md](SPEC.md)、出典は [REFERENCES.md](REFERENCES.md) を参照してください。",
    "",
    "- [データ属性](#データ属性)",
    "- [配置の属性](#配置の属性)",
    "- [カスタムプロパティ](#カスタムプロパティ)",
    "- [クラス](#クラス)",
    "- [クラスなしの素の HTML](#クラスなしの素の-html)",
    "- [JavaScript](#javascript)",
    "",
    "## データ属性",
    "",
    "| 属性 | 付ける要素 | 値 | 既定 | 説明 |",
    "|---|---|---|---|---|",
  );
  for (const a of manifest.attributes) {
    const values = a.boolean ? "（値なし）" : a.values ? a.values.map((v) => `\`${v}\``).join("、") : "数値（px）";
    push(`| \`${a.name}\` | ${esc(a.on)} | ${values} | ${a.default ? `\`${a.default}\`` : "—"} | ${esc(a.description)} |`);
  }

  push(
    "",
    "## 配置の属性",
    "",
    "`.sb-page` の直接の子（記事、題字、横見出し、写真、囲み、表、広告枠）に付けて、位置と大きさを指定します。同じ指定は、インラインの `style=\"--sb-span: 4\"` のようにカスタムプロパティでも書けます（任意の値を使いたいときや、範囲の外の値のとき）。インラインの指定が優先されます。",
    "",
    "| 属性 | 対応するカスタムプロパティ | 値の範囲 | 説明 |",
    "|---|---|---|---|",
  );
  for (const a of manifest.placement) {
    push(`| \`${a.name}\` | \`${a.property}\` | ${a.range[0]}〜${a.range[1]} | ${esc(a.description)} |`);
  }
  push(
    "",
    "```html",
    '<article data-sb-x="9" data-sb-w="16" data-sb-y="3" data-sb-span="5">…</article>',
    "```",
    "",
    "## カスタムプロパティ",
    "",
    "上書きは `.sb-paper { --sb-… }` か、より内側の要素で行います。",
  );
  const tokenGroups = [...new Set(manifest.tokens.map((t) => t.group))];
  for (const g of tokenGroups) {
    push("", `### ${g}`, "", "| 名前 | 既定値 | 説明 |", "|---|---|---|");
    for (const t of manifest.tokens.filter((x) => x.group === g)) {
      push(`| \`${t.name}\` | ${esc(t.default)} | ${esc(t.description)} |`);
    }
  }
  push("", `内部用（上書きしない）: ${manifest.internalTokens.map((t) => `\`${t}\``).join("、")}`);

  push("", "## クラス", "", "種別: **block** は独立した部品、**element** は block の中の部品、**modifier** は block に重ねて使う変種です。");
  for (const g of manifest.groups) {
    const rows = manifest.classes.filter((c) => c.group === g);
    if (!rows.length) continue;
    push("", `### ${g}`, "", "| クラス | 種別 | 要素 | 説明 |", "|---|---|---|---|");
    for (const c of rows) {
      push(`| \`.${c.name}\` | ${c.role} | ${c.element ? `\`<${c.element}>\`` : "—"} | ${esc(c.description)}${c.parent ? ` （\`.${c.parent}\` に重ねる）` : ""} |`);
    }
  }

  push(
    "",
    "## クラスなしの素の HTML",
    "",
    "次の要素は、クラスを付けなくても、同じ見た目になります。",
    "",
    "| 素の HTML（セレクター） | 同じ見た目のクラス |",
    "|---|---|",
  );
  for (const c of manifest.classes.filter((x) => x.semantic)) {
    push(`| ${c.semantic} | \`.${c.name}\` |`);
  }
  push(
    "",
    "```html",
    '<div class="sb-paper">',
    '  <main class="sb-page">',
    '    <article data-sb-span="4">',
    "      <h2>見出し</h2>",
    "      <p>本文…</p>",
    "    </article>",
    "  </main>",
    "</div>",
    "```",
    "",
    "## JavaScript",
    "",
    "任意です。CSS だけでも使えます。`src/shinbun.js` は ES モジュールで、読み込むと `globalThis.Shinbun` にも入ります。",
    "",
    "| 関数 | 説明 |",
    "|---|---|",
  );
  for (const f of manifest.js) push(`| \`${f.signature}\` | ${esc(f.description)} |`);

  push("");
  return out.join("\n");
}

// ---------------------------------------------------------------------------
const outputs = [
  ["src/shinbun.css", nextCss()],
  ["docs/API.md", apiMd()],
];

let stale = 0;
for (const [path, text] of outputs) {
  const full = join(root, path);
  const current = existsSync(full) ? readFileSync(full, "utf8") : null;
  if (checkOnly) {
    if (current !== text) {
      console.error(`✘ ${path} が最新ではありません（npm run gen で更新してください）`);
      stale++;
    }
  } else if (current !== text) {
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, text);
    console.log(`生成: ${path}`);
  }
}
if (checkOnly) {
  if (stale) process.exit(1);
  console.log("✔ 生成物は最新です");
}
