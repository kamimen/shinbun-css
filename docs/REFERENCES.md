# 参考文献・出典一覧

shinbun.css の用語、仕様、設計の根拠にした資料のリンク集です。

**ここに載せているのは、2026-10-08 にページまたは PDF を開き、引用している部分を本文で読んだ資料だけです。** 要旨や検索結果の抜粋だけで確認した資料は、載せていません。

- [A. 規格](#a-規格)
- [B. 新聞の用語・紙面づくりの実務](#b-新聞の用語紙面づくりの実務)
- [C. 判型・段・段数・1 行の字数](#c-判型段段数1-行の字数)
- [D. 広告](#d-広告)
- [E. 面の種類](#e-面の種類)
- [F. 研究](#f-研究)
- [G. 先行する実装](#g-先行する実装)
- [H. ブラウザ対応・CSS](#h-ブラウザ対応css)

## A. 規格

| 資料 | 引用している内容 |
|---|---|
| [日本語組版処理の要件（JLReq）](https://www.w3.org/TR/jlreq/) W3C Working Group Note, 2020-08-11, 日本語版 | **主に書籍を対象とする**と自ら述べる（§1.3）。基本版面の設計要素（[2.2.4](https://www.w3.org/TR/jlreq/#elements-of-kihon-hanmen)）、縦組みと横組みの違い（[2.3.2](https://www.w3.org/TR/jlreq/#major-differences-between-vertical-writing-mode-and-horizontal-writing-mode)）、詰め組み（2.1.3）、縦中横（[3.2.5](https://www.w3.org/TR/jlreq/#handling-of-tate-chu-yoko-horizontal-in-vertical-settings)）、段落先頭行の字下げ（[3.5.1](https://www.w3.org/TR/jlreq/#line-head-indent-at-the-beginning-of-paragraphs)）、段抜きの見出し（[4.1.11](https://www.w3.org/TR/jlreq/#processing-of-column-spanning-headings)）、[用語集](https://www.w3.org/TR/jlreq/#appendix_7)（段・段間・段抜き・段組・縦組・横組・版面・基本版面・行長・行送り・行間・字下げ・天付き・縦中横・禁則処理・詰め組み・柱・ノンブルの定義。JIS Z 8125 または JIS X 4051 の定義を採用したもの） |
| [JIS X 4051:2004 日本語文書の組版方法](https://kikakurui.com/x4/X4051-2004-02.html) kikakurui.com 掲載の本文（第 2 部） | 4.8 縦中横処理、7.3 とじの方向、7.4.1 版面の指定（字詰め数・行間・段間）、7.4.2 版面及び段の寸法、7.4.4 行の配置、8.3.3 f) 多段組における段抜きとする別行見出しの処理、段抜き・かべの用語定義。SPEC §9.1 |
| [w3c/jlreq（GitHub）](https://github.com/w3c/jlreq) | JLReq の元リポジトリ |

JLReq は、JIS X 4051「日本語文書の組版方法」を主な根拠にしています。JIS X 4051 は新聞を対象としておらず、shinbun.css は適合を主張しません。

## B. 新聞の用語・紙面づくりの実務

| 資料 | 引用している内容 |
|---|---|
| [朝日新聞 NIE「(57) 新聞作りに関する用語を知ろう」2013-08-02（PDF）](http://nie.asahi.com/text/teacher-how-to-read/suzuki20130802.pdf) 全国新聞教育研究協議会顧問の鈴木伸男による | 全文（項目 1〜9）: 題字（縦型は右上、横型は最上段中央）、題字下・題字横、トップ記事、見出し、前文（リード）、本文（逆三角形）、流し組みとブロック組み、**欄外**、**中段罫** |
| [朝日新聞ちょい解体新書 vol.01 題字編](https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-01-%E9%A1%8C%E5%AD%97%E7%B7%A8/) | 全文: 題字は 1 面右上の新聞名の文字。背景の図柄が東日本と西日本で違う |
| [朝日新聞ちょい解体新書 vol.02 記事の並べ方編](https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-02-%E8%A8%98%E4%BA%8B%E3%81%AE%E4%B8%A6%E3%81%B9%E6%96%B9%E7%B7%A8/) | 全文: 1 面の構成（アタマ、カタ、大型インデックス、コラム）、記事の配置は重要度に応じて「右から左」または「上から下」、面名は紙面上端の白抜き文字、**朝刊の面の一覧**（曜日つき） |
| [朝日新聞ちょい解体新書 vol.03 いろんな数字編](https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-03-%E3%81%84%E3%82%8D%E3%82%93%E3%81%AA%E6%95%B0%E5%AD%97%E7%B7%A8/) | 全文: 記事の文字サイズ（縦 3.3mm、横 3.9mm の扁平文字、2011 年から）、創刊からの通し番号（号数）は 1 面の題字の上、号外は通し番号のない臨時発行 |
| [あかつき印刷「編集サポート｜紙面レイアウトの基本と応用」](https://www.aik.co.jp/02support/01chishiki/01layout.html) | 全文: 縦書き紙面のレイアウトの定石（視線の流れ、死角、押えて流す手法、割付の手順、ブロック組み）、禁止レイアウト（両流れ、泣き別れ、飛びおり、飛びこし、ハラキリ、見出しの直列・並列、シリモチ）の定義と理由 |
| [あかつき印刷「編集サポート｜見出しの基本と応用」](https://www.aik.co.jp/02support/01chishiki/13midashi.html) | 全文: 見出しの構成、基本型（主見出しと袖見出しの二本）、字数の基準、ハリ、横見出しの左右のアキ、中見出し、戒名見出し |
| [パーソナル編集長「新聞用語集」](https://personal.fudemame.net/newspaper/dictionary/) | 全文: レイアウト、題字、題字下、X 型・T 型・区画型（箱組型）、通し組み・渡し組み・流し組み、見出しの種類、禁止レイアウト 8 種、カコミ・タタミ・コラムの定義と置き場所、エトキ（絵解き） |
| [運輸労連「見出しは究極の要約記事」](https://www.unyuroren.or.jp/activity/pr/journal/08/) | 全文: 見出しは柱・肩・主・袖の 4 種。最近の一般紙は 2 つの組み合わせが多い |
| [京都新聞 note「新聞整理のオキテ②〜見出しとは」2022-11-08](https://note.com/kyotoshimbun/n/naee1a824a95d) | 全文: 主見出し 8 字・脇見出し 10 字という従来の基準と、近年それが緩んでいること。頭見出し・尻見出し・肩見出し、戒名見出し |
| [Wikipedia「整理記者」](https://ja.wikipedia.org/wiki/%E6%95%B4%E7%90%86%E8%A8%98%E8%80%85) | 全文: 整理記者の役割。**出典不十分の注記あり** |

## C. 判型・段・段数・1 行の字数

| 資料 | 引用している内容 |
|---|---|
| [新聞広告ナビ「新聞記事下広告の原稿サイズのしくみ」](https://www.shinbun-navi.com/kijisita/kijisita.html) | 全文: **段の定義**（1 ページの縦幅を 15 分割したブロックが 1 段）、12 段組の登場と、広告は 15 段で計算するダブルスタンダード、広告の横幅は分数（1/2 など）で表す |
| [日本新聞協会「新聞協会報・紙面展望　2009年1月1日　12段制へ踏み出す」](https://www.pressnet.or.jp/publication/view/090101_166.html) | 全文: 2008 年の 15 段から 12 段への転換、『新聞技術』204 号の調査（2008 年 4 月）での段数と 1 行の字数の内訳 |
| [宣伝会議「新聞紙面『15段』から『12段』への移行が活発化」2014-02](https://www.sendenkaigi.com/marketing/media/sendenkaigi/001672/) | 紙面に関する冒頭の記事: 2014 年 1 月に中日新聞系の 4 紙などが 12 段制へ、2008 年に朝日・読売・産経などが 12 段制へ（ページの残りは別のニュース） |
| [NIKKEIスタッフ（note）「CSS で新聞をつくる」2018-11-24](https://note.com/nikkei_staff/n/n7aa0a07045e8) | 有料部分（末尾 119 字）を除く全文: ブランケット判とタブロイド判の寸法、日経本紙は縦 15 段・横 130 文字幅、Grid による紙面の再現、縦組み、2 桁だけの縦中横、扁平文字、CSS Regions と Shapes の限界 |
| [Wikipedia「ブランケット判」](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%A9%E3%83%B3%E3%82%B1%E3%83%83%E3%83%88%E5%88%A4) | 全文: ブランケット判は 406 × 545 mm。国際的なブロードシート判とは別 |

## D. 広告

| 資料 | 引用している内容 |
|---|---|
| [読売パレット「広告スペースについて」](https://www.yomiuri-pl.co.jp/ad/) | 全文: **読売新聞地域面**の広告サイズ（全 5 段・半 5 段・全 2 段・半 2 段・全 15 段・題字下・突き出し・記事ばさみの寸法）。「あくまで一例」と断っている |
| [新聞広告ナビ「新聞記事下広告の原稿サイズのしくみ」](https://www.shinbun-navi.com/kijisita/kijisita.html) | 上の C と同じ。全 15 段・全 5 段・5 段 1/2・2 段 1/2 の呼び方、「半 5 段」などの別名、英字紙では横幅を段と呼ぶ |
| [アドクロ「新聞広告の枠サイズについて徹底解説」2025-02-18](https://bizpa.net/mag/post-14/) | 全文: 記事下広告と雑報広告、題字下・題字横（四大紙の 2020 年現在の別）、突出広告、記事中広告、記事挟み広告、同じ全 5 段でも社ごとに寸法が違うこと（朝日・産経 170mm、読売・毎日 168mm、日経 169.5mm）、実際は 12 段の紙面が大半 |
| [ニッチメディア「新聞広告とは？」2023-11-07](https://www.nichemedia.jp/jirei/nandemokoukoku/3866) | 広告の種類を説明した部分: 記事下広告と雑報広告（罫線より下と上）、記事中・突き出し・題字下（題字横）・記事挟み |
| [東京アドワイズ「新聞広告の種類とその特徴」2026-06-15](https://www.adwise.co.jp/column/column/a45) | 全文: 記事下広告と雑報広告（小枠広告）、半 5 段・全 5 段・15 段（全面）・二連版（見開き） |

## E. 面の種類

| 資料 | 引用している内容 |
|---|---|
| [桐生りか「第 2 章 新聞の面種と外来語」国立国語研究所 報告 126『公共媒体の外来語』第 3 部（PDF）](https://www2.ninjal.ac.jp/gairaigo/Report126/houkoku3-2.pdf) | 第 1〜2 節: 新聞は「面種」によって区別される。毎日新聞（東京版、1994〜2003 年）の **16 の面種**と、総文字数に占める割合（図 1） |
| [朝日新聞ちょい解体新書 vol.02](https://info.asahi.com/introduction/asahi/%E6%9C%9D%E6%97%A5%E6%96%B0%E8%81%9E%E3%81%A1%E3%82%87%E3%81%84%E8%A7%A3%E4%BD%93%E6%96%B0%E6%9B%B8-vol-02-%E8%A8%98%E4%BA%8B%E3%81%AE%E4%B8%A6%E3%81%B9%E6%96%B9%E7%B7%A8/) | 上の B と同じ。朝日新聞の朝刊の面の一覧 |

## F. 研究

| 資料 | 引用している内容 |
|---|---|
| 宮崎紀郎・大橋透「新聞を主とした文字レイアウトの基礎的研究：1行あたりの字詰数と行間の検討」『デザイン学研究』47, 27-34, 1984（[J-STAGE](https://www.jstage.jst.go.jp/article/jssdj/1984/47/1984_KJ00007024039/_article/-char/ja/)、[DOI](https://doi.org/10.11247/jssdj.1984.27_2)） | **PDF 全 8 ページ**: 字詰数（10・15・20・30・40・60・80）と行間（1/1・1/2・1/4）の 21 通りで、30 秒間に読める文字数を測定。結論は、本文は 15〜20 字詰・行間 1/2、見出しに続くリードは 30 字詰・行間 1/1 が適当。10 字詰は、単語が途切れたり、行をまたぐ視点の移動が多くなるために、読み取りが少なかった |

## G. 先行する実装

| 資料 | 内容 |
|---|---|
| [NIKKEIスタッフ（note）「CSS で新聞をつくる」](https://note.com/nikkei_staff/n/n7aa0a07045e8) | 日経の開発者による、CSS Grid での紙面の再現実験。記事の流し込みは JavaScript で行うべき、と結論 |
| [いなにわうどん「Web だって組版の夢を見る——新聞のように自在にテキストを流し込むには」Zenn, 2022-07-26](https://zenn.dev/inaniwaudon/articles/a80f7dc66ffe92) | 全文: JavaScript で計測し、飛び地や L 字の領域へテキストを流し込む方法 |
| [inaniwaudon/flow-text-sample（GitHub, MIT）](https://github.com/inaniwaudon/flow-text-sample) | 上の記事のサンプル。README を確認（`gh api` で取得） |

GitHub（`gh search repos`）で、日本の新聞スタイルの CSS ライブラリは見つかりませんでした（2026-10-08、「新聞 縦書き」「vertical writing mode css japanese」「tategaki css」「newspaper css」「jlreq」など）。

## H. ブラウザ対応・CSS

| 資料 | 引用している内容 |
|---|---|
| [mdn/browser-compat-data（GitHub）](https://github.com/mdn/browser-compat-data) | 各 CSS 機能の対応バージョン（`gh api` で該当ファイルを取得） |
| [CSS Writing Modes Level 3](https://www.w3.org/TR/css-writing-modes-3/) W3C Recommendation, 2019-12-10 | `writing-mode`、`text-orientation`、`text-combine-upright` の定義 |
| [CSS Multi-column Layout Module Level 1](https://www.w3.org/TR/css-multicol-1/) Candidate Recommendation Snapshot, 2024-05-16 | `columns`、`column-span`、`column-fill`、`column-rule` の定義 |
| [CSS Multi-column Layout Module Level 2（Editor's Draft）](https://drafts.csswg.org/css-multicol-2/) | `column-height` と、`column-span` の整数指定（未解決の論点がある） |
| [CSS Grid Layout Module Level 1](https://www.w3.org/TR/css-grid-1/) Candidate Recommendation Draft, 2025-03-26 | `grid-template-columns`、`grid-template-rows`、`grid-row-start` などの定義 |
| [CSS Box Alignment Module Level 3](https://www.w3.org/TR/css-align-3/) | `row-gap`、`column-gap`、`gap`、`align-self`、`justify-self` の定義 |
| [CSS Text Module Level 3](https://www.w3.org/TR/css-text-3/) Candidate Recommendation Draft, 2026-08-14 | `line-break`、`text-align`、`text-justify`、`text-indent` の定義。`line-break` の節は、日本語の行分割の慣習として JLReq と JIS X 4051 を参照している |
| [CSS Text Module Level 4（Editor's Draft）](https://drafts.csswg.org/css-text-4/) | `text-wrap`、`text-autospace`、`text-spacing-trim`、`hanging-punctuation` の定義 |
| [CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/) Candidate Recommendation Snapshot, 2022-01-13 | `@layer` |
| [CSS Color Module Level 5](https://www.w3.org/TR/css-color-5/) Working Draft, 2026-09-13 | `light-dark()`、`color-mix()` |
| [CSS Color Adjustment Module Level 1](https://www.w3.org/TR/css-color-adjust-1/) Candidate Recommendation Snapshot, 2025-12-16 | `color-scheme` |
| [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/) Working Draft, 2026-01-22 | ネスティング |
| [CSS Fonts Module Level 4](https://www.w3.org/TR/css-fonts-4/) Working Draft, 2026-09-13 | `font-feature-settings`、`font-variant-east-asian` の定義。`palt` と `vpal` は CSS Fonts ではなく OpenType のフィーチャータグ |
| [OpenType 登録フィーチャー p-t](https://learn.microsoft.com/en-us/typography/opentype/spec/features_pt)、[u-z](https://learn.microsoft.com/en-us/typography/opentype/spec/features_uz)（OpenType 1.9.1） | `palt`: Proportional Alternate Widths。`vpal`: 縦組みの Proportional Alternate Vertical Metrics |
| [CSS Text Decoration Module Level 3](https://www.w3.org/TR/css-text-decor-3/) Candidate Recommendation Draft, 2022-05-05 | `text-emphasis` |
| [CSS Ruby Annotation Layout Module Level 1](https://www.w3.org/TR/css-ruby-1/) Working Draft, 2022-12-31 | `ruby-align`、`ruby-position` |
| [CSS Paged Media Module Level 3](https://www.w3.org/TR/css-page-3/) Working Draft, 2023-09-14 | `@page` |
