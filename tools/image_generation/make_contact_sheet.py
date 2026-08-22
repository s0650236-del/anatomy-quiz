"""Build a dev-review contact sheet of every anatomy-quiz image asset (existing + newly
created this round), with filenames overlaid, for docs/image_previews/."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
IMG_DIR = os.path.join(ROOT, 'assets', 'images')
OUT_DIR = os.path.join(ROOT, 'docs', 'image_previews')
os.makedirs(OUT_DIR, exist_ok=True)

EXISTING = [
    'q002_hierarchy', 'q004_epithelium', 'q017_heart_chambers',
    'q037_alveolar_gas_exchange', 'q048_nephron',
]
NEW_THIS_ROUND = [
    'anatomical_position', 'direction_terms', 'q008_body_planes', 'q011_germ_layers',
    'q019_pulmonary_vein', 'q021_vessel_cross_sections', 'q025_conduction_system',
    'q068_ecg_waveform', 'heart_valves_schematic', 'circulation_circuit',
    'q032_larynx', 'q035_right_middle_lobe', 'q040_airway_branching',
    'q041_alveolar_sac', 'pleura_cross_section',
    'q045_renal_hilum', 'q050_urinary_system', 'q091_kidney_cross_section',
    'q016_apex', 'q073_coronary_arteries', 'heart_exterior_anterior', 'heart_exterior_posterior',
]

CELL_W, CELL_H = 340, 380
THUMB_W, THUMB_H = 320, 320
COLS = 5
PAD = 14
LABEL_H = 60

def make_section(names, section_title):
    rows = (len(names) + COLS - 1) // COLS
    sheet_w = COLS * CELL_W + PAD
    sheet_h = rows * CELL_H + PAD + 50
    sheet = Image.new('RGB', (sheet_w, sheet_h), '#ffffff')
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 18)
        title_font = ImageFont.truetype('C:/Windows/Fonts/consolab.ttf', 26)
    except Exception:
        font = ImageFont.load_default()
        title_font = font
    draw.text((PAD, 8), section_title, fill='#222222', font=title_font)
    for i, name in enumerate(names):
        col = i % COLS
        row = i // COLS
        x = PAD + col * CELL_W
        y = 50 + PAD + row * CELL_H
        path = os.path.join(IMG_DIR, name + '.webp')
        draw.rectangle([x, y, x + CELL_W - PAD, y + CELL_H - PAD], outline='#dddddd', width=2)
        if os.path.exists(path):
            img = Image.open(path).convert('RGB')
            img.thumbnail((THUMB_W, THUMB_H))
            ox = x + (CELL_W - PAD - img.width) // 2
            oy = y + 10 + (THUMB_H - img.height) // 2
            sheet.paste(img, (ox, oy))
        else:
            draw.text((x + 10, y + 140), '(missing)', fill='#cc3333', font=font)
        draw.text((x + 8, y + LABEL_H + THUMB_H - 20), name + '.webp', fill='#222222', font=font)
    return sheet

sheet1 = make_section(EXISTING, 'EXISTING (untouched, exists_confirmed) -- 5 assets')
sheet2 = make_section(NEW_THIS_ROUND, 'NEW THIS ROUND (SVG-authored, accepted) -- 22 assets')

total_w = max(sheet1.width, sheet2.width)
total_h = sheet1.height + sheet2.height + 20
combined = Image.new('RGB', (total_w, total_h), '#ffffff')
combined.paste(sheet1, (0, 0))
combined.paste(sheet2, (0, sheet1.height + 20))

out_path = os.path.join(OUT_DIR, 'preimplementation_image_assets_contact_sheet.png')
combined.save(out_path, 'PNG')
print('written', out_path, combined.size)
