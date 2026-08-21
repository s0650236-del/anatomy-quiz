"""Builds the image-generation manifest: unique asset <-> prompt_id <-> questions.

The manifest is derived, not hand-maintained: it is computed fresh from
data/questions_v1.json (which questions reference which asset/prompt_id)
and docs/image_generation_prompts_v1.md (the canonical generation prompt
text for each prompt_id). This keeps the two files as the single source of
truth instead of duplicating asset lists inside the tool.
"""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional

REPO_ROOT = Path(__file__).resolve().parents[2]
QUESTIONS_PATH = REPO_ROOT / "data" / "questions_v1.json"
PROMPTS_DOC_PATH = REPO_ROOT / "docs" / "image_generation_prompts_v1.md"
ASSETS_DIR = REPO_ROOT / "assets" / "images"

_HEADING_RE = re.compile(r"^## (IMG-\d{3}) / ([^\n]+)$", re.MULTILINE)
_PROMPT_BLOCK_RE = re.compile(
    r"\*\*生成プロンプト\*\*\s*\n\n(.+?)\n\n\*\*オーバーレイ指示\*\*：(.+?)\s*$",
    re.DOTALL,
)


@dataclass
class AssetEntry:
    prompt_id: str
    asset: str
    title: str = ""
    prompt_text: Optional[str] = None
    overlay_note: Optional[str] = None
    question_ids: List[str] = field(default_factory=list)

    @property
    def asset_path(self) -> Path:
        return REPO_ROOT / self.asset

    @property
    def exists(self) -> bool:
        return self.asset_path.exists()

    @property
    def output_filename(self) -> str:
        return Path(self.asset).name


def load_questions() -> dict:
    return json.loads(QUESTIONS_PATH.read_text(encoding="utf-8"))


def load_prompt_docs() -> Dict[str, dict]:
    """Parse docs/image_generation_prompts_v1.md into {prompt_id: {...}}."""
    text = PROMPTS_DOC_PATH.read_text(encoding="utf-8")
    headings = list(_HEADING_RE.finditer(text))
    out: Dict[str, dict] = {}
    for i, m in enumerate(headings):
        prompt_id, title = m.group(1), m.group(2).strip()
        start = m.end()
        end = headings[i + 1].start() if i + 1 < len(headings) else len(text)
        section = text[start:end]
        pm = _PROMPT_BLOCK_RE.search(section)
        out[prompt_id] = {
            "title": title,
            "prompt_text": pm.group(1).strip() if pm else None,
            "overlay_note": pm.group(2).strip() if pm else None,
        }
    return out


def build_manifest() -> List[AssetEntry]:
    """One AssetEntry per unique (prompt_id, asset) pair, in prompt_id order."""
    data = load_questions()
    prompts = load_prompt_docs()

    by_prompt_id: Dict[str, AssetEntry] = {}
    for q in data["questions"]:
        image = q.get("image")
        if not image:
            continue
        pid = image["prompt_id"]
        asset = image["asset"]
        if pid not in by_prompt_id:
            doc = prompts.get(pid, {})
            by_prompt_id[pid] = AssetEntry(
                prompt_id=pid,
                asset=asset,
                title=doc.get("title", ""),
                prompt_text=doc.get("prompt_text"),
                overlay_note=doc.get("overlay_note"),
            )
        elif by_prompt_id[pid].asset != asset:
            raise ValueError(
                f"prompt_id {pid} maps to two different assets: "
                f"{by_prompt_id[pid].asset} vs {asset} (canonicalization broken)"
            )
        by_prompt_id[pid].question_ids.append(q["id"])

    return [by_prompt_id[pid] for pid in sorted(by_prompt_id)]


def missing_assets() -> List[AssetEntry]:
    return [e for e in build_manifest() if not e.exists]


def find_entry(prompt_id: str) -> Optional[AssetEntry]:
    for e in build_manifest():
        if e.prompt_id == prompt_id:
            return e
    return None


if __name__ == "__main__":
    for entry in build_manifest():
        status = "EXISTS" if entry.exists else "missing"
        print(f"{entry.prompt_id}  {status:7s}  {entry.asset}  <- {','.join(entry.question_ids)}")
