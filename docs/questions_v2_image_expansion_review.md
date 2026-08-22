# v2 画像問題拡張レビュー（image_mcq 再設計）

anatomy-quiz の総論・循環器・呼吸器・泌尿器 全300問（`docs/questions_v2_300_final_candidate.md` を基準）について、「画像を使った方が解剖生理学の理解が明らかに高まる問題」という観点から image_mcq を再抽出・再設計した戦略資料である。

**本資料は画像戦略の設計のみを目的とし、今回は画像ファイルの作成・取得・配置、および `data/questions_v1.json` ・`docs/questions_v2_300_final_candidate.md` の変更は一切行っていない。**

- 基準ブランチ: v2-development
- 基準HEAD: `7519956d6f0a0159226def3feb81e2c5ae3265c0`
- 教育内容上の正本: `docs/questions_v2_300_final_candidate.md`（本資料はこれを一切変更しない）

---

## サマリー

| 項目 | 現在 | 今回の推奨 |
|---|---|---|
| image_mcq数 | 42 | 65 |
| unique image asset数 | 23 | 27 |
| 平均共有問題数/asset | 1.83 | 2.41 |
| category内訳(image_mcq) | 総論6/循環器15/呼吸器12/泌尿器9 | 総論10/循環器24/呼吸器17/泌尿器14 |

新規追加 23問のうち、**18問は既存または計画済みassetへのmarker追加のみ（新規unique asset不要）**、残り5問のために新規SVG assetを4種類（anatomical_position.webp / direction_terms.webp / heart_valves_schematic.webp / circulation_circuit.webp）追加する設計とした。「1. 既存asset共有 → 2. plannedのasset共有 → 3. SVG新規作成」という優先順位に従い、新規AI生成・新規OPEN素材取得を今回の追加分では1件も必要としない。

---

## 1. 現在の42 image_mcq一覧（Phase 1監査）

現行の42問はすべて医学的・教育的に妥当と判断し、原則維持する（「現在image_mcqだから」という理由だけでA/Bにせず、各問について画像の必要性を個別に確認した）。Q129のみ、既存資料の記載どおり判定保留とする。

| QID | category | image_asset | marker_target | image_status | asset共有QID | 画像教育価値 |
|---|---|---|---|---|---|---|
| Q002 | 総論 | q002_hierarchy.webp | 細胞→組織→器官→器官系→個体の各段階 | exists_confirmed | 単独 | A |
| Q004 | 総論 | q004_epithelium.webp | 最表層の上皮組織 | exists_confirmed | 単独 | A |
| Q008 | 総論 | q008_body_planes.webp | 冠状面 | planned_shared | Q053,Q054 | A |
| Q011 | 総論 | q011_germ_layers.webp | 最外層（外胚葉） | planned_shared | 単独(今回Q010追加) | A |
| Q053 | 総論 | q008_body_planes.webp | 矢状面パネル | planned_shared | Q008,Q054 | A |
| Q054 | 総論 | q008_body_planes.webp | 水平面パネル | planned_shared | Q008,Q053 | A |
| Q016 | 循環器 | q016_apex.webp | 心尖 | planned_shared | 単独 | A |
| Q017 | 循環器 | q017_heart_chambers.webp | 左心室 | exists_confirmed | Q064,Q129(+Q230,Q231今回追加) | A |
| Q019 | 循環器 | q019_pulmonary_vein.webp | 肺から左心房へ入る肺静脈 | planned_shared | 単独 | A |
| Q021 | 循環器 | q021_vessel_cross_sections.webp | 毛細血管 | planned_shared | Q067(+Q020今回追加) | A |
| Q025 | 循環器 | q025_conduction_system.webp | 右心房上部の洞房結節 | planned_shared | Q240 | A |
| Q064 | 循環器 | q017_heart_chambers.webp | 右心房・右心室・左心房・左心室（4か所） | exists_confirmed | Q017,Q129(+Q230,Q231) | A |
| Q067 | 循環器 | q021_vessel_cross_sections.webp | 動脈（3断面中の1つ） | planned_shared | Q021 | A |
| Q068 | 循環器 | q068_ecg_waveform.webp | T波 | planned_shared | 単独(+Q023,Q024今回追加) | A |
| Q073 | 循環器 | q073_coronary_arteries.webp | 左冠動脈 | planned_shared | Q074 | A |
| Q074 | 循環器 | q073_coronary_arteries.webp | 右冠動脈 | planned_shared | Q073 | A |
| Q125 | 循環器 | heart_exterior_posterior.webp | 心底 | planned_shared | Q140 | A |
| Q129 | 循環器 | q017_heart_chambers.webp | 腱索・乳頭筋 | review_required | 単独 | 判定保留 |
| Q138 | 循環器 | heart_exterior_anterior.webp | 上大静脈 | planned_shared | 単独 | A |
| Q140 | 循環器 | heart_exterior_posterior.webp | 冠状静脈洞 | planned_shared | Q125 | A |
| Q240 | 循環器 | q025_conduction_system.webp | 房室束 | planned_shared | Q025 | A |
| Q032 | 呼吸器 | q032_larynx.webp | 喉頭 | planned_shared | 単独(+Q255,Q256今回追加) | A |
| Q035 | 呼吸器 | q035_right_middle_lobe.webp | 右肺中葉 | planned_shared | Q082,Q169(+Q036今回追加) | A |
| Q037 | 呼吸器 | q037_alveolar_gas_exchange.webp | 肺胞から血液へ向かう矢印 | exists_confirmed | 単独(+Q084今回追加) | A |
| Q040 | 呼吸器 | q040_airway_branching.webp | 呼吸細気管支 | planned_shared | Q077,Q152,Q153 | A |
| Q041 | 呼吸器 | q041_alveolar_sac.webp | 肺胞嚢 | planned_shared | Q154 | A |
| Q077 | 呼吸器 | q040_airway_branching.webp | 区域気管支 | planned_shared | Q040,Q152,Q153 | A |
| Q082 | 呼吸器 | q035_right_middle_lobe.webp | 水平裂 | planned_shared | Q035,Q169 | A |
| Q152 | 呼吸器 | q040_airway_branching.webp | 右主気管支 | planned_shared | Q040,Q077,Q153 | A |
| Q153 | 呼吸器 | q040_airway_branching.webp | 葉気管支 | planned_shared | Q040,Q077,Q152 | A |
| Q154 | 呼吸器 | q041_alveolar_sac.webp | 肺胞管 | planned_shared | Q041 | A |
| Q155 | 呼吸器 | pleura_cross_section | ①臓側胸膜→②壁側胸膜 | planned_shared | 単独(+Q156今回追加) | A |
| Q169 | 呼吸器 | q035_right_middle_lobe.webp | 肺尖 | planned_shared | Q035,Q082 | A |
| Q045 | 泌尿器 | q045_renal_hilum.webp | 腎門 | planned_shared | 単独 | A |
| Q048 | 泌尿器 | q048_nephron.webp | 腎小体 | exists_confirmed | Q176(+Q199,Q177,Q178,Q200今回追加) | A |
| Q050 | 泌尿器 | q050_urinary_system.webp | 尿管 | planned_shared | Q192(+Q095今回追加) | A |
| Q091 | 泌尿器 | q091_kidney_cross_section.webp | 腎皮質 | planned_shared | Q092,Q093,Q180(+Q100今回追加) | A |
| Q092 | 泌尿器 | q091_kidney_cross_section.webp | 腎錐体 | planned_shared | Q091,Q093,Q180 | A |
| Q093 | 泌尿器 | q091_kidney_cross_section.webp | 腎乳頭 | planned_shared | Q091,Q092,Q180 | A |
| Q176 | 泌尿器 | q048_nephron.webp | ボーマン嚢 | exists_confirmed | Q048 | A |
| Q180 | 泌尿器 | q091_kidney_cross_section.webp | 集合管 | planned_shared | Q091,Q092,Q093 | A |
| Q192 | 泌尿器 | q050_urinary_system.webp | 膀胱 | planned_shared | Q050 | A |

