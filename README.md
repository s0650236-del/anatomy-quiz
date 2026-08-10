# anatomy-quiz（人体の構造と機能｜試験対策クイズ）v2

看護学科1年生向けの「人体の構造と機能」試験対策クイズWebアプリです。
GitHub PagesでホスティングしたHTTPS URLを、iPhone / iPad / Windows / Mac の各ブラウザ（主にSafari）から開いて利用します。

- 対象：総論・循環器・呼吸器・泌尿器（初版50問、将来300問へ拡張予定）
- 配布方法：GitHub PagesのURLをSafari等で開く（HTMLファイルの直接配布は非推奨）
- PWA対応：ホーム画面に追加してアプリのように利用可能、2回目以降はオフラインでも動作

学生への配布方法・使い方は [README_配布方法.txt](README_配布方法.txt) を参照してください。

## 構成

```
index.html                    アプリ本体（画面・スタイル）
app.js                        画面ロジック（問題データとは分離）
data/questions_v1.json        問題データ（マスターデータ、初版50問）
data/questions.schema.json    問題データのJSON Schema（検証用）
assets/images/                image_mcq 用の画像を置く場所（初期状態は空）
manifest.webmanifest          PWA用マニフェスト
sw.js                         Service Worker（オフラインキャッシュ）
icon-180.png / icon-512.png   PWA用アイコン
legacy/                       旧v1 HTML（変更・削除しない。参照用に保持）
docs/CLAUDE_CODE_TASK.md      本改修の実装依頼書
docs/image_generation_prompts_v1.md  17枚の画像生成プロンプト
```

`index.html`（画面）と `data/questions_v1.json`（データ）は分離されています。
**問題を追加・修正する場合は、原則 `data/questions_v1.json` の編集のみで完結します。**
`app.js` の改修は不要です（詳しくは下記「問題を追加する」を参照）。

## ローカルでの確認方法

`fetch()` でJSONを読み込む構成のため、`index.html` を `file://` で直接開くと
ブラウザによっては問題データを読み込めません（画面上に読み込みエラーが表示されます）。
確認する場合は、リポジトリ直下で簡易HTTPサーバーを立てて `http://localhost:...` で開いてください。

```bash
# Python がある場合
python -m http.server 8080

# Node.js がある場合（http-server 等を別途インストールしない場合は
# 標準モジュールのみで動く簡易サーバーでも可）
npx serve .
```

その後ブラウザで `http://localhost:8080/index.html` を開いてください。
GitHub Pages上ではHTTPSで配信されるため、この制約は発生しません。

## 問題データの構造

`data/questions_v1.json` は以下の形式です（`data/questions.schema.json` で検証可能）。

```json
{
  "id": "Q001",
  "category": "総論",
  "subcategory": "解剖学と生理学",
  "type": "text_mcq",
  "difficulty": 1,
  "question": "設問文",
  "choices": [
    { "id": "A", "text": "選択肢A" },
    { "id": "B", "text": "選択肢B" },
    { "id": "C", "text": "選択肢C" },
    { "id": "D", "text": "選択肢D" }
  ],
  "answer": "B",
  "explanation": "解説文",
  "tags": ["タグ1", "タグ2"]
}
```

- `category`: `総論` / `循環器` / `呼吸器` / `泌尿器`（現時点の4分野。将来追加する場合はスキーマの enum も更新）
- `type`: `text_mcq`（通常四択） / `image_mcq`（画像四択）
- `difficulty`: `1`=基礎 `2`=標準 `3`=応用
- `id`: `Q001` 形式。`Q300` 以降にも対応可能（3桁固定ではなく、アプリ側は文字列として扱うため桁数が増えても動作する）

画像問題（`image_mcq`）には `image` オブジェクトが必要です。

```json
"image": {
  "prompt_id": "IMG-001",
  "asset": "assets/images/q002_hierarchy.webp",
  "alt": "人体の構成段階を示す5段階の模式図",
  "marker": "①〜⑤",
  "marker_target": "細胞→組織→器官→器官系→個体の各段階",
  "overlay": { "x": 0.42, "y": 0.63, "label": "①" }
}
```

- `asset`: 画像ファイルへの相対パス。画像がまだ配置されていない場合、アプリは「画像準備中」と表示し、他の問題には影響しません。
- `marker` / `marker_target`: 画像生成・位置調整のための説明テキスト（画面には描画されません）。
- `overlay`（省略可）: 画像上に①などのマーカーを重ねて表示するための正規化座標。`x=0,y=0` が画像左上、`x=1,y=1` が右下です。複数マーカーが必要な場合は `overlays`（配列）を使用します。`overlay` / `overlays` が無い問題では何も描画されません。

