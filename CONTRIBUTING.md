# 貢献の手引き

ありがとうございます。issue と Pull Request を歓迎します。

## 開発

```sh
npm test          # 仕様書と CSS の整合性チェック + 単体テスト
npm run build     # dist/ を作る（dist/ もコミットする）
npm run serve     # http://127.0.0.1:5180/examples/ で例を見る
```

依存パッケージはありません。Node.js 18 以上が必要です。`npm run gen` は、マニフェストから API リファレンスなどを生成します。

## 変更の決まり

1. **公開インターフェース（クラス、カスタムプロパティ、`data-` 属性、関数）を足す・変える・消すときは、`src/manifest.json` を直し、`npm run gen` で `docs/API.md` と CSS の配置属性を更新する。** マニフェストと CSS・JS・文書・例が食い違うと、`npm test` が失敗します。
2. 用語や規格に関わる変更では、**出典のリンクを付け、出典の本文を読んで確認したことだけを書く。** 検索結果の抜粋や要旨だけで確認したことは、書かないでください。
3. **特定の新聞社のロゴ、書体、紙面デザインの複製は受け付けません。** 例の内容は、すべて架空にしてください。
4. 見た目を変える PR には、変更前後のスクリーンショットを付けてください。使ったブラウザとバージョンも書いてください。
5. 例（`examples/`）を足すときは、`Shinbun.findOverflow()` の結果が 0 件であることを確かめてください。

## ブラウザでの確認

現在、表示の確認は Chrome 154 でのみ行っています。**Firefox と Safari での表示確認は、特に歓迎します。** 崩れがあれば、使ったバージョンと、崩れた例のページを添えて issue を立ててください。

## コミットメッセージ

短く、何をしたかが分かるように書いてください。日本語でも英語でもかまいません。

## リリース（メンテナ向け）

1. `package.json` の `version` と `CHANGELOG.md` の見出しを更新し、`npm run build` の結果（`dist/`）もコミットします。
2. タグを付けて push します: `git tag vX.Y.Z && git push origin main vX.Y.Z`
3. Release のワークフローが、タグと `package.json` の版が同じことを確かめ、テストを通し、provenance つきで npm に**ステージ**（公開前の保留）し、GitHub の Release を作ります。
4. 保留されたパッケージを、2FA で承認します: `npm stage list @kamimen/shinbun-css` のあと `npm stage approve <stage-id>`（npmjs.com の Staged Packages でも承認できます）。承認すると、はじめて npm に公開されます。

### npm の設定

ワークフローは、GitHub のシークレット `NPM_TOKEN` に入れた granular access token でステージします。npmjs.com で、`@kamimen` のスコープに **Read and write (stage only)**、組織へのアクセスなし、Bypass 2FA は入れずに作ってください。このトークンはステージしかできないので、漏れても公開はされません。公開には、承認のときのあなたの 2FA が必ず要ります。

```sh
pbpaste | gh secret set NPM_TOKEN --repo kamimen/shinbun-css
```
