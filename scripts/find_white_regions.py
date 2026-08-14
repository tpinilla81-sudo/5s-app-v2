#!/usr/bin/env python3
"""Find where the off-white pixels are in the logo (to see if they form a circle)."""
from PIL import Image

img = Image.open('/home/z/my-project/public/5s-logo.png')
px = img.load()
w, h = img.size

# Find all "white-ish" pixels (R>200, G>200, B>200, alpha>50)
white_pixels = []
for y in range(0, h, 4):
    for x in range(0, w, 4):
        r, g, b, a = px[x, y]
        if a > 50 and r > 200 and g > 200 and b > 200:
            white_pixels.append((x, y, r, g, b, a))

print(f"Off-white pixels found (sampled): {len(white_pixels)}")
if white_pixels:
    # Find bounding box
    xs = [p[0] for p in white_pixels]
    ys = [p[1] for p in white_pixels]
    print(f"Bounding box: x=[{min(xs)},{max(xs)}], y=[{min(ys)},{max(ys)}]")
    print(f"Image size: {w}x{h}")
    print(f"Center: ({w//2}, {h//2})")
    # Average position
    avg_x = sum(xs) / len(xs)
    avg_y = sum(ys) / len(ys)
    print(f"Avg position: ({avg_x:.0f}, {avg_y:.0f})")

# Sample some white pixels
print("\nFirst 10 white pixels (x, y, RGBA):")
for p in white_pixels[:10]:
    print(f"  ({p[0]:>4},{p[1]:>4}): ({p[2]:>3},{p[3]:>3},{p[4]:>3},{p[5]:>3})")
