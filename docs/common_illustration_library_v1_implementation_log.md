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
- ~~U02：Q310の遠位尿細管、Q311の輸入細動脈marker~~ **解決済み（batch 2）**。新U02（カスタムAI生成画像）で遠位尿細管・輸入細動脈とも実ピクセルサンプリングで一意に識別・再測定した。
- ~~U04：Q180の集合管とQ309の腎被膜marker（U2腎臓冠状断の差し替えはbatch 1では保留）~~ **解決済み（batch 2）**。ユーザーが確定した最終修正版（`exec-a0f6fb38-...png`）を新U04として採用し、旧U01（腎門、Q045）も統合した上で全7 QIDのmarkerを再測定した。

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

---

## common illustration library batch 2（泌尿器 U1/U2/U3 統合 -- U01廃止、U02/U03/U04更新）

### 基準

- 作業開始HEAD：`4606b5003aed94b8bf76272cfec171e79c305126`
- 対象：泌尿器4 master（U01腎門・U02ネフロン全体・U03泌尿器系全体・U04腎臓冠状断）を3 masterへ統合
- U2（腎臓冠状断）はbatch 1で保留していた最終修正版が今回ユーザーにより確定されたため、あわせて実施した

### 実装内容

- U01「腎門」（Q045単独）をU04「腎臓冠状断」へ統合し、U01を削除した（master数 26 → 25）。
- U02（ネフロン全体）・U03（泌尿器系全体）・U04（腎臓冠状断、腎門を含む）を、ユーザーが人間レビューでGO判定したカスタムAI生成画像（ChatGPT Work/Codex）へ更新した。`status`を`accepted-existing`から`revised`へ変更した。
- U04の採用画像は、batch 1で保留していた候補2件のうちユーザーが最終確定した`exec-a0f6fb38-a10a-4efb-ad25-8ec1069271fe.png`（もう一方の`exec-354ca018-...png`は不採用）。
- 対象17 QID（Q045, Q048, Q050, Q091, Q092, Q093, Q095, Q100, Q176, Q177, Q178, Q180, Q192, Q199, Q309, Q310, Q311）の`image.asset`・`image.overlay(s)`のみを新画像へ移行した。問題文・choices・answer・explanationは一切変更していない。Q045の`image.alt`のみ、新しい画像（腎臓冠状断）の内容に合わせて更新した（他16問のaltは変更なし）。
- 全marker座標を新画像に対する実ピクセルサンプリングで再測定した（既存座標の流用は無し）。腎門（Q045）は腎臓組織の陥凹部（血管・尿管束が出入りする notch）にmarkerを置き、腎動脈・腎静脈・腎盂の厳密な前後順を問う位置には置いていない。
- `tools/dataset_validate.js`のBASELINE_OVERLAYS（Q048）、unique assets期待値（26→25）、`sw.js`のprecacheリスト（u01を除去）とcache名を更新した。`app.js`のCreditsテキストから、Servier由来としていた「腎臓（断面／腎門）・泌尿器系」の記載を削除した（該当画像は今回すべてカスタムAI生成画像に置き換わったため）。

### marker配置（全件、新画像に対する実ピクセルサンプリングで検証済み。既存座標の流用は無し）

**U03**（`u03_urinary_system.webp`、1024×1536）

| marker | QID | marker_target |
|---|---|---|
| ①(0.6553,0.3581) | Q050 | 尿管 |
| ②(0.4883,0.7682) | Q192 | 膀胱 |
| ③-1(0.6299,0.2669) / ③-2(0.6611,0.4948) / ③-3(0.627,0.7259) | Q095 | 尿管の3か所の生理的狭窄部（腎盂尿管移行部／総腸骨動脈交差部／膀胱壁貫通部） |

右腎が左腎より低位に描かれていること、左右尿管・膀胱・尿道が確認できることを目視確認した。

**U04**（`u04_kidney_cross_section.webp`、1122×1402）

