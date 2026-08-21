# v2 300問 最終候補資料（Q001〜Q300）〔教育内容 canonical source〕

anatomy-quiz の総論・循環器・呼吸器・泌尿器 全300問（Q001〜Q300）について、2026年度授業内容との照合レビュー結果を反映した最終候補である。

**本資料は、今後Q001〜Q300を実装する際の教育内容上の唯一の正本（canonical source）とする。** `docs/questions_v2_300_master_review.md` 等の過去のレビュー資料は履歴として残すが、内容判断は本資料を優先する。

- 基準HEAD: `29845246b56eac96ee89bed9c8cca44609b16b28`（branch: v2-development）
- Q001〜Q300は今回もJSON実装しない。実装はすべて本資料の内容に基づいて別途行う。

---

## サマリー

| 項目 | 値 |
|---|---|
| 総問題数 | 300 |
| category配分 | 総論70 / 循環器85 / 呼吸器75 / 泌尿器70 |
| difficulty配分 | 1: 170 / 2: 107 / 3: 23 |
| text/image | text_mcq 258 / image_mcq 42 |
| HIGH重複残数 | 0 |
| teacher_review残数 | 76 |
| unique画像asset暫定数 | 23 |

### 今回の主な変更点

1. 総論の5問（Q106, Q109, Q114, Q118, Q220）を、2026年度授業で明示的に扱う基本的運動方向（屈曲伸展・外転内転・内旋外旋・回内回外・背屈底屈）へ置換。
2. teacher_review flagのうち、授業資料との照合により確定できたもの（Q028, Q108, Q111, Q209, Q269, および腎臓のADH/RAAS/EPO/活性型ビタミンD/傍糸球体装置/酸塩基平衡関連7問のscope理由分）を解除。
3. HIGH重複4組（Q018/Q232, Q022/Q240, Q044/Q200, Q194/Q282）を、Q232・Q240・Q200・Q282の内容置換により解消。
4. Q243を、Q149との近接重複を避けるためリンパ系の内容へ置換。
5. Q251の「レニンなどのホルモン」という不正確な表現を、「レニン-アンジオテンシン系などによる体液性調節」へ修正。
6. difficulty3のうち8問（Q147, Q148, Q191, Q199, Q224, Q227, Q239, Q265）をdifficulty2へ調整。Q200は置換によりdifficulty2。
7. 数値問題のうちQ016・Q081・Q099・Q228は代表値として維持しflag解除、Q171・Q191・Q237・Q278はteacher_review対象として維持。Q114は運動方向問題へ置換したため数値問題リストから除外。
8. Q129の画像適合性に懸念があるため image_status=review_required とし、既存asset確定を保留。
9. heart_exterior assetを、冠状静脈洞・心底が心臓後面の構造であることを踏まえ heart_exterior_anterior / heart_exterior_posterior の2種類に分割。unique asset暫定数は23種類。
10. Q246を、既存2問の正答を組み合わせただけの構成から、半月弁の名称由来を問う独立した学習目標へ再設計。Q245・Q252・Q144は再評価のうえ教育的価値ありと判断し維持。

---

## Q001〜Q300 全300問

### 総論（70問）

## Q001

- category: 総論
- subcategory: 解剖学と生理学
- difficulty: 1
- final_type: text_mcq
- question: 解剖学が主として扱う内容はどれか。
- choices:
  - A: 人体の働きと調節
  - B: 人体の形・位置・構造
  - C: 疾患の治療方法
  - D: 薬物の作用
- answer: 人体の形・位置・構造
- explanation: 解剖学は人体の形、位置、構造、つながりを扱う。生理学は人体の働きや調節を扱う。
- tags: 解剖学, 生理学
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q002

- category: 総論
- subcategory: 人体の構成
- difficulty: 1
- final_type: image_mcq
- question: 図に示した人体の構成段階を、小さい単位から正しく並べたものはどれか。
- choices:
  - A: 組織 → 細胞 → 器官 → 個体 → 器官系
  - B: 細胞 → 組織 → 器官 → 器官系 → 個体
  - C: 細胞 → 器官 → 組織 → 個体 → 器官系
  - D: 組織 → 器官 → 細胞 → 器官系 → 個体
- answer: 細胞 → 組織 → 器官 → 器官系 → 個体
- explanation: 人体は、細胞 → 組織 → 器官 → 器官系 → 個体という階層で構成される。
- tags: 細胞, 組織, 器官, 器官系, 個体
- image_asset: q002_hierarchy.webp
- marker_target: 細胞→組織→器官→器官系→個体の各段階
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q003

- category: 総論
- subcategory: 組織
- difficulty: 1
- final_type: text_mcq
- question: 「組織」の説明として正しいものはどれか。
- choices:
  - A: 生命活動を営む最小単位
  - B: 複数の器官が連携したもの
  - C: 同様の機能・形態をもつ細胞が特定の配列で集まったもの
  - D: すべての器官系が統合されたもの
- answer: 同様の機能・形態をもつ細胞が特定の配列で集まったもの
- explanation: 組織は、同様の機能・形態をもつ細胞が特定の配列で集まったものである。
- tags: 組織
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q004

- category: 総論
- subcategory: 基本組織
- difficulty: 1
- final_type: image_mcq
- question: 図中①で示された、身体表面を覆い、分泌や吸収にも関わる組織はどれか。
- choices:
  - A: 上皮組織
  - B: 結合組織
  - C: 筋組織
  - D: 神経組織
- answer: 上皮組織
- explanation: 上皮組織は身体表面や管腔の内面などを覆い、分泌や吸収にも関わる。
- tags: 上皮組織, 基本組織
- image_asset: q004_epithelium.webp
- marker_target: 最表層の上皮組織
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q005

- category: 総論
- subcategory: 基本組織
- difficulty: 1
- final_type: text_mcq
- question: 組織とその主な働きの組み合わせで正しいものはどれか。
- choices:
  - A: 筋組織―情報を伝える
  - B: 神経組織―収縮して運動を生み出す
  - C: 結合組織―組織をつなぎ支える
  - D: 上皮組織―骨格を形成する
- answer: 結合組織―組織をつなぎ支える
- explanation: 結合組織は組織をつなぎ、支持する。筋組織は収縮、神経組織は情報の受容・伝達を担う。
- tags: 結合組織, 基本組織
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q006

- category: 総論
- subcategory: 器官
- difficulty: 1
- final_type: text_mcq
- question: 器官について正しい説明はどれか。
- choices:
  - A: 1種類の細胞のみから構成される
  - B: 1種類の組織のみから構成される
  - C: 複数の組織が特定の機能を果たすために組み合わさったものである
  - D: 複数の個体が集まったものである
- answer: 複数の組織が特定の機能を果たすために組み合わさったものである
- explanation: 心臓や肺、腎臓などの器官は、複数の組織が組み合わさって機能する。
- tags: 器官, 組織
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q007

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 正中から遠ざかる方向を表す用語はどれか。
- choices:
  - A: 内側
  - B: 外側
  - C: 近位
  - D: 頭側
- answer: 外側
- explanation: 内側は正中に近い方向、外側は正中から遠い方向を示す。
- tags: 方向用語, 内側, 外側
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q008

- category: 総論
- subcategory: 人体の面
- difficulty: 1
- final_type: image_mcq
- question: 図中Aのように、人体を前方と後方に分ける面はどれか。
- choices:
  - A: 矢状面
  - B: 冠状面
  - C: 水平面
  - D: 正中矢状面
- answer: 冠状面
- explanation: 冠状面は人体を前後に分ける面で、前額面ともいう。矢状面は左右、水平面は上下に分ける。
- tags: 冠状面, 矢状面, 水平面
- image_asset: q008_body_planes.webp
- marker_target: 冠状面
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q009

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 手関節は肘関節に対してどの方向にあるか。
- choices:
  - A: 近位
  - B: 遠位
  - C: 内側
  - D: 頭側
- answer: 遠位
- explanation: 近位は体幹に近い側、遠位は体幹から遠い側を示す。
- tags: 近位, 遠位
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q010

- category: 総論
- subcategory: 発生
- difficulty: 1
- final_type: text_mcq
- question: 人体の発生における3つの胚葉はどれか。
- choices:
  - A: 外胚葉・中胚葉・内胚葉
  - B: 前胚葉・中胚葉・後胚葉
  - C: 上胚葉・中胚葉・下胚葉
  - D: 表胚葉・筋胚葉・神経胚葉
- answer: 外胚葉・中胚葉・内胚葉
- explanation: 人体の器官や組織は、外胚葉・中胚葉・内胚葉から分化する。
- tags: 外胚葉, 中胚葉, 内胚葉
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q011

- category: 総論
- subcategory: 発生
- difficulty: 1
- final_type: image_mcq
- question: 図中①の表皮や神経系の主な由来となる胚葉はどれか。
- choices:
  - A: 外胚葉
  - B: 中胚葉
  - C: 内胚葉
  - D: いずれにも由来しない
- answer: 外胚葉
- explanation: 外胚葉からは主に神経系や表皮が分化する。
- tags: 外胚葉, 発生
- image_asset: q011_germ_layers.webp
- marker_target: 最外層（外胚葉）
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q012

- category: 総論
- subcategory: 発生
- difficulty: 2
- final_type: text_mcq
- question: 呼吸器上皮の主な発生学的由来はどれか。
- choices:
  - A: 外胚葉
  - B: 中胚葉
  - C: 内胚葉
  - D: 神経堤
- answer: 内胚葉
- explanation: 内胚葉からは消化管上皮や呼吸器上皮などが分化する。
- tags: 内胚葉, 呼吸器上皮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q051

- category: 総論
- subcategory: 解剖学的正位
- difficulty: 1
- final_type: text_mcq
- question: 解剖学的正位について正しいものはどれか。
- choices:
  - A: 直立し、顔を正面に向け、手掌を前方に向ける。
  - B: うつ伏せに寝て、顔を横に向ける。
  - C: 座位で両手を組む。
  - D: 直立し、手背を前方に向ける。
- answer: 直立し、顔を正面に向け、手掌を前方に向ける。
- explanation: 解剖学的正位は、直立し顔を正面に向け、上肢を体側に垂らして手掌を前方に向けた姿勢で、位置関係を記載する基準姿勢である。
- tags: 解剖学的正位
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q052

- category: 総論
- subcategory: 正中面
- difficulty: 1
- final_type: text_mcq
- question: 正中面について正しいものはどれか。
- choices:
  - A: 身体を左右に等分する矢状面である。
  - B: 身体を前後に分ける面である。
  - C: 身体を上下に分ける面である。
  - D: 必ず臍を通る水平面である。
- answer: 身体を左右に等分する矢状面である。
- explanation: 正中面は身体を左右に等分する矢状面であり、多数ある矢状面のうち正中を通る1枚だけを指す。
- tags: 正中面, 矢状面
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q053

- category: 総論
- subcategory: 人体の面
- difficulty: 1
- final_type: image_mcq
- question: 図中①のように、身体を左右に分ける面はどれか。
- choices:
  - A: 矢状面
  - B: 冠状面
  - C: 水平面
  - D: 正中面
- answer: 矢状面
- explanation: 矢状面は身体を左右に分ける面である。正中を通るものを特に正中面という。
- tags: 矢状面, 身体面
- image_asset: q008_body_planes.webp
- marker_target: 矢状面パネル
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q054

- category: 総論
- subcategory: 人体の面
- difficulty: 1
- final_type: image_mcq
- question: 図中①のように、身体を上下に分ける面はどれか。
- choices:
  - A: 水平面
  - B: 矢状面
  - C: 冠状面
  - D: 正中面
- answer: 水平面
- explanation: 水平面は身体を上下に分ける面である。
- tags: 水平面, 身体面
- image_asset: q008_body_planes.webp
- marker_target: 水平面パネル
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q055

- category: 総論
- subcategory: 体腔
- difficulty: 1
- final_type: text_mcq
- question: 体腔について正しいものはどれか。
- choices:
  - A: 胸腔と腹腔は横隔膜で隔てられる。
  - B: 頭蓋腔と胸腔は横隔膜で隔てられる。
  - C: 腹腔と骨盤腔は明確な壁で隔てられる。
  - D: 体腔は胸腔と腹腔の2つのみである。
- answer: 胸腔と腹腔は横隔膜で隔てられる。
- explanation: 体腔は頭蓋腔・脊柱管・胸腔・腹腔・骨盤腔に分けられ、胸腔と腹腔は横隔膜で隔てられる。
- tags: 体腔, 横隔膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q056

- category: 総論
- subcategory: 胸腔
- difficulty: 1
- final_type: text_mcq
- question: 胸腔に収められるものとして最も適切なものはどれか。
- choices:
  - A: 脳
  - B: 脊髄
  - C: 呼吸器系や循環器系の器官
  - D: 膀胱
- answer: 呼吸器系や循環器系の器官
- explanation: 胸腔には肺や心臓などが含まれる。
- tags: 胸腔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q057

- category: 総論
- subcategory: 腹腔
- difficulty: 1
- final_type: text_mcq
- question: 腹腔について正しいものはどれか。
- choices:
  - A: 主として消化器系の大部分を収める。
  - B: 主として脳を収める。
  - C: 主として尿路上皮のみを収める。
  - D: 主として声帯を収める。
- answer: 主として消化器系の大部分を収める。
- explanation: 腹腔には消化器系の多くが含まれる。
- tags: 腹腔, 消化器系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q058

- category: 総論
- subcategory: 骨盤腔
- difficulty: 1
- final_type: text_mcq
- question: 骨盤腔について正しいものはどれか。
- choices:
  - A: 主として呼吸器系を収める。
  - B: 主として泌尿器系や生殖器系の一部を収める。
  - C: 頭蓋腔と同義である。
  - D: 横隔膜の上方にある。
- answer: 主として泌尿器系や生殖器系の一部を収める。
- explanation: 骨盤腔には膀胱や内性器などが位置する。
- tags: 骨盤腔, 泌尿器系, 生殖器系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q059

- category: 総論
- subcategory: 身体の大区分
- difficulty: 1
- final_type: text_mcq
- question: 身体の大区分として正しいものはどれか。
- choices:
  - A: 頭頸部、体幹、上肢、下肢
  - B: 頭頸部、胸腹部、手、足
  - C: 頭部、胸部、腹部、骨盤
  - D: 頸部、体幹、手、足
- answer: 頭頸部、体幹、上肢、下肢
- explanation: 体表の大区分は頭頸部、体幹、上肢、下肢で整理する。
- tags: 体幹, 上肢, 下肢
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q060

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 橈側と尺側の説明として正しいものはどれか。
- choices:
  - A: 橈側は小指側、尺側は親指側である。
  - B: 橈側は親指側、尺側は小指側である。
  - C: 橈側は前方、尺側は後方である。
  - D: 橈側と尺側は下肢で用いる。
- answer: 橈側は親指側、尺側は小指側である。
- explanation: 上肢では親指側が橈側、小指側が尺側である。
- tags: 橈側, 尺側
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q061

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 脛側と腓側の説明として正しいものはどれか。
- choices:
  - A: 脛側は腓骨の側、腓側は脛骨の側である。
  - B: 脛側は母趾側、腓側は小趾側である。
  - C: 脛側は下肢で脛骨の側、腓側は腓骨の側である。
  - D: 脛側と腓側は上肢で用いる。
- answer: 脛側は下肢で脛骨の側、腓側は腓骨の側である。
- explanation: 下肢では脛骨の側が脛側、腓骨の側が腓側である。
- tags: 脛側, 腓側
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q062

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 浅と深の説明として正しいものはどれか。
- choices:
  - A: 体表に近い側を深、遠い側を浅という。
  - B: 体表に近い側を浅、遠い側を深という。
  - C: 頭側に近い側を浅という。
  - D: 尾側に近い側を深という。
- answer: 体表に近い側を浅、遠い側を深という。
- explanation: 浅深は体表からの距離で表す。
- tags: 浅, 深
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q063

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 前方と後方の説明として正しいものはどれか。
- choices:
  - A: 腹側は後方、背側は前方を意味する。
  - B: 腹側は前方、背側は後方を意味する。
  - C: 腹側は内側、背側は外側を意味する。
  - D: 腹側と背側は四肢には用いない。
- answer: 腹側は前方、背側は後方を意味する。
- explanation: 腹側は前方、背側は後方とほぼ対応する。
- tags: 前方, 後方, 腹側, 背側
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q101

- category: 総論
- subcategory: 細胞の構造
- difficulty: 1
- final_type: text_mcq
- question: 細胞の基本構造について正しいものはどれか。
- choices:
  - A: 細胞膜・細胞質・核から構成される。
  - B: 核をもたない細胞は人体に存在しない。
  - C: 細胞質は核の内部にある液体成分である。
  - D: 細胞膜はタンパク質のみで構成される。
- answer: 細胞膜・細胞質・核から構成される。
- explanation: 細胞は細胞膜で囲まれ、内部に細胞質と核をもつのが基本構造である。なお成熟した赤血球のように核を失う細胞も存在する。
- tags: 細胞, 細胞膜, 核
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q102

- category: 総論
- subcategory: 細胞の構造
- difficulty: 1
- final_type: text_mcq
- question: 細胞膜の機能について正しいものはどれか。
- choices:
  - A: 物質の出入りを選択的に調節する(選択的透過性)。
  - B: すべての物質を自由に通過させる。
  - C: 細胞膜は物質の出入りに関与しない。
  - D: 細胞膜はDNAを含む構造である。
- answer: 物質の出入りを選択的に調節する(選択的透過性)。
- explanation: 細胞膜はリン脂質二重層を基本構造とし、物質の種類によって通過のしやすさが異なる選択的透過性をもつ。これにより細胞内外の環境の違いが維持される。
- tags: 細胞膜, 選択的透過性
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q103

- category: 総論
- subcategory: 細胞の構造
- difficulty: 1
- final_type: text_mcq
- question: 細胞の核について正しいものはどれか。
- choices:
  - A: 遺伝情報を担うDNAを含む。
  - B: ATPを産生する主要な場である。
  - C: タンパク質を分解する酵素を蓄える。
  - D: 細胞膜の外側に存在する。
- answer: 遺伝情報を担うDNAを含む。
- explanation: 核は遺伝情報を担うDNAを含み、細胞の働きを統制する中心的な構造である。
- tags: 核, DNA
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q104

- category: 総論
- subcategory: 細胞小器官
- difficulty: 1
- final_type: text_mcq
- question: 細胞内でエネルギー(ATP)を産生する細胞小器官はどれか。
- choices:
  - A: ミトコンドリア
  - B: リボソーム
  - C: ゴルジ装置
  - D: リソソーム
- answer: ミトコンドリア
- explanation: ミトコンドリアは酸素を用いた代謝によりATPを産生する細胞小器官であり、「細胞の発電所」と呼ばれる。
- tags: ミトコンドリア, ATP, 細胞小器官
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q105

- category: 総論
- subcategory: 細胞小器官
- difficulty: 2
- final_type: text_mcq
- question: タンパク質の合成・分泌に関わる細胞小器官の組み合わせとして正しいものはどれか。
- choices:
  - A: リボソーム・小胞体・ゴルジ装置
  - B: ミトコンドリア・リソソームのみ
  - C: 核小体のみ
  - D: 細胞膜のみ
- answer: リボソーム・小胞体・ゴルジ装置
- explanation: リボソームでタンパク質が合成され、小胞体を経てゴルジ装置で加工・濃縮されたのち、細胞外へ分泌されるという経路をたどる。
- tags: リボソーム, 小胞体, ゴルジ装置
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q106

- category: 総論
- subcategory: 基本的運動方向
- difficulty: 1
- final_type: text_mcq
- question: 屈曲と伸展の説明として正しいものはどれか。
- choices:
  - A: 隣接する2つの部位が近づく運動を屈曲、遠ざかる運動を伸展という。
  - B: 隣接する2つの部位が遠ざかる運動を屈曲、近づく運動を伸展という。
  - C: 正中から遠ざかる運動を屈曲という。
  - D: 長軸を中心に回る運動を伸展という。
- answer: 隣接する2つの部位が近づく運動を屈曲、遠ざかる運動を伸展という。
- explanation: 屈曲は一般に隣接する2つの部位が近づく運動、伸展は遠ざかる運動で、基本的には矢状面でみる。
- tags: 屈曲, 伸展, 基本的運動方向
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「体細胞分裂について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。

## Q107

- category: 総論
- subcategory: 筋組織
- difficulty: 1
- final_type: text_mcq
- question: 筋組織の分類について正しいものはどれか。
- choices:
  - A: 骨格筋・心筋・平滑筋の3種に分けられる。
  - B: 心筋は平滑筋に分類される。
  - C: 骨格筋のみが人体に存在する筋組織である。
  - D: 平滑筋には骨格筋と同様の横紋がみられる。
- answer: 骨格筋・心筋・平滑筋の3種に分けられる。
- explanation: 筋組織は骨格筋・心筋・平滑筋の3種に分類される。心筋は独立した種類であり平滑筋には分類されない。骨格筋と心筋は横紋をもつが、平滑筋は横紋をもたない。
- tags: 骨格筋, 心筋, 平滑筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: yes
- final_review_note: なし

## Q108

- category: 総論
- subcategory: 神経組織
- difficulty: 1
- final_type: text_mcq
- question: 神経組織の主な役割について正しいものはどれか。
- choices:
  - A: 情報の受容・伝達と調節を行う。
  - B: 身体の表面を覆う。
  - C: 骨格をつくる。
  - D: 尿をつくる。
- answer: 情報の受容・伝達と調節を行う。
- explanation: 神経組織は情報の受容・伝達・統合と、それに基づく身体機能の調節を主な役割とする。
- tags: 神経組織
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: 神経組織は基本4組織の1つとして総論範囲内。scope flag解除。

## Q109

- category: 総論
- subcategory: 基本的運動方向
- difficulty: 1
- final_type: text_mcq
- question: 外転と内転の説明として正しいものはどれか。
- choices:
  - A: 正中から遠ざかる運動を外転、正中へ近づく運動を内転という。
  - B: 正中へ近づく運動を外転、遠ざかる運動を内転という。
  - C: 前方への運動を外転、後方への運動を内転という。
  - D: 外転・内転は前腕にのみ用いる。
- answer: 正中から遠ざかる運動を外転、正中へ近づく運動を内転という。
- explanation: 外転は身体の正中から遠ざかる運動、内転は正中へ近づく運動である。
- tags: 外転, 内転, 基本的運動方向
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「神経組織において、ニューロンを支持し栄養供給や保護を行う細胞はどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。

## Q110

- category: 総論
- subcategory: 上皮組織
- difficulty: 2
- final_type: text_mcq
- question: 上皮組織の分類について正しいものはどれか。
- choices:
  - A: 細胞の層数により単層上皮と重層上皮に分けられる。
  - B: 上皮組織はすべて単層で構成される。
  - C: 上皮組織には血管が豊富に分布する。
  - D: 上皮組織は身体の内部にのみ存在する。
- answer: 細胞の層数により単層上皮と重層上皮に分けられる。
- explanation: 上皮組織は細胞の層数(単層・重層)や細胞の形(扁平・立方・円柱)によって分類される。上皮組織自体には血管がなく、栄養は基底膜を介して供給される。
- tags: 上皮組織, 単層上皮, 重層上皮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q111

- category: 総論
- subcategory: 結合組織
- difficulty: 2
- final_type: text_mcq
- question: 結合組織に分類されるものの組み合わせとして適切なものはどれか。
- choices:
  - A: 軟骨・骨・血液
  - B: 上皮組織・筋組織
  - C: 神経組織のみ
  - D: 表皮のみ
- answer: 軟骨・骨・血液
- explanation: 結合組織は細胞と細胞外基質からなる組織で、線維性結合組織のほか、軟骨・骨、および液状結合組織としての血液も広義の結合組織に含めて説明されることが多い。
- tags: 結合組織, 血液
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 本授業では血液・リンパを結合組織に含めて明示的に説明。現行正答「軟骨・骨・血液」を維持し、textbook_variation flag解除。

## Q112

- category: 総論
- subcategory: 生体の恒常性
- difficulty: 1
- final_type: text_mcq
- question: 生体が体温・血糖値・体液量などの体内環境を一定の範囲に保とうとするはたらきを何というか。
- choices:
  - A: 恒常性(ホメオスタシス)
  - B: 代謝
  - C: 適応
  - D: 免疫
- answer: 恒常性(ホメオスタシス)
- explanation: 恒常性(ホメオスタシス)とは、体温・血糖値・体液量などの体内環境を一定範囲に保とうとする生体のはたらきである。
- tags: 恒常性, ホメオスタシス
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q113

- category: 総論
- subcategory: 体液
- difficulty: 1
- final_type: text_mcq
- question: 体液の区分について正しいものはどれか。
- choices:
  - A: 細胞内液と細胞外液に大別される。
  - B: 体液はすべて血液として存在する。
  - C: 体液は細胞内液のみで構成される。
  - D: 体液に電解質は含まれない。
- answer: 細胞内液と細胞外液に大別される。
- explanation: 体液は細胞の内部に存在する細胞内液と、細胞の外部(血漿・組織間液など)に存在する細胞外液に大別される。
- tags: 体液, 細胞内液, 細胞外液
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q114

- category: 総論
- subcategory: 基本的運動方向
- difficulty: 1
- final_type: text_mcq
- question: 内旋と外旋の説明として正しいものはどれか。
- choices:
  - A: 長軸を中心に内側へ回る運動を内旋、外側へ回る運動を外旋という。
  - B: 正中へ近づく運動を内旋という。
  - C: 関節を曲げる運動を外旋という。
  - D: 内旋・外旋は上下方向の位置関係を表す。
- answer: 長軸を中心に内側へ回る運動を内旋、外側へ回る運動を外旋という。
- explanation: 内旋・外旋は、上腕や大腿などの長軸を中心とした回旋運動を表す。
- tags: 内旋, 外旋, 基本的運動方向
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「成人の体重に占める体液(水分)の割合について、最も近いものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。

## Q115

- category: 総論
- subcategory: 体液
- difficulty: 2
- final_type: text_mcq
- question: 体液に含まれる電解質について正しいものはどれか。
- choices:
  - A: ナトリウムイオン(Na+)は主に細胞外液に多く分布する。
  - B: カリウムイオン(K+)は主に細胞外液に多く分布する。
  - C: 電解質は体液中にほとんど存在しない。
  - D: 電解質は水分の分布に影響しない。
- answer: ナトリウムイオン(Na+)は主に細胞外液に多く分布する。
- explanation: ナトリウムイオン(Na+)は主に細胞外液に、カリウムイオン(K+)は主に細胞内液に多く分布する。電解質の分布は体液の水分バランスに大きく影響する。
- tags: 電解質, ナトリウム, カリウム
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q116

