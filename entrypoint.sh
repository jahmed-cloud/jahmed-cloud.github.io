#!/bin/sh
# Inject Docker Compose variables into config.js
envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js
exec "$@"
