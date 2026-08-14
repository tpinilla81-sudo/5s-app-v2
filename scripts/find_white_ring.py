#!/usr/bin/env python3
"""Find the white ring around the 5S logo by scanning along radius."""
from PIL import Image

img = Image.open('/home/z/my-project/public/5s-logo.png')
px = img.load()
w, h = img.size
cx, cy = w // 2, h // 2

print(f"Image: {w}x{h}, center=({cx},{cy})")
print("\nRadial scan from center outward (along +x axis):")
print(f"{'r':>5}  {'RGBA':>20}  note")
for r in range(0, cx, 16):
    x, y = cx + r, cy
    if 0 <= x < w:
        r_, g, b, a = px[x, y]
        note = ""
        if a == 0:
            note = "transparent"
        elif r_ > 200 and g > 200 and b > 200:
            note = "*** WHITE ***"
        elif r_ < 80 and g < 80 and b < 80:
            note = "black"
        elif g > r_ and g > b:
            note = "green"
        print(f"{r:>5}  ({r_:>3},{g:>3},{b:>3},{a:>3})  {note}")

# Also scan from outside inward along a diagonal
print("\nDiagonal scan from outside (corner) inward:")
for i in range(0, 600, 16):
    x, y = cx + i, cy + i
    if 0 <= x < w and 0 <= y < h:
        r_, g, b, a = px[x, y]
        note = ""
        if a == 0:
            note = "transparent"
        elif r_ > 200 and g > 200 and b > 200:
            note = "*** WHITE ***"
        elif r_ < 80 and g < 80 and b < 80:
            note = "black"
        elif g > r_ and g > b:
            note = "green"
        print(f"  ({x:>4},{y:>4}): ({r_:>3},{g:>3},{b:>3},{a:>3})  {note}")

# Save a thumbnail so we can see what the logo looks like
thumb = img.copy()
thumb.thumbnail((256, 256))
thumb.save('/home/z/my-project/scripts/logo_thumb.png')
print("\nSaved thumbnail to scripts/logo_thumb.png")
