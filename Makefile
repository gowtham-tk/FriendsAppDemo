build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

logs:
	docker-compose-logs -f

migrate:
	docker-compose exec backend rails db:migrate

create-db:
	docker-compose exec backend rails db:create

reset-db:
	docker-compose exec backend rails db:drop
	docker-compose exec backend rails db:create
	docker-compose exec backend rails db:migrate

ps:
	docker-compose ps
