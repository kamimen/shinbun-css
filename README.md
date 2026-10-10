![shinbun.css icon](docs/images/icon.svg)

# shinbun.css

English | [日本語](README_ja.md)

CSS for laying out Japanese newspaper pages (新聞の紙面, *shinbun no shimen*). Vertical and horizontal writing (縦組み *tategumi* and 横組み *yokogumi*), multi-column layout (*dan*, 段), column-spanning headlines (*danunuki*, 段抜き), nameplates, ad slots and tables are written with HTML and CSS only. It has no dependencies.

![license: MIT](https://img.shields.io/badge/license-MIT-blue) ![size: 3.9 kB gzip](https://img.shields.io/badge/size-3.9%20kB%20gzip-brightgreen) ![tested: Chrome 154](https://img.shields.io/badge/tested-Chrome%20154-brightgreen) ![not tested: Firefox, Safari](https://img.shields.io/badge/not%20tested-Firefox%20%C2%B7%20Safari-red) ![requires: Chrome 123+, Firefox 120+, Safari 17.5+ (per MDN BCD)](https://img.shields.io/badge/requires%20(MDN%20BCD)-Chrome%20123%2B%20%C2%B7%20Firefox%20120%2B%20%C2%B7%20Safari%2017.5%2B-lightgrey)

> The documents under `docs/`, the examples and the issue templates are in Japanese. Only this README is translated.

- `<article>`, `<h2>`, `<figure>`, `<aside>` and `<table>` are styled without classes
- The size and position of an article are set with data attributes such as `data-sb-span="4"`
- Vertical and horizontal writing use the same markup; you switch the writing direction with an attribute
- Articles can be tiled into rectangles of "N dan × M lines" with coordinates. JavaScript can check whether the text overflows a rectangle
- Sources for terms and numbers are collected with links in the [specification](docs/SPEC.md) and the [reference list](docs/REFERENCES.md). Terminology follows [JLReq (Requirements for Japanese Text Layout)][jlreq]
- The CSS is about 15 KB minified (about 4 KB gzipped). JavaScript is optional and about 5 KB

## Usage

Load the CSS and write the page. The only classes are `.sb-paper` (the root of a page) and `.sb-page` (the page area).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/kamimen/shinbun-css@v0.1.0/dist/shinbun.min.css">

<div class="sb-paper">
  <main class="sb-page">
    <article data-sb-span="4">
      <h2>Headline</h2>
      <p>Body text…</p>
      <p>More body text…</p>
    </article>
  </main>
</div>
```

- The default is vertical writing. For horizontal writing, put `data-sb-writing="horizontal"` on `.sb-paper`.
- Set the number of dan an article occupies with `data-sb-span`.
- A vertical page is wider than the screen, so it scrolls horizontally.
- Parts that have no plain-HTML element (*katamidashi* shoulder headlines, *sodemidashi* sleeve headlines, lead, byline, …) take a class (such as `class="sb-kicker"`). The list is in [docs/API.md](docs/API.md).

The optional JavaScript (tate-chu-yoko for 2-digit numbers, writing-direction switch, overflow detection) is loaded like this:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/kamimen/shinbun-css@v0.1.0/dist/shinbun.js"></script>
```

`@v0.1.0` in the URL is the version to load. Pin it, and the display will not change when a newer version comes out. To host the files yourself, copy `dist/shinbun.min.css` from the repository.

### Tiling rectangles with coordinates

To tile articles into rectangles like a real newspaper (block layout), add `sb-page--grid` to `.sb-page` and give each element a position and a size.

```html
<div class="sb-paper" style="--sb-dan: 10; --sb-chars: 10; --sb-lines: 50">
  <main class="sb-page sb-page--grid">

    <!-- Nameplate: from the 1st line from the right, 8 lines wide; from the 1st dan from the top, 3 dan tall -->
    <header data-sb-x="1" data-sb-w="8" data-sb-y="1" data-sb-span="3">
      <h1>Fictional Shimbun</h1>
    </header>

    <!-- Article: from the 9th line from the right, 16 lines wide; from the 3rd dan from the top, 5 dan tall -->
    <article data-sb-x="9" data-sb-w="16" data-sb-y="3" data-sb-span="5">…</article>

    <!-- Ad below the articles: the bottom 3 dan -->
    <div class="sb-ad sb-ad--kijishita" data-sb-x="1" data-sb-w="50" data-sb-span="3">Ad</div>
  </main>
</div>
```

```
Coordinates in vertical writing (example: --sb-lines: 50, --sb-dan: 10)

   data-sb-x (line axis, counted from the right)
  50 ……………………… 9    8 …… 1
   ┌───────┬───────────────┬────────┐ ← dan 1 (data-sb-y="1")
   │       │               │ name-  │
   │ ……    │ article       ├────────┤ ← dan 4
   │       │ (data-sb-w=16,│ box    │
   │       │  data-sb-span=5)       │
   ├───────┴───────────────┴────────┤ ← dan 8
   │   ad below articles (3 dan)    │
   └────────────────────────────────┘ ← dan 10
```

If the text does not fit in the given rectangle, it overflows. Find it with `Shinbun.findOverflow()`, then shorten the text or fix the dimensions (see [`examples/demo.js`](examples/demo.js) for a usage example).

## Examples

[`examples/`](examples/) has one example per kind of page. All content is fictional. Open the [example index](examples/index.html) (the index page is also set with shinbun.css) and the [starter page](examples/starter.html) first to get the whole picture.

| Example | Contents |
|---|---|
| [Example index](examples/index.html) | The index page is itself a shinbun.css newspaper page. Click an article to go to that example |
| [Starter](examples/starter.html) | The smallest example: the only classes are the paper and the page area; everything else is plain HTML and `data-*` attributes |
| [Front page](examples/front.html) | Vertical nameplate, reversed horizontal headline, photo, a column of boxes, ad below the articles |
| [Society page](examples/society.html) | A page with many articles: photos, boxes, a column, an ad below the articles |
| [Sports page](examples/sports.html) | Reversed horizontal headline, large photo, tables of results and standings |
| [International page](examples/international.html) | An article with a photo, a glossary box, small articles |
| [Culture and books page](examples/culture.html) | A reading-event article, a book review, a serial, a box of new books |
| [Editorial page](examples/editorial.html) | Editorial, commentary, readers' letters |
| [Market page](examples/market.html) | An article and a table of right-aligned figures |
| [TV listings](examples/tv.html) | A horizontally set program table inside a vertical page |
| [Full-page ad](examples/ad.html) | An ad slot that uses all dan and all lines of the page |
| [Extra edition (*gogai*)](examples/extra.html) | A nameplate without an issue number, and a large horizontal headline |
| [Horizontal trade-paper style](examples/trade.html) | Horizontal nameplate, column-spanning horizontal headline, photo |
| [Blog home](examples/blog-home.html) | An article list for a newspaper-style blog (horizontal) |
| [Blog article](examples/blog-article.html) | Column-spanning headline, lead, photo, body, related articles (horizontal) |
| [Kadan/haidan page](examples/kadan.html) | A central nameplate and illustration, and selected poems with comments by each selector (fictional) |
| [Go and shogi page](examples/igo-shogi.html) | Go and shogi board diagrams (set as tables), commentary, game records |
| [Fashion page](examples/fashion.html) | Large photos with short articles |
| [No placement](examples/flow.html) | The simple way of writing: articles are packed in order. Switching the writing direction |

The list of page types is in [SPEC §10.7](docs/SPEC.md#107-面の種類面種).

## API documentation

The data attributes, placement attributes, custom properties, classes and JavaScript API are listed in [docs/API.md](docs/API.md). That file is generated from [`src/manifest.json`](src/manifest.json) with `npm run gen`.

## Glossary

Terms used in making newspaper pages. The definitions are summaries of the sources; follow the links for the original text. The full table is in [SPEC §3](docs/SPEC.md#3-用語と定義) (Japanese).

### Typesetting terms (JLReq glossary)

| Term | Meaning | In this library |
|---|---|---|
| tategumi (縦組) | (vertical setting) Arranging characters from top to bottom, lines from right to left, and dan from top to bottom ([JLReq glossary][jlreq-glossary]) | Default |
| yokogumi (横組) | (horizontal setting) Arranging characters from left to right, lines from top to bottom, and dan from left to right (same) | `data-sb-writing="horizontal"` |
| dangumi (段組) | (multi-column setting) A method of dividing one continuous text into two or more parts (dan) within a page, with a space (*dankan*) between the parts (same) | Inside `.sb-article` |
| dan (段) | A division of the text in multi-column setting (same). In a newspaper, one block made by dividing the page height into 15 is one dan, the unit of layout for articles, photos and ads ([Shinbun Koukoku Navi][navi]) | `--sb-dan`, `data-sb-span` |
| dankan (段間) | (dan gap) The space between dan in multi-column setting ([JLReq glossary][jlreq-glossary]) | `--sb-gap` |
| danunuki (段抜き) | (column spanning) On a multi-column page, placing a headline, figure, etc. across several dan ([JLReq glossary][jlreq-glossary], [4.1.11][jlreq-4-1-11]) | `column-span: all` on headlines, photos and boxes |
| kihon hanmen (基本版面) | (basic text area) The layout of the text area specified by writing direction, number of dan, character size, characters per line, number of lines, line gap and dan gap ([JLReq glossary][jlreq-glossary], [2.2.4][jlreq-2-2-4]) | Tokens ([§6](docs/SPEC.md#6-版面の設計トークン)) |
| jisage / tentsuki (字下げ・天付き) | (indent / flush) Indenting / not indenting the first line of a paragraph by one em of the paragraph's character size ([JLReq 3.5.1][jlreq-3-5-1]) | `<p>` in body text, `.sb-flush` |
| tatechuyoko (縦中横) | In a vertical line, setting characters horizontally while keeping them upright; mainly used for 2-digit numbers ([JLReq 2.3.2][jlreq-2-3-2], [3.2.5][jlreq-3-2-5]). Newspapers use it only for 2-digit numbers ([Nikkei note][nikkei-note]) | `.sb-tcy`, `autoTcy` |
| kinsoku shori (禁則処理) | (line-breaking rules) Processing to avoid prohibited line-start, line-end and inseparable-sequence breaks ([JLReq glossary][jlreq-glossary]) | `line-break: strict` |
| tsumegumi (詰め組み) | (tight setting) Setting characters with tighter advance than solid setting. In books, used in some large headings ([JLReq 2.1.3][jlreq]) | `palt`, `vpal` on headings |

### Newspaper terms

| Term | Meaning | Source | In this library |
|---|---|---|---|
| daiji (題字) | (nameplate) The newspaper's name, designed and placed like a doorplate on the front page. Right top in vertical papers, center of the top dan in horizontal papers | [Asahi NIE][nie], [Asahi vol.01][asahi1] | `.sb-nameplate`, `.sb-masthead` |
| daiji-shita / daiji-yoko (題字下・題字横) | The area below a vertical nameplate (beside a horizontal one) with the issue date, publisher, etc. General papers often put an ad further below or beside it | [Asahi NIE][nie] | `.sb-nameplate__meta` |
| rangai (欄外) | (outside the frame) Information about the paper shown above the outer frame at the top of the page (page, edition, date and weekday, paper name, postal approval, copyright, issue number) | [Asahi NIE][nie], [Asahi vol.03][asahi3] | `.sb-folio` |
| menmei (面名) | (page name) In the morning edition, white-on-black text at the top edge ("Economy", "Society", "Sports", …) | [Asahi vol.02][asahi2] | `.sb-folio__section` |
| chudan-kei (中段罫) | The rule that separates dan of an article: horizontal in vertical setting, vertical in horizontal setting. It does not meet the outer frame | [Asahi NIE][nie] | (not drawn) |
| toppu kiji (トップ記事) | (top story) The most important news of the day, placed at the right top of the front page, next to the nameplate. Each page's top story is also at the right top. On the front page it is called *atama*, the next one *kata* | [Asahi NIE][nie], [Asahi vol.02][asahi2] | `.sb-article--lead` |
| shu-midashi (主見出し) | (main headline) The headline that expresses the most important content | [Personal Henshucho][personal], [Akatsuki Printing][aik-midashi] | `<h2>`, `.sb-headline` |
| kata-midashi (肩見出し) | (shoulder headline) A headline before the main headline that supplements it | same | `.sb-kicker` |
| sode-midashi (袖見出し) | (sleeve headline) A headline that explains or supplements the main headline | same | `.sb-sleeve` |
| waki-midashi (脇見出し) | A small headline lined up on the left of the main headline (Kyoto Shimbun's usage). Close to *sode-midashi*; names differ by company | [Kyoto Shimbun note][kyoto2] | `.sb-sub` |
| hashira-midashi (柱見出し) | A headline showing the theme of related articles placed on one page. Limit it to one per page | [Akatsuki Printing][aik-midashi], [Unyu Soren][unyu] | (set by the author) |
| yoko-midashi (横見出し) | (horizontal headline) A headline set horizontally on a vertical page. The side margins are half of the largest character in the headline | [Akatsuki Printing][aik-midashi] | `.sb-yoko` |
| kaimyo-midashi (戒名見出し) | A headline made only of kanji. Forbidden; include at least one kana | [Akatsuki Printing][aik-midashi], [Kyoto Shimbun note][kyoto2] | — |
| rīdo (maebun) (リード) | (lead) A text placed after the headline that summarizes the main points, used for top stories etc. Often set across 2–4 dan | [Asahi NIE][nie] | `.sb-lead` |
| honbun (本文) | (body) Basically an inverted pyramid: the important things first | [Asahi NIE][nie] | `<p>` |
| nagashi-gumi (流し組み) | (flow setting) The text of an article flows from the right top to the left bottom, and when it meets the headline of the next article, it bounces down to the next dan | [Asahi NIE][nie], [Personal Henshucho][personal] | — |
| burokku-gumi (ブロック組み) | (block setting) Dividing each article into a rectangle and arranging them like blocks (also called *kukakugata* or *hakogumi-gata*) | [Asahi NIE][nie], [Personal Henshucho][personal], [Akatsuki Printing][aik-layout] | `.sb-page--grid` |
| osaete nagasu (押えて流す) | First fix the position and size of boxes, photos and serials, then place headlines and flow articles between them. The standard technique for vertical pages | [Akatsuki Printing][aik-layout] | [§10.8](docs/SPEC.md#108-紙面づくりの定石) |
| kakomi (囲み) | (box) An article independent of the others, enclosed by lines on all four sides | [Personal Henshucho][personal] | `<aside>`, `.sb-box` |
| tatami (タタミ) | An article with a rule on one side to make it stand out from the others: serials, commentary, etc. | [Personal Henshucho][personal] | — |
| koramu (コラム) | (column) Analysis of a main article, or a short comment on a seasonal or local topic | [Personal Henshucho][personal] | `.sb-column` |
| shikaku (死角) | (blind spot) Places that are hard to notice on a vertical page (left top and right bottom). Put boxes and photos there | [Akatsuki Printing][aik-layout] | — |
| wari-tsuke / men-wari (割付・面割) | (layout / page assignment) Placing text, figures and photos; deciding which articles and photos go on which page is *men-wari* | [Personal Henshucho][personal], [Akatsuki Printing][aik-layout] | (done by the author) |
| seiri (整理) | (editing and layout) Placing articles on the page and writing headlines. The person in charge is a *seiri kisha* | [Wikipedia][wiki-seiri], [Kyoto Shimbun note][kyoto2] | — |
| etoki (エトキ（絵解き）) | The caption of a photo or figure | [Personal Henshucho][personal] | `<figcaption>` |
| gogai (号外) | (extra edition) A temporary edition without a serial number, announcing very big news | [Asahi vol.03][asahi3] | — |
| menshu (面種) | (page type) The kind of page in a newspaper. On paper, newspapers are distinguished by page type | [NINJAL][ninjal] | [§10.7](docs/SPEC.md#107-面の種類面種) |
| buranketto-ban (ブランケット判) | (blanket size) The standard size of general Japanese papers: 406 × 545 mm (Wikipedia), 406.5 × 546 mm (Nikkei note) | [Wikipedia][wiki-blanket], [Nikkei note][nikkei-note] | — |

### Advertising terms

| Term | Meaning | Source | In this library |
|---|---|---|---|
| 記事下広告 (ad below articles) | An ad below the rule between the articles and the ad area. Called by the number of dan and the width, such as "zen 5-dan" or "5-dan 1/2". Some companies call "5-dan 1/2" "han 5-dan" | [Niche Media][niche], [Shinbun Koukoku Navi][navi], [Adcro][adcro] | `.sb-ad--kijishita`, `--zen`, `--han` |
| 全 15 段 | A full-page ad | [Shinbun Koukoku Navi][navi], [Yomiuri Palette][yomiuri] | `.sb-ad--full` |
| 雑報広告（小枠広告） | Standard ads inside the article area other than the ad below articles: in-article, *tsukidashi*, below the nameplate (beside it), between articles, etc. | [Niche Media][niche], [Tokyo Adwise][adwise] | — |
| 題字下広告 | A single ad slot below the nameplate on the front page; beside the nameplate in papers with a horizontal nameplate | [Adcro][adcro] | — |
| 突き出し広告 | An ad that sticks out to the left, right or both sides in the article area just above the ad below articles. Two dan is common | [Adcro][adcro], [Niche Media][niche] | — |
| 記事挟み広告 | An ad placed inside an article, usually 1 cm × 1 dan | [Adcro][adcro] | — |

## Specification and plans

- Specification: [docs/SPEC.md](docs/SPEC.md): HTML structure, algorithms, correspondence with standards, newspaper conventions (format, dan count and characters per line, character size, headlines, ad sizes, page types, layout techniques, forbidden layouts)
- API reference: [docs/API.md](docs/API.md): attributes, custom properties, classes, functions (generated)
- Plan: [docs/PLAN.md](docs/PLAN.md): background, purpose, scope, design principles, schedule
- Reference list: [docs/REFERENCES.md](docs/REFERENCES.md): all links

### About standards

| Standard | Role |
|---|---|
| [JLReq (Requirements for Japanese Text Layout)][jlreq] W3C Working Group Note, 2020-08-11 | The main basis for terms and design. It is mainly about books and is not newspaper-specific. This library refers to 2.2.4 basic text area, 2.3 vertical and horizontal writing, 2.1.3 tight setting, 3.2.5 tate-chu-yoko, 3.5.1 indentation, 4.1.11 column-spanning headings, and the glossary |
| JIS X 4051 "Formatting rules for Japanese documents" | The standard that JLReq is mainly based on. Its text was read and the correspondence is in [SPEC §9.1](docs/SPEC.md#91-jis-x-40512004-との対応). This library does not claim conformance |
| CSS specifications | [Writing Modes][css-wm], [Multi-column][css-mc], [Grid][css-grid], [Text Level 3][css-text3], [Text Level 4][css-text4], etc. The list is in [SPEC §2.2](docs/SPEC.md#22-css-の仕様) |

I found no public standard or plan document that defines a whole newspaper page. Newspaper-specific matters depend on each company's internal rules and on industry custom. So I read practical explanations (the Asahi NIE glossary, pages by printing companies, ad size tables and so on) and summarized them with sources.

## Browser support

The versions that support the required features (`@layer`, CSS nesting, `light-dark()`, `color-mix()`, etc.) are Chrome 123, Firefox 120 and Safari 17.5 (according to [MDN's compatibility data](https://github.com/mdn/browser-compat-data)). Details are in [SPEC §11](docs/SPEC.md#11-ブラウザ対応).

Display was checked only in Chrome 154.

> [!CAUTION]
> I have not checked the display in Firefox or Safari. The minimum versions above come from MDN's compatibility data, and I have not tried them on real browsers. Vertical writing, multi-column layout, `column-span`, `light-dark()` and so on may look different from Chrome. If you find a broken layout, please report it in an issue with the browser and version.

## Limitations

- Column spanning across only some of the dan (inside an article) is not possible, because CSS `column-span` takes only `all` and `none` (the horizontal headline `.sb-yoko` is a separate part and can occupy any number of dan)
- Articles are not placed automatically. The author specifies position and size
- Flowing text into separated or L-shaped regions is not possible
- Vertical tables are not supported (tables are shown horizontally)
- Characters are not flattened (*henpei*)
- The CSS for "tate-chu-yoko only for 2-digit numbers" in vertical body text (`text-combine-upright: digits 2`) does not work even in Chrome 154. The helper JS `autoTcy` substitutes for it

See [SPEC §12](docs/SPEC.md#12-制限) for the full list.

## Development

```sh
npm test          # check that the manifest, CSS, JS, docs and examples agree, and run the unit tests
npm run gen       # generate docs/API.md and the CSS placement attributes from manifest.json
npm run build     # create dist/
npm run serve     # show the examples at http://127.0.0.1:5180/examples/
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute.

## License

[MIT License](LICENSE)

This library does not imitate the pages of any particular newspaper and is not affiliated with any newspaper company. The nameplate is a frame for your own name or logo. All newspaper names, people, organizations and events in the examples are fictional.

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
