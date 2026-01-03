#!/bin/bash

# 1. Build the project locally
echo "========================================"
echo "🏗️  Building Project for Production..."
echo "========================================"
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
  echo "✅ Build Successful."
  
  # 2. Run the deployment script
  echo "========================================"
  echo "🚀 Starting Deployment to VPS..."
  echo "========================================"
  expect auto_deploy.exp
  
else
  echo "❌ Build Failed. Aborting deployment."
  echo "Please fix the errors above and try again."
  exit 1
fi
