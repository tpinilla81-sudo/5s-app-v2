#!/usr/bin/env python3
"""
v2.45: Elimina el Card 'Add item form' del InventarioModal.
Las líneas a eliminar van desde el comentario '{/* Add item form */}'
hasta el '</Card>' que cierra ese Card (inclusive).

Estrategia:
1. Leer el archivo.
2. Encontrar la línea que contiene exactly '{/* Add item form */}'.
3. Encontrar la siguiente línea que contiene exactly '            </Card>' después de esa.
4. Eliminar todas las líneas desde (start_idx - 1) hasta (end_idx) inclusive,
   dejando el archivo limpio.
5. Añadir un comentario de una línea explicando que se eliminó el formulario.
"""
import re
from pathlib import Path

FILE = Path('/home/z/my-project/src/components/5s/InventarioModal.tsx')
lines = FILE.read_text().splitlines(keepends=True)

# 1. Buscar el marcador de inicio
start_idx = None
for i, ln in enumerate(lines):
    if '{/* Add item form */}' in ln:
        start_idx = i
        break

if start_idx is None:
    raise SystemExit("ERROR: no se encontró el marcador '{/* Add item form */}'")

# 2. Buscar el </Card> que cierra el Add item form.
#    Estrategia: contar la profundidad de <Card> ... </Card> a partir de start_idx.
#    El primer <Card> que abre está en start_idx+1. Buscamos el matching </Card>.
open_count = 0
end_idx = None
for i in range(start_idx, len(lines)):
    # Cuenta etiquetas <Card> que abren (no self-closing, no closing)
    # Buscamos '<Card' pero no '</Card' ni '<CardXXX' (debe ser <Card seguido de > o espacio)
    opens = re.findall(r'<Card(?:\s[^>]*)?>', lines[i])
    closes = re.findall(r'</Card>', lines[i])
    open_count += len(opens) - len(closes)
    if open_count == 0 and i > start_idx:
        end_idx = i
        break

if end_idx is None:
    raise SystemExit("ERROR: no se encontró el </Card> que cierra el Add item form")

print(f"Eliminando líneas {start_idx+1}..{end_idx+1} (1-indexed):")
print(f"  inicio: {lines[start_idx].rstrip()}")
print(f"  fin:    {lines[end_idx].rstrip()}")

# 3. Eliminar el bloque (incluida la línea vacía anterior si la hay)
# Mantener una sola línea vacía como separador.
new_lines = lines[:start_idx] + lines[end_idx+1:]

FILE.write_text(''.join(new_lines))
print(f"\nArchivo actualizado. Líneas eliminadas: {end_idx - start_idx + 1}")
print(f"Total líneas antes: {len(lines)}")
print(f"Total líneas después: {len(new_lines)}")
