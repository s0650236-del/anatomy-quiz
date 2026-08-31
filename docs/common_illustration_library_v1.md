# 人体と構造機能A 共通イラストライブラリ v1

## 適用範囲

`data/questions_v1.json` の311問を正本とし、79件の `image_mcq` を27 masterへ割り当てた。master仕様の機械可読な正本は `assets/illustrations/v1/manifest.json` である。

> **更新（common illustration library batch 1）**：C01・C02・C03・C05をカスタムAI生成画像へ更新し、C08（冠状動脈前面）をC01へ統合して削除、C03から分離できなかったQ231（心房中隔）専用にC10を新設した。Q140（冠状静脈洞）はC02で一意に識別できるようになったためimage_mcqへ復帰した。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 1」節を参照。
>
> **更新（common illustration library batch 2）**：泌尿器U01〜U04（4 master）をU02・U03・U04（3 master）へ統合した。U01「腎門」（Q045単独）はU04「腎臓冠状断」へ統合し、U01は削除した。U02（ネフロン全体）・U03（泌尿器系全体）・U04（腎臓冠状断）はいずれもカスタムAI生成画像へ更新した。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 2」節を参照。
>
> **更新（common illustration library batch 3）**：R03「左右肺葉・肺裂」とR04「気管支分岐」をカスタムAI生成画像による新R03「肺外観・気管支樹統合図」へ統合し、旧R05〜R07をR04〜R06へ改番した。25 master → 24 masterとなった。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 3」節を参照。
>
> **更新（common illustration library batch 4）**：R01「喉頭外観と上下気道」からQ032・Q304・Q305・Q306を分離し、新設R08「上気道矢状断」・R09「喉頭外観・前面」へ移した（R01はQ256のみ残し、人間レビュー未完了のR2-B保留分として維持）。R02「喉頭鏡視野」はカスタムAI生成画像へ更新し、真声帯・前庭ヒダ・声門裂を分離識別できるようにした（Q307のmarkerを声帯ヒダ組織上から声門裂そのものへ再測定）。本batchはbatch 3と別worktreeで並行に進んでいたため、統合時に24 master → 26 masterとなった。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 4」節を参照。
>
> **更新（common illustration library batch 5）**：G04「三胚葉」・G05「解剖学的正位」・C09「体循環・肺循環」をカスタムAI生成画像へ更新した（いずれも`status:"revised"`）。あわせてG06「解剖学的方向用語」のQ117（内側・外側）をG05の新画像上（前腕内側縁）へ統合し、G06はQ063（前方・後方）のみを残した。master数は26のまま変わらない（新設・削除なし、既存masterの画像更新とQ117の再配置のみ）。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 5」節を参照。
>
> **更新（common illustration library batch 6 -- Phase 1最終batch）**：C06「血管断面比較」・R06をカスタムAI生成画像へ更新した（いずれも`status:"revised"`）。R06は横隔膜を含む胸郭全体の前額断（冠状断）画像となったため図名称を「胸膜横断模式図」から「胸膜・横隔膜」へ改めた（ただし今回markerを移行したのはQ155・Q156の胸膜3構造のみで、横隔膜自体を対象とするimage_mcqは無いためmarker_targetsには含めていない）。master数は26のまま変わらない（新設・削除なし、既存2masterの画像更新のみ）。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 6」節を参照。
>
> **更新（Nano Banana final batch）**：C03・C05・C07・G06・U02を最終採用画像へ更新し、U05「膀胱内面」を新設した。Q096（膀胱三角）とQ290（排尿筋）をU05上で一意に指せるためimage_mcqへ変換した。R05候補は青矢印が双方向に見えるため採用せず、R03・R04とともに現行維持。79 image_mcq、27 masterとなった。

画像は問題単位で複製しない。複数問題が同じ `image.asset` を参照し、markerの座標とラベルは各問題の `overlay` または `overlays` に残す。前面・後面・断面・組織像、または表示倍率が違う図は別masterとした。

## ID体系

| 接頭辞 | 分野 | master数 |
|---|---|---:|
| G | 総論 | 6 |
| C | 循環器 | 10（C08はC01へ統合、C10を新設） |
| R | 呼吸器 | 8（R03/R04統合、R08・R09を新設） |
| U | 泌尿器 | 4（U01はU04へ統合、U05を新設） |