## 問題を1問追加する例（51問目）

`data/questions_v1.json` の `questions` 配列末尾に、以下のようなオブジェクトを追加するだけです。
`app.js` や `index.html` の修正は不要です（出題数・出題範囲・カテゴリ一覧・出題数プルダウンはすべてデータから自動計算されます）。

```json
{
  "id": "Q051",
  "category": "総論",
  "subcategory": "任意のサブカテゴリ",
  "type": "text_mcq",
  "difficulty": 1,
  "question": "新しい設問文",
  "choices": [
    { "id": "A", "text": "選択肢A" },
    { "id": "B", "text": "選択肢B" },
    { "id": "C", "text": "選択肢C" },
    { "id": "D", "text": "選択肢D" }
  ],
  "answer": "A",
  "explanation": "解説文",
  "tags": ["任意のタグ"]
}
```

`data.question_count` はアプリの動作には使用していません（実際の `questions.length` から動的に計算されるため、更新し忘れても壊れません）が、
問題データのメタ情報として実数と合わせておくことを推奨します。

## 300問への拡張手順

1. `docs/CLAUDE_CODE_TASK.md` の方針どおり、当面は 総論 / 循環器 / 呼吸器 / 泌尿器 の4分野のまま増やす。
2. 新しい問題は `id` を `Q051`, `Q052`, … `Q300` … と連番で採番し、`data/questions_v1.json` の `questions` 配列に追記する。
3. 画像問題を追加する場合は `image.asset` に新しい画像パスを指定する（画像本体は別途 `assets/images/` に配置。未配置でも動作する）。
4. 可能であれば `data/questions.schema.json` を使ってJSONを検証する（Node.js + [ajv](https://ajv.js.org/) など、任意のJSON Schemaバリデータを利用。本リポジトリには検証スクリプトを同梱していないため、必要に応じて別途導入するか、エディタのJSON Schema機能を利用する）。
5. カテゴリを新設する場合（例：将来 消化器 を追加する等）は、`data/questions.schema.json` の `category` の `enum` に追加する。アプリ側（`app.js`）はカテゴリを固定配列で持たず、読み込んだデータから動的に一覧を生成するため、コード修正は不要。
6. 出題数プルダウンの選択肢（5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300）は問題数に応じて自動的に絞り込まれるため、300問構成でもそのまま動作する。

## 画像17枚を追加する手順

1. `docs/image_generation_prompts_v1.md` に記載の17件の生成プロンプトを使い、教育用のオリジナル画像を用意する（教科書図版の複製は禁止）。
2. 各画像は `data/questions_v1.json` の該当問題の `image.asset` に記載されたファイル名で `assets/images/` 配下に配置する（例：`assets/images/q002_hierarchy.webp`）。
3. 画像生成後、解剖学的な誤りがないか教員が確認する。
4. マーカー（①など）が必要な場合は、画像自体には焼き込まず、該当する問題の `image.overlay`（または複数必要なら `image.overlays`）に正規化座標を追加する。座標はブラウザで実際に表示しながら微調整するとよい。
5. 配置後は追加のコード変更なしに、該当問題の画像がアプリ上に表示され、タップ/クリックで拡大表示できるようになる。
6. Service Worker（`sw.js`）は `assets/images/` 配下のリクエストをキャッシュ優先で扱うため、一度表示された画像は2回目以降オフラインでも表示される。

## PWA / オフライン対応

- `manifest.webmanifest`：ホーム画面追加時のアプリ名・アイコン・テーマカラーなどを定義。
- `sw.js`：初回アクセス時に `index.html` / `app.js` / `manifest.webmanifest` / アイコン / `data/questions_v1.json` をキャッシュし、2回目以降のアクセスやオフライン時にも読み込めるようにする。
  - 問題データ（JSON）はオンライン時は常に最新を取得し（network-first）、オフライン時は最後にキャッシュした版を使用する。
  - 画像（`assets/images/`）はキャッシュ優先（cache-first）。取得に失敗した場合（未配置・404など）は何もキャッシュせず、画面側で「画像準備中」表示にフォールバックする。
- `sw.js` の `CACHE` 定数（バージョン文字列）を変更すると、古いキャッシュを破棄して新しい内容に更新される。アプリ本体を大きく更新した際は、このバージョン文字列を更新すること。

## 禁止・注意事項（変更しないもの）

- `legacy/人体の構造と機能_クイズアプリv1.00.01.html` は変更・削除しない。
- 教科書図版の転載は行わない（画像は `docs/image_generation_prompts_v1.md` のプロンプトに基づくオリジナル画像のみ使用）。
- 不要な外部ライブラリ・npmパッケージは導入しない（本アプリはvanilla JS + 標準Web APIのみで構成）。
