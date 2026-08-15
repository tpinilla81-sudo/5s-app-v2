#!/bin/bash
# Test end-to-end del flujo de programación de autoevaluación
# 1. Login como responsable (Elena)
# 2. Programar autoeval S1 miniStep=4 para una zona
# 3. Verificar que se crea el schedule con rolEjecutor
# 4. Verificar que se crea la notif evaluation_scheduled al empleado
# 5. Login como empleado (Juan)
# 6. Verificar que el empleado ve la notif y el schedule

BASE_URL="https://5s-app-v2.vercel.app"

echo "=== 1. Login como Elena (responsable) ==="
LOGIN_RESP=$(curl -s -c /tmp/elena_cookies.txt -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"elena@roncal.com","password":"elena123"}')
echo "$LOGIN_RESP" | head -c 500
echo ""
ELENA_USER_ID=$(echo "$LOGIN_RESP" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('user',{}).get('id',''))")
echo "Elena user ID: $ELENA_USER_ID"

echo ""
echo "=== 2. Get projects/zones de Elena ==="
PROJECTS_RESP=$(curl -s -b /tmp/elena_cookies.txt "$BASE_URL/api/projects")
echo "$PROJECTS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
projects = d.get('projects', []) if isinstance(d, dict) else d
for p in projects[:2]:
    print(f\"  Project: {p.get('name','?')} (id={p.get('id','?')})\")
    for z in p.get('zones', [])[:3]:
        print(f\"    Zone: {z.get('name','?')} (id={z.get('id','?')}, responsableId={z.get('responsableId','?')})\")
" 2>&1 || echo "ERROR parsing projects"
PROJECT_ID=$(echo "$PROJECTS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
projects = d.get('projects', []) if isinstance(d, dict) else d
print(projects[0]['id'] if projects else '')
")
ZONE_ID=$(echo "$PROJECTS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
projects = d.get('projects', []) if isinstance(d, dict) else d
if projects and projects[0].get('zones'):
    print(projects[0]['zones'][0]['id'])
else:
    print('')
")
echo "Project ID: $PROJECT_ID"
echo "Zone ID: $ZONE_ID"

echo ""
echo "=== 3. Buscar empleado (Juan) del proyecto ==="
MEMBERS_RESP=$(curl -s -b /tmp/elena_cookies.txt "$BASE_URL/api/projects/$PROJECT_ID/members")
EMPLEADO_ID=$(echo "$MEMBERS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
members = d.get('members', [])
for m in members:
    if m.get('role') == 'empleado':
        print(m.get('userId','')); break
")
echo "Empleado (Juan) userId: $EMPLEADO_ID"

echo ""
echo "=== 4. Programar autoeval S1 miniStep=4 ==="
SCHEDULE_RESP=$(curl -s -b /tmp/elena_cookies.txt -X POST "$BASE_URL/api/evaluation-schedule" \
  -H "Content-Type: application/json" \
  -d "{
    \"sStep\": 1,
    \"miniStep\": 4,
    \"projectId\": \"$PROJECT_ID\",
    \"zoneId\": \"$ZONE_ID\",
    \"fechaProgramada\": \"2026-08-20\",
    \"horaProgramada\": \"10:00\",
    \"responsableId\": \"$ELENA_USER_ID\",
    \"empleadoId\": \"$EMPLEADO_ID\",
    \"createdBy\": \"$ELENA_USER_ID\",
    \"rolEjecutor\": \"responsable\",
    \"notifyUser\": true,
    \"estado\": \"programada\"
  }")
echo "$SCHEDULE_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
if d.get('success'):
    s = d.get('data', {})
    print(f\"  Schedule creado: id={s.get('id')}\")
    print(f\"  sStep={s.get('sStep')} miniStep={s.get('miniStep')}\")
    print(f\"  estado={s.get('estado')}\")
    print(f\"  responsableId (ejecutor)={s.get('responsableId')}\")
    print(f\"  empleadoId (asistente)={s.get('empleadoId')}\")
    print(f\"  rolEjecutor={s.get('rolEjecutor')}\")
else:
    print(f\"  ERROR: {d.get('error')}\")
"

echo ""
echo "=== 5. Verificar notif al empleado (Juan) ==="
sleep 2  # dar tiempo a que se cree la notif
NOTIFS_RESP=$(curl -s -b /tmp/elena_cookies.txt "$BASE_URL/api/notifications?userId=$EMPLEADO_ID&projectId=$PROJECT_ID")
echo "$NOTIFS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
notifs = d.get('data', []) if d.get('success') else []
eval_notifs = [n for n in notifs if n.get('type') == 'evaluation_scheduled']
print(f\"  Total notifs: {len(notifs)}\")
print(f\"  evaluation_scheduled notifs: {len(eval_notifs)}\")
for n in eval_notifs[:3]:
    print(f\"    - {n.get('title','')}\")
    print(f\"      msg: {n.get('message','')[:120]}\")
    print(f\"      created: {n.get('createdAt','')}\")
"

echo ""
echo "=== 6. Login como Juan (empleado) ==="
JUAN_RESP=$(curl -s -c /tmp/juan_cookies.txt -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@roncal.com","password":"juan123"}')
echo "$JUAN_RESP" | head -c 300
echo ""
JUAN_USER_ID=$(echo "$JUAN_RESP" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('user',{}).get('id',''))")
echo "Juan user ID: $JUAN_USER_ID"

echo ""
echo "=== 7. Juan consulta sus schedules ==="
JUAN_SCHED_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/evaluation-schedule?userId=$JUAN_USER_ID&projectId=$PROJECT_ID")
echo "$JUAN_SCHED_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
if d.get('success'):
    scheds = d.get('data', [])
    print(f\"  Schedules visibles para Juan: {len(scheds)}\")
    for s in scheds[:5]:
        print(f\"    - S{s.get('sStep')} miniStep={s.get('miniStep')} estado={s.get('estado')} fecha={s.get('fechaProgramada')} hora={s.get('horaProgramada')} zone={s.get('zone',{}).get('name','?')}\")
else:
    print(f\"  ERROR: {d.get('error')}\")
"

echo ""
echo "=== 8. Juan consulta sus notifs ==="
JUAN_NOTIFS_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/notifications?userId=$JUAN_USER_ID&projectId=$PROJECT_ID")
echo "$JUAN_NOTIFS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
notifs = d.get('data', []) if d.get('success') else []
print(f\"  Total notifs de Juan: {len(notifs)}\")
eval_notifs = [n for n in notifs if n.get('type') == 'evaluation_scheduled']
print(f\"  evaluation_scheduled: {len(eval_notifs)}\")
for n in eval_notifs[:3]:
    print(f\"    - {n.get('title','')}\")
    print(f\"      msg: {n.get('message','')[:120]}\")
    print(f\"      read: {n.get('read')}\")
"

