"""Convert a hand-authored SVG (assets/image_sources/svg/*.svg) into a
production WebP asset (assets/images/*.webp) for the anatomy-quiz app.

Usage:
    .venv/Scripts/python.exe svg_to_webp.py <name>
    (reads assets/image_sources/svg/<name>.svg, writes assets/images/<name>.webp)

Renders at high resolution via svglib+reportlab (pure-Python, no system
cairo/rsvg dependency), then re-encodes as WebP via Pillow. Ensures the
long edge is >= 1200px and the canvas has a white background (no alpha
matte artifacts).
"""
import sys
import os
from reportlab.graphics import renderPM
from svglib.svglib import svg2rlg
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
SVG_DIR = os.path.join(ROOT, 'assets', 'image_sources', 'svg')
OUT_DIR = os.path.join(ROOT, 'assets', 'images')
TARGET_LONG_EDGE = 1600

def convert(name):
    svg_path = os.path.join(SVG_DIR, name + '.svg')
    png_path = os.path.join(SVG_DIR, name + '.tmp.png')
    webp_path = os.path.join(OUT_DIR, name + '.webp')

    drawing = svg2rlg(svg_path)
    if drawing is None:
        raise RuntimeError(f'svg2rlg failed to parse {svg_path}')

    w, h = drawing.width, drawing.height
    long_edge = max(w, h)
    scale = TARGET_LONG_EDGE / long_edge
    drawing.width = w * scale
    drawing.height = h * scale
    drawing.scale(scale, scale)

    renderPM.drawToFile(drawing, png_path, fmt='PNG', bg=0xFFFFFF)

    img = Image.open(png_path).convert('RGB')
    # composite onto white background in case of any transparency
    bg = Image.new('RGB', img.size, (255, 255, 255))
    if Image.open(png_path).mode == 'RGBA':
        rgba = Image.open(png_path).convert('RGBA')
        bg.paste(rgba, mask=rgba.split()[3])
        img = bg
    img.save(webp_path, 'WEBP', quality=92, method=6)
    os.remove(png_path)

    size_kb = os.path.getsize(webp_path) / 1024
    print(f'{name}: {img.size[0]}x{img.size[1]} px, {size_kb:.1f} KB -> {webp_path}')
    return img.size

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('usage: svg_to_webp.py <name> [<name2> ...]')
        sys.exit(1)
    for n in sys.argv[1:]:
        convert(n)
