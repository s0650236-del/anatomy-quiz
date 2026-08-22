# -*- coding: utf-8 -*-
"""Regenerate docs/image_asset_preimplementation_log.md from asset_stats.json
(produced by gathering assets/images/*.webp dimensions/sizes). Run from anywhere;
paths are resolved relative to this script's location, not the caller's cwd."""
import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATS_PATH = os.path.join(SCRIPT_DIR, 'asset_stats.json')
OUT_PATH = os.path.join(SCRIPT_DIR, '..', '..', 'docs', 'image_asset_preimplementation_log.md')

with open(STATS_PATH, 'r', encoding='utf-8') as f:
    stats = json.load(f)

# id, source_type, svg_source, shared_qids, marker_targets, medical_qa, status
ROWS = [
    ('q002_hierarchy', 'existing', 'なし(既存実写asset)', 'Q002',
     '細胞→組織→器官→器官系→個体', '既存採用済み。今回変更なし。', 'accepted'),
    ('q004_epithelium', 'existing', 'なし(既存実写asset)', 'Q004',
     '最表層の上皮組織', '既存採用済み。今回変更なし。', 'accepted'),
    ('q017_heart_chambers', 'existing', 'なし(既存実写asset)', 'Q017, Q064, Q230(新規), Q231(新規)',
     '左心室/4腔同時/心室中隔/心房中隔（Q129は最終的にheart_valves_schematic.webpへ採用。本assetは使用しない）', '既存採用済み。Q230/Q231のmarker座標は300問実装フェーズで実測しdata/questions_v1.jsonへ反映済み。', 'accepted'),
    ('q037_alveolar_gas_exchange', 'existing', 'なし(既存実写asset)', 'Q037, Q084(新規)',
     '肺胞から血液へ向かう矢印/血液空気関門3層', '既存採用済み。Q084のmarker座標は300問実装フェーズで実測しdata/questions_v1.jsonへ反映済み。', 'accepted'),
    ('q048_nephron', 'existing', 'なし(既存実写asset)', 'Q048, Q176, Q177(新規), Q178(新規), Q199(新規)',
     '腎小体/ボーマン嚢/近位尿細管/ヘンレ係蹄/順路overlay', '既存採用済み。Q177/Q178/Q199のmarker座標は300問実装フェーズで実測しdata/questions_v1.jsonへ反映済み（Q200は最終的な65問案には不採用のためtext_mcqのまま）。', 'accepted'),

    ('anatomical_position', 'SVG', 'anatomical_position.svg', 'Q051',
     '(overlayなし。正位の定義選択問題)',
     '直立・正面視・両上肢下垂・前腕回外(手掌前方)の基準肢位を確認。左右対称。', 'accepted'),
    ('direction_terms', 'SVG', 'direction_terms.svg', 'Q117, Q063',
     '内側/外側を示す矢印(正面図)、前方/後方を示す矢印(側面図)',
     '正中面からの距離(内外側)と腹背方向(前後方)を図形のみで表現。将来Q009,Q060,Q061,Q062,Q216へ拡張可能な設計。', 'accepted'),
    ('q008_body_planes', 'SVG', 'q008_body_planes.svg', 'Q008, Q053, Q054',
     '冠状面/矢状面/水平面パネル',
     '斜投影(オブリーク)のブロック体で3面を提示。矢状面=縦のスラント面、前額面=正面を向いた平面、水平面=横に寝た面という幾何学的に区別可能な表現に修正済み(初版は前額面と水平面が共に横帯状になり誤読の恐れがあったため再設計)。', 'accepted'),
    ('q011_germ_layers', 'SVG', 'q011_germ_layers.svg', 'Q011, Q010(新規)',
     '最外層(外胚葉)/中胚葉/内胚葉',
     '同心円状の3層(外側から外胚葉・中胚葉・内胚葉)+中心の原始腸管腔。層の包含関係(外胚葉が中胚葉を包み、中胚葉が内胚葉を包む)を正しく表現。', 'accepted'),
    ('q019_pulmonary_vein', 'SVG', 'q019_pulmonary_vein.svg', 'Q019',
     '肺から左心房へ入る肺静脈(4本)',
     '右肺(3葉)・左肺(2葉)から各2本の肺静脈がLAへ入る構成。SVCのみ最小限のcontextとして残し、当初含めていた大動脈弓・肺動脈のcontext stubは位置関係が誤読されるリスクがあったため削除。', 'accepted'),
    ('q021_vessel_cross_sections', 'SVG', 'q021_vessel_cross_sections.svg', 'Q021, Q067, Q020(新規)',
     '毛細血管/動脈(3断面中の1つ)/静脈',
     '動脈=3層構造+厚い平滑筋層+狭い内腔、静脈=薄い壁+広い内腔+静脈弁、毛細血管=単層+最小内腔、という相対的な厚さ関係を正しく表現。', 'accepted'),
    ('q025_conduction_system', 'SVG', 'q025_conduction_system.svg', 'Q025, Q240',
     '右心房上部の洞房結節/房室束',
     '洞房結節→(結節間路)→房室結節→房室束→左右脚→プルキンエ線維の順序を色分けした経路で表現。心臓の4腔輪郭は淡色にして経路を主役にした。', 'accepted'),
    ('q068_ecg_waveform', 'SVG', 'q068_ecg_waveform.svg', 'Q068, Q023(新規), Q024(新規)',
     'T波/P波/QRS群',
     'P波→QRS群(Q・R・S)→ST部分→T波の標準的な波形形状・順序。方眼(グリッド)は図として不可欠な例外要素として許容。2心拍分を収録しP波・QRS群・T波いずれも複数箇所でmarker可能。', 'accepted'),
    ('heart_valves_schematic', 'SVG', 'heart_valves_schematic.svg', 'Q065(新規), Q066(新規), Q129(判定確定)',
     '三尖弁・僧帽弁(房室弁)/肺動脈弁・大動脈弁(半月弁)/腱索・乳頭筋',
     '三尖弁=3尖、僧帽弁=2尖、肺動脈弁・大動脈弁=各3尖の半月弁、という正しい弁尖数。RVに乳頭筋3個・LVに乳頭筋2個(解剖学的に妥当な簡略化)を配置し腱索で弁尖と接続。SVC/IVCは静脈性(青)、肺静脈・大動脈は動脈性(赤)で酸素化の色分けを統一(初版でSVC/IVCが誤って赤になっていたため修正)。', 'accepted'),
    ('circulation_circuit', 'SVG', 'circulation_circuit.svg', 'Q147(新規), Q148(新規)',
     '体循環経路(矢印列)/肺循環経路(矢印列)',
     '肺循環(心臓⇄肺)と体循環(心臓⇄全身組織)の「8の字」模式図。肺動脈(青、脱酸素化)→肺→肺静脈(赤、酸素化)、大動脈(赤)→全身→大静脈(青)という色分けが両回路で一貫。初版は肺動脈の片方の枝が肺静脈の下に隠れて不可視だったため描画順を修正。', 'accepted'),

    ('q032_larynx', 'SVG', 'q032_larynx.svg', 'Q032, Q255(新規), Q256(新規)',
     '喉頭/声帯/喉頭蓋',
     '前面図+冠状断面窓により声帯(2本)を明瞭に提示。甲状軟骨(切痕あり)・輪状軟骨・気管軟骨輪という正しい喉頭〜気管の構成。初版(矢状断・側面視)は声帯が小さく判読困難だったため前面カットアウェイ方式に再設計。', 'accepted'),
    ('q035_right_middle_lobe', 'SVG', 'q035_right_middle_lobe.svg', 'Q035, Q082, Q169, Q036(新規)',
     '右肺中葉/水平裂/肺尖/肺葉数(3葉・2葉)',
     '右肺=上葉・中葉・下葉の3葉(水平裂+斜裂)、左肺=上葉・下葉の2葉(斜裂のみ)という正しい葉区分。気管・気管分岐部・主気管支をcontextとして上部に配置。', 'accepted'),
    ('q040_airway_branching', 'SVG', 'q040_airway_branching.svg', 'Q040, Q077, Q152, Q153, Q259(新規候補として拡張可)',
     '呼吸細気管支/区域気管支/右主気管支/葉気管支',
     '気管→気管分岐部→主気管支(左右)→葉気管支(右3分岐・左2分岐、q035と整合)→区域気管支→終末細気管支/呼吸細気管支という正しい階層と分岐数。', 'accepted'),
    ('q041_alveolar_sac', 'SVG', 'q041_alveolar_sac.svg', 'Q041, Q154',
     '肺胞嚢/肺胞管',
     '呼吸細気管支→肺胞管(細い分岐)→肺胞嚢(ぶどう房状の肺胞クラスタ)という正しい終末呼吸単位の構成。毛細血管網を周囲に配置しガス交換の場であることを示唆。', 'accepted'),
    ('pleura_cross_section', 'SVG', 'pleura_cross_section.svg', 'Q155, Q156(新規)',
     '①臓側胸膜→②壁側胸膜の順にoverlays/胸膜腔',
     '胸壁→壁側胸膜→胸膜腔(薄い間隙)→臓側胸膜→肺実質、という正しい層構造。縦隔(心臓含む)を中央に配置し左右の胸膜腔が独立していることを示唆。', 'accepted'),

    ('q045_renal_hilum', 'SVG', 'q045_renal_hilum.svg', 'Q045',
     '腎門',
     '腎門から腎静脈(青、最前方)・腎動脈(赤)・尿管(黄褐色、最後方)が出入りする構成(前方から静脈・動脈・尿管の順、VAU配列を意識)。', 'accepted'),
    ('q050_urinary_system', 'SVG', 'q050_urinary_system.svg', 'Q050, Q192, Q095(新規)',
     '尿管/膀胱/尿管の3か所の生理的狭窄部',
     '右腎を左腎よりやや低い位置に配置(肝臓による圧排を反映)。腎盂→尿管→膀胱→尿道の連続性を表現。', 'accepted'),
    ('q091_kidney_cross_section', 'SVG', 'q091_kidney_cross_section.svg', 'Q091, Q092, Q093, Q180, Q100(新規)',
     '腎皮質/腎錐体/腎乳頭/集合管/腎乳頭→小腎杯→大腎杯→腎盂の順路overlay',
     '皮質(外層)・髄質/腎錐体(4方向に配置)・腎乳頭・小腎杯・大腎杯・腎盂・尿管という正しい内部構造の順序。初版は6錐体を無理に詰め込み腎盂周辺で図形が重なって不明瞭だったため4錐体の対称配置に再設計。', 'accepted'),

    ('q016_apex', 'SVG(AI候補から転換)', 'q016_apex.svg', 'Q016',
     '心尖(体表指標との位置関係)',
     '胸壁・肋骨(6対)・胸骨・鎖骨の幾何学的模式図に、心尖が左第5肋間・鎖骨中線に位置するようハート形を配置。答えとなる正確な一点はbakeせず、心臓の概形のみ提示(overlayで実測して確定)。旧版は心臓部分が円形で心尖の「尖り」が表現できていなかったため、明確な尖端を持つハート形状に再設計。左右方向も要修正(初版は鎖骨中線を誤って画像左=患者右側に配置していたため、患者の左側=画像右側へ訂正)。', 'accepted'),
    ('q073_coronary_arteries', 'SVG(AI候補から転換)', 'q073_coronary_arteries.svg', 'Q073, Q074',
     '左冠動脈(LAD+回旋枝)/右冠動脈',
     '右冠動脈=画像左(患者右側)の辺縁を走行、左前下行枝(LAD)=前室間溝を心尖へ向け直走、回旋枝=画像右(患者左側)の外側縁を走行、という正しい冠動脈の領域配置。初版は血管の色が心臓本体の赤色と近似しすぎて判読困難だったため、高コントラストな金色に変更。', 'accepted'),
    ('heart_exterior_anterior', 'SVG(AI/OPEN候補から転換)', 'heart_exterior_anterior.svg', 'Q138',
     '上大静脈',
     '前面視:右心耳・左心耳、上大静脈・下大静脈(RAへ)、肺動脈幹(RVから)、上行大動脈(LVから、弓状に描画)を正しい位置関係で配置。右室が前面の大部分を占め、左室は心尖に向かう細い帯として見える、という前面視の正しい比率。初版はIVCが心臓本体の描画順で隠れて不可視だったため描画順を修正。', 'accepted'),
    ('heart_exterior_posterior', 'SVG(AI/OPEN候補から転換)', 'heart_exterior_posterior.svg', 'Q125, Q140',
     '心底/冠状静脈洞',
     '後面視は左右が前面視と鏡像になる(患者右=画像右、患者左=画像左)ことを明記し、前面asset群とは逆の配置で作成。左心房が上部の大部分を占め(4本の肺静脈を左右から受ける)、左心室が下部の大部分を占める後面の正しい比率。冠状静脈洞は後方房室溝を右心房へ向け走行。初版は左側の肺静脈が心臓本体と接触せず浮いて見えたため座標を修正。', 'accepted'),
]

