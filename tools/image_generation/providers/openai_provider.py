"""OpenAI image-generation provider.

Uses the official `openai` Python SDK's `images.generate` call. Model name
is configurable for the same reason as the Gemini provider: OpenAI's image
model lineup (dall-e-2/3 -> gpt-image-1 -> newer generations) has moved
over time. Always re-check
https://platform.openai.com/docs/guides/image-generation before relying on
the default below for a real production run.
"""
from __future__ import annotations

import base64
import os
from typing import List

from .base import GeneratedImage, Provider, ProviderError


class OpenAIProvider(Provider):
    name = "openai"
    api_key_env = "OPENAI_API_KEY"
    default_model = "gpt-image-2"

    def __init__(self, model: str | None = None) -> None:
        super().__init__(model or os.environ.get("OPENAI_IMAGE_MODEL"))

    def _client(self):
        try:
            from openai import OpenAI
        except ImportError as exc:  # pragma: no cover
            raise ProviderError(
                "openai package is not installed. "
                "Install it inside tools/image_generation/.venv (see README)."
            ) from exc
        # OpenAI() picks up OPENAI_API_KEY from the environment automatically.
        return OpenAI()

    def generate(self, prompt: str, n: int) -> List[GeneratedImage]:
        if not self.is_available():
            raise ProviderError(f"{self.api_key_env} is not set; cannot call the OpenAI API.")
        client = self._client()
        images: List[GeneratedImage] = []
        try:
            result = client.images.generate(
                model=self.model,
                prompt=prompt,
                n=n,
                size="1024x1024",
            )
        except Exception as exc:  # noqa: BLE001 - normalize all SDK errors
            raise ProviderError(f"OpenAI image generation failed: {exc}") from exc

        for item in getattr(result, "data", []) or []:
            b64 = getattr(item, "b64_json", None)
            if not b64:
                raise ProviderError(
                    "OpenAI response did not include b64_json image data. "
                    "The response shape may have changed since this provider was written."
                )
            images.append(GeneratedImage(data=base64.b64decode(b64), mime_type="image/png"))

        if not images:
            raise ProviderError("OpenAI returned no image candidates.")
        return images
