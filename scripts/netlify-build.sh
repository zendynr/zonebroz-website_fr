#!/usr/bin/env bash
set -e

# 1. Create publish directory and copy main site (static HTML)
mkdir -p public
# Include onboarding.js so the premium wizard works on Netlify
cp index.html contact.html privacy.html terms.html vault.html robots.txt sitemap.xml _redirects onboarding.js public/ 2>/dev/null || true
cp -r images projects public/

# 2. Build the portal (Vite app)
cd portal
npm ci
npm run build
cd ..

# 3. Copy built portal into public/portal/
mkdir -p public/portal
cp -r portal/dist/* public/portal/

echo "Netlify build done. Main site + portal in public/"
