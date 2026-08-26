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

## Q231医学的不整合修正（C10差し替え）

- 作業開始HEAD：`ece38fe39a0d6ada400819a4a953e7e2c8e1b9a3`
- 旧C10のQ231 markerは心房中隔ではなく半月弁付近を指していたため、Q231専用の「心臓4腔・中隔模式図」へ差し替えた。
- C10はユーザー確認済み添付画像を最終採用版とし、内容を改変せずWebPへ変換した。正面断面、患者右を画像左として、心房中隔、心室中隔、4心腔、房室弁、左右心室壁厚差、主要血管を確認した。
- Q231のoverlayは最終採用画像上の心房中隔露出部 `(0.376, 0.462)` へ再測定した。altも新図の内容に合わせて更新した。
- Q231のquestion、choices、answer、explanationは変更していない。C03は腱索・乳頭筋を詳しく示す既存masterとして残し、C10との統合は行わなかった。
- 外部素材を使っていないためCreditsの変更はない。
- C10はQ231の心房中隔識別用として採用した。大動脈弁から大動脈基部・上行大動脈に至る位置関係には模式図として改善余地があり、循環器master全体を将来改訂する際の確認項目とする。

---

## common illustration library batch 3（呼吸器 R03/R04 統合）

### 基準と設計

- 作業開始HEAD：`1e387d98a02c4417f6f1f5268f44e628c2810fe0`
- 呼吸器80問のうちimage_mcq 23問を全件監査した。
- 呼吸器masterを7枚から6枚へ整理した。喉頭外観（R01）、声帯・声門（R02）、肺外観・気管支樹（R03）、末梢気道連続図（R04）、肺胞ガス交換（R05）、胸膜横断図（R06）で構成する。
- 旧R03「肺葉」と旧R04「気管支樹」を新R03へ統合した。観察方向と縮尺が異なる喉頭鏡像、末梢気道、肺胞微細構造、胸膜断面は統合しなかった。

### 実装内容

- Codex ImageGenで、前面から見た肺葉・肺裂・気管・主気管支・葉気管支・区域気管支を1枚に収めた新R03を作成した。文字、番号、矢印、markerは画像へ焼き込んでいない。
- Q035,Q036,Q077,Q082,Q152,Q153,Q169を新R03へ移行し、overlayを新画像上で再測定した。座標は順にQ035 `(0.2441,0.5208)`、Q036 `(0.2637,0.332)/(0.7383,0.332)`、Q077 `(0.2852,0.4596)`、Q082 `(0.2051,0.4401)`、Q152 `(0.4521,0.4036)`、Q153 `(0.373,0.393)`、Q169 `(0.2861,0.207)`。
- 旧R05/R06/R07は画像内容を変えずR04/R05/R06へ改番した。対象はQ034,Q037,Q040,Q041,Q084,Q154,Q155,Q156,Q308。R01/R02を使うQ032,Q255,Q256,Q304,Q305,Q306,Q307は変更していない。
- 旧R03〜R07の5ファイルを削除し、新R03と改番後R04〜R06を配置した。参照0の旧assetだけを削除している。
- 問題文、choices、answer、explanationは23問すべて不変。新R03の7問のみaltを統合図の内容に合わせて更新した。
- Phone表示で長いasset名が折り返されず横スクロールを生むことを確認したため、`.qcount`へ`overflow-wrap:anywhere`を追加した。

### 医学的確認

- 新R03は患者右を画像左に置き、右肺3葉・左肺2葉、右水平裂・左右斜裂、心切痕を識別できる。右主気管支は左より短く太く、より垂直に分岐する。
- R04では終末細気管支の壁に肺胞開口がなく、呼吸細気管支では壁の一部へ肺胞が開口する。Q034とQ040の問題文、選択肢、正答、解説との矛盾はない。

### 検証結果

最終値は本batchのコミット直前に再実行したvalidator結果を採用する。`?review=assets`では新R03の7 markerを実画像上で確認し、`?review=images`では呼吸器image_mcq 23問をDesktop 1280×800、iPad 768×1024、Phone 375×812で確認した。全markerが画像内にあり、各問4 choices、正答表示1件、画像切れなし。Phoneのasset名折返し修正後は横スクロールなし。

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

---

## common illustration library batch 4（呼吸器 R1/R2-A/R2-C -- R01からR08/R09を分離新設、R02更新）

