"""Gemini image-generation provider (Google).

Uses the `google-genai` SDK. Model name is configurable because image-model
names on this API have moved quickly (Imagen -> gemini-2.5-flash-image ->
newer "Nano Banana" generations); always re-check
https://ai.google.dev/gemini-api/docs/models before relying on the default
below for a real production run.

As of the check performed when this file was written (Aug 2026),
`gemini-2.5-flash-image` was documented as the current non-preview,
non-deprecated image model. Override with GEMINI_IMAGE_MODEL if that has
changed.
"""
from __future__ import annotations

import os
from typing import List

from .base import GeneratedImage, Provider, ProviderError


class GeminiProvider(Provider):
    name = "gemini"
    api_key_env = "GEMINI_API_KEY"
    # Fallback env var also accepted by the google-genai SDK itself.
    alt_api_key_env = "GOOGLE_API_KEY"
    default_model = "gemini-2.5-flash-image"

    def __init__(self, model: str | None = None) -> None:
        super().__init__(model or os.environ.get("GEMINI_IMAGE_MODEL"))

    @classmethod
    def is_available(cls) -> bool:
        return bool(os.environ.get(cls.api_key_env) or os.environ.get(cls.alt_api_key_env))

    def _client(self):
        try:
            from google import genai
        except ImportError as exc:  # pragma: no cover - environment issue
            raise ProviderError(
                "google-genai package is not installed. "
                "Install it inside tools/image_generation/.venv (see README)."
            ) from exc
        # genai.Client() picks up GEMINI_API_KEY / GOOGLE_API_KEY from the
        # environment automatically; we never read or pass the key ourselves.
        return genai.Client()

    def generate(self, prompt: str, n: int) -> List[GeneratedImage]:
        if not self.is_available():
            raise ProviderError(
                f"{self.api_key_env} (or {self.alt_api_key_env}) is not set; "
                "cannot call the Gemini API."
            )
        client = self._client()
        images: List[GeneratedImage] = []
        try:
            from google.genai import types
        except ImportError as exc:  # pragma: no cover
            raise ProviderError("google-genai package is not installed.") from exc

        for _ in range(n):
            try:
                response = client.models.generate_content(
                    model=self.model,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        response_modalities=["Image"],
                    ),
                )
            except Exception as exc:  # noqa: BLE001 - normalize all SDK errors
                raise ProviderError(f"Gemini image generation failed: {exc}") from exc

            found = False
            for candidate in getattr(response, "candidates", []) or []:
                content = getattr(candidate, "content", None)
                for part in getattr(content, "parts", []) or []:
                    inline = getattr(part, "inline_data", None)
                    if inline is not None and getattr(inline, "data", None):
                        images.append(
                            GeneratedImage(
                                data=inline.data,
                                mime_type=getattr(inline, "mime_type", "image/png"),
                            )
                        )
                        found = True
            if not found:
                raise ProviderError(
                    "Gemini response did not contain image data. "
                    "The prompt may have been blocked, or the model/SDK "
                    "response shape has changed since this provider was written."
                )
        return images