out = []
p = out.append

p('# 画像asset事前準備ログ（実装前・SVG制作フェーズ）')
p('')
p('anatomy-quiz v2-development の300問実装に先立ち、`docs/questions_v2_image_expansion_review.md` の画像戦略に基づいて、'
  'ローカルで安全にSVG化できるassetをすべて制作した記録。')
p('')
p('- 基準ブランチ: v2-development')
p('- 編集原本: `assets/image_sources/svg/*.svg`')
p('- 本番候補: `assets/images/*.webp`（SVG→WebP変換済み、1600px基準・長辺1200px以上を満たす）')
p('- 今回はoverlay座標の実測・`data/questions_v1.json`／`docs/questions_v2_300_final_candidate.md`への反映は行っていない（別フェーズ）。')
p('')
p('---')
p('')
p('## サマリー')
p('')
p(f'| 項目 | 値 |')
p(f'|---|---|')
p(f'| 目標unique asset数 | 27種類前後 |')
p(f'| 現在完成unique asset数 | 27種類 |')
p(f'| 既存(exists_confirmed、無変更) | 5種類 |')
p(f'| 今回新規accepted | 22種類 |')
p(f'| external_asset_required | 0種類 |')
p(f'| additional_asset_required | 0種類 |')
p(f'| hold | 0種類 |')
p(f'| **最終不足asset数** | **0種類** |')
p('')
p('当初、心尖(q016_apex)・冠動脈(q073_coronary_arteries)・心臓外形前面/後面(heart_exterior_anterior/posterior)の'
  '4点はAI生成またはOPEN素材が必要と想定されていたが、教育用模式図として医学的に安全にSVG化できたため、'
  '今回の準備だけで27種類全asset（既存5＋新規22）が `accepted` となり、最終的な不足assetは0件となった。')
