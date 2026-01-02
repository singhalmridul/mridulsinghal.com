#!/bin/bash

# Configuration
DOMAIN="mridulsinghal.com"
NODE_VERSION="18.x"
APP_DIR="/var/www/mridulsinghal"

set -e

echo ">>> Updating System..."
apt-get update && apt-get upgrade -y

echo ">>> Installing Essential Tools..."
apt-get install -y curl git nginx certbot python3-certbot-nginx

echo ">>> Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

echo ">>> Installing PM2..."
npm install -g pm2

echo ">>> Configuring Nginx..."
cat > /etc/nginx/sites-available/$DOMAIN <<EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test and reload
nginx -t
systemctl reload nginx

echo ">>> Creating App Directory..."
mkdir -p $APP_DIR
chown -R root:root $APP_DIR

echo ">>> Setup Complete! Ready for deployment."
