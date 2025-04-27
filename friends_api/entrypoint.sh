#!/bin/bash
set -e
 
rm -f /rails/tmp/pids/server.pid

until pg_isready -h "$POSTGRES_HOST" -U "$POSTGRES_USER"; do
  echo "Waiting for Postgres..."
  sleep 2
done
 
echo "Running database migrations.."
bundle exec rails db:migrate
 
if [ -f /server/db/seeds.rb ]; then
  echo "Seeding databases..."
  bundle exec rails db:seed
fi
 
echo "Starting rails server ..."
 
exec "$@"