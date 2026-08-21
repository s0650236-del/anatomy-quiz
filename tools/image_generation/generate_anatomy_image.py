#!/usr/bin/env python3
"""Anatomy quiz image-generation CLI.

Turns one canonical generation prompt (docs/image_generation_prompts_v1.md)
into candidate WebP images saved under tmp/image_candidates/, using an
external image-generation API (Gemini or OpenAI). It never decides which
candidate is medically correct and never writes to assets/images/ itself --
a human (or Claude, visually inspecting the saved candidate files) picks
the winner and copies it into place by hand. That separation is
deliberate: this tool automates *generation*, not *acceptance*.

Examples
--------
Audit current asset status:
    python tools/image_generation/generate_anatomy_image.py --audit

Print the full generation plan for every missing asset (no API calls):
    python tools/image_generation/generate_anatomy_image.py --plan

Dry-run one prompt (no API key required, no network call):
    python tools/image_generation/generate_anatomy_image.py \\
        --prompt-id IMG-005 --dry-run

Actually generate 3 candidates:
    python tools/image_generation/generate_anatomy_image.py \\
        --prompt-id IMG-005 --candidates 3 --provider gemini
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

REPO_ROOT = Path(__file__).resolve().parents[2]
try:
    from dotenv import load_dotenv

    load_dotenv(REPO_ROOT / ".env")
except ImportError:
    pass  # python-dotenv not installed: fall back to real environment variables only

import manifest  # noqa: E402
import utils  # noqa: E402
from providers.base import Provider, ProviderError  # noqa: E402
from providers.gemini import GeminiProvider  # noqa: E402
from providers.openai_provider import OpenAIProvider  # noqa: E402

# Priority order per project policy: Gemini first, then OpenAI.
PROVIDER_REGISTRY = {
    "gemini": GeminiProvider,
    "openai": OpenAIProvider,
}
PROVIDER_PRIORITY = ["gemini", "openai"]


def pick_provider(explicit: str | None) -> type[Provider]:
    if explicit:
        if explicit not in PROVIDER_REGISTRY:
            raise SystemExit(f"unknown provider: {explicit} (choices: {', '.join(PROVIDER_REGISTRY)})")
        return PROVIDER_REGISTRY[explicit]
    for name in PROVIDER_PRIORITY:
        cls = PROVIDER_REGISTRY[name]
        if cls.is_available():
            return cls
    # Nothing available -- default to the highest-priority one so callers
    # (esp. --dry-run) still get a sensible provider identity to print.
    return PROVIDER_REGISTRY[PROVIDER_PRIORITY[0]]


def cmd_audit() -> int:
    entries = manifest.build_manifest()
    exists = [e for e in entries if e.exists]
    missing = [e for e in entries if not e.exists]
    print(f"unique assets: {len(entries)}  (exist: {len(exists)}  missing: {len(missing)})")
    print()
    for e in entries:
        status = "EXISTS " if e.exists else "MISSING"
        qs = ",".join(e.question_ids)
        print(f"[{status}] {e.prompt_id}  {e.asset}  <- {qs}")
    return 0


def cmd_plan() -> int:
    missing = manifest.missing_assets()
    print(f"missing unique assets: {len(missing)}")
    for e in missing:
        print()
        print(f"--- {e.prompt_id}  ({e.title}) ---")
        print(f"asset:      {e.asset}")
        print(f"questions:  {', '.join(e.question_ids)}")
        if e.prompt_text:
            print(f"prompt:     {e.prompt_text}")
        else:
            print("prompt:     (NOT FOUND in docs/image_generation_prompts_v1.md -- add one before generating)")
        if e.overlay_note:
            print(f"overlay:    {e.overlay_note}")
    return 0


def cmd_generate(args: argparse.Namespace) -> int:
    entry = manifest.find_entry(args.prompt_id)
    if entry is None:
        print(f"error: unknown prompt-id {args.prompt_id!r} (run --audit to list known ids)", file=sys.stderr)
        return 2
    if not entry.prompt_text:
        print(
            f"error: no generation prompt found for {args.prompt_id} in "
            "docs/image_generation_prompts_v1.md -- add one first.",
            file=sys.stderr,
        )
        return 2

    provider_cls = pick_provider(args.provider)
    output_dir = Path(args.output_dir) if args.output_dir else utils.DEFAULT_CANDIDATE_DIR

    print(f"prompt_id:   {entry.prompt_id}  ({entry.title})")
    print(f"asset:       {entry.asset}  (currently {'exists' if entry.exists else 'missing'})")
    print(f"questions:   {', '.join(entry.question_ids)}")
    print(f"provider:    {provider_cls.name}")

    if args.dry_run:
        model = args.model or provider_cls.default_model
        print(f"model:       {model}  (dry-run: not calling the API)")
        print(f"candidates:  {args.candidates}")
        print(f"output_dir:  {output_dir}")
        print(f"prompt:      {entry.prompt_text}")
        print(f"overlay:     {entry.overlay_note}")
        return 0

    if not provider_cls.is_available():
        print(
            f"error: {provider_cls.api_key_env} is not set, so the {provider_cls.name} "
            "provider cannot be used. See --plan / README for which env var to set.",
            file=sys.stderr,
        )
        return 3

    provider = provider_cls(model=args.model)
    print(f"model:       {provider.model}")
    try:
        raw_images = provider.generate(entry.prompt_text, args.candidates)
    except ProviderError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 4

    webp_bytes = [utils.to_webp_bytes(img.data) for img in raw_images]
    paths = utils.save_candidates(args.prompt_id, webp_bytes, output_dir)
    print(f"saved {len(paths)} candidate(s):")
    for p in paths:
        w, h = utils.image_dimensions(p.read_bytes())
        print(f"  {p}  ({w}x{h})")
    print()
    print(
        "Next step: visually inspect each candidate (medical accuracy, no "
        "baked-in text/markers, correct left/right, watermark-free), then "
        "copy the one that passes QA into assets/images/ by hand -- this "
        "tool never writes to assets/images/ itself."
    )
    return 0


def build_arg_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--prompt-id", help="e.g. IMG-005 (see --audit for the full list)")
    p.add_argument("--output", help="unused placeholder for future direct-write mode; candidates always go to --output-dir")
    p.add_argument("--provider", choices=sorted(PROVIDER_REGISTRY), help="default: first available, Gemini prioritized over OpenAI")
    p.add_argument("--model", help="override the provider's default model id")
    p.add_argument("--candidates", type=int, default=3, help="number of candidates to generate (default: 3)")
    p.add_argument("--output-dir", default=None, help="default: tmp/image_candidates/")
    p.add_argument("--dry-run", action="store_true", help="print what would be requested; no API call, no key required")
    p.add_argument("--audit", action="store_true", help="print asset/prompt_id/question status and exit")
    p.add_argument("--plan", action="store_true", help="print the full generation plan for missing assets and exit")
    return p


def main(argv=None) -> int:
    args = build_arg_parser().parse_args(argv)

    if args.audit:
        return cmd_audit()
    if args.plan:
        return cmd_plan()
    if not args.prompt_id:
        build_arg_parser().error("--prompt-id is required (or use --audit / --plan)")
    return cmd_generate(args)


if __name__ == "__main__":
    raise SystemExit(main())
