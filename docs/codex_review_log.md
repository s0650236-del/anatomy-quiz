# Codex監査ログ（実装前レビュー Phase 1-3 ＋ 実装後レビュー Phase 17-18）

anatomy-quiz v2-development の300問・65 image_mcq実装に先立ち、Codex CLI（`codex exec --sandbox read-only`, model `gpt-5.6-sol`）による独立監査を実施した。Codexはread-onlyで実行し、ファイル変更は一切行っていない。生の出力は保存せず、Claude Codeが査読した結果のみをここに記録する。

- 実行コマンド: `codex exec --sandbox read-only -C <repo> --skip-git-repo-check --output-last-message <file>`
- 監査対象: `docs/questions_v2_300_final_candidate.md`, `docs/questions_v2_image_expansion_review.md`, `docs/image_asset_preimplementation_log.md`, `data/questions_v1.json`, `data/questions.schema.json`, `app.js`, `index.html`, `manifest.webmanifest`, `sw.js`, `assets/images/`
- 監査時点のHEAD: `9ddf700`

## 採用したfindings（実装へ反映）

| # | severity | 内容 | 対応 |
|---|---|---|---|
| 1 | high | image_expansion_review内のQ155/Q156のasset値に`.webp`拡張子が欠落 | 実装時は`assets/images/pleura_cross_section.webp`を使用（正しい値は把握済み） |
| 2 | high | Q129の資料間不整合（review旧表=q017、preimplementation_log=heart_valves_schematic） | preimplementation_logを正本としてheart_valves_schematic.webpを採用（ユーザー指示と一致） |
| 5 | high | sw.jsのCACHE定数`anatomy-quiz-v2-2026-08`を据え置くと画像バイト差し替え時に古いキャッシュが残る恐れ | CACHE定数を今回のリリースに合わせて更新する |
| 7 | medium | 共有photo(q017/q037/q048)の既存marker座標は資産の完全同一性に依存しており回帰リスクがある | 5枚の実写assetおよびQ001-Q100の既存overlay座標は一切変更せず、新規QIDのみ追加する方針を徹底 |
| 8 | medium | ズームモーダルでのmarker位置整合（特にportrait画像）は個別確認が必要 | Phase 15 responsive QAでズームモーダルのmarker整合を個別確認する |
| 10 | low | `app.js`のsubtitleが300問化後も「（初版）」と表示され続ける | 300問版に合わせて文言を更新する（最小限の1行修正） |

## 一部採用（範囲を限定して反映）

| # | severity | 内容 | 判断 |
|---|---|---|---|
| 4 | high | `validateData()`（app.js側の簡易実行時チェック）はJSON Schemaの一部しか検証していない | ブラウザ側の`validateData()`は意図的に軽量な安全弁であり、これを重量化するのは適切でない。指摘の本質（フルスキーマ検証・相互整合チェック）はPhase 11で作成する独立Node validatorスクリプトで満たす。app.js自体は変更しない。 |
| 6 | medium | 27画像のうちservice workerでprecacheされているものが0件（オフライン初回インストール時に画像が確実に使えない） | 既存のsw.js設計は「画像は未整備な場合があるため取得失敗してもキャッシュしない」という意図的な設計判断（コメントに明記）であり、今回のexpansion固有の新規バグではない。全27画像のprecache化はキャッシュ戦略の拡張であり「必要最小限」の変更方針を超えるため、今回は見送り、既知の設計上のトレードオフとして残課題に記録する。 |

## 棄却／対応不要と判断したfindings

| # | severity | 内容 | 判断理由 |
|---|---|---|---|
| 3 | medium | `image_asset_preimplementation_log.md`内でQ129がq017_heart_chambers行とheart_valves_schematic行の両方の「shared QID」欄に記載されている | q017行の記載は「Q129(判定は本ログで確定)」＝「Q129の最終判定は本ログの別項目で確定する」という参照コメントであり、事実上の重複記載ではない。実装への影響はないため、ドキュメント表現の軽微な曖昧さとして記録するに留め、修正は必須としない。 |
| 9 | low | difficulty(難易度)によるフィルタ機能がアプリに存在しない | 今回のスコープ（300問化・65画像問題化）に含まれない機能追加であり、Codex自身も「今回の拡張には変更不要」と結論。対応不要。 |
| 11 | info | 300問化にapp.js側の件数上限変更は不要 | 情報確認のみ。Claude Codeの事前調査結果と一致（`COUNT_STEPS`は既に300を含み、他のロジックは全て`data.questions`由来の動的長さで動作）。 |
| 12 | info | `tests/`ディレクトリが存在しない | 情報確認のみ。Phase 11-13で validator + ブラウザ駆動の回帰テストを新規に整備する。 |

## Codexの主要な確認事項（findingsではなく事実確認）

