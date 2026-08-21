# 画像問題用オリジナル画像生成プロンプト v1
## 共通方針
- 教科書図版を複製せず、**新規の教育用模式図**として生成する。
- 画像内に日本語・英語ラベル、番号、設問文を焼き込まない。
- 問題番号や「①」「A」などの指示は、**アプリ側のHTML/SVGオーバーレイ**で後付けする。
- 白背景、スマートフォンで視認できる単純な構図、医療系教科書に近い模式図。
- 写実性より、初学者が構造を識別できることを優先する。
- 画像生成後は、解剖学的位置関係に誤りがないか教員が確認してから採用する。

## IMG-001 / Q002：人体の構成段階

**生成プロンプト**

Create an original anatomy education illustration for first-year nursing students showing five levels of human organization from smallest to largest: a single human cell, a simple tissue composed of many similar cells, a single organ represented by a heart, an organ system represented by the cardiovascular system, and the whole human body. Arrange the five visual stages horizontally from left to right with clear visual separation and a logical increase in scale. Clean white background, flat medical textbook illustration, anatomically plausible, simple and highly legible on a smartphone screen. No text, no labels, no numbers, no arrows, no watermark, no decorative elements. Leave adequate blank space around each stage so the app can overlay markers ①–⑤ later.

**オーバーレイ指示**：アプリ側で左から順に①〜⑤を重ねる。

## IMG-002 / Q004：上皮組織

**生成プロンプト**

Create an original histology-style educational schematic for first-year nursing students. Show a simple epithelial layer as tightly packed cells forming the surface, resting on a thin basement membrane, with loose connective tissue beneath it. The epithelial layer should be visually distinct from the underlying connective tissue. Use a clean white background and simplified medical textbook style, not a photomicrograph. No text, no labels, no arrows, no numbers, no watermark. Leave blank margin adjacent to the epithelial layer for a marker overlay.

**オーバーレイ指示**：最表層の上皮組織を①で示す。

## IMG-003 / Q008：人体の主要な面

**生成プロンプト**

Create an original anatomy education illustration of a human figure in anatomical position, front-facing, demonstrating the three major anatomical planes in a clear medical textbook style: sagittal plane, coronal plane, and transverse plane. Present them as three separate small figures or a clean three-panel layout so each plane is easy to distinguish. Use semi-transparent geometric planes crossing the body. White background, simple neutral human silhouette, accurate orientation. No text, no labels, no letters, no numbers, no watermark. Leave room for the app to overlay the letter A on the coronal-plane panel.

**オーバーレイ指示**：冠状面の図にAを重ねる。

## IMG-004 / Q011：3胚葉

**生成プロンプト**

Create an original embryology education schematic showing a simplified early embryo as three clearly distinguishable concentric or stacked germ layers: outer layer, middle layer, and inner layer. The image is for first-year nursing students and should emphasize the spatial relationship of the three layers rather than microscopic detail. Clean white background, flat medical textbook illustration, no text, no labels, no numbers, no arrows, no watermark. Leave space to overlay marker ① on the outermost layer.

**オーバーレイ指示**：最外層（外胚葉）を①で示す。

## IMG-005 / Q016：心尖

**生成プロンプト**

Create an original anatomy education illustration showing the anterior thorax of an adult human with the heart positioned within the chest behind the sternum and between the lungs. Emphasize the anatomical location of the cardiac apex at the inferior-left tip of the heart, corresponding approximately to the left fifth intercostal space near the left midclavicular line. Use a simplified semi-transparent thoracic wall with ribs subtly visible and a clear heart silhouette. White background, medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave clear space for marker ① at the cardiac apex.

**オーバーレイ指示**：心尖に①を重ねる。

## IMG-006 / Q017：心臓4腔

**生成プロンプト**

Create an original cross-sectional cutaway illustration of the human heart for first-year nursing anatomy education. Clearly show the four chambers: right atrium, right ventricle, left atrium, and left ventricle, with the interventricular septum and visibly thicker wall of the left ventricle. Use a standard anterior-view orientation suitable for teaching. Clean white background, simplified medical textbook style, anatomically plausible, no text, no labels, no numbers, no arrows, no watermark. Leave room for marker ① inside the left ventricular chamber.

**オーバーレイ指示**：左心室に①を重ねる。

## IMG-007 / Q019：肺静脈

**生成プロンプト**

Create an original medical education schematic showing the heart centered between the right and left lungs, with the major pulmonary vessels connecting the lungs to the heart. Clearly depict vessels returning from both lungs into the left atrium as pulmonary veins, distinct from the pulmonary arteries leaving the right ventricle. Keep the circulation anatomically plausible but simplified for first-year nursing students. White background, flat textbook illustration, no text, no labels, no numbers, no arrows, no watermark. Leave space to overlay marker ① on one pulmonary vein entering the left atrium.

