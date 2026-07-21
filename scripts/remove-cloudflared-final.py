#!/usr/bin/env python3
import urllib.request
import json

token = "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"
repo = "tpinilla81-sudo/5s-app"
branch = "main"
headers = {
    "Authorization": f"token {token}",
    "User-Agent": "Python",
    "Content-Type": "application/json"
}

def api_call(url, method="GET", data=None):
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode()
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read())

try:
    # Step 1: Get the latest commit on main
    print("Step 1: Getting latest commit ref...")
    ref = api_call(f"https://api.github.com/repos/{repo}/git/refs/heads/{branch}")
    commit_sha = ref["object"]["sha"]
    print(f"  Latest commit: {commit_sha}")

    # Step 2: Get the commit to find its tree
    print("Step 2: Getting commit details...")
    commit = api_call(f"https://api.github.com/repos/{repo}/git/commits/{commit_sha}")
    tree_sha = commit["tree"]["sha"]
    print(f"  Tree SHA: {tree_sha}")

    # Step 3: Get the full tree recursively
    print("Step 3: Getting full tree (recursive)...")
    tree = api_call(f"https://api.github.com/repos/{repo}/git/trees/{tree_sha}?recursive=1")
    items = tree["tree"]
    print(f"  Total items in tree: {len(items)}")

    # Check for cloudflared
    cloudflared_items = [i for i in items if i["path"] == "cloudflared"]
    if not cloudflared_items:
        print("  cloudflared NOT FOUND in current tree - already removed!")
    else:
        print(f"  FOUND cloudflared: {cloudflared_items[0]}")

        # Step 4: Create a new tree without cloudflared
        # Using base_tree + setting sha to None removes the entry
        print("Step 4: Creating new tree without cloudflared...")
        new_tree_data = {
            "base_tree": tree_sha,
            "tree": [
                {
                    "path": "cloudflared",
                    "mode": "100644",
                    "type": "blob",
                    "sha": None
                }
            ]
        }
        new_tree = api_call(
            f"https://api.github.com/repos/{repo}/git/trees",
            method="POST",
            data=new_tree_data
        )
        new_tree_sha = new_tree["sha"]
        print(f"  New tree SHA: {new_tree_sha}")

        # Step 5: Create a new commit with the new tree
        print("Step 5: Creating new commit...")
        new_commit = api_call(
            f"https://api.github.com/repos/{repo}/git/commits",
            method="POST",
            data={
                "message": "Remove cloudflared binary to fix Vercel deploy",
                "tree": new_tree_sha,
                "parents": [commit_sha]
            }
        )
        new_commit_sha = new_commit["sha"]
        print(f"  New commit SHA: {new_commit_sha}")

        # Step 6: Update the main branch to point to the new commit
        print("Step 6: Updating main branch ref...")
        result = api_call(
            f"https://api.github.com/repos/{repo}/git/refs/heads/{branch}",
            method="PATCH",
            data={"sha": new_commit_sha}
        )
        print(f"  Branch updated! New ref: {result['object']['sha']}")
        print("\n  SUCCESS! cloudflared has been removed from the repo!")

    # Verification
    print("\n--- Verification ---")
    print("Checking repo size...")
    repo_info = api_call(f"https://api.github.com/repos/{repo}")
    size_mb = repo_info.get("size", 0) / 1024
    print(f"  Repo size: {size_mb:.1f} MB")
    
    print("Checking new tree for cloudflared...")
    new_ref = api_call(f"https://api.github.com/repos/{repo}/git/refs/heads/{branch}")
    new_cs = new_ref["object"]["sha"]
    new_commit_info = api_call(f"https://api.github.com/repos/{repo}/git/commits/{new_cs}")
    new_tree_check = api_call(f"https://api.github.com/repos/{repo}/git/trees/{new_commit_info['tree']['sha']}?recursive=1")
    cf_check = [i for i in new_tree_check["tree"] if i["path"] == "cloudflared"]
    if cf_check:
        print("  WARNING: cloudflared still found in new tree!")
    else:
        print("  CONFIRMED: cloudflared is GONE from latest tree!")

except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
