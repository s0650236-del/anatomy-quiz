# v2 Release Deployment Log

anatomy-quiz v2（300問・65 image_mcq）を`main`へ統合し、GitHub Pagesへ本番公開する際の記録。

---

## 旧production復旧点（rollback基準）

`main`統合作業を開始する前の`main`の状態を、rollbackの基準点として記録する。

| 項目 | 値 |
|---|---|
| 旧production HEAD（完全hash） | `f7b05ecf33c06a103b57223811c9c922e30d90b1` |
| コミットメッセージ | `fix: update default anatomy image model` |
| 状態 | v2-development分岐前の、旧100問版（image_mcq 29問）相当のmain |

**この時点ではtagを作成しない。** 万一production公開後に重大な問題が発見された場合は、`git revert`によってこの復旧点相当の状態へ戻せることを確認したうえでrollbackする（`git reset --hard`やforce pushは使用しない）。

---

## 統合対象（Release Candidate）

| 項目 | 値 |
|---|---|
| 統合元ブランチ | v2-development |
| 統合元HEAD | `b4bb3b05f37805e7944f848c3887deedbbcea4fa` |
| questions | 300 |
| category | 総論70 / 循環器85 / 呼吸器75 / 泌尿器70 |
| difficulty | 1:170 / 2:107 / 3:23 |
| text_mcq / image_mcq | 235 / 65 |
| image assets | 27（missing 0） |
| overlayありQID | 64（overlayなし：Q051のみ、仕様上正当） |
| marker総数 | 89 |
| Service Worker cache | `anatomy-quiz-v2-2026-08-300q-img`（CORE 7 + IMAGE 27 = 34件precache、画像は約1.41MB） |

---

## main統合（fast-forward merge）

| 項目 | 値 |
|---|---|
| 統合方法 | `git merge --ff-only v2-development`（fast-forward。non-ff merge/rebase/reset --hardは未使用） |
| 事前確認 | `git merge-base --is-ancestor main v2-development` → true（mainにv2-development側へ無い独自コミットは0件） |
| 統合前main HEAD | `f7b05ecf33c06a103b57223811c9c922e30d90b1` |
| 統合後main HEAD（= v2-development HEAD） | `0f196717f29cbef70d26a83ff98b793f6b388c6d` |
| 変更ファイル数 | 90 files changed |
| push | `git push origin main`（force push未使用）→ 成功 |

merge直後・push直後の両方で`tools/dataset_validate.js`（300問/ID連番/カテゴリ・難易度分布/image_mcq構造/overlay範囲/baseline overlay保護）を再実行し、0 errors / 0 warningsを確認。ローカルstatic precache検証（CORE/IMAGE重複・欠落・データセット照合）も重複0・欠落0・不一致0。

その後、release logへの追記コミット（本セクション以降を含む）を`main`へ積んだ。

| 項目 | 値 |
|---|---|
| v2.0.0 release検証完了時main HEAD（tag対象） | `0c8527b54bd06bb83a7c5d4add9e7caa4fb06163` |

---

## GitHub Pages公開

| 項目 | 値 |
|---|---|
| 公開方式 | Classic「Deploy from a branch」（`.github/workflows/`は存在せず、リポジトリ直下に`.nojekyll`あり。mainへのpushで自動再公開） |
| Pages URL | `https://s0650236-del.github.io/anatomy-quiz/` |
| 公開確認 | main push直後、production上の`data/questions_v1.json`がversion 2.0.0・300問content に更新されていることを直接fetchで確認 |

---

## Production smoke test 結果

`tools/production_smoke_test.js`（Playwright、`npm install --no-save playwright`でscratchpad配下に隔離導入。package.json/lockfileは無変更）を実際のPages URLに対して実行。

```
[PASS] 1. app load -- status=200
[PASS] 2. 300 questions load -- count=300, image_mcq=65
[PASS] 3. image_mcq question renders
[PASS] 3b. that image actually loaded
[PASS] 4. Service Worker registered -- registered:activated
[PASS] 5. Cache Storage created -- {"anatomy-quiz-v2-2026-08-300q-img":34}
[PASS] 6. page reload
[PASS] 7. offline mode serves app shell -- shell served offline, settings card present=true
[PASS] 8. text_mcq answers offline
[PASS] 9. image_mcq answers offline
[PASS] 10. sample image assets available offline -- 6/6 sampled ok
[PASS] 11. no duplicate/stale cache after update check
=== SUMMARY: 12/12 passed ===
```

加えて、実ブラウザから直接production URLへアクセスして以下を個別確認（すべてtrue）：質問表示／選択肢表示／フィードバック表示／解説表示／画像描画／overlay描画／画像ロード完了／正誤判定／Next遷移／結果画面表示。

### Service Worker

| 項目 | 値 |
|---|---|
| registration数 | 1 |
| scope | production URL配下と一致 |
| `navigator.serviceWorker.ready` | resolve確認 |
| activeワーカー状態 | `activated` |

### Cache Storage

| 項目 | 値 |
|---|---|
| cache名 | `anatomy-quiz-v2-2026-08-300q-img` |
| CORE | 7件precache成功 |
| IMAGE | 27/27件precache成功（一部欠落を許容するbest-effort実装だが、実際には全件成功） |
| 合計 | 34エントリ |

### オフライン動作

オンラインで初回ロード後、`context.setOffline(true)`による実ネットワーク遮断下で確認：index/app.js/CSS/manifest等のapp shell、questions_v1.json、text_mcq、image_mcq（複数asset）、選択肢、正誤判定、解説、Next、いずれも正常動作。画像asset 6件を分野横断でサンプリングし、全件`cache.match()`から即時取得可能であることを確認。

