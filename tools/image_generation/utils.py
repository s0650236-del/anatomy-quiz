"""Small shared helpers: WebP conversion and candidate-file bookkeeping.

Kept deliberately thin -- this is not a general image-processing library,
just what generate_anatomy_image.py needs.
"""
from __future__ import annotations

import io
from pathlib import Path
from typing import List

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_CANDIDATE_DIR = REPO_ROOT / "tmp" / "image_candidates"


def to_webp_bytes(raw: bytes, quality: int = 90) -> bytes:
    """Convert arbitrary image bytes (PNG/JPEG/etc.) to WebP bytes."""
    from PIL import Image

    with Image.open(io.BytesIO(raw)) as img:
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.mode else "RGB")
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=quality)
        return buf.getvalue()


def image_dimensions(raw: bytes):
    from PIL import Image

    with Image.open(io.BytesIO(raw)) as img:
        return img.size  # (width, height)


def save_candidates(prompt_id: str, images: List[bytes], output_dir: Path) -> List[Path]:
    """Save already-WebP-encoded candidate bytes as
    {output_dir}/{prompt_id}_candidate_{n}.webp and return their paths.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    paths = []
    for i, data in enumerate(images, start=1):
        p = output_dir / f"{prompt_id}_candidate_{i}.webp"
        p.write_bytes(data)
        paths.append(p)
    return paths


def timestamp() -> str:
    """UTC timestamp string for logging. Uses the OS clock, not injected --
    this tool runs as a real CLI process, not inside the Workflow sandbox
    that forbids Date.now().
    """
    import datetime

    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
