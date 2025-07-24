#  Inventory Management System API

A simple and secure Inventory Management System backend built using **Node.js**, **Express**, and **MongoDB**. It includes user authentication with JWT, product CRUD functionality, pagination, and detailed API documentation using **Swagger** and **Postman**.

---

##  Features

- User Registration & Login with JWT Authentication
- User-specific inventory access (multi-user support)
- CRUD operations on products
- Pagination and filtering support
- Swagger UI for API docs
- Postman collection for testing
- Secure route protection

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **API Docs**: Swagger
- **Testing**: Postman

---

## Project Structure

├── controllers/

├── middleware/

├── models/

├── routes/

├── config/

├── docs/│
│ └── postman/
│ ├── user_auth_collection.json
│ └── product_crud_collection.json

├── app.js

├── .env

├── README.md

└── package.json


---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Arjunbunny1/Inventory_Management.git
cd inventory-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create .env File
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key


### 4.Start the Server
npm start

---
##  API Documentation
Swagger (OpenAPI)
Once the server is running, visit
```bash
http://localhost:8000/api-docs
```

## Postman Collections
Test your APIs using Postman:

User Auth Collection
Product CRUD Collection

To use:
Open Postman
Import the .json files
Add the JWT token in headers 

