# 人体と構造機能A 共通イラストライブラリ v1

## 適用範囲

`data/questions_v1.json` の311問を正本とし、77件の `image_mcq` を24 masterへ割り当てた。master仕様の機械可読な正本は `assets/illustrations/v1/manifest.json` である。

> **更新（common illustration library batch 1）**：C01・C02・C03・C05をカスタムAI生成画像へ更新し、C08（冠状動脈前面）をC01へ統合して削除、C03から分離できなかったQ231（心房中隔）専用にC10を新設した。Q140（冠状静脈洞）はC02で一意に識別できるようになったためimage_mcqへ復帰した。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 1」節を参照。
>
> **更新（common illustration library batch 2）**：泌尿器U01〜U04（4 master）をU02・U03・U04（3 master）へ統合した。U01「腎門」（Q045単独）はU04「腎臓冠状断」へ統合し、U01は削除した。U02（ネフロン全体）・U03（泌尿器系全体）・U04（腎臓冠状断）はいずれもカスタムAI生成画像へ更新した。詳細は`docs/v2.0.1_asset_source_log.md`「common illustration library batch 2」節を参照。

画像は問題単位で複製しない。複数問題が同じ `image.asset` を参照し、markerの座標とラベルは各問題の `overlay` または `overlays` に残す。前面・後面・断面・組織像、または表示倍率が違う図は別masterとした。

## ID体系

| 接頭辞 | 分野 | master数 |
|---|---|---:|
| G | 総論 | 6 |
| C | 循環器 | 10（C08はC01へ統合、C10を新設） |
| R | 呼吸器 | 6 |
| U | 泌尿器 | 3（U01はU04へ統合） |

## master-to-question対応表

| ID | 図名称 | 使用Q | Q数 | 採用asset |
|---|---|---|---:|---|
| G01 | 人体の構成段階 | Q002 | 1 | `g01_organization_levels.webp` |
| G02 | 上皮組織断面 | Q004 | 1 | `g02_epithelium.webp` |
| G03 | 人体の主要断面 | Q008, Q053, Q054 | 3 | `g03_body_planes.webp` |
| G04 | 三胚葉 | Q010, Q011 | 2 | `g04_germ_layers.webp` |
| G05 | 解剖学的正位 | Q051 | 1 | `g05_anatomical_position.webp` |
| G06 | 解剖学的方向用語 | Q063, Q117 | 2 | `g06_direction_terms.webp` |
| C01 | 心臓外観前面 | Q016, Q138, Q301, Q073, Q074 | 5 | `c01_heart_exterior_anterior.webp` |
| C02 | 心臓外観後面 | Q019, Q125, Q302, Q140 | 4 | `c02_heart_exterior_posterior.webp` |
| C03 | 心臓4腔断面 | Q017, Q064, Q129, Q230 | 4 | `c03_heart_chambers.webp` |
| C04 | 心臓弁輪面 | Q065, Q066 | 2 | `c04_heart_valve_plane.webp` |
| C05 | 心刺激伝導系 | Q025, Q240, Q303 | 3 | `c05_conduction_system.webp` |
| C06 | 血管断面比較 | Q020, Q021, Q067 | 3 | `c06_vessel_cross_sections.webp` |
| C07 | 標準心電図波形 | Q023, Q024, Q068 | 3 | `c07_ecg_waveform.webp` |
| C09 | 体循環・肺循環 | Q147, Q148 | 2 | `c09_circulation_circuit.webp` |
| C10 | 心臓4腔断面（心房中隔） | Q231 | 1 | `c10_heart_chambers_septum.webp` |
| R01 | 喉頭外観と上下気道 | Q032, Q256, Q304, Q305, Q306 | 5 | `r01_larynx.webp` |
| R02 | 声帯・声門 | Q255, Q307 | 2 | `r02_vocal_folds.webp` |
| R03 | 肺外観・気管支樹統合図 | Q035, Q036, Q077, Q082, Q152, Q153, Q169 | 7 | `r03_lungs_bronchial_tree.webp` |
| R04 | 末梢気道連続図 | Q034, Q040, Q041, Q154, Q308 | 5 | `r04_peripheral_airway_continuum.webp` |
| R05 | 肺胞ガス交換 | Q037, Q084 | 2 | `r05_alveolar_gas_exchange.webp` |
| R06 | 胸膜横断模式図 | Q155, Q156 | 2 | `r06_pleura_cross_section.webp` |
| U02 | ネフロン全体 | Q048, Q176, Q177, Q178, Q199, Q310, Q311 | 7 | `u02_nephron.webp` |
| U03 | 泌尿器系全体 | Q050, Q095, Q192 | 3 | `u03_urinary_system.webp` |
| U04 | 腎臓冠状断（腎門含む） | Q045, Q091, Q092, Q093, Q100, Q180, Q309 | 7 | `u04_kidney_cross_section.webp` |

77問すべてがmasterへ割り当てられている。うち73問は複数Qで使うmasterに属し、Q002、Q004、Q051、Q231の4問は教育上の縮尺・識別性を守るため単独masterとした。

## 統合しなかった主な図

- C01、C02、C03は同じ心臓でも観察方向が違う。前面外観、後面外観、内部断面を一枚へ詰めない。
- C04は弁輪面、C05は刺激伝導系である。C03へ重ねるとスマートフォン上でmarker候補が密集する。
- C10：新C03（batch 1で更新した心臓4腔断面）は大血管が心房間を横切り心房中隔を隠すため、Q231だけ更新前のC03画像（心房中隔が視認できる）をC10として保存し分離した。無理に1枚へ統合しなかった例。
- C01とC08（batch 1で統合・削除）：新C01は冠状動脈（右冠動脈・前室間枝）も明瞭に写る高精細画像だったため、専用assetだったC08をC01へ統合しC08を削除した。
- R03は肺外観と主気管支から区域気管支を一枚に統合した。R04は終末細気管支から肺胞を扱うため、縮尺差を守って分けた。
- R05は血液空気関門を識別する微細構造図であり、R04へ統合しない。
- U02、U03、U04はネフロン模式図、泌尿器系全体、腎断面。観察範囲が一致しない。腎門（旧U01）だけはU04の腎臓冠状断上で無理なく一意に指せたため、batch 2でU04へ統合した。

## 生成・出典管理

v1の当初26 masterは品質評価済みの既存assetをバイト同一で採用した。batch 1で循環器、batch 2で泌尿器を更新し、26 masterから25 masterになった。batch 3では呼吸器の肺葉図と中枢気管支図を新R03へ統合し、全体を24 masterとした。生成待ちは0件。各masterの観察方向、縮尺、主要構造、marker target、生成prompt、出典・ライセンス欄はmanifestに収録した。

出典URL、加工方法、採否理由は `docs/v2.0.1_asset_source_log.md` と `docs/v2.0.1_image_quality_classification.md` を参照する。出典欄が「詳細は出典ログ参照」のassetは、公開前にクレジット表示との一致を人が再確認する。

## 更新手順

1. 新しい画像問題の観察方向、縮尺、marker targetを既存masterと照合する。
2. 既存masterで一意に指せる場合は、JSONの `image.asset` をそのmasterへ向ける。
3. 問題固有の `overlay` または `overlays` を実画像上で測る。
4. 新規masterが必要ならmanifestへ `pending-generation` として登録し、画像生成前に図の仕様を教員が確認する。
5. 採用後に `node tools/common_illustration_library_validate.js` と `node tools/dataset_validate.js` を実行する。