| marker | QID | marker_target |
|---|---|---|
| ①(0.6462,0.3317) | Q045 | 腎門（血管・尿管束が腎実質を出入りする陥凹部。前後の厳密な重なり順は問わない） |
| ①(0.4456,0.0713) | Q091 | 腎皮質 |
| ②(0.3922,0.1427) | Q092 | 腎錐体 |
| ③(0.4118,0.2154) | Q093 | 腎乳頭 |
| ④(0.5348,0.1355) | Q180 | 集合管 |
| ①(0.1872,0.1284) | Q309 | 腎被膜 |
| ⑤-1(0.5276,0.6776) / ⑤-2(0.5249,0.6669) / ⑤-3(0.5392,0.5599) / ⑤-4(0.6774,0.5778) | Q100 | 腎乳頭→小腎杯→大腎杯→腎盂（順路overlay） |

小腎杯→大腎杯→腎盂→尿管の連続性（Q100の4点）は、同一の乳頭・小腎杯から合流点、主腎盂トランクへと視覚的に連続する経路上で実測した。

**U02**（`u02_nephron.webp`、1024×1536）

| marker | QID | marker_target |
|---|---|---|
| ①(0.1074,0.0651) | Q311 | 輸入細動脈 |
| ①(0.3223,0.1237) | Q048 | 腎小体 |
| ②(0.1855,0.1563) | Q176 | ボーマン嚢 |
| ③(0.3906,0.293) | Q177 | 近位尿細管 |
| ④(0.5664,0.9245) | Q178 | Henle係蹄（U字ターン部） |
| ①(0.7129,0.1953) | Q310 | 遠位尿細管 |
| ⑤-1〜⑤-5 | Q199 | 腎小体→近位尿細管→Henle係蹄→遠位尿細管→集合管（順路overlay。⑤-5集合管のみ新規座標 (0.9082,0.1953)、他はQ048/177/178/310と同一座標を再利用） |

輸入細動脈・糸球体・Bowman嚢・近位尿細管・Henle係蹄・遠位尿細管・集合管のいずれも新画像上で一意に識別できることを確認した。

### 画像処理

いずれもユーザー提供PNG（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/`配下）をRGBへ変換（アルファなし。3枚とも元からアルファチャンネル無し）、長辺1600px以下のためリサイズなし、WebP変換（quality=92, method=6）。トリミング等の追加改変は無し。

### dataset側の変更

- unique asset数：26 → 25（`u01_renal_hilum.webp`削除、新規追加は0）。
- image_mcq数：77のまま（type変換は無し）。総問題数311は無変更。
- `assets/illustrations/v1/manifest.json`：U01を削除、U02・U03・U04の`status`を`revised`へ変更し、`structures`・`marker_targets`・`questions`・`generation.prompt`・`provenance`を更新した。`master_count`を26→25、`status_counts`を実態に合わせて修正した（従来値は`revised`導入後も更新されていなかったため、あわせて是正）。

### 新規Creditsエントリ

不要（すべてユーザー提供のカスタム生成画像のため、外部ライセンス表示の対象外）。既存Creditsテキストから、今回置き換えたServier由来の腎臓／泌尿器系の記載のみ削除した。

### 検証結果

| 検証 | 結果 |
|---|---|
| `tools/common_illustration_library_validate.js` | masters 25、77/77問割当、errors 0 |
| `tools/dataset_validate.js` | errors 0、warnings 0（311問／image_mcq 77／text_mcq 234／unique assets 25） |
| `tools/queue_distribution_test.js` | PASSED |
| `?review=assets` | U02(7問)・U03(3問)・U04(7問)、全marker位置を実測値と一致確認（画像の自然サイズも意図どおり：U02/U03=1024×1536、U04=1122×1402） |
| `?review=images` | 変更した17 QID全件（Q045,Q048,Q050,Q091,Q092,Q093,Q095,Q100,Q176,Q177,Q178,Q180,Q192,Q199,Q309,Q310,Q311）で画像・正答表示を確認 |
| responsive QA | Desktop(1280×800)／iPad(768×1024)：横スクロールなし。Phone(375×812)：Q045の実描画要素の右端はいずれもwindow.innerWidth内（zoom modal含む）。`scrollWidth`>`clientWidth`の乖離は本バッチ対象外のQ002でも同様に再現するため、batch 1で記録済みの既知の計測アーティファクトであり実際の視覚崩れではない |
