#!/usr/bin/env bash
# Inspect ActionItems legacy del inventario para ver qué campos tienen.
set -euo pipefail

BASE_URL="https://5s-app-v2.vercel.app"
COOKIE_JAR="/tmp/5s-prod-cookies.txt"

# Login si no hay cookie
if [ ! -f "$COOKIE_JAR" ] || ! grep -q "5s_session" "$COOKIE_JAR" 2>/dev/null; then
  echo "==> Logging in as gestor..."
  curl -s -c "$COOKIE_JAR" -X POST "${BASE_URL}/api/auth" \
    -H "Content-Type: application/json" \
    -d '{"email":"t_pinilla@outlook.com","password":"gestor123"}' > /dev/null
fi

echo "==> Fetching all ActionItems del inventario..."
curl -s -b "$COOKIE_JAR" "${BASE_URL}/api/actions?source=inventario" | python3 -c "
import sys, json
data = json.load(sys.stdin)
actions = data.get('data', data) if isinstance(data, dict) else data
if not isinstance(actions, list):
    print('Response:', data)
    sys.exit(0)
print(f'Total: {len(actions)}')
for a in actions:
    print('---')
    print(f\"  id: {a.get('id')}\")
    print(f\"  sStep: {a.get('sStep')}\")
    print(f\"  source: {a.get('source')}\")
    print(f\"  sourceId: {a.get('sourceId')}\")
    print(f\"  itemId: {a.get('itemId')}\")
    extra_raw = a.get('extra')
    if extra_raw:
        try:
            extra = json.loads(extra_raw) if isinstance(extra_raw, str) else extra_raw
            print(f\"  extra.inventoryItemId: {extra.get('inventoryItemId')}\")
            print(f\"  extra.decision: {extra.get('decision')}\")
            print(f\"  extra.etiquetas: {extra.get('etiquetas')}\")
            print(f\"  extra.etiquetaGenerada: {extra.get('etiquetaGenerada')}\")
            print(f\"  extra.zonaDestino: {extra.get('zonaDestino')}\")
        except Exception as e:
            print(f\"  extra (raw): {extra_raw[:200]}\")
"