### 基準

- 作業開始HEAD：`1e387d98a02c4417f6f1f5268f44e628c2810fe0`
- 作業ツリー：主worktree（`D:\GitHub\anatomy-quiz`）とは別の独立worktree（`D:\GitHub\anatomy-quiz-respiratory`、branch `work/respiratory-common-illustrations`）。主worktreeには発生源不明の別batch（R03/R04統合と見られる未コミット変更、後日「batch 3」と判明）が存在していたため、隔離して実施した。本batchは `fix/v2.0.1-review-and-update`（batch 3を含む）上へのrebaseにより統合され、以降batch 4として記録する
- 対象：R01（喉頭外観と上下気道）からQ032・Q304・Q305・Q306を分離し、新設R08（上気道矢状断）・R09（喉頭外観・前面）へ移行。R02（声帯・声門）をカスタムAI生成画像へ更新し「喉頭鏡視野・上方観」へ改称
- R2-B（Q256を含む可能性のある別視点master）は人間レビュー未完了のため対象外。R01はQ256のみを残した暫定状態のまま維持した
- text_mcq→image_mcq変換は実施していない

### 実装内容

- Q032（上気道矢状断で喉頭を問う）・Q304〜Q306（喉頭外観の軟骨を問う）を、旧R01の後面局所図から、それぞれの観察方向に適した新画像（R08＝正中矢状断、R09＝前面外観）へ移行した。R01はQ256（喉頭蓋）のみを残し、structures/marker_targets/画像自体は変更していない。
- R02を、真声帯・前庭ヒダ（仮声帯）・声門裂が色で明確に分離できるカスタムAI生成画像へ更新した（`status`を`accepted-existing`から`revised`へ変更）。Q307「声門」のmarkerは、旧版で声帯ヒダ組織寄りにあった座標から、左右真声帯に囲まれた声門裂そのもの（暗色の開口部）へ再測定した。marker_target文言も「声門（声門裂）」であることを明確化した。
- 対象6 QID（Q032, Q304, Q305, Q306, Q255, Q307）の`image.asset`・`image.overlay`のみを新画像へ移行した。問題文・choices・answer・explanationは一切変更していない。alt文言は新画像の内容に合わせて更新した。
- 全marker座標を新画像に対する実ピクセルサンプリング（対象色が期待どおりの構造色と一致し、±8pxの近傍でも安定していることをPythonで検証）で再測定した（既存座標の流用は無し）。
- R01・R02とも参照QIDが残る（R01はQ256、R02は移行後も同じ2 QID）ため、今回削除したassetは無い。R08・R09は新規追加のみで、25 master → 27 masterとなった。
- `tools/dataset_validate.js`のunique assets期待値（25→27）、`sw.js`のprecacheリスト（r08・r09追加）とcache名、`README.md`のmaster数表記、`app.js`のCredits文言（R02のServier由来「声帯」記載を削除、「喉頭」はR01がQ256で継続使用のため維持）を更新した。

### marker配置（全件、新画像に対する実ピクセルサンプリングで検証済み。既存座標の流用は無し）

**R08**（`r08_upper_airway_sagittal.webp`、1022×1538）

| marker | QID | marker_target |
|---|---|---|
| ①(0.565,0.615) | Q032 | 喉頭 |

**R09**（`r09_larynx_exterior_anterior.webp`、1122×1402）

| marker | QID | marker_target |
|---|---|---|
| ①(0.32,0.46) | Q304 | 甲状軟骨 |
| ①(0.5,0.665) | Q305 | 輪状軟骨 |
| ①(0.5,0.79) | Q306 | 気管 |

**R02**（`r02_vocal_folds.webp`、1126×1397）

| marker | QID | marker_target |
|---|---|---|
| ②(0.4,0.6) | Q255 | 声帯（真声帯） |
| ①(0.5,0.6) | Q307 | 声門（声門裂） |

真声帯（象牙色）・前庭ヒダ（ピンク）・声門裂（暗赤色の開口）の3構造が実ピクセルサンプリングで色として明確に分離することを確認したうえで配置した。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 4」節を参照。

### 画像処理

