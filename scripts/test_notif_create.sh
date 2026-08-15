#!/bin/bash
BASE_URL="https://5s-app-v2.vercel.app"

# IDs ya conocidos de la prueba anterior
PROJECT_ID="cmsptaerv0001l504inaepwlw"
ZONE_ID="cmsptaerv0002l5041s7s5naf"  # Z1
JUAN_USER_ID="cmsptalpo000wjs04wfgh62vd"  # responsable
LUIS_USER_ID=""  # empleado

echo "=== 1. Login como Juan, buscar Luis userId ==="
curl -s -c /tmp/juan_cookies.txt -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@roncal.com","password":"juan123"}' > /dev/null

MEMBERS_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/projects/$PROJECT_ID/members")
LUIS_USER_ID=$(echo "$MEMBERS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
for m in d.get('members', []):
    if m.get('role') == 'empleado' and 'luis' in m.get('user',{}).get('email','').lower():
        print(m.get('user',{}).get('id',''))
        break
")
echo "Luis (empleado) userId: $LUIS_USER_ID"

echo ""
echo "=== 2. Programar autoeval S1 miniStep=4 con IDs válidos ==="
SCHEDULE_RESP=$(curl -s -b /tmp/juan_cookies.txt -X POST "$BASE_URL/api/evaluation-schedule" \
  -H "Content-Type: application/json" \
  -d "{
    \"sStep\": 1,
    \"miniStep\": 4,
    \"projectId\": \"$PROJECT_ID\",
    \"zoneId\": \"$ZONE_ID\",
    \"fechaProgramada\": \"2026-08-20\",
    \"horaProgramada\": \"10:00\",
    \"responsableId\": \"$JUAN_USER_ID\",
    \"empleadoId\": \"$LUIS_USER_ID\",
    \"createdBy\": \"$JUAN_USER_ID\",
    \"rolEjecutor\": \"responsable\",
    \"notifyUser\": true,
    \"estado\": \"programada\"
  }")
echo "$SCHEDULE_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
if d.get('success'):
    s = d.get('data', {})
    print(f\"  Schedule creado OK\")
    print(f\"  id={s.get('id')}\")
    print(f\"  responsableId={s.get('responsableId')}\")
    print(f\"  empleadoId={s.get('empleadoId')}\")
    print(f\"  rolEjecutor={s.get('rolEjecutor')}\")
    print(f\"  estado={s.get('estado')}\")
else:
    print(f\"  ERROR: {d.get('error')}\")
"

echo ""
echo "=== 3. Verificar notif a Luis (5s después) ==="
sleep 5
NOTIFS_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/notifications?userId=$LUIS_USER_ID&projectId=$PROJECT_ID")
echo "$NOTIFS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
notifs = d.get('data', []) if d.get('success') else []
print(f'Total notifs de Luis: {len(notifs)}')
eval_notifs = [n for n in notifs if n.get('type') == 'evaluation_scheduled']
print(f'evaluation_scheduled: {len(eval_notifs)}')
for n in eval_notifs[:3]:
    print(f\"  - title: {n.get('title','')}\")
    print(f\"    msg: {n.get('message','')[:200]}\")
    print(f\"    createdAt: {n.get('createdAt','')}\")
    print(f\"    read: {n.get('read')}\")
    print(f\"    metadata: {n.get('metadata','')[:200]}\")
"

echo ""
echo "=== 4. Login como Luis, ver schedules visibles ==="
LUIS_RESP=$(curl -s -c /tmp/luis_cookies.txt -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"luis@roncal.com","password":"luis123"}')
echo "Luis login: $(echo $LUIS_RESP | head -c 200)"
LUIS_USER_ID_FROM_LOGIN=$(echo "$LUIS_RESP" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('user',{}).get('id',''))" 2>/dev/null)
echo "Luis userId from login: $LUIS_USER_ID_FROM_LOGIN"

LUIS_SCHED=$(curl -s -b /tmp/luis_cookies.txt "$BASE_URL/api/evaluation-schedule?userId=$LUIS_USER_ID_FROM_LOGIN&projectId=$PROJECT_ID")
echo "Schedules de Luis:"
echo "$LUIS_SCHED" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
if d.get('success'):
    scheds = d.get('data', [])
    print(f'  Total: {len(scheds)}')
    for s in scheds[:5]:
        print(f\"  - S{s.get('sStep')} miniStep={s.get('miniStep')} estado={s.get('estado')} fecha={s.get('fechaProgramada')} hora={s.get('horaProgramada')} zone={s.get('zone',{}).get('name','?')}\")
else:
    print(f'  ERROR: {d.get(\"error\")}')
"

LUIS_NOTIFS=$(curl -s -b /tmp/luis_cookies.txt "$BASE_URL/api/notifications?userId=$LUIS_USER_ID_FROM_LOGIN&projectId=$PROJECT_ID")
echo "Notifs de Luis:"
echo "$LUIS_NOTIFS" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
notifs = d.get('data', []) if d.get('success') else []
print(f'  Total: {len(notifs)}')
eval_notifs = [n for n in notifs if n.get('type') == 'evaluation_scheduled']
print(f'  evaluation_scheduled: {len(eval_notifs)}')
for n in eval_notifs[:3]:
    print(f\"  - {n.get('title','')}\")
"
