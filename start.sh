#!/bin/bash
# start.sh: start backend + nginx in one container

# Start backend in background
node /app/backend/server.js &

# Start nginx in foreground
nginx -g "daemon off;"
