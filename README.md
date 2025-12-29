# Employee CRUD - NestJS + TypeORM + Postgres
```markdown
# Employee CRUD - NestJS + TypeORM + Postgres

Minimal scaffold for Employee CRUD using NestJS and TypeORM.

Setup

1. Copy `.env.example` to `.env` and fill DB values (or edit the provided `.env`).
2. Install dependencies:

```powershell
npm install
```

3. Run in development:

```powershell
npm run start:dev
```

API Endpoints

- POST /employees - create
- GET /employees - list
- GET /employees/:id - get one
- PATCH /employees/:id - update
- DELETE /employees/:id - remove

Git

```powershell
git init
git add .
git commit -m "Initial NestJS TypeORM Employee CRUD"
```

Docker

Run the application and Postgres with Docker Compose:

```powershell
docker-compose up --build
```

This exposes the API on port `3000` and Postgres on `5432`. The project uses the `.env` file for database credentials (a default `.env` was added). To use the DB from within the app container, `DB_HOST` is set to the service name `db`.

Notes:
- For development you may prefer `npm run start:dev` locally instead of running inside Docker.
- The Dockerfile builds the app and runs `node dist/main.js`.
```