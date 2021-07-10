build:
	@docker-compose build

run_dev:
	@docker-compose up -d
	@docker logs -f api_test_crud_nestjs

stop:
	@docker-compose down

restart_dev: stop run_dev