p('')
p('---')
p('')
p('## Q129判定')
p('')
p('腱索・乳頭筋（Q129）について、`heart_valves_schematic.webp` 完成後に確認した結果、'
  'RV側3本・LV側2本の乳頭筋と、それぞれの弁尖から伸びる腱索が明瞭に識別できることを確認した。')
p('')
p('**判定: 採用（Option B = heart_valves_schematic.webp を正式なQ129用assetとする）。**'
  ' 既存の実写 `q017_heart_chambers.webp` への依存を解消し、`additional_asset_required` は発生しない。')
p('')
p('---')
p('')
p('## asset別ログ')
p('')
p('| filename | source type | SVG source | WebP | dimensions | size | shared QID | marker targets | status |')
p('|---|---|---|---|---|---|---|---|---|')
for (name, src_type, svg_src, shared, markers, qa, status) in ROWS:
    st = stats.get(name)
    dims = f"{st['w']}x{st['h']}" if st else 'N/A'
    kb = f"{st['kb']}KB" if st else 'N/A'
    webp = f'assets/images/{name}.webp'
    p(f'| {name} | {src_type} | {svg_src} | {webp} | {dims} | {kb} | {shared} | {markers} | {status} |')
p('')
p('---')
p('')
p('## 医学QA所見（個別）')
p('')
for (name, src_type, svg_src, shared, markers, qa, status) in ROWS:
    p(f'### {name}')
    p('')
    p(qa)
    p('')
p('---')
p('')
p('## contact sheet')
p('')
p('`docs/image_previews/preimplementation_image_assets_contact_sheet.png` に、既存5asset・新規22assetすべてのサムネイルとファイル名を一覧化した（開発確認用のためasset名表示可）。')
p('')

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write('\n'.join(out) + '\n')
print('written', OUT_PATH, 'lines:', len(out))
