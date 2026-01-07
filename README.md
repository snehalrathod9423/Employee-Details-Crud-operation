🧑‍💼 Employee Details CRUD – Extended Implementation
📌 Overview

This project is a NestJS + TypeORM + PostgreSQL based backend application that performs CRUD operations on Employee data.

It supports related tables (employee_address, employee_bankdetails) and handles single-payload inserts into multiple tables using TypeORM relations and cascading.

The project is further enhanced with JWT authentication, role-based access, email notifications, login security policies, rate limiting, PDF generation, and CSV export.

🛠 Tech Stack

Backend Framework: NestJS

Language: TypeScript

ORM: TypeORM

Database: PostgreSQL (SQLite supported for local testing)

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

users

login_logs

Relationships

One Employee → One Address

One Employee → One Bank Details

All relations are implemented using One-to-One mapping with foreign key (employee_id).

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

🔐 Authentication & Security Enhancements (New)
✅ JWT Authentication

SignUp & SignIn APIs implemented

Token expiry set to 5 minutes

Passwords stored using bcrypt hashing

✅ Password Policy Enforcement

Failed login attempts are tracked

Account is locked after 5 consecutive failed logins

Lock duration is 15 minutes

Account is automatically unlocked after lock time

✅ Login Attempt Tracking

Both successful and failed login attempts are logged

Failed attempts increment counter

Successful login resets failed attempt count

📧 Email Notifications Using Handlebars (New)

Email system implemented using Nodemailer + Handlebars templates.

Supported Email Scenarios:

Welcome Email – Sent when a new employee is added

Account Locked Notification – Sent when login attempts exceed limit

Account Activated Notification – Sent when locked account becomes active again

Email templates are maintained using .hbs files for better readability and reuse.

👥 Employee Listing With Filters (New)
Features:

Pagination support

Search and filter by:

Name

Email

Role

Implemented using TypeORM QueryBuilder.

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

Inserts data into:

employee

employee_address

employee_bankdetails

Uses TypeORM cascade for persistence

📤 Fetch Employee With Full Details

Endpoint
GET /employees/{id}/with-details

Headers

role: ADMIN

📄 Generate Employee PDF

Endpoint
GET /employees/pdf/{id}

Headers

role: ADMIN


Description

Generates downloadable PDF

Includes employee, address, and bank details

Uses pdfkit

📊 Export Employees as CSV

Endpoint
GET /employees/export/csv

Headers

role: ADMIN


Description

Exports all employee data into CSV

Uses json2csv

🔐 Environment Configuration

Create a .env file:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=employee_db
JWT_SECRET=your_secret
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
PORT=3000

▶️ Running the Application
npm install
npm run start:dev


Server runs at:

http://localhost:3000

🧠 Key Design Decisions

UUID used for scalability

Cascade inserts to avoid manual multi-table operations

JWT-based auth instead of session-based

Handlebars used for reusable email templates

Rate limiting applied globally

Clean separation between controller and service layers

📌 Notes

synchronize: true enabled only for development

For production, migrations should be used

Role header is mandatory for protected APIs

Passwords are never stored in plain text

🏁 Conclusion

This project demonstrates a real-world NestJS backend implementation covering:

Secure authentication

Account security policies

Email automation

Multi-table database operations

Pagination & filtering

PDF and CSV generation
