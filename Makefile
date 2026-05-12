dev:
	docker-compose run --rm --service-ports bun bun run dev --host

install:
	docker-compose run --rm bun bun install

build:
	docker-compose run --rm bun bun run build

test:
	docker-compose run --rm bun npm test

test-watch:
	docker-compose run --rm --service-ports bun npm run test:watch

deploy:
	docker-compose run --rm bun sh -c "bun run build && wrangler deploy"

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f