- category: 総論
- subcategory: 体液
- difficulty: 2
- final_type: text_mcq
- question: 体液の酸塩基平衡について正しいものはどれか。
- choices:
  - A: 体液のpHは狭い範囲(弱アルカリ性付近)に保たれるよう調節されている。
  - B: 体液のpHは大きく変動しても生体機能に影響しない。
  - C: 体液は強い酸性に保たれている。
  - D: 酸塩基平衡の調節に呼吸器・腎臓は関与しない。
- answer: 体液のpHは狭い範囲(弱アルカリ性付近)に保たれるよう調節されている。
- explanation: 体液のpHは正常では弱アルカリ性付近の狭い範囲に保たれるよう、呼吸器系や腎臓などによって調節されている。
- tags: 酸塩基平衡, pH
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q117

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 内側と外側の説明として正しいものはどれか。
- choices:
  - A: 正中面に近い側を内側、遠い側を外側という。
  - B: 前面に近い側を内側、後面に近い側を外側という。
  - C: 体表に近い側を内側、遠い側を外側という。
  - D: 母指側が常に内側である。
- answer: 正中面に近い側を内側、遠い側を外側という。
- explanation: 内側・外側は正中面からの距離を基準とする方向用語であり、正中面に近い側が内側、遠い側が外側である。
- tags: 内側, 外側, 方向用語
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q118

- category: 総論
- subcategory: 基本的運動方向
- difficulty: 1
- final_type: text_mcq
- question: 前腕の回内・回外について正しいものはどれか。
- choices:
  - A: 回内では手掌が後方または下方を向き、回外では前方または上方を向く。
  - B: 回内は肘を曲げる運動である。
  - C: 回外は肘を伸ばす運動である。
  - D: 回内・回外では橈骨と尺骨の位置関係は変化しない。
- answer: 回内では手掌が後方または下方を向き、回外では前方または上方を向く。
- explanation: 前腕の回内・回外は前腕を回す運動であり、回内では手掌が後方または下方、回外では前方または上方を向く。
- tags: 回内, 回外, 前腕, 基本的運動方向
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: 旧設問「器官系について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。

## Q119

- category: 総論
- subcategory: 身体の大区分
- difficulty: 1
- final_type: text_mcq
- question: 体幹に含まれる部位として最も適切なものはどれか。
- choices:
  - A: 腰部
  - B: 上腕
  - C: 前腕
  - D: 下腿
- answer: 腰部
- explanation: 体幹は頭部・頸部を除く胴体部分を指し、胸部・腹部・腰部・背部・殿部などが含まれる。上腕・前腕は上肢、下腿は下肢に含まれる。
- tags: 体幹, 身体の区分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q120

- category: 総論
- subcategory: 身体の大区分
- difficulty: 1
- final_type: text_mcq
- question: 上肢の区分として正しい組み合わせはどれか。
- choices:
  - A: 肩甲帯・上腕・前腕・手
  - B: 股関節部・大腿・下腿・足
  - C: 頭部・頸部・体幹
  - D: 胸部・腹部・骨盤部
- answer: 肩甲帯・上腕・前腕・手
- explanation: 上肢は肩甲帯(肩)・上腕・前腕・手の各部に区分される。
- tags: 上肢, 身体の区分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q121

- category: 総論
- subcategory: 身体の大区分
- difficulty: 1
- final_type: text_mcq
- question: 下肢の区分として正しい組み合わせはどれか。
- choices:
  - A: 股関節部・大腿・下腿・足
  - B: 肩甲帯・上腕・前腕・手
  - C: 頭部・頸部・体幹
  - D: 胸部・腹部・骨盤部
- answer: 股関節部・大腿・下腿・足
- explanation: 下肢は股関節部・大腿・下腿・足の各部に区分される。
- tags: 下肢, 身体の区分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q122

- category: 総論
- subcategory: 身体の大区分
- difficulty: 2
- final_type: text_mcq
- question: 腹部の体表区分について正しいものはどれか。
- choices:
  - A: 臍を中心とする水平線・垂直線により4分画(右上腹部・左上腹部・右下腹部・左下腹部)に分けることができる。
  - B: 腹部は左右2分画にのみ分けられる。
  - C: 腹部の体表区分は胸部と同じ名称が用いられる。
  - D: 腹部は体表から区分することができない。
- answer: 臍を中心とする水平線・垂直線により4分画(右上腹部・左上腹部・右下腹部・左下腹部)に分けることができる。
- explanation: 腹部は臍を中心とした水平線・垂直線により4分画に分けることができ、臓器の位置関係を表現する際などに用いられる基本的な体表区分である。
- tags: 腹部, 体表区分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q201

- category: 総論
- subcategory: 細胞の構造
- difficulty: 1
- final_type: text_mcq
- question: 細胞膜の構成について正しいものはどれか。
- choices:
  - A: リン脂質二重層に、機能をもつタンパク質が組み込まれた構造をもつ。
  - B: 細胞膜はタンパク質を全く含まない。
  - C: 細胞膜は炭水化物のみで構成される。
  - D: 細胞膜は核酸でできている。
- answer: リン脂質二重層に、機能をもつタンパク質が組み込まれた構造をもつ。
- explanation: 細胞膜はリン脂質二重層を基本骨格とし、そこに物質輸送や情報受容などの機能をもつ膜タンパク質が組み込まれた構造をしている。
- tags: 細胞膜, リン脂質, 膜タンパク質
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q202

- category: 総論
- subcategory: 細胞の輸送
- difficulty: 1
- final_type: text_mcq
- question: 拡散(受動輸送)について正しいものはどれか。
- choices:
  - A: 物質が濃度の高い側から低い側へ、エネルギーを使わずに移動する現象である。
  - B: 拡散にはエネルギー(ATP)を必要とする。
  - C: 拡散は濃度の低い側から高い側へ物質を移動させる。
  - D: 拡散は細胞膜では起こらない現象である。
- answer: 物質が濃度の高い側から低い側へ、エネルギーを使わずに移動する現象である。
- explanation: 拡散は、物質が濃度の高い側から低い側へ、エネルギーを使わずに自然に移動する現象(受動輸送)である。毛細血管での物質交換や肺胞でのガス交換は拡散によって成り立っている。
- tags: 拡散, 受動輸送
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q203

- category: 総論
- subcategory: 細胞の輸送
- difficulty: 1
- final_type: text_mcq
- question: 能動輸送について正しいものはどれか。
- choices:
  - A: 濃度勾配に逆らって物質を輸送するため、エネルギー(ATP)を必要とする。
  - B: 能動輸送は濃度の高い側から低い側への移動のみを指す。
  - C: 能動輸送にエネルギーは不要である。
  - D: 能動輸送は細胞外でのみ起こる。
- answer: 濃度勾配に逆らって物質を輸送するため、エネルギー(ATP)を必要とする。
- explanation: 能動輸送は、物質を濃度の低い側から高い側へ、濃度勾配に逆らって運ぶためエネルギー(ATP)を必要とする輸送様式である。尿細管での再吸収・分泌の一部にはこの能動輸送が関わる。
- tags: 能動輸送, ATP
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q204

- category: 総論
- subcategory: 細胞の輸送
- difficulty: 1
- final_type: text_mcq
- question: 浸透について正しいものはどれか。
- choices:
  - A: 水が、溶質濃度の低い側から高い側へ半透膜を通って移動する現象である。
  - B: 浸透は溶質が移動する現象である。
  - C: 浸透は水が高濃度側から低濃度側へ移動する現象である。
  - D: 浸透にはエネルギーを必要とする。
- answer: 水が、溶質濃度の低い側から高い側へ半透膜を通って移動する現象である。
- explanation: 浸透は、水が半透膜を介して溶質濃度の低い側から高い側へ移動する現象であり、体液の水分バランスや尿の濃縮(泌尿器領域)を理解するうえで重要な概念である。
- tags: 浸透, 浸透圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q205

- category: 総論
- subcategory: 上皮組織
- difficulty: 1
- final_type: text_mcq
- question: 上皮組織の機能として正しいものはどれか。
- choices:
  - A: 体表や管腔の保護、物質の吸収・分泌など多様な機能を担う。
  - B: 上皮組織の機能は保護のみである。
  - C: 上皮組織は収縮する機能をもつ。
  - D: 上皮組織は情報を伝達する機能をもつ。
- answer: 体表や管腔の保護、物質の吸収・分泌など多様な機能を担う。
- explanation: 上皮組織は体表や消化管・気道・尿路などの内腔を覆い、保護に加えて物質の吸収・分泌など多様な機能を担う。既存の呼吸器上皮・尿路上皮の防御機能はこの一例である。
- tags: 上皮組織, 保護, 吸収, 分泌
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q206

- category: 総論
- subcategory: 結合組織
- difficulty: 1
- final_type: text_mcq
- question: 結合組織の機能として正しいものはどれか。
- choices:
  - A: 組織や器官を連結・支持し、細胞外基質を豊富にもつ。
  - B: 結合組織は情報の伝達を専門とする。
  - C: 結合組織は収縮運動を専門とする。
  - D: 結合組織には細胞外基質が存在しない。
- answer: 組織や器官を連結・支持し、細胞外基質を豊富にもつ。
- explanation: 結合組織は細胞に加えて豊富な細胞外基質(線維成分と基質)をもち、組織や器官を連結・支持する機能を担う。
- tags: 結合組織, 細胞外基質
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q207

- category: 総論
- subcategory: 筋組織
- difficulty: 2
- final_type: text_mcq
- question: 筋組織に共通する性質として正しいものはどれか。
- choices:
  - A: 興奮性と収縮性をもち、刺激に応じて収縮する。
  - B: 筋組織はいずれも意識的にのみ収縮できる。
  - C: 筋組織は情報を伝達する機能を専門とする。
  - D: 筋組織に共通する性質は存在しない。
- answer: 興奮性と収縮性をもち、刺激に応じて収縮する。
- explanation: 骨格筋・心筋・平滑筋はいずれも興奮性(刺激に反応する性質)と収縮性をもつという共通点があり、これは循環器の心筋・血管平滑筋にも共通する基本的性質である。
- tags: 筋組織, 興奮性, 収縮性
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q208

- category: 総論
- subcategory: 筋組織
- difficulty: 3
- final_type: text_mcq
- question: 興奮性(刺激に反応して活動電位を発生する性質)をもつ組織として正しいものはどれか。
- choices:
  - A: 神経組織と筋組織
  - B: 上皮組織のみ
  - C: 結合組織のみ
  - D: どの組織も興奮性をもたない
- answer: 神経組織と筋組織
- explanation: 神経組織と筋組織は、刺激に反応して活動電位(電気的な興奮)を発生させる興奮性という共通の性質をもち、これが情報伝達や収縮の基盤となる。心臓の刺激伝導系(既存の循環器領域)もこの性質を利用している。
- tags: 興奮性, 活動電位
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q209

- category: 総論
- subcategory: 発生
- difficulty: 1
- final_type: text_mcq
- question: 呼吸器・泌尿器の発生学的由来について正しいものはどれか。
- choices:
  - A: 呼吸器の上皮は主に内胚葉に由来する。
  - B: 呼吸器の上皮は外胚葉に由来する。
  - C: 泌尿器はすべて外胚葉に由来する。
  - D: 発生学的由来は器官の機能と無関係である。
- answer: 呼吸器の上皮は主に内胚葉に由来する。
- explanation: 呼吸器の上皮は主に内胚葉に由来する(既存Q012)。腎臓・尿路の多くは中胚葉に由来するとされる。発生学的由来を知ることは、器官の分類上の位置づけを理解する助けとなる。
- tags: 胚葉, 発生
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: 胚葉は総論授業で明示的に扱う。呼吸器上皮＝主に内胚葉、泌尿器系＝主に中胚葉という「主に」の表現を維持し、scope flag解除。

## Q210

- category: 総論
- subcategory: 体腔
- difficulty: 2
- final_type: text_mcq
- question: 体腔とその内容の組み合わせとして正しいものはどれか。
- choices:
  - A: 胸腔―心臓・肺、腹腔―胃・肝臓・腎臓の一部、骨盤腔―膀胱
  - B: 胸腔―腎臓、腹腔―心臓、骨盤腔―肺
  - C: すべての体腔は同じ臓器を収める。
  - D: 体腔は互いに完全に独立し、隔壁は存在しない。
- answer: 胸腔―心臓・肺、腹腔―胃・肝臓・腎臓の一部、骨盤腔―膀胱
- explanation: 胸腔には心臓・肺、腹腔には胃・肝臓・腎臓の一部などの臓器、骨盤腔には膀胱などが収められる。既存Q055〜058の体腔問題を統合する。
- tags: 体腔, 胸腔, 腹腔, 骨盤腔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q211

- category: 総論
- subcategory: 体腔
- difficulty: 3
- final_type: text_mcq
- question: 漿膜について正しいものはどれか。
- choices:
  - A: 臓器の表面や体腔の内面を覆う薄い膜で、心膜・胸膜はいずれも漿膜の一種である。
  - B: 漿膜は骨格を構成する組織である。
  - C: 漿膜は筋組織の一種である。
  - D: 漿膜は消化管の内腔を覆う粘膜と同じものである。
- answer: 臓器の表面や体腔の内面を覆う薄い膜で、心膜・胸膜はいずれも漿膜の一種である。
- explanation: 漿膜は臓器表面や体腔内面を覆う薄い膜で、循環器の心膜(既存Q126)、呼吸器の胸膜(既存Q155/156)はいずれも漿膜の一種であり、共通して摩擦を軽減する液体を分泌する。
- tags: 漿膜, 心膜, 胸膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q212

- category: 総論
- subcategory: 体液
- difficulty: 2
- final_type: text_mcq
- question: 体液の酸塩基平衡を保つ仕組みについて正しいものはどれか。
- choices:
  - A: 重炭酸イオンなどの緩衝系が、体液のpH変化を最小限に抑える。
  - B: 体液のpHは緩衝系なしに常に一定である。
  - C: 緩衝系は酸塩基平衡に関与しない。
  - D: 緩衝系は体液中に存在しない。
- answer: 重炭酸イオンなどの緩衝系が、体液のpH変化を最小限に抑える。
- explanation: 体液には重炭酸イオンなどの緩衝系が存在し、酸や塩基が加わった際のpH変化を最小限に抑える。既存Q116の酸塩基平衡の概念を、その調節機構の一端として深化する。
- tags: 酸塩基平衡, 緩衝系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q213

- category: 総論
- subcategory: 体液
- difficulty: 3
- final_type: text_mcq
- question: 電解質と細胞の興奮性の関係について正しいものはどれか。
- choices:
  - A: 細胞内外のナトリウムイオン・カリウムイオンの濃度差が、神経や筋の興奮の基盤となる。
  - B: 電解質は興奮性と無関係である。
  - C: 興奮性は電解質濃度が完全に均一な場合にのみ生じる。
  - D: カリウムイオンは興奮性に関与しない。
- answer: 細胞内外のナトリウムイオン・カリウムイオンの濃度差が、神経や筋の興奮の基盤となる。
- explanation: 細胞内外のナトリウムイオン・カリウムイオンなどの濃度差(電気化学的勾配)が、神経・筋の興奮性(Q208)の基盤となる。既存の循環器の刺激伝導系・心電図の理解を支える基礎知識である。
- tags: 電解質, 興奮性
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q214

- category: 総論
- subcategory: 生体の恒常性
- difficulty: 1
- final_type: text_mcq
- question: 体温調節について正しいものはどれか。
- choices:
  - A: 発汗や皮膚血管の拡張・収縮などにより、体温を一定範囲に保とうとする。
  - B: 体温は常に外気温と同じになる。
  - C: 体温調節に皮膚の血管は関与しない。
  - D: 体温はホメオスタシスの対象に含まれない。
- answer: 発汗や皮膚血管の拡張・収縮などにより、体温を一定範囲に保とうとする。
- explanation: 体温調節は、発汗・皮膚血管の拡張(放熱)や収縮(保温)などにより体温を一定範囲に保つ恒常性(既存Q112)の代表例である。
- tags: 体温調節, 恒常性
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q215

- category: 総論
- subcategory: 器官系
- difficulty: 2
- final_type: text_mcq
- question: 器官系どうしの協調について正しいものはどれか。
- choices:
  - A: 循環器系と呼吸器系は協調して酸素を全身に供給する。
  - B: 器官系はそれぞれ独立して機能し、互いに影響しない。
  - C: 器官系の協調は存在しない。
  - D: 1つの器官系のみで恒常性が維持される。
- answer: 循環器系と呼吸器系は協調して酸素を全身に供給する。
- explanation: 循環器系(血液の運搬)と呼吸器系(ガス交換)は協調してはたらき、酸素を全身の組織に供給し、二酸化炭素を排出する。器官系どうしの協調は恒常性(既存Q112)を支える重要な仕組みである。
- tags: 器官系, 協調
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q216

- category: 総論
- subcategory: 方向用語
- difficulty: 1
- final_type: text_mcq
- question: 上方(頭側)と下方(尾側)の説明として正しいものはどれか。
- choices:
  - A: 頭部に近い方向を上方(頭側)、足の方向に近い側を下方(尾側)という。
  - B: 上方は身体の前面を指す方向用語である。
  - C: 上方と下方は左右の位置関係を表す用語である。
  - D: 上方・下方という用語は人体には用いられない。
- answer: 頭部に近い方向を上方(頭側)、足の方向に近い側を下方(尾側)という。
- explanation: 上方(頭側)・下方(尾側)は、頭部に近いか足に近いかを表す方向用語であり、既存の内外側・前後・近位遠位などの方向用語体系を完成させる。
- tags: 方向用語, 上方, 下方
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q217

- category: 総論
- subcategory: 身体の大区分
- difficulty: 2
- final_type: text_mcq
- question: 胸部の体表からの区分について正しいものはどれか。
- choices:
  - A: 鎖骨・肋骨・胸骨などを目印に、心臓や肺の位置をおおまかに体表から把握できる。
  - B: 胸部は体表から一切区分できない。
  - C: 胸部の体表区分は腹部と全く同じ名称が用いられる。
  - D: 胸部の体表区分は骨の位置と無関係である。
- answer: 鎖骨・肋骨・胸骨などを目印に、心臓や肺の位置をおおまかに体表から把握できる。
- explanation: 胸部は鎖骨・肋骨・胸骨などの骨性目印を基準に、心臓や肺の体表投影位置をおおまかに把握することができる。既存の腹部4分画(Q122)と対になる胸部の視点である。
- tags: 胸部, 体表区分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q218

- category: 総論
- subcategory: 体液
- difficulty: 2
- final_type: text_mcq
- question: 細胞内液と細胞外液の組成の違いについて正しいものはどれか。
- choices:
  - A: 細胞内液はカリウムイオンに富み、細胞外液はナトリウムイオンに富む。
  - B: 細胞内液と細胞外液の電解質組成は完全に同じである。
  - C: 細胞外液にはカリウムイオンのみが存在する。
  - D: 細胞内液にはナトリウムイオンのみが存在する。
- answer: 細胞内液はカリウムイオンに富み、細胞外液はナトリウムイオンに富む。
- explanation: 細胞内液はカリウムイオン(K+)に富み、細胞外液はナトリウムイオン(Na+)に富むという組成差があり、この濃度勾配が細胞の興奮性(Q208,213)の基盤となる。
- tags: 細胞内液, 細胞外液, 電解質
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q219

- category: 総論
- subcategory: 上皮組織
- difficulty: 1
- final_type: text_mcq
- question: 上皮組織の再生能力について正しいものはどれか。
- choices:
  - A: 上皮組織は一般に再生能力が高く、損傷後に比較的速やかに修復される。
  - B: 上皮組織は一度損傷すると再生しない。
  - C: 上皮組織の再生能力は他の組織より低い。
  - D: 上皮組織は再生する際に別の組織に置き換わる。
- answer: 上皮組織は一般に再生能力が高く、損傷後に比較的速やかに修復される。
- explanation: 上皮組織は一般に再生能力が高く、損傷後に比較的速やかに新しい細胞に置き換わる。気道粘膜・尿路上皮など、常に外部環境や尿にさらされる上皮でこの性質は特に重要である。
- tags: 上皮組織, 再生能力
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q220

- category: 総論
- subcategory: 基本的運動方向
- difficulty: 1
- final_type: text_mcq
- question: 足関節で足背を下腿に近づける運動はどれか。
- choices:
  - A: 背屈
  - B: 底屈
  - C: 回内
  - D: 外転
- answer: 背屈
- explanation: 足関節では足背を下腿に近づける方向を背屈、足底方向へ向ける運動を底屈という。
- tags: 背屈, 底屈, 足関節, 基本的運動方向
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「結合組織の細胞外基質について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。

## Q221

- category: 総論
- subcategory: 体液
- difficulty: 1
- final_type: text_mcq
- question: 体内の水分出納について正しいものはどれか。
- choices:
  - A: 水分の摂取量と排出量(尿・不感蒸泄など)がつり合うことで、体液量が一定に保たれる。
  - B: 水分は摂取されるのみで、排出されることはない。
  - C: 体液量の調節に水分出納は関与しない。
  - D: 水分の排出は尿のみによって行われる。
- answer: 水分の摂取量と排出量(尿・不感蒸泄など)がつり合うことで、体液量が一定に保たれる。
- explanation: 体内の水分は、飲水・食物などによる摂取と、尿・不感蒸泄(皮膚・呼気からの蒸発)・便などによる排出がつり合うことで、体液量が一定に保たれる。既存の泌尿器領域(尿生成)と接続する総論的な視点である。
- tags: 水分出納, 体液量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q222

- category: 総論
- subcategory: 体液
- difficulty: 1
- final_type: text_mcq
- question: 細胞外液の区分について正しいものはどれか。
- choices:
  - A: 血管内の血漿と、細胞と細胞の間を満たす組織間液(間質液)などに分けられる。
  - B: 細胞外液は血漿のみを指す。
  - C: 細胞外液は細胞内にのみ存在する。
  - D: 組織間液は血管内に存在する液体である。
- answer: 血管内の血漿と、細胞と細胞の間を満たす組織間液(間質液)などに分けられる。
- explanation: 細胞外液は、血管内を流れる血漿と、細胞と細胞の間を満たす組織間液(間質液)などに区分される。既存Q113(体液の区分)を一段階深化する。
- tags: 細胞外液, 血漿, 組織間液
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q223

- category: 総論
- subcategory: 生体の恒常性
- difficulty: 3
- final_type: text_mcq
- question: 人体の構成レベルと恒常性の関係について正しいものはどれか。
- choices:
  - A: 細胞→組織→器官→器官系という各レベルが協調してはたらくことで、個体としての恒常性が維持される。
  - B: 恒常性は細胞レベルのみで完結し、器官系は関与しない。
  - C: 人体の構成レベルと恒常性は無関係である。
  - D: 器官系が協調することで、かえって恒常性は乱れる。
- answer: 細胞→組織→器官→器官系という各レベルが協調してはたらくことで、個体としての恒常性が維持される。
- explanation: 細胞→組織→器官→器官系という各構成レベルが階層的に協調してはたらくことで、個体としての恒常性(既存Q112)が維持される。既存Q002(人体の構成)とQ112(恒常性)を統合する、総論領域の最終まとめ問題。
- tags: 恒常性, 人体の構成
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

### 循環器（85問）

## Q013

- category: 循環器
- subcategory: 循環器系の構成
- difficulty: 1
- final_type: text_mcq
- question: 循環器系に含まれる組み合わせとして正しいものはどれか。
- choices:
  - A: 心臓・血管系・リンパ系
  - B: 心臓・肺・腎臓
  - C: 動脈・気管・リンパ節
  - D: 心臓・食道・静脈
- answer: 心臓・血管系・リンパ系
- explanation: 循環器系は心臓、血管系、リンパ系から構成される。
- tags: 循環器系, 心臓, 血管系, リンパ系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q014

- category: 循環器
- subcategory: 肺循環
- difficulty: 1
- final_type: text_mcq
- question: 肺循環が始まる部位はどれか。
- choices:
  - A: 左心房
  - B: 左心室
  - C: 右心房
  - D: 右心室
- answer: 右心室
- explanation: 肺循環では右心室から肺へ血液を送り、肺で酸素化された血液が左心房へ戻る。
- tags: 肺循環, 右心室
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q015

- category: 循環器
- subcategory: 体循環
- difficulty: 1
- final_type: text_mcq
- question: 体循環の血液が最終的に戻る心腔はどれか。
- choices:
  - A: 右心房
  - B: 右心室
  - C: 左心房
  - D: 左心室
- answer: 右心房
- explanation: 体循環は左心室から始まり、全身を循環した血液が右心房へ戻る。
- tags: 体循環, 右心房
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q016

- category: 循環器
- subcategory: 心臓の位置
- difficulty: 1
- final_type: image_mcq
- question: 図中①で示された、左第5肋間の鎖骨中線付近で拍動を触知できる部位はどれか。
- choices:
  - A: 心底
  - B: 心尖
  - C: 右心房
  - D: 大動脈弓
- answer: 心尖
- explanation: 心尖は左第5肋間の鎖骨中線付近に位置し、拍動を触知できる。
- tags: 心尖, 心臓
- image_asset: q016_apex.webp
- marker_target: 心尖
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: 授業内容として位置づいている代表値であり、既に適切な「約」「おおよそ」等の表現を使用していることを確認。numeric flag解除。

## Q017

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 1
- final_type: image_mcq
- question: 心臓断面図の①で示された部屋はどれか。
- choices:
  - A: 右心房
  - B: 右心室
  - C: 左心房
  - D: 左心室
- answer: 左心室
- explanation: 左心室は体循環へ血液を送り出す心室である。
- tags: 左心室, 心腔
- image_asset: q017_heart_chambers.webp
- marker_target: 左心室
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q018

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 左心房と左心室の間にある弁はどれか。
- choices:
  - A: 三尖弁
  - B: 僧帽弁
  - C: 肺動脈弁
  - D: 大動脈弁
- answer: 僧帽弁
- explanation: 僧帽弁は左心房と左心室の間にあり、左心室から左心房への逆流を防ぐ。
- tags: 僧帽弁, 心臓弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: Q232を別内容へ置換したことにより解消。Q018は現行内容を維持。

## Q019

- category: 循環器
- subcategory: 肺循環
- difficulty: 1
- final_type: image_mcq
- question: 図中①で示された、肺から左心房へ血液を運ぶ血管はどれか。
- choices:
  - A: 肺動脈
  - B: 肺静脈
  - C: 上大静脈
  - D: 大動脈
