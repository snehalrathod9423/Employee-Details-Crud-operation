# Employee CRUD - NestJS + TypeORM + Postgres

Minimal scaffold for Employee CRUD using NestJS and TypeORM.

Setup

1. Copy `.env.example` to `.env` and fill DB values.
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
