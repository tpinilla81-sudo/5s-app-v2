#!/usr/bin/env python3
import urllib.request, json, sys

token = "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"
repo = "tpinilla81-sudo/5s-app"
branch = "main"
headers = {"Authorization": f"token {token}", "User-Agent": "Python", "Content-Type": "application/json"}

def api(url, method="GET", data=None):
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode()
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()[:300]
        print(f"HTTP {e.code}: {body}")
        sys.exit(1)

print("1. Getting ref...")
ref = api(f"https://api.github.com/repos/{repo}/git/refs/heads/{branch}")
commit_sha = ref["object"]["sha"]
print(f"   Commit: {commit_sha}")

print("2. Getting commit...")
commit = api(f"https://api.github.com/repos/{repo}/git/commits/{commit_sha}")
tree_sha = commit["tree"]["sha"]
print(f"   Tree: {tree_sha}")

print("3. Getting tree (recursive)...")
tree = api(f"https://api.github.com/repos/{repo}/git/trees/{tree_sha}?recursive=1")
items = tree["tree"]

cf = [i for i in items if i["path"] == "cloudflared"]
if not cf:
    print("   cloudflared NOT found - already deleted!")
else:
    print(f"   cloudflared FOUND: sha={cf[0]['sha']}")
    
    print("4. Creating new tree without cloudflared...")
    new_tree = api(
        f"https://api.github.com/repos/{repo}/git/trees",
        method="POST",
        data={"base_tree": tree_sha, "tree": [{"path": "cloudflared", "mode": "100644", "type": "blob", "sha": None}]}
    )
    print(f"   New tree: {new_tree['sha']}")
    
    print("5. Creating new commit...")
    new_commit = api(
        f"https://api.github.com/repos/{repo}/git/commits",
        method="POST",
        data={"message": "Remove cloudflared binary to fix Vercel deploy", "tree": new_tree["sha"], "parents": [commit_sha]}
    )
    print(f"   New commit: {new_commit['sha']}")
    
    print("6. Updating branch...")
    api(f"https://api.github.com/repos/{repo}/git/refs/heads/{branch}", method="PATCH", data={"sha": new_commit["sha"]})
    print("   DONE! cloudflared removed!")

print("\n7. Verification...")
info = api(f"https://api.github.com/repos/{repo}")
print(f"   Repo size: {info.get('size', 0) / 1024:.1f} MB")