---

## 2. 現在の23 unique asset一覧

| asset | 状態 | 現在の共有QID |
|---|---|---|
| q002_hierarchy.webp | exists_confirmed | Q002 |
| q004_epithelium.webp | exists_confirmed | Q004 |
| q008_body_planes.webp | planned | Q008, Q053, Q054 |
| q011_germ_layers.webp | planned | Q011 |
| q016_apex.webp | planned | Q016 |
| q017_heart_chambers.webp | exists_confirmed | Q017, Q064, Q129 |
| q019_pulmonary_vein.webp | planned | Q019 |
| q021_vessel_cross_sections.webp | planned | Q021, Q067 |
| q025_conduction_system.webp | planned | Q025, Q240 |
| q068_ecg_waveform.webp | planned | Q068 |
| q073_coronary_arteries.webp | planned | Q073, Q074 |
| heart_exterior_posterior.webp | planned | Q125, Q140 |
| heart_exterior_anterior.webp | planned | Q138 |
| q032_larynx.webp | planned | Q032 |
| q035_right_middle_lobe.webp | planned | Q035, Q082, Q169 |
| q037_alveolar_gas_exchange.webp | exists_confirmed | Q037 |
| q040_airway_branching.webp | planned | Q040, Q077, Q152, Q153 |
| q041_alveolar_sac.webp | planned | Q041, Q154 |
| pleura_cross_section | planned | Q155 |
| q045_renal_hilum.webp | planned | Q045 |
| q048_nephron.webp | exists_confirmed | Q048, Q176 |
| q050_urinary_system.webp | planned | Q050, Q192 |
| q091_kidney_cross_section.webp | planned | Q091, Q092, Q093, Q180 |

---

## 3. existing / SVG / OPEN / AI 分類（Phase 6：既存23assetの再分類）

すでに実在・採用済みのasset（existing、5種類）は理由なく作り直さない。planned状態の18種類について、以下の方式を割り当てる。

| asset | 現状態 | 制作方式 | 理由 |
|---|---|---|---|
| q002_hierarchy.webp | exists_confirmed | **existing** | 既存の実在asset。作り直さない。 |
| q004_epithelium.webp | exists_confirmed | **existing** | 既存の実在asset。作り直さない。 |
| q017_heart_chambers.webp | exists_confirmed | **existing** | 既存の実在asset。今回Q230・Q231の新規markerを追加するのみで、既存Q017/Q064/Q129のoverlayは変更しない。 |
| q037_alveolar_gas_exchange.webp | exists_confirmed | **existing** | 既存の実在asset。今回Q084の新規markerを追加するのみ。 |
| q048_nephron.webp | exists_confirmed | **existing** | 既存の実在asset。今回Q199・Q177・Q178の新規markerを追加するのみ。 |
| q008_body_planes.webp | planned | **SVG** | 単純な3平面模式図はSVGでの直接描画が適する。ChatGPT手動生成候補が存在するが未確定（Phase11参照）。SVG採用を推奨。 |
| q011_germ_layers.webp | planned | **SVG** | 同心円状の層構造模式図はSVGが適する。ChatGPT手動生成候補が存在するが未確定。SVG採用を推奨。 |
| q016_apex.webp | planned | **AI** | 体表とのランドマーク関係を示すリアルな胸部図が必要。ChatGPT手動生成候補が存在するが、赤いmarker/haloが焼き込まれているため不採用。marker無し版を再生成する。 |
| q019_pulmonary_vein.webp | planned | **SVG** | 心臓・血管の単純模式図で十分。SVGが適する。 |
| q021_vessel_cross_sections.webp | planned | **SVG** | 血管断面はSVG例として明示されている典型例。 |
| q025_conduction_system.webp | planned | **SVG** | 刺激伝導系模式図はSVG例として明示されている典型例。 |
| q032_larynx.webp | planned | **SVG** | 喉頭矢状断面図として気道分岐模式図と同様にSVGで表現可能。 |
| q035_right_middle_lobe.webp | planned | **SVG** | 肺葉模式図はSVG例として明示されている典型例。 |
| q040_airway_branching.webp | planned | **SVG** | 気道分岐模式図はSVG例として明示されている典型例。 |
| q041_alveolar_sac.webp | planned | **SVG** | 肺胞管・肺胞嚢のぶどう房状模式図はSVGで十分表現可能。 |
| q045_renal_hilum.webp | planned | **SVG** | 腎門部の単純な模式図はSVGで十分表現可能。 |
| q050_urinary_system.webp | planned | **SVG** | 尿路全体模式図はSVG例として明示されている典型例。 |
| q068_ecg_waveform.webp | planned | **SVG** | ECG波形はSVG例として明示されている典型例。 |
| q073_coronary_arteries.webp | planned | **AI** | 心臓表面での冠動脈の有機的な走行はユーザーのTYPE-AI例に「教材専用の冠動脈図」として明示されている。 |
| q091_kidney_cross_section.webp | planned | **SVG** | 腎臓冠状断面図は血管断面と同様の単純断面模式図としてSVGが適する。 |
| heart_exterior_anterior.webp | planned | **OPEN→AI** | 心臓外形（前面）はまずServier Medical Art等の信頼できる医療オープン素材を確認し、適切なライセンスの素材がなければAI生成を検討する。 |
| heart_exterior_posterior.webp | planned | **OPEN→AI** | 心臓外形（後面、冠状静脈洞を含む）も同様にOPEN優先、なければAI。 |
| pleura_cross_section | planned | **SVG** | 胸膜断面はSVG例として明示されている典型例。 |

内訳: existing 5 / SVG 15 / AI 1(q073_coronary_arteries) / OPEN→AI 2(heart_exterior_anterior, heart_exterior_posterior)

---

## 4. text_mcqからの画像化候補一覧（Phase 2/7：全258問中の再監査結果）

