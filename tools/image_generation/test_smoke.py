#!/usr/bin/env python3
"""Smoke tests for the image-generation pipeline that do not require any
API key or network access. Run with:

    tools/image_generation/.venv/Scripts/python.exe tools/image_generation/test_smoke.py

Exits 0 and prints "OK" on success, non-zero with a message on failure.
"""
from __future__ import annotations

import io
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import manifest  # noqa: E402
import utils  # noqa: E402
from providers.base import ProviderError  # noqa: E402
from providers.gemini import GeminiProvider  # noqa: E402
from providers.openai_provider import OpenAIProvider  # noqa: E402


def check(label: str, condition: bool) -> None:
    status = "ok" if condition else "FAIL"
    print(f"[{status}] {label}")
    if not condition:
        raise AssertionError(label)


def main() -> int:
    entries = manifest.build_manifest()
    check("manifest has 20 unique assets", len(entries) == 20)
    check("prompt_ids are unique", len({e.prompt_id for e in entries}) == len(entries))
    check(
        "every entry has a non-empty question_ids list",
        all(e.question_ids for e in entries),
    )
    missing = manifest.missing_assets()
    existing = [e for e in entries if e.exists]
    check("missing + existing == total", len(missing) + len(existing) == len(entries))
    check(
        "every entry parsed a generation prompt from the docs file",
        all(e.prompt_text for e in entries),
    )

    known = manifest.find_entry("IMG-005")
    check("find_entry resolves a known id", known is not None and known.asset.endswith("q016_apex.webp"))
    check("find_entry returns None for unknown id", manifest.find_entry("IMG-999") is None)

    # Provider availability must reflect environment state, and generate()
    # must fail cleanly (ProviderError, not a raw exception) with no key set.
    for env_var in ("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENAI_API_KEY"):
        os.environ.pop(env_var, None)

    check("GeminiProvider.is_available() is False with no key", GeminiProvider.is_available() is False)
    check("OpenAIProvider.is_available() is False with no key", OpenAIProvider.is_available() is False)

    raised = False
    try:
        GeminiProvider().generate("test prompt", 1)
    except ProviderError:
        raised = True
    check("GeminiProvider.generate() raises ProviderError without a key", raised)

    raised = False
    try:
        OpenAIProvider().generate("test prompt", 1)
    except ProviderError:
        raised = True
    check("OpenAIProvider.generate() raises ProviderError without a key", raised)

    # WebP conversion round-trip on a tiny synthetic image (no network).
    from PIL import Image

    buf = io.BytesIO()
    Image.new("RGB", (4, 4), color=(200, 40, 40)).save(buf, format="PNG")
    webp_bytes = utils.to_webp_bytes(buf.getvalue())
    check("to_webp_bytes produces non-empty output", len(webp_bytes) > 0)
    w, h = utils.image_dimensions(webp_bytes)
    check("round-tripped image keeps its dimensions", (w, h) == (4, 4))
    with Image.open(io.BytesIO(webp_bytes)) as decoded:
        check("output decodes as WEBP", decoded.format == "WEBP")

    print("OK")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as exc:
        print(f"SMOKE TEST FAILED: {exc}", file=sys.stderr)
        raise SystemExit(1)
