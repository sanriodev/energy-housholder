#!/bin/bash
cat << EOF
******************************
* ENERGY  / PROJECT LAUNCHER *
******************************

EOF
docker login ghcr.io -u $ --password-stdin
docker compose pull
docker compose  -f docker-compose.yml up -d $@
