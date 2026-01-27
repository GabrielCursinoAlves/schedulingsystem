#!/bin/sh
set -e

until nc -z pg 5432; do 
  sleep 2
done

node ./node_modules/prisma/build/index.js migrate deploy

exec "$@"