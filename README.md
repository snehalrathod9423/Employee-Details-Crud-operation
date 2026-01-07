🧑‍💼 Employee Details CRUD – Extended Implementation
📌 Overview

This project is a backend application built using NestJS, TypeORM, and PostgreSQL to perform CRUD operations on Employee data.

It has been extended to support related tables (employee_address, employee_bankdetails) and handle single-payload inserts into multiple tables using TypeORM relations and cascading.

The project was further enhanced with authentication middleware, rate limiting, PDF generation, and CSV export features.

🛠 Tech Stack

Backend Framework: NestJS

Language: TypeScript

ORM: TypeORM

Database: PostgreSQL (SQLite supported for local testing)

Authentication: JWT

Validation: Joi

Email: Nodemailer + Handlebars

API Style: REST

Validation: Joi

Authentication: JWT

Email: Nodemailer + Handlebars

Tools: Postman, pgAdmin

🗄 Database Design
Tables

employee

employee_address

employee_bankdetails

Relationships

One Employee → One Address

One Employee → One Bank Details

All relationships are implemented using One-to-One mapping with foreign key references.

🧩 Entity Relationship (Conceptual)
employee
 ├── employee_address
 └── employee_bankdetails

🚀 Features Implemented
Core Features

✅ Create employee

✅ Update employee

✅ Delete employee

✅ Pagination & search

✅ Create employee with address & bank details (single payload)

✅ Fetch employee with all related details

✅ UUID-based primary keys

✅ PostgreSQL integration via environment variables

🔐 Security & System Enhancements (New)
✅ Role-Based Middleware

Simple role-based authentication using request headers

Supported roles:

ADMIN

HR

EMPLOYEE

Middleware validates role before request reaches controller

Example Header:

role: ADMIN

✅ Rate Limiting

Implemented using NestJS Throttler

Limits requests to:

10 requests per minute per client

Prevents API abuse

📥 Create Employee With Full Details

Endpoint

POST /employees/with-details


Headers
role: ADMIN
Content-Type: application/json


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

Accepts a single payload

Inserts data into employee, employee_address, and employee_bankdetails

Uses TypeORM cascade to persist related entities automatically

📤 Fetch Employee With Full Details

Endpoint

GET /employees/{id}/with-details


Headers
role: ADMIN

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

📄 Generate Employee PDF (New Feature)
Endpoint

GET /employees/pdf/{id}

Headers
role: ADMIN

Description

Generates a PDF file containing:

Employee basic details

Address details

Bank details

Implemented using pdfkit

📊 Export Employees as CSV

Endpoint

GET /employees/export/csv

Headers
role: ADMIN

Description
Final exports all employee records into a CSV file using json2csv.

🚦 Rate Limiting

Implemented using NestJS Throttler

Exports all employees into a CSV file

Uses json2csv

Useful for reporting and data sharing

🔐 Environment Configuration

Create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME=employee_db
PORT=3000

▶️ Running the Application
Install dependencies
npm install

Start the server
npm run start:dev


Server runs at:

http://localhost:3000

🧠 Key Design Decisions

UUID used for scalability

Cascade inserts to avoid manual multi-table operations

Cascade insert used to avoid manual multi-table saves

Middleware used instead of complex auth libraries (simple & clear)

Rate limiting applied globally

Controller handles response, service handles business logic

Relations fetched using TypeORM relations option

📌 Notes

synchronize: true enabled only for development

For production, migrations should be used

position and salary are nullable by design

Role header is mandatory for API access

🏁 Conclusion

This project demonstrates a real-world NestJS backend pattern, including:

Clean architecture

Account security policies

Single API → multiple table inserts

Role-based middleware

Pagination & filtering

PDF & CSV generation

PostgreSQL integration