258問のtext_mcqすべてを、総論・循環器・呼吸器・泌尿器それぞれの優先確認対象（解剖学的正位/人体の面/方向用語/体腔/身体の大区分/基本組織/胚葉、心臓4腔/心臓弁/刺激伝導系/ECG/肺循環/体循環/血管/微小循環/リンパ還流、鼻腔〜気道分岐〜肺葉〜胸膜〜ガス交換、腎臓の位置・内部構造〜ネフロン〜尿路〜膀胱・尿道）に沿って個別に確認した。

画像化の価値基準（Phase 3）に明確に該当する問題のみを候補とし、定義のみ・数値暗記・生理機序のみ・ホルモン作用のみ・正常値・計算・文章のみで十分な問題は原則除外した。

以下は候補の全件（採用・見送りを含む）。「選定」列の○は Phase 8 最終セットに採用したもの。

### 総論

| QID | subcategory | 画像化する理由 | asset | 優先度 | 選定 |
|---|---|---|---|---|---|
| Q051 | 解剖学的正位 | 解剖学的正位はポーズそのものが定義であり、図なしでは基準姿勢を正確に共有できない | NEW:anatomical_position.webp | S | ○ |
| Q117 | 方向用語 | 内側・外側は正中面からの距離関係であり、矢印付き模式図で明確になる | NEW:direction_terms.webp | S | ○ |
| Q063 | 方向用語 | 前方・後方も同様に矢印付き模式図で明確になる | NEW:direction_terms.webp | S | ○ |
| Q009 | 方向用語 | 近位・遠位の関係も図示が有効だが、今回は予算内で優先度を下げ次回検討とする | NEW:direction_terms.webp(拡張) | A |  |
| Q060 | 方向用語 | 橈側・尺側も図示可能だが基礎的な定義でテキストでも理解可能 | NEW:direction_terms.webp(拡張) | B |  |
| Q061 | 方向用語 | 脛側・腓側も同様 | NEW:direction_terms.webp(拡張) | B |  |
| Q062 | 方向用語 | 浅・深は層構造の理解に図が有効だが優先度は中程度 | NEW:direction_terms.webp(拡張) | B |  |
| Q216 | 方向用語 | 上方・下方も同様 | NEW:direction_terms.webp(拡張) | B |  |
| Q055 | 体腔 | 胸腔・腹腔の位置関係は体腔模式図で明確になる | NEW:body_cavities.webp | S |  |
| Q210 | 体腔 | 体腔とその内容物の対応も同一画像で明確になる | NEW:body_cavities.webp | A |  |
| Q059 | 身体の大区分 | 身体の大区分（頭頸部・体幹・上肢・下肢）は身体の区分図で明確になる | NEW:body_regions.webp | S |  |
| Q120 | 身体の大区分 | 上肢の区分も同一画像で明確になる | NEW:body_regions.webp | A |  |
| Q121 | 身体の大区分 | 下肢の区分も同一画像で明確になる | NEW:body_regions.webp | A |  |
| Q010 | 発生 | 3胚葉の位置関係は既存のQ011用asset(q011_germ_layers.webp)を共有すれば新規asset不要 | q011_germ_layers.webp | A | ○ |
| Q012 | 発生 | 由来のみを問う内容で、位置・形態の識別ではないためtext_mcqのままで十分 | ― | C(除外) |  |
| Q209 | 発生 | 同上（Phase Iで既に文言確定済みのため変更しない） | ― | C(除外) |  |
| Q005 | 基本組織 | 組織と働きの対応（マッチング）であり、構造識別ではないためtext_mcqで十分 | ― | C(除外) |  |

### 循環器

| QID | subcategory | 画像化する理由 | asset | 優先度 | 選定 |
|---|---|---|---|---|---|
| Q230 | 心臓の内部構造 | 心室中隔は既存のQ017/Q064用asset(q017_heart_chambers.webp)に新規markerを追加するだけで実現可能 | q017_heart_chambers.webp | S | ○ |
| Q231 | 心臓の内部構造 | 心房中隔も同様に既存assetへのmarker追加で実現可能 | q017_heart_chambers.webp | S | ○ |
| Q150 | 心臓の内部構造 | 心房・心室の位置関係も既存assetの活用余地があるが今回は優先度を下げる | q017_heart_chambers.webp(拡張) | A |  |
| Q128 | 心臓の内部構造 | 左右心室壁厚の比較は断面図が有効だが写真ベースのassetでの厚さ比較の明瞭性が未確認のため保留 | q017_heart_chambers.webp(拡張・要確認) | A |  |
| Q065 | 心臓弁 | 房室弁2つの位置を同時に問う統合的な設問で、新規の弁模式図により大きく理解が深まる | NEW:heart_valves_schematic.webp | S | ○ |
| Q066 | 心臓弁 | 半月弁2つの位置を同時に問う統合的な設問。同一模式図を共有 | heart_valves_schematic.webp | S | ○ |
| Q069 | 心臓弁 | 三尖弁単独の位置。今回は新規asset作成を優先2問(Q065,Q066)に絞り次回検討とする | heart_valves_schematic.webp(拡張) | A |  |
| Q070 | 心臓弁 | 肺動脈弁単独の位置。同上 | heart_valves_schematic.webp(拡張) | A |  |
| Q233 | 心臓弁 | 大動脈弁単独の位置。同上 | heart_valves_schematic.webp(拡張) | A |  |
| Q071 | 心臓弁 | 弁の開閉タイミング（生理機序）であり構造identificationではないためtext_mcqで十分 | ― | C(除外) |  |
| Q072 | 心臓弁 | 同上 | ― | C(除外) |  |
| Q027 | 冠状動脈 | 起始部の位置は既存のQ073/Q074用asset拡張で対応可能だが今回は見送り | q073_coronary_arteries.webp(拡張) | A |  |
| Q241 | 冠状動脈 | 洞房結節への血液供給は生理的知識の側面が強くtext_mcqのままでも理解可能 | q073_coronary_arteries.webp(拡張) | B |  |
| Q252 | 冠状動脈 | 冠循環全体の経路統合はQ245等と同様、既存2問の再言及ではなく独立の統合理解として維持する（Phase Iで判定済み、今回変更しない） | ― | C(除外) |  |
| Q026 | 大動脈 | 大動脈弓分枝の順序は分岐模式図が必須だが新規asset化は次回優先度とする | NEW:aorta_branches.webp | S |  |
| Q139 | 血管 | 腹部大動脈分枝も同一画像を共有できる | NEW:aorta_branches.webp | S |  |
| Q020 | 血管 | 静脈の特徴（壁が薄い・内腔が広い）は既存のQ021/Q067用asset(q021_vessel_cross_sections.webp)に静脈markerを追加するだけで実現可能 | q021_vessel_cross_sections.webp | S | ○ |
| Q134 | 血管 | 弾性動脈の性質は生理機序が中心でtext_mcqのままで十分 | ― | C(除外) |  |
| Q135 | 血管 | 筋ポンプ作用は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q136 | 血管 | 静脈弁の機能説明でありtext_mcqのままで十分（位置は下肢静脈という記述で足りる） | ― | C(除外) |  |
| Q137 | 血管 | 毛細血管での物質交換の機序でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q226 | 血管 | 微小循環（細動脈→毛細血管→細静脈）は経路を示す模式図で理解が深まる | NEW:microcirculation.webp | S |  |
| Q227 | 血管 | 細動脈の血流調節機能も微小循環模式図を共有できる | microcirculation.webp(拡張) | B |  |
| Q237 | 血管 | 循環血液量の代表値（数値）でありPhase3の除外基準に該当 | ― | C(除外・数値) |  |
| Q238 | 血管 | 血液粘性の影響は生理機序でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q242 | 血管 | 重力の影響は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q249 | 血管 | 末梢血管抵抗の配分は微小循環模式図で補足可能だが今回は見送り | microcirculation.webp(拡張) | B |  |
| Q147 | 体循環 | 体循環の経路全体を1枚の循環模式図でたどることができる、経路理解の核心的な設問 | NEW:circulation_circuit.webp | S | ○ |
| Q148 | 肺循環 | 肺循環の経路も同一模式図を共有できる | circulation_circuit.webp | S | ○ |
| Q014 | 肺循環 | 肺循環の開始部位単独の設問。同一模式図拡張で対応可能だが今回は見送り | circulation_circuit.webp(拡張) | A |  |
| Q146 | 肺循環 | 動脈血・静脈血の定義（血管の種類と一致しない点）は概念説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q015 | 体循環 | 体循環の終着点単独の設問。Q147と重複度が高いため今回は見送り | circulation_circuit.webp(拡張) | B |  |
| Q023 | 心電図 | P波の識別は既存のQ068用asset(q068_ecg_waveform.webp)へのmarker追加のみで実現可能 | q068_ecg_waveform.webp | S | ○ |
| Q024 | 心電図 | QRS群の識別も同一画像を共有できる | q068_ecg_waveform.webp | S | ○ |
| Q075 | 心電図 | PQ間隔（区間）の識別も同一画像を共有できるが今回は見送り | q068_ecg_waveform.webp(拡張) | A |  |
| Q076 | 心電図 | ST部分の識別も同様 | q068_ecg_waveform.webp(拡張) | A |  |
| Q144 | 心電図 | P-QRS-T波形の時間的順序統合は、Phase Iで「独立した学習目標」として意図的にtext_mcq維持と判定済み。今回もこの判定を尊重し変更しない | ― | C(維持・既存判断尊重) |  |
| Q243 | リンパ系 | リンパ還流の最終部位（静脈角）は循環模式図に還流経路を追加すれば表現できるが今回は見送り | circulation_circuit.webp(拡張) | A |  |
| Q149 | 刺激伝導系 | 自律神経による心拍調節は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q141 | 刺激伝導系 | 心臓の自動能は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q142 | 刺激伝導系 | 房室結節での遅延の意義は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q143 | 刺激伝導系 | プルキンエ線維は既存のQ025/Q240用asset拡張で対応可能だが今回は見送り | q025_conduction_system.webp(拡張) | B |  |
| Q245 | 心臓弁 | Phase Iで独立の学習目標として維持と判定済み。今回変更しない | ― | C(維持・既存判断尊重) |  |
| Q246 | 心臓弁 | Phase Iで名称由来問題として再設計済み。位置情報に依存しない設問のため画像化は不要 | ― | C(除外) |  |

