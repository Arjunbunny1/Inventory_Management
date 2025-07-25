#  Inventory Management System API

A modern, full-stack Inventory Management System with a beautiful React frontend and secure Node.js backend. Features user authentication with JWT, complete CRUD operations, real-time statistics, and a responsive UI with glass-morphism design effects.

---

##  Features

- User Registration & Login with JWT Authentication
- User-specific inventory access (multi-user support)
- CRUD operations on products
- Pagination 
- Modern responsive UI with glass-morphism design
- Real-time inventory statistics
- Swagger UI for API docs
- Postman collection for testing
- Secure route protection

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](public/images/Screenshot%202025-07-25%20172856.png)
*Modern hero section with gradient background and feature highlights*

### 🔐 User Authentication
![Login Page](public/images/Screenshot%202025-07-25%20172909.png)
*Professional login interface with glass-morphism effects*

![Register Page](public/images/Screenshot%202025-07-25%20172923.png)
*User registration with real-time validation*

### 📊 Dashboard
![Dashboard](public/images/Screenshot%202025-07-25%20172952.png)
*Comprehensive inventory overview with statistics and product management*

### ➕ Product Management
![Add Product](public/images/Screenshot%202025-07-25%20173007.png)
*Modern form for adding new products to inventory*

![Update Product](public/images/Screenshot%202025-07-25%20173028.png)
*Intuitive quantity management with increment/decrement controls*

---

## 💻 Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with glass-morphism effects
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose ODM** - Object modeling for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

### Development Tools
- **Swagger** - API documentation
- **Postman** - API testing
- **Git** - Version control

---

## 📁 Project Structure

```
Inventory_Management/
├── Backend (Node.js/Express)
│   ├── controllers/           # Business logic
│   ├── middleware/           # Authentication middleware
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── config/              # Database configuration
│   └── app.js               # Server entry point
│
├── Frontend (React)
│   └── inventory-frontend/client/
│       ├── public/          # Static assets
│       ├── src/
│       │   ├── components/  # Reusable components
│       │   ├── pages/       # Page components
│       │   └── App.js       # Main App component
│       └── package.json
│
├── Documentation
│   └── docs/
│       ├── Product testing.postman_collection.json
│       └── User_testing.postman_collection.json
│
├── 📄 Configuration
│   ├── .env                 # Environment variables
│   ├── package.json         # Backend dependencies
│   └── README.md           # Project documentation
```


---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** 

### 🛠️ Installation & Setup

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Arjunbunny1/Inventory_Management.git
cd Inventory_Management
```

#### 2️⃣ Backend Setup
```bash
# Install backend dependencies
npm install

# Create .env file in root directory
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

#### 3️⃣ Frontend Setup
```bash
# Navigate to frontend directory
cd inventory-frontend/client

# Install frontend dependencies
npm install
```

#### 4️⃣ Run the Application
```bash
# Terminal 1: Start Backend Server (from root directory)
npm start

# Terminal 2: Start Frontend Server (from inventory-frontend/client)
npm start
```

#### 5️⃣ Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api-docs

---

##  📚 API Documentation

### Swagger (OpenAPI)
Interactive API documentation is available once the server is running:
```
http://localhost:8000/api-docs
```

### 🧪 Postman Collections
Test the APIs using the provided Postman collections:

- **User Authentication Collection** - Registration, login, and user management
- **Product CRUD Collection** - Complete product management operations

**How to use:**
1. Open Postman
2. Import the `.json` files from the `docs/` directory
3. Add your JWT token in the Authorization headers
4. Start testing!

---

## 🔐 Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication:

- **Registration**: Create a new user account
- **Login**: Authenticate and receive a JWT token
- **Protected Routes**: All product operations require authentication
- **User-Specific Data**: Each user can only access their own products

---


## Use of AI in This Project

In the frontend, I used AI to assist in creating React components and setting up pages like Login, Register, Dashboard, and Add Product. It helped me save time and understand how to structure things properly.

For the backend, the core logic and implementation were done by me. I mainly relied on my own understanding, and only used AI occasionally—for example, when I was stuck on an error or needed guidance on how to write something in a better way.



