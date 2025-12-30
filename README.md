🧑‍💼 Employee Details CRUD – Extended Implementation
📌 Overview

This project is a NestJS + TypeORM + PostgreSQL based backend application that performs CRUD operations on Employee data.
It has been extended to support related tables (employee_address, employee_bankdetails) and handle single-payload inserts into multiple tables using TypeORM relations and cascading.

🛠 Tech Stack

Backend Framework: NestJS

Language: TypeScript

ORM: TypeORM

Database: PostgreSQL (SQLite supported for local testing)

API Style: REST

Tools: Postman, pgAdmin

🗄 Database Design
Tables

employee

employee_address

employee_bankdetails

Relationships

One Employee → One Address

One Employee → One Bank Details

All relations are implemented using One-to-One mapping with foreign key (employee_id).

🧩 Entity Relationship (Conceptual)
employee
 ├── employee_address
 └── employee_bankdetails

🚀 Features Implemented

✅ Create employee

✅ Update employee

✅ Delete employee

✅ Pagination & search

✅ Create employee with address & bank details (single payload)

✅ Fetch employee with all related details

✅ UUID-based primary keys

✅ PostgreSQL integration via environment variables

📥 Create Employee With Full Details (Main Feature)
Endpoint
POST /employees/with-details

Request Body
{
  "firstName": "Snehal",
  "lastName": "Rathod",
  "email": "snehalrathod@gmail.com",
  "position": "Backend Developer",
  "salary": 50000,
  "address": {
    "city": "Pune",
    "state": "MH",
    "pincode": "411001"
  },
  "bankDetails": {
    "bankName": "HDFC",
    "accountNumber": "123456789",
    "ifscCode": "HDFC000123"
  }
}

Description

Accepts single payload

Inserts data into:

employee

employee_address

employee_bankdetails

Uses TypeORM cascade to persist related entities automatically

📤 Fetch Employee With Full Details
Endpoint
GET /employees/{id}/with-details

Response
{
  "id": "uuid",
  "firstName": "Snehal",
  "lastName": "Rathod",
  "email": "snehalrathod@gmail.com",
  "position": "Backend Developer",
  "salary": 50000,
  "address": {
    "city": "Pune",
    "state": "MH",
    "pincode": "411001"
  },
  "bankDetails": {
    "bankName": "HDFC",
    "accountNumber": "123456789",
    "ifscCode": "HDFC000123"
  }
}

🔐 Environment Configuration

Create a .env file:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=employee_db
PORT=3000

▶️ Running the Application
Install dependencies
npm install

Start the server
npm run start:dev


Server will run at:

http://localhost:3000

🧠 Key Design Decisions

UUID used as primary key for scalability

Cascade insert used to avoid manual multi-table saves

DTO-based request validation for clean API contracts

Relations fetching using TypeORM relations option

📌 Notes

synchronize: true is enabled only for development

For production, migrations should be used

position and salary are nullable by design

🏁 Conclusion

This project demonstrates a real-world NestJS backend pattern, including:

Clean architecture

Relational database handling

Single API → multiple table inserts

PostgreSQL integration

It is suitable for internship assignments, interviews, and learning purposes.

