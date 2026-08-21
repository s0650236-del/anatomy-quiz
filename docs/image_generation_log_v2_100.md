# 画像生成ログ（v2 100問対応）

`tools/image_generation/` パイプラインによる画像生成の実行記録。再現性確保のため、生成のたびに追記する。APIキー等の秘密情報は一切記録しない。

## 2026-08-21：パイプライン構築

- `tools/image_generation/generate_anatomy_image.py` ほか一式を新規構築（provider抽象化：Gemini優先→OpenAI、manifest自動算出、WebP変換、`tmp/image_candidates/`への候補保存、スモークテスト）。
- 環境変数 `GEMINI_API_KEY` / `GOOGLE_API_KEY` / `OPENAI_API_KEY` を確認したが、いずれも本環境には設定されていなかった（値は一切出力・記録していない）。
- そのため、本セッションでは実際の画像生成API呼び出しは**未実施**。`--dry-run` によるCLI疎通確認と、APIキー欠如時の失敗パス（`ProviderError`を経由してexit code 3で明確なエラーメッセージを返す）のみ確認済み。
- `docs/image_generation_prompts_v1.md` にIMG-018（冠状動脈走行／Q073・Q074共有）、IMG-019（腎臓前額断面／Q091・Q092・Q093共有）、IMG-020（心電図波形／Q068）の生成プロンプトを新規追加。
- `data/questions_v1.json` の `image.prompt_id` を、同一assetを共有する問題間で統一（例: Q053/Q054はQ008と同じ`IMG-003`を参照するよう修正。従来は問題単位でIMG-018〜029を乱造していたのを是正）。

## 現在の生成対象一覧（unique asset単位）

| prompt_id | asset | 状態 | 使用問題 |
|---|---|---|---|
| IMG-001 | assets/images/q002_hierarchy.webp | 済 | Q002 |
| IMG-002 | assets/images/q004_epithelium.webp | 済 | Q004 |
| IMG-003 | assets/images/q008_body_planes.webp | 未生成 | Q008, Q053, Q054 |
| IMG-004 | assets/images/q011_germ_layers.webp | 未生成 | Q011 |
| IMG-005 | assets/images/q016_apex.webp | 未生成 | Q016 |
| IMG-006 | assets/images/q017_heart_chambers.webp | 済 | Q017, Q064 |
| IMG-007 | assets/images/q019_pulmonary_vein.webp | 未生成 | Q019 |
| IMG-008 | assets/images/q021_vessel_cross_sections.webp | 未生成 | Q021, Q067 |
| IMG-009 | assets/images/q025_conduction_system.webp | 未生成 | Q025 |
| IMG-010 | assets/images/q032_larynx.webp | 未生成 | Q032 |
| IMG-011 | assets/images/q035_right_middle_lobe.webp | 未生成 | Q035, Q082 |
| IMG-012 | assets/images/q037_alveolar_gas_exchange.webp | 済 | Q037 |
| IMG-013 | assets/images/q040_airway_branching.webp | 未生成 | Q040, Q077 |
| IMG-014 | assets/images/q041_alveolar_sac.webp | 未生成 | Q041 |
| IMG-015 | assets/images/q045_renal_hilum.webp | 未生成 | Q045 |
| IMG-016 | assets/images/q048_nephron.webp | 済 | Q048 |
| IMG-017 | assets/images/q050_urinary_system.webp | 未生成 | Q050 |
| IMG-018 | assets/images/q073_coronary_arteries.webp | 未生成 | Q073, Q074 |
| IMG-019 | assets/images/q091_kidney_cross_section.webp | 未生成 | Q091, Q092, Q093 |
| IMG-020 | assets/images/q068_ecg_waveform.webp | 未生成 | Q068 |

unique asset総数20、既存5、未生成15（`python tools/image_generation/generate_anatomy_image.py --audit` で再計算可能）。

## 生成が実施された場合、以下の形式で追記する

```
## YYYY-MM-DD：{asset名}

- asset: assets/images/xxx.webp
- provider: gemini / openai
- model: （実際に使用したモデルID）
- prompt_id: IMG-xxx
- candidate数: N
- 採用candidate: {candidate番号 or "なし（要教員確認へ回付）"}
- 再生成回数: N
- QA結果: 合格 / 要教員確認（理由）
- marker_target: （問題ごとに列挙）
- overlay座標: （問題ごとに列挙、実測値）
```
