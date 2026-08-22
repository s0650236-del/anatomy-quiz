# v2 Release Candidate 最終検証ログ

anatomy-quiz v2-development を `main` へmerge・GitHub Pagesへ公開してよい状態かを最終確認した記録。本フェーズでは問題内容（question/choices/answer/difficulty/category）・画像・assetの追加や変更は一切行っていない（release hardeningのみ）。

- 基準ブランチ: v2-development
- 開始HEAD: `6116f744ae1d237db45416c5f254a1b9d9c85aea`
- main / origin main（不変）: `f7b05ecf33c06a103b57223811c9c922e30d90b1`

---

## Phase 2: overlay数の整合確認

最終報告で用いていた「single overlay 44問／multiple overlays 20問」という数値は、実データを機械集計せずに述べたもので**誤りだった**。実データを`tools/dataset_validate.js`で集計した正しい値は以下のとおり。

| 項目 | 値 |
|---|---|
| image_mcq総数 | 65 |
| overlayありQID数 | 64 |
| overlayなしQID数 | 1（Q051） |
| single overlay | 52問 |
| multiple overlays | 12問 |
| marker総数（overlay座標の合計個数） | 89 |

Q051（解剖学的正位）がoverlayなしである妥当性を確認した。

- `data/questions.schema.json`の`image`オブジェクトの`required`は`["prompt_id","asset","alt","marker","marker_target"]`のみで、`overlay`/`overlays`は必須ではない（`overlay`の`description`にも「省略時は何も描画しない」と明記）。
- Q051は「解剖学的正位について正しいものはどれか」という、姿勢そのものを問う定義選択問題であり、画像全体が回答の手がかりであって画像内の特定の一点を指し示す設問ではない。無理にmarkerを追加することは教育的に不適切と判断し、追加しなかった。

`tools/dataset_validate.js`のoverlay検証ロジックも、全image_mcqにoverlayを必須とする誤った条件になっていないことを確認済み（Q051以外でoverlayが0件の場合のみwarningを出し、hard failにはしない設計）。

---

## Phase 3-4: PWA image cache設計

### 27assetの総容量

| 項目 | 値 |
|---|---|
| asset数 | 27 |
| 総容量 | 1,480,374 bytes ＝ 約1.41MB |
| 最大ファイル | q002_hierarchy.webp（134.1KB） |
| 最小ファイル | q008_body_planes.webp（22.3KB） |

### 判断: 全27asset precache採用

1.41MBは複雑なキャッシュ戦略を要するほどの容量ではないと判断し、27asset全体をprecache対象へ追加した。

### 実装方式

`sw.js`の`install`イベントを、アプリ本体（`CORE_ASSETS`、7ファイル）と画像（`IMAGE_ASSETS`、27ファイル）の2段階に分離した。

- `CORE_ASSETS`は従来どおり`cache.addAll()`で全件必須（1つでも取得失敗すればinstall全体が失敗する、想定どおりの厳格な扱い）。
- `IMAGE_ASSETS`は1枚ずつ`cache.add().catch()`でbest-effort取得とし、**画像1枚の取得失敗がinstall全体やアプリ本体のキャッシュを道連れにしない**設計とした。取得できなかった画像は、従来どおり実行時の`imageCacheFirst()`が個別に再取得を試み、それでも失敗すれば画面側の「画像準備中」表示に委ねる（既存の設計思想を維持）。

### Service Worker cache version

`anatomy-quiz-v2-2026-08-300q` → `anatomy-quiz-v2-2026-08-300q-img` へ更新。`activate`イベントの既存ロジック（現在の`CACHE`名と一致しないキーをすべて削除）により、100問版・300問版（画像precache無し）いずれのキャッシュからも新版へ正常に更新され、旧キャッシュが無期限に残ることはない。

---

## Phase 5: PWA static validation

`tools/dataset_validate.js`とは別に、`sw.js`のprecache対象34パス（CORE 7 + IMAGE 27）について機械検証した。

- 重複パス: 0件
- 存在しないファイル参照: 0件
- 実サーバー（`python -m http.server`）経由で全34パスのHTTPステータスを確認: **全て200**
- `data/questions_v1.json`が実際に参照する27 image assetと`sw.js`の`IMAGE_ASSETS`の突合: 完全一致（片方向の過不足なし）

---

## Phase 6: ローカルService Worker試験

`navigator.serviceWorker.register('./sw.js')`を実ブラウザ（テスト用サンドボックスブラウザ、`http://localhost`）で試みたが、

```
TypeError: Failed to register a ServiceWorker ... An unknown error occurred when fetching the script.
```

