# 人体と構造機能A 共通イラストライブラリ v1

## 適用範囲

`data/questions_v1.json` の311問を正本とし、76件の `image_mcq` を26 masterへ割り当てた。master仕様の機械可読な正本は `assets/illustrations/v1/manifest.json` である。

画像は問題単位で複製しない。複数問題が同じ `image.asset` を参照し、markerの座標とラベルは各問題の `overlay` または `overlays` に残す。前面・後面・断面・組織像、または表示倍率が違う図は別masterとした。

## ID体系

| 接頭辞 | 分野 | master数 |
|---|---|---:|
| G | 総論 | 6 |
| C | 循環器 | 9 |
| R | 呼吸器 | 7 |
| U | 泌尿器 | 4 |

## master-to-question対応表

| ID | 図名称 | 使用Q | Q数 | 採用asset |
|---|---|---|---:|---|
| G01 | 人体の構成段階 | Q002 | 1 | `g01_organization_levels.webp` |
| G02 | 上皮組織断面 | Q004 | 1 | `g02_epithelium.webp` |
| G03 | 人体の主要断面 | Q008, Q053, Q054 | 3 | `g03_body_planes.webp` |
| G04 | 三胚葉 | Q010, Q011 | 2 | `g04_germ_layers.webp` |
| G05 | 解剖学的正位 | Q051 | 1 | `g05_anatomical_position.webp` |
| G06 | 解剖学的方向用語 | Q063, Q117 | 2 | `g06_direction_terms.webp` |
| C01 | 心臓外観前面 | Q016, Q138, Q301 | 3 | `c01_heart_exterior_anterior.webp` |
| C02 | 心臓外観後面 | Q019, Q125, Q302 | 3 | `c02_heart_exterior_posterior.webp` |
| C03 | 心臓4腔断面 | Q017, Q064, Q129, Q230, Q231 | 5 | `c03_heart_chambers.webp` |
| C04 | 心臓弁輪面 | Q065, Q066 | 2 | `c04_heart_valve_plane.webp` |
| C05 | 心刺激伝導系 | Q025, Q240, Q303 | 3 | `c05_conduction_system.webp` |
| C06 | 血管断面比較 | Q020, Q021, Q067 | 3 | `c06_vessel_cross_sections.webp` |
| C07 | 標準心電図波形 | Q023, Q024, Q068 | 3 | `c07_ecg_waveform.webp` |
| C08 | 冠状動脈前面 | Q073, Q074 | 2 | `c08_coronary_arteries.webp` |
| C09 | 体循環・肺循環 | Q147, Q148 | 2 | `c09_circulation_circuit.webp` |
| R01 | 喉頭外観と上下気道 | Q032, Q256, Q304, Q305, Q306 | 5 | `r01_larynx.webp` |
| R02 | 声帯・声門 | Q255, Q307 | 2 | `r02_vocal_folds.webp` |
| R03 | 左右肺葉・肺裂 | Q035, Q036, Q082, Q169 | 4 | `r03_lung_lobes.webp` |
| R04 | 気管支分岐 | Q077, Q152, Q153 | 3 | `r04_airway_branching.webp` |
| R05 | 末梢気道連続図 | Q034, Q040, Q041, Q154, Q308 | 5 | `r05_peripheral_airway_continuum.webp` |
| R06 | 肺胞ガス交換 | Q037, Q084 | 2 | `r06_alveolar_gas_exchange.webp` |
| R07 | 胸膜横断模式図 | Q155, Q156 | 2 | `r07_pleura_cross_section.webp` |
| U01 | 腎門 | Q045 | 1 | `u01_renal_hilum.webp` |
| U02 | ネフロン全体 | Q048, Q176, Q177, Q178, Q199, Q310, Q311 | 7 | `u02_nephron.webp` |
| U03 | 泌尿器系全体 | Q050, Q095, Q192 | 3 | `u03_urinary_system.webp` |
| U04 | 腎臓冠状断 | Q091, Q092, Q093, Q100, Q180, Q309 | 6 | `u04_kidney_cross_section.webp` |

76問すべてがmasterへ割り当てられている。うち72問は複数Qで使うmasterに属し、Q002、Q004、Q051、Q045の4問は教育上の縮尺を守るため単独masterとした。

## 統合しなかった主な図

- C01、C02、C03は同じ心臓でも観察方向が違う。前面外観、後面外観、内部断面を一枚へ詰めない。
- C04は弁輪面、C05は刺激伝導系である。C03へ重ねるとスマートフォン上でmarker候補が密集する。
- R04は主気管支から区域気管支、R05は終末細気管支から肺胞を扱う。縮尺差が大きいため分けた。
- R06は血液空気関門を識別する微細構造図であり、R05へ統合しない。
- U01、U03、U04は腎門局所、泌尿器系全体、腎断面。観察範囲が一致しない。

## 生成・出典管理

v1の26 masterは品質評価済みの既存assetをバイト同一で採用した。生成待ちは0件。各masterの観察方向、縮尺、主要構造、marker target、代替画像を作る場合のprompt、出典・ライセンス欄はmanifestに収録した。

出典URL、加工方法、採否理由は `docs/v2.0.1_asset_source_log.md` と `docs/v2.0.1_image_quality_classification.md` を参照する。出典欄が「詳細は出典ログ参照」のassetは、公開前にクレジット表示との一致を人が再確認する。

## 更新手順

1. 新しい画像問題の観察方向、縮尺、marker targetを既存masterと照合する。
2. 既存masterで一意に指せる場合は、JSONの `image.asset` をそのmasterへ向ける。
3. 問題固有の `overlay` または `overlays` を実画像上で測る。
4. 新規masterが必要ならmanifestへ `pending-generation` として登録し、画像生成前に図の仕様を教員が確認する。
5. 採用後に `node tools/common_illustration_library_validate.js` と `node tools/dataset_validate.js` を実行する。