### 呼吸器

| QID | subcategory | 画像化する理由 | asset | 優先度 | 選定 |
|---|---|---|---|---|---|
| Q255 | 喉頭 | 声帯は既存のQ032用asset(q032_larynx.webp)へのmarker追加のみで実現可能 | q032_larynx.webp | S | ○ |
| Q256 | 喉頭 | 喉頭蓋も同一画像を共有できる | q032_larynx.webp | A | ○ |
| Q080 | 喉頭 | 喉頭の位置・機能全般はやや広い内容で、声帯・喉頭蓋の個別設問でカバーできるため見送り | q032_larynx.webp(拡張) | B |  |
| Q033 | 咽頭 | 上咽頭の位置は新規の上気道矢状断面図が必要 | NEW:upper_airway_sagittal.webp | S |  |
| Q253 | 上気道 | 鼻中隔も同一新規画像を共有できる | NEW:upper_airway_sagittal.webp | A |  |
| Q254 | 上気道 | 副鼻腔も同様 | NEW:upper_airway_sagittal.webp | A |  |
| Q151 | 上気道 | 加温加湿という機能説明が中心でtext_mcqのままで十分 | ― | C(除外) |  |
| Q257 | 気管 | 気管の走行は既存のQ040用asset(q040_airway_branching.webp)を気管部分まで拡張すれば表現できるが今回は見送り | q040_airway_branching.webp(拡張) | S |  |
| Q258 | 気管 | 気管壁のC字型軟骨という形態は専用の断面図が有効だが今回は見送り | NEW:trachea_cross_section.webp | A |  |
| Q081 | 気管 | 気管の長さ（数値）でありPhase3の除外基準に該当 | ― | C(除外・数値) |  |
| Q259 | 気管支 | 気管分岐部は既存のQ040用asset拡張で対応可能だが今回は見送り | q040_airway_branching.webp(拡張) | S |  |
| Q268 | 気管支 | 気管支平滑筋の機能はtext_mcqのままで十分 | ― | C(除外) |  |
| Q036 | 肺葉 | 右3葉・左2葉の全体像は既存のQ035用asset(q035_right_middle_lobe.webp)へのmarker追加で実現可能 | q035_right_middle_lobe.webp | S | ○ |
| Q260 | 肺葉 | 肺門の位置も同一画像を共有できるが内側面パネルの追加が必要なため今回は見送り | q035_right_middle_lobe.webp(拡張・パネル追加要) | A |  |
| Q261 | 肺葉 | 気管支動脈による肺自体の栄養は機能説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q272 | 肺葉 | 肺葉と気管支肺区域の関係は詳細度が高くスコープ外の複雑さになるためtext_mcqのままとする | ― | C(除外) |  |
| Q165 | 肺胞 | 肺サーファクタントの機能説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q275 | 肺胞 | コンプライアンスとの関係も機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q156 | 胸膜 | 胸膜腔（陰圧空間）は既存のQ155用asset(pleura_cross_section)へのmarker追加のみで実現可能 | pleura_cross_section | S | ○ |
| Q168 | 胸膜 | 縦隔の位置も同一断面図を共有できるが今回は見送り | pleura_cross_section(拡張) | A |  |
| Q038 | 呼吸筋 | 主な吸気筋（横隔膜）は新規の横隔膜模式図で理解が深まるが今回は見送り | NEW:diaphragm_respiration.webp | A |  |
| Q170 | 呼吸筋 | 横隔膜の収縮によるドーム形状の変化は吸気・呼気2状態の図示が本質的に有効だが今回は見送り | NEW:diaphragm_respiration.webp | S |  |
| Q157 | 呼吸筋 | 安静時呼気の受動性も同一画像を共有できるが今回は見送り | diaphragm_respiration.webp(拡張) | A |  |
| Q158 | 呼吸筋 | 努力呼気筋の一覧は筋名列挙が中心でtext_mcqのままで十分 | ― | C(除外) |  |
| Q262 | 呼吸筋 | 呼吸補助筋の一覧も同様 | ― | C(除外) |  |
| Q269 | 呼吸筋 | 神経支配はPhase Iでscope flag解除済み、生理学的知識でtext_mcqのままで十分 | ― | C(除外) |  |
| Q273 | 呼吸筋 | 安静時・努力時の使い分けは概念説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q159 | 換気 | 1回換気量は肺気量分画図（入れ子構造）により複数指標の関係が明確になる | NEW:lung_volumes_diagram.webp | S |  |
| Q160 | 換気 | 肺活量も同一分画図を共有できる | lung_volumes_diagram.webp | S |  |
| Q161 | 換気 | 残気量も同様 | lung_volumes_diagram.webp | S |  |
| Q171 | 換気 | 呼吸数の代表値（数値）でありPhase3の除外基準に該当（teacher_review維持のまま） | ― | C(除外・数値) |  |
| Q173 | 換気 | 死腔は肺気量分画図の拡張で表現できるが今回は見送り | lung_volumes_diagram.webp(拡張) | A |  |
| Q263 | 換気 | 肺コンプライアンスは機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q264 | 換気 | 気道抵抗も機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q266 | 換気 | 肺胞換気量も分画図の拡張で表現できるが今回は見送り | lung_volumes_diagram.webp(拡張) | A |  |
| Q084 | ガス交換 | 血液空気関門の3層構造は既存のQ037用asset(q037_alveolar_gas_exchange.webp)へのmarker追加で実現可能 | q037_alveolar_gas_exchange.webp | S | ○ |
| Q162 | ガス交換 | ヘモグロビンによる酸素運搬は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q163 | ガス交換 | 重炭酸イオンによるCO2運搬も同様 | ― | C(除外) |  |
| Q172 | ガス交換 | 分圧差による拡散という駆動力は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q174 | ガス交換 | 肺胞と毛細血管の位置関係は既存asset拡張で表現できるが今回は見送り | q037_alveolar_gas_exchange.webp(拡張) | A |  |
| Q265 | ガス交換 | 換気血流比は概念説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q267 | ガス交換 | 動脈血酸素飽和度は定義説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q270 | ガス交換 | 肺循環の低圧・低抵抗特性は数値的性質説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q276 | ガス交換 | 外気から組織までの酸素の流れは概念の連鎖でありtext_mcqのままで十分 | ― | C(除外) |  |