- answer: 肺静脈
- explanation: 肺静脈は肺で酸素化された血液を左心房へ運ぶ。
- tags: 肺静脈, 肺循環
- image_asset: q019_pulmonary_vein.webp
- marker_target: 肺から左心房へ入る肺静脈
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q020

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: text_mcq
- question: 静脈の特徴として適切なのはどれか。
- choices:
  - A: 壁が厚く弾性線維と平滑筋が豊富
  - B: 単層扁平上皮と基底膜のみで構成される
  - C: 壁が比較的薄く、内腔が広い
  - D: 心臓から全身へ血液を送る
- answer: 壁が比較的薄く、内腔が広い
- explanation: 静脈は動脈より壁が薄く内腔が広く、静脈弁によって逆流を防ぐ。
- tags: 静脈, 血管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q021

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: image_mcq
- question: 3種類の血管断面のうち、物質交換を主な役割とする①はどれか。
- choices:
  - A: 動脈
  - B: 静脈
  - C: 毛細血管
  - D: リンパ節
- answer: 毛細血管
- explanation: 毛細血管は非常に薄い壁をもち、酸素、栄養素、老廃物などの交換を行う。
- tags: 毛細血管, 血管
- image_asset: q021_vessel_cross_sections.webp
- marker_target: 毛細血管
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q022

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 2
- final_type: text_mcq
- question: 心臓の刺激伝導の順序として適切なのはどれか。
- choices:
  - A: 房室結節 → 洞房結節 → 房室束 → プルキンエ線維
  - B: 洞房結節 → 房室結節 → 房室束 → 右脚・左脚 → プルキンエ線維
  - C: 洞房結節 → 房室束 → 房室結節 → プルキンエ線維
  - D: プルキンエ線維 → 洞房結節 → 房室結節 → 房室束
- answer: 洞房結節 → 房室結節 → 房室束 → 右脚・左脚 → プルキンエ線維
- explanation: 洞房結節で生じた興奮は、房室結節、房室束、右脚・左脚、プルキンエ線維へ伝わる。
- tags: 刺激伝導系, 洞房結節, 房室結節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: Q240を別内容へ置換したことにより解消。Q022は現行内容を維持。

## Q023

- category: 循環器
- subcategory: 心電図
- difficulty: 1
- final_type: text_mcq
- question: 心電図のP波が表すものはどれか。
- choices:
  - A: 心房の脱分極
  - B: 心室の脱分極
  - C: 心室の再分極
  - D: 心房の機械的拡張のみ
- answer: 心房の脱分極
- explanation: P波は心房の興奮、すなわち脱分極を示す。
- tags: 心電図, P波
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q024

- category: 循環器
- subcategory: 心電図
- difficulty: 1
- final_type: text_mcq
- question: 心電図のQRS群が表すものはどれか。
- choices:
  - A: 心房の脱分極
  - B: 心室の脱分極
  - C: 心室の再分極
  - D: 心房の再分極のみ
- answer: 心室の脱分極
- explanation: QRS群は心室の興奮、すなわち脱分極を示す。
- tags: 心電図, QRS群
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q025

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 1
- final_type: image_mcq
- question: 刺激伝導系の図中①で示された、正常な心臓のペースメーカーとして働く部位はどれか。
- choices:
  - A: 洞房結節
  - B: 房室結節
  - C: 房室束
  - D: プルキンエ線維
- answer: 洞房結節
- explanation: 洞房結節は右心房上部に位置し、自発的に興奮を発生させる。
- tags: 洞房結節, 刺激伝導系
- image_asset: q025_conduction_system.webp
- marker_target: 右心房上部の洞房結節
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q026

- category: 循環器
- subcategory: 大動脈
- difficulty: 2
- final_type: text_mcq
- question: 大動脈弓から直接分岐する血管はどれか。
- choices:
  - A: 右冠状動脈
  - B: 左総頸動脈
  - C: 腎動脈
  - D: 上腸間膜動脈
- answer: 左総頸動脈
- explanation: 大動脈弓からは腕頭動脈、左総頸動脈、左鎖骨下動脈が分岐する。
- tags: 大動脈弓, 左総頸動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q027

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 2
- final_type: text_mcq
- question: 右冠状動脈と左冠状動脈が起始する部位はどれか。
- choices:
  - A: 上行大動脈
  - B: 大動脈弓
  - C: 肺動脈幹
  - D: 上大静脈
- answer: 上行大動脈
- explanation: 冠状動脈は上行大動脈から起始し、心筋へ血液を供給する。
- tags: 冠状動脈, 上行大動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q064

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 1
- final_type: image_mcq
- question: 心臓断面図の①〜④で示された4つの部屋の組み合わせとして正しいものはどれか。
- choices:
  - A: ①右心房 ②右心室 ③左心房 ④左心室
  - B: ①左心房 ②左心室 ③右心房 ④右心室
  - C: ①右心室 ②右心房 ③左心室 ④左心房
  - D: ①右心房 ②左心房 ③右心室 ④左心室
- answer: ①右心房 ②右心室 ③左心房 ④左心室
- explanation: 心臓は右心房・右心室・左心房・左心室の4腔からなる。図では①右心房②右心室③左心房④左心室の位置関係で配置される。
- tags: 右心房, 右心室, 左心房, 左心室, 心腔
- image_asset: q017_heart_chambers.webp
- marker_target: 右心房・右心室・左心房・左心室（4か所）
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q065

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 房室弁に含まれる組み合わせはどれか。
- choices:
  - A: 三尖弁、僧帽弁
  - B: 肺動脈弁、大動脈弁
  - C: 三尖弁、肺動脈弁
  - D: 僧帽弁、大動脈弁
- answer: 三尖弁、僧帽弁
- explanation: 房室弁は心房と心室の間にある。
- tags: 房室弁, 三尖弁, 僧帽弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q066

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 半月弁に含まれる組み合わせはどれか。
- choices:
  - A: 三尖弁、僧帽弁
  - B: 肺動脈弁、大動脈弁
  - C: 三尖弁、肺動脈弁
  - D: 僧帽弁、大動脈弁
- answer: 肺動脈弁、大動脈弁
- explanation: 半月弁は心室と大血管の間にある。
- tags: 半月弁, 肺動脈弁, 大動脈弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q067

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: image_mcq
- question: 3種類の血管断面のうち、厚い壁で弾性線維・平滑筋が豊富な①はどれか。
- choices:
  - A: 動脈
  - B: 静脈
  - C: 毛細血管
  - D: リンパ管
- answer: 動脈
- explanation: 動脈は高圧の血流に耐えるため、厚い壁と豊富な弾性線維・平滑筋をもつ。
- tags: 動脈, 血管壁
- image_asset: q021_vessel_cross_sections.webp
- marker_target: 動脈（3断面中の1つ）
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q068

- category: 循環器
- subcategory: 心電図
- difficulty: 1
- final_type: image_mcq
- question: 心電図の①で示されたT波が表す電気的活動はどれか。
- choices:
  - A: 心房の脱分極
  - B: 心房の再分極
  - C: 心室の脱分極
  - D: 心室の再分極
- answer: 心室の再分極
- explanation: T波は心室の再分極を表す。
- tags: 心電図, T波, 再分極
- image_asset: q068_ecg_waveform.webp
- marker_target: T波
- image_status: planned_shared
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q069

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 三尖弁の位置として正しいものはどれか。
- choices:
  - A: 左心房と左心室の間
  - B: 右心房と右心室の間
  - C: 右心室と肺動脈の間
  - D: 左心室と大動脈の間
- answer: 右心房と右心室の間
- explanation: 三尖弁は右心房室弁である。
- tags: 三尖弁, 右心房, 右心室
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q070

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 肺動脈弁の位置として正しいものはどれか。
- choices:
  - A: 右心房と右心室の間
  - B: 左心房と左心室の間
  - C: 右心室と肺動脈の間
  - D: 左心室と大動脈の間
- answer: 右心室と肺動脈の間
- explanation: 肺動脈弁は右心室流出路にある。
- tags: 肺動脈弁, 右心室, 肺動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q071

- category: 循環器
- subcategory: 心臓弁
- difficulty: 2
- final_type: text_mcq
- question: 心室収縮時に閉鎖する弁の組み合わせはどれか。
- choices:
  - A: 三尖弁と僧帽弁
  - B: 肺動脈弁と大動脈弁
  - C: 三尖弁と肺動脈弁
  - D: 僧帽弁と大動脈弁
- answer: 三尖弁と僧帽弁
- explanation: 房室弁は心室収縮時に閉鎖する。
- tags: 三尖弁, 僧帽弁, 心室収縮期
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q072

- category: 循環器
- subcategory: 心臓弁
- difficulty: 2
- final_type: text_mcq
- question: 心室拡張時に閉鎖する弁の組み合わせはどれか。
- choices:
  - A: 三尖弁と僧帽弁
  - B: 肺動脈弁と大動脈弁
  - C: 三尖弁と肺動脈弁
  - D: 僧帽弁と大動脈弁
- answer: 肺動脈弁と大動脈弁
- explanation: 半月弁は心室拡張時に閉鎖する。
- tags: 肺動脈弁, 大動脈弁, 半月弁, 心室拡張期
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q073

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 2
- final_type: image_mcq
- question: 冠動脈走行図の①で示された血管が主に栄養することが多い部位として正しいものはどれか。
- choices:
  - A: 左心房・左心室・心室中隔前面など
  - B: 右心房・右心室・刺激伝導系の一部
  - C: 肺全体
  - D: 消化管
- answer: 左心房・左心室・心室中隔前面など
- explanation: 左冠動脈は左心系（左心房・左心室）と心室中隔前面などを栄養することが多い。冠動脈の分布・灌流域には個人差があるため、ここでは代表的な傾向として扱う。
- tags: 冠状動脈, 左冠動脈
- image_asset: q073_coronary_arteries.webp
- marker_target: 左冠動脈
- image_status: planned_shared
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q074

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 2
- final_type: image_mcq
- question: 冠動脈走行図の②で示された血管が主に栄養することが多い部位として正しいものはどれか。
- choices:
  - A: 右心房・右心室・刺激伝導系の一部
  - B: 左心房・左心室・心室中隔前面など
  - C: 肺全体
  - D: 消化管
- answer: 右心房・右心室・刺激伝導系の一部
- explanation: 右冠動脈は右心系（右心房・右心室）と刺激伝導系の一部を栄養することが多い。冠動脈の分布・灌流域には個人差があるため、ここでは代表的な傾向として扱う。
- tags: 冠状動脈, 右冠動脈
- image_asset: q073_coronary_arteries.webp
- marker_target: 右冠動脈
- image_status: planned_shared
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q075

- category: 循環器
- subcategory: 心電図
- difficulty: 2
- final_type: text_mcq
- question: PQ間隔について正しいものはどれか。
- choices:
  - A: 心房から心室への興奮伝導時間を反映する。
  - B: 心室の再分極時間のみを反映する。
  - C: 心室筋全体が興奮している時期を示す。
  - D: 心房筋のみの収縮時間を示す。
- answer: 心房から心室への興奮伝導時間を反映する。
- explanation: 房室結節での遅延を含む伝導時間の指標である。
- tags: 心電図, PQ間隔, 興奮伝導
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q076

- category: 循環器
- subcategory: 心電図
- difficulty: 2
- final_type: text_mcq
- question: 心電図のST部分について正しいものはどれか。
- choices:
  - A: 心室全体が興奮している時期に相当する。
  - B: 心房の興奮を示す。
  - C: 心室の再分極を示す。
  - D: 心房と心室の伝導遅延を示す。
- answer: 心室全体が興奮している時期に相当する。
- explanation: ST部分は、心室筋がほぼ一様に脱分極している時期に相当する。
- tags: 心電図, ST部分, 心室興奮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q123

- category: 循環器
- subcategory: 心周期
- difficulty: 1
- final_type: text_mcq
- question: 心周期について正しいものはどれか。
- choices:
  - A: 心臓は収縮期と拡張期を周期的に繰り返す。
  - B: 心臓は常に収縮した状態を維持する。
  - C: 心房と心室は常に同時に収縮する。
  - D: 心周期に規則性はない。
- answer: 心臓は収縮期と拡張期を周期的に繰り返す。
- explanation: 心臓は収縮期(血液を送り出す)と拡張期(血液を受け入れる)を規則的に繰り返しており、この一連の流れを心周期という。心房と心室の収縮タイミングはわずかにずれている。
- tags: 心周期, 収縮期, 拡張期
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q124

- category: 循環器
- subcategory: 心周期
- difficulty: 2
- final_type: text_mcq
- question: 心音について正しいものはどれか。
- choices:
  - A: I音は房室弁の閉鎖、II音は動脈弁(半月弁)の閉鎖に伴って生じる。
  - B: I音は動脈弁の閉鎖に伴って生じる。
  - C: 心音は弁の開放によって生じる。
  - D: 心音は心筋の収縮そのものが直接の音源である。
- answer: I音は房室弁の閉鎖、II音は動脈弁(半月弁)の閉鎖に伴って生じる。
- explanation: 心音は弁の閉鎖に伴って生じる振動音であり、I音は房室弁(三尖弁・僧帽弁)の閉鎖、II音は動脈弁(肺動脈弁・大動脈弁)の閉鎖に対応する。
- tags: 心音, 弁の閉鎖
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q125

- category: 循環器
- subcategory: 心臓の位置
- difficulty: 1
- final_type: image_mcq
- question: 心臓外形模式図の①で示された、心臓の後上方に位置し、大血管が出入りする部分はどれか。
- choices:
  - A: 心底
  - B: 心尖
  - C: 右心耳
  - D: 冠状溝
- answer: 心底
- explanation: 心底は心臓の後上方に位置し、大静脈・肺静脈・大動脈・肺動脈などの大血管が出入りする部分である。既存Q016で扱う心尖とは対をなす部位である。
- tags: 心底, 心臓の位置
- image_asset: heart_exterior_posterior.webp (新規・仮称)
- marker_target: 心底
- image_status: planned_shared
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q126

- category: 循環器
- subcategory: 心膜
- difficulty: 2
- final_type: text_mcq
- question: 心膜について正しいものはどれか。
- choices:
  - A: 線維性心膜とその内側の漿膜性心膜(壁側・臓側)からなる。
  - B: 心膜は心臓の内腔を覆う膜である。
  - C: 心膜は血液のみで構成される。
  - D: 心膜には心臓を保護する機能はない。
- answer: 線維性心膜とその内側の漿膜性心膜(壁側・臓側)からなる。
- explanation: 心膜は外側の線維性心膜と、その内側の漿膜性心膜(壁側板・臓側板)から構成され、心臓を保護し、周囲組織との摩擦を軽減する。漿膜性心膜の臓側板は心外膜とも呼ばれる。
- tags: 心膜, 線維性心膜, 漿膜性心膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q127

- category: 循環器
- subcategory: 心膜
- difficulty: 1
- final_type: text_mcq
- question: 心膜腔について正しいものはどれか。
- choices:
  - A: 漿膜性心膜の壁側板と臓側板の間の空間で、少量の心膜液を含む。
  - B: 心膜腔は心臓の内部にある空間である。
  - C: 心膜腔には血液が満たされている。
  - D: 心膜腔は肺と心臓の間の空間である。
- answer: 漿膜性心膜の壁側板と臓側板の間の空間で、少量の心膜液を含む。
- explanation: 心膜腔は漿膜性心膜の壁側板と臓側板の間にある狭い空間で、少量の心膜液を含み、心臓の拍動時の摩擦を軽減する潤滑作用をもつ。
- tags: 心膜腔, 心膜液
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q128

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 2
- final_type: text_mcq
- question: 左心室と右心室の壁の厚さについて正しいものはどれか。
- choices:
  - A: 左心室の壁は右心室より厚い。
  - B: 右心室の壁は左心室より厚い。
  - C: 左心室と右心室の壁の厚さは同じである。
  - D: 心室の壁の厚さに左右差はみられない。
- answer: 左心室の壁は右心室より厚い。
- explanation: 左心室は血液を高い圧力で全身(体循環)へ送り出す必要があるため、右心室(低圧の肺循環へ送る)よりも壁が厚く発達している。
- tags: 左心室, 右心室, 心室壁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q129

- category: 循環器
- subcategory: 心臓弁
- difficulty: 2
- final_type: image_mcq
- question: 心臓断面図の①で示された、房室弁の弁尖につながり、心室収縮時に弁が心房側へ反転するのを防ぐ構造はどれか。
- choices:
  - A: 腱索・乳頭筋
  - B: 冠状動脈
  - C: 刺激伝導系
  - D: 心膜
- answer: 腱索・乳頭筋
- explanation: 房室弁の弁尖は腱索によって心室壁の乳頭筋につながっており、心室収縮時に弁が心房側へめくれ返る(逸脱する)のを防いでいる。
- tags: 腱索, 乳頭筋, 房室弁
- image_asset: q017_heart_chambers.webp
- marker_target: 腱索・乳頭筋（心室内、房室弁尖につながる構造）
- image_status: review_required（既存の実在画像で対象構造を一意に識別できるか未確認）
- source: legacy_revised
- teacher_review: yes
- final_review_note: 既存画像q017_heart_chambers.webpで腱索・乳頭筋を一意かつ明瞭に識別できるか未確認のため、image_status=review_requiredとする。画像制作段階で実画像を確認し、不明瞭なら新規心臓内部画像の作成、またはtext_mcqへの変更を検討する。現段階で既存asset再利用を確定しない。

## Q130

- category: 循環器
- subcategory: 心臓の機能
- difficulty: 2
- final_type: text_mcq
- question: 心拍出量について正しいものはどれか。
- choices:
  - A: 一回拍出量と心拍数の積で表される。
  - B: 血圧そのものと同じ意味である。
  - C: 心拍出量は常に一定で変動しない。
  - D: 心拍出量は左心室からの拍出のみを指し、右心室は含まれない。
- answer: 一回拍出量と心拍数の積で表される。
- explanation: 心拍出量(1分間に心臓が送り出す血液量)は、一回拍出量(1回の収縮で送り出す血液量)と心拍数の積で表される。
- tags: 心拍出量, 一回拍出量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q131

- category: 循環器
- subcategory: 心臓の機能
- difficulty: 3
- final_type: text_mcq
- question: 一回拍出量に影響する要因として正しいものはどれか。
- choices:
  - A: 心室に戻ってくる血液量(前負荷)が増えると、一回拍出量は増加する傾向がある。
  - B: 心室への血液の戻りは一回拍出量に影響しない。
  - C: 一回拍出量は心臓の大きさのみで決まり、血液量とは無関係である。
  - D: 一回拍出量は常に一定である。
- answer: 心室に戻ってくる血液量(前負荷)が増えると、一回拍出量は増加する傾向がある。
- explanation: 心室に戻る血液量(前負荷)が増えると心筋の伸展が高まり、それに応じて収縮力が増す(フランク・スターリングの法則)ため、一回拍出量は増加する傾向がある。
- tags: 一回拍出量, 前負荷
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q132

- category: 循環器
- subcategory: 血圧
- difficulty: 1
- final_type: text_mcq
- question: 血圧について正しいものはどれか。
- choices:
  - A: 心室収縮時の最高値を収縮期血圧、拡張時の最低値を拡張期血圧という。
  - B: 血圧は常に一定の値を示す。
  - C: 収縮期血圧は拡張期血圧より低い。
  - D: 血圧は静脈のみで測定される値である。
- answer: 心室収縮時の最高値を収縮期血圧、拡張時の最低値を拡張期血圧という。
- explanation: 血圧は動脈壁にかかる圧力であり、心室収縮時の最高値を収縮期血圧(最高血圧)、心室拡張時の最低値を拡張期血圧(最低血圧)という。
- tags: 血圧, 収縮期血圧, 拡張期血圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q133

- category: 循環器
- subcategory: 血圧
- difficulty: 2
- final_type: text_mcq
- question: 血圧を規定する要因として正しいものはどれか。
- choices:
  - A: 心拍出量と末梢血管抵抗によって規定される。
  - B: 血圧は心臓の大きさのみで決まる。
  - C: 血圧は血液の色によって決まる。
  - D: 末梢血管抵抗は血圧に影響しない。
- answer: 心拍出量と末梢血管抵抗によって規定される。
- explanation: 血圧は、心臓が送り出す血液量(心拍出量)と、血管がその血流に対して示す抵抗(末梢血管抵抗)の両方によって規定される。
- tags: 血圧, 末梢血管抵抗
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q134

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 大動脈などの弾性動脈について正しいものはどれか。
- choices:
  - A: 弾性線維に富み、心室収縮時に拡張し、拡張期に収縮して血流を維持する。
  - B: 弾性動脈には弾性線維が存在しない。
  - C: 弾性動脈は静脈と同じ構造をもつ。
  - D: 弾性動脈は血流を完全に停止させる機能をもつ。
- answer: 弾性線維に富み、心室収縮時に拡張し、拡張期に収縮して血流を維持する。
- explanation: 大動脈などの弾性動脈は弾性線維に富み、心室収縮時の圧力を受けて拡張し、拡張期にはその弾性によって収縮することで、血流を持続的に保つ働きをもつ。
- tags: 弾性動脈, 大動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q135

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 静脈還流について正しいものはどれか。
- choices:
  - A: 下肢の骨格筋の収縮(筋ポンプ作用)が静脈血を心臓へ戻す助けとなる。
  - B: 静脈還流は心臓の吸引力のみによって行われる。
  - C: 静脈還流には血管の収縮は一切関与しない。
  - D: 静脈還流は動脈の拍動によって直接生み出される。
- answer: 下肢の骨格筋の収縮(筋ポンプ作用)が静脈血を心臓へ戻す助けとなる。
- explanation: 下肢などの静脈血は重力に逆らって心臓へ戻る必要があり、周囲の骨格筋の収縮(筋ポンプ作用)や呼吸運動による胸腔内圧の変化が、静脈還流を助けている。
- tags: 静脈還流, 筋ポンプ
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q136

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: text_mcq
- question: 静脈弁について正しいものはどれか。
- choices:
  - A: 血液の逆流を防ぎ、特に下肢の静脈に多くみられる。
  - B: 静脈弁は動脈にのみ存在する。
  - C: 静脈弁は血液の逆流を促進する。
  - D: 静脈弁はすべての血管に均等に存在する。
- answer: 血液の逆流を防ぎ、特に下肢の静脈に多くみられる。
- explanation: 静脈には血液の逆流を防ぐ静脈弁が存在し、特に重力の影響を受けやすい下肢の静脈に多くみられる。
- tags: 静脈弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q137

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 毛細血管での物質交換について正しいものはどれか。
- choices:
  - A: 薄い血管壁を介して酸素・栄養素・老廃物などが拡散により交換される。
  - B: 毛細血管では物質交換は行われない。
  - C: 毛細血管は厚い平滑筋層をもつ。
  - D: 毛細血管での物質交換にはエネルギーを要する能動輸送のみが用いられる。
- answer: 薄い血管壁を介して酸素・栄養素・老廃物などが拡散により交換される。
- explanation: 毛細血管は非常に薄い壁(一層の内皮細胞)をもち、この薄い壁を介して酸素・栄養素・老廃物などの物質が主に拡散によって血液と組織の間で交換される。
- tags: 毛細血管, 物質交換
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q138

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: image_mcq
- question: 心臓外形模式図の②で示された、上半身からの静脈血を右心房へ運ぶ血管はどれか。
- choices:
  - A: 上大静脈
  - B: 下大静脈
  - C: 肺静脈
  - D: 冠状静脈洞
- answer: 上大静脈
- explanation: 上大静脈は頭部・頸部・上肢などからの静脈血を集めて右心房へ運ぶ。下半身からの静脈血は下大静脈が運ぶ。
- tags: 上大静脈, 下大静脈, 静脈還流
- image_asset: heart_exterior_anterior.webp (新規・仮称)
- marker_target: 上大静脈
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q139

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 腹部大動脈から分岐する血管について正しいものはどれか。
- choices:
  - A: 腹腔動脈・上腸間膜動脈・腎動脈・下腸間膜動脈などが分岐する。
  - B: 腹部大動脈からは血管は分岐しない。
  - C: 腹部大動脈は直接、下肢の骨に血液を送る。
  - D: 腹部大動脈は心臓に直接戻る血管である。
- answer: 腹腔動脈・上腸間膜動脈・腎動脈・下腸間膜動脈などが分岐する。
- explanation: 腹部大動脈からは、腹部臓器へ血液を送る腹腔動脈・上腸間膜動脈・腎動脈・下腸間膜動脈などの主要な血管が分岐する。
- tags: 腹部大動脈, 腎動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q140

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 1
- final_type: image_mcq
- question: 心臓外形模式図の③で示された、心臓を還流した静脈血が集まり右心房へ注ぐ部位はどれか。
- choices:
  - A: 冠状静脈洞
  - B: 上大静脈
  - C: 肺動脈
  - D: 心膜腔
- answer: 冠状静脈洞
- explanation: 心筋を還流した静脈血の多くは冠状静脈洞に集まり、右心房へ注ぐ。既存の冠状動脈(Q027,073,074)が心筋へ血液を送る経路であるのに対し、冠状静脈洞はその血液が心臓へ戻る経路にあたる。
- tags: 冠状静脈洞, 冠循環
- image_asset: heart_exterior_posterior.webp (新規・仮称)
- marker_target: 冠状静脈洞
- image_status: planned_shared
- source: legacy_revised
- teacher_review: yes
- final_review_note: なし

## Q141

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 2
- final_type: text_mcq
- question: 心臓の自動能について正しいものはどれか。
- choices:
  - A: 心臓は神経からの指令がなくても、刺激伝導系が自ら興奮を発生し、規則的に収縮できる。
  - B: 心臓は神経からの指令がなければ全く収縮しない。
  - C: 自動能は骨格筋にもみられる一般的な性質である。
  - D: 自動能により心拍数は常に一定で変化しない。
- answer: 心臓は神経からの指令がなくても、刺激伝導系が自ら興奮を発生し、規則的に収縮できる。
- explanation: 心臓は刺激伝導系(洞房結節など)が自ら周期的に興奮を発生させる自動能をもち、神経からの指令がなくても規則的に収縮できる。自律神経系はこの自動能のリズムを促進・抑制的に調節する。
- tags: 自動能, 刺激伝導系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q142

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 3
- final_type: text_mcq
- question: 房室結節での興奮伝導について正しいものはどれか。
- choices:
  - A: 興奮の伝導がわずかに遅延し、心房の収縮が完了してから心室が収縮するための時間を確保する。
  - B: 房室結節では興奮伝導が加速される。
  - C: 房室結節は心室の興奮を心房へ伝える構造である。
  - D: 房室結節での伝導遅延は心電図に反映されない。
