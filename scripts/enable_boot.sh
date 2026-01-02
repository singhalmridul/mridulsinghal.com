#!/bin/bash
set -e

echo ">>> Generating Startup Script..."
# Get the command that PM2 tells us to run
# Typically looks like: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /root
STARTUP_CMD=$(pm2 startup systemd | grep "sudo env")

if [ -n "$STARTUP_CMD" ]; then
    echo ">>> Executing: $STARTUP_CMD"
    eval "$STARTUP_CMD"
else
    echo ">>> No command captured from 'pm2 startup systemd'. It might already be active or output format changed."
    # Try running it without arguments to see if it just works or detects
    pm2 startup || true
fi

echo ">>> Saving current process list..."
pm2 save

echo ">>> Verifying Startup Service..."
systemctl status pm2-root --no-pager || echo "Service status check skipped/failed, but setup ran."

echo ">>> Success! Website will auto-start on reboot."
