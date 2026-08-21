"""Provider interface for anatomy image generation.

A provider turns one text prompt into one or more raw image byte strings.
It never decides which candidate is "correct" -- that judgement (medical
accuracy, no baked-in text, correct left/right orientation, etc.) is made
afterwards by a human or by Claude visually inspecting the saved files.
"""
from __future__ import annotations

import abc
from dataclasses import dataclass
from typing import List


@dataclass
class GeneratedImage:
    """One raw image candidate returned by a provider."""

    data: bytes
    mime_type: str  # e.g. "image/png"


class ProviderError(RuntimeError):
    """Raised for any provider-side failure (missing key, API error, etc.)."""


class Provider(abc.ABC):
    """Common interface every image-generation backend implements."""

    #: short machine name used on the --provider CLI flag, e.g. "gemini"
    name: str = "base"

    #: name of the environment variable holding this provider's API key
    api_key_env: str = ""

    #: default model id used when none is supplied via env/config
    default_model: str = ""

    def __init__(self, model: str | None = None) -> None:
        self.model = model or self.default_model

    @classmethod
    def is_available(cls) -> bool:
        """True if this provider's API key is present in the environment.

        Only checks *presence*, never reads/logs the value.
        """
        import os

        return bool(os.environ.get(cls.api_key_env))

    @abc.abstractmethod
    def generate(self, prompt: str, n: int) -> List[GeneratedImage]:
        """Generate ``n`` independent image candidates for ``prompt``.

        Must raise ProviderError (not a bare vendor exception) on failure,
        with a message that never includes the API key.
        """
        raise NotImplementedError
