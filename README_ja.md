![shinbun.css のアイコン](docs/images/icon.svg)

# shinbun.css

日本の新聞の紙面を組むための CSS です。縦組みと横組み、段組み、段抜きの見出し、題字、広告枠、表を、HTML と CSS だけで書けます。依存するライブラリはありません。

![license: MIT](https://img.shields.io/badge/license-MIT-blue) ![size: 3.9 kB gzip](https://img.shields.io/badge/size-3.9%20kB%20gzip-brightgreen) ![tested: Chrome 154](https://img.shields.io/badge/tested-Chrome%20154-brightgreen) ![not tested: Firefox, Safari](https://img.shields.io/badge/not%20tested-Firefox%20%C2%B7%20Safari-red) ![requires: Chrome 123+, Firefox 120+, Safari 17.5+ (per MDN BCD)](https://img.shields.io/badge/requires%20(MDN%20BCD)-Chrome%20123%2B%20%C2%B7%20Firefox%20120%2B%20%C2%B7%20Safari%2017.5%2B-lightgrey)

[English](README.md) | 日本語

- `<article>`、`<h2>`、`<figure>`、`<aside>`、`<table>` には、クラスを付けなくても見た目が付きます
- 記事の大きさと位置は、`data-sb-span="4"` のようなデータ属性で指定します
- 縦組みと横組みは、組方向の属性を切り替えるだけで、同じ書き方で組めます
- 記事を「何段 × 何行」の長方形に敷き詰める座標指定ができます。本文が長方形からはみ出したかどうかは、JavaScript で調べられます
- 用語や数値の出典は、[仕様書](docs/SPEC.md)と[参考文献一覧](docs/REFERENCES.md)にリンクつきでまとめています。用語は [JLReq（日本語組版処理の要件）][jlreq]に従います
- CSS は最小化して約 15 KB（gzip で約 4 KB）です。JavaScript は必須ではなく、約 5 KB です

## 使い方

CSS を読み込み、紙面を書きます。クラスは、紙面の根 `.sb-paper` と、紙面領域 `.sb-page` だけです。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kamimen/shinbun-css@v0.1.0/dist/shinbun.min.css">

<div class="sb-paper">
  <main class="sb-page">
    <article data-sb-span="4">
      <h2>川のまちに市民の書斎</h2>
      <p>みどり市は七日、旧運河沿いの倉庫を改修し…</p>
      <p>本文はここに…</p>
    </article>
  </main>
</div>
```

- 既定は縦組みです。横組みにするには、`.sb-paper` に `data-sb-writing="horizontal"` を付けます。
- 記事が占める段数は `data-sb-span` で指定します。
- 縦組みの紙面は画面より広くなるので、横にスクロールします。
- 肩見出し・袖見出し・リード・署名など、素の HTML に対応する要素がないものは、クラスを付けます（`class="sb-kicker"` など）。一覧は [docs/API.md](docs/API.md) にあります。

任意の JavaScript（2 桁の数字の縦中横、組方向の切り替え、はみ出しの検出）は、次のように読み込みます。

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/kamimen/shinbun-css@v0.1.0/dist/shinbun.js"></script>
```

URL の `@v0.1.0` は、読み込むバージョンです。固定しておくと、あとで更新されても表示が変わりません。自分のサーバーに置く場合は、リポジトリの `dist/shinbun.min.css` をコピーしてください。

### npm から使う

```sh
npm install @kamimen/shinbun-css
```

```js
import "@kamimen/shinbun-css/css/min";            // 最小化した CSS（"@kamimen/shinbun-css/css" もある）
import { autoTcy } from "@kamimen/shinbun-css/js"; // 任意のスクリプト
```

npm 経由で jsDelivr からも読み込めます: `https://cdn.jsdelivr.net/npm/@kamimen/shinbun-css@0.1.0/dist/shinbun.min.css`

### 座標指定で、長方形に敷き詰める

実際の新聞のように、記事を長方形に敷き詰める（ブロック組みにする）には、`.sb-page` に `sb-page--grid` を重ね、各要素に位置と大きさを指定します。

```html
<div class="sb-paper" style="--sb-dan: 10; --sb-chars: 10; --sb-lines: 50">
  <main class="sb-page sb-page--grid">

    <!-- 題字: 右から 1 行目に、8 行の幅で、上から 1 段目に、3 段分 -->
    <header data-sb-x="1" data-sb-w="8" data-sb-y="1" data-sb-span="3">
      <h1>架空新聞</h1>
    </header>

    <!-- 記事: 右から 9 行目に、16 行の幅で、上から 3 段目に、5 段分 -->
    <article data-sb-x="9" data-sb-w="16" data-sb-y="3" data-sb-span="5">…</article>

    <!-- 記事下広告: 下端の 3 段 -->
    <div class="sb-ad sb-ad--kijishita" data-sb-x="1" data-sb-w="50" data-sb-span="3">広告</div>
  </main>
</div>
```

```
縦組みの座標（--sb-lines: 50, --sb-dan: 10 の例）

   data-sb-x（行軸。右から数える）
  50 ……………………… 9    8 …… 1
   ┌───────┬───────────────┬────────┐ ← 段 1（data-sb-y="1"）
   │       │               │ 題字   │
   │ ……    │ 記事          ├────────┤ ← 段 4
   │       │ (data-sb-w=16,│ 囲み   │
   │       │  data-sb-span=5)       │
   ├───────┴───────────────┴────────┤ ← 段 8
   │        記事下広告（3段）        │
   └────────────────────────────────┘ ← 段 10
```

指定した長方形に本文が収まらないと、はみ出します。`Shinbun.findOverflow()` で見つけて、文章を減らすか寸法を直します（[`examples/demo.js`](examples/demo.js) に使用例があります）。

## 例

[`examples/`](examples/) に、面ごとの例があります。内容はすべて架空です。まず[例の一覧](examples/index.html)（一覧ページも shinbun.css で組んでいます）と、[はじめの一枚](examples/starter.html)を開くと、全体がつかめます。

| 例 | 内容 |
|---|---|
| [例の一覧](examples/index.html) | 一覧ページ自体も shinbun.css で組んだ紙面。記事をクリックすると、その例へ移る |
| [はじめの一枚](examples/starter.html) | クラスは紙面と紙面領域だけ。あとは素の HTML と `data-*` 属性で組む最小の例 |
| [一面](examples/front.html) | 縦題字、反転の横見出し、写真、囲みの列、記事下広告 |
| [社会面](examples/society.html) | 記事を多く並べる面。写真、囲み、コラム、記事下広告 |
| [スポーツ面](examples/sports.html) | 反転の横見出し、大きな写真、結果と順位の表 |
| [国際面](examples/international.html) | 写真つきの記事、用語メモの囲み、小さな記事 |
| [文化・読書面](examples/culture.html) | 朗読会の記事、書評、連載、新刊の囲み |
| [社説面](examples/editorial.html) | 社説、論説、読者の声 |
| [市況面](examples/market.html) | 記事と、桁をそろえた数値の表 |
| [テレビ欄](examples/tv.html) | 縦組みの紙面の中に、横組みの番組表 |
| [全面広告](examples/ad.html) | 紙面の全段・全行を使う広告枠 |
| [号外](examples/extra.html) | 号数のない題字と、大きな横見出し |
| [横組みの専門紙風](examples/trade.html) | 横題字、段抜きの横見出し、写真 |
| [ブログのトップ](examples/blog-home.html) | 新聞風ブログの記事一覧（横組み） |
| [ブログの記事](examples/blog-article.html) | 段抜きの見出し、リード、写真、本文、関連記事（横組み） |
| [歌壇・俳壇面](examples/kadan.html) | 中央の題字と挿絵、選者ごとの入選作と評（架空） |
| [囲碁・将棋面](examples/igo-shogi.html) | 碁盤と将棋盤の図（表で組む）、解説、対局の記録 |
| [ファッション面](examples/fashion.html) | 写真を大きく使い、短い記事を添える |
| [位置指定なし](examples/flow.html) | 記事を順に詰める簡易な書き方。組方向の切り替え |

面の種類の一覧は[仕様書 §10.7](docs/SPEC.md#107-面の種類面種)にあります。

## API ドキュメント

データ属性、配置の属性、カスタムプロパティ、クラス、JavaScript の一覧は [docs/API.md](docs/API.md) にあります。このファイルは [`src/manifest.json`](src/manifest.json) から `npm run gen` で生成しています。

## 用語集

新聞の紙面づくりの用語です。定義は出典から要約したもので、リンク先で原文を確認できます。表の全体は [仕様書 §3](docs/SPEC.md#3-用語と定義) にあります。

### 組版の用語（JLReq の用語集）

| 用語 | 読み | 意味 | 本ライブラリ |
|---|---|---|---|
| 縦組 | たてぐみ | 文字を上から下へ、行を右から左へ、段を上から下へ配列すること（[JLReq 用語集][jlreq-glossary]） | 既定 |
| 横組 | よこぐみ | 文字を左から右へ、行を上から下へ、段を左から右へ配列すること（同上） | `data-sb-writing="horizontal"` |
| 段組 | だんぐみ | 連続する 1 系列の文章を 1 ページの中で 2 つ以上の部分（段）に分割し、各部分の間に空白（段間）を設けて文字を配置する方法（同上） | `.sb-article` の内部 |
| 段 | だん | 段組において、分割された 1 区分（同上）。新聞では、1 ページの縦幅を 15 分割したブロックが 1 段で、記事・写真・広告のレイアウトの単位（[新聞広告ナビ][navi]） | `--sb-dan`、`data-sb-span` |
| 段間 | だんかん | 段組の段と段との間の空き（[JLReq 用語集][jlreq-glossary]） | `--sb-gap` |
| 段抜き | だんぬき | 段組のページで、見出し、図版などを複数段にまたがって配置すること（[JLReq 用語集][jlreq-glossary]、[4.1.11][jlreq-4-1-11]） | 見出し・写真・囲みの `column-span: all` |
| 基本版面 | きほんはんめん | 組方向、段数、文字サイズ、字詰め数、行数、行間及び段間で指定する版面体裁（[JLReq 用語集][jlreq-glossary]、[2.2.4][jlreq-2-2-4]） | トークン（[§6](docs/SPEC.md#6-版面の設計トークン)） |
| 字下げ・天付き | じさげ・てんづき | 段落の先頭行を、その段落の文字サイズの全角アキだけ下げる／下げない（[JLReq 3.5.1][jlreq-3-5-1]） | 本文の `<p>`、`.sb-flush` |
| 縦中横 | たてちゅうよこ | 縦組の行中で、文字を縦向きのまま横組にすること。主に 2 桁の数字などで利用される（[JLReq 2.3.2][jlreq-2-3-2]、[3.2.5][jlreq-3-2-5]）。新聞では 2 桁の数字だけ（[日経 note][nikkei-note]） | `.sb-tcy`、`autoTcy` |
| 禁則処理 | きんそくしょり | 行頭禁則、行末禁則、分離（分割）禁止などの禁則を避けるために行われる処理（[JLReq 用語集][jlreq-glossary]） | `line-break: strict` |
| 詰め組み | つめぐみ | ベタ組より字送りを詰めて文字を配置する方法。書籍では大きな文字サイズの見出しで使う例がある（[JLReq 2.1.3][jlreq]） | 見出しの `palt`、`vpal` |

### 新聞の用語

| 用語 | 読み | 意味 | 出典 | 本ライブラリ |
|---|---|---|---|---|
| 題字（題号） | だいじ | 新聞名をデザイン化して、表札のように 1 面に置いたもの。縦型は右上、横型は最上段中央に置く | [朝日 NIE][nie]、[朝日 vol.01][asahi1] | `.sb-nameplate`、`.sb-masthead` |
| 題字下・題字横 | だいじした・だいじよこ | 縦型の題字の下で、発行日・発行所・発行者名などを記すところ。横型の題字では題字横。一般紙ではさらにその下や横に広告が入る | [朝日 NIE][nie] | `.sb-nameplate__meta` |
| 欄外 | らんがい | 紙面最上部の外枠の上に表示する、その新聞に関する情報（ページ、版、発行年月日・曜日、新聞名、郵便物認可、コピーライト、号数） | [朝日 NIE][nie]、[朝日 vol.03][asahi3] | `.sb-folio` |
| 面名 | めんめい | 朝刊では、紙面の上端の白抜き文字（「経済」「社会」「スポーツ」など） | [朝日 vol.02][asahi2] | `.sb-folio__section` |
| 中段罫 | ちゅうだんけい | 記事の段と段を区切る罫線。縦組みの場合は横に、横組みの場合は縦に引かれる。外枠の罫とは交わらない | [朝日 NIE][nie] | （引かない） |
| トップ記事 | とっぷきじ | その日の最重要ニュース。1 面の右上、題字の次に置く。各面のトップ記事も右上にある。1 面では「アタマ」、次を「カタ」という | [朝日 NIE][nie]、[朝日 vol.02][asahi2] | `.sb-article--lead` |
| 主見出し | しゅみだし | 最も重要な内容を表す見出し | [パーソナル編集長][personal]、[あかつき印刷][aik-midashi] | `<h2>`、`.sb-headline` |
| 肩見出し | かたみだし | 主見出しの前で補足する見出し | 同上 | `.sb-kicker` |
| 袖見出し | そでみだし | 主見出しを説明・補足する見出し | 同上 | `.sb-sleeve` |
| 脇見出し | わきみだし | 主見出しの左側に小さく並ぶ見出し（京都新聞の呼び方）。袖見出しと近く、社によって呼び方が違う | [京都新聞 note][kyoto2] | `.sb-sub` |
| 柱見出し | はしらみだし | 関連する記事を一つの紙面に載せるとき、全体のテーマを示す見出し。1 つの紙面に 1 か所にとどめる | [あかつき印刷][aik-midashi]、[運輸労連][unyu] | （作者が組む） |
| 横見出し | よこみだし | 縦組みの紙面で、横向きに組む見出し。左右の空白は、見出しの中で一番大きな文字の半分 | [あかつき印刷][aik-midashi] | `.sb-yoko` |
| 戒名見出し | かいみょうみだし | 漢字ばかりの見出し。禁じ手で、1 字以上のかなを入れる | [あかつき印刷][aik-midashi]、[京都新聞 note][kyoto2] | — |
| リード（前文） | まえぶん | トップ記事などで、要点を簡潔にまとめて見出しの次に置く文章。多くの場合 2〜4 段分を通して組む | [朝日 NIE][nie] | `.sb-lead` |
| 本文 | ほんぶん | 重要なことから先に書く逆三角形が基本 | [朝日 NIE][nie] | `<p>` |
| 流し組み | ながしぐみ | 記事の文章が右上から左下に向かって流れ、次の記事の見出しにぶつかると下の段に跳ね返って進む組み付け方 | [朝日 NIE][nie]、[パーソナル編集長][personal] | — |
| ブロック組み | ぶろっくぐみ | 一つ一つの記事を四角く区切り、ブロックのように並べていく手法（区画型・箱組型ともいう） | [朝日 NIE][nie]、[パーソナル編集長][personal]、[あかつき印刷][aik-layout] | `.sb-page--grid` |
| 押えて流す | おさえてながす | 囲み・写真・連載などの位置と大きさを先に固定し、その間に見出しを配置しながら記事を流す手法。縦書き紙面の定石 | [あかつき印刷][aik-layout] | [§10.8](docs/SPEC.md#108-紙面づくりの定石) |
| 囲み（カコミ） | かこみ | ほかの記事から独立して、上下左右を線で囲まれた記事 | [パーソナル編集長][personal] | `<aside>`、`.sb-box` |
| タタミ | たたみ | 片側に罫線を引き、ほかの記事との違いを目立たせる記事。連載記事や論説など | [パーソナル編集長][personal] | — |
| コラム | | 主となる記事の分析や、季節・街などの話題への短い評論 | [パーソナル編集長][personal] | `.sb-column` |
| 死角 | しかく | 縦書き紙面で目立ちにくい場所（左上と右下）。囲みや写真を置いて生かす | [あかつき印刷][aik-layout] | — |
| 割付・面割 | わりつけ・めんわり | 文字・図・写真などを配置すること。どの記事と写真をどの面に入れるかを決めることが面割 | [パーソナル編集長][personal]、[あかつき印刷][aik-layout] | （作者が行う） |
| 整理 | せいり | 記事を紙面に配置し、見出しを付ける作業。担う記者が整理記者 | [Wikipedia][wiki-seiri]、[京都新聞 note][kyoto2] | — |
| エトキ（絵解き） | えとき | 写真・図版の説明文 | [パーソナル編集長][personal] | `<figcaption>` |
| 号外 | ごうがい | 特大ニュースを知らせる、通し番号のない臨時発行 | [朝日 vol.03][asahi3] | — |
| 面種 | めんしゅ | 新聞の面の種類。新聞は、紙上では面種によって区別される | [国立国語研究所][ninjal] | [§10.7](docs/SPEC.md#107-面の種類面種) |
| ブランケット判 | | 日本の一般紙の標準的な判型。406 × 545 mm（Wikipedia）、406.5 × 546 mm（日経 note） | [Wikipedia][wiki-blanket]、[日経 note][nikkei-note] | — |

### 広告の用語

| 用語 | 意味 | 出典 | 本ライブラリ |
|---|---|---|---|
| 記事下広告 | 新聞記事と広告欄の間の罫線より下の広告。占める段数と横幅で「全 5 段」「5 段 1/2」などと呼ぶ。「5 段 1/2」を「半 5 段」と呼ぶ社もある | [ニッチメディア][niche]、[新聞広告ナビ][navi]、[アドクロ][adcro] | `.sb-ad--kijishita`、`--zen`、`--han` |
| 全 15 段 | 全面広告 | [新聞広告ナビ][navi]、[読売パレット][yomiuri] | `.sb-ad--full` |
| 雑報広告（小枠広告） | 記事下広告以外の、記事の中の定型広告。記事中・突き出し・題字下（題字横）・記事挟みなど | [ニッチメディア][niche]、[東京アドワイズ][adwise] | — |
| 題字下広告 | 1 面の題字の下に 1 枠だけ設けられる広告。題字が横にある新聞では題字横広告 | [アドクロ][adcro] | — |
| 突き出し広告 | 記事下広告のすぐ上の記事欄に、左右や両側に突き出して載る広告。2 段が一般的 | [アドクロ][adcro]、[ニッチメディア][niche] | — |
| 記事挟み広告 | 記事の中に、通常 1cm × 1 段の大きさで載る広告 | [アドクロ][adcro] | — |

## 仕様と企画

- 仕様書: [docs/SPEC.md](docs/SPEC.md) — HTML 構造、アルゴリズム、規格との対応、新聞固有の取り決め（判型、段数と 1 行の字数、文字の大きさ、見出し、広告サイズ、面の種類、紙面づくりの定石、禁止レイアウト）
- API リファレンス: [docs/API.md](docs/API.md) — 属性・カスタムプロパティ・クラス・関数（生成物）
- 企画: [docs/PLAN.md](docs/PLAN.md) — 背景、目的、範囲、設計の原則、計画
- 参考文献一覧: [docs/REFERENCES.md](docs/REFERENCES.md) — 全リンク

### 規格について

| 規格 | 位置づけ |
|---|---|
| [JLReq（日本語組版処理の要件）][jlreq] W3C Working Group Note, 2020-08-11 | 用語と設計の主な根拠。主に書籍が対象で、新聞専用ではない。本ライブラリは、2.2.4 基本版面、2.3 縦組みと横組み、2.1.3 詰め組み、3.2.5 縦中横、3.5.1 字下げ、4.1.11 段抜きの見出し、用語集を参照している |
| JIS X 4051「日本語文書の組版方法」 | JLReq が主な根拠とする規格。本文を読み、[SPEC §9.1](docs/SPEC.md#91-jis-x-40512004-との対応) に対応を載せた。本ライブラリは適合を主張しません |
| CSS の仕様 | [Writing Modes][css-wm]、[Multi-column][css-mc]、[Grid][css-grid]、[Text Level 3][css-text3]、[Text Level 4][css-text4] など。一覧は [仕様書 §2.2](docs/SPEC.md#22-css-の仕様) |

新聞の紙面全体を定める、公開された規格や企画書は、調べた範囲では見つかりませんでした。新聞に固有の事柄は、各社の社内基準と業界の慣習によります。そのため、朝日新聞 NIE の用語集、印刷会社の解説、広告サイズの表などを読み、出典を付けてまとめています。

## ブラウザ対応

必須の機能（`@layer`、CSS ネスティング、`light-dark()`、`color-mix()` など）が使えるバージョンは、Chrome 123、Firefox 120、Safari 17.5 です（[MDN の互換性データ](https://github.com/mdn/browser-compat-data)による）。詳しくは [仕様書 §11](docs/SPEC.md#11-ブラウザ対応)。

表示を確認したのは Chrome 154 だけです。

> [!CAUTION]
> Firefox と Safari では表示を確認していません。上の最低バージョンは MDN の互換性データから決めたもので、実機では試していません。縦組み、段組み、`column-span`、`light-dark()` などが Chrome と違って見えるかもしれません。崩れを見つけたら、ブラウザとバージョンを書いて issue に報告してください。

## 制限

- 一部の段にまたがる段抜き（記事の内側）はできません。CSS の `column-span` が `all` と `none` だけだからです（横見出し `.sb-yoko` は別部品として自由な段数を占められます）
- 記事の自動配置はしません。位置と大きさは作者が指定します
- 飛び地や L 字の領域への流し込みはできません
- 縦組みの表は扱いません（表は横組みで表示します）
- 文字は扁平にしません
- 縦組みの本文で「2 桁の数字だけ縦中横」にする CSS（`text-combine-upright: digits 2`）は、Chrome 154 でも使えません。補助 JS の `autoTcy` で代替します

全体は[仕様書 §12](docs/SPEC.md#12-制限)にあります。

## 開発

```sh
npm test          # マニフェスト、CSS、JS、文書、例の食い違いの検査と、単体テスト
npm run gen       # manifest.json から docs/API.md と CSS の配置属性を生成する
npm run build     # dist/ を作る
npm run serve     # 例を http://127.0.0.1:5180/examples/ で表示
```

貢献の手順は [CONTRIBUTING.md](CONTRIBUTING.md) に書いています。

## ライセンス

[MIT License](LICENSE)

特定の新聞社の紙面を模したものではなく、どの新聞社とも関係がありません。題字は、自分の名前やロゴを入れる枠として用意しています。例に出てくる新聞名、人物、団体、出来事はすべて架空です。

[jlreq]: https://www.w3.org/TR/jlreq/
[jlreq-glossary]: https://www.w3.org/TR/jlreq/#appendix_7
[jlreq-2-2-4]: https://www.w3.org/TR/jlreq/#elements-of-kihon-hanmen
[jlreq-2-3-2]: https://www.w3.org/TR/jlreq/#major-differences-between-vertical-writing-mode-and-horizontal-writing-mode
[jlreq-3-2-5]: https://www.w3.org/TR/jlreq/#handling-of-tate-chu-yoko-horizontal-in-vertical-settings
[jlreq-3-5-1]: https://www.w3.org/TR/jlreq/#line-head-indent-at-the-beginning-of-paragraphs
[jlreq-4-1-11]: https://www.w3.org/TR/jlreq/#processing-of-column-spanning-headings
[nie]: http://nie.asahi.com/text/teacher-how-to-read/suzuki20130802.pdf
[asahi1]: https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-01-%E9%A1%8C%E5%AD%97%E7%B7%A8/
[asahi2]: https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-02-%E8%A8%98%E4%BA%8B%E3%81%AE%E4%B8%A6%E3%81%B9%E6%96%B9%E7%B7%A8/
[asahi3]: https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-03-%E3%81%84%E3%82%8D%E3%82%93%E3%81%AA%E6%95%B0%E5%AD%97%E7%B7%A8/
[aik-layout]: https://www.aik.co.jp/02support/01chishiki/01layout.html
[aik-midashi]: https://www.aik.co.jp/02support/01chishiki/13midashi.html
[personal]: https://personal.fudemame.net/newspaper/dictionary/
[unyu]: https://www.unyuroren.or.jp/activity/pr/journal/08/
[kyoto2]: https://note.com/kyotoshimbun/n/naee1a824a95d
[wiki-seiri]: https://ja.wikipedia.org/wiki/%E6%95%B4%E7%90%86%E8%A8%98%E8%80%85
[wiki-blanket]: https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%A9%E3%83%B3%E3%82%B1%E3%83%83%E3%83%88%E5%88%A4
[navi]: https://www.shinbun-navi.com/kijisita/kijisita.html
[pressnet]: https://www.pressnet.or.jp/publication/view/090101_166.html
[sendenkaigi]: https://www.sendenkaigi.com/marketing/media/sendenkaigi/001672/
[nikkei-note]: https://note.com/nikkei_staff/n/n7aa0a07045e8
[yomiuri]: https://www.yomiuri-pl.co.jp/ad/
[adcro]: https://bizpa.net/mag/post-14/
[niche]: https://www.nichemedia.jp/jirei/nandemokoukoku/3866
[adwise]: https://www.adwise.co.jp/column/column/a45
[ninjal]: https://www2.ninjal.ac.jp/gairaigo/Report126/houkoku3-2.pdf
[miyazaki1984]: https://www.jstage.jst.go.jp/article/jssdj/1984/47/1984_KJ00007024039/_article/-char/ja/
[zenn]: https://zenn.dev/inaniwaudon/articles/a80f7dc66ffe92
[flow-text]: https://github.com/inaniwaudon/flow-text-sample
[css-wm]: https://www.w3.org/TR/css-writing-modes-3/
[css-mc]: https://www.w3.org/TR/css-multicol-1/
[css-grid]: https://www.w3.org/TR/css-grid-1/
[css-text3]: https://www.w3.org/TR/css-text-3/
[css-text4]: https://drafts.csswg.org/css-text-4/