- answer: 興奮の伝導がわずかに遅延し、心房の収縮が完了してから心室が収縮するための時間を確保する。
- explanation: 房室結節では興奮の伝導がわずかに遅延することで、心房の収縮が完了してから心室が収縮するための時間的余裕が生まれる。この遅延は心電図のPQ間隔(既存Q075)に反映される。
- tags: 房室結節, 伝導遅延
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q143

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 1
- final_type: text_mcq
- question: 心室全体にほぼ同時に興奮を伝える構造はどれか。
- choices:
  - A: プルキンエ線維
  - B: 洞房結節
  - C: 房室結節
  - D: 心膜
- answer: プルキンエ線維
- explanation: プルキンエ線維は心室の心内膜下に広く分布し、房室束・脚を経て伝わった興奮を心室全体にほぼ同時に伝えることで、心室の協調した収縮を可能にする。
- tags: プルキンエ線維, 刺激伝導系
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q144

- category: 循環器
- subcategory: 心電図
- difficulty: 3
- final_type: text_mcq
- question: 心電図の一連の波形(P波・QRS群・T波)と心臓の動きの対応として正しいものはどれか。
- choices:
  - A: P波(心房興奮)→QRS群(心室興奮)→T波(心室の興奮からの回復)の順に対応する。
  - B: P波は心室の興奮を、QRS群は心房の興奮を表す。
  - C: T波は心房の興奮を表す。
  - D: 心電図の波形は心臓の電気的活動とは無関係である。
- answer: P波(心房興奮)→QRS群(心室興奮)→T波(心室の興奮からの回復)の順に対応する。
- explanation: 心電図は、P波(心房の脱分極=興奮)→QRS群(心室の脱分極=興奮)→T波(心室の再分極=興奮からの回復)という一連の電気的活動を反映する。既存のQ023・024・068で個別に学んだ内容を、時間的な流れとして統合的に理解する。
- tags: 心電図, P波, QRS群, T波
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 既存のP波・QRS群・T波問題の再言及ではないか再評価した。個々の波形の意味を独立に暗記するだけでなく、時間的な順序（心房興奮→心室興奮→心室の興奮からの回復）として統合的に理解できているかを問う点は、独立した学習目標であると判断し、内容は維持する。

## Q145

- category: 循環器
- subcategory: 血圧
- difficulty: 1
- final_type: text_mcq
- question: 脈拍について正しいものはどれか。
- choices:
  - A: 心室収縮に伴う動脈の拍動を体表から触知したものである。
  - B: 脈拍は静脈の拍動を触知したものである。
  - C: 脈拍と心拍数は常に無関係である。
  - D: 脈拍は血圧とは無関係の現象である。
- answer: 心室収縮に伴う動脈の拍動を体表から触知したものである。
- explanation: 脈拍は、心室の収縮によって生じる動脈の拍動を、体表の浅い部位で触知したものであり、通常は心拍数と一致する。
- tags: 脈拍
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q146

- category: 循環器
- subcategory: 肺循環
- difficulty: 3
- final_type: text_mcq
- question: 動脈血・静脈血について正しいものはどれか。
- choices:
  - A: 酸素を多く含む血液を動脈血、二酸化炭素を多く含む血液を静脈血といい、血管の種類とは必ずしも一致しない。
  - B: 動脈を流れる血液は常に動脈血である。
  - C: 静脈を流れる血液は常に静脈血である。
  - D: 動脈血・静脈血という区別は血管の名称と完全に一致する。
- answer: 酸素を多く含む血液を動脈血、二酸化炭素を多く含む血液を静脈血といい、血管の種類とは必ずしも一致しない。
- explanation: 動脈血(酸素に富む血液)・静脈血(二酸化炭素に富む血液)という分類は血液の性状による区別であり、血管の種類(動脈・静脈)とは異なる。肺動脈には静脈血が、肺静脈には動脈血が流れる点に注意が必要である。
- tags: 動脈血, 静脈血, 肺循環
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q147

- category: 循環器
- subcategory: 体循環
- difficulty: 2
- final_type: text_mcq
- question: 体循環の血液が通る経路として正しいものはどれか。
- choices:
  - A: 左心室→大動脈→全身の毛細血管→上大静脈・下大静脈→右心房
  - B: 右心室→肺動脈→肺→肺静脈→左心房
  - C: 左心房→僧帽弁→左心室→大動脈
  - D: 右心房→三尖弁→右心室→大動脈
- answer: 左心室→大動脈→全身の毛細血管→上大静脈・下大静脈→右心房
- explanation: 体循環は、左心室から拍出された血液が大動脈を経て全身の毛細血管でガス交換・物質交換を行い、上大静脈・下大静脈を経て右心房へ戻る経路である。選択肢Bは肺循環の経路である。
- tags: 体循環, 全身循環
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q148

- category: 循環器
- subcategory: 肺循環
- difficulty: 2
- final_type: text_mcq
- question: 肺循環の血液が通る経路として正しいものはどれか。
- choices:
  - A: 右心室→肺動脈→肺の毛細血管→肺静脈→左心房
  - B: 左心室→大動脈→全身→大静脈→右心房
  - C: 右心房→肺動脈→肺→肺静脈→左心室
  - D: 左心房→肺静脈→肺→肺動脈→右心室
- answer: 右心室→肺動脈→肺の毛細血管→肺静脈→左心房
- explanation: 肺循環は、右心室から拍出された血液が肺動脈を経て肺の毛細血管でガス交換を行い、肺静脈を経て左心房へ戻る経路である。既存Q014・Q019の内容を経路全体として統合する。
- tags: 肺循環
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q149

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 2
- final_type: text_mcq
- question: 心拍数の自律神経による調節について正しいものはどれか。
- choices:
  - A: 交感神経は心拍数を増加させ、副交感神経(迷走神経)は心拍数を減少させる。
  - B: 交感神経は心拍数を減少させる。
  - C: 心拍数は自律神経の影響を受けない。
  - D: 副交感神経は心拍数を増加させる。
- answer: 交感神経は心拍数を増加させ、副交感神経(迷走神経)は心拍数を減少させる。
- explanation: 心拍数は自律神経系によって調節されており、交感神経の興奮は心拍数を増加させ、副交感神経(迷走神経)の興奮は心拍数を減少させる。
- tags: 自律神経, 心拍数
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: Q243をリンパ系内容へ置換したことによりQ149との重複は解消。

## Q150

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 2
- final_type: text_mcq
- question: 心臓における心房と心室の位置関係として正しいものはどれか。
- choices:
  - A: 心房は心臓の上後方に、心室は下前方に位置する。
  - B: 心房は心臓の下前方に、心室は上後方に位置する。
  - C: 心房と心室は左右に並んで位置する。
  - D: 心房と心室の位置関係に規則性はない。
- answer: 心房は心臓の上後方に、心室は下前方に位置する。
- explanation: 心臓において、心房は上後方に、心室は下前方に位置する。既存Q064の4腔image問題で学んだ左右の位置関係に加え、上下・前後の位置関係を確認する。
- tags: 心房, 心室, 心臓の位置
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q224

- category: 循環器
- subcategory: 心臓の機能
- difficulty: 2
- final_type: text_mcq
- question: 後負荷について正しいものはどれか。
- choices:
  - A: 心室が血液を送り出す際に打ち勝たなければならない抵抗(動脈圧など)である。
  - B: 心室に戻ってくる血液量そのものである。
  - C: 後負荷は心臓の重さを表す指標である。
  - D: 後負荷は心拍数と同じ意味である。
- answer: 心室が血液を送り出す際に打ち勝たなければならない抵抗(動脈圧など)である。
- explanation: 後負荷は、心室が収縮して血液を送り出す際に打ち勝たなければならない抵抗であり、主に動脈圧(血圧)によって規定される。既存Q131の前負荷と対をなす概念である。
- tags: 後負荷, 前負荷
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q225

- category: 循環器
- subcategory: 血圧
- difficulty: 1
- final_type: text_mcq
- question: 末梢血管抵抗を規定する要因として、最も影響が大きいものはどれか。
- choices:
  - A: 血管(特に細動脈)の内腔の半径
  - B: 血液の色
  - C: 心臓の位置
  - D: 静脈弁の数
- answer: 血管(特に細動脈)の内腔の半径
- explanation: 末梢血管抵抗は、血管、特に細動脈の内腔の半径の変化によって大きく規定される。血管が収縮し半径が小さくなると抵抗は大きく増加する。
- tags: 末梢血管抵抗, 細動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q226

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 微小循環について正しいものはどれか。
- choices:
  - A: 細動脈から毛細血管を経て細静脈に至る、組織との物質交換の場である。
  - B: 微小循環は大動脈と大静脈の間を直接つなぐ循環である。
  - C: 微小循環に毛細血管は含まれない。
  - D: 微小循環は心臓の内部のみで完結する。
- answer: 細動脈から毛細血管を経て細静脈に至る、組織との物質交換の場である。
- explanation: 微小循環は、細動脈から毛細血管を経て細静脈に至る血流の経路であり、組織との物質交換(既存Q137)が行われる場である。
- tags: 微小循環, 細動脈, 細静脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q227

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 細動脈の役割について正しいものはどれか。
- choices:
  - A: 血管平滑筋の収縮・弛緩により内腔を変化させ、組織への血流量を調節する。
  - B: 細動脈には平滑筋が存在しない。
  - C: 細動脈は血流量の調節に関与しない。
  - D: 細動脈は静脈の一種である。
- answer: 血管平滑筋の収縮・弛緩により内腔を変化させ、組織への血流量を調節する。
- explanation: 細動脈は豊富な血管平滑筋をもち、その収縮・弛緩によって内腔の太さを変化させることで、末梢血管抵抗(Q225)や組織への血流量を調節する「抵抗血管」としての役割を担う。
- tags: 細動脈, 血管平滑筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q228

- category: 循環器
- subcategory: 心臓の位置
- difficulty: 1
- final_type: text_mcq
- question: 成人の心臓の大きさの目安について、最も近いものはどれか。
- choices:
  - A: 本人のにぎりこぶしとほぼ同じ大きさ
  - B: 頭部とほぼ同じ大きさ
  - C: 手のひら1枚分より大きく、頭部ほどの大きさ
  - D: 米粒ほどの大きさ
- answer: 本人のにぎりこぶしとほぼ同じ大きさ
- explanation: 成人の心臓の大きさは、本人のにぎりこぶしとほぼ同じ程度とされることが多い。
- tags: 心臓の大きさ
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: 授業内容として位置づいている代表値であり、既に適切な「約」「おおよそ」等の表現を使用していることを確認。numeric flag解除。

## Q229

- category: 循環器
- subcategory: 心臓の位置
- difficulty: 2
- final_type: text_mcq
- question: 解剖学的正位における心臓の向きについて正しいものはどれか。
- choices:
  - A: 心尖は左前下方を、心底は右後上方を向く。
  - B: 心尖は右前下方を、心底は左後上方を向く。
  - C: 心臓は完全に左右対称に位置する。
  - D: 心尖は上方を向く。
- answer: 心尖は左前下方を、心底は右後上方を向く。
- explanation: 心臓は胸腔内でやや斜めに位置し、心尖(既存Q016)は左前下方を、心底(既存Q125)は右後上方を向く。
- tags: 心尖, 心底, 心臓の位置
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q230

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 1
- final_type: text_mcq
- question: 心室中隔について正しいものはどれか。
- choices:
  - A: 左心室と右心室を隔てる壁である。
  - B: 左心房と右心房を隔てる壁である。
  - C: 心臓の外側を包む膜である。
  - D: 心室中隔は存在しない構造である。
- answer: 左心室と右心室を隔てる壁である。
- explanation: 心室中隔は左心室と右心室を隔てる筋性の壁であり、既存Q064(4腔image)・Q128(心室壁の厚さ)の内容を補完する。
- tags: 心室中隔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q231

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 1
- final_type: text_mcq
- question: 心房中隔について正しいものはどれか。
- choices:
  - A: 左心房と右心房を隔てる壁である。
  - B: 左心室と右心室を隔てる壁である。
  - C: 心房中隔は存在しない構造である。
  - D: 心房中隔は血液を通す構造である。
- answer: 左心房と右心房を隔てる壁である。
- explanation: 心房中隔は左心房と右心房を隔てる壁であり、心室中隔(Q230)と対をなす構造である。
- tags: 心房中隔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q232

- category: 循環器
- subcategory: 心臓の内部構造
- difficulty: 2
- final_type: text_mcq
- question: 右心房へ直接流入する血管の組み合わせとして正しいものはどれか。
- choices:
  - A: 上大静脈・下大静脈・冠状静脈洞
  - B: 肺静脈・上大静脈・大動脈
  - C: 肺動脈・下大静脈・冠状動脈
  - D: 大動脈・肺静脈・冠状静脈洞
- answer: 上大静脈・下大静脈・冠状静脈洞
- explanation: 右心房には上大静脈・下大静脈から体循環の静脈血が流入し、心筋を還流した静脈血の多くは冠状静脈洞から流入する。
- tags: 右心房, 上大静脈, 下大静脈, 冠状静脈洞
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「僧帽弁の位置として正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。 / HIGH重複（Q018と同一事実の逆方向出題）解消のため、右心房への流入血管という別内容へ置換。

## Q233

- category: 循環器
- subcategory: 心臓弁
- difficulty: 1
- final_type: text_mcq
- question: 大動脈弁の位置として正しいものはどれか。
- choices:
  - A: 左心室と大動脈の間
  - B: 右心室と肺動脈の間
  - C: 左心房と左心室の間
  - D: 右心房と右心室の間
- answer: 左心室と大動脈の間
- explanation: 大動脈弁は左心室と大動脈の間に位置する半月弁(動脈弁)である。既存Q070(肺動脈弁の位置)と対をなす。
- tags: 大動脈弁, 半月弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q234

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 3
- final_type: text_mcq
- question: 冠動脈による心筋への血流について正しいものはどれか。
- choices:
  - A: 心室が拡張する時期に、より多くの血流が心筋に供給される。
  - B: 心室が収縮する時期に、より多くの血流が心筋に供給される。
  - C: 冠動脈の血流は心周期の影響を受けない。
  - D: 冠動脈は心房にのみ血流を供給する。
- answer: 心室が拡張する時期に、より多くの血流が心筋に供給される。
- explanation: 心室収縮期には心筋内の血管が圧迫されるため、冠動脈による心筋への血流は主に心室拡張期に多く供給される。既存の心周期(Q123)と冠状動脈(既存Q027,073,074)を統合する。
- tags: 冠状動脈, 心周期
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q235

- category: 循環器
- subcategory: 血圧
- difficulty: 1
- final_type: text_mcq
- question: 脈圧について正しいものはどれか。
- choices:
  - A: 収縮期血圧と拡張期血圧の差である。
  - B: 収縮期血圧と拡張期血圧の平均である。
  - C: 脈圧は心拍数と同じ意味である。
  - D: 脈圧は血圧とは無関係の指標である。
- answer: 収縮期血圧と拡張期血圧の差である。
- explanation: 脈圧は収縮期血圧(既存Q132)と拡張期血圧の差であり、一回拍出量や動脈の弾性(既存Q134)を反映する指標の一つである。
- tags: 脈圧, 血圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q236

- category: 循環器
- subcategory: 血圧
- difficulty: 2
- final_type: text_mcq
- question: 平均血圧の考え方について正しいものはどれか。
- choices:
  - A: 心周期全体を通じた血圧の平均であり、拡張期血圧の影響を強く受ける。
  - B: 平均血圧は収縮期血圧と同じ値である。
  - C: 平均血圧は脈圧と同じ意味である。
  - D: 平均血圧は心周期と無関係に決まる。
- answer: 心周期全体を通じた血圧の平均であり、拡張期血圧の影響を強く受ける。
- explanation: 心周期のうち拡張期の時間が収縮期より長いため、平均血圧は拡張期血圧の影響を強く受ける値となり、臓器灌流を規定する重要な指標とされる。
- tags: 平均血圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q237

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: text_mcq
- question: 循環血液量の目安について、最も近いものはどれか。
- choices:
  - A: 体重のおよそ8%(体重1kgあたり約80mL)
  - B: 体重のおよそ60%
  - C: 体重のおよそ1%
  - D: 体重とは無関係に一定である。
- answer: 体重のおよそ8%(体重1kgあたり約80mL)
- explanation: 循環血液量はおおむね体重の8%程度(体重1kgあたり約80mL)とされる。既存Q114(体液の水分割合、体重の約60%)とは区別して理解する必要がある。
- tags: 循環血液量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q238

- category: 循環器
- subcategory: 血管
- difficulty: 1
- final_type: text_mcq
- question: 血液の粘性が血流に与える影響について正しいものはどれか。
- choices:
  - A: 血液の粘性が高いほど、血流に対する抵抗は大きくなる。
  - B: 血液の粘性は血流抵抗に影響しない。
  - C: 血液の粘性が高いほど血流抵抗は小さくなる。
  - D: 血液に粘性は存在しない。
- answer: 血液の粘性が高いほど、血流に対する抵抗は大きくなる。
- explanation: 血液の粘性(ねばりの度合い)が高いほど、血管内を流れる際の抵抗は大きくなり、血圧や血流量に影響する。
- tags: 血液の粘性, 血流
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q239

- category: 循環器
- subcategory: 血圧
- difficulty: 2
- final_type: text_mcq
- question: 圧受容器による血圧調節について正しいものはどれか。
- choices:
  - A: 頸動脈洞・大動脈弓の圧受容器が血圧の変化を感知し、自律神経を介して調節する。
  - B: 圧受容器は血糖値を感知する受容器である。
  - C: 血圧の調節に圧受容器は関与しない。
  - D: 圧受容器は腎臓にのみ存在する。
- answer: 頸動脈洞・大動脈弓の圧受容器が血圧の変化を感知し、自律神経を介して調節する。
- explanation: 頸動脈洞・大動脈弓には血圧の変化を感知する圧受容器が存在し、その情報が自律神経系(既存Q149)を介して心拍数や血管の収縮・拡張を調節し、血圧を一定範囲に保つ。
- tags: 圧受容器, 血圧調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q240

- category: 循環器
- subcategory: 刺激伝導系
- difficulty: 1
- final_type: image_mcq
- question: 刺激伝導系の模式図の①で示された、房室結節からの興奮を心室中隔へ伝え、左右の脚へ続く構造はどれか。
- choices:
  - A: 洞房結節
  - B: 房室結節
  - C: 房室束
  - D: プルキンエ線維
- answer: 房室束
- explanation: 房室束は房室結節からの興奮を心室中隔へ伝え、左右の脚へ続く刺激伝導系の構造である。
- tags: 刺激伝導系, 房室束
- image_asset: q025_conduction_system.webp
- marker_target: 房室束
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: 旧設問「刺激伝導系の模式図の①〜④は興奮が伝わる順序を示している。①〜④に対応する組み合わせとして正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。 / HIGH重複（Q022と同一の順序知識をtext/imageで問うのみ）解消のため、順序問題から房室束の単独同定問題（image_mcq）へ変更。overlay座標は画像生成・実装時に実測する。

## Q241

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 1
- final_type: text_mcq
- question: 洞房結節への血液供給について正しいものはどれか。
- choices:
  - A: 多くの場合、右冠動脈の枝から血液供給を受ける。
  - B: 洞房結節には血液供給がない。
  - C: 洞房結節は肺動脈から直接血液を受ける。
  - D: 洞房結節への血液供給は左冠動脈のみによる。
- answer: 多くの場合、右冠動脈の枝から血液供給を受ける。
- explanation: 洞房結節は多くの場合、右冠動脈の枝から血液供給を受ける。既存の冠状動脈(Q027,073,074)と刺激伝導系(Q025,240)を接続する。
- tags: 洞房結節, 冠状動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q242

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 重力が静脈還流に与える影響について正しいものはどれか。
- choices:
  - A: 立位では下肢からの静脈還流が重力の影響を受けて不利になる。
  - B: 重力は静脈還流に影響しない。
  - C: 臥位では静脈還流が困難になる。
  - D: 重力は動脈血流にのみ影響する。
- answer: 立位では下肢からの静脈還流が重力の影響を受けて不利になる。
- explanation: 立位では下肢からの静脈血が重力に逆らって心臓へ戻る必要があり、既存Q135の筋ポンプ作用や静脈弁(Q136)がこれを助けている。
- tags: 静脈還流, 重力
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q243

- category: 循環器
- subcategory: リンパ系
- difficulty: 1
- final_type: text_mcq
- question: リンパ管に回収されたリンパ液が最終的に静脈系へ戻る部位はどれか。
- choices:
  - A: 静脈角
  - B: 大動脈弓
  - C: 肺静脈
  - D: 冠状静脈洞
- answer: 静脈角
- explanation: リンパ管に回収されたリンパ液は、主なリンパ本幹を経て静脈角で静脈系へ還流する。
- tags: リンパ系, リンパ管, 静脈角
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「心臓に分布する自律神経について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。 / Q149とのMEDIUM重複（自律神経による心拍調節の近接）解消のため、循環器授業で明確に扱うリンパ系の内容へ置換。

## Q244

- category: 循環器
- subcategory: 血圧
- difficulty: 1
- final_type: text_mcq
- question: 血圧測定に一般的に用いられる部位はどれか。
- choices:
  - A: 上腕動脈
  - B: 頸動脈
  - C: 大腿動脈
  - D: 橈骨動脈のみ
- answer: 上腕動脈
- explanation: 血圧測定には一般に上腕動脈が用いられる。既存Q145(脈拍の触知部位)と関連づけて理解する。
- tags: 血圧測定, 上腕動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q245

- category: 循環器
- subcategory: 心臓弁
- difficulty: 2
- final_type: text_mcq
- question: 三尖弁・僧帽弁の位置関係の統合として正しいものはどれか。
- choices:
  - A: 三尖弁は右心房・右心室間、僧帽弁は左心房・左心室間に位置し、いずれも房室弁である。
  - B: 三尖弁・僧帽弁はどちらも右心系に位置する。
  - C: 三尖弁は左心系、僧帽弁は右心系に位置する。
  - D: 三尖弁・僧帽弁は半月弁に分類される。
- answer: 三尖弁は右心房・右心室間、僧帽弁は左心房・左心室間に位置し、いずれも房室弁である。
- explanation: 既存Q069（三尖弁）とQ232（僧帽弁）を統合し、両者がともに房室弁であり、それぞれ右心系・左心系に対応することを確認する。
- tags: 三尖弁, 僧帽弁, 房室弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 「既存2問の正答をそのまま1つにまとめただけ」に該当しないか再評価した。Q232が別内容へ置換されたことで直接の重複は解消しており、三尖弁・僧帽弁の左右対応を同時に問う点は独立した学習目標（左右関係の混同防止）として教育的価値があると判断し、内容は維持する。

## Q246

- category: 循環器
- subcategory: 心臓弁
- difficulty: 2
- final_type: text_mcq
- question: 肺動脈弁・大動脈弁が半月弁(動脈弁)と呼ばれる由来として正しいものはどれか。
- choices:
  - A: 三日月形をした3枚の弁尖からなることに由来する。
  - B: 心房と心室の間に位置することに由来する。
  - C: 腱索・乳頭筋によって支えられることに由来する。
  - D: 房室結節に隣接することに由来する。
- answer: 三日月形をした3枚の弁尖からなることに由来する。
- explanation: 肺動脈弁・大動脈弁は三日月形（半月形）をした3枚の弁尖から構成されることから半月弁と呼ばれる。腱索・乳頭筋による支持は房室弁の特徴であり、半月弁にはみられない。
- tags: 半月弁, 肺動脈弁, 大動脈弁
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 既存Q070・Q233の正答をそのまま組み合わせただけの構成（教育価値が低い）と判断し、半月弁という名称の由来（弁尖の形状）を問う、位置情報に依存しない別の学習目標へ再設計した。Q129で扱う腱索・乳頭筋（房室弁の特徴）との対比も明確化した。

## Q247

- category: 循環器
- subcategory: 心臓の機能
- difficulty: 3
- final_type: text_mcq
- question: 心臓のポンプ機能から組織への酸素供給までの一連の流れとして正しいものはどれか。
- choices:
  - A: 心拍出量に応じた血液が動脈を経て毛細血管に至り、拡散によって組織へ酸素が供給される。
  - B: 組織への酸素供給は静脈血によって直接行われる。
  - C: 心拍出量は組織への酸素供給と無関係である。
  - D: 毛細血管では酸素の受け渡しは行われない。
- answer: 心拍出量に応じた血液が動脈を経て毛細血管に至り、拡散によって組織へ酸素が供給される。
- explanation: 心拍出量(既存Q130)に応じて送り出された血液は動脈を経て毛細血管(既存Q137)に至り、拡散によって組織へ酸素が供給される。循環器領域全体を貫く一連の流れを統合する。
- tags: 心拍出量, 組織灌流
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q248

- category: 循環器
- subcategory: 心臓の位置
- difficulty: 2
- final_type: text_mcq
- question: 心臓の位置についての統合的理解として正しいものはどれか。
- choices:
  - A: 心尖は左第5肋間・鎖骨中線付近に、心底は上後方の大血管の出入り口として位置する。
  - B: 心尖と心底は同じ位置を指す。
  - C: 心尖は右側に、心底は左側に位置する。
  - D: 心臓の位置に規則性はない。
- answer: 心尖は左第5肋間・鎖骨中線付近に、心底は上後方の大血管の出入り口として位置する。
- explanation: 既存Q016（心尖の位置）とQ125（心底の位置）を統合し、心臓全体の位置関係を整理する。
- tags: 心尖, 心底
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q249

- category: 循環器
- subcategory: 血管
- difficulty: 2
- final_type: text_mcq
- question: 体循環全体の血管抵抗について正しいものはどれか。
- choices:
  - A: 末梢血管抵抗の大部分は細動脈が担う。
  - B: 末梢血管抵抗の大部分は大動脈が担う。
  - C: 静脈が末梢血管抵抗の大部分を担う。
  - D: 毛細血管が末梢血管抵抗の大部分を担う。
- answer: 末梢血管抵抗の大部分は細動脈が担う。
- explanation: 体循環全体の末梢血管抵抗のうち、大部分は平滑筋に富み内腔を大きく変化させられる細動脈(既存Q227)が担っている。
- tags: 末梢血管抵抗, 細動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q250

- category: 循環器
- subcategory: 血圧
- difficulty: 3
- final_type: text_mcq
- question: 臥位から立位への体位変換時に生じる循環の反応について正しいものはどれか。
- choices:
  - A: 下肢に血液が移動しやすくなるため、圧受容器を介して心拍数増加などの代償反応が生じる。
  - B: 体位変換は循環にいかなる影響も与えない。
  - C: 立位になると静脈還流は増加する。
  - D: 体位変換時の循環調節に自律神経は関与しない。
