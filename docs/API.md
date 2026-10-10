# API リファレンス (v0.1.1)

> このファイルは `src/manifest.json` から `scripts/gen.mjs` が生成します。**手で編集しないでください**（`npm run gen` で更新します）。

考え方と用語は [SPEC.md](SPEC.md)、出典は [REFERENCES.md](REFERENCES.md) を参照してください。

- [データ属性](#データ属性)
- [配置の属性](#配置の属性)
- [カスタムプロパティ](#カスタムプロパティ)
- [クラス](#クラス)
- [クラスなしの素の HTML](#クラスなしの素の-html)
- [JavaScript](#javascript)

## データ属性

| 属性 | 付ける要素 | 値 | 既定 | 説明 |
|---|---|---|---|---|
| `data-sb-writing` | .sb-paper | `vertical`、`horizontal` | `vertical` | 組方向。縦組み（既定）か、横組みか。 |
| `data-sb-theme` | .sb-paper | `light`、`dark`、`auto` | `light` | 配色。`auto` は OS の設定に従う。 |
| `data-sb-debug` | .sb-paper | （値なし） | — | 紙面の直接の子を点線で囲み、配置を確かめやすくする。 |
| `data-sb-auto-tcy` | 任意の要素 | （値なし） | — | `src/shinbun.js` が、その要素の子孫の 2 桁の数字を `.sb-tcy` で包む。 |
| `data-sb-responsive` | .sb-paper | 数値（px） | — | `src/shinbun.js` が、画面幅に応じて `data-sb-writing` を切り替える。値は切り替える幅（px）。省略すると 768。 |
| `data-sb-no-tcy` | 任意の要素 | （値なし） | — | その子孫を `data-sb-auto-tcy` の対象から外す。 |

## 配置の属性

`.sb-page` の直接の子（記事、題字、横見出し、写真、囲み、表、広告枠）に付けて、位置と大きさを指定します。同じ指定は、インラインの `style="--sb-span: 4"` のようにカスタムプロパティでも書けます（任意の値を使いたいときや、範囲の外の値のとき）。インラインの指定が優先されます。

| 属性 | 対応するカスタムプロパティ | 値の範囲 | 説明 |
|---|---|---|---|
| `data-sb-span` | `--sb-span` | 1〜15 | 占める段数。 |
| `data-sb-y` | `--sb-y` | 1〜15 | 開始する段（1 から数える。縦組みでは上から、横組みでは左から）。 |
| `data-sb-x` | `--sb-x` | 1〜60 | 行軸の開始位置（1 から数える。縦組みでは右から、横組みでは上から）。 |
| `data-sb-w` | `--sb-w` | 1〜60 | 行軸方向に占める行数。 |

```html
<article data-sb-x="9" data-sb-w="16" data-sb-y="3" data-sb-span="5">…</article>
```

## カスタムプロパティ

上書きは `.sb-paper { --sb-… }` か、より内側の要素で行います。

### 版面

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-fs` | 0.8rem | 文字サイズ。本文の 1 字の大きさ。 |
| `--sb-lh` | 1.55 | 行送り（文字サイズに対する倍率）。行間は `--sb-lh` − 1。 |
| `--sb-chars` | 10 | 縦組みでの 1 段の字数。行長は `--sb-chars` × `--sb-fs`。 |
| `--sb-dan` | 10 | 縦組みでの 1 ページの段数。横組みでは `--sb-dan-h` の値になる。 |
| `--sb-dan-h` | 6 | 横組みでの 1 ページの段数。 |
| `--sb-lines` | 36 | 座標指定グリッド（`.sb-page--grid`）での、行軸方向の行数。 |
| `--sb-gap` | var(--sb-fs) | 段間・記事間のアキ。 |
| `--sb-pitch` | calc(var(--sb-fs) * var(--sb-lh)) | 行送りの実寸。座標指定の行の高さに使う。 |

### 色

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-paper` | light-dark(#f4eedd, #17140f) | 紙の色。 |
| `--sb-ink` | light-dark(#1b1812, #eee6d2) | 文字の色。 |
| `--sb-muted` | light-dark(#5d564a, #a79f8c) | 補助の文字の色。 |
| `--sb-rule` | light-dark(#1b1812, #eee6d2) | 罫線の色。 |
| `--sb-rule-soft` | light-dark(#9a917c, #6f6858) | 細い罫線の色。 |
| `--sb-accent` | light-dark(#a02a1f, #e5786b) | 強調の色（肩見出しなど）。 |
| `--sb-photo-bg` | light-dark(#cfc6b0, #3a352b) | 写真の下地の色。 |

### 書体

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-font-body` | 明朝体系のフォント一覧 | 本文の書体。 |
| `--sb-font-gothic` | ゴシック体系のフォント一覧 | ゴシック体の書体。 |

### 見出し

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-h-xl` | 3.4 | 特大の見出しの大きさ（文字サイズに対する倍率）。 |
| `--sb-h-l` | 2.4 | 大の見出しの大きさ。 |
| `--sb-h-m` | 1.7 | 中の見出しの大きさ。 |
| `--sb-h-s` | 1.2 | 小の見出しの大きさ。 |

### 写真

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-photo-ratio` | 4 / 5（横組みでは 4 / 3） | 写真の比率「幅 / 高さ」。 |

### 配置

| 名前 | 既定値 | 説明 |
|---|---|---|
| `--sb-y` | 自動 | 開始する段（1 から数える。縦組みでは上から、横組みでは左から）。`data-sb-y` でも指定できる。 |
| `--sb-span` | 3 | 占める段数。`data-sb-span` でも指定できる。 |
| `--sb-x` | 自動 | 行軸の開始位置（1 から数える。縦組みでは右から、横組みでは上から）。`data-sb-x` でも指定できる。 |
| `--sb-w` | 1 | 行軸方向に占める行数。座標指定のときは必ず指定する。`data-sb-w` でも指定できる。 |

内部用（上書きしない）: `--sb-track`

## クラス

種別: **block** は独立した部品、**element** は block の中の部品、**modifier** は block に重ねて使う変種です。

### 紙面

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-paper` | block | `<div>` | 紙面。根の要素。トークンと組方向を持つ。 |
| `.sb-paper--15dan` | modifier | `<div>` | 15 段 × 1 段 10 字のプリセット。 （`.sb-paper` に重ねる） |
| `.sb-paper--12dan` | modifier | `<div>` | 12 段 × 1 段 12 字のプリセット。 （`.sb-paper` に重ねる） |
| `.sb-page` | block | `<main>` | 紙面領域。段グリッド。縦組みでは天地が段数で決まる。 |
| `.sb-page--grid` | modifier | `<main>` | 座標指定の段グリッド（ブロック組み）。行軸方向を `--sb-lines` 行に固定する。 （`.sb-page` に重ねる） |

### 題字・欄外

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-masthead` | block | `<header>` | 題字の帯（横組み）。専門紙や横組みの紙面向け。 |
| `.sb-masthead__title` | element | `<h1>` | 帯の題字（新聞名）。 （`.sb-masthead` に重ねる） |
| `.sb-masthead__side` | element | `<div>` | 帯の左右に置く、号数や日付などの欄。 （`.sb-masthead` に重ねる） |
| `.sb-masthead__side--end` | modifier | `<div>` | 帯の右側の欄（右寄せ）。 （`.sb-masthead__side` に重ねる） |
| `.sb-nameplate` | block | `<header>` | 題字の枠。紙面の中に置く。縦組みの紙面では縦題字になる。文字でもロゴでもよい。 |
| `.sb-nameplate--horizontal` | modifier | `<header>` | 縦組みの紙面で、題字を横組みにする。 （`.sb-nameplate` に重ねる） |
| `.sb-nameplate__title` | element | `<h1>` | 題字の文字。 （`.sb-nameplate` に重ねる） |
| `.sb-nameplate__logo` | element | `<img>` | 題字のロゴ画像。利用者が自分のロゴを入れる。 （`.sb-nameplate` に重ねる） |
| `.sb-nameplate__meta` | element | `<p>` | 題字の脇に置く、号数・日付などの小さな文字（題字下）。 （`.sb-nameplate` に重ねる） |
| `.sb-folio` | block | `<div>` | 欄外。紙面最上部の外枠の上に表示する、面名や日付などの 1 行。 |
| `.sb-folio__section` | element | `<span>` | 欄外の中の面名（枠付き）。 （`.sb-folio` に重ねる） |

### 記事

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-article` | block | `<article>` | 記事。n 段を占める矩形。本文は段ごとに流れ、見出しは全段にまたがる（段抜き）。 |
| `.sb-article--lead` | modifier | `<article>` | トップ記事。縦組みでは罫線が二重になる。 （`.sb-article` に重ねる） |
| `.sb-article--editorial` | modifier | `<article>` | 社説・論説。本文をやや大きくする。 （`.sb-article` に重ねる） |

### 見出し

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-headline` | block | `<h2>` | 主見出し。 |
| `.sb-headline--xl` | modifier | `<h2>` | 主見出しの大きさ: 特大。 （`.sb-headline` に重ねる） |
| `.sb-headline--l` | modifier | `<h2>` | 主見出しの大きさ: 大。 （`.sb-headline` に重ねる） |
| `.sb-headline--m` | modifier | `<h2>` | 主見出しの大きさ: 中。 （`.sb-headline` に重ねる） |
| `.sb-headline--s` | modifier | `<h2>` | 主見出しの大きさ: 小。 （`.sb-headline` に重ねる） |
| `.sb-kicker` | block | `<p>` | 肩見出し。主見出しの前で補足する。 |
| `.sb-sleeve` | block | `<p>` | 袖見出し。主見出しを説明・補足する。 |
| `.sb-sub` | block | `<p>` | 脇見出し。主見出しに添える。 |
| `.sb-yoko` | block | `<h2>` | 横見出し。縦組みの紙面で横向きに組む。紙面の直接の子にして、位置と大きさを指定する。 |
| `.sb-yoko--reverse` | modifier | `<h2>` | 横見出しを反転（地を墨色、文字を紙色）にする。 （`.sb-yoko` に重ねる） |

### 本文

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-lead` | block | `<p>` | リード（前文）。 |
| `.sb-dateline` | block | `<p>` | 発信地を入れる要素。 |
| `.sb-byline` | block | `<p>` | 署名を入れる要素。 |
| `.sb-flush` | modifier | `<p>` | 天付き。字下げをしない段落。 |

### 写真

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-photo` | block | `<figure>` | 写真。 |
| `.sb-photo__img` | element | `<img>` | 写真の画像部分。 （`.sb-photo` に重ねる） |
| `.sb-photo__caption` | element | `<figcaption>` | 写真の説明文（エトキ）。 （`.sb-photo` に重ねる） |

### 囲み・コラム

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-box` | block | `<aside>` | 囲み。 |
| `.sb-box__title` | element | `<p>` | 囲みの見出し。 （`.sb-box` に重ねる） |
| `.sb-column` | modifier | `<article>` | コラム（固定欄）。記事に併用する。 （`.sb-article` に重ねる） |

### 表

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-table` | block | `<table>` | 表。横組みで表示する。 |
| `.sb-table--tv` | modifier | `<table>` | 番組表向けの、小さい文字と詰めた余白。 （`.sb-table` に重ねる） |
| `.sb-num` | modifier | `<td>` | 表の数値のセル。右寄せ、桁をそろえる。 |

### 広告

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-ad` | block | `<div>` | 広告枠。 |
| `.sb-ad--kijishita` | modifier | `<div>` | 記事下。段軸の末尾（縦組みでは紙面の下端）に寄せる。占める段数も指定する。 （`.sb-ad` に重ねる） |
| `.sb-ad--zen` | modifier | `<div>` | 全。行軸いっぱいに広げる。 （`.sb-ad` に重ねる） |
| `.sb-ad--han` | modifier | `<div>` | 半。行軸の半分（`--sb-lines` の半分）にする。`data-sb-x` も指定する。 （`.sb-ad` に重ねる） |
| `.sb-ad--zen5` | modifier | `<div>` | 全 5 段（占める段数を 5 にする）。 （`.sb-ad` に重ねる） |
| `.sb-ad--han5` | modifier | `<div>` | 半 5 段（占める段数を 5 にする）。 （`.sb-ad` に重ねる） |
| `.sb-ad--zen2` | modifier | `<div>` | 全 2 段（占める段数を 2 にする）。 （`.sb-ad` に重ねる） |
| `.sb-ad--han2` | modifier | `<div>` | 半 2 段（占める段数を 2 にする）。 （`.sb-ad` に重ねる） |
| `.sb-ad--full` | modifier | `<div>` | 全面。紙面の全段・全行を占める。 （`.sb-ad` に重ねる） |

### 罫線・文字

| クラス | 種別 | 要素 | 説明 |
|---|---|---|---|
| `.sb-rule` | block | `<hr>` | 罫線。 |
| `.sb-rule--double` | modifier | `<hr>` | 二重罫線。 （`.sb-rule` に重ねる） |
| `.sb-emphasis` | block | `<span>` | 圏点（傍点）。 |
| `.sb-tcy` | block | `<span>` | 縦中横。縦組みの中で、文字列を横向きに 1 字分で組む。 |
| `.sb-horizontal` | block | `<span>` | 局所的な横組み。 |
| `.sb-sideways` | block | `<span>` | 欧文を 90 度回転して組む。縦組みの既定は、欧文も正立。 |
| `.sb-gothic` | block | — | ゴシック体にする。 |
| `.sb-nowrap` | block | — | 折り返さない。 |

## クラスなしの素の HTML

次の要素は、クラスを付けなくても、同じ見た目になります。

| 素の HTML（セレクター） | 同じ見た目のクラス |
|---|---|
| `.sb-page > header` | `.sb-nameplate` |
| `.sb-page > header > h1` | `.sb-nameplate__title` |
| `.sb-page > article` | `.sb-article` |
| `.sb-page > article > h2` | `.sb-headline` |
| `.sb-paper figure` | `.sb-photo` |
| `.sb-paper figure > img` | `.sb-photo__img` |
| `.sb-paper figcaption` | `.sb-photo__caption` |
| `.sb-paper aside` | `.sb-box` |
| `.sb-paper aside > h3` | `.sb-box__title` |
| `.sb-paper table` | `.sb-table` |

```html
<div class="sb-paper">
  <main class="sb-page">
    <article data-sb-span="4">
      <h2>見出し</h2>
      <p>本文…</p>
    </article>
  </main>
</div>
```

## JavaScript

任意です。CSS だけでも使えます。`src/shinbun.js` は ES モジュールで、読み込むと `globalThis.Shinbun` にも入ります。

| 関数 | 説明 |
|---|---|
| `splitTcy(text)` | 文字列を、縦中横にする部分とそれ以外に分ける。DOM に依存しない。 |
| `autoTcy(root)` | `root` 以下の本文で、半角の 2 桁の数字を `.sb-tcy` で包む。何度呼んでも二重に包まない。 |
| `responsive(paper, { breakpoint })` | 画面幅に応じて `data-sb-writing` を切り替える。監視を止める関数を返す。 |
| `findOverflow(root)` | 座標指定の記事のうち、指定した長方形に収まらずにはみ出しているものを返す。 |