3枚ともユーザー提供PNG（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/`配下、RGB、アルファチャンネル無し）をRGBのままWebP変換（quality=92, method=6）。3枚とも長辺1600px以下（最大1538px）のためリサイズなし。トリミング等の追加改変は無し。

### dataset側の変更

- unique asset数：25 → 27（`r08_upper_airway_sagittal.webp`・`r09_larynx_exterior_anterior.webp`を新規追加、削除は0件）。
- image_mcq数：77のまま（type変換は無し）。総問題数311は無変更。
- `assets/illustrations/v1/manifest.json`：R01の`questions`をQ256のみへ縮小。R02の`status`を`revised`へ変更しstructures・marker_targets・generation・provenanceを更新。R08・R09を`accepted-existing`として新設（`source_asset`は`assets/images/upper_airway_sagittal.webp`・`assets/images/larynx_exterior_anterior.webp`としてバイト同一コピーを追加）。`master_count`を25→27、`status_counts`を実態に合わせて更新した。

### 検証結果

| 検証 | 結果 |
|---|---|
| `tools/common_illustration_library_validate.js` | masters 27、77/77問割当、errors 0 |
| `tools/dataset_validate.js` | errors 0、warnings 0（311問／image_mcq 77／text_mcq 234／unique assets 27） |
| `tools/queue_distribution_test.js` | PASSED |

（`?review=assets`・`?review=images`・responsive QAの結果は本ログの直後に追記する。）

---

## common illustration library batch 5（総論G04/G05・循環器C09 -- 既存3 masterの画像更新、G06からG05へQ117再配置）

### 基準

- 作業開始HEAD：`68171a4b4dab57ddbe3a882091aa1a0d1c82cf97`（branch `fix/v2.0.1-review-and-update`）
- 対象：G04（三胚葉）・G05（解剖学的正位）・C09（体循環・肺循環）の3 masterをユーザー提供カスタムAI生成画像へ更新。あわせてG06（解剖学的方向用語）のQ117（内側・外側）を、G05の新画像上（前腕内側縁）へ一意に配置できることを確認したうえで統合した
- text_mcq→image_mcq変換は実施していない。問題文・choices・answer・explanationは全QIDで無変更
- master新設・削除は無し（26 master → 26 master）。既存3 masterの画像更新とQ117の再配置のみ

### 実装内容

- **G05（解剖学的正位）**：旧g05はプロジェクト自作SVGで、直立正面像のみを示しQ051（正位の定義選択、overlayなし）専用だった。新画像（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/exec-2bc0434f-2f33-415b-b191-772303bc8456.png`、887×1774）は写実的な全身正面像で、Q051の構図（直立・正面視・手掌前方）を保ちつつ、前腕内側縁を内側・外側の基準点として実ピクセルサンプリングで一意に指せることを確認した。これによりQ117（旧G06「方向用語」でQ063と同一画像を共有）をG05へ統合し、markerを新規測定した。Q051は元々overlayなしの定義選択問題のため、画像更新後もoverlay追加は行っていない（`tools/dataset_validate.js`のQ051例外はそのまま有効）。
- **G04（三胚葉）**：旧g04は平面的な胚盤断面模式図。新画像（`exec-92659ef8-a458-4f81-bdf3-979b0f1be49e.png`、1214×1296）は外胚葉（青・円柱上皮）／中胚葉（ピンク・疎な間葉）／内胚葉（黄・立方上皮）を色で明確に分離した円柱状カットモデルで、羊膜腔（上方）・卵黄嚢腔（下方）も含む。Q010（中胚葉）・Q011（外胚葉）のmarkerを新画像上で再測定した。marker_targetの文言（「中胚葉（中層）」「最外層（外胚葉）」）は層の相対位置が変わらないため無変更。
- **C09（体循環・肺循環）**：旧c09はプロジェクト自作SVGで、肺静脈・上大静脈・下大静脈の本数が不正確だった。ユーザーが複数回の修正を経て最終確認した画像（`exec-52927d44-a91c-4cb9-8b93-05a12b160b15.png`、1024×1536）は、肺静脈4本（左右各2本）・上大静脈1本・下大静脈1本に修正済み。Q147（体循環：①a大動脈／①b全身毛細血管／①c大静脈復路）・Q148（肺循環：②a肺動脈枝／②b肺毛細血管／②c肺静脈）の各3点markerを新画像上で再測定し、いずれも右肺側の一続きの経路（動脈→毛細血管→静脈）を辿るよう統一した。
- 対象6 QID（Q010, Q011, Q051, Q117, Q147, Q148）の`image.asset`・`image.overlay`/`overlays`・`marker_target`（Q117のみ）・`image.alt`（G04/G05/C09の3 asset単位で統一文言に更新）・`prompt_id`（Q117のみ、G06のIMG-022からG05のIMG-021へ変更し、同一assetを共有するQ051と一致させた）を更新した。
- G06の`questions`をQ063のみへ縮小（Q117を除去）。G06自体の画像・structures・marker_targetsは変更していない（Q063のmarker位置も不変。画像には引き続き内側・外側の矢印も描かれているが、参照する問題が無くなっただけで画像は削除していない）。