- answer: 下肢に血液が移動しやすくなるため、圧受容器を介して心拍数増加などの代償反応が生じる。
- explanation: 立位になると重力により下肢に血液が移動しやすくなり静脈還流が一時的に減少するが、圧受容器(既存Q239)を介した自律神経の反射により心拍数増加などの代償反応が生じ、血圧が維持される。
- tags: 体位変換, 圧受容器
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q251

- category: 循環器
- subcategory: 血圧
- difficulty: 3
- final_type: text_mcq
- question: 血圧の調節機構について正しいものはどれか。
- choices:
  - A: 自律神経による速やかな調節と、レニン-アンジオテンシン系などによる比較的緩やかな体液性調節の両方が存在する。
  - B: 血圧は神経性の調節のみを受ける。
  - C: 血圧はホルモンによる調節のみを受ける。
  - D: 血圧の調節機構は存在しない。
- answer: 自律神経による速やかな調節と、レニン-アンジオテンシン系などによる比較的緩やかな体液性調節の両方が存在する。
- explanation: 血圧は、圧受容器を介した自律神経による速やかな調節と、レニン-アンジオテンシン系などによる比較的緩やかな体液性調節によって維持される。レニン自体は腎臓から分泌される酵素である。
- tags: 血圧調節, 自律神経, ホルモン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: 「レニンなどのホルモン」という不正確な表現（レニン自体は酵素）を修正し、「レニン-アンジオテンシン系などによる比較的緩やかな体液性調節」という正確な表現へ変更した。

## Q252

- category: 循環器
- subcategory: 冠状動脈
- difficulty: 2
- final_type: text_mcq
- question: 冠循環全体の血液の流れとして正しいものはどれか。
- choices:
  - A: 冠状動脈が心筋に血液を供給し、多くは冠状静脈洞を経て右心房へ還流する。
  - B: 冠状動脈は心筋に血液を供給しない。
  - C: 冠循環の血液はすべて肺静脈へ還流する。
  - D: 冠状静脈洞は動脈血を心筋へ供給する構造である。
- answer: 冠状動脈が心筋に血液を供給し、多くは冠状静脈洞を経て右心房へ還流する。
- explanation: 冠状動脈(既存Q027,073,074)が心筋に血液を供給し、心筋を還流した血液の多くは冠状静脈洞(既存Q140)を経て右心房へ還流する。冠循環の往復経路を統合する。
- tags: 冠状動脈, 冠状静脈洞, 冠循環
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 既存の冠状動脈問題群の再言及ではないか再評価した。動脈性の灌流だけでなく静脈還流（冠状静脈洞）まで含めた「冠循環の全体経路」を問う点は、個別の暗記では見落とされやすい統合的理解であり、教育的価値があると判断し、内容は維持する。

### 呼吸器（75問）

## Q028

- category: 呼吸器
- subcategory: 呼吸の分類
- difficulty: 1
- final_type: text_mcq
- question: 呼吸の3段階として正しい組み合わせはどれか。
- choices:
  - A: 吸気・呼気・換気
  - B: 外呼吸・内呼吸・細胞呼吸
  - C: 肺呼吸・胸式呼吸・腹式呼吸
  - D: 換気・循環・排泄
- answer: 外呼吸・内呼吸・細胞呼吸
- explanation: 授業では呼吸を外呼吸、内呼吸、細胞呼吸の3段階で整理している。
- tags: 外呼吸, 内呼吸, 細胞呼吸
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: 外呼吸・内呼吸・細胞呼吸の3段階分類は2026年度呼吸器授業で明示的に採用。現行内容を維持し、要確認事項なしと確定。

## Q029

- category: 呼吸器
- subcategory: 外呼吸
- difficulty: 1
- final_type: text_mcq
- question: 外呼吸が行われる主な場所はどれか。
- choices:
  - A: 肺胞と肺毛細血管の間
  - B: 全身の組織細胞と毛細血管の間
  - C: ミトコンドリア内部
  - D: 左心室と大動脈の間
- answer: 肺胞と肺毛細血管の間
- explanation: 外呼吸は肺胞と肺毛細血管の間で行われるガス交換である。
- tags: 外呼吸, 肺胞, 肺毛細血管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q030

- category: 呼吸器
- subcategory: 内呼吸
- difficulty: 1
- final_type: text_mcq
- question: 内呼吸における酸素の主な移動方向はどれか。
- choices:
  - A: 組織細胞 → 血液
  - B: 血液 → 組織細胞
  - C: 肺胞 → 外気
  - D: 組織細胞 → 肺胞
- answer: 血液 → 組織細胞
- explanation: 内呼吸では血液から組織細胞へ酸素が移動し、二酸化炭素は組織細胞から血液へ移動する。
- tags: 内呼吸, 酸素
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q031

- category: 呼吸器
- subcategory: 気道
- difficulty: 1
- final_type: text_mcq
- question: 上気道に含まれるものはどれか。
- choices:
  - A: 鼻腔・咽頭・喉頭
  - B: 気管・気管支・細気管支
  - C: 呼吸細気管支・肺胞管・肺胞
  - D: 気管・肺胞・横隔膜
- answer: 鼻腔・咽頭・喉頭
- explanation: 上気道は鼻腔、咽頭、喉頭からなる。下気道は気管、気管支、細気管支である。
- tags: 上気道, 鼻腔, 咽頭, 喉頭
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q032

- category: 呼吸器
- subcategory: 上気道
- difficulty: 1
- final_type: image_mcq
- question: 呼吸器の模式図で①が示す部位はどれか。
- choices:
  - A: 鼻腔
  - B: 喉頭
  - C: 気管支
  - D: 肺胞
- answer: 喉頭
- explanation: 喉頭は上気道に含まれ、咽頭と気管の間に位置する。
- tags: 喉頭, 上気道
- image_asset: q032_larynx.webp
- marker_target: 喉頭
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q033

- category: 呼吸器
- subcategory: 咽頭
- difficulty: 1
- final_type: text_mcq
- question: 軟口蓋より上方に位置する咽頭の区分はどれか。
- choices:
  - A: 上咽頭
  - B: 中咽頭
  - C: 下咽頭
  - D: 喉頭
- answer: 上咽頭
- explanation: 咽頭は上咽頭、中咽頭、下咽頭に区分され、上咽頭は軟口蓋より上方に位置する。
- tags: 上咽頭, 咽頭
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q034

- category: 呼吸器
- subcategory: 導気部
- difficulty: 2
- final_type: text_mcq
- question: 導気部の終点にあたるものはどれか。
- choices:
  - A: 気管
  - B: 区域気管支
  - C: 終末細気管支
  - D: 肺胞
- answer: 終末細気管支
- explanation: 終末細気管支までが導気部で、その先の呼吸細気管支から呼吸部が始まる。
- tags: 終末細気管支, 導気部
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q035

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: image_mcq
- question: 肺の図で①が示す、右肺にのみ存在する肺葉はどれか。
- choices:
  - A: 上葉
  - B: 中葉
  - C: 下葉
  - D: 舌区
- answer: 中葉
- explanation: 右肺は上葉・中葉・下葉の3葉、左肺は上葉・下葉の2葉からなる。
- tags: 右肺, 中葉, 肺葉
- image_asset: q035_right_middle_lobe.webp
- marker_target: 右肺中葉
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q036

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: text_mcq
- question: 左右の肺葉数の組み合わせとして正しいものはどれか。
- choices:
  - A: 右2葉・左2葉
  - B: 右2葉・左3葉
  - C: 右3葉・左2葉
  - D: 右3葉・左3葉
- answer: 右3葉・左2葉
- explanation: 右肺は3葉、左肺は2葉である。
- tags: 肺葉, 右肺, 左肺
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q037

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: image_mcq
- question: 肺胞と毛細血管の図で、①の矢印が肺胞から血液へ向かっている。この物質はどれか。
- choices:
  - A: 酸素
  - B: 二酸化炭素
  - C: 尿素
  - D: グルコース
- answer: 酸素
- explanation: 外呼吸では酸素が肺胞から血液へ移動し、二酸化炭素は血液から肺胞へ移動する。
- tags: 肺胞, ガス交換, 酸素
- image_asset: q037_alveolar_gas_exchange.webp
- marker_target: 肺胞から血液へ向かう矢印
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q038

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 1
- final_type: text_mcq
- question: 主な吸気筋はどれか。
- choices:
  - A: 横隔膜
  - B: 上腕二頭筋
  - C: 大殿筋
  - D: 咬筋
- answer: 横隔膜
- explanation: 横隔膜は主吸気筋であり、横隔神経によって支配される。
- tags: 横隔膜, 吸気
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q039

- category: 呼吸器
- subcategory: 呼吸中枢
- difficulty: 2
- final_type: text_mcq
- question: 呼吸中枢が主に存在する部位の組み合わせはどれか。
- choices:
  - A: 延髄と橋
  - B: 小脳と脊髄
  - C: 視床と海馬
  - D: 大脳基底核と小脳
- answer: 延髄と橋
- explanation: 呼吸の自律的・周期的な制御には延髄および橋の呼吸中枢が関与する。
- tags: 延髄, 橋, 呼吸中枢
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q040

- category: 呼吸器
- subcategory: 気道分岐
- difficulty: 2
- final_type: image_mcq
- question: 気道分岐図の①で示された「呼吸部の始まり」にあたる部位はどれか。
- choices:
  - A: 主気管支
  - B: 区域気管支
  - C: 終末細気管支
  - D: 呼吸細気管支
- answer: 呼吸細気管支
- explanation: 終末細気管支までが導気部の末端であり、その先に続く呼吸細気管支から肺胞を壁の一部に持つようになり、呼吸部が始まる。
- tags: 呼吸細気管支, 気道分岐
- image_asset: q040_airway_branching.webp
- marker_target: 呼吸細気管支
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q041

- category: 呼吸器
- subcategory: 肺胞
- difficulty: 1
- final_type: image_mcq
- question: 図中①で示された、複数の肺胞が集合した最末端部はどれか。
- choices:
  - A: 終末細気管支
  - B: 呼吸細気管支
  - C: 肺胞管
  - D: 肺胞嚢
- answer: 肺胞嚢
- explanation: 呼吸細気管支から肺胞管を経て、複数の肺胞が集合する肺胞嚢へ至る。
- tags: 肺胞嚢, 肺胞
- image_asset: q041_alveolar_sac.webp
- marker_target: 肺胞嚢
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q077

- category: 呼吸器
- subcategory: 気道分岐
- difficulty: 1
- final_type: image_mcq
- question: 気道分岐図の②で示された部位はどれか。
- choices:
  - A: 区域気管支
  - B: 主気管支
  - C: 終末細気管支
  - D: 肺胞
- answer: 区域気管支
- explanation: 気管は主気管支→葉気管支→区域気管支→細気管支の順に分岐する。
- tags: 気管支, 区域気管支
- image_asset: q040_airway_branching.webp
- marker_target: 区域気管支
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q078

- category: 呼吸器
- subcategory: 細胞呼吸
- difficulty: 1
- final_type: text_mcq
- question: 細胞呼吸について正しいものはどれか。
- choices:
  - A: 肺胞で酸素を取り込むこと
  - B: 組織で二酸化炭素を回収すること
  - C: 細胞内でATPを産生すること
  - D: 咽頭で空気を送ること
- answer: 細胞内でATPを産生すること
- explanation: 細胞呼吸は細胞内、主にミトコンドリアで進む。
- tags: 細胞呼吸, ATP
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q079

- category: 呼吸器
- subcategory: 下気道
- difficulty: 1
- final_type: text_mcq
- question: 下気道に含まれるものはどれか。
- choices:
  - A: 気管
  - B: 鼻腔
  - C: 咽頭
  - D: 口腔
- answer: 気管
- explanation: 下気道は気管以下の気道を指し、気管・気管支・細気管支などが含まれる。鼻腔・咽頭・口腔は上気道または気道外の構造であり、下気道には含まれない。
- tags: 下気道, 気管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q080

- category: 呼吸器
- subcategory: 喉頭
- difficulty: 1
- final_type: text_mcq
- question: 喉頭について正しいものはどれか。
- choices:
  - A: 咽頭と気管の間に位置し、気道防御や発声に関わる。
  - B: 主に尿の通路である。
  - C: 横隔膜の一部である。
  - D: 肺胞に含まれる。
- answer: 咽頭と気管の間に位置し、気道防御や発声に関わる。
- explanation: 喉頭は咽頭と気管の間に位置し、誤嚥防止などの気道防御や発声に関わる複合器官である。
- tags: 喉頭, 気道防御, 発声
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q081

- category: 呼吸器
- subcategory: 気管
- difficulty: 1
- final_type: text_mcq
- question: 気管について正しいものはどれか。
- choices:
  - A: 成人で長さは約10cmである。
  - B: 食道の後ろに位置する。
  - C: 完全な骨性の管である。
  - D: 鼻腔に直接開く。
- answer: 成人で長さは約10cmである。
- explanation: 気管は食道の前にあり、約10cmである。
- tags: 気管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: 授業内容として位置づいている代表値であり、既に適切な「約」「おおよそ」等の表現を使用していることを確認。numeric flag解除。

## Q082

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: image_mcq
- question: 肺の図の①で示された、右肺の上葉と中葉を分ける裂はどれか。
- choices:
  - A: 水平裂
  - B: 斜裂
  - C: 矢状裂
  - D: 葉間裂全般
- answer: 水平裂
- explanation: 右肺は水平裂と斜裂により上葉・中葉・下葉の3葉に分かれる。水平裂は上葉と中葉を分ける。左肺には水平裂がなく、斜裂のみで上葉・下葉に分かれる。
- tags: 水平裂, 肺葉
- image_asset: q035_right_middle_lobe.webp
- marker_target: 水平裂
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q083

- category: 呼吸器
- subcategory: 呼吸調節
- difficulty: 2
- final_type: text_mcq
- question: 吸息時の呼吸筋の調節について正しいものはどれか。
- choices:
  - A: 横隔神経を介して横隔膜が収縮し、胸腔容積が増加する。
  - B: 肋間神経のみが吸息を制御する。
  - C: 吸息は随意的な調節のみで行われる。
  - D: 迷走神経が横隔膜を収縮させる。
- answer: 横隔神経を介して横隔膜が収縮し、胸腔容積が増加する。
- explanation: 吸息時には横隔神経を介して横隔膜が収縮し、胸腔容積が増加することで吸気が起こる。この調節の中枢は延髄・橋の呼吸中枢であり（Q039参照）、横隔神経・横隔膜という末梢の経路を理解することが本問の主眼である。
- tags: 横隔神経, 横隔膜, 呼吸筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q084

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: text_mcq
- question: 血液空気関門を構成する組み合わせとして正しいものはどれか。
- choices:
  - A: I型肺胞上皮細胞・基底膜・肺毛細血管内皮細胞
  - B: II型肺胞上皮細胞・弾性線維・気管支平滑筋
  - C: 線毛上皮・粘液層・軟骨
  - D: 漿膜・筋層・粘膜下層
- answer: I型肺胞上皮細胞・基底膜・肺毛細血管内皮細胞
- explanation: 血液空気関門は、肺胞気と毛細血管血液の間でガス交換が行われる薄い構造で、I型肺胞上皮細胞・基底膜・肺毛細血管内皮細胞の3層からなる。
- tags: 血液空気関門, 肺胞上皮細胞, 肺毛細血管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q085

- category: 呼吸器
- subcategory: 呼吸器系の構造分類
- difficulty: 1
- final_type: text_mcq
- question: 呼吸器系の構造分類として正しいものはどれか。
- choices:
  - A: 導気部と呼吸部に大別される。
  - B: 上気道と下気道の2つのみに分けられる。
  - C: 肺胞のみで構成される。
  - D: 導気部はガス交換を行う。
- answer: 導気部と呼吸部に大別される。
- explanation: 呼吸器系の気道は、ガス交換を行わない導気部と、ガス交換を行う呼吸部に大別される。
- tags: 導気部, 呼吸部
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q086

- category: 呼吸器
- subcategory: 下気道
- difficulty: 1
- final_type: text_mcq
- question: 下気道の役割として正しいものはどれか。
- choices:
  - A: 空気の通路となり、線毛運動などによる防御機構を備える。
  - B: ガス交換のみを行う。
  - C: 消化液を分泌する。
  - D: 血液を貯蔵する。
- answer: 空気の通路となり、線毛運動などによる防御機構を備える。
- explanation: 下気道は空気の通路であると同時に、線毛運動などにより異物を排除する防御機構を備える。
- tags: 下気道, 線毛運動
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q087

- category: 呼吸器
- subcategory: 呼吸部
- difficulty: 1
- final_type: text_mcq
- question: 呼吸部に含まれるものはどれか。
- choices:
  - A: 終末細気管支、主気管支、肺胞
  - B: 呼吸細気管支、肺胞管、肺胞
  - C: 葉気管支、区域気管支、肺胞
  - D: 鼻腔、喉頭、肺胞
- answer: 呼吸細気管支、肺胞管、肺胞
- explanation: 呼吸部は、呼吸細気管支→肺胞管→肺胞嚢・肺胞へと続く、ガス交換を行う部分である。
- tags: 呼吸部, 呼吸細気管支, 肺胞管, 肺胞
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q151

- category: 呼吸器
- subcategory: 上気道
- difficulty: 1
- final_type: text_mcq
- question: 鼻腔の機能について正しいものはどれか。
- choices:
  - A: 吸入した空気を加温・加湿し、異物を除去する。
  - B: 鼻腔はガス交換を行う場である。
  - C: 鼻腔は消化液を分泌する。
  - D: 鼻腔に線毛は存在しない。
- answer: 吸入した空気を加温・加湿し、異物を除去する。
- explanation: 鼻腔は吸入した空気を加温・加湿するとともに、鼻毛や粘液・線毛運動によって異物を捕捉・除去する、上気道の防御機構の要である。
- tags: 鼻腔, 上気道
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q152

- category: 呼吸器
- subcategory: 気管支
- difficulty: 1
- final_type: image_mcq
- question: 気道分岐図の①で示された、より太く短く、垂直に近い角度で分岐する気管支はどれか。
- choices:
  - A: 右主気管支
  - B: 左主気管支
  - C: 葉気管支
  - D: 終末細気管支
- answer: 右主気管支
- explanation: 右主気管支は左主気管支に比べて太く短く、気管からより垂直に近い角度で分岐するため、誤嚥した異物は右主気管支に入りやすい。
- tags: 主気管支, 右主気管支
- image_asset: q040_airway_branching.webp
- marker_target: 右主気管支
- image_status: planned_shared
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q153

- category: 呼吸器
- subcategory: 気管支
- difficulty: 1
- final_type: image_mcq
- question: 気道分岐図の②で示された、肺葉ごとに分布する気管支はどれか。
- choices:
  - A: 葉気管支
  - B: 主気管支
  - C: 終末細気管支
  - D: 呼吸細気管支
- answer: 葉気管支
- explanation: 主気管支は肺葉ごとに枝分かれし、葉気管支となる(右肺は3本、左肺は2本)。さらに葉気管支は区域気管支(既存Q077)へと枝分かれする。
- tags: 葉気管支
- image_asset: q040_airway_branching.webp
- marker_target: 葉気管支
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q154

- category: 呼吸器
- subcategory: 肺胞
- difficulty: 1
- final_type: image_mcq
- question: 肺胞嚢周辺の模式図の①で示された、呼吸細気管支に続き肺胞嚢へ至る管状の構造はどれか。
- choices:
  - A: 肺胞管
  - B: 終末細気管支
  - C: 主気管支
  - D: 喉頭
- answer: 肺胞管
- explanation: 肺胞管は呼吸細気管支に続く管状構造で、その周囲や末端に多数の肺胞が開口し、肺胞嚢へとつながる。
- tags: 肺胞管, 肺胞嚢
- image_asset: q041_alveolar_sac.webp
- marker_target: 肺胞管
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q155

- category: 呼吸器
- subcategory: 胸膜
- difficulty: 2
- final_type: image_mcq
- question: 胸腔断面模式図の①・②は、肺と胸壁の間にある2層の膜を示している。①・②の組み合わせとして正しいものはどれか。
- choices:
  - A: ①臓側胸膜 ②壁側胸膜
  - B: ①壁側胸膜 ②臓側胸膜
  - C: ①横隔膜 ②心膜
  - D: ①気管支 ②肺胞
- answer: ①臓側胸膜 ②壁側胸膜
- explanation: 肺の表面を直接覆う膜を臓側胸膜、胸壁の内側を覆う膜を壁側胸膜という。両者の間の空間を胸膜腔という。
- tags: 胸膜, 臓側胸膜, 壁側胸膜
- image_asset: pleura_cross_section (新規・仮称)
- marker_target: ①臓側胸膜→②壁側胸膜の順にoverlaysを設定
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q156

- category: 呼吸器
- subcategory: 胸膜
- difficulty: 2
- final_type: text_mcq
- question: 胸膜腔について正しいものはどれか。
- choices:
  - A: 陰圧に保たれており、肺の拡張を助けている。
  - B: 胸膜腔は空気で満たされ、常に大気圧と等しい。
  - C: 胸膜腔は心臓の内部にある空間である。
  - D: 胸膜腔には常に大量の液体が貯留している。
- answer: 陰圧に保たれており、肺の拡張を助けている。
- explanation: 胸膜腔は正常時、大気圧より低い陰圧に保たれており、この陰圧が肺を胸郭内で拡張した状態に保つのを助けている。少量の胸膜液が潤滑の役割を果たす。
- tags: 胸膜腔, 陰圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q157

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 2
- final_type: text_mcq
- question: 呼気の仕組みについて正しいものはどれか。
- choices:
  - A: 安静時の呼気は主に胸郭・肺の弾性による受動的な過程である。
  - B: 呼気は常に呼気筋の能動的な収縮によってのみ生じる。
  - C: 呼気時には横隔膜がさらに収縮する。
  - D: 呼気は吸気と全く同じ仕組みで生じる。
- answer: 安静時の呼気は主に胸郭・肺の弾性による受動的な過程である。
- explanation: 安静時の呼気は、吸気筋(横隔膜など)の弛緩と、胸郭・肺の弾性による受動的な過程である。努力呼気時には呼気筋(内肋間筋・腹筋群など)が能動的に働く。
- tags: 呼気, 呼吸筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q158

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 1
- final_type: text_mcq
- question: 努力呼気時に働く筋として正しいものはどれか。
- choices:
  - A: 内肋間筋・腹筋群
  - B: 横隔膜・外肋間筋
  - C: 僧帽筋のみ
  - D: 呼気に働く筋は存在しない。
- answer: 内肋間筋・腹筋群
- explanation: 努力呼気時には、内肋間筋が肋骨を引き下げ、腹筋群の収縮が腹圧を高めて横隔膜を押し上げることで、より強く息を吐き出す。既存Q038の吸気筋(横隔膜・外肋間筋)と対をなす。
- tags: 呼気筋, 内肋間筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q159

- category: 呼吸器
- subcategory: 換気
- difficulty: 1
- final_type: text_mcq
- question: 1回換気量について正しいものはどれか。
- choices:
  - A: 安静時の呼吸で1回に出入りする空気の量である。
  - B: 最大限に吸い込める空気の総量である。
  - C: 呼出しきれずに肺に残る空気の量である。
  - D: 気道内に存在する空気の総量である。
- answer: 安静時の呼吸で1回に出入りする空気の量である。
- explanation: 1回換気量は、安静時の呼吸で1回の吸息・呼息の際に出入りする空気の量を指す。
- tags: 肺気量, 1回換気量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q160

- category: 呼吸器
- subcategory: 換気
- difficulty: 1
- final_type: text_mcq
- question: 肺活量について正しいものはどれか。
- choices:
  - A: 最大に息を吸った状態から、最大限に吐き出せる空気の量である。
  - B: 肺に含まれる空気の全容量を指す。
  - C: 1回換気量と同じ意味である。
  - D: 呼出しきれずに残る空気の量である。
- answer: 最大に息を吸った状態から、最大限に吐き出せる空気の量である。
- explanation: 肺活量は、最大に息を吸い込んだ状態から、最大限に吐き出すことのできる空気の量であり、1回換気量に予備吸気量・予備呼気量を加えたものに相当する。
- tags: 肺気量, 肺活量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q161

- category: 呼吸器
- subcategory: 換気
- difficulty: 1
- final_type: text_mcq
- question: 残気量について正しいものはどれか。
- choices:
  - A: 最大限に呼出した後でも、肺内に残っている空気の量である。
  - B: 残気量はゼロになりうる。
  - C: 残気量は肺活量に含まれる。
  - D: 残気量は1回換気量と同じ量である。
- answer: 最大限に呼出した後でも、肺内に残っている空気の量である。
- explanation: 残気量は、最大限に呼出した後でも肺の虚脱を防ぐために肺内に残っている空気の量であり、肺活量には含まれない。
- tags: 肺気量, 残気量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q162

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 1
- final_type: text_mcq
- question: 血液中の酸素の運搬について正しいものはどれか。
- choices:
  - A: その大部分がヘモグロビンと結合して運ばれる。
  - B: 酸素はすべて血漿に溶解した状態で運ばれる。
  - C: 酸素は白血球によって運ばれる。
  - D: 酸素は血液中では運搬されない。
- answer: その大部分がヘモグロビンと結合して運ばれる。
- explanation: 血液中の酸素は、その大部分が赤血球中のヘモグロビンと結合した状態で全身の組織へ運搬される。血漿に溶解する酸素はごくわずかである。
- tags: 酸素運搬, ヘモグロビン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q163

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: text_mcq
- question: 血液中の二酸化炭素の運搬について正しいものはどれか。
- choices:
  - A: その多くは重炭酸イオンの形に変換されて血漿中を運ばれる。
  - B: 二酸化炭素はすべてヘモグロビンとのみ結合して運ばれる。
  - C: 二酸化炭素は血液中を運搬されない。
  - D: 二酸化炭素は酸素と全く同じ形で運搬される。
- answer: その多くは重炭酸イオンの形に変換されて血漿中を運ばれる。
- explanation: 血液中の二酸化炭素の多くは、赤血球内で酵素の働きにより重炭酸イオンに変換され、血漿中を運ばれる。一部はヘモグロビンと結合した形や、溶解した形でも運ばれる。
- tags: 二酸化炭素運搬, 重炭酸イオン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q164

- category: 呼吸器
- subcategory: 呼吸調節
- difficulty: 2
- final_type: text_mcq
- question: 呼吸の化学的調節について正しいものはどれか。
- choices:
  - A: 血中の二酸化炭素濃度の上昇は、呼吸中枢を刺激して換気を増加させる。
  - B: 血中の二酸化炭素濃度は呼吸の調節に関与しない。
  - C: 呼吸は化学的な要因によって調節されない。
  - D: 血中の二酸化炭素濃度が上昇すると換気は減少する。