### 泌尿器

| QID | subcategory | 画像化する理由 | asset | 優先度 | 選定 |
|---|---|---|---|---|---|
| Q044 | 腎臓の位置 | 左右腎の高さの違いは新規の両腎位置模式図が有効だが今回は見送り | NEW:kidney_bilateral_position.webp | S |  |
| Q297 | 腎臓の位置 | 第12肋骨との位置関係も同一新規画像を共有できる | NEW:kidney_bilateral_position.webp | A |  |
| Q099 | 腎臓の位置 | 脊椎レベル（数値）でありPhase3の除外基準に該当（teacher_review維持のまま） | ― | C(除外・数値) |  |
| Q196 | 腎臓の外形 | 被膜の層構造は既存asset拡張の余地があるが今回は見送り | q091_kidney_cross_section.webp(拡張) | B |  |
| Q278 | 腎臓の外形 | 腎臓の大きさ（数値）でありPhase3の除外基準に該当（teacher_review維持のまま） | ― | C(除外・数値) |  |
| Q279 | 腎臓の外形 | 腎筋膜は被膜の追加層でtext_mcqのままで十分 | ― | C(除外) |  |
| Q194 | 腎臓の内部構造 | 腎盂の位置は既存のQ091/Q092/Q093/Q180用asset拡張で対応可能だが今回は見送り | q091_kidney_cross_section.webp(拡張) | S |  |
| Q280 | 腎臓の内部構造 | 腎柱の位置も同一画像を共有できるが今回は見送り | q091_kidney_cross_section.webp(拡張) | A |  |
| Q281 | 腎臓の内部構造 | 小腎杯・大腎杯の関係も同様 | q091_kidney_cross_section.webp(拡張) | S |  |
| Q046 | ネフロン | ネフロンの構成（腎小体＋尿細管）は既存のQ048用asset拡張で対応可能だが今回は見送り | q048_nephron.webp(拡張) | A |  |
| Q177 | ネフロン | 近位尿細管は既存のQ048/Q176用asset(q048_nephron.webp)へのmarker追加のみで実現可能 | q048_nephron.webp | S | ○ |
| Q178 | ネフロン | ヘンレ係蹄も同一画像を共有できる | q048_nephron.webp | S | ○ |
| Q179 | ネフロン | 遠位尿細管も同様だが今回は見送り | q048_nephron.webp(拡張) | A |  |
| Q199 | ネフロン | ネフロン内の順路（腎小体→…→集合管）は既存assetに順路overlayを追加するだけで実現でき、経路理解に最適 | q048_nephron.webp | S | ○ |
| Q286 | ネフロン | 対向流増幅の仕組みは機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q298 | ネフロン | 各部位とはたらきのマッチングであり構造identificationではないためtext_mcqのままで十分 | ― | C(除外) |  |
| Q047 | 尿生成 | ろ過→再吸収→分泌という機序の順序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q181 | 尿生成 | 糸球体濾過の機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q182〜187,284,285,287,292,293,294,295,296 | 尿生成 | いずれも機序・ホルモン作用・電解質調節などの生理学的説明が中心でPhase3の除外基準に該当 | ― | C(除外) |  |
| Q200 | 腎血流 | 糸球体の血流（輸入細動脈→糸球体→輸出細動脈）は既存のQ048用asset拡張で対応可能だが今回は見送り | q048_nephron.webp(拡張) | S |  |
| Q282 | 腎血流・再吸収 | 尿細管周囲毛細血管の役割も同一画像を共有できるが今回は見送り | q048_nephron.webp(拡張) | A |  |
| Q042 | 尿路 | 排泄までの順序（腎臓→尿管→膀胱→尿道）は既存のQ050/Q192用asset拡張で対応可能だが今回は見送り | q050_urinary_system.webp(拡張) | S |  |
| Q043 | 尿路 | 下部尿路の構成も同一画像を共有できるが今回は見送り | q050_urinary_system.webp(拡張) | A |  |
| Q100 | 尿路 | 尿の通り道の順路（腎乳頭→小腎杯→大腎杯→腎盂）は既存のQ091系asset拡張で実現でき、経路理解に最適 | q091_kidney_cross_section.webp | S | ○ |
| Q193 | 尿路 | 尿道の男女差は簡単な比較図が有効だが今回は見送り | q050_urinary_system.webp(拡張) | A |  |
| Q195 | 尿路 | 尿管の走行も既存asset拡張で対応可能だが今回は見送り | q050_urinary_system.webp(拡張) | A |  |
| Q291 | 尿路 | 蠕動運動による尿の移送は機序説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q299 | 尿路 | 泌尿器系全体の構成はQ042と内容が近く、今回は重複を避けて見送り | q050_urinary_system.webp(拡張) | B |  |
| Q096 | 膀胱三角 | 2尿管口・1内尿道口がなす三角形は形態識別の典型例で既存asset拡張が有効だが今回は見送り | q050_urinary_system.webp(拡張) | S |  |
| Q095 | 尿管の生理的狭窄 | 3か所の生理的狭窄部の位置は既存のQ050/Q192用asset(q050_urinary_system.webp)へのmarker追加のみで実現可能 | q050_urinary_system.webp | S | ○ |
| Q049 | 尿路上皮 | 伸展に応じた形態変化は機能説明でありtext_mcqのままで十分 | ― | C(除外) |  |
| Q097 | 尿路上皮 | 被覆部位の一覧はマッチング的性質が強くtext_mcqのままで十分 | ― | C(除外) |  |
| Q288 | 尿路上皮 | 移行上皮の性質説明でありtext_mcqのままで十分 | ― | C(除外) |  |