### 全marker座標（新画像に対する実ピクセルサンプリングで再測定。既存座標の流用は無し）

**G05**（`g05_anatomical_position.webp`、800×1600、長辺1600pxへリサイズ済み）

| marker | QID | marker_target |
|---|---|---|
| （overlayなし） | Q051 | 全身姿勢（正位の定義選択問題） |
| ①(0.72,0.365) | Q117 | 内側（前腕の内側縁、正中線に近い側） |

**G04**（`g04_germ_layers.webp`、1214×1296）

| marker | QID | marker_target |
|---|---|---|
| ①(0.5,0.43) | Q011 | 最外層（外胚葉、青の円柱上皮層） |
| ②(0.5,0.505) | Q010 | 中胚葉（中層、ピンクの疎な間葉層） |

**C09**（`c09_circulation_circuit.webp`、1024×1536）

| marker | QID | marker_target |
|---|---|---|
| ①a(0.638,0.73) | Q147 | 大動脈（左心室からの下行路） |
| ①b(0.5,0.87) | Q147 | 全身毛細血管床 |
| ①c(0.29,0.7) | Q147 | 大静脈復路（右心房へ戻る経路） |
| ②a(0.765,0.15) | Q148 | 肺動脈枝（右心室から肺への経路） |
| ②b(0.874,0.148) | Q148 | 肺毛細血管床（右肺内） |
| ②c(0.799,0.217) | Q148 | 肺静脈（肺から左心房へ戻る経路） |

### 画像処理

