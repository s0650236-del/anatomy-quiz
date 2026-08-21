"""Image generation provider abstraction.

Each provider wraps one external image-generation API behind the same
minimal interface (see base.Provider) so the CLI does not need to know
which vendor is actually generating the image.
"""
