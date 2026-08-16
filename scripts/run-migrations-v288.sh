#!/usr/bin/env bash
# Run migrate-v288 against production.
# - v288: backfill etiqueta real del inventario para ActionItems existentes.
#   Lee el InventoryItem original (via sourceId o extra.inventoryItemId),
#   recupera extra.etiquetaGenerada y reconstruye extra.etiquetas con
#   'Impresa' / 'Pendiente' / '—' según el estado real.
#
# Logs in as gestor (t_pinilla@outlook.com), captures the 5s_session cookie,
# then POSTs to the endpoint and prints the JSON result.

set -euo pipefail

BASE_URL="https://5s-app-v2.vercel.app"
COOKIE_JAR="/tmp/5s-prod-cookies.txt"

echo "==> Logging in as gestor..."
LOGIN_RESP=$(curl -s -c "$COOKIE_JAR" -X POST "${BASE_URL}/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"t_pinilla@outlook.com","password":"gestor123"}')

echo "$LOGIN_RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print('user:', d.get('user',{}).get('email','?'), 'role:', d.get('user',{}).get('role','?'))" || echo "Login response: $LOGIN_RESP"

echo
echo "==> POST /api/migrate-v288 (backfill etiqueta real del inventario para ActionItems S1)..."
curl -s -b "$COOKIE_JAR" -X POST "${BASE_URL}/api/migrate-v288" \
  -H "Content-Type: application/json" \
  -d '{}' | python3 -m json.tool

echo
echo "==> Done. Cookie jar: $COOKIE_JAR"