3枚ともユーザー提供PNG（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/`配下、RGB、アルファチャンネル無し）。G04（1214×1296）・C09（1024×1536）は長辺1600px以下のためリサイズなし。G05（887×1774）のみ長辺1600pxへLANCZOSリサイズ（800×1600）。3枚ともWebP変換（quality=92, method=6）。トリミング等の追加改変は無し。

### dataset側の変更

- unique asset数：26のまま（新規追加・削除は0件。G04/G05/C09は既存assetのバイト更新のみ）。
- image_mcq数：77のまま（type変換は無し）。総問題数311は無変更。
- `assets/illustrations/v1/manifest.json`：G04・G05・C09の`status`を`accepted-existing`から`revised`へ変更し、`structures`・`generation`・`provenance`を新画像の内容に合わせて更新（`source_asset`は旧ファイルパスのまま維持、`revised`のためsha256一致チェックは対象外）。G05の`questions`にQ117を追加、G06の`questions`からQ117を除去。`status_counts`（accepted-existing 16→13、revised 10→13）を実態に合わせて更新した。`master_count`は26のまま。
- `tools/dataset_validate.js`・`tools/queue_distribution_test.js`：変更なし（total/category/difficulty/type/unique assets期待値がいずれも今回の変更で変わらないため）。
- `sw.js`：precacheリストは変更なし（ファイル名は既存のまま）。cache名を`anatomy-quiz-v2-2026-08-illustrations-v1-batch4-q231-final`から`anatomy-quiz-v2-2026-08-illustrations-v1-batch5-g1-g5-c5`へ更新した。
- `README.md`：master数（26）に変更が無いため無変更。

### 新規Creditsエントリ

不要。G04・G05・C09はいずれも元々ユーザー提供カスタム画像またはプロジェクト自作SVGで、外部CC表示の対象ではなかった。`app.js`のIMAGE_CREDITSにG04/G05/G06/C09関連の記載は元々無く、変更していない。

### 検証結果

| 検証 | 結果 |
|---|---|
| `tools/dataset_validate.js` | errors 0、warnings 0（311問／image_mcq 77／text_mcq 234／unique assets 26） |
| `tools/common_illustration_library_validate.js` | masters 26、77/77問割当、errors 0 |
| `tools/queue_distribution_test.js` | PASSED |
| `?review=assets` | G04(2問)・G05(2問)・G06(1問)・C09(2問)で使用QID一覧とmarker表示を確認 |
| `?review=images` | 対象6 QID（Q010, Q011, Q051, Q117, Q147, Q148）全件で問題文・選択肢・正答・markerを確認 |
| responsive QA | Desktop(1280×800)／iPad(768×1024)／Phone(375×812)：`document.documentElement.scrollWidth`が`window.innerWidth`を超えないことを確認（横スクロールなし）。Phone幅でのzoom modalも画像が viewport 内に収まることを確認 |

## common illustration library batch 6（循環器C06・呼吸器R06 -- Phase 1最終batch）

### 基準

- 作業開始HEAD：`a2685fe8f08dbaaf8c5835971ebf718e294f8438`（branch `fix/v2.0.1-review-and-update`）
- 対象：C06（血管断面比較）・R06（胸膜横断模式図 → 胸膜・横隔膜）の2 masterをユーザー提供カスタムAI生成画像へ更新
- text_mcq→image_mcq変換は実施していない。問題文・choices・answer・explanationは全QIDで無変更
- master新設・削除は無し（26 master → 26 master）。既存2 masterの画像更新のみ

### 実装内容

- **C06（血管断面比較）**：旧c06はServier素材2パネル（動脈・静脈)と自作毛細血管パネルの合成。新画像（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/exec-ae33ec04-f7e5-4c30-8893-c041da68fd74.png`、1536×1024）は3パネルとも統一されたカスタムAI生成画像で、左から動脈（厚い平滑筋壁・狭い内腔）・静脈（薄い壁・広い内腔・静脈弁）・毛細血管（単層内皮・赤血球が一列で通過）の順に並ぶ。旧画像と同じ左→右の並び順（動脈・静脈・毛細血管）だったため、Q020（静脈）・Q021（毛細血管）・Q067（動脈）のmarker_target割当は変更せず、各panel上の座標のみ実ピクセルサンプリングで再測定した。marker番号（Q020=③、Q021=①、Q067=②）は既存のoverlay labelをそのまま維持した（Q067の問題文中の「①」表記とmarker番号「②」が一致しない既存の不整合は、本batchのスコープ外のため変更していない）。静脈弁は視覚的に明瞭だが、これを直接問う既存image_mcqが無いためmarker化していない。毛細血管の基底膜など、より微細な構造は一意識別できないためmarker対象としていない。
- **R06（胸膜・横隔膜）**：旧r06はプロジェクト自作SVGの胸壁・肺の横断面模式図で、横隔膜を含まなかった。新画像（`exec-5f7f12de-967c-4d05-b497-d5577331186c.png`、1024×1536）は胸郭全体を前額断（冠状断）で開いた図で、左右肺・心臓・気管・横隔膜に加え、肺表面へ直接接する臓側胸膜（内側の淡い膜）と胸壁側の壁側胸膜（外側の淡い膜）、およびその間に挟まれる胸膜腔（教育用に色を強調した狭い帯）が実ピクセルサンプリングで一意に識別できることを確認した。臓側胸膜・壁側胸膜・胸膜腔はいずれも幅数pxと狭いため、3つのmarkerを同一断面上に配置すると画面上で重なってしまう。そのため、同じ胸膜境界線上の3箇所（それぞれ色遷移で構造を確認済み）を選び、画面上で十分に離れた位置へ配置した。Q155（①臓側胸膜→②壁側胸膜）・Q156（③胸膜腔）のmarker座標を新画像上で再測定した（marker番号は既存のoverlay labelをそのまま維持）。図名称を「胸膜横断模式図」から「胸膜・横隔膜」へ改めたが、横隔膜自体を問う既存image_mcqが無い（Q038・Q055・Q083・Q170はtext_mcqのまま）ため、横隔膜はstructuresのみへの記載とし、marker化・text_mcq→image_mcq変換は行っていない。
- 対象5 QID（Q020, Q021, Q067, Q155, Q156）の`image.asset`・`image.overlay`/`overlays`・`image.alt`（C06/R06の2 asset単位で統一文言に更新）を更新した。`marker`・`marker_target`・`prompt_id`はいずれも既存のまま変更していない。