- answer: 血中の二酸化炭素濃度の上昇は、呼吸中枢を刺激して換気を増加させる。
- explanation: 血中の二酸化炭素濃度の上昇は、化学受容器を介して呼吸中枢(既存Q039)を刺激し、換気量を増加させる、呼吸の化学的調節の中心的な仕組みである。
- tags: 化学受容器, 呼吸調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q165

- category: 呼吸器
- subcategory: 肺胞
- difficulty: 1
- final_type: text_mcq
- question: 肺サーファクタントについて正しいものはどれか。
- choices:
  - A: 肺胞の表面張力を低下させ、肺胞がつぶれるのを防ぐ。
  - B: サーファクタントは気道の異物を除去する。
  - C: サーファクタントは血液中の酸素を運搬する。
  - D: サーファクタントは消化酵素の一種である。
- answer: 肺胞の表面張力を低下させ、肺胞がつぶれるのを防ぐ。
- explanation: 肺サーファクタントは肺胞上皮細胞から分泌される物質で、肺胞内面の表面張力を低下させ、呼息時に肺胞がつぶれてしまうのを防いでいる。
- tags: サーファクタント, 肺胞
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q166

- category: 呼吸器
- subcategory: 下気道
- difficulty: 2
- final_type: text_mcq
- question: 気道の線毛運動について正しいものはどれか。
- choices:
  - A: 粘液に捕捉された異物を、咽頭側へ向かって送り出す。
  - B: 線毛運動は異物を肺の奥へ送り込む。
  - C: 線毛運動はガス交換を直接行う。
  - D: 線毛は肺胞にのみ存在する。
- answer: 粘液に捕捉された異物を、咽頭側へ向かって送り出す。
- explanation: 気道上皮の線毛は規則的に運動し、粘液とともに捕捉した異物を咽頭側(体外へ排出されやすい方向)へ向かって送り出す、下気道の防御機構である。
- tags: 線毛運動, 気道の防御
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q167

- category: 呼吸器
- subcategory: 下気道
- difficulty: 1
- final_type: text_mcq
- question: 咳嗽反射について正しいものはどれか。
- choices:
  - A: 気道内の異物や刺激を検知し、強い呼気によって排出しようとする防御反射である。
  - B: 咳嗽反射は消化管の防御反射である。
  - C: 咳嗽反射は随意的にのみ生じる。
  - D: 咳嗽反射は肺胞で生じる反射である。
- answer: 気道内の異物や刺激を検知し、強い呼気によって排出しようとする防御反射である。
- explanation: 咳嗽反射は、気道内の異物や刺激物を感知した際に、強い呼気によってそれを排出しようとする防御反射である。
- tags: 咳嗽反射, 気道の防御
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: no
- final_review_note: なし

## Q168

- category: 呼吸器
- subcategory: 胸膜
- difficulty: 1
- final_type: text_mcq
- question: 縦隔について正しいものはどれか。
- choices:
  - A: 左右の肺に挟まれた、心臓や気管などを含む空間である。
  - B: 縦隔は肺の内部にある構造である。
  - C: 縦隔には何も存在しない空間である。
  - D: 縦隔は腹腔の一部である。
- answer: 左右の肺に挟まれた、心臓や気管などを含む空間である。
- explanation: 縦隔は左右の肺に挟まれた胸腔の中央部分で、心臓・大血管・気管・食道などを含む空間である。
- tags: 縦隔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q169

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: image_mcq
- question: 肺の図の①で示された、肺の最上部(鎖骨の上方まで達する部分)はどれか。
- choices:
  - A: 肺尖
  - B: 肺底
  - C: 肺門
  - D: 肺葉
- answer: 肺尖
- explanation: 肺尖は肺の最上部を指し、鎖骨の上方まで達する。肺の下面で横隔膜に接する部分は肺底という。
- tags: 肺尖, 肺底
- image_asset: q035_right_middle_lobe.webp
- marker_target: 肺尖
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q170

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 1
- final_type: text_mcq
- question: 横隔膜について正しいものはどれか。
- choices:
  - A: 最も重要な吸気筋であり、収縮するとドーム状の形が平坦になり胸腔容積が増加する。
  - B: 横隔膜は呼気筋である。
  - C: 横隔膜は骨格筋ではなく平滑筋である。
  - D: 横隔膜は胸腔と腹腔を隔てていない。
- answer: 最も重要な吸気筋であり、収縮するとドーム状の形が平坦になり胸腔容積が増加する。
- explanation: 横隔膜は最も重要な吸気筋であり、収縮するとドーム状の形が平坦になり、胸腔の容積が増加することで肺が拡張し、空気が吸い込まれる。既存Q038・Q083の内容を踏まえたまとめ。
- tags: 横隔膜, 吸気筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q171

- category: 呼吸器
- subcategory: 換気
- difficulty: 1
- final_type: text_mcq
- question: 成人の安静時における呼吸数の目安について、最も近いものはどれか。
- choices:
  - A: 1分間に約12〜18回
  - B: 1分間に約60〜80回
  - C: 1分間に約1〜2回
  - D: 1分間に約100回以上
- answer: 1分間に約12〜18回
- explanation: 成人の安静時の呼吸数は、おおむね1分間に12〜18回程度とされる。
- tags: 呼吸数
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q172

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 3
- final_type: text_mcq
- question: 肺胞でのガス交換を成立させる駆動力について正しいものはどれか。
- choices:
  - A: 肺胞気と血液の間の酸素・二酸化炭素の分圧差により、拡散によって移動する。
  - B: ガス交換にはエネルギーを要する能動輸送が用いられる。
  - C: ガス交換は分圧差とは無関係に一定速度で進む。
  - D: ガス交換は肺胞の筋収縮によって直接引き起こされる。
- answer: 肺胞気と血液の間の酸素・二酸化炭素の分圧差により、拡散によって移動する。
- explanation: 肺胞でのガス交換は、肺胞気と血液の間に生じる酸素・二酸化炭素の分圧差を駆動力として、拡散によって受動的に進む。既存のQ037・Q084の内容を、駆動力という観点から統合的に理解する。
- tags: ガス交換, 拡散, 分圧差
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q173

- category: 呼吸器
- subcategory: 換気
- difficulty: 2
- final_type: text_mcq
- question: 死腔について正しいものはどれか。
- choices:
  - A: 気道のうち、ガス交換に直接関与しない部分をいう。
  - B: 死腔は肺胞のみを指す。
  - C: 死腔ではガス交換が最も盛んに行われる。
  - D: 死腔は消化管の一部である。
- answer: 気道のうち、ガス交換に直接関与しない部分をいう。
- explanation: 死腔は、吸入した空気が通過するもののガス交換に直接関与しない気道部分(主に導気部)をいう。
- tags: 死腔, 導気部
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q174

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: text_mcq
- question: 肺胞と肺循環の関係について正しいものはどれか。
- choices:
  - A: 肺胞は毛細血管に取り囲まれており、その薄い壁を介してガス交換が行われる。
  - B: 肺胞と血管は直接接していない。
  - C: 肺胞を取り巻くのはリンパ管のみである。
  - D: 肺胞は肺静脈の内部に存在する構造である。
- answer: 肺胞は毛細血管に取り囲まれており、その薄い壁を介してガス交換が行われる。
- explanation: 肺胞は肺循環の毛細血管網に密に取り囲まれており、肺胞壁と毛細血管壁を合わせた薄い膜(血液空気関門、既存Q084)を介してガス交換が行われる。
- tags: 肺胞, 肺循環
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q175

- category: 呼吸器
- subcategory: 呼吸器系の構造分類
- difficulty: 3
- final_type: text_mcq
- question: 導気部から呼吸部への移行について正しいものはどれか。
- choices:
  - A: 終末細気管支を境に、それより末梢の呼吸細気管支からガス交換に関わる呼吸部が始まる。
  - B: 導気部と呼吸部の間に明確な境界は存在しない。
  - C: 呼吸部は気管から始まる。
  - D: 導気部でもガス交換が活発に行われる。
- answer: 終末細気管支を境に、それより末梢の呼吸細気管支からガス交換に関わる呼吸部が始まる。
- explanation: 導気部は終末細気管支までで、それより末梢の呼吸細気管支・肺胞管・肺胞嚢・肺胞からなる呼吸部でガス交換が行われる。既存のQ034・Q040・Q085・Q087の内容を統合し、呼吸器系全体の構造分類を完成させる。
- tags: 導気部, 呼吸部, 終末細気管支
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q253

- category: 呼吸器
- subcategory: 上気道
- difficulty: 1
- final_type: text_mcq
- question: 鼻中隔について正しいものはどれか。
- choices:
  - A: 鼻腔を左右に分ける構造である。
  - B: 鼻腔と口腔を隔てる構造である。
  - C: 鼻中隔は喉頭の一部である。
  - D: 鼻中隔は肺の一部である。
- answer: 鼻腔を左右に分ける構造である。
- explanation: 鼻中隔は鼻腔を左右に分ける構造であり、既存Q151（鼻腔の機能）を構造面から補完する。
- tags: 鼻中隔, 鼻腔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q254

- category: 呼吸器
- subcategory: 上気道
- difficulty: 1
- final_type: text_mcq
- question: 副鼻腔について正しいものはどれか。
- choices:
  - A: 頭蓋骨内にある、鼻腔とつながる空洞である。
  - B: 副鼻腔は肺の一部である。
  - C: 副鼻腔は喉頭に存在する。
  - D: 副鼻腔には空洞は存在しない。
- answer: 頭蓋骨内にある、鼻腔とつながる空洞である。
- explanation: 副鼻腔は頭蓋骨内にあり、鼻腔とつながる空洞で、吸気の加温・加湿や声の共鳴などに関与するとされる。
- tags: 副鼻腔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q255

- category: 呼吸器
- subcategory: 喉頭
- difficulty: 1
- final_type: text_mcq
- question: 声帯について正しいものはどれか。
- choices:
  - A: 喉頭内に位置し、発声に直接関わる構造である。
  - B: 声帯は気管の末端に位置する。
  - C: 声帯は肺胞の一部である。
  - D: 声帯は嚥下にのみ関わり、発声には関与しない。
- answer: 喉頭内に位置し、発声に直接関わる構造である。
- explanation: 声帯は喉頭内に位置し、呼気によって振動することで発声に直接関わる構造である。既存Q080（喉頭）の機能を具体化する。
- tags: 声帯, 喉頭
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q256

- category: 呼吸器
- subcategory: 喉頭
- difficulty: 1
- final_type: text_mcq
- question: 喉頭蓋の機能について正しいものはどれか。
- choices:
  - A: 嚥下時に気道の入口を閉鎖し、食物や液体が気管に入るのを防ぐ。
  - B: 喉頭蓋は常に気道を閉鎖している。
  - C: 喉頭蓋は声帯の一部である。
  - D: 喉頭蓋は肺胞の防御を担う。
- answer: 嚥下時に気道の入口を閉鎖し、食物や液体が気管に入るのを防ぐ。
- explanation: 喉頭蓋は嚥下時に反射的に気道の入口を閉鎖し、食物や液体が気管に入る(誤嚥)のを防ぐ、呼吸器の重要な防御機構である。
- tags: 喉頭蓋, 気道の防御
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q257

- category: 呼吸器
- subcategory: 気管
- difficulty: 1
- final_type: text_mcq
- question: 気管の走行について正しいものはどれか。
- choices:
  - A: 喉頭に続き、頸部から胸部へ下行し、気管分岐部で左右の主気管支に分かれる。
  - B: 気管は腹部まで下行する。
  - C: 気管は喉頭より上方に位置する。
  - D: 気管は分岐せず、そのまま肺胞に至る。
- answer: 喉頭に続き、頸部から胸部へ下行し、気管分岐部で左右の主気管支に分かれる。
- explanation: 気管は喉頭に続いて頸部から胸部へ下行し、気管分岐部(既存Q259参照)で左右の主気管支に分かれる。既存Q081（気管）の走行を補完する。
- tags: 気管, 気管分岐部
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q258

- category: 呼吸器
- subcategory: 気管
- difficulty: 1
- final_type: text_mcq
- question: 気管の壁の構造について正しいものはどれか。
- choices:
  - A: C字型の気管軟骨が前面・側面を支え、後壁は膜性壁(平滑筋を含む)である。
  - B: 気管の壁全体が硬い骨組織でできている。
  - C: 気管には軟骨が存在しない。
  - D: 気管の後壁も前面と同じ硬い軟骨でできている。
- answer: C字型の気管軟骨が前面・側面を支え、後壁は膜性壁(平滑筋を含む)である。
- explanation: 気管はC字型の気管軟骨が前面・側面を支えることで内腔の虚脱を防ぎ、食道に接する後壁は軟骨を欠く膜性壁(平滑筋を含む)となっている。
- tags: 気管軟骨, 気管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q259

- category: 呼吸器
- subcategory: 気管支
- difficulty: 1
- final_type: text_mcq
- question: 気管分岐部について正しいものはどれか。
- choices:
  - A: 気管が左右の主気管支に分かれる部位である。
  - B: 気管分岐部は喉頭に位置する。
  - C: 気管分岐部は肺胞の末端に位置する。
  - D: 気管分岐部では気管支がさらに区域気管支に分かれる。
- answer: 気管が左右の主気管支に分かれる部位である。
- explanation: 気管分岐部は気管が左右の主気管支に分かれる部位であり、既存Q152（主気管支の左右差）の位置的な基準点となる。
- tags: 気管分岐部, 主気管支
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q260

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 2
- final_type: text_mcq
- question: 肺門について正しいものはどれか。
- choices:
  - A: 主気管支・肺動脈・肺静脈などが出入りする、肺の内側面の部位である。
  - B: 肺門は肺の最外側に位置する。
  - C: 肺門は肺胞が集まる部位である。
  - D: 肺門には血管も気管支も存在しない。
- answer: 主気管支・肺動脈・肺静脈などが出入りする、肺の内側面の部位である。
- explanation: 肺門は肺の内側面(縦隔側)に位置し、主気管支・肺動脈・肺静脈・気管支動脈などが出入りする部位である。呼吸器（気管支）と循環器（肺動脈・肺静脈）が交わる要所である。
- tags: 肺門
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q261

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: text_mcq
- question: 肺自体を栄養する血管について正しいものはどれか。
- choices:
  - A: 気管支動脈が、肺組織自体に酸素・栄養を供給する。
  - B: 肺動脈が肺組織自体を栄養する。
  - C: 肺静脈が肺組織自体を栄養する。
  - D: 肺は血液による栄養を必要としない。
- answer: 気管支動脈が、肺組織自体に酸素・栄養を供給する。
- explanation: 肺動脈(既存の肺循環)はガス交換のために血液を肺胞へ運ぶ血管であるのに対し、気管支動脈は肺組織自体(気管支壁など)に酸素・栄養を供給する、別系統の血管である。
- tags: 気管支動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q262

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 1
- final_type: text_mcq
- question: 努力吸気時に働く呼吸補助筋として正しいものはどれか。
- choices:
  - A: 胸鎖乳突筋・斜角筋群
  - B: 横隔膜のみ
  - C: 内肋間筋のみ
  - D: 腹筋群のみ
- answer: 胸鎖乳突筋・斜角筋群
- explanation: 安静時の吸気は主に横隔膜・外肋間筋(既存Q038)が担うが、努力吸気時にはこれに加えて胸鎖乳突筋・斜角筋群などの呼吸補助筋が動員される。
- tags: 呼吸補助筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q263

- category: 呼吸器
- subcategory: 換気
- difficulty: 2
- final_type: text_mcq
- question: 肺コンプライアンスについて正しいものはどれか。
- choices:
  - A: 肺の伸展しやすさを表す指標であり、サーファクタントなどにより維持される。
  - B: 肺コンプライアンスは肺活量と同じ意味である。
  - C: 肺コンプライアンスは気道抵抗と同じ意味である。
  - D: 肺コンプライアンスは呼吸数を表す指標である。
- answer: 肺の伸展しやすさを表す指標であり、サーファクタントなどにより維持される。
- explanation: 肺コンプライアンスは肺の伸展しやすさを表す指標であり、既存Q165（肺サーファクタント）による表面張力の低下などによって適切に維持される。
- tags: 肺コンプライアンス
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q264

- category: 呼吸器
- subcategory: 換気
- difficulty: 2
- final_type: text_mcq
- question: 気道抵抗について正しいものはどれか。
- choices:
  - A: 気道(特に気管支)の内腔の太さによって変化し、狭くなるほど抵抗は増加する。
  - B: 気道抵抗は気道の太さと無関係である。
  - C: 気道抵抗は肺の弾性のみで決まる。
  - D: 気道抵抗は呼吸筋の力によってのみ決まる。
- answer: 気道(特に気管支)の内腔の太さによって変化し、狭くなるほど抵抗は増加する。
- explanation: 気道抵抗は気道内腔の太さによって変化し、気管支平滑筋(既存Q268)の収縮などにより内腔が狭くなると抵抗は増加する。循環器の末梢血管抵抗（既存Q225）と類似した考え方である。
- tags: 気道抵抗
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q265

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: text_mcq
- question: 換気血流比について正しいものはどれか。
- choices:
  - A: 肺胞換気量と肺毛細血管血流量のバランスを表し、効率的なガス交換に重要である。
  - B: 換気血流比は呼吸数のみを表す指標である。
  - C: 換気血流比は血圧を表す指標である。
  - D: 換気血流比は消化管の血流を表す。
- answer: 肺胞換気量と肺毛細血管血流量のバランスを表し、効率的なガス交換に重要である。
- explanation: 換気血流比は、肺胞への換気量と、それを取り巻く毛細血管の血流量とのバランスを表す概念で、両者が適切に釣り合うことで効率的なガス交換(既存Q172)が成立する。
- tags: 換気血流比, ガス交換
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q266

- category: 呼吸器
- subcategory: 換気
- difficulty: 2
- final_type: text_mcq
- question: 肺胞換気量について正しいものはどれか。
- choices:
  - A: 1回換気量から死腔の分を除いた、実際にガス交換に関わる換気量である。
  - B: 肺胞換気量は1回換気量と全く同じ量である。
  - C: 肺胞換気量は死腔の換気量のみを指す。
  - D: 肺胞換気量は肺活量と同じ意味である。
- answer: 1回換気量から死腔の分を除いた、実際にガス交換に関わる換気量である。
- explanation: 肺胞換気量は、1回換気量(既存Q159)のうち死腔(既存Q173)を除いた、実際に肺胞でのガス交換に関わる換気量を指す。
- tags: 肺胞換気量, 死腔
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q267

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 1
- final_type: text_mcq
- question: 動脈血酸素飽和度について正しいものはどれか。
- choices:
  - A: 血液中のヘモグロビンのうち、酸素と結合している割合を表す。
  - B: 血液中に溶解した酸素の量のみを表す。
  - C: 動脈血酸素飽和度は二酸化炭素の量を表す指標である。
  - D: 動脈血酸素飽和度は血圧を表す指標である。
- answer: 血液中のヘモグロビンのうち、酸素と結合している割合を表す。
- explanation: 動脈血酸素飽和度は、血液中のヘモグロビン(既存Q162)のうち、実際に酸素と結合しているものの割合を表す指標である。
- tags: 酸素飽和度, ヘモグロビン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q268

- category: 呼吸器
- subcategory: 気管支
- difficulty: 2
- final_type: text_mcq
- question: 気管支平滑筋について正しいものはどれか。
- choices:
  - A: 気管支壁に存在し、収縮・弛緩によって気道の内腔を調節する。
  - B: 気管支平滑筋は骨格筋の一種である。
  - C: 気管支平滑筋は肺胞にのみ存在する。
  - D: 気管支平滑筋は気道の内腔調節に関与しない。
- answer: 気管支壁に存在し、収縮・弛緩によって気道の内腔を調節する。
- explanation: 気管支平滑筋は気管支壁に存在し、その収縮・弛緩によって気道の内腔の太さを変化させ、気道抵抗(既存Q264)に影響を与える。
- tags: 気管支平滑筋, 気道抵抗
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q269

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 2
- final_type: text_mcq
- question: 呼吸筋の神経支配について正しいものはどれか。
- choices:
  - A: 横隔膜は横隔神経、肋間筋は肋間神経の支配を受ける。
  - B: すべての呼吸筋は同一の神経に支配される。
  - C: 呼吸筋は神経支配を受けない不随意筋である。
  - D: 横隔膜は肋間神経に支配される。
- answer: 横隔膜は横隔神経、肋間筋は肋間神経の支配を受ける。
- explanation: 横隔膜は横隔神経(既存Q083)、肋間筋は肋間神経によってそれぞれ支配されている。呼吸筋は体性神経系に支配される骨格筋である。
- tags: 横隔神経, 肋間神経, 呼吸筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: 呼吸器授業で横隔神経(C3-C5)・肋間神経を明示的に扱う。scope flag解除。

## Q270

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 2
- final_type: text_mcq
- question: 肺循環の血管抵抗の特徴について正しいものはどれか。
- choices:
  - A: 体循環に比べて低圧・低抵抗の系である。
  - B: 肺循環は体循環より高圧・高抵抗の系である。
  - C: 肺循環と体循環の血管抵抗は等しい。
  - D: 肺循環には血管抵抗が存在しない。
- answer: 体循環に比べて低圧・低抵抗の系である。
- explanation: 肺循環(既存Q014,019)は体循環に比べて低圧・低抵抗の系であり、これは右心室の壁が左心室より薄い(既存Q128)こととも対応している。
- tags: 肺循環, 血管抵抗
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q271

- category: 呼吸器
- subcategory: 下気道
- difficulty: 2
- final_type: text_mcq
- question: 気道の粘液線毛エスカレーターについて正しいものはどれか。
- choices:
  - A: 粘液が異物を捕捉し、線毛運動によって咽頭側へ運ばれる、一連の防御機構である。
  - B: 粘液線毛エスカレーターは異物を肺胞へ運ぶ機構である。
  - C: 線毛運動のみで異物除去が完結し、粘液は関与しない。
  - D: 粘液線毛エスカレーターは消化管に存在する機構である。
- answer: 粘液が異物を捕捉し、線毛運動によって咽頭側へ運ばれる、一連の防御機構である。
- explanation: 気道上皮から分泌される粘液が異物を捕捉し、既存Q166の線毛運動によって咽頭側へ運ばれるという一連の仕組みを、粘液線毛エスカレーターという。
- tags: 粘液線毛エスカレーター, 線毛運動
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q272

- category: 呼吸器
- subcategory: 肺葉
- difficulty: 1
- final_type: text_mcq
- question: 肺葉と気管支肺区域の関係について正しいものはどれか。
- choices:
  - A: 各肺葉はさらにいくつかの気管支肺区域に分けられる。
  - B: 肺葉は分割されない最小単位である。
  - C: 気管支肺区域は肺葉より大きい単位である。
  - D: 気管支肺区域は左右の肺全体を指す。
- answer: 各肺葉はさらにいくつかの気管支肺区域に分けられる。
- explanation: 各肺葉(既存Q035,036)はさらにいくつかの気管支肺区域に分けられる。個々の区域名・番号までは本アプリの基礎範囲を超えるため扱わない。
- tags: 肺葉, 気管支肺区域
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q273

- category: 呼吸器
- subcategory: 呼吸筋
- difficulty: 3
- final_type: text_mcq
- question: 呼吸筋の使い分けについて正しいものはどれか。
- choices:
  - A: 安静時は横隔膜が主体となり、努力時には呼吸補助筋・呼気筋が追加で動員される。
  - B: 安静時・努力時とも全く同じ筋のみが働く。
  - C: 呼気には筋の関与が一切ない。
  - D: 努力時には吸気筋のみが働き、呼気筋は働かない。
- answer: 安静時は横隔膜が主体となり、努力時には呼吸補助筋・呼気筋が追加で動員される。
- explanation: 安静時の呼吸は横隔膜(既存Q170)を主体とした受動的な過程が中心だが、運動時など換気量を増やす必要がある努力呼吸では、呼吸補助筋(Q262)や呼気筋(既存Q158)が追加で動員される。
- tags: 呼吸筋, 呼吸調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q274

- category: 呼吸器
- subcategory: 呼吸器系の構造分類
- difficulty: 2
- final_type: text_mcq
- question: 上気道・下気道の区分として正しいものはどれか。
- choices:
  - A: 上気道は鼻腔から喉頭まで、下気道は気管から末梢の気道を指す。
  - B: 上気道と下気道の境界は肺胞である。
  - C: 下気道は鼻腔のみを指す。
  - D: 上気道・下気道という区分は存在しない。
- answer: 上気道は鼻腔から喉頭まで、下気道は気管から末梢の気道を指す。
- explanation: 上気道は鼻腔から喉頭まで、下気道は気管から気管支・細気管支などの末梢の気道を指す。既存Q031（上気道）・Q079（下気道）を統合する。
- tags: 上気道, 下気道
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q275

- category: 呼吸器
- subcategory: 肺胞
- difficulty: 2
- final_type: text_mcq
- question: 肺の弾性とサーファクタントの関係について正しいものはどれか。
- choices:
  - A: サーファクタントが表面張力を下げることで、肺の適度な伸展性(コンプライアンス)が保たれる。
  - B: サーファクタントは肺の弾性を完全に消失させる。
  - C: 肺の弾性はサーファクタントと無関係である。
  - D: サーファクタントは肺胞を虚脱させる方向にはたらく。
- answer: サーファクタントが表面張力を下げることで、肺の適度な伸展性(コンプライアンス)が保たれる。
- explanation: 既存Q165（サーファクタント）とQ263（肺コンプライアンス）を統合し、サーファクタントが表面張力を下げることで肺胞の虚脱を防ぎ、適度な伸展性が保たれることを確認する。
- tags: サーファクタント, 肺コンプライアンス
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q276

- category: 呼吸器
- subcategory: ガス交換
- difficulty: 3
- final_type: text_mcq
- question: 外気から組織までの酸素の流れとして正しいものはどれか。
- choices:
  - A: 外気→肺胞→拡散により血液→ヘモグロビンと結合→組織で解離という流れをたどる。
  - B: 酸素は肺胞から直接組織へ移動し、血液は関与しない。
  - C: 酸素は常に血漿に溶解した状態のみで運ばれる。
  - D: 酸素は組織で産生され、肺から排出される。
