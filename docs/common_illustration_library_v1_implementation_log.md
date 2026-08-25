# 共通イラストライブラリ v1 実装記録

## 基準

- 作業開始HEAD：`7a6577e99a0f562281cedd5a9c9597b7155b3c39`
- 対象データ：311問、`image_mcq` 76問
- 作業開始時の画像参照：26種類
- 対象外：既存untrackedの `.claude/` と `tmp/`

## 実装内容

- 26種類の既存画像をG/C/R/Uのmaster IDへ割り当てた。
- 既存WebPをバイト変更せず `assets/illustrations/v1/assets/` に複製した。
- 76問の `image.asset` を共通ライブラリのパスへ変更した。
- 設問、選択肢、正答、解説、marker target、`overlay`、`overlays` は変更していない。
- Service Workerのprecache対象と画像判定パスを新ライブラリへ変更し、cache名を更新した。
- master仕様のmanifest、対応表、専用validatorを追加した。
- 旧 `assets/images/` は移行元と履歴参照のため残した。削除はしていない。

## 設計判断

現行26assetは、すでに複数Qで共有され、v2.0.1の品質評価を通っている。別方向・別縮尺の図を追加統合するとmarkerの識別性が落ちるため、v1のmaster数も26とした。新規生成待ちはない。

Q034、Q040、Q041、Q154、Q308はR05末梢気道連続図へ統一されている。Q040を肺胞のない気管支分岐図へ戻す変更はしていない。

## 検証項目

- manifestの必須項目、ID・assetの重複、76問の一対一割当
- manifestとJSONのasset参照一致
- 全master assetの実在
- JSON構文、問題数、分類別件数、正答、画像参照、overlay座標
- 既存6問のbaseline overlay不変
- queue distribution回帰テスト
- 移行元とライブラリ内WebPのSHA-256一致

## 検証結果

| 検証 | 結果 |
|---|---|
| `common_illustration_library_validate.js` | 26 master、76/76問割当、errors 0 |
| `dataset_validate.js` | errors 0、warnings 0、overlay 75問・100 marker |
| JSON Schema | PASS |
| `queue_distribution_test.js` | PASS |
| 移行前JSONとの比較 | `image.asset` 以外の変更Q 0件 |
| WebP SHA-256 | 移行元との不一致 0件 |
| JavaScript構文 | `app.js`、`sw.js`、validator 2本すべてPASS |
| ブラウザ確認 | 311問読込、Q002画像1448×1086、marker 5点、26 master HTTP 200、console warning/error 0件 |

## 人による確認を残すmaster

- C01：Q016の心尖を、体表指標を示さない心臓前面図で問う教育上の妥当性
- C03：Q129の腱索・乳頭筋、Q230・Q231の中隔marker
- C06：Servier素材と自作毛細血管パネルを組み合わせた図のクレジット表記
- C08：冠状動脈assetの一次出典とライセンス表記
- R05：終末細気管支から肺胞までの5 targetの境界
- R06：Q084で血液空気関門3層を判別できる表示倍率
- U02：Q310の遠位尿細管、Q311の輸入細動脈marker
- U04：Q180の集合管とQ309の腎被膜marker

commit hashは実装コミットのGit履歴を正本とする。
