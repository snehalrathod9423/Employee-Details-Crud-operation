🧑‍💼 Employee Details CRUD – Extended Implementation
📌 Overview

This project is a backend application built using NestJS, TypeORM, and PostgreSQL to perform CRUD operations on Employee data.

It supports relational data handling with multiple tables (employee, employee_address, employee_bankdetails) and allows inserting data into multiple tables using a single payload through TypeORM cascading.

The project has been further enhanced with JWT-based authentication, role-based access control, email notifications, rate limiting, PDF generation, and CSV export features.

🛠 Tech Stack

Backend Framework: NestJS

Language: TypeScript

ORM: TypeORM

Database: PostgreSQL (SQLite supported for local testing)

Authentication: JWT

Validation: Joi

Email: Nodemailer + Handlebars

API Style: REST

Tools: Postman, pgAdmin

🗄 Database Design
Tables

employee

employee_address

employee_bankdetails

users

Relationships

One Employee → One Address

One Employee → One Bank Details

All relationships are implemented using One-to-One mapping with foreign key references.

🧩 Entity Relationship (Conceptual)
employee
 ├── employee_address
 └── employee_bankdetails

🚀 Features Implemented
🔐 Authentication & Authorization (New)

User SignUp and SignIn using JWT authentication

JWT token expiry set to 5 minutes

Password hashing using bcrypt

Protected APIs using JWT guards

Role-Based Access Control (RBAC)

Only Admin users can add employees

👤 User APIs

SignUp

Validates name, email, password, mobile number, and role (Admin, Manager)

Checks if email already exists

Stores encrypted password

SignIn

Validates credentials

Returns JWT token with expiry

getUserDetails

Fetches logged-in user details using token authentication

👨‍💼 Employee Management

Create employee

Update employee

Delete employee

Pagination and search support

Create employee with address & bank details using a single payload

Fetch employee along with all related details

Auto-generate password for newly added employees (Admin only)

Securely store generated passwords using bcrypt

📥 Create Employee With Full Details

Endpoint

POST /employees/with-details


Headers

Authorization: Bearer <JWT_TOKEN>
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

Uses TypeORM cascade to persist related entities

📤 Fetch Employee With Full Details

Endpoint

GET /employees/{id}/with-details


Headers

Authorization: Bearer <JWT_TOKEN>

📧 Email Notification (New)

Integrated Nodemailer with Gmail SMTP

Used Handlebars templates for dynamic HTML emails

Automatically sends welcome email with login credentials

Credentials are shared in table format

Email is triggered when an Admin adds a new employee

📄 Generate Employee PDF

Endpoint

GET /employees/pdf/{id}


Description

Generates a downloadable PDF containing:

Employee details

Address details

Bank details

Implemented using pdfkit

📊 Export Employees as CSV

Endpoint

GET /employees/export/csv


Description
Final exports all employee records into a CSV file using json2csv.

🚦 Rate Limiting

Implemented using NestJS Throttler

Limits requests to:

10 requests per minute per client

Prevents API abuse

🔐 Environment Configuration

Create a .env file in the root directory:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_db_password
DB_NAME=employee_db

JWT_SECRET=your_jwt_secret

MAIL_USER=yourgmail@gmail.com
MAIL_PASS=your_gmail_app_password

PORT=3000

▶️ Running the Application

Install dependencies:

npm install


Start the server:

npm run start:dev


Server will run at:

http://localhost:3000

🧠 Key Design Decisions

UUID used as primary key for scalability

Cascade inserts used to simplify multi-table operations

JWT used for secure authentication

Role-based access control enforced at API level

Rate limiting applied globally

Services handle business logic, controllers handle routing

📌 Notes

synchronize: true is enabled only for development

For production, migrations should be used

Role-based access and JWT token are mandatory for protected APIs

🏁 Conclusion

This project demonstrates a complete real-world NestJS backend implementation including:

Secure authentication and authorization

Relational database handling

Role-based employee management

Email automation

Rate limiting

PDF and CSV exports

📂 Repository

https://github.com/snehalrathod9423/Employee-Details-Crud-operation.git