**オーバーレイ指示**：肺から左心房へ入る肺静脈に①を重ねる。

## IMG-008 / Q021：血管断面比較

**生成プロンプト**

Create an original anatomy education comparison of three vessel cross-sections: artery, vein, and capillary. Show the artery with a thick muscular elastic wall and relatively smaller lumen, the vein with a thinner wall and wider lumen, and the capillary as a very small thin-walled tube consisting essentially of a single endothelial layer. Arrange the three structures side by side with clear visual separation. White background, clean medical textbook schematic, no text, no labels, no numbers, no arrows, no watermark. Leave space to overlay marker ① next to the capillary.

**オーバーレイ指示**：毛細血管に①を重ねる。

## IMG-009 / Q025：刺激伝導系

**生成プロンプト**

Create an original educational cutaway of the human heart showing the cardiac conduction system. Include a small sinoatrial node at the superior right atrium near the superior vena cava, an atrioventricular node in the inferior right atrial region, the atrioventricular bundle, right and left bundle branches through the interventricular septum, and Purkinje fibers spreading through the ventricular walls. The heart anatomy should remain visible but subdued so the conduction pathways are clear. White background, medical textbook style, no text, no labels, no numbers, no watermark. Leave clear space for marker ① on the sinoatrial node.

**オーバーレイ指示**：洞房結節に①を重ねる。

## IMG-010 / Q032：喉頭

**生成プロンプト**

Create an original anatomy education illustration of the respiratory tract from the head and neck into the upper chest, using a sagittal or slightly oblique cutaway view. Clearly show nasal cavity, pharynx, larynx, trachea, main bronchi, and lungs. The larynx should be anatomically located between the pharynx and trachea and visually distinguishable. White background, clean simplified medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave space to overlay marker ① at the larynx.

**オーバーレイ指示**：喉頭に①を重ねる。

## IMG-011 / Q035：右肺中葉

**生成プロンプト**

Create an original anterior-view anatomy education illustration of the right and left lungs. Clearly depict the right lung with three lobes separated by the horizontal and oblique fissures, and the left lung with two lobes separated by an oblique fissure. Preserve a realistic but simplified lung shape and the cardiac notch on the left. White background, flat medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave enough blank space to overlay marker ① on the right middle lobe.

**オーバーレイ指示**：右肺中葉に①を重ねる。

## IMG-012 / Q037：肺胞ガス交換

**生成プロンプト**

Create an original physiology education schematic of a single alveolus surrounded by a pulmonary capillary network. Show the thin alveolar wall and red blood cells within the capillary. Include two clear unlabeled directional arrows: one arrow from the alveolar air space across the alveolar-capillary membrane into the blood, and one arrow in the opposite direction from blood into the alveolar air space. Do not encode the gases using words or chemical symbols. White background, clean medical textbook style, no text, no labels, no numbers, no watermark. Leave space so the app can overlay marker ① on the arrow from alveolus to blood.

**オーバーレイ指示**：肺胞→血液の矢印に①を重ねる。

## IMG-013 / Q040：気道分岐

**生成プロンプト**

Create an original educational schematic tracing the airway from trachea to distal gas-exchanging structures. Show a progressive branching sequence including main bronchus, lobar bronchus, segmental bronchus, bronchioles, terminal bronchiole, respiratory bronchiole, alveolar duct, and alveolar sacs. The terminal bronchiole should be clearly identifiable as the last purely conducting airway before respiratory bronchioles begin to show alveoli in their walls. White background, simplified medical textbook illustration, no text, no labels, no numbers, no watermark. Leave room for marker ① on the respiratory bronchiole, immediately distal to the terminal bronchiole.

**オーバーレイ指示**：呼吸細気管支に①を重ねる。

## IMG-014 / Q041：肺胞嚢

**生成プロンプト**

Create an original close-up medical education illustration of the distal respiratory unit. Show a respiratory bronchiole leading into an alveolar duct and then into a grape-like terminal cluster of multiple alveoli forming an alveolar sac. The anatomical continuity between these structures should be visually clear. White background, clean simplified medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave clear space for marker ① on the alveolar sac at the terminal end.

**オーバーレイ指示**：肺胞嚢に①を重ねる。

## IMG-015 / Q045：腎門

**生成プロンプト**

Create an original anatomy education illustration of a human kidney viewed from the medial side. Show the bean-shaped kidney with the medial indentation forming the renal hilum. Depict the renal artery, renal vein, and ureter entering or leaving through the hilum, using simplified but anatomically plausible proportions. White background, clean medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave space to overlay marker ① directly on the renal hilum.

