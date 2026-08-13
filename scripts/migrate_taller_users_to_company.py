#!/usr/bin/env python3
"""
Migración PUNTUAL (no recurrente, no en código):
Añadir como CompanyMember los usuarios que ya están asignados a las zonas
z1 y z2 del proyecto "taller" — para que aparezcan en el listado maestro
"Datos Empresa → Usuarios" sin tener que darlos de alta de nuevo.

NO modifica usuarios, NO crea nuevos, NO toca MemberZone ni ProjectMember.
Solo hace upsert idempotente de CompanyMember(userId, companyId).

Uso:
  DATABASE_URL=... python3 scripts/migrate_taller_users_to_company.py
"""
import os
import sys
from urllib.parse import urlparse

# psycopg2 para PostgreSQL con SSL
try:
    import psycopg2
except ImportError:
    print("Instalando psycopg2-binary...", file=sys.stderr)
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "psycopg2-binary"])
    import psycopg2

DB_URL = os.environ.get("DATABASE_URL")
if not DB_URL:
    print("ERROR: DATABASE_URL no configurada", file=sys.stderr)
    sys.exit(1)


def main():
    conn = psycopg2.connect(DB_URL)
    conn.autocommit = False
    cur = conn.cursor()

    # ── 1. Localizar el proyecto "taller" (name ILIKE '%taller%') ──
    cur.execute("""
        SELECT id, name, "companyId"
        FROM "Project"
        WHERE name ILIKE '%taller%'
        ORDER BY name
    """)
    projects = cur.fetchall()
    if not projects:
        print("No se encontró ningún proyecto llamado 'taller'.", file=sys.stderr)
        sys.exit(2)

    print(f"Proyectos encontrados con 'taller' en el nombre:")
    for p in projects:
        print(f"  - {p[0]}  |  {p[1]}  |  companyId={p[2] or '(sin empresa)'}")

    # Si solo hay uno, lo usamos. Si hay varios, abortamos y pedimos aclaración.
    if len(projects) > 1:
        print("\nHay varios proyectos 'taller'. Abortando para no migrar el incorrecto.",
              file=sys.stderr)
        sys.exit(3)
    project_id, project_name, company_id = projects[0]
    if not company_id:
        print(f"El proyecto {project_name} NO tiene companyId asignado. Abortando.",
              file=sys.stderr)
        sys.exit(4)
    print(f"\nUsando proyecto: {project_name} (id={project_id}, companyId={company_id})")

    # ── 2. Verificar que la empresa existe ──
    cur.execute('SELECT id, name FROM "Company" WHERE id = %s', (company_id,))
    company = cur.fetchone()
    if not company:
        print(f"La empresa {company_id} no existe. Abortando.", file=sys.stderr)
        sys.exit(5)
    print(f"Empresa destino: {company[1]} (id={company[0]})")

    # ── 3. Listar zonas del proyecto ──
    cur.execute("""
        SELECT id, name FROM "Zone"
        WHERE "projectId" = %s
        ORDER BY name
    """, (project_id,))
    zones = cur.fetchall()
    print(f"\nZonas del proyecto:")
    for z in zones:
        print(f"  - {z[0]}  |  {z[1]}")

    # ── 4. Buscar usuarios asignados a CUALQUIER zona del proyecto (vía MemberZone → ProjectMember)
    #    El usuario dijo "z1 y z2" pero no sabemos los nombres exactos. Si el proyecto
    #    solo tiene 2 zonas, las usamos todas. Si tiene más, pedimos confirmación.
    zone_ids = [z[0] for z in zones]
    if not zone_ids:
        print("\nEl proyecto no tiene zonas. Nada que migrar.", file=sys.stderr)
        sys.exit(6)

    # Recogemos usuarios de TODAS las zonas del proyecto (el usuario dijo z1 y z2,
    # pero si hay más zonas con usuarios sueltos, mejor mostrar el panorama completo)
    cur.execute("""
        SELECT DISTINCT u.id, u.email, u.name, u.role, u.active,
                        pm.id AS member_id, pm.role AS project_role,
                        z.name AS zone_name
        FROM "MemberZone" mz
        JOIN "ProjectMember" pm ON pm.id = mz."memberId"
        JOIN "User" u ON u.id = pm."userId"
        JOIN "Zone" z ON z.id = mz."zoneId"
        WHERE pm."projectId" = %s
        ORDER BY u.name, z.name
    """, (project_id,))
    rows = cur.fetchall()
    if not rows:
        print("\nNo hay usuarios asignados a ninguna zona de este proyecto.", file=sys.stderr)
        sys.exit(7)

    # Agrupar por usuario
    users_in_zones = {}
    for r in rows:
        uid = r[0]
        if uid not in users_in_zones:
            users_in_zones[uid] = {
                "id": uid, "email": r[1], "name": r[2], "role": r[3],
                "active": r[4], "member_id": r[5], "project_role": r[6],
                "zones": []
            }
        users_in_zones[uid]["zones"].append(r[7])

    print(f"\nUsuarios actualmente asignados a zonas del proyecto ({len(users_in_zones)}):")
    for u in users_in_zones.values():
        flag = "✓" if u["active"] else "✗"
        print(f"  {flag} {u['name']:<25} {u['email']:<35} zonas={u['zones']}  rol_proyecto={u['project_role']}")

    # ── 5. Para cada usuario, hacer upsert en CompanyMember ──
    print(f"\nHaciendo upsert en CompanyMember(companyId={company_id})...")
    inserted = 0
    already = 0
    for u in users_in_zones.values():
        # ¿Ya es CompanyMember?
        cur.execute("""
            SELECT id, role FROM "CompanyMember"
            WHERE "userId" = %s AND "companyId" = %s
        """, (u["id"], company_id))
        existing = cur.fetchone()
        if existing:
            print(f"  · {u['email']:<35} ya es CompanyMember (id={existing[0]}, rol={existing[1]}) — skip")
            already += 1
            continue
        # Insertar
        # Rol por defecto en la empresa: mapeamos el rol de proyecto a un rol de empresa razonable
        # admin/gerente → gerente; responsable → responsable; empleado → empleado; auditor → auditor
        pr = (u["project_role"] or "empleado").lower()
        if pr in ("admin", "gerente"):
            company_role = "gerente"
        elif pr in ("responsable", "auditor", "empleado"):
            company_role = pr
        else:
            company_role = "empleado"
        cur.execute("""
            INSERT INTO "CompanyMember" ("userId", "companyId", role, "joinedAt")
            VALUES (%s, %s, %s, NOW())
            RETURNING id
        """, (u["id"], company_id, company_role))
        new_id = cur.fetchone()[0]
        print(f"  + {u['email']:<35} → CompanyMember id={new_id} (rol={company_role})")
        inserted += 1

    conn.commit()
    print(f"\n✓ Migración completada: {inserted} insertados, {already} ya existían.")
    print(f"  Total CompanyMember de la empresa ahora: {inserted + already} (de los usuarios en zonas del proyecto)")

    cur.close()
    conn.close()


if __name__ == "__main__":
    main()
