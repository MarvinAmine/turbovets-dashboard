# TurboVets Monorepo

TurboVets is a monorepo project built with **NestJS**, **TypeORM**, **Postgres**, **Redis**, and an Angular dashboard.  
This guide will help you set up the development environment quickly.

---

## 📦 Requirements

Make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (>= 20.10)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2 recommended)
- [Node.js](https://nodejs.org/) (>= 20.x) and npm (>= 10.x) — required only if you want to run commands outside Docker
- `psql` client (optional, for inspecting the DB directly)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd TurboVets
````

### 2. Copy `.env` file

```bash
cp .env.example .env
```

You can tweak `DATABASE_URL`, `REDIS_URL`, and secrets inside `.env`.

---

## 🐳 Running with Docker (recommended)

Start all services (API, DB, Redis, Dashboard):

```bash
docker compose -f docker-compose.yml up -d --build
```

Stop all services:

```bash
docker compose -f docker-compose.yml down -v
```

Check logs for the API:

```bash
docker compose -f docker-compose.yml logs -f api-dev
```

Check logs for the Dashboard:

```bash
docker compose -f docker-compose.yml logs -f dashboard-dev
```

---

## 🧑‍💻 Running Locally (without Docker)

You can run the backend with hot-reload outside Docker while keeping Postgres + Redis in containers.

```bash
.env.dev
# DEV
NODE_ENV=development
PORT=3000
JWT_SECRET=change-me-dev

# Postgres
POSTGRES_DB=turbovets
POSTGRES_USER=turbovets
POSTGRES_PASSWORD=turbovets

# Local DB + Redis (via Docker Compose)
DATABASE_URL=postgres://turbovets:turbovets@localhost:5433/turbovets
REDIS_URL=redis://localhost:6380
```
### 1. Start DB + Redis only

```bash
docker compose -f docker-compose.yml up db redis -d
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the API (NestJS)


#### Run the backend
```bash
npx ts-node-dev -r tsconfig-paths/register -P tsconfig.dev.json apps/api/src/main.ts 
```

The API will be available at [http://localhost:3000](http://localhost:3000).

### 4. Run the Dashboard (Angular)

```bash
npm run start
```

The Angular dev server will be available at [http://localhost:4200](http://localhost:4200).

---

## 🗄 Database & Migrations

### Automatic Migration

On startup, the `api-dev` container will automatically run pending migrations.

### Manual Migration Commands

Generate a new migration after changing entities:

```bash
docker compose -f docker-compose.yml exec api-dev \
  npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js \
  migration:generate -d apps/api/src/typeorm.config.ts apps/api/src/migrations/<migration-name>
```

Run migrations:

```bash
docker compose -f docker-compose.yml run --rm api-dev \
  npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js \
  migration:run -d apps/api/src/typeorm.config.ts
```

Inspect migrations applied:

```bash
docker exec -it turbovets_db_dev psql -U turbovets -d turbovets -c "SELECT * FROM migrations;"
```

---

## 🌐 Services

* **API** → [http://localhost:3001](http://localhost:3001) (Docker)
  or [http://localhost:3000](http://localhost:3000) (Local run)
* **Postgres** → `localhost:5433` (user: `turbovets`, password: `turbovets`, db: `turbovets`)
* **Redis** → `localhost:6380`
* **Dashboard** → [http://localhost:4200](http://localhost:4200)

---

## ✅ Run the Tests

From the project root:

```bash
npm run test
```

## 🔑 How to Test Endpoints

### 1. Login

### 🔑 Credentials

- **Admin**
  - Email: `admin@acme.test`
  - Password: `Password123!`

- **Viewer**
  - Email: `viewer@acme.test`
  - Password: `Password123!`

- **Owner**
  - Email: `owner@acme.test`
  - Password: `Password123!`

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@acme.test", "password": "Password123!"}'
```

Expected response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5c..."
}
```

### 2. Fetch tasks

```bash
curl http://localhost:3001/tasks \
  -H "Authorization: Bearer <access_token_here>"
```

---

## 🛠 Troubleshooting

* **Cannot connect to DB?**
  Make sure the container `turbovets_db_dev` is healthy:

  ```bash
  docker ps --filter "name=turbovets_db_dev"
  ```

* **Dashboard shows “Cannot GET /”?**
  This usually means the Angular build didn’t complete. Try rebuilding:

  ```bash
  docker compose -f docker-compose.yml up -d --build
  ```

* **Stuck container?**
  Kill containers with these commands
  ```bash
  chmod +x cleanup-containers.sh
  ./cleanup-containers.sh
  ```

