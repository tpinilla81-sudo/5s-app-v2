#!/usr/bin/env python3
"""
Script para convertir imports @/* a rutas relativas
@/ = src/
"""

import os
import re

def get_relative_path(from_file: str, to_path: str) -> str:
    """Calcular ruta relativa desde from_file hasta to_path"""
    from_dir = os.path.dirname(from_file)
    relative = os.path.relpath(to_path, from_dir)
    
    # Quitar extensión
    for ext in ['.tsx', '.ts', '.jsx', '.js']:
        if relative.endswith(ext):
            relative = relative[:-len(ext)]
            break
    
    # Asegurar que empiece con ./
    if not relative.startswith('.'):
        relative = './' + relative
    
    return relative

def convert_imports_in_file(file_path: str, base_dir: str):
    """Convertir imports @/* en un archivo"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    pattern = r"""from\s+['"](@/[a-zA-Z0-9_./-]+)['"]"""
    
    def replace_import(match):
        import_path = match.group(1)
        
        if import_path.startswith('@/'):
            target_relative = import_path[2:]  # Quitar @/
            
            # @/ apunta a src/
            possible_extensions = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx']
            
            found_path = None
            for ext in possible_extensions:
                candidate = os.path.join(base_dir, 'src', target_relative + ext)
                if os.path.exists(candidate):
                    found_path = candidate
                    break
            
            if found_path:
                relative = get_relative_path(file_path, found_path)
                return f"from '{relative}'"
            else:
                print(f"  ⚠️ No encontrado: {import_path}")
                return match.group(0)
        
        return match.group(0)
    
    new_content = re.sub(pattern, replace_import, content)
    
    if new_content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        original_matches = len(re.findall(pattern, original_content))
        return original_matches
    
    return 0

def main():
    base_dir = '/home/z/my-project'
    src_dir = os.path.join(base_dir, 'src')
    
    print("🔍 Buscando archivos...")
    
    files_to_process = []
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if "@/" in content and "from" in content:
                        files_to_process.append(file_path)
    
    print(f"📝 Encontrados {len(files_to_process)} archivos con imports @/")
    print()
    
    total_changes = 0
    
    for i, file_path in enumerate(files_to_process, 1):
        changes = convert_imports_in_file(file_path, base_dir)
        if changes > 0:
            total_changes += changes
            rel_path = os.path.relpath(file_path, base_dir)
            print(f"  [{i}/{len(files_to_process)}] {rel_path}: {changes} cambios")
    
    print()
    print(f"✅ Completado! Total imports convertidos: {total_changes}")

if __name__ == '__main__':
    main()