- answer: 外気→肺胞→拡散により血液→ヘモグロビンと結合→組織で解離という流れをたどる。
- explanation: 外気中の酸素は肺胞に達し、拡散(既存Q172)により血液に取り込まれ、ヘモグロビン(既存Q162)と結合して全身へ運ばれ、組織で解離して利用される。呼吸器領域全体を貫く酸素の流れを統合する。
- tags: ガス交換, 酸素運搬
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q277

- category: 呼吸器
- subcategory: 呼吸調節
- difficulty: 3
- final_type: text_mcq
- question: 呼吸調節の全体像として正しいものはどれか。
- choices:
  - A: 呼吸中枢が化学受容器からの情報を受け、横隔神経・肋間神経を介して呼吸筋の活動を調節する。
  - B: 呼吸調節は化学受容器のみで完結し、呼吸中枢は関与しない。
  - C: 呼吸筋は神経の指令を受けずに自律的に動く。
  - D: 呼吸調節に呼吸筋への神経支配は関与しない。
- answer: 呼吸中枢が化学受容器からの情報を受け、横隔神経・肋間神経を介して呼吸筋の活動を調節する。
- explanation: 呼吸中枢(既存Q039)は化学受容器(既存Q164)からの血中二酸化炭素濃度などの情報を受け取り、横隔神経・肋間神経(Q269)を介して呼吸筋の活動を調節するという一連の仕組みで、呼吸を調節している。
- tags: 呼吸調節, 呼吸中枢, 化学受容器
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

### 泌尿器（70問）

## Q042

- category: 泌尿器
- subcategory: 尿路
- difficulty: 1
- final_type: text_mcq
- question: 尿が体外へ排泄されるまでの順序として正しいものはどれか。
- choices:
  - A: 腎臓 → 膀胱 → 尿管 → 尿道
  - B: 腎臓 → 尿管 → 膀胱 → 尿道
  - C: 膀胱 → 腎臓 → 尿管 → 尿道
  - D: 腎臓 → 尿道 → 尿管 → 膀胱
- answer: 腎臓 → 尿管 → 膀胱 → 尿道
- explanation: 腎臓でつくられた尿は、尿管を通って膀胱へ送られ、尿道から体外へ排泄される。
- tags: 尿路, 尿管, 膀胱, 尿道
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q043

- category: 泌尿器
- subcategory: 尿路
- difficulty: 1
- final_type: text_mcq
- question: 下部尿路を構成するものはどれか。
- choices:
  - A: 腎杯と腎盂
  - B: 腎盂と尿管
  - C: 尿管と膀胱
  - D: 膀胱と尿道
- answer: 膀胱と尿道
- explanation: 腎杯・腎盂・尿管を上部尿路、膀胱・尿道を下部尿路とする。
- tags: 上部尿路, 下部尿路
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q044

- category: 泌尿器
- subcategory: 腎臓の位置
- difficulty: 1
- final_type: text_mcq
- question: 腎臓について正しいものはどれか。
- choices:
  - A: 左腎は右腎より低い
  - B: 右腎は左腎よりやや低い
  - C: 両腎は胸腔内に存在する
  - D: 腎臓は骨盤内にのみ存在する
- answer: 右腎は左腎よりやや低い
- explanation: 腎臓は後腹膜に位置し、右側には肝臓があるため右腎は左腎よりやや低い。
- tags: 右腎, 左腎, 後腹膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: Q200を別内容へ置換したことにより解消。Q044は現行内容を維持。

## Q045

- category: 泌尿器
- subcategory: 腎臓の外形
- difficulty: 1
- final_type: image_mcq
- question: 腎臓の図中①で示された、腎動脈・腎静脈・尿管などが出入りする部位はどれか。
- choices:
  - A: 腎門
  - B: 腎皮質
  - C: 腎髄質
  - D: 腎杯
- answer: 腎門
- explanation: 腎門は腎臓内側のくぼんだ部分で、腎動脈、腎静脈、尿管などが出入りする。
- tags: 腎門, 腎臓
- image_asset: q045_renal_hilum.webp
- marker_target: 腎門
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q046

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: text_mcq
- question: ネフロンを構成するものはどれか。
- choices:
  - A: 腎小体と尿細管
  - B: 腎盂と尿管
  - C: 膀胱と尿道
  - D: 腎動脈と腎静脈
- answer: 腎小体と尿細管
- explanation: ネフロンは腎臓で尿をつくる最小単位で、腎小体と尿細管から構成される。
- tags: ネフロン, 腎小体, 尿細管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q047

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 尿生成の基本的な過程として適切な順序はどれか。
- choices:
  - A: 再吸収 → ろ過 → 分泌
  - B: 分泌 → 再吸収 → ろ過
  - C: ろ過 → 再吸収 → 分泌
  - D: ろ過 → 分泌 → 再吸収のみ
- answer: ろ過 → 再吸収 → 分泌
- explanation: 尿生成の基本は、ろ過 → 再吸収 → 分泌 → 尿として排泄、の順で整理できる。
- tags: ろ過, 再吸収, 分泌, 尿生成
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q048

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: image_mcq
- question: ネフロンの模式図で①で示された、血液をろ過して原尿をつくる部位はどれか。
- choices:
  - A: 腎小体
  - B: 集合管
  - C: 尿管
  - D: 膀胱
- answer: 腎小体
- explanation: 腎小体では血液がろ過され、原尿が形成される。
- tags: 腎小体, 原尿, ネフロン
- image_asset: q048_nephron.webp
- marker_target: 腎小体
- image_status: exists_confirmed
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q049

- category: 泌尿器
- subcategory: 尿路上皮
- difficulty: 2
- final_type: text_mcq
- question: 尿路上皮の特徴として適切なのはどれか。
- choices:
  - A: 伸縮性がほとんどない
  - B: 蓄尿量に応じて形態が変化できる
  - C: 心筋細胞から構成される
  - D: 肺胞の内面を覆う
- answer: 蓄尿量に応じて形態が変化できる
- explanation: 尿路上皮（移行上皮）は伸縮性が高く、蓄尿量に応じて細胞の形態が変化する。
- tags: 尿路上皮, 移行上皮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q050

- category: 泌尿器
- subcategory: 尿路
- difficulty: 1
- final_type: image_mcq
- question: 泌尿器系の図中①で示された、腎臓から膀胱へ尿を運ぶ管はどれか。
- choices:
  - A: 尿道
  - B: 尿管
  - C: 腎動脈
  - D: 精管
- answer: 尿管
- explanation: 尿管は腎臓で生成された尿を膀胱へ送る尿路である。
- tags: 尿管, 尿路
- image_asset: q050_urinary_system.webp
- marker_target: 尿管
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q088

- category: 泌尿器
- subcategory: 尿細管
- difficulty: 1
- final_type: text_mcq
- question: 尿細管の主なはたらきとして正しいものはどれか。
- choices:
  - A: 水・電解質などの再吸収と、血液側から尿細管腔への物質の分泌
  - B: 原尿の生成（血液のろ過）のみ
  - C: 尿の一時的な貯留のみ
  - D: ホルモンの合成のみ
- answer: 水・電解質などの再吸収と、血液側から尿細管腔への物質の分泌
- explanation: 尿細管では、原尿中の水・電解質・グルコースなどが血液側へ再吸収される一方、血液側から尿細管腔へ物質が分泌される。
- tags: 尿細管, 再吸収, 分泌
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q089

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 2
- final_type: text_mcq
- question: 蓄尿時の状態として正しいものはどれか。
- choices:
  - A: 排尿筋収縮、内尿道括約筋弛緩、外尿道括約筋弛緩
  - B: 排尿筋弛緩、内尿道括約筋収縮、外尿道括約筋収縮
  - C: 排尿筋収縮、内尿道括約筋収縮、外尿道括約筋弛緩
  - D: すべて弛緩
- answer: 排尿筋弛緩、内尿道括約筋収縮、外尿道括約筋収縮
- explanation: 蓄尿時はためる方向に働く。
- tags: 蓄尿, 排尿筋, 内尿道括約筋, 外尿道括約筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q090

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 2
- final_type: text_mcq
- question: 排尿時の状態として正しいものはどれか。
- choices:
  - A: 排尿筋収縮、内尿道括約筋弛緩、外尿道括約筋弛緩
  - B: 排尿筋弛緩、内尿道括約筋収縮、外尿道括約筋収縮
  - C: 排尿筋収縮、内尿道括約筋収縮、外尿道括約筋収縮
  - D: 排尿筋弛緩、内尿道括約筋弛緩、外尿道括約筋収縮
- answer: 排尿筋収縮、内尿道括約筋弛緩、外尿道括約筋弛緩
- explanation: 排尿時は出す方向に切り替わる。
- tags: 排尿, 排尿筋, 内尿道括約筋, 外尿道括約筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: なし

## Q091

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 1
- final_type: image_mcq
- question: 腎臓断面図の①で示された、糸球体を含み尿の生成が始まる外層部分はどれか。
- choices:
  - A: 腎皮質
  - B: 腎髄質
  - C: 腎盂
  - D: 腎被膜
- answer: 腎皮質
- explanation: 腎臓の内部は腎皮質（外層、糸球体を含む）と腎髄質（内層、腎錐体を含む）に分かれる。
- tags: 腎皮質, 糸球体
- image_asset: q091_kidney_cross_section.webp
- marker_target: 腎皮質
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q092

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 1
- final_type: image_mcq
- question: 腎臓断面図の②で示された、腎髄質に並ぶ構造はどれか。
- choices:
  - A: 腎錐体
  - B: 腎皮質
  - C: 腎盂
  - D: 腎杯
- answer: 腎錐体
- explanation: 腎髄質には円錐形の腎錐体が複数並ぶ。
- tags: 腎錐体, 腎髄質
- image_asset: q091_kidney_cross_section.webp
- marker_target: 腎錐体
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q093

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 1
- final_type: image_mcq
- question: 腎臓断面図の③で示された、腎錐体の先端で尿が小腎杯へ流れ出る部分はどれか。
- choices:
  - A: 腎乳頭
  - B: 腎皮質
  - C: 腎門
  - D: 腎盂
- answer: 腎乳頭
- explanation: 腎錐体の先端を腎乳頭といい、ここから尿が小腎杯へ流れ出る。
- tags: 腎乳頭, 小腎杯
- image_asset: q091_kidney_cross_section.webp
- marker_target: 腎乳頭
- image_status: planned_shared
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q094

- category: 泌尿器
- subcategory: 外尿道括約筋
- difficulty: 1
- final_type: text_mcq
- question: 外尿道括約筋について正しいものはどれか。
- choices:
  - A: 平滑筋である。
  - B: 骨格筋であり、随意的に調節しうる。
  - C: 副交感神経のみで支配される。
  - D: 尿路上皮でできている。
- answer: 骨格筋であり、随意的に調節しうる。
- explanation: 外尿道括約筋は体性神経支配の骨格筋である。
- tags: 外尿道括約筋, 骨格筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q095

- category: 泌尿器
- subcategory: 尿管の生理的狭窄
- difficulty: 2
- final_type: text_mcq
- question: 尿管の特徴として正しいものはどれか。
- choices:
  - A: 3か所の生理的狭窄がある。
  - B: 左右2本ずつある。
  - C: 膀胱壁を直角に貫く。
  - D: 海綿体内を通る。
- answer: 3か所の生理的狭窄がある。
- explanation: 尿管には、腎盂から尿管への移行部、総腸骨動脈と交差する部位、膀胱壁を貫く部位の3か所に生理的狭窄がある。これらは尿路結石が留まりやすい部位でもある。
- tags: 尿管, 生理的狭窄
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q096

- category: 泌尿器
- subcategory: 膀胱三角
- difficulty: 2
- final_type: text_mcq
- question: 膀胱三角について正しいものはどれか。
- choices:
  - A: 2つの尿管口と1つの内尿道口で囲まれる。
  - B: 2つの内尿道口と1つの尿管口で囲まれる。
  - C: 2つの腎盂口と1つの外尿道口で囲まれる。
  - D: 膀胱頂にある。
- answer: 2つの尿管口と1つの内尿道口で囲まれる。
- explanation: 膀胱底部の重要な解剖学的領域である。
- tags: 膀胱三角, 尿管口, 内尿道口
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q097

- category: 泌尿器
- subcategory: 尿路上皮
- difficulty: 2
- final_type: text_mcq
- question: 尿路上皮が確実に覆う部位の組み合わせとして正しいものはどれか。
- choices:
  - A: 腎杯・腎盂・尿管・膀胱
  - B: 腎杯・腎盂・尿管・尿道全体
  - C: 皮膚・膀胱・尿道
  - D: 腎皮質・腎髄質・膀胱
- answer: 腎杯・腎盂・尿管・膀胱
- explanation: 尿路上皮（移行上皮）は腎杯から膀胱までを確実に覆う。尿道は部位により被覆上皮の種類が異なるため、初学者向けには腎杯・腎盂・尿管・膀胱を確実な分布範囲として扱う。
- tags: 尿路上皮, 腎杯, 腎盂, 膀胱
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q098

- category: 泌尿器
- subcategory: 腎臓の内分泌機能
- difficulty: 2
- final_type: text_mcq
- question: 腎臓の内分泌機能に関係しないものはどれか。
- choices:
  - A: エリスロポエチン
  - B: レニン
  - C: 活性型ビタミンD
  - D: インスリン
- answer: インスリン
- explanation: 腎臓はエリスロポエチンやレニンの分泌、活性型ビタミンDの産生に関わる内分泌機能をもつ。インスリンは膵臓から分泌されるホルモンであり、腎臓の内分泌機能ではない。
- tags: 腎臓, 内分泌機能, エリスロポエチン, レニン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q099

- category: 泌尿器
- subcategory: 腎臓の位置
- difficulty: 1
- final_type: text_mcq
- question: 腎臓の位置として正しいものはどれか。
- choices:
  - A: 第3頸椎〜第6頸椎の高さ
  - B: 第12胸椎〜第3腰椎の高さ
  - C: 第1腰椎〜第5腰椎の高さのみ
  - D: 仙骨の高さ
- answer: 第12胸椎〜第3腰椎の高さ
- explanation: おおよそTh12〜L3の高さにある。
- tags: 腎臓, 位置
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: yes
- final_review_note: 授業内容として位置づいている代表値であり、既に適切な「約」「おおよそ」等の表現を使用していることを確認。numeric flag解除。

## Q100

- category: 泌尿器
- subcategory: 尿路
- difficulty: 2
- final_type: text_mcq
- question: 尿の通り道として正しいものはどれか。
- choices:
  - A: 腎乳頭→小腎杯→大腎杯→腎盂→尿管
  - B: 腎盂→腎乳頭→小腎杯→尿管
  - C: 腎皮質→大腎杯→腎盂→膀胱
  - D: 小腎杯→腎乳頭→腎盂→尿管
- answer: 腎乳頭→小腎杯→大腎杯→腎盂→尿管
- explanation: 腎内尿路の順序を押さえる。
- tags: 腎乳頭, 小腎杯, 大腎杯, 腎盂
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: current_v2
- teacher_review: no
- final_review_note: なし

## Q176

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: image_mcq
- question: ネフロンの模式図の①で示された、毛細血管の塊(糸球体)を包む構造はどれか。
- choices:
  - A: ボーマン嚢
  - B: 近位尿細管
  - C: 集合管
  - D: ヘンレ係蹄
- answer: ボーマン嚢
- explanation: ボーマン嚢は糸球体(毛細血管の塊)を包む袋状の構造で、糸球体とボーマン嚢を合わせて腎小体という(既存Q048/091)。
- tags: ボーマン嚢, 糸球体, 腎小体
- image_asset: q048_nephron.webp
- marker_target: ボーマン嚢
- image_status: exists_confirmed
- source: new
- teacher_review: no
- final_review_note: なし

## Q177

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: text_mcq
- question: 近位尿細管について正しいものはどれか。
- choices:
  - A: 腎小体に続く部分で、原尿中の水・グルコース・電解質などの大部分を再吸収する。
  - B: 近位尿細管は尿を最終的に濃縮する部位である。
  - C: 近位尿細管では再吸収は行われない。
  - D: 近位尿細管は膀胱に直接つながる。
- answer: 腎小体に続く部分で、原尿中の水・グルコース・電解質などの大部分を再吸収する。
- explanation: 近位尿細管は腎小体(ボーマン嚢)に続く部分で、原尿中の水・グルコース・アミノ酸・電解質などの大部分がここで再吸収される。
- tags: 近位尿細管, 再吸収
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q178

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: text_mcq
- question: ヘンレ係蹄について正しいものはどれか。
- choices:
  - A: 腎髄質へ向かってU字型に伸び、尿の濃縮に関わる。
  - B: ヘンレ係蹄は腎皮質のみに存在する。
  - C: ヘンレ係蹄では糸球体濾過が行われる。
  - D: ヘンレ係蹄は膀胱の一部である。
- answer: 腎髄質へ向かってU字型に伸び、尿の濃縮に関わる。
- explanation: ヘンレ係蹄は近位尿細管に続き、腎髄質へ向かってU字型に伸びる構造で、水・電解質の再吸収を通じて尿の濃縮に重要な役割を果たす。
- tags: ヘンレ係蹄, 尿の濃縮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q179

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: text_mcq
- question: 遠位尿細管について正しいものはどれか。
- choices:
  - A: ヘンレ係蹄に続き、集合管へ原尿を送る部分で、再吸収に加え分泌も行う。
  - B: 遠位尿細管は腎小体に直接つながる。
  - C: 遠位尿細管では再吸収も分泌も行われない。
  - D: 遠位尿細管は膀胱と同義である。
- answer: ヘンレ係蹄に続き、集合管へ原尿を送る部分で、再吸収に加え分泌も行う。
- explanation: 遠位尿細管はヘンレ係蹄に続き、集合管へ原尿を送る部分で、電解質の再吸収に加え、血液から尿細管腔への物質の分泌も行う。
- tags: 遠位尿細管, 分泌
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q180

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 1
- final_type: image_mcq
- question: 腎臓断面図の④で示された、複数のネフロンから原尿を集め、腎乳頭へ導く構造はどれか。
- choices:
  - A: 集合管
  - B: 糸球体
  - C: 腎動脈
  - D: 尿管
- answer: 集合管
- explanation: 集合管は複数のネフロンの遠位尿細管から原尿を集め、腎乳頭(既存Q093)へと導く。この過程でも水の再吸収が調節される。
- tags: 集合管
- image_asset: q091_kidney_cross_section.webp
- marker_target: 集合管
- image_status: planned_shared
- source: legacy_revised
- teacher_review: yes
- final_review_note: なし

## Q181

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 3
- final_type: text_mcq
- question: 糸球体濾過について正しいものはどれか。
- choices:
  - A: 糸球体内の血圧により、血漿成分の一部がボーマン嚢腔へ濾過される。
  - B: 糸球体濾過は尿細管で行われる。
  - C: 糸球体濾過には血圧は関与しない。
  - D: 糸球体濾過では血球もそのままボーマン嚢腔へ通過する。
- answer: 糸球体内の血圧により、血漿成分の一部がボーマン嚢腔へ濾過される。
- explanation: 糸球体濾過は、糸球体内の血圧によって血漿中の水・電解質・老廃物などがボーマン嚢腔へ押し出される現象である。血球やほとんどのタンパク質は通常、濾過されない。
- tags: 糸球体濾過, 血圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q182

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 原尿と尿の違いについて正しいものはどれか。
- choices:
  - A: 原尿の大部分は尿細管・集合管で再吸収され、残りが尿として排泄される。
  - B: 原尿と尿は同じ量・同じ成分である。
  - C: 尿は原尿よりも常に量が多い。
  - D: 原尿はそのまま膀胱へ送られる。
- answer: 原尿の大部分は尿細管・集合管で再吸収され、残りが尿として排泄される。
- explanation: 糸球体で濾過された原尿は1日あたり多量に生成されるが、その大部分が尿細管・集合管で再吸収され、残りのわずかな量が尿として排泄される。
- tags: 原尿, 尿生成
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q183

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 1
- final_type: text_mcq
- question: 尿細管での再吸収について正しいものはどれか。
- choices:
  - A: グルコース・水・電解質などが、尿細管腔から血液側へ戻される。
  - B: 再吸収は血液から尿細管腔への移動を指す。
  - C: 再吸収では老廃物のみが選択的に戻される。
  - D: 再吸収は腎臓では行われない過程である。
- answer: グルコース・水・電解質などが、尿細管腔から血液側へ戻される。
- explanation: 再吸収とは、尿細管腔にろ過された成分のうち、グルコース・水・電解質などの必要な物質が尿細管の細胞を介して血液側へ戻される過程である。
- tags: 再吸収
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q184

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 1
- final_type: text_mcq
- question: 尿細管での分泌について正しいものはどれか。
- choices:
  - A: 血液側から尿細管腔へ、不要な物質や水素イオンなどが排出される過程である。
  - B: 分泌は尿細管腔から血液側への移動を指す。
  - C: 分泌は再吸収と全く同じ現象である。
  - D: 尿細管での分泌は生じない。
- answer: 血液側から尿細管腔へ、不要な物質や水素イオンなどが排出される過程である。
- explanation: 分泌とは、再吸収とは逆方向に、血液側から尿細管腔へ不要な物質や水素イオンなどが排出される過程であり、体液の恒常性維持に関わる。
- tags: 分泌
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q185

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 抗利尿ホルモンの腎臓への作用について正しいものはどれか。
- choices:
  - A: 集合管での水の再吸収を促進し、尿量を減少させる。
  - B: 集合管での水の再吸収を抑制し、尿量を増加させる。
  - C: 抗利尿ホルモンは糸球体濾過を停止させる。
  - D: 抗利尿ホルモンは腎臓に作用しない。
- answer: 集合管での水の再吸収を促進し、尿量を減少させる。
- explanation: 抗利尿ホルモン(バソプレシン)は集合管に作用して水の再吸収を促進し、尿量を減少させることで体液量を保持する。
- tags: 抗利尿ホルモン, 水分調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q186

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 腎臓による電解質調節について正しいものはどれか。
- choices:
  - A: ナトリウムイオン(Na+)の再吸収量を調節することで、体液量にも影響を与える。
  - B: 腎臓は電解質の調節に関与しない。
  - C: ナトリウムイオンは腎臓で全く再吸収されない。
  - D: 電解質調節は膀胱で行われる。
- answer: ナトリウムイオン(Na+)の再吸収量を調節することで、体液量にも影響を与える。
- explanation: 腎臓はナトリウムイオン(Na+)などの電解質の再吸収量を調節しており、Na+は水を伴って再吸収されるため、この調節は体液量の調節にも直結する。
- tags: 電解質調節, ナトリウム
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q187

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 3
- final_type: text_mcq
- question: 腎臓による酸塩基平衡の調節について正しいものはどれか。
- choices:
  - A: 水素イオンの排泄や重炭酸イオンの再吸収を通じて、体液のpHを調節する。
  - B: 腎臓は酸塩基平衡の調節に関与しない。
  - C: 腎臓はすべての水素イオンを再吸収する。
  - D: 酸塩基平衡は肺のみで調節される。
- answer: 水素イオンの排泄や重炭酸イオンの再吸収を通じて、体液のpHを調節する。
- explanation: 腎臓は水素イオンの排泄や重炭酸イオンの再吸収を通じて、呼吸器系とともに体液の酸塩基平衡(既存総論Q116)を調節している。
- tags: 酸塩基平衡, 腎臓
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q188

- category: 泌尿器
- subcategory: 腎臓の内分泌機能
- difficulty: 1
- final_type: text_mcq
- question: 腎臓から分泌されるレニンの作用について正しいものはどれか。
- choices:
  - A: 血圧調節に関わるホルモン系(レニン-アンジオテンシン系)の引き金となる。
  - B: レニンは赤血球の産生を促進する。
  - C: レニンはカルシウムの吸収を促進する。
  - D: レニンは尿を直接生成する酵素である。
- answer: 血圧調節に関わるホルモン系(レニン-アンジオテンシン系)の引き金となる。
- explanation: レニンは腎臓から分泌される酵素で、血圧調節に関わるレニン-アンジオテンシン系という一連のホルモン反応の引き金となる。既存Q098(腎臓の内分泌機能)で存在が示されるレニンの具体的作用を確認する。
- tags: レニン, 血圧調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q189

- category: 泌尿器
- subcategory: 腎臓の内分泌機能
- difficulty: 1
- final_type: text_mcq
- question: 腎臓から分泌されるエリスロポエチンの作用について正しいものはどれか。
- choices:
  - A: 骨髄での赤血球の産生を促進する。
  - B: 血圧を直接低下させる。
  - C: カルシウムの吸収を促進する。
  - D: 尿の濃縮を直接行う。
- answer: 骨髄での赤血球の産生を促進する。
- explanation: エリスロポエチンは腎臓から分泌されるホルモンで、骨髄に作用して赤血球の産生を促進する。既存Q098で存在が示されるエリスロポエチンの具体的作用を確認する。
- tags: エリスロポエチン, 赤血球
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q190

- category: 泌尿器
- subcategory: 腎臓の内分泌機能
- difficulty: 1
- final_type: text_mcq
- question: 腎臓で活性化されるビタミンDの作用について正しいものはどれか。
- choices:
  - A: 腸管でのカルシウム吸収を促進する。
  - B: 赤血球の産生を促進する。
  - C: 血圧を直接上昇させる。
  - D: 尿量を直接増加させる。
- answer: 腸管でのカルシウム吸収を促進する。
- explanation: 腎臓で活性化されたビタミンD(活性型ビタミンD)は、主に腸管でのカルシウム吸収を促進する。既存Q098の内容を具体化する。
- tags: 活性型ビタミンD, カルシウム吸収
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q191

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 腎臓への血流について正しいものはどれか。
- choices:
  - A: 心拍出量のうち、比較的大きな割合(全身の血流の約4分の1程度)が腎臓に供給される。
  - B: 腎臓への血流は心拍出量のごく一部に限られる。
  - C: 腎臓は血流を全く必要としない臓器である。
  - D: 腎臓への血流は他の臓器よりも常に少ない。
- answer: 心拍出量のうち、比較的大きな割合(全身の血流の約4分の1程度)が腎臓に供給される。
- explanation: 腎臓は体重に占める割合は小さいものの、心拍出量のうち比較的大きな割合(安静時でおよそ4分の1程度)を受け取っており、豊富な血流のもとで尿生成を行っている。
- tags: 腎血流量
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q192

- category: 泌尿器
- subcategory: 尿路
- difficulty: 1
- final_type: image_mcq
- question: 泌尿器系の図中②で示された、尿を一時的に貯留する袋状の器官はどれか。
- choices:
  - A: 膀胱
  - B: 腎臓
  - C: 尿管
  - D: 尿道