### 全marker座標（新画像に対する実ピクセルサンプリングで再測定。既存座標の流用は無し）

**C06**（`c06_vessel_cross_sections.webp`、1536×1024）

| marker | QID | marker_target |
|---|---|---|
| ②(0.0651,0.5371) | Q067 | 動脈（3断面中の1つ、左panelの平滑筋壁） |
| ③(0.4199,0.7178) | Q020 | 静脈（中央panelの壁） |
| ①(0.8789,0.2832) | Q021 | 毛細血管（右panelの単層内皮壁） |

**R06**（`r06_pleura_cross_section.webp`、1024×1536）

| marker | QID | marker_target |
|---|---|---|
| ①(0.8447,0.2734) | Q155 | 臓側胸膜（肺表面に直接接する内側の膜） |
| ②(0.9072,0.3906) | Q155 | 壁側胸膜（胸壁側の外側の膜） |
| ③(0.2051,0.6836) | Q156 | 胸膜腔（臓側・壁側胸膜に挟まれた、教育用に強調した狭い潜在腔） |

### 画像処理

2枚ともユーザー提供PNG（`.codex/generated_images/01a0331c-d0a0-7791-a884-fdf27de3cc82/`配下、RGB、アルファチャンネル無し）。C06（1536×1024）・R06（1024×1536）とも長辺1536pxで1600px以下のためリサイズなし。2枚ともWebP変換（quality=92, method=6）。トリミング等の追加改変は無し。

### dataset側の変更

- unique asset数：26のまま（新規追加・削除は0件。C06/R06は既存assetのバイト更新のみ）。
- image_mcq数：77のまま（type変換は無し）。総問題数311は無変更。
- `assets/illustrations/v1/manifest.json`：C06・R06の`status`を`accepted-existing`から`revised`へ変更し、`structures`・`generation`・`provenance`を新画像の内容に合わせて更新（`source_asset`は旧ファイルパスのまま維持、`revised`のためsha256一致チェックは対象外）。R06の`name`/`view`/`scale`を新画像の構図（前額断・胸郭全体・横隔膜含む）に合わせて更新した。`marker_targets`はC06=[静脈,毛細血管,動脈]、R06=[臓側胸膜,壁側胸膜,胸膜腔]へ整理（実質同じ対象、粒度のみ統一）。`status_counts`（accepted-existing 13→11、revised 13→15）を実態に合わせて更新した。`master_count`は26のまま。
- `tools/dataset_validate.js`・`tools/queue_distribution_test.js`：変更なし（total/category/difficulty/type/unique assets期待値がいずれも今回の変更で変わらないため）。
- `sw.js`：precacheリストは変更なし（ファイル名は既存のまま）。cache名を`anatomy-quiz-v2-2026-08-illustrations-v1-batch5-g1-g5-c5`から`anatomy-quiz-v2-2026-08-illustrations-v1-batch6-c6-r6`へ更新した。
- `README.md`：master数（26）に変更が無いため無変更。

### 新規Creditsエントリ

- `app.js`のIMAGE_CREDITS中、Servier Medical Art行から「血管壁（動脈／静脈）」の記載を除去した（旧c06のServier由来2パネルが本batchで完全にカスタムAI生成画像へ置き換わったため）。R06はもともとプロジェクト自作SVGでCredits対象外だったため、R06関連の変更は無い。

### 検証結果

| 検証 | 結果 |
|---|---|
| `tools/dataset_validate.js` | errors 0、warnings 0（311問／image_mcq 77／text_mcq 234／unique assets 26） |
| `tools/common_illustration_library_validate.js` | masters 26、77/77問割当、errors 0 |
| `tools/queue_distribution_test.js` | PASSED |
| `?review=assets` | C06(3問)・R06(2問)で使用QID一覧とmarker表示を確認 |
| `?review=images` | 対象5 QID（Q020, Q021, Q067, Q155, Q156）全件で問題文・選択肢・正答・markerを確認 |
| responsive QA | Desktop(1280×800)／iPad(768×1024)／Phone(375×812)：`document.documentElement.scrollWidth`が`window.innerWidth`を超えないことを確認（横スクロールなし）。Phone幅でのzoom modalも画像が viewport 内に収まることを確認 |
