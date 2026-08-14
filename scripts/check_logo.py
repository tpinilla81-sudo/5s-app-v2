#!/usr/bin/env python3
"""Check 5s-logo.png for white circle baked into the image."""
from PIL import Image

img = Image.open('/home/z/my-project/public/5s-logo.png')
print(f"Mode: {img.mode}, Size: {img.size}")

if img.mode == 'RGBA':
    # Check corners (should be transparent if no circle, white if circle)
    px = img.load()
    w, h = img.size
    print(f"Top-left pixel:      {px[0, 0]}")
    print(f"Top-right pixel:     {px[w-1, 0]}")
    print(f"Bottom-left pixel:   {px[0, h-1]}")
    print(f"Bottom-right pixel:  {px[w-1, h-1]}")
    print(f"Center pixel:        {px[w//2, h//2]}")

    # Check along the diagonal — find the first non-transparent pixel
    print("\nDiagonal scan (from top-left, looking for first opaque pixel):")
    for i in range(0, min(w, h), 16):
        r, g, b, a = px[i, i]
        if a > 10:
            print(f"  ({i},{i}): RGBA=({r},{g},{b},{a})  -> first opaque")
            break

    # Count opaque pixels
    opaque = sum(1 for y in range(h) for x in range(w) if px[x, y][3] > 10)
    total = w * h
    print(f"\nOpaque pixels: {opaque}/{total} ({100*opaque/total:.1f}%)")

    # Check colors near center (likely the white circle)
    print("\nColor histogram (top 5 colors among opaque pixels):")
    from collections import Counter
    colors = Counter()
    for y in range(0, h, 4):
        for x in range(0, w, 4):
            r, g, b, a = px[x, y]
            if a > 10:
                colors[(r, g, b)] += 1
    for color, count in colors.most_common(5):
        print(f"  RGB={color}: {count} samples")