- answer: 膀胱
- explanation: 膀胱は尿を一時的に貯留する袋状の器官で、平滑筋(排尿筋)の壁は伸展性に富み、尿量の増加に応じて大きく拡張することができる。
- tags: 膀胱, 伸展性
- image_asset: q050_urinary_system.webp
- marker_target: 膀胱
- image_status: planned_shared
- source: new
- teacher_review: no
- final_review_note: なし

## Q193

- category: 泌尿器
- subcategory: 尿路
- difficulty: 1
- final_type: text_mcq
- question: 尿道の男女差について正しいものはどれか。
- choices:
  - A: 男性の尿道は女性より長い。
  - B: 女性の尿道は男性より長い。
  - C: 男女で尿道の長さに差はない。
  - D: 尿道は女性にのみ存在する。
- answer: 男性の尿道は女性より長い。
- explanation: 男性の尿道は精路の一部としても機能するため女性より長く、女性の尿道は短いため、一般に尿路感染を起こしやすいとされる。
- tags: 尿道, 男女差
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q194

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 1
- final_type: text_mcq
- question: 腎盂について正しいものはどれか。
- choices:
  - A: 大腎杯が集まって形成され、下方へ続いて尿管に移行する。
  - B: 腎盂は腎皮質に存在する構造である。
  - C: 腎盂は膀胱の一部である。
  - D: 腎盂では尿の生成が行われる。
- answer: 大腎杯が集まって形成され、下方へ続いて尿管に移行する。
- explanation: 腎盂は大腎杯が集まって形成される漏斗状の構造で、下方へ続いて尿管に移行する。既存Q093（腎乳頭）・Q100（尿の通り道）の内容を接続する。
- tags: 腎盂, 尿管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: Q282を別内容へ置換したことにより解消。Q194は現行内容を維持。

## Q195

- category: 泌尿器
- subcategory: 尿路
- difficulty: 2
- final_type: text_mcq
- question: 尿管の走行について正しいものはどれか。
- choices:
  - A: 腎盂に続き、後腹膜を下行して膀胱の後外側から膀胱壁を貫いて開口する。
  - B: 尿管は腎臓から直接、体外へ開口する。
  - C: 尿管は腹腔内を自由に浮遊している。
  - D: 尿管は左右の腎臓の間をつなぐ管である。
- answer: 腎盂に続き、後腹膜を下行して膀胱の後外側から膀胱壁を貫いて開口する。
- explanation: 尿管は腎盂に続き、後腹膜を下行して骨盤内に入り、膀胱の後外側から膀胱壁を斜めに貫いて膀胱内腔に開口する。この斜めの走行が尿の逆流防止に役立つ。
- tags: 尿管, 走行
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q196

- category: 泌尿器
- subcategory: 腎臓の外形
- difficulty: 1
- final_type: text_mcq
- question: 腎臓を包む構造について正しいものはどれか。
- choices:
  - A: 線維被膜に加え、周囲を脂肪被膜が包み、腎臓の位置を保持する。
  - B: 腎臓は被膜をもたない臓器である。
  - C: 腎臓の被膜は骨組織である。
  - D: 腎臓の被膜は尿を生成する構造である。
- answer: 線維被膜に加え、周囲を脂肪被膜が包み、腎臓の位置を保持する。
- explanation: 腎臓は直接その表面を覆う線維被膜と、その外側の脂肪被膜(脂肪組織)によって包まれており、脂肪被膜は腎臓を正常な位置に保持する役割も果たす。
- tags: 腎臓, 線維被膜, 脂肪被膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q197

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 2
- final_type: text_mcq
- question: 排尿時の神経性調節について正しいものはどれか。
- choices:
  - A: 副交感神経の興奮により排尿筋が収縮し、尿が排出される。
  - B: 交感神経の興奮により排尿筋が収縮する。
  - C: 排尿は神経性の調節を受けない。
  - D: 排尿時には排尿筋が弛緩する。
- answer: 副交感神経の興奮により排尿筋が収縮し、尿が排出される。
- explanation: 排尿時には副交感神経(骨盤内臓神経)の興奮により膀胱壁の排尿筋が収縮し、同時に内尿道括約筋が弛緩することで尿が排出される。
- tags: 排尿反射, 副交感神経, 排尿筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: legacy_revised
- teacher_review: yes
- final_review_note: なし

## Q198

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 3
- final_type: text_mcq
- question: 蓄尿から排尿への一連の変化として正しいものはどれか。
- choices:
  - A: 蓄尿時は交感神経が優位で排尿筋が弛緩し、排尿時は副交感神経が優位となり排尿筋が収縮する。
  - B: 蓄尿時・排尿時とも同じ神経が同じように作用する。
  - C: 蓄尿時に排尿筋は収縮し続けている。
  - D: 排尿は外尿道括約筋の随意的な調節を一切受けない。
- answer: 蓄尿時は交感神経が優位で排尿筋が弛緩し、排尿時は副交感神経が優位となり排尿筋が収縮する。
- explanation: 蓄尿時は交感神経が優位で排尿筋が弛緩し内尿道括約筋が収縮する一方、排尿時は副交感神経が優位となり排尿筋が収縮し内尿道括約筋が弛緩する。さらに外尿道括約筋(骨格筋)は随意的に調節できる。既存Q089・Q090・Q094の内容を統合する。
- tags: 蓄尿, 排尿, 排尿反射
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q199

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 2
- final_type: text_mcq
- question: ネフロンにおける原尿(尿)の流れとして正しい順序はどれか。
- choices:
  - A: 腎小体→近位尿細管→ヘンレ係蹄→遠位尿細管→集合管
  - B: 腎小体→集合管→近位尿細管→遠位尿細管→ヘンレ係蹄
  - C: 近位尿細管→腎小体→ヘンレ係蹄→集合管→遠位尿細管
  - D: 腎小体→遠位尿細管→近位尿細管→ヘンレ係蹄→集合管
- answer: 腎小体→近位尿細管→ヘンレ係蹄→遠位尿細管→集合管
- explanation: ネフロンにおいて原尿は、腎小体(糸球体・ボーマン嚢)→近位尿細管→ヘンレ係蹄→遠位尿細管→集合管の順に流れる。既存Q046やQ176〜180で個別に学んだ各部位を、一連の流れとして統合する。
- tags: ネフロン, 尿の流れ
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: difficulty3からdifficulty2へ変更。基本経路・定義・単一機序の理解が中心で、複数知識を使った統合的判断というdifficulty3の基準には達しないと判断。

## Q200

- category: 泌尿器
- subcategory: 腎血流
- difficulty: 2
- final_type: text_mcq
- question: 糸球体を通る血液の流れとして正しいものはどれか。
- choices:
  - A: 輸入細動脈→糸球体→輸出細動脈
  - B: 輸出細動脈→糸球体→輸入細動脈
  - C: 腎静脈→糸球体→腎動脈
  - D: 尿管→糸球体→腎盂
- answer: 輸入細動脈→糸球体→輸出細動脈
- explanation: 糸球体は輸入細動脈から血液を受け、糸球体毛細血管を通った血液は輸出細動脈へ流れる。
- tags: 糸球体, 輸入細動脈, 輸出細動脈
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「左右の腎臓の位置関係について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。 / HIGH重複（Q044と同一事実の再言及）解消のため、糸球体の血流経路という別内容へ置換。difficultyは2に設定。

## Q278

- category: 泌尿器
- subcategory: 腎臓の外形
- difficulty: 1
- final_type: text_mcq
- question: 成人の腎臓の大きさの目安について、最も近いものはどれか。
- choices:
  - A: 握りこぶし大、長さ約10cm程度
  - B: 手のひらより大きく、長さ約30cm
  - C: 米粒程度の大きさ
  - D: 肺と同程度の大きさ
- answer: 握りこぶし大、長さ約10cm程度
- explanation: 成人の腎臓は握りこぶし大程度、長さはおよそ10cm程度とされる。
- tags: 腎臓の大きさ
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q279

- category: 泌尿器
- subcategory: 腎臓の外形
- difficulty: 2
- final_type: text_mcq
- question: 腎臓の被膜構造について、既存の線維被膜・脂肪被膜に加えて正しいものはどれか。
- choices:
  - A: 最外層には腎筋膜があり、腎臓を後腹壁に固定する。
  - B: 腎臓を包む被膜は線維被膜のみである。
  - C: 脂肪被膜が最も外側の層である。
  - D: 腎筋膜は腎臓の内部構造の一部である。
- answer: 最外層には腎筋膜があり、腎臓を後腹壁に固定する。
- explanation: 腎臓は内側から線維被膜・脂肪被膜・腎筋膜という順に包まれており、腎筋膜は腎臓を後腹壁に固定する役割を果たす。既存Q196(線維被膜・脂肪被膜)を完成させる。
- tags: 腎筋膜, 被膜
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q280

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 2
- final_type: text_mcq
- question: 腎柱について正しいものはどれか。
- choices:
  - A: 腎皮質の一部が腎髄質(腎錐体)の間に入り込んだ部分である。
  - B: 腎柱は腎盂の一部である。
  - C: 腎柱は尿管の一部である。
  - D: 腎柱は膀胱に存在する構造である。
- answer: 腎皮質の一部が腎髄質(腎錐体)の間に入り込んだ部分である。
- explanation: 腎柱は腎皮質の一部が隣り合う腎錐体(既存Q092)の間に入り込んだ部分であり、腎臓内部構造の理解を補完する。
- tags: 腎柱, 腎皮質
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q281

- category: 泌尿器
- subcategory: 腎臓の内部構造
- difficulty: 2
- final_type: text_mcq
- question: 小腎杯・大腎杯について正しいものはどれか。
- choices:
  - A: 小腎杯が腎乳頭を包み、複数の小腎杯が集まって大腎杯を形成する。
  - B: 大腎杯が集まって小腎杯を形成する。
  - C: 小腎杯は腎盂よりも下流(尿管側)に位置する。
  - D: 小腎杯・大腎杯は糸球体の一部である。
- answer: 小腎杯が腎乳頭を包み、複数の小腎杯が集まって大腎杯を形成する。
- explanation: 小腎杯は腎乳頭(既存Q093)を包む構造で、複数の小腎杯が集まって大腎杯を形成し、大腎杯がさらに集まって腎盂(既存Q194)を形成する。既存Q100(尿の通り道)の階層構造を明確化する。
- tags: 小腎杯, 大腎杯
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q282

- category: 泌尿器
- subcategory: 腎血流・再吸収
- difficulty: 2
- final_type: text_mcq
- question: 尿細管周囲毛細血管の主な役割として正しいものはどれか。
- choices:
  - A: 尿細管から再吸収された水や溶質を血液へ戻す。
  - B: 尿を膀胱へ運ぶ。
  - C: 糸球体濾液を腎盂へ直接送る。
  - D: 尿を一時的に貯留する。
- answer: 尿細管から再吸収された水や溶質を血液へ戻す。
- explanation: 尿細管周囲毛細血管は尿細管に沿って分布し、尿細管から再吸収された水や溶質を血液へ戻す役割をもつ。
- tags: 尿細管周囲毛細血管, 再吸収
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: 旧設問「腎盂の役割について正しいものはどれか。」を、2026年度授業で明示的に扱う基本的運動方向の内容へ置換。 / HIGH重複（Q194と同一内容の再言及）解消のため、尿細管周囲毛細血管の役割という別内容へ置換。

## Q283

- category: 泌尿器
- subcategory: 腎臓の内分泌機能
- difficulty: 1
- final_type: text_mcq
- question: 傍糸球体装置について正しいものはどれか。
- choices:
  - A: 糸球体の近くに存在し、レニンを分泌する部位である。
  - B: 傍糸球体装置は膀胱に存在する。
  - C: 傍糸球体装置はエリスロポエチンのみを分泌する。
  - D: 傍糸球体装置は尿の通路である。
- answer: 糸球体の近くに存在し、レニンを分泌する部位である。
- explanation: 傍糸球体装置は糸球体の近傍に存在し、既存Q188のレニンを分泌する部位である。
- tags: 傍糸球体装置, レニン
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q284

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 糸球体濾過量(GFR)について正しいものはどれか。
- choices:
  - A: 単位時間あたりに糸球体で濾過される血漿量を表す、腎機能の指標である。
  - B: 糸球体濾過量は尿の色を表す指標である。
  - C: 糸球体濾過量は血圧そのものを指す。
  - D: 糸球体濾過量は膀胱の容量を表す。
- answer: 単位時間あたりに糸球体で濾過される血漿量を表す、腎機能の指標である。
- explanation: 糸球体濾過量(GFR)は、単位時間あたりに糸球体(既存Q181)で濾過される血漿量を表し、腎機能を評価する代表的な生理学的指標である。
- tags: 糸球体濾過量, GFR
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q285

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 腎血流の自己調節能について正しいものはどれか。
- choices:
  - A: 血圧が一定範囲で変動しても、腎血流量をほぼ一定に保つ仕組みが備わっている。
  - B: 腎血流は血圧の変化にそのまま比例して変動する。
  - C: 腎臓には血流を調節する仕組みが存在しない。
  - D: 腎血流は心拍数のみによって決まる。
- answer: 血圧が一定範囲で変動しても、腎血流量をほぼ一定に保つ仕組みが備わっている。
- explanation: 腎臓には、血圧が一定範囲で変動しても腎血流量(既存Q191)をほぼ一定に保つ自己調節能が備わっており、安定した尿生成を支えている。
- tags: 腎血流, 自己調節能
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q286

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 3
- final_type: text_mcq
- question: ヘンレ係蹄による尿濃縮の仕組みについて正しいものはどれか。
- choices:
  - A: 下行脚と上行脚の間で対向流の仕組みがはたらき、腎髄質の浸透圧勾配を形成して尿を濃縮する。
  - B: ヘンレ係蹄では尿の濃縮は行われない。
  - C: ヘンレ係蹄は水のみを分泌する構造である。
  - D: ヘンレ係蹄は糸球体濾過を行う構造である。
- answer: 下行脚と上行脚の間で対向流の仕組みがはたらき、腎髄質の浸透圧勾配を形成して尿を濃縮する。
- explanation: ヘンレ係蹄(既存Q178)は下行脚・上行脚からなり、両者の間で対向流の仕組みがはたらくことで腎髄質に浸透圧勾配を形成し、尿を濃縮する。
- tags: ヘンレ係蹄, 対向流増幅系, 尿濃縮
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q287

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 1
- final_type: text_mcq
- question: 尿浸透圧について正しいものはどれか。
- choices:
  - A: 尿中に溶けている溶質の濃度を反映し、体内の水分状態によって変動する。
  - B: 尿浸透圧は常に一定である。
  - C: 尿浸透圧は血圧を直接表す指標である。
  - D: 尿浸透圧は尿の色そのものである。
- answer: 尿中に溶けている溶質の濃度を反映し、体内の水分状態によって変動する。
- explanation: 尿浸透圧は尿中の溶質濃度を反映し、体内の水分状態(既存の浸透Q204、抗利尿ホルモンQ185)によって変動する。
- tags: 尿浸透圧
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q288

- category: 泌尿器
- subcategory: 尿路上皮
- difficulty: 2
- final_type: text_mcq
- question: 膀胱の内腔を覆う粘膜について正しいものはどれか。
- choices:
  - A: 尿路上皮(移行上皮)に覆われ、伸展に対応できる構造をもつ。
  - B: 膀胱の内腔は骨格筋で覆われる。
  - C: 膀胱の内腔は単層の扁平上皮で覆われる。
  - D: 膀胱の内腔に上皮は存在しない。
- answer: 尿路上皮(移行上皮)に覆われ、伸展に対応できる構造をもつ。
- explanation: 膀胱の内腔は尿路上皮(既存Q049,097)に覆われ、この上皮は伸展・収縮に応じて形を変えられる移行上皮としての特徴をもつ。既存Q192(膀胱の伸展性)と接続する。
- tags: 尿路上皮, 膀胱
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q289

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 2
- final_type: text_mcq
- question: 内尿道括約筋について正しいものはどれか。
- choices:
  - A: 平滑筋からなり、不随意的に蓄尿時に収縮し排尿時に弛緩する。
  - B: 内尿道括約筋は骨格筋であり随意的に調節できる。
  - C: 内尿道括約筋は常に弛緩している。
  - D: 内尿道括約筋は外尿道括約筋と同じ構造である。
- answer: 平滑筋からなり、不随意的に蓄尿時に収縮し排尿時に弛緩する。
- explanation: 内尿道括約筋は平滑筋からなり、既存Q089・090のとおり不随意的に蓄尿時に収縮し排尿時に弛緩する。骨格筋であり随意的に調節できる外尿道括約筋(既存Q094)とは対照的である。
- tags: 内尿道括約筋, 外尿道括約筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q290

- category: 泌尿器
- subcategory: 排尿反射
- difficulty: 1
- final_type: text_mcq
- question: 膀胱の排尿筋について正しいものはどれか。
- choices:
  - A: 平滑筋からなり、収縮することで膀胱内の尿を排出する。
  - B: 排尿筋は骨格筋であり随意的に収縮する。
  - C: 排尿筋は膀胱の粘膜を構成する組織である。
  - D: 排尿筋は尿管に存在する構造である。
- answer: 平滑筋からなり、収縮することで膀胱内の尿を排出する。
- explanation: 排尿筋は膀胱壁を構成する平滑筋であり、副交感神経の作用(既存Q197)により収縮して膀胱内の尿を排出する。
- tags: 排尿筋
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q291

- category: 泌尿器
- subcategory: 尿路
- difficulty: 2
- final_type: text_mcq
- question: 尿管における尿の移送について正しいものはどれか。
- choices:
  - A: 尿管平滑筋の蠕動運動によって、尿は腎盂から膀胱へ運ばれる。
  - B: 尿は重力のみによって尿管を移動する。
  - C: 尿管に平滑筋は存在しない。
  - D: 尿管では尿の逆流が常に起こっている。
- answer: 尿管平滑筋の蠕動運動によって、尿は腎盂から膀胱へ運ばれる。
- explanation: 尿管の壁には平滑筋があり、その蠕動運動によって尿は腎盂から膀胱へ能動的に運ばれる。既存Q195(尿管の走行)を機能面から補完する。
- tags: 尿管, 蠕動運動
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q292

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 1
- final_type: text_mcq
- question: 腎臓の老廃物排泄機能について正しいものはどれか。
- choices:
  - A: 血液中の老廃物を濾過・排泄し、体内の恒常性を維持する。
  - B: 腎臓は老廃物の排泄に関与しない。
  - C: 老廃物の排泄は膀胱のみで行われる。
  - D: 腎臓はすべての老廃物を再吸収する。
- answer: 血液中の老廃物を濾過・排泄し、体内の恒常性を維持する。
- explanation: 腎臓は血液中の老廃物(尿素など)を濾過・排泄することで、総論の恒常性(既存Q112)の維持に貢献している。
- tags: 老廃物, 恒常性
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q293

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 尿の主な成分について正しいものはどれか。
- choices:
  - A: 水分に、尿素などの老廃物や電解質が溶けている。
  - B: 尿はグルコースを主成分とする。
  - C: 尿にはタンパク質が大量に含まれるのが正常である。
  - D: 尿は血液そのものである。
- answer: 水分に、尿素などの老廃物や電解質が溶けている。
- explanation: 正常な尿は水分を主体とし、尿素などの老廃物や電解質が溶けている。健常時、グルコースやタンパク質は糸球体で濾過されても大部分が再吸収され、尿中にはほとんど排出されない。
- tags: 尿の成分
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q294

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 尿量の調節に関わるホルモンの組み合わせとして適切なものはどれか。
- choices:
  - A: 抗利尿ホルモンとレニン-アンジオテンシン系
  - B: インスリンとグルカゴンのみ
  - C: 甲状腺ホルモンのみ
  - D: 尿量はホルモンの影響を受けない。
- answer: 抗利尿ホルモンとレニン-アンジオテンシン系
- explanation: 尿量は、集合管での水の再吸収を促進する抗利尿ホルモン(既存Q185)と、Na+再吸収などを介するレニン-アンジオテンシン系(既存Q188)によって統合的に調節される。
- tags: 抗利尿ホルモン, レニン-アンジオテンシン系, 尿量調節
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q295

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 2
- final_type: text_mcq
- question: 腎臓による主な電解質・ミネラル調節の組み合わせとして正しいものはどれか。
- choices:
  - A: ナトリウムの再吸収調節、カリウムの分泌調節、活性型ビタミンDを介したカルシウム吸収の調節
  - B: 腎臓はナトリウムの調節にのみ関与する。
  - C: 腎臓はカルシウム代謝に一切関与しない。
  - D: 腎臓は電解質調節を行わない臓器である。
- answer: ナトリウムの再吸収調節、カリウムの分泌調節、活性型ビタミンDを介したカルシウム吸収の調節
- explanation: 腎臓はナトリウムの再吸収調節(既存Q186)、カリウムの分泌調節、活性型ビタミンD(既存Q190)を介したカルシウム吸収の調節など、複数の電解質・ミネラル調節に関与する統合的な臓器である。
- tags: 電解質調節, 活性型ビタミンD
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q296

- category: 泌尿器
- subcategory: 尿生成
- difficulty: 3
- final_type: text_mcq
- question: 体液の酸塩基平衡調節における腎臓と呼吸器の役割分担として正しいものはどれか。
- choices:
  - A: 呼吸器は二酸化炭素の排出により速やかに、腎臓は水素イオン排泄・重炭酸イオン再吸収により緩やかに調節する。
  - B: 腎臓のみが酸塩基平衡を調節し、呼吸器は関与しない。
  - C: 呼吸器のみが酸塩基平衡を調節し、腎臓は関与しない。
  - D: 腎臓と呼吸器は同じ速さで酸塩基平衡を調節する。
- answer: 呼吸器は二酸化炭素の排出により速やかに、腎臓は水素イオン排泄・重炭酸イオン再吸収により緩やかに調節する。
- explanation: 呼吸器は二酸化炭素の排出量を調節することで比較的速やかに、腎臓は水素イオンの排泄や重炭酸イオンの再吸収(既存Q187)を通じて比較的緩やかに、体液の酸塩基平衡(総論Q116,212)を調節する。両者の時間スケールの違いを統合的に理解する。
- tags: 酸塩基平衡, 呼吸器, 腎臓
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: ADH・RAAS・EPO・活性型ビタミンD・傍糸球体装置・酸塩基平衡は腎機能として扱う限り、他領域接続のみを理由にスコープ外としない。scope flag解除（内容の重複は別途監査済み）。

## Q297

- category: 泌尿器
- subcategory: 腎臓の位置
- difficulty: 2
- final_type: text_mcq
- question: 腎臓の位置と体表指標の関係について正しいものはどれか。
- choices:
  - A: 腎臓は後腹膜に位置し、第12肋骨がその後面の目安となる。
  - B: 腎臓は腹腔の中央前面に位置する。
  - C: 腎臓の位置は体表から全く把握できない。
  - D: 腎臓は骨盤腔の中央に位置する。
- answer: 腎臓は後腹膜に位置し、第12肋骨がその後面の目安となる。
- explanation: 腎臓は後腹膜に位置し、その後面は第12肋骨あたりが体表からの目安となる。既存Q044・Q099・Q200（腎臓の位置）を、体表指標という観点から統合する。
- tags: 腎臓の位置, 体表指標
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q298

- category: 泌尿器
- subcategory: ネフロン
- difficulty: 2
- final_type: text_mcq
- question: ネフロンの各部位とその主なはたらきの組み合わせとして正しいものはどれか。
- choices:
  - A: 糸球体―血液の濾過、近位尿細管―大部分の再吸収、集合管―最終的な水の調節
  - B: 糸球体―水の再吸収、近位尿細管―血液の濾過、集合管―血液の濾過
  - C: すべての部位が同じはたらきをする。
  - D: 集合管でのみ血液の濾過が行われる。
- answer: 糸球体―血液の濾過、近位尿細管―大部分の再吸収、集合管―最終的な水の調節
- explanation: ネフロンの各部位はそれぞれ異なる役割を担う：糸球体(既存Q181)は血液の濾過、近位尿細管(既存Q177,183)は大部分の再吸収、集合管(既存Q180,185)は最終的な水の調節を行う。既存Q199（尿の流れの順序）とは異なる、機能面での対応づけを問う。
- tags: ネフロン, 糸球体, 近位尿細管, 集合管
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: yes
- final_review_note: なし

## Q299

- category: 泌尿器
- subcategory: 尿路
- difficulty: 2
- final_type: text_mcq
- question: 泌尿器系全体の構成について正しいものはどれか。
- choices:
  - A: 腎臓で尿が生成され、腎杯・腎盂・尿管を経て膀胱に貯留し、尿道から排泄される。
  - B: 尿は膀胱で生成される。
  - C: 尿は腎臓から直接体外へ排泄される。
  - D: 尿管は腎臓と肺をつなぐ管である。
- answer: 腎臓で尿が生成され、腎杯・腎盂・尿管を経て膀胱に貯留し、尿道から排泄される。
- explanation: 泌尿器系は、腎臓で生成された尿が腎杯・腎盂を経て尿管を通り膀胱に一時貯留され、蓄尿・排尿反射(既存Q089,090,197,198)を経て尿道から体外へ排泄される、という一連の系統である。
- tags: 泌尿器系, 尿路
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

## Q300

- category: 泌尿器
- subcategory: 泌尿器系の総合
- difficulty: 3
- final_type: text_mcq
- question: 循環器系・呼吸器系・泌尿器系の連携による恒常性の維持について正しいものはどれか。
- choices:
  - A: 循環器系が物質を運搬し、呼吸器系がガス交換を行い、泌尿器系が老廃物・水分・電解質を排泄することで、体内環境の恒常性が維持される。
  - B: 循環器系・呼吸器系・泌尿器系はそれぞれ完全に独立し、互いに影響しない。
  - C: 恒常性の維持には循環器系のみが関与し、他の系統は関与しない。
  - D: 呼吸器系と泌尿器系は互いに全く無関係な機能を担う。
- answer: 循環器系が物質を運搬し、呼吸器系がガス交換を行い、泌尿器系が老廃物・水分・電解質を排泄することで、体内環境の恒常性が維持される。
- explanation: 循環器系(血液による物質の運搬)・呼吸器系(ガス交換)・泌尿器系(老廃物・水分・電解質の排泄)は、総論で学んだ恒常性(既存Q112,223)を実現するために互いに連携してはたらいている。本アプリが扱う総論・循環器・呼吸器・泌尿器の4領域全体を貫く、300問の最終的な統合理解である。
- tags: 恒常性, 器官系の協調
- image_asset: なし
- marker_target: なし
- image_status: n/a
- source: new
- teacher_review: no
- final_review_note: なし

---