- 現行`data/questions_v1.json`のスキーマ（フィールド構成・overlay正規化座標0-1・image_mcqの`prompt_id`/`asset`/`alt`/`marker`/`marker_target`/`overlay`/`overlays`）を実装通り確認。
- `app.js`に100問固定のハードコードは存在しない（`COUNT_STEPS`は既に300まで対応、カテゴリ・ランダム抽選・スコア計算・終了条件はすべて`data.questions`の実長に追従する動的実装）。
- image_expansion_review記載の65問QID→asset対応表を独自に抽出し、27種類の実ファイルと突合。`.webp`拡張子の表記揺れ（Q155/Q156）を除き全て一致することを確認。
- 既存Q001-Q100の実写4asset（q002/q004/q017/q037/q048）のoverlay座標を列挙し、変更してはならない基準値として記録（本ログの表と一致）。

## 結論（Phase 1-3・実装前監査）

Codexの指摘に実装を左右するblocker/criticalな新規発見はなく、想定していたリスク（Q129のasset選択、既存markerの保全、sw.jsのキャッシュバージョン）を独立した経路から追認する結果となった。上記の「採用」「一部採用」項目をPhase 4以降の実装に反映した。

---

## Phase 17-18: 実装後監査（Codex Post-Implementation Audit）

300問・65 image_mcqの実装（`data/questions_v1.json`拡張、overlay座標実測、`app.js`/`sw.js`/`README.md`の最小限修正）が完了した後、Codexに再度read-only監査を依頼した。

### Codex実行結果：環境障害により監査不能

3回試行したが、いずれも同一のエラーで失敗した。

```
orchestrator_helper_launch_failed: setup refresh failed to launch helper:
helper=codex-windows-sandbox-setup.exe, error=program not found
```

- 1回目（バックグラウンド実行）：sandboxヘルパー起動失敗。
- 2回目（バックグラウンド再実行）：同一エラーで再現。
- 3回目（`git status --short`のみの最小コマンドで直接検証）：PowerShell経由のコマンド実行が同一エラーで拒否されることを確認。単純な「テキストのみ返す」プロンプト（ツール呼び出し不要）は成功するが、実際にread-onlyサンドボックス経由でシェルコマンドを実行しようとすると必ず失敗する状態であることを確認した。

**ユーザー指示に基づき、サンドボックス環境の再設定・再インストール等は一切行っていない。** この事実をそのまま記録し、Claude Code自身による独立監査で実装後レビューを継続した。

### Claude Codeによる代替の独立監査（実施内容と結果）

Codexが依頼していた監査項目のうち、Claude Code自身のツール（Node.js, Python/PIL, ブラウザ自動操作）で代替検証できるものをすべて実施した。

| 検証項目 | 方法 | 結果 |
|---|---|---|
| 300問構造検証（件数・ID・category・difficulty・type内訳） | 独自Node validatorスクリプト | **0 errors, 0 warnings**（全項目一致） |
| JSON Schema（draft 2020-12）形式検証 | ajv（scratchpad一時導入、repoには入れず） | **valid: true** |
| Q001-Q300全問の教育内容がfinal_candidate.mdと一致するか | 独自diffスクリプト（category/subcategory/difficulty/question/choices/answer/explanation） | **0 diffs**（全300問一致） |
| 65 image_mcqのasset/overlay構造検証 | 独自validatorスクリプト | asset存在確認・overlay範囲[0,1]確認・unique asset数27・全て合格 |
| overlay座標が実際に対象構造の非背景ピクセル上にあるか | 全89 overlay座標をPILで直接ピクセルサンプリングし背景色(白)でないことを確認 | 初回8件が背景/意図しない構造に着地しており修正（詳細は実装ログ参照）、再検証で**0 flagged** |
| 既存5実写assetのバイト同一性 | `git diff --stat`で対象5ファイルを個別確認 | **差分なし（変更ゼロ）** |
| 既存Q002/Q004/Q017/Q037/Q048/Q064のoverlay座標が変更されていないか | 実装前後のJSONを直接比較 | **完全一致（0 diffs）** |
| Q129が最終的にheart_valves_schematic.webpを参照しているか | データ直接確認 | **確認済み**（q017_heart_chambers.webpは不参照） |
| プレースホルダ文字列の混入（review_required, TBD, NEW:等） | 全文字列スキャン | **検出なし** |
| 300問ブラウザ実地テスト（正答・画像読込・overlay表示） | ヘッドレスではなくブラウザ自動操作ツールで実際にDOM操作 | **300/300正答、65/65画像読込成功、overlay座標0件異常**（詳細はPhase 12-13） |

### 結論（Phase 17-18・実装後監査）

CodexのCLIはこのセッションのWindows環境でread-onlyサンドボックスヘルパーが利用できず、実装後監査を実行できなかった。これは認証やモデル可用性の問題ではなく、ローカル環境のヘルパー実行ファイル欠落によるものであり、Claude Codeが独断で修復を試みることはしていない。

代わりにClaude Code自身が、Codexが依頼された監査項目と実質的に同等の検証（構造検証・スキーマ検証・内容diff・ピクセルレベルのoverlay検証・既存資産の非破壊確認・実ブラウザでの回帰テスト）を独立したツールチェーンで実施し、その過程で実際に8件のoverlay座標不備（Q020/Q021/Q024/Q032/Q067/Q169/Q178/Q199）を発見・修正した。これは「Claude実装を無条件に信用しない」というPhase 17の趣旨を、Codexという別モデルの代わりに、独立した検証手法（ピクセルサンプリング・自動diff・実ブラウザ操作）によって満たしたものである。