---

## 5. S/A/B評価集計

| 優先度 | 件数 | 内訳 |
|---|---|---|
| S | 39 | うち採用21件 |
| A | 34 | うち採用2件 |
| B | 12 | 今回すべて見送り（次回以降の検討候補） |
| C(除外) | 53 | 定義・数値・生理機序・機能説明中心のため対象外 |

S・Aランクのうち今回のPhase 8最終セットへ採用しなかったものは、次点候補（次回の画像拡張ラウンドでの優先検討対象）として上表に残してある。「60問にするために無理に画像化する」ことを避けるため、新規assetの追加は真に必要な4種類に絞り、既存assetへの拡張候補は多くを次回に持ち越した。

---

## 6. 最終推奨 image_mcq 一覧（Phase 8：42→65問）

### 6-1. 今回追加する23問

| QID | category | subcategory | 新final_type | image_asset | marker_target | asset方式 | 優先度 |
|---|---|---|---|---|---|---|---|
| Q051 | 総論 | 解剖学的正位 | image_mcq | anatomical_position.webp | なし（全身像そのものが解剖学的正位を示す。問いは正位の定義選択） | SVG(新規) | S |
| Q117 | 総論 | 方向用語 | image_mcq | direction_terms.webp | 内側・外側を示す矢印（正中線からの距離） | SVG(新規) | S |
| Q063 | 総論 | 方向用語 | image_mcq | direction_terms.webp | 前方・後方を示す矢印（腹側・背側） | SVG(新規) | S |
| Q010 | 総論 | 発生 | image_mcq | q011_germ_layers.webp | 中胚葉（3層のうち中間層） | existing/planned(共有・markerのみ追加) | A |
| Q230 | 循環器 | 心臓の内部構造 | image_mcq | q017_heart_chambers.webp | 心室中隔 | existing/planned(共有・markerのみ追加) | S |
| Q231 | 循環器 | 心臓の内部構造 | image_mcq | q017_heart_chambers.webp | 心房中隔 | existing/planned(共有・markerのみ追加) | S |
| Q065 | 循環器 | 心臓弁 | image_mcq | heart_valves_schematic.webp | 三尖弁・僧帽弁（房室弁2か所を同時marker） | SVG(新規) | S |
| Q066 | 循環器 | 心臓弁 | image_mcq | heart_valves_schematic.webp | 肺動脈弁・大動脈弁（半月弁2か所を同時marker） | existing/planned(共有・markerのみ追加) | S |
| Q020 | 循環器 | 血管 | image_mcq | q021_vessel_cross_sections.webp | 静脈（3断面中の1つ、既存の動脈・毛細血管markerに追加） | existing/planned(共有・markerのみ追加) | S |
| Q147 | 循環器 | 体循環 | image_mcq | circulation_circuit.webp | 体循環経路（左心室→大動脈→全身毛細血管→上大静脈・下大静脈→右心房の矢印列） | SVG(新規) | S |
| Q148 | 循環器 | 肺循環 | image_mcq | circulation_circuit.webp | 肺循環経路（右心室→肺動脈→肺毛細血管→肺静脈→左心房の矢印列） | existing/planned(共有・markerのみ追加) | S |
| Q023 | 循環器 | 心電図 | image_mcq | q068_ecg_waveform.webp | P波 | existing/planned(共有・markerのみ追加) | S |
| Q024 | 循環器 | 心電図 | image_mcq | q068_ecg_waveform.webp | QRS群 | existing/planned(共有・markerのみ追加) | S |
| Q255 | 呼吸器 | 喉頭 | image_mcq | q032_larynx.webp | 声帯 | existing/planned(共有・markerのみ追加) | S |
| Q256 | 呼吸器 | 喉頭 | image_mcq | q032_larynx.webp | 喉頭蓋 | existing/planned(共有・markerのみ追加) | A |
| Q036 | 呼吸器 | 肺葉 | image_mcq | q035_right_middle_lobe.webp | 肺葉全体像（右3葉・左2葉を色分け表示） | existing/planned(共有・markerのみ追加) | S |
| Q156 | 呼吸器 | 胸膜 | image_mcq | pleura_cross_section | 胸膜腔（臓側胸膜と壁側胸膜の間の空間） | existing/planned(共有・markerのみ追加) | S |
| Q084 | 呼吸器 | ガス交換 | image_mcq | q037_alveolar_gas_exchange.webp | I型肺胞上皮細胞・基底膜・肺毛細血管内皮細胞の3層構造 | existing/planned(共有・markerのみ追加) | S |
| Q177 | 泌尿器 | ネフロン | image_mcq | q048_nephron.webp | 近位尿細管 | existing/planned(共有・markerのみ追加) | S |
| Q178 | 泌尿器 | ネフロン | image_mcq | q048_nephron.webp | ヘンレ係蹄 | existing/planned(共有・markerのみ追加) | S |
| Q199 | 泌尿器 | ネフロン | image_mcq | q048_nephron.webp | 腎小体→近位尿細管→ヘンレ係蹄→遠位尿細管→集合管（順路overlay） | existing/planned(共有・markerのみ追加) | S |
| Q100 | 泌尿器 | 尿路 | image_mcq | q091_kidney_cross_section.webp | 腎乳頭→小腎杯→大腎杯→腎盂（順路overlay） | existing/planned(共有・markerのみ追加) | S |
| Q095 | 泌尿器 | 尿管の生理的狭窄 | image_mcq | q050_urinary_system.webp | 尿管の3か所の生理的狭窄部 | existing/planned(共有・markerのみ追加) | S |

### 6-2. category別 image_mcq数（最終）