## master-to-question対応表

| ID | 図名称 | 使用Q | Q数 | 採用asset |
|---|---|---|---:|---|
| G01 | 人体の構成段階 | Q002 | 1 | `g01_organization_levels.webp` |
| G02 | 上皮組織断面 | Q004 | 1 | `g02_epithelium.webp` |
| G03 | 人体の主要断面 | Q008, Q053, Q054 | 3 | `g03_body_planes.webp` |
| G04 | 三胚葉 | Q010, Q011 | 2 | `g04_germ_layers.webp` |
| G05 | 解剖学的正位 | Q051, Q117 | 2 | `g05_anatomical_position.webp` |
| G06 | 解剖学的方向用語 | Q063 | 1 | `g06_direction_terms.webp` |
| C01 | 心臓外観前面 | Q016, Q138, Q301, Q073, Q074 | 5 | `c01_heart_exterior_anterior.webp` |
| C02 | 心臓外観後面 | Q019, Q125, Q302, Q140 | 4 | `c02_heart_exterior_posterior.webp` |
| C03 | 心臓4腔断面 | Q017, Q064, Q129, Q230 | 4 | `c03_heart_chambers.webp` |
| C04 | 心臓弁輪面 | Q065, Q066 | 2 | `c04_heart_valve_plane.webp` |
| C05 | 心刺激伝導系 | Q025, Q240, Q303 | 3 | `c05_conduction_system.webp` |
| C06 | 血管断面比較 | Q020, Q021, Q067 | 3 | `c06_vessel_cross_sections.webp` |
| C07 | 標準心電図波形 | Q023, Q024, Q068 | 3 | `c07_ecg_waveform.webp` |
| C09 | 体循環・肺循環 | Q147, Q148 | 2 | `c09_circulation_circuit.webp` |
| C10 | 心臓4腔・中隔模式図 | Q231 | 1 | `c10_heart_chambers_septum.webp` |
| R01 | 喉頭外観と上下気道（Q256のみ。R2-B保留中の暫定状態） | Q256 | 1 | `r01_larynx.webp` |
| R02 | 喉頭鏡視野・上方観 | Q255, Q307 | 2 | `r02_vocal_folds.webp` |
| R03 | 肺外観・気管支樹統合図 | Q035, Q036, Q077, Q082, Q152, Q153, Q169 | 7 | `r03_lungs_bronchial_tree.webp` |
| R04 | 末梢気道連続図 | Q034, Q040, Q041, Q154, Q308 | 5 | `r04_peripheral_airway_continuum.webp` |
| R05 | 肺胞ガス交換 | Q037, Q084 | 2 | `r05_alveolar_gas_exchange.webp` |
| R06 | 胸膜・横隔膜 | Q155, Q156 | 2 | `r06_pleura_cross_section.webp` |
| R08 | 上気道矢状断 | Q032 | 1 | `r08_upper_airway_sagittal.webp` |
| R09 | 喉頭外観・前面 | Q304, Q305, Q306 | 3 | `r09_larynx_exterior_anterior.webp` |
| U02 | ネフロン全体 | Q048, Q176, Q177, Q178, Q180, Q199, Q310, Q311 | 8 | `u02_nephron.webp` |
| U03 | 泌尿器系全体 | Q050, Q095, Q192 | 3 | `u03_urinary_system.webp` |
| U04 | 腎臓冠状断（腎門含む） | Q045, Q091, Q092, Q093, Q100, Q309 | 6 | `u04_kidney_cross_section.webp` |
| U05 | 膀胱内面 | Q096, Q290 | 2 | `u05_bladder_interior.webp` |

78問すべてがmasterへ割り当てられている。うち72問は複数Qで使うmasterに属し、Q002、Q004、Q231は教育上の縮尺・識別性を守るため単独masterとした。Q063（G06）もbatch 5でQ117がG05へ移った結果、単独masterとなった。Q256（R01）とQ032（R08）も現時点では単独masterだが、これはR01がR2-B新設（人間レビュー未完了のため保留）を待つ暫定状態であることによるもので、恒久的な設計判断ではない。

## 統合しなかった主な図

