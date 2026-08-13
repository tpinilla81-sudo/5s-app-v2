#!/usr/bin/env python3
"""
Remove the "Miembros del Proyecto" section from AdminPanel.tsx.
The members listing is redundant — each member already appears in their zone.
"""
import sys
from pathlib import Path

FILE = Path("/home/z/my-project/src/components/admin/AdminPanel.tsx")
lines = FILE.read_text(encoding="utf-8").splitlines(keepends=True)

# Lines 1557-1931 (1-indexed) = indices 1556-1930 (0-indexed)
# Line 1557 = blank line after closing Zonas div
# Line 1558 = "{/* Members */}"
# Line 1931 = closing </div> of Members section
# After removal, line 1932 (`</>`) follows line 1556 (closing Zonas </div>)

START = 1557 - 1  # 0-indexed, line 1557
END = 1931        # exclusive, so this removes lines 1557..1931 inclusive

removed = lines[START:END]
print(f"Removing {len(removed)} lines (lines {START+1} to {END})")
print("First removed line:", repr(removed[0]))
print("Last removed line:", repr(removed[-1]))
print("Line before (kept):", repr(lines[START-1]))
print("Line after (kept):", repr(lines[END]))

new_lines = lines[:START] + lines[END:]
FILE.write_text("".join(new_lines), encoding="utf-8")
print(f"\nFile now has {len(new_lines)} lines (was {len(lines)})")