| category | 現在 | 最終推奨 | 増分 |
|---|---|---|---|
| 総論 | 6 | 10 | +4 |
| 循環器 | 15 | 24 | +9 |
| 呼吸器 | 12 | 17 | +5 |
| 泌尿器 | 9 | 14 | +5 |
| **合計** | **42** | **65** | **+23** |

循環器・呼吸器のように画像適性の高い領域で増加数が大きくなっているが、これは意図的な設計であり、category間の均等配分は行っていない（ユーザー指示どおり）。

---

## 7. asset共有グループ（Phase 4：1assetから複数問題）

| asset | 共有問題数 | QID |
|---|---|---|
| q017_heart_chambers.webp | 5 | Q017, Q064, Q230, Q231, Q129(判定保留) |
| q048_nephron.webp | 5 | Q048, Q176, Q177, Q178, Q199 |
| q091_kidney_cross_section.webp | 5 | Q091, Q092, Q093, Q180, Q100 |
| q035_right_middle_lobe.webp | 4 | Q035, Q082, Q169, Q036 |
| q040_airway_branching.webp | 4 | Q040, Q077, Q152, Q153 |
| q008_body_planes.webp | 3 | Q008, Q053, Q054 |
| q021_vessel_cross_sections.webp | 3 | Q021, Q067, Q020 |
| q068_ecg_waveform.webp | 3 | Q068, Q023, Q024 |
| q032_larynx.webp | 3 | Q032, Q255, Q256 |
| q050_urinary_system.webp | 3 | Q050, Q192, Q095 |
| q011_germ_layers.webp | 2 | Q011, Q010 |
| q025_conduction_system.webp | 2 | Q025, Q240 |
| q073_coronary_arteries.webp | 2 | Q073, Q074 |
| heart_exterior_posterior.webp | 2 | Q125, Q140 |
| q037_alveolar_gas_exchange.webp | 2 | Q037, Q084 |
| q041_alveolar_sac.webp | 2 | Q041, Q154 |
| pleura_cross_section | 2 | Q155, Q156 |
| direction_terms.webp | 2 | Q117, Q063 |
| heart_valves_schematic.webp | 2 | Q065, Q066 |
| circulation_circuit.webp | 2 | Q147, Q148 |
| q002_hierarchy.webp | 1 | Q002 |
| q004_epithelium.webp | 1 | Q004 |
| q016_apex.webp | 1 | Q016 |
| q019_pulmonary_vein.webp | 1 | Q019 |
| heart_exterior_anterior.webp | 1 | Q138 |
| q045_renal_hilum.webp | 1 | Q045 |
| anatomical_position.webp | 1 | Q051 |

最終的な平均共有問題数は **2.41問/asset**（目標「1assetあたり平均2問以上」を満たす）。もっとも共有度が高いのは q017_heart_chambers.webp・q048_nephron.webp・q091_kidney_cross_section.webp（各5問、Q129判定保留を含む）である。

---

## 8. 新規unique asset候補（4種類）

| asset | 方式 | 共有QID | 内容 |
|---|---|---|---|
| anatomical_position.webp | SVG | Q051 | 直立・正面視・手掌前方という解剖学的正位の基準姿勢を示す全身模式図。overlayは使用せず、姿勢そのものが正誤判定の対象となる。 |
| direction_terms.webp | SVG | Q117, Q063 | 人体を正中線とともに示し、内側/外側・前方/後方を矢印で示せる汎用方向用語模式図。将来的にQ009,Q060,Q061,Q062,Q216等にも拡張可能な設計とする。 |
| heart_valves_schematic.webp | SVG | Q065, Q066 | 心臓弁を模式的に示す図（房室弁2・半月弁2の計4弁の位置を示せる）。将来的にQ069,Q070,Q233にも拡張可能な設計とする。既存の実写q017_heart_chambers.webpとは別の模式図として作成し、弁尖の形状比較（半月弁の名称由来）にも応用できるようにする。 |
| circulation_circuit.webp | SVG | Q147, Q148 | 体循環・肺循環の全経路を1枚に示す模式図。矢印の色分け（動脈血/静脈血）で経路を示す。将来的にQ014,Q015,Q243（リンパ還流）にも拡張可能な設計とする。 |

いずれも「1. 既存asset共有 → 2. plannedのasset共有 → 3. SVG新規作成」の優先順位に従い、既存・計画済みassetの拡張では表現できない内容についてのみ新規SVGを追加した。TYPE-AI・TYPE-OPENの新規追加は今回の追加分では発生しない。

---

## 9. Servier Medical Art等の利用候補とライセンス（Phase 5 TYPE-OPEN）

今回のimage_mcq追加分（23問）はすべてexisting共有またはSVG新規作成で対応可能であり、OPEN素材を新たに必要としない。

既存23 assetのうち、heart_exterior_anterior.webp / heart_exterior_posterior.webp（Q138, Q125, Q140が使用）の2点は、心臓外形という有機的な立体形状を扱うため、OPEN素材の利用を第一候補として検討する。

| asset | 候補ソース | 確認事項 |
|---|---|---|
| heart_exterior_anterior.webp | Servier Medical Art（心臓・循環器イラストセット） | 元URL・asset title・ライセンス種別(CC BY 4.0等)・attribution表記・加工内容を実際の取得時に記録する。今回は取得していない。 |
| heart_exterior_posterior.webp | Servier Medical Art（同上） | 同上。後面視点（冠状静脈洞を含む）の素材が存在するか個別に確認が必要。 |

**重要：ライセンスが不明確な画像、画像検索結果やGoogle画像をそのまま使用することは禁止。上記2点についても、実際の取得段階でライセンスが確認できない場合はTYPE-AIへフォールバックする。**

---

## 10. SVGで作るasset一覧

### 既存23assetのうちSVGで作成するもの（14種類）

- q008_body_planes.webp
- q011_germ_layers.webp
- q019_pulmonary_vein.webp
- q021_vessel_cross_sections.webp
- q025_conduction_system.webp
- q032_larynx.webp
- q035_right_middle_lobe.webp
- q040_airway_branching.webp
- q041_alveolar_sac.webp
- q045_renal_hilum.webp
- q050_urinary_system.webp
- q068_ecg_waveform.webp
- q091_kidney_cross_section.webp
- pleura_cross_section

### 新規追加するSVG asset（4種類）

- anatomical_position.webp
- direction_terms.webp
- heart_valves_schematic.webp
- circulation_circuit.webp

合計 **18種類** をSVGで作成する設計とする（unique asset全27種類中の大部分を占める）。

---

## 11. AI生成が必要なasset一覧

| asset | 理由 |
|---|---|
| q016_apex.webp | 体表指標（第5肋間・鎖骨中線）との位置関係を示すリアルな胸部図が必要。**手動生成による候補が既に存在するが、赤いmarker/haloが焼き込まれているため不採用とし、marker無し版を再生成する（Phase 12参照）。** |
| q073_coronary_arteries.webp | 心臓表面での冠動脈の有機的な走行を示す教材専用の冠動脈図。ユーザーのTYPE-AI例に明示。 |
| heart_exterior_anterior.webp | OPEN素材（Servier等）で適切なライセンスの素材が見つからない場合のフォールバック。 |
| heart_exterior_posterior.webp | 同上。 |

