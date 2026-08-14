#!/usr/bin/env python3
"""
Clean 5s-logo.png: remove the faint off-white semi-transparent ring
around the green logo, making those pixels fully transparent.

Saves a backup of the original, then overwrites /5s-logo.png.
"""
from PIL import Image
import shutil

SRC = '/home/z/my-project/public/5s-logo.png'
BAK = '/home/z/my-project/public/5s-logo.original.png'

# Backup once
shutil.copy2(SRC, BAK)
print(f"Backup saved to {BAK}")

img = Image.open(SRC).convert('RGBA')
px = img.load()
w, h = img.size

# Thresholds: any pixel that's "off-white-ish" (R>200, G>200, B>200) with
# alpha < 200 (semi-transparent) is part of the halo ring — make it fully transparent.
# We do NOT touch fully-opaque white pixels (none exist in this logo, but just in case).
removed = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a > 0 and a < 220 and r > 200 and g > 200 and b > 200:
            px[x, y] = (255, 255, 255, 0)
            removed += 1

img.save(SRC, 'PNG', optimize=True)
print(f"Removed {removed} semi-transparent off-white halo pixels")
print(f"Saved cleaned logo to {SRC}")

# Verify
img2 = Image.open(SRC)
px2 = img2.load()
print("\nVerification — corners should be transparent:")
print(f"  (0,0):     {px2[0, 0]}")
print(f"  ({w-1},0): {px2[w-1, 0]}")
print(f"  (0,{h-1}): {px2[0, h-1]}")
print(f"  ({w-1},{h-1}): {px2[w-1, h-1]}")
print(f"  center:    {px2[w//2, h//2]}")
