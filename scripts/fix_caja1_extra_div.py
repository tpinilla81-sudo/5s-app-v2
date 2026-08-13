#!/usr/bin/env python3
"""Fix caja 1's extra closing </div>.

The restructure script copied banner_lines (which included the original
box1 closing </div>) AND added a new closing </div> for the wrapper.
Result: caja 1 had two consecutive </div>s — one closing the banner
section and an extra one. We need to remove ONLY the extra one (the
second of the two consecutive </div>s that close caja 1).
"""
from pathlib import Path

PATH = Path('/home/z/my-project/src/components/admin/AdminPanel.tsx')
text = PATH.read_text()

# The caja 1 wrapper ends with:
#                 </div>           ← closes the inner banner flex
#               </div>             ← EXTRA (was the original box1 close — should be removed)
#
#               {/* ─────────── LISTA DE PROYECTOS ACTIVOS ─────────── */}

old = (
    '                </div>\n'
    '              </div>\n'
    '              \n'
    '              {/* ─────────── LISTA DE PROYECTOS ACTIVOS ─────────── */}'
)
new = (
    '                </div>\n'
    '              \n'
    '              {/* ─────────── LISTA DE PROYECTOS ACTIVOS ─────────── */}'
)

count = text.count(old)
print(f'found {count} occurrence(s) of the extra </div> pattern')
if count == 1:
    PATH.write_text(text.replace(old, new))
    print('fixed: removed extra </div> from caja 1')
elif count > 1:
    print('WARNING: multiple matches — not auto-fixing')
else:
    # Try a more permissive match (whitespace might differ)
    import re
    pattern = re.compile(r'(\s*</div>\s*\n)\s*</div>\s*\n(\s*\n\s*/\* ─+ LISTA DE PROYECTOS ACTIVOS ─+ \*/)', re.MULTILINE)
    matches = pattern.findall(text)
    print(f'regex fallback found {len(matches)} match(es)')
    if len(matches) == 1:
        new_text = pattern.sub(r'\1\2', text)
        PATH.write_text(new_text)
        print('fixed via regex')
