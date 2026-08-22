# v2 Release Deployment Log

anatomy-quiz v2（300問・65 image_mcq）を`main`へ統合し、GitHub Pagesへ本番公開する際の記録。

---

## 旧production復旧点（rollback基準）

`main`統合作業を開始する前の`main`の状態を、rollbackの基準点として記録する。

| 項目 | 値 |
|---|---|
| 旧production HEAD（完全hash） | `f7b05ecf33c06a103b57223811c9c922e30d90b1` |
| コミットメッセージ | `fix: update default anatomy image model` |
| 状態 | v2-development分岐前の、旧100問版（image_mcq 29問）相当のmain |

**この時点ではtagを作成しない。** 万一production公開後に重大な問題が発見された場合は、`git revert`によってこの復旧点相当の状態へ戻せることを確認したうえでrollbackする（`git reset --hard`やforce pushは使用しない）。

---

## 統合対象（Release Candidate）

| 項目 | 値 |
|---|---|
| 統合元ブランチ | v2-development |
| 統合元HEAD | `b4bb3b05f37805e7944f848c3887deedbbcea4fa` |
| questions | 300 |
| category | 総論70 / 循環器85 / 呼吸器75 / 泌尿器70 |
| difficulty | 1:170 / 2:107 / 3:23 |
| text_mcq / image_mcq | 235 / 65 |
| image assets | 27（missing 0） |
| overlayありQID | 64（overlayなし：Q051のみ、仕様上正当） |
| marker総数 | 89 |
| Service Worker cache | `anatomy-quiz-v2-2026-08-300q-img`（CORE 7 + IMAGE 27 = 34件precache、画像は約1.41MB） |

以降の節は、本番検証（merge → push → Pages公開 → production smoke test）の進行に合わせて追記する。
