#!/usr/bin/env sh
set -eu

# Render env.js from the template using current env vars
# Available variables (set them on `docker run` or in docker-compose):
#   API_URL        -> e.g. https://api.turbovets.example
#   APP_NAME       -> e.g. TurboVets Dashboard (optional)
#   LOG_LEVEL      -> e.g. info|debug (optional)

: "${API_URL:=http://localhost:3001}"
: "${APP_NAME:=TurboVets Dashboard}"
: "${LOG_LEVEL:=info}"

tpl="/usr/share/nginx/html/env.template.js"
out="/usr/share/nginx/html/env.js"

# Simple placeholder replacement
sed \
  -e "s|__API_URL__|${API_URL}|g" \
  -e "s|__APP_NAME__|${APP_NAME}|g" \
  -e "s|__LOG_LEVEL__|${LOG_LEVEL}|g" \
  "$tpl" > "$out"

echo "[entrypoint] Wrote runtime config to env.js:"
cat "$out" || true
echo

exec "$@"
