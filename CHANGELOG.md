# 変更履歴

形式は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/)、バージョンは[セマンティックバージョニング](https://semver.org/lang/ja/)に従う。

## [Unreleased]

## [0.1.1] - 2026-10-11

### 追加

- npm に `@kamimen/shinbun-css` として公開（`npm install @kamimen/shinbun-css`）。タグを push すると、Release のワークフローが provenance つきで公開する
- README に、npm からの使い方（`@kamimen/shinbun-css/css/min`、`@kamimen/shinbun-css/js`）を追記
- `package.json` に `publishConfig` を追加

### 変更

- README を英語に（日本語版は `README_ja.md`）。日本語の組版用語は日本語も併記

## [0.1.0] - 2026-10-08

最初の公開に向けた版。

### 追加

- 縦組み・横組みに共通の段グリッド（`.sb-page`）と、座標指定の方式（`.sb-page--grid`、`--sb-x`・`--sb-w`・`--sb-y`・`--sb-span`）
- 記事 `.sb-article`（n 段の矩形、段ごとの本文の流れ、段抜き見出し）
- 題字 `.sb-nameplate`（縦題字・ロゴ対応）、題字の帯 `.sb-masthead`、柱 `.sb-folio`
- 見出し（肩・主・袖・脇）、横見出し `.sb-yoko`、リード、発信地、署名、写真、囲み、コラム
- 表 `.sb-table`（番組表向け `--tv`、数値 `.sb-num`）
- 広告枠 `.sb-ad`（記事下、全・半、全面）
- 縦中横 `.sb-tcy`、局所的な横組み、圏点、ルビ
- 任意の JavaScript: `autoTcy`（2 桁の数字を縦中横に）、`responsive`、`findOverflow`
- 仕様書 `docs/SPEC.md`（用語、規格との対応、出典と検証状況、ブラウザ対応）
- 配置を `data-sb-x`・`data-sb-w`・`data-sb-y`・`data-sb-span` 属性で書けるようにした（インラインのカスタムプロパティも使える）
- クラスなしの素の HTML（`article`、`h2`、`header`、`figure`、`aside`、`table`）への対応
- 公開インターフェースの唯一の定義 `src/manifest.json`、そこから `docs/API.md` と CSS の配置属性を生成する `scripts/gen.mjs`
- 整合性チェック（`npm test`）と、面ごとの例（一覧ページを含む 19 ページ）
