# -*- coding: utf-8 -*-
"""Gather dimensions/file size for every asset referenced in gen_asset_log.py's
ROWS table and write asset_stats.json (consumed by gen_asset_log.py). Run this
after svg_to_webp.py so assets/images/*.webp is up to date."""
import json
import os
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
IMG_DIR = os.path.join(SCRIPT_DIR, '..', '..', 'assets', 'images')
OUT_PATH = os.path.join(SCRIPT_DIR, 'asset_stats.json')

NAMES = [
    'q002_hierarchy', 'q004_epithelium', 'q017_heart_chambers',
    'q037_alveolar_gas_exchange', 'q048_nephron',
    'anatomical_position', 'direction_terms', 'q008_body_planes', 'q011_germ_layers',
    'q019_pulmonary_vein', 'q021_vessel_cross_sections', 'q025_conduction_system',
    'q068_ecg_waveform', 'heart_valves_schematic', 'circulation_circuit',
    'q032_larynx', 'q035_right_middle_lobe', 'q040_airway_branching',
    'q041_alveolar_sac', 'pleura_cross_section',
    'q045_renal_hilum', 'q050_urinary_system', 'q091_kidney_cross_section',
    'q016_apex', 'q073_coronary_arteries', 'heart_exterior_anterior', 'heart_exterior_posterior',
]

stats = {}
for name in NAMES:
    path = os.path.join(IMG_DIR, name + '.webp')
    if os.path.exists(path):
        img = Image.open(path)
        size_bytes = os.path.getsize(path)
        stats[name] = {'w': img.size[0], 'h': img.size[1], 'kb': round(size_bytes / 1024, 1)}
    else:
        stats[name] = None
        print('MISSING', name)

with open(OUT_PATH, 'w', encoding='utf-8') as f:
    json.dump(stats, f, indent=2, ensure_ascii=False)
print('written', OUT_PATH, 'entries:', len(stats))
