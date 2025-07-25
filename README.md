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
- **frontend**: React, React Router DOM, Axios (for API calls),CSS / Inline styles

---

## Project Structure

├── controllers/

├── middleware/

├── models/

├── routes/

├── /inventory-frontend

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
cd Inventory_management
```

### 2. Install Dependencies(for server)
```bash
npm install
```

### 3. Create .env File
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key


### 4.Start the Server
```bash
npm start
```
### 5.Frontend
#### Prerequisites
---
- Node.js and npm installed

- Backend server running on `http://localhost:8000`
---

```bash
cd Inventory_management/inventory-frontend/client
```
---
#### Installing Dependcies
```bash
npm install
```

#### start Frontend server
```bash
npm start
```


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

## AI Assistance Disclosure
Frontend: AI was used to help create React components. It supported in building pages like Login, Register, Dashboard, and Add Product.
Backend: The backend was primarily written by me based on my own logic and implementation approach. AI was used occasionally—for resolving errors and understanding best practices.

