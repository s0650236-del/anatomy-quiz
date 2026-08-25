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

- ~~C01：Q016の心尖を、体表指標を示さない心臓前面図で問う教育上の妥当性~~ **解決済み（batch 1）**。新C01は心尖が実写品質で明瞭に確認できる高精細画像。
- ~~C03：Q129の腱索・乳頭筋、Q230・Q231の中隔marker~~ **解決済み（batch 1）**。新C03は腱索・乳頭筋・心室中隔が明瞭。心房中隔のみ大血管に隠れ一意識別できないためC10へ分離。
- C06：Servier素材と自作毛細血管パネルを組み合わせた図のクレジット表記
- ~~C08：冠状動脈assetの一次出典とライセンス表記~~ **解決済み（batch 1）**。C08をC01へ統合・削除し、出典が明確なカスタムAI生成画像に一本化した。
- R05：終末細気管支から肺胞までの5 targetの境界
- R06：Q084で血液空気関門3層を判別できる表示倍率
- U02：Q310の遠位尿細管、Q311の輸入細動脈marker
- U04：Q180の集合管とQ309の腎被膜marker（**U2腎臓冠状断の差し替えはbatch 1では保留**。候補2件が酷似しており「最終修正版」を確定できなかったため。詳細はdocs/v2.0.1_asset_source_log.md参照）

commit hashは実装コミットのGit履歴を正本とする。

---

## common illustration library batch 1（C01/C02/C03/C05更新、Q140復帰、U2保留）

### 基準

- 作業開始HEAD：`c3fdde6fe7c26fa082b5b296c70e5c10a40b07e7`
- 対象：C01・C02・C03・C05の4 master更新、C08統合廃止、C10新設、Q140のimage_mcq復帰
- U2（腎臓冠状断）は候補画像を確定できず保留（詳細はdocs/v2.0.1_asset_source_log.md）

### 実装内容

- C01・C02・C03・C05を、ユーザーが人間レビューでGO判定したカスタムAI生成画像（ChatGPT Work/Codex）へ更新した。`status`を`accepted-existing`から`revised`へ変更し、旧内容との関係をprovenanceに記録した。
- C08（冠状動脈前面）をC01へ統合し、manifestから削除した。Q073・Q074はC01を参照するよう変更した。
- C03の新画像では大血管が心房間を横切り心房中隔を隠すため、Q231だけは更新前のC03画像（バイト同一コピー）をC10として新設し、既存のoverlay座標をそのまま維持した。
- Q140（冠状静脈洞）を、新C02で冠状静脈洞が房室溝を横走する様子が一意に識別できることを確認したうえでtext_mcq→image_mcqへ復帰した。choices・answer・explanationは無変更、問題文に図参照句のみ追加した。
- 全marker座標を新画像に対する実ピクセルサンプリングで再測定した（既存座標の流用は無し）。
- `tools/dataset_validate.js`のBASELINE_OVERLAYS（Q017・Q064）と件数期待値、`tools/queue_distribution_test.js`の件数期待値、`sw.js`のprecacheリストとcache名を更新した。

### 検証結果

| 検証 | 結果 |
|---|---|
| `tools/common_illustration_library_validate.js` | masters 26、77/77問割当、errors 0 |
| `tools/dataset_validate.js` | errors 0、warnings 0（311問／image_mcq 77／text_mcq 234／unique assets 26） |
| `tools/queue_distribution_test.js` | PASSED |
| `?review=assets` | C01(5問)・C02(4問)・C03(4問)・C05(3問)・C10(1問)、全marker位置を実測値と一致確認 |
| `?review=images` | 変更した17 QID全件（Q016,Q019,Q025,Q064,Q073,Q074,Q125,Q129,Q138,Q140,Q230,Q231,Q240,Q301,Q302,Q303,Q017）で画像・正答表示を確認 |
| responsive QA | Desktop(1280×800)／iPad(768×1024)：横スクロールなし。Phone(375×812)：zoom modal含め表示中の要素はすべてviewport内（詳細はdocs/v2.0.1_asset_source_log.md「既知の計測アーティファクト」参照） |

### 保留事項

- U2（腎臓冠状断）：候補画像2件（酷似）から確定できず、今回は差し替えを見送った。候補pathは出典ログに記録。
