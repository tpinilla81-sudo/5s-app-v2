#!/bin/bash
BASE_URL="https://5s-app-v2.vercel.app"

echo "=== 1. Login como Juan (rol: responsable en prod) ==="
JUAN_RESP=$(curl -s -c /tmp/juan_cookies.txt -X POST "$BASE_URL/api/auth" \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@roncal.com","password":"juan123"}')
echo "$JUAN_RESP" | head -c 400
echo ""
JUAN_USER_ID=$(echo "$JUAN_RESP" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('user',{}).get('id',''))")
echo "Juan user ID: $JUAN_USER_ID"
JUAN_ROLE=$(echo "$JUAN_RESP" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('user',{}).get('role',''))")
echo "Juan role: $JUAN_ROLE"

echo ""
echo "=== 2. Projects de Juan ==="
PROJECTS_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/projects")
echo "$PROJECTS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
projects = d.get('projects', []) if isinstance(d, dict) else d
for p in projects[:2]:
    print(f\"  Project: {p.get('name','?')} (id={p.get('id','?')})\")
    for z in p.get('zones', [])[:5]:
        print(f\"    Zone: {z.get('name','?')} (id={z.get('id','?')}, responsableId={z.get('responsableId','?')})\")
"

echo ""
echo "=== 3. Members del proyecto ==="
PROJECT_ID=$(echo "$PROJECTS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
projects = d.get('projects', []) if isinstance(d, dict) else d
print(projects[0]['id'] if projects else '')
")
MEMBERS_RESP=$(curl -s -b /tmp/juan_cookies.txt "$BASE_URL/api/projects/$PROJECT_ID/members")
echo "$MEMBERS_RESP" | python3 -c "
import sys, json
d = json.loads(sys.stdin.read())
members = d.get('members', [])
print(f'Total miembros: {len(members)}')
for m in members[:20]:
    print(f\"  - userId={m.get('userId','?')} role={m.get('role','?')} name={m.get('user',{}).get('name','?')} email={m.get('user',{}).get('email','?')}\")
"
