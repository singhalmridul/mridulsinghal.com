#!/bin/bash

# VPS Details
USER="root"
HOST="72.62.79.187"
DOMAIN="mridulsinghal.com"
REMOTE_DIR="/var/www/mridulsinghal"

echo "========================================"
echo "🚀 Deploying to $DOMAIN ($HOST)"
echo "========================================"

# 1. Setup Server Environment
echo "Step 1: Setting up server environment..."
ssh $USER@$HOST "mkdir -p ~/scripts"
scp scripts/setup_vps.sh $USER@$HOST:~/scripts/
ssh $USER@$HOST "bash ~/scripts/setup_vps.sh"

# 2. Upload Files
echo "Step 2: Uploading build artifacts..."
# Ensure we send the minimal necessary files
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env.local' \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.ts \
  $USER@$HOST:$REMOTE_DIR

# 3. Remote Install & Restart
echo "Step 3: Installing dependencies and starting app..."
ssh $USER@$HOST << EOF
  cd $REMOTE_DIR
  npm install --production
  pm2 delete portfolio || true
  pm2 start npm --name "portfolio" -- start
  pm2 save
EOF

# 4. SSL Setup
echo "Step 4: Enabling SSL..."
ssh $USER@$HOST "certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m contact@$DOMAIN"

echo "========================================"
echo "✅ Deployment Successful!"
echo "🌍 Live at https://$DOMAIN"
echo "========================================"
