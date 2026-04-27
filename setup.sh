#!/bin/bash
# MyTrees — one-shot setup script
# Run this once from Terminal to finish git + GitHub setup
# Usage: cd "/Users/stefangravesande/Documents/Projects/Preqal 2027/Apps/mytrees/MyTreeApp" && bash setup.sh

set -e

echo "🌳 MyTrees setup script"
echo "========================"

# 1. Clean up any stale git lock files
echo ""
echo "Step 1: Cleaning git lock files..."
rm -f .git/HEAD.lock .git/refs/heads/master.lock .git/refs/heads/main.lock
echo "✅ Done"

# 2. Commit the TypeScript fixes
echo ""
echo "Step 2: Committing TypeScript fixes..."
git add -A
git commit -m "fix: TypeScript Database types, Relationships, Functions, rpc() error handling" || echo "(nothing new to commit)"
echo "✅ Done"

# 3. Rename branch to main
echo ""
echo "Step 3: Renaming branch to main..."
git branch -m master main 2>/dev/null || git branch -m main 2>/dev/null || echo "(already on main)"
echo "✅ Done"

# 4. Ensure remote is set
echo ""
echo "Step 4: Setting GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/TheStormKingG/mytrees.git
echo "✅ Remote set to: $(git remote get-url origin)"

echo ""
echo "========================"
echo "🎉 Local setup complete!"
echo ""
echo "NEXT STEPS:"
echo ""
echo "  1. Create the GitHub repo (public, no README):"
echo "     👉 https://github.com/new"
echo "     Name: mytrees"
echo ""
echo "  2. Push to GitHub:"
echo "     git push -u origin main"
echo ""
echo "  3. Add Supabase secrets to GitHub:"
echo "     👉 https://github.com/TheStormKingG/mytrees/settings/secrets/actions"
echo "     VITE_SUPABASE_URL = https://ajwbzvumwycdplpgvslk.supabase.co"
echo "     VITE_SUPABASE_ANON_KEY = (copy from .env.local)"
echo ""
echo "  4. Enable GitHub Pages:"
echo "     👉 https://github.com/TheStormKingG/mytrees/settings/pages"
echo "     Source: GitHub Actions"
echo ""
echo "  5. Your live URL will be:"
echo "     https://thestormkingg.github.io/mytrees/"
echo ""
echo "  6. Add Supabase redirect URL for auth:"
echo "     👉 https://supabase.com/dashboard/project/ajwbzvumwycdplpgvslk/auth/url-configuration"
echo "     Add: https://thestormkingg.github.io/mytrees/"
echo ""
