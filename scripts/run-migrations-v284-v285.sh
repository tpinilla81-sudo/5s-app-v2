#!/usr/bin/env bash
# Run migrate-v284 + migrate-v285 against production.
# - v284: backfill comunicadoPorId para ActionItems legacy del inventario
#         (Paso 3) usando InventoryItem.createdById (empleado que registró)
# - v285: backfill accionesPreventivas='N/A' y extra.etiquetas='No aplica'
#         para ActionItems legacy del inventario
#
# Logs in as gestor (t_pinilla@outlook.com), captures the 5s_session cookie,
# then POSTs to both endpoints and prints the JSON result.

set -euo pipefail

BASE_URL="https://5s-app-v2.vercel.app"
COOKIE_JAR="/tmp/5s-prod-cookies.txt"

echo "==> Logging in as gestor..."
LOGIN_RESP=$(curl -s -c "$COOKIE_JAR" -X POST "${BASE_URL}/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"t_pinilla@outlook.com","password":"gestor123"}')

echo "$LOGIN_RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print('user:', d.get('user',{}).get('email','?'), 'role:', d.get('user',{}).get('role','?'))" || echo "Login response: $LOGIN_RESP"

echo
echo "==> POST /api/migrate-v284 (backfill comunicadoPorId para inventario)..."
curl -s -b "$COOKIE_JAR" -X POST "${BASE_URL}/api/migrate-v284" \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool

echo
echo "==> POST /api/migrate-v285 (backfill accionesPreventivas + etiqueta para inventario)..."
curl -s -b "$COOKIE_JAR" -X POST "${BASE_URL}/api/migrate-v285" \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool

echo
echo "==> Done. Cookie jar: $COOKIE_JAR"