**オーバーレイ指示**：腎門に①を重ねる。

## IMG-016 / Q048：ネフロン

**生成プロンプト**

Create an original physiology education schematic of a nephron for first-year nursing students. Clearly show a renal corpuscle containing the glomerular capillary tuft within Bowman's capsule, followed by a simplified renal tubule and a collecting duct. The image should emphasize the renal corpuscle as a distinct rounded structure at the beginning of the nephron. White background, clean medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave room for marker ① over the renal corpuscle.

**オーバーレイ指示**：腎小体に①を重ねる。

## IMG-017 / Q050：泌尿器系全体

**生成プロンプト**

Create an original anterior-view anatomy education illustration of the urinary system showing both kidneys, both ureters, the urinary bladder, and the urethra. Use anatomically plausible positions and proportions, with the ureters clearly visible descending from the kidneys to the bladder. White background, clean medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave clear space to overlay marker ① on one ureter.

**オーバーレイ指示**：片側の尿管に①を重ねる。

---

## 〔第2版追記〕v2 100問拡張で新規に必要となった画像

以下は、v2の100問拡張（Q051〜Q100）で新たに必要になった、既存17資産のいずれとも共有できない**新規unique asset**3件のみを追記する。

Q053・Q054（人体の面）、Q064（心臓4腔）、Q067（血管断面）、Q077（気道分岐）、Q082（肺の裂）は、既存のIMG-003・IMG-006・IMG-008・IMG-013・IMG-011の画像をそのまま共有するため、新規プロンプトは不要（各問題のJSON側`image.prompt_id`も、新規に採番せず既存のcanonical prompt_idを参照する設計に統一済み）。

## IMG-018 / Q073・Q074：冠状動脈走行

**生成プロンプト**

Create an original anatomy education illustration of the human heart viewed from the anterior (front) surface, showing the epicardial course of the two main coronary arteries: the left coronary artery (dividing into its anterior descending and circumflex branches) running over the front-left of the heart, and the right coronary artery running along the right side and inferior border of the heart. Depict the arteries as distinct branching vessels overlaid on a simplified heart silhouette, clearly distinguishable from each other by their separate origins and pathways, but do NOT color-fill or shade different heart regions to indicate perfusion territory — show only the vessels themselves, not a territory map. White background, clean medical textbook style, anatomically plausible branching pattern, no text, no labels, no numbers, no arrows, no watermark. Leave clear space to overlay marker ① on the left coronary artery trunk and marker ② on the right coronary artery trunk.

**オーバーレイ指示**：左冠動脈本幹に①（Q073）、右冠動脈本幹に②（Q074）を重ねる。1枚をQ073・Q074で共有する。灌流領域の断定的な色分けはしない。

## IMG-019 / Q091・Q092・Q093：腎臓前額断面

**生成プロンプト**

Create an original anatomy education illustration of a human kidney in coronal (frontal) cross-section for first-year nursing students. Clearly show the outer renal cortex as a continuous outer band, the renal medulla containing multiple distinct renal pyramids with their apices (renal papillae) pointing inward, minor calyces cupping each papilla, major calyces formed by the union of minor calyces, and a central renal pelvis narrowing into the ureter. Keep the number and arrangement of pyramids anatomically plausible (multiple pyramids, not one uniform medulla). White background, clean medical textbook style, no text, no labels, no numbers, no arrows, no watermark. Leave clear space to overlay marker ① on the renal cortex, marker ② on a renal pyramid, and marker ③ on a renal papilla.

**オーバーレイ指示**：腎皮質に①（Q091）、腎錐体に②（Q092）、腎乳頭に③（Q093）を重ねる。1枚をQ091・Q092・Q093で共有する。

## IMG-020 / Q068：心電図波形（1心拍）

**生成プロンプト**

Create an original medical education line-graph illustration of a single normal cardiac cycle ECG waveform, drawn as a clean black trace on a plain white background (a light, thin reference grid is acceptable but not required). The waveform must show one complete, clearly separated P wave (small rounded deflection), QRS complex (tall, narrow, sharp deflection), and T wave (broader rounded deflection), in correct temporal order and correct relative proportions, with a flat isoelectric baseline between segments. Do not draw axis labels, tick numbers, units, or any text — the waveform shape alone must make the three components visually distinguishable to someone who already knows ECG morphology. No watermark, no color-coding, no arrows. Leave clear space above the T wave for the app to overlay marker ①.

**オーバーレイ指示**：T波に①を重ねる。

