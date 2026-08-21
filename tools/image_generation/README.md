# anatomy-quiz 画像生成パイプライン

`data/questions_v1.json` の image_mcq 問題に必要な解剖生理学教材画像を、外部画像生成APIを使って生成するためのCLIです。

```
questions_v1.json / image_generation_prompts_v1.md を読む
        ↓
   manifest.py が unique asset 一覧を算出
        ↓
外部画像生成API（Gemini優先 → OpenAI）
        ↓
候補画像を tmp/image_candidates/ へ保存（複数候補）
        ↓
   人（またはClaudeの目視）でQA
        ↓
合格した1枚だけを手動で assets/images/ へコピー
        ↓
overlay座標をJSON側で確定
```

このツールは**生成のみ**を自動化します。「どの候補を採用するか」は自動判定しません -- 医学的正確性の判断は常に人間／Claudeの目視レビューを経由します。

## セットアップ

```bash
cd tools/image_generation
python -m venv .venv
.venv/Scripts/python.exe -m pip install -r requirements.txt   # Windows
# .venv/bin/python -m pip install -r requirements.txt         # macOS/Linux
```

リポジトリ直下に `.env` を作成し（`.env.example` をコピー）、使えるAPIキーを1つ以上設定してください。`.env` は `.gitignore` 対象で、CLIは起動時に自動で読み込みます。

## 使い方

```bash
# 現在のasset状況を監査（前回セッションのPhase 1相当）
python tools/image_generation/generate_anatomy_image.py --audit

# 未生成の全unique assetの生成計画（プロンプト全文）を表示。APIキー不要。
python tools/image_generation/generate_anatomy_image.py --plan

# 1件だけドライラン（APIキー不要、実際には生成しない）
python tools/image_generation/generate_anatomy_image.py --prompt-id IMG-005 --dry-run

# 実際に3候補生成（キーが必要）
python tools/image_generation/generate_anatomy_image.py --prompt-id IMG-005 --candidates 3

# providerを明示指定
python tools/image_generation/generate_anatomy_image.py --prompt-id IMG-005 --provider openai
```

`--provider` を省略した場合、`GEMINI_API_KEY`（または`GOOGLE_API_KEY`）→`OPENAI_API_KEY`の優先順で最初に見つかった方を自動選択します。

候補画像は常に `tmp/image_candidates/{prompt_id}_candidate_{n}.webp` に保存されます（Git管理外）。**このツールは `assets/images/` へは一切書き込みません。** QAに合格した1枚だけを

```bash
cp tmp/image_candidates/IMG-005_candidate_2.webp assets/images/q016_apex.webp
```

のように手動でコピーしてください。

## モデル名について

`providers/gemini.py` の既定モデルは `gemini-2.5-flash-image`、`providers/openai_provider.py` の既定モデルは `gpt-image-2` です（2026年8月に公式ドキュメントを確認して選定）。画像生成モデルの名称はベンダー側で頻繁に更新されるため、実運用前に必ず各ベンダーの最新ドキュメントを確認し、必要なら `.env` の `GEMINI_IMAGE_MODEL` / `OPENAI_IMAGE_MODEL`、または `--model` フラグで上書きしてください。

## ファイル構成

- `generate_anatomy_image.py` -- CLI本体
- `manifest.py` -- `data/questions_v1.json` と `docs/image_generation_prompts_v1.md` から、unique asset ⇔ prompt_id ⇔ 問題ID の対応表を算出
- `utils.py` -- WebP変換・候補保存などの補助関数
- `providers/base.py` -- provider共通インターフェース
- `providers/gemini.py` / `providers/openai_provider.py` -- 各API実装
- `test_smoke.py` -- APIキー不要のスモークテスト（`.venv/Scripts/python.exe test_smoke.py`）

## 設計方針（prompt_id）

同一画像を複数の問題で共有する場合（例: Q008/Q053/Q054が同じ `q008_body_planes.webp` を共有）、`prompt_id` は問題ごとに新規採番せず、asset単位のcanonicalな1つのIDを共有します。`manifest.py` はこの前提を検証し、同一`prompt_id`が2つの異なるassetを指す状態を検出したら例外を送出します。
