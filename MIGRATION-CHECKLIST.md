# 5S App - MIGRATION CHECKLIST

## 🚨 PROBLEMA COMÚN EN MIGRACIONES

Cada vez que se migra de chat/conversación, ocurren estos problemas:

1. **`.env` cambia** - Vuelve a apuntar a SQLite local en lugar de Neon PostgreSQL
2. **Prisma client desincronizado** - El schema no coincide con la BD
3. **Errores 500 en login** - `session.create()` requiere campo `id`
4. **Deploy falla en Vercel** - Por errores de configuración

---

## ✅ CHECKLIST OBLIGATORIO DESPUÉS DE CADA MIGRACIÓN

### Paso 1: Verificar .env (CRÍTICO)

```bash
cat /home/z/my-project/.env
```

**Debe contener:**
```
DATABASE_URL=postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Si no es así, corregir inmediatamente:**
```bash
echo 'DATABASE_URL=postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' > /home/z/my-project/.env
```

### Paso 2: Regenerar Prisma Client

```bash
cd /home/z/my-project && npx prisma generate
```

### Paso 3: Ejecutar Health Check

```bash
cd /home/z/my-project && bash scripts/migration-health-check.sh
```

### Paso 4: Probar Login Localmente

```bash
curl -s -X POST "https://5s-app-v2.vercel.app/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"javier@roncal.com","password":"5s2026admin"}'
```

**Respuesta esperada:** JSON con objeto `user` (no error)

### Paso 5: Deployar si hay cambios

```bash
cd /home/z/my-project
git add -A
git commit -m "fix: post-migration corrections"
git push origin main
```

---

## 🔧 CREDENCIALES DE ACCESO

### Usuario Admin
- **Email:** `javier@roncal.com`
- **Password:** `5s2026admin` (resetear si no funciona)
- **Rol:** admin

### Para resetear contraseña:
```bash
cd /home/z/my-project && DATABASE_URL="postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
async function main() {
  const newHash = await bcrypt.hash('NUEVA_PASSWORD', 12);
  await prisma.user.update({ where: { email: 'javier@roncal.com' }, data: { password: newHash } });
  console.log('Password reset');
}
main().finally(() => prisma.\$disconnect());
"
```

---

## 🌐 SERVIDORES Y URLs

| Servicio | URL |
|----------|-----|
| **Producción** | https://5s-app-v2.vercel.app/ |
| **Base de datos** | Neon PostgreSQL (eu-central-1) |
| **Repo GitHub** | tpinilla81-sudo/5s-app-v2 |

---

## 📦 ESTRUCTURA CRÍTICA DE ARCHIVOS

```
/home/z/my-project/
├── .env                          # ⚠️ SIEMPRE verificar Neon URL
├── prisma/schema.prisma         # Schema con modelo Session (requiere id)
├── src/lib/db.ts                # Configuración de Prisma
├── src/app/api/auth/route.ts    # Login API (session.create necesita id)
└── scripts/migration-health-check.sh  # Script de verificación
```

---

## 🐛 ERRORES COMUNES Y SOLUCIONES

### Error: "Error interno del servidor" (500) al hacer login
**Causa:** `session.create()` sin campo `id`
**Solución:** El código ya está arreglado - asegurar deploy latest

### Error: "Error al obtener proyectos" - pantalla vacía/showing setup wizard
**Causa:** Código usa `companyRel` pero el schema Prisma tiene `company`
**Solución:** En `/api/projects/route.ts`, cambiar todos los `companyRel` por `company`
```bash
# Quick fix:
sed -i 's/companyRel/company/g' src/app/api/projects/route.ts
git add -A && git commit -m "fix: companyRel -> company" && git push
```

### Error: "Invalid datasource db"
**Causa:** `.env` apunta a SQLite (`file:`)
**Solución:** Actualizar .env con Neon URL

### Error: Deployment failed en Vercel
**Causa:** Problemas de build o env vars
**Solución:** 
1. Verificar .env local
2. Verificar DATABASE_URL en Vercel dashboard/API
3. Limpiar cache: borrar carpeta .next y redeployar

---

## 🔄 COMANDOS RÁPIDOS PARA MIGRACIÓN

```bash
# UNA LÍNEA - Todo lo necesario después de migrar:
cd /home/z/my-project && \
echo 'DATABASE_URL=postgresql://neondb_owner:npg_VeJs3ZAjUwp4@ep-round-glitter-as6ryhe3.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' > .env && \
npx prisma generate && \
bash scripts/migration-health-check.sh
```

---

## 📞 INFORMACIÓN DE SOPORTE

- **Vercel Token:** Configurado en variables de entorno
- **Neon DB:** PostgreSQL serverless
- **Framework:** Next.js 16 + React 19 + TypeScript
- **ORM:** Prisma 6.19.3

---

*Última actualización: 27/08/2026 - v2.115*
