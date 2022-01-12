restart: 
	@make down
	@make up

up:
	docker-compose up -d

down:
	docker-compose down

install:
	docker-compose build
	docker-compose run --rm node yarn install

logs:
	docker-compose logs -f

generate:
	docker-compose run --rm node yarn generate
