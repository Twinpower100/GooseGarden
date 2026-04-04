# Инициализация PostgreSQL в Docker

## Как попасть в контейнер **содержимое вашей локальной базы**

### Шаг 1. Снять дамп с локального PostgreSQL

Из корня репозитория (Windows, PowerShell):

```powershell
.\scripts\dump-local-db.ps1
```

По умолчанию скрипт подключается к `localhost:5433`, пользователь `goose_garden_admin`, база `goose_garden`. Пароль можно задать переменной окружения `PGPASSWORD` или ввести по запросу.

Дамп сохраняется в **`docker/postgres/init/01_local_dump.sql`** (файл в `.gitignore`, в Git не попадёт).

При необходимости переопределите хост/порт/пользователя — см. параметры в начале `scripts/dump-local-db.ps1`.

Установленный **`pg_dump`** должен быть в `PATH` (например клиент PostgreSQL или OSGeo4W). Версия клиента должна быть **не ниже major-версии сервера** (иначе будет `server version mismatch`). Если локально только `pg_dump` 17, а сервер 18 — используйте дамп через Docker:

```powershell
docker run --rm -e PGPASSWORD="ваш_пароль" -v "${PWD}/docker/postgres/init:/out" mirror.gcr.io/library/postgres:18 pg_dump -h host.docker.internal -p 5433 -U goose_garden_admin -d goose_garden --clean --if-exists --no-owner --no-acl --format=plain -f /out/01_local_dump.sql
```

(Команду выполняйте из **корня репозитория**; порт и пользователь при необходимости замените.)

### Шаг 2. Поднять Postgres с этим дампом

В `docker-compose.yml` для образа **PostgreSQL 18+** том монтируется в **`/var/lib/postgresql`** (не в `/var/lib/postgresql/data`) — так требует официальный образ. Старый том с примонтированным `.../data` и PG 18 несовместим: контейнер падает с сообщением про `unused mount/volume`; нужен **`docker compose down -v`** и новый первый старт с дампом.

Скрипты из `docker-entrypoint-initdb.d` выполняются **только если том данных пустой** (первый запуск).

1. Остановить и **удалить том** с данными Postgres (данные в контейнере будут стёрты):

   ```bash
   docker compose down -v
   ```

2. Убедиться, что файл **`docker/postgres/init/01_local_dump.sql`** существует (после шага 1).

3. Запустить:

   ```bash
   docker compose up -d
   ```

Postgres при первом старте выполнит `01_local_dump.sql` и восстановит схему и данные.

### Если том уже был создан без дампа

Снова выполните **`docker compose down -v`**, затем положите `01_local_dump.sql` и **`docker compose up -d`**.  
Без `-v` старый том не пустой — init-скрипты **не запустятся**.

### Альтернатива: восстановить в уже работающий контейнер

Если не хотите пересоздавать том:

```powershell
.\scripts\restore-into-running-docker.ps1
```

Внимание: дамп создаётся с `--clean --if-exists` — перед импортом удаляются объекты из дампа; на пустой базе в контейнере это нормально. Если в контейнере уже есть важные данные — сначала сделайте бэкап.
