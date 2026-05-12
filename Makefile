dev:
	docker-compose run --rm --service-ports bun bun run dev --host

install:
	docker-compose run --rm bun bun install

build:
	docker-compose run --rm bun bun run build

deploy:
	docker-compose run --rm bun sh -c "bun run build && wrangler deploy"

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f
