"""Gemini image-generation provider (Google).

Uses the `google-genai` SDK's Interactions API. Model name is configurable
because image-model names on this API have moved quickly (Imagen ->
gemini-2.5-flash-image -> gemini-3.1-flash-image "Nano Banana 2" and
beyond); always re-check https://ai.google.dev/gemini-api/docs/models
before relying on the default below for a real production run.

As of the check performed when this file was last updated (Aug 2026),
`gemini-3.1-flash-image` was documented as Google's current
general-purpose image generation model, called via
`client.interactions.create(...)` rather than the older
`client.models.generate_content(...)` pattern used by gemini-2.5-flash-image.
Override the model with GEMINI_IMAGE_MODEL if that has changed again; if a
future SDK removes `client.interactions`, this provider will fail with a
clear ProviderError rather than silently producing wrong output.
"""
from __future__ import annotations

import base64
import os
from typing import List

from .base import GeneratedImage, Provider, ProviderError


class GeminiProvider(Provider):
    name = "gemini"
    api_key_env = "GEMINI_API_KEY"
    # Fallback env var also accepted by the google-genai SDK itself.
    alt_api_key_env = "GOOGLE_API_KEY"
    default_model = "gemini-3.1-flash-image"

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

        for _ in range(n):
            try:
                interaction = client.interactions.create(
                    model=self.model,
                    input=prompt,
                )
            except AttributeError as exc:
                raise ProviderError(
                    "The installed google-genai SDK does not expose "
                    "client.interactions.create(); the Interactions API may "
                    "have changed or this SDK version predates it. Re-check "
                    "https://ai.google.dev/gemini-api/docs/image-generation "
                    "and update providers/gemini.py accordingly."
                ) from exc
            except Exception as exc:  # noqa: BLE001 - normalize all SDK errors
                raise ProviderError(f"Gemini image generation failed: {exc}") from exc

            output_image = getattr(interaction, "output_image", None)
            data = getattr(output_image, "data", None) if output_image is not None else None
            if not data:
                raise ProviderError(
                    "Gemini response did not contain image data (no "
                    "interaction.output_image.data). The prompt may have "
                    "been blocked by safety filters, or the response shape "
                    "has changed since this provider was written."
                )
            # The SDK may hand back either raw bytes or a base64 string
            # depending on version; handle both defensively.
            raw = data if isinstance(data, (bytes, bytearray)) else base64.b64decode(data)
            mime_type = getattr(output_image, "mime_type", None) or "image/png"
            images.append(GeneratedImage(data=bytes(raw), mime_type=mime_type))

        return images