AI生成assetは必ず医学QA（Phase 12基準）を経てから採用する。

---

## 12. Q129特別判定（腱索・乳頭筋）

Q129（腱索・乳頭筋）は、既存の実在画像 `q017_heart_chambers.webp` で対象構造を一意かつ明瞭に識別できるかが未確認のため、今回も既存asset共有を確定しない。判断は以下の3択とし、実際の画像を確認できる制作段階まで保留する。

| 選択肢 | 内容 | 所見 |
|---|---|---|
| A | 既存q017_heart_chambers.webpで十分 | 同アセットは既にQ017(左心室)・Q064(4腔)・Q230(心室中隔・今回追加)・Q231(心房中隔・今回追加)の識別に使われており、心室内部が写る実写である可能性が高い。腱索・乳頭筋が写野に含まれ、かつ十分な解像度で識別できるかは実画像を見るまで断定できない。 |
| B | 新規心臓内部asset（模式図）を作成 | 腱索・乳頭筋は房室弁尖を支える構造として、実写よりも模式図の方が明瞭に示せる可能性がある。今回新設計する heart_valves_schematic.webp（Q065,Q066用）を拡張し、腱索・乳頭筋のmarkerを追加する案も有力候補とする。 |
| C | text_mcqへ差し戻し | 画像化の必要性自体は高い（房室弁の可動を支える構造という機能的位置づけの理解に画像が資する）が、既存写真・新規模式図のいずれも確定できない場合はtext_mcqへ戻す。 |

**推奨：制作段階でq017_heart_chambers.webpの実画像を確認し、腱索・乳頭筋が明瞭に識別できればA、不明瞭であればB（heart_valves_schematic.webpへの統合）を優先し、いずれも困難な場合のみCとする。** 今回はこの資料上でA/B/Cのいずれかに確定しない。

---

## 13. 医学QA注意点（Phase 12基準の適用）

今回新設計する4新規SVG asset・拡張markerについて、以下の医学QA基準を遵守する。

### 心臓関連（q017_heart_chambers.webp拡張、heart_valves_schematic.webp新規）

- Q230(心室中隔)・Q231(心房中隔)のmarkerは、実写画像上で左右が正しく対応する位置に配置する（左右逆転禁止）。
- heart_valves_schematic.webpの4弁配置は、三尖弁=右房室間、僧帽弁=左房室間、肺動脈弁=右室-肺動脈間、大動脈弁=左室-大動脈間という正しい位置関係を維持する。
- Q020(静脈markerをq021_vessel_cross_sections.webpへ追加)は、動脈・静脈・毛細血管の壁の厚さの相対関係（動脈が最も厚く、毛細血管が最も薄い）を誤らないこと。
- circulation_circuit.webpは、体循環（左心室起点）と肺循環（右心室起点）を混同しない色分け・矢印設計とする。

### 呼吸器関連（q032_larynx.webp拡張、q035_right_middle_lobe.webp拡張、q037_alveolar_gas_exchange.webp拡張、pleura_cross_section拡張）

- Q036(肺葉数markerをq035_right_middle_lobe.webpへ追加)は、右肺3葉・左肺2葉という基本構成を誤らないこと。
- Q084(血液空気関門3層markerをq037_alveolar_gas_exchange.webpへ追加)は、I型肺胞上皮細胞・基底膜・肺毛細血管内皮細胞の順序（内側から外側、またはガス拡散の方向）を誤らないこと。
- Q156(胸膜腔markerをpleura_cross_sectionへ追加)は、既存Q155の臓側胸膜/壁側胸膜overlayとの整合性を保ち、胸膜腔がその間の薄い空間であることを正しく示す。

### 泌尿器関連（q048_nephron.webp拡張、q091_kidney_cross_section.webp拡張、q050_urinary_system.webp拡張）

- Q177(近位尿細管)・Q178(ヘンレ係蹄)・Q199(順路overlay)のmarkerは、腎小体→近位尿細管→ヘンレ係蹄→遠位尿細管→集合管という正しい順序を維持する。
- Q100(尿路順路markerをq091_kidney_cross_section.webpへ追加)は、腎乳頭→小腎杯→大腎杯→腎盂という正しい順序を維持する。
- Q095(尿管の生理的狭窄部markerをq050_urinary_system.webpへ追加)は、3か所の狭窄部（腎盂尿管移行部・総腸骨動脈交差部・膀胱壁貫通部）の位置を誤らないこと。

---

## 14. 画像内に答えを書かない（Phase 13原則の適用）

新規4 SVG assetおよび拡張markerを追加する既存asset（q017_heart_chambers.webp, q021_vessel_cross_sections.webp, q032_larynx.webp, q035_right_middle_lobe.webp, q037_alveolar_gas_exchange.webp, pleura_cross_section, q048_nephron.webp, q091_kidney_cross_section.webp, q050_urinary_system.webp）について、asset本体には①②③・問題用marker・答えを示す矢印・構造名ラベルを焼き込まない。markerはすべてアプリ側のoverlayで表示する。

例外：q068_ecg_waveform.webpの目盛り線・時間軸などの図として不可欠な非回答情報は従来どおり許容する（P波・QRS群のmarker追加後も、目盛り以外のラベルは焼き込まない）。

---

## 15. 最終推奨制作順序

```
1. existingを確定
   - 5種類の実在asset（q002, q004, q017, q037, q048）は作り直さない。

2. SVGを一括生成（18種類）
   a. 既存18計画assetのうちSVG方式の15種類
   b. 新規4種類（anatomical_position, direction_terms, heart_valves_schematic, circulation_circuit）

3. OPEN素材を取得・加工（最大2種類）
   - heart_exterior_anterior.webp / heart_exterior_posterior.webp についてServier Medical Art等を確認。
   - ライセンス・attributionを記録できない場合は直ちにAIへフォールバック。

4. AIが必要なものだけ残す（最大4種類）
   - q016_apex.webp（marker無し版の再生成）
   - q073_coronary_arteries.webp
   - heart_exterior_anterior.webp / heart_exterior_posterior.webp（OPENで確保できなかった場合のみ）
   - 生成後は必ずPhase13の医学QA基準で確認する。

5. overlay実測
   - 既存精度の高い実写assetは前例（Q017/Q064のpixel解析）と同じ手法で正規化座標を実測する。
   - SVGはコードで座標を制御するため実測誤差が生じにくいが、書き出し後のWebPで最終確認する。
   - Q129は本資料のPhase 12判定に基づき、実測前にA/B/Cを確定する。

6. image_mcq実装（65問への反映）
   - data/questions_v1.jsonおよびdocs/questions_v2_300_final_candidate.mdへの反映は、本資料が承認された後の別フェーズで行う。

7. 全300問回帰テスト
   - 既存の自動採点テスト（question-text突合方式）を全300問実装後に再実行する。
```

---

