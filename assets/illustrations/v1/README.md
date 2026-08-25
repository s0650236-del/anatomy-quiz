# 共通イラストライブラリ v1

`assets/` はアプリが配信する確定済みWebP、`manifest.json` はmaster仕様の正本である。

- master IDは分野記号と2桁連番で構成する（G: 総論、C: 循環器、R: 呼吸器、U: 泌尿器）。
- 画像に問題番号やmarkerを焼き込まない。`overlay` / `overlays` は `data/questions_v1.json` の各問題に置く。
- `status` が `accepted-existing` のmasterは品質評価済みの既存assetをバイト同一で収録した。
- `generation.required` が `true` のmasterは、画像を配置するまでJSONから参照しない。
- 出典の詳細と加工履歴は `docs/v2.0.1_asset_source_log.md` を併読する。

画像を差し替える場合は、同じファイル名で候補を作り、全使用Qのmarker位置を実画像上で確認してから採用する。