- C01、C02、C03は同じ心臓でも観察方向が違う。前面外観、後面外観、内部断面を一枚へ詰めない。
- C04は弁輪面、C05は刺激伝導系である。C03へ重ねるとスマートフォン上でmarker候補が密集する。
- C10：Q231専用の心臓4腔・中隔模式図。心房中隔を両心房間の連続した壁として広く露出する。C03は腱索・乳頭筋を詳しく示す図で役割が異なるため、独立masterを維持した。
- C01とC08（batch 1で統合・削除）：新C01は冠状動脈（右冠動脈・前室間枝）も明瞭に写る高精細画像だったため、専用assetだったC08をC01へ統合しC08を削除した。
- R03は肺外観と主気管支から区域気管支を一枚に統合した。R04は終末細気管支から肺胞を扱うため、縮尺差を守って分けた。
- R05は血液空気関門を識別する微細構造図であり、R04へ統合しない。
- U02、U03、U04はネフロン模式図、泌尿器系全体、腎断面。観察範囲が一致しない。腎門（旧U01）だけはU04の腎臓冠状断上で無理なく一意に指せたため、batch 2でU04へ統合した。
- R08（上気道矢状断）とR09（喉頭外観・前面）：旧R01は後面寄りの頸部局所図1枚に、鼻腔〜気管の全体像（Q032）と喉頭単体の前面観（Q304〜Q306）を無理に同居させていた。矢状断と前面外観は観察方向が異なるため、batch 4で別masterに分離した。Q256（喉頭蓋）は、まだ人間レビューが済んでいない別視点の候補（R2-B）に統合される可能性があるため、今回は旧R01画像に残し統合対象から外した。
- R02は声帯を扱う点でR08・R09と同じ喉頭領域だが、喉頭鏡視野（上方から見た内視鏡的視野）は前面外観・矢状断のどちらとも観察方向が異なり、実在する内視鏡所見の再現という性質上も独立して扱う。
- G05とG06：batch 5でG05の画像を全身写真的イラストへ更新した際、Q117（内側・外側）の marker を前腕内側縁として一意に配置できることを確認できたため、G06からG05へ統合した。Q063（前方・後方）はG05の画像（正面観のみ）では前後方向を示せないため、G06（正面図＋側面図）に残した。G04（三胚葉）は発生学の胚葉断面図でG05・G06とは主題が異なるため統合していない。

## 生成・出典管理

v1の当初26 masterは品質評価済みの既存assetをバイト同一で採用した。batch 1でC01・C02・C03・C05をカスタムAI生成画像へ更新し（`status:"revised"`）、C08を統合廃止、C10を新設した。batch 2でU01（腎門）をU04へ統合・削除し、U02・U03・U04をカスタムAI生成画像へ更新した（`status:"revised"`）。26 master → 25 masterとなった。batch 3では呼吸器の肺葉図（旧R03）と気管支分岐図（旧R04）を新R03（肺外観・気管支樹統合図）へ統合し、25 master → 24 masterとなった。batch 4でR01からQ032・Q304〜Q306を分離し、カスタムAI生成画像によるR08・R09を新設、R02もカスタムAI生成画像へ更新した。batch 5・6で既存masterを更新した。今回のNano Banana final batchではC03・C05・C07・G06・U02を更新し、U05を新設したため27 masterとなった。生成待ちは0件。各masterの観察方向、縮尺、主要構造、marker target、代替画像を作る場合のprompt、出典・ライセンス欄はmanifestに収録した。

出典URL、加工方法、採否理由は `docs/v2.0.1_asset_source_log.md` と `docs/v2.0.1_image_quality_classification.md` を参照する。出典欄が「詳細は出典ログ参照」のassetは、公開前にクレジット表示との一致を人が再確認する。

## 更新手順

1. 新しい画像問題の観察方向、縮尺、marker targetを既存masterと照合する。
2. 既存masterで一意に指せる場合は、JSONの `image.asset` をそのmasterへ向ける。
3. 問題固有の `overlay` または `overlays` を実画像上で測る。
4. 新規masterが必要ならmanifestへ `pending-generation` として登録し、画像生成前に図の仕様を教員が確認する。
5. 採用後に `node tools/common_illustration_library_validate.js` と `node tools/dataset_validate.js` を実行する。
