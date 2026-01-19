#!/bin/sh
set -e

until nc -z pg 5432; do 
  sleep
done

npx prisma migrate deploy

exec "$@"