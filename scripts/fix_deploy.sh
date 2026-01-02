#!/bin/bash
# Re-install dependencies and fix 'next not found'
cd /var/www/mridulsinghal

echo ">>> Cleaning node_modules..."
rm -rf node_modules package-lock.json

echo ">>> Installing Dependencies (Clean)..."
npm install

echo ">>> Verifying Next.js binary..."
ls -l node_modules/.bin/next

echo ">>> Restarting PM2..."
pm2 delete portfolio
pm2 start npm --name "portfolio" -- start
pm2 save
