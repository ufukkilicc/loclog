docker-build:
	docker compose -f docker-compose.yml build $(filter-out $@,$(MAKECMDGOALS))
docker-start:
	docker compose -f docker-compose.yml up -d $(filter-out $@,$(MAKECMDGOALS))
docker-stop:
	docker compose -f docker-compose.yml down $(filter-out $@,$(MAKECMDGOALS))
docker-recreate:
	docker compose -f docker-compose.yml up $(filter-out $@,$(MAKECMDGOALS)) --force-recreate --build -d
docker-restart:
	docker compose -f docker-compose.yml restart $(filter-out $@,$(MAKECMDGOALS))
docker-remove:
	docker compose -f docker-compose.yml rm $(filter-out $@,$(MAKECMDGOALS))
docker-logs:
	docker compose logs --tail=0 --follow -f $(filter-out $@,$(MAKECMDGOALS))
docker-test:
	docker compose -f docker-compose.yml up k6