で失敗した。`sw.js`自体は`fetch('./sw.js')`で200・正しいcontent-type・妥当な内容を返しており、ファイル自体に問題はない。これは前回セッション（300問実装時）と同一の事象であり、このテスト用サンドボックスブラウザ環境固有の制約である可能性が高いと判断し、アプリ側のfailureとは断定していない。

代わりに以下の静的確認を実施し、いずれも問題なし：

| 項目 | 結果 |
|---|---|
| `node --check sw.js` | 構文エラーなし |
| `install`イベントハンドラ | 存在、CORE_ASSETS必須+IMAGE_ASSETSベストエフォートの2段構成を確認 |
| `activate`イベントハンドラ | 存在、現行`CACHE`名以外のキーを削除する処理を確認 |
| `fetch`イベントハンドラ | 存在、data/image/その他の3系統ルーティングを確認（ロジック自体は今回変更なし） |
| registration path | `app.js`の`register('./sw.js')`とファイル実位置が一致 |
| scope | 明示指定なし（デフォルト`./`）、`manifest.webmanifest`の`"scope": "./"`と一致 |

---

## Phase 8: Codex post-audit再試行

前回セッションで`codex-windows-sandbox-setup.exe`ヘルパー欠落により失敗していたため、今回1回だけ再試行した。

```
orchestrator_helper_launch_failed: setup refresh failed to launch helper:
helper=codex-windows-sandbox-setup.exe, error=program not found
```

**同一エラーで再度失敗。** ユーザー指示に基づき、再インストール・認証変更・環境修復は一切行っていない。この事実のみを記録し、Release Candidate判定はこれだけを理由にNO-GOとしない（詳細な代替監査はPhase 9-10で実施した機械的検証、および前回セッションの`docs/codex_review_log.md` Phase 17-18の記録を参照）。

---

## Phase 9-10: 最終dataset再検証・回帰

今回は問題内容を一切変更していないため、`data/questions_v1.json`自体は前回セッション終了時点から不変。念のため全項目を再実行した。

| 検証 | 結果 |
|---|---|
| `tools/dataset_validate.js` | 0 errors, 0 warnings |
| AJV（draft 2020-12）schema validation | valid: true |
| total / ID欠番・重複 | 300 / 0 / 0 |
| category内訳 | 総論70・循環器85・呼吸器75・泌尿器70 |
| difficulty内訳 | 1:170・2:107・3:23 |
| text_mcq / image_mcq | 235 / 65 |
| category別image_mcq | 総論10・循環器24・呼吸器17・泌尿器14 |
| unique referenced assets | 27（missing 0） |
| 300問ブラウザ正答テスト（順番どおり実行） | 300/300正解、ID順序一致、image_mcq 65問検出、画像読込0件失敗、overlay欠落0件 |
| Desktop (1280×800) | 横スクロールなし |
| iPad (768×1024) | 横スクロールなし |
| Phone (375×812) | 横スクロールなし |

---

## Go/No-Go判定

### A. Core application（300問クイズ本体）

**GO**

データセット構造・教育内容整合・65 image_mcqのoverlay・実ブラウザでの300/300正答・65/65画像表示・レスポンシブのすべてで問題なし。

### B. Production deployment（mainへmerge・GitHub Pages公開）

**CONDITIONAL GO**

理由：アプリ本体・データセットは公開可能な品質に達しているが、(1) Service Workerの実登録がこのセッションのテスト環境では検証できていない（静的検証は全て合格）、(2) Codex post-auditが2セッション連続で環境要因により実行できていない、という2点が「本番同等環境での最終確認」を経ていない残課題として残るため、無条件のGOではなく条件付きとする。

#### 公開直後に必要な確認項目（最大5件）

1. 実際のGitHub Pages URL（HTTPS）で`navigator.serviceWorker.getRegistrations()`が1件以上返ることを確認する。
2. Chrome DevTools等のApplicationタブで、Cache Storageに`anatomy-quiz-v2-2026-08-300q-img`が作成され、CORE 7件＋IMAGE 27件が格納されていることを確認する。
3. 一度オンラインで開いた後、機内モード等でオフラインにしてページを再読み込みし、text_mcq・image_mcq双方が正常に解答できることを確認する。
4. 旧100問版キャッシュ（`anatomy-quiz-v2-2026-08`）を使っていた既存ユーザー端末で、更新後に旧キャッシュが自動削除され300問版に切り替わることを確認する。
5. `tools/production_smoke_test.js`（要`npm install --no-save playwright`）を実際のPages URLに対して実行し、11項目のスモークテストが全てPASSすることを確認する。

