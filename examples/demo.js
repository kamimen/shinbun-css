// 例のページ共通のスクリプト（shinbun.css の一部ではない）。
// 組方向・配色・配置の目印の切り替え、全体表示（縮小）、はみ出した記事の数の表示。
import "../src/shinbun.js";

const paper = document.querySelector(".sb-paper");
const bar = document.querySelector(".demo-bar");

function toggleGroup(attr, apply) {
  const buttons = [...document.querySelectorAll(`[data-${attr}]`)];
  for (const b of buttons) {
    b.addEventListener("click", () => {
      apply(b.dataset[attr]);
      for (const x of buttons) x.setAttribute("aria-pressed", String(x === b));
      report();
    });
  }
}

toggleGroup("writing", (v) => paper.setAttribute("data-sb-writing", v));
toggleGroup("theme", (v) => paper.setAttribute("data-sb-theme", v));
toggleGroup("debug", (v) => (v === "on" ? paper.setAttribute("data-sb-debug", "") : paper.removeAttribute("data-sb-debug")));

// 全体表示: 紙面の幅を画面に合わせて縮小する（CSS の zoom）。紙面は固定の大きさなので、狭い画面では縮小して見る
const stage = document.querySelector(".demo-stage");
const note = bar?.querySelector(".demo-note");
if (bar && stage) {
  const fit = document.createElement("button");
  fit.type = "button";
  fit.textContent = "全体表示";
  fit.setAttribute("aria-pressed", "false");
  bar.insertBefore(fit, document.getElementById("overflow-report") ?? note ?? null);
  const apply = () => {
    paper.style.zoom = "";
    if (fit.getAttribute("aria-pressed") !== "true") return;
    // 縦組みの紙面は、.sb-page の中で横にスクロールする。スクロールする幅の全体が収まる倍率にする
    const page = paper.querySelector(".sb-page");
    const avail = stage.clientWidth - 24;
    const needed = page.scrollWidth + (paper.offsetWidth - page.clientWidth);
    if (needed > avail) paper.style.zoom = String(avail / needed);
  };
  fit.addEventListener("click", () => {
    fit.setAttribute("aria-pressed", String(fit.getAttribute("aria-pressed") !== "true"));
    apply();
    report();
  });
  addEventListener("resize", apply);
}

function report() {
  const out = document.getElementById("overflow-report");
  if (!out) return;
  requestAnimationFrame(() => {
    const over = globalThis.Shinbun.findOverflow(paper);
    out.textContent = over.length ? `はみ出し: ${over.length} 件` : "はみ出し: なし";
    out.title = over.map((el) => el.querySelector(".sb-headline")?.textContent.trim() ?? "(見出しなし)").join("\n");
  });
}

addEventListener("load", report);
document.fonts?.ready.then(report);
bar?.setAttribute("data-ready", "");
