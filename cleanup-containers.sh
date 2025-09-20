#!/usr/bin/env bash
set -euo pipefail

containers=(
  turbovets_api_dev
  turbovets_db_dev
  turbovets_redis_dev
  turbovets_dashboard_dev
)

for c in "${containers[@]}"; do
  echo "🔎 Checking $c..."
  if docker ps -a --format '{{.Names}}' | grep -q "^$c$"; then
    echo "⏹ Stopping $c..."
    docker stop "$c" || true

    echo "💀 Killing PID if stuck..."
    pid=$(docker inspect --format '{{.State.Pid}}' "$c" 2>/dev/null || echo 0)
    if [ "$pid" != "0" ]; then
      sudo kill -9 "$pid" || true
    fi

    echo "🗑 Removing $c..."
    docker rm -f "$c" || true
  else
    echo "ℹ️  Container $c does not exist"
  fi
done
sudo truncate -s 0 $(docker inspect --format='{{.LogPath}}' turbovets_dashboard_dev)
sudo truncate -s 0 $(docker inspect --format='{{.LogPath}}' turbovets_api_dev)
echo "✅ Cleanup complete. You can now run:"
echo "   docker compose -f docker-compose.yml up -d --build"
