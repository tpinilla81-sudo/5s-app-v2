#!/usr/bin/env python3
"""Fix the stray backslash before backtick in AdminPanel.tsx.

The restructure script emitted `border-0\`}` where it should have emitted
`border-0'}`. This is a byte-level replacement.
"""
import sys

PATH = '/home/z/my-project/src/components/admin/AdminPanel.tsx'
with open(PATH, 'rb') as f:
    data = f.read()

buggy = b"border-0\\`}"
fix = b"border-0'}"
count = data.count(buggy)
print(f'found {count} occurrence(s) of buggy sequence')

if count > 0:
    new = data.replace(buggy, fix)
    with open(PATH, 'wb') as f:
        f.write(new)
    print(f'replaced {count} occurrence(s)')
else:
    print('nothing to fix')