### 旧cacheクリーンアップ（old→new更新シナリオ）

以下の理由により、実環境（production HTTPS）上での「旧cache名を持つ実visitor」の再現ライブ実行は困難だった：

- サンドボックス化されたテスト用ブラウザツールは`localhost`オリジンに対して`navigator.serviceWorker.register()`が一貫して失敗する（`An unknown error occurred when fetching the script.`）。同一ツールから実production HTTPS originへは問題なくSW登録できており、これは`localhost`固有のツール制約であり、アプリ側の不具合ではない。
- 隔離Playwright環境からPython製ローカル開発サーバ（`python -m http.server`）経由でOLD→NEW sw.jsのbyte差分アップデートサイクルを再現しようとしたが、同サーバがGitHub Pagesと同等のcache-control/ETag挙動を持たないため、SW更新アルゴリズムの「新バイト列を確実に再fetchする」前提が崩れ、install/activateサイクル自体は`activated`状態まで進むもののスクリプト内容の切り替わりを安定して観測できなかった。これはローカル簡易サーバ側の制約であり、production（GitHub Pages CDN）にはあてはまらない。

そのため、ユーザーの事前許可済みfallback方針（"実環境上再現が困難なら、activateロジック＋Cache Storage状態から判断し、結果を明示"）に従い、以下の静的根拠・実観測から判断する：

1. **`activate`ハンドラのロジック**（`sw.js`内、本v2実装の初版から変更なし）は、`caches.keys()`で得た全キーのうち現在の`CACHE`定数と一致しないものを無条件に`caches.delete()`する実装であり、対象cacheの新旧・由来を問わず確実に評価される（if文に例外条件なし）。
2. 旧production（統合前main `f7b05ecf...`）の実際の`sw.js`を`git show`で確認したところ、cache名は`'anatomy-quiz-v2'`（現行の`'anatomy-quiz-v2-2026-08-300q-img'`とは完全に別名）であり、上記ロジックの削除対象に該当する。
3. 実productionの現在のCache Storageは、単一cache（`anatomy-quiz-v2-2026-08-300q-img`）のみが存在するクリーンな状態であることを確認済み（テスト目的で注入した偽cache2件は検証直後に`caches.delete()`で完全に除去し、残留なし）。
4. 「同一byte内容のSWをunregister→再registerしてもinstall/activateは再発火しない」という、より基本的なSWライフサイクル仕様も別途実機で確認済みであり、これは正しい挙動であって不具合ではない。

以上より、**実際に旧バージョンをキャッシュ済みの返訪問者が本更新後に初めてサイトへアクセスした場合、ブラウザ標準のSW更新チェック（真にbyte差分のあるスクリプトを検出した時点でinstall→activateが発火）を通じて`activate`ハンドラが実行され、旧cache（例：`anatomy-quiz-v2`）は確実に削除される**と判断する。ただしこの特定の遷移そのものを本セッションのテスト環境でライブ観測することはできなかった点を明示する。

### レスポンシブ production QA

実production URLに対し、以下3サイズで直接確認：

| サイズ | 横スクロール | 画像/overlay | zoom modal | 選択肢〜Next |
|---|---|---|---|---|
| Desktop 1280×800 | overflow 0px | 正常表示、viewport内 | 開閉・画像/marker表示とも正常 | 正常動作 |
| iPad 768×1024 | overflow 0px | 正常表示、viewport内 | 正常動作 | 正常動作 |
| Phone 375×812（モバイルUA・タッチ） | overflow 0px | 正常表示、viewport内 | 開閉・画像ロードとも正常 | image_mcqを実際に1問操作し正常動作を確認 |

### 発見された問題

**重大な異常：0件。** アプリ起動、300問データロード、画像表示、SW登録（実production環境）、cache更新、クイズ進行、正誤判定、レスポンシブ動作のいずれについても、production公開後の検証で問題は確認されなかった。

**軽微な既知の制約（v2.0.1候補、rollback理由にはならない）：**
- 旧cacheクリーンアップの完全ライブ再現ができなかった点（上記参照。静的ロジック検証と実production cache状態観測により妥当性は確認済み）。
- Codex CLIによるpost-implementation read-only auditが、ローカル環境側の欠落コンポーネント（`codex-windows-sandbox-setup.exe`）により実行不能（複数回試行済み、リポジトリやアプリの問題ではない。環境の再インストール・修復は本セッションでは意図的に行っていない）。

### Production判定

**Production: GO**

---

## Release tag

| 項目 | 値 |
|---|---|
| tag名 | `v2.0.0` |
| tagコミット | `0c8527b54bd06bb83a7c5d4add9e7caa4fb06163`（本release log最終版を含む、production検証後に再確認したmain HEAD） |
| tagメッセージ | `Release anatomy quiz v2.0.0: 300 questions and 65 image questions` |
| push | `git push origin v2.0.0` |
| 既存バージョン規約 | リポジトリ内に既存tagなし（`git show-ref --tags`が空）。`v2.0.0`が初回tagとなる |

---

## 既知の制約・今後の課題（v2.0.1候補）

- 旧cache→新cacheの切り替わりを本番環境上でライブ再現するテスト手段が未整備（ローカル簡易サーバでは不十分、実productionでの意図的な旧バージョン誘発は非現実的）。今後、実際にstaging用の別Pages環境等を用意できれば、より直接的な検証が可能。
- Codex post-implementation auditが実行可能な環境が復旧していない。

---

## 訂正記録

v2.0.0公開後のGit基準点再確認により、release log内のhash転記ミス3箇所をdocumentation-onlyで修正した。v2.0.0 tagおよびリリースされたアプリ内容には変更なし。
