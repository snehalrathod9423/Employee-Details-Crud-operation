Employee Details CRUD Operation 🚀

This project is a backend REST API built using NestJS that performs CRUD (Create, Read, Update, Delete) operations for Employee details.
It uses PostgreSQL as the database, TypeORM for database interaction, and Docker for containerization.
The project follows clean architecture and Git best practices.

🛠 Tech Stack

Backend Framework: NestJS

Language: TypeScript

Database: PostgreSQL

ORM: TypeORM

Containerization: Docker & Docker Compose

Version Control: Git & GitHub

✨ Features

Create new employee

Get all employees

Get employee by ID

Update employee details

Delete employee

PostgreSQL database integration

Environment-based configuration

Dockerized setup

Proper folder structure

📁 Project Structure
src/
├── employee/
│   ├── employee.controller.ts
│   ├── employee.service.ts
│   ├── employee.entity.ts
│   ├── employee.module.ts
│
├── app.module.ts
├── main.ts

⚙️ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

npm

PostgreSQL (if not using Docker)

Docker & Docker Compose

Git

🗄 Database Setup (Without Docker)

Install PostgreSQL

Create database:

CREATE DATABASE employee_db;


Default configuration:

Username: postgres

Password: your_password

Port: 5432

🔐 Environment Variables

Create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=employee_db

▶️ Running the Project (Without Docker)
npm install
npm run start:dev


Server will run on:

http://localhost:3000

🐳 Running the Project (With Docker)

Build and start containers:

docker-compose up --build


API will be available at:

http://localhost:3000

📌 API Endpoints
Method	Endpoint	Description
POST	/employees	Create employee
GET	/employees	Get all employees
GET	/employees/:id	Get employee by ID
PUT	/employees/:id	Update employee
DELETE	/employees/:id	Delete employee
🧪 Sample Employee JSON
{
  "name": "Snehal Rathod",
  "email": "snehal@example.com",
  "designation": "Software Developer",
  "salary": 50000
}

🔄 Git Workflow
git status
git add .
git commit -m "Added employee CRUD with PostgreSQL"
git push origin main

🚀 Future Enhancements

Authentication & Authorization (JWT)

Pagination & Filtering

Input validation using DTOs

Swagger API documentation

Role-based access control
