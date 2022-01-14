restart: 
	@make down
	@make up

up:
	docker-compose up -d
	@make logs
down:
	docker-compose down

install:
	docker-compose build
	docker-compose run --rm node yarn install

yarn-update:
	docker-compose run --rm node yarn upgrade --latest

logs:
	docker-compose logs -f
