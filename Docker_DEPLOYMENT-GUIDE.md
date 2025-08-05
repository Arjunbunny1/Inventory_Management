# Inventory Management System - Deployment Guide for Docker


📌 **Please ensure your password is at least 8 characters long.**


## **Quick Start (For Others)**

To run this complete inventory management application on your machine:

### **Prerequisites:**
- Docker Desktop installed

### **One-Command Deployment:**

**Option 1: Download just docker-compose.yml (Recommended)**
1. **Download the docker-compose.yml file:**
   ```bash
   # Using wget (Linux/Mac)
   wget https://raw.githubusercontent.com/Arjunbunny1/Inventory_Management/main/docker-compose.yml
   
   # Using PowerShell (Windows)
   Invoke-WebRequest -Uri "https://raw.githubusercontent.com/Arjunbunny1/Inventory_Management/main/docker-compose.yml" -OutFile "docker-compose.yml"
   
   # Using curl (Windows/Linux/Mac)
   curl -o docker-compose.yml https://raw.githubusercontent.com/Arjunbunny1/Inventory_Management/main/docker-compose.yml
   
   # Or manually copy from GitHub and save as docker-compose.yml
   ```

2. **Run this single command:**
   ```bash
   docker-compose up -d
   ```

**Option 2: Clone entire repository (Alternative)**
```bash
git clone https://github.com/Arjunbunny1/Inventory_Management.git
cd Inventory_Management
docker-compose up -d
```

### ** Access Points:**
- **Frontend Application:** `http://localhost:3000`
- **Backend API:** `http://localhost:8000`
- **MongoDB Database:** `mongodb://localhost:27017`

---

## ** Docker Hub Images**

This application uses the following public Docker images:

- **Backend:** `arjun1303/inventory-backend:latest`
- **Frontend:** `arjun1303/inventory-frontend:latest`  
- **Database:** `mongo:latest` (official MongoDB image)

---

## ** Available Commands**

```bash
# Start all services
docker-compose up -d

# Stop all services  
docker-compose down

# View logs
docker-compose logs

# Restart services
docker-compose restart

# Stop and remove everything (including data)
docker-compose down -v
```

---

## ** Manual Setup (Alternative)**

If you prefer to run containers individually:

```bash
# 1. Start MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:latest

# 2. Start Backend (wait for MongoDB to start)
docker run -d --name backend -p 8000:8000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/inventory_db \
  arjun1303/inventory-backend:latest

# 3. Start Frontend
docker run -d --name frontend -p 3000:3000 \
  arjun1303/inventory-frontend:latest
```

---

## **🔧 For Developers**

### **Local Development:**
- Clone this repository
- Backend: Node.js/Express API (Port 8000)
- Frontend: React application (Port 3000)  
- Database: MongoDB (Port 27017)

### **Environment Variables:**
The backend uses these environment variables (already configured in docker-compose):
- `NODE_ENV=production`
- `PORT=8000`
- `MONGO_URI=mongodb://mongodb:27017/inventory_db`
- `JWT_SECRET=your_super_secret_jwt_key_change_this`

---


## ** Troubleshooting**

**Port conflicts?**
```bash
# Stop existing containers
docker-compose down

# Change ports in docker-compose.yml if needed
# Then restart
docker-compose up -d
```

**Need to see logs?**
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

**Start fresh?**
```bash
# Remove everything and start over
docker-compose down -v
docker-compose up -d
```

---

## **Support**
- Docker Hub: [arjun1303](https://hub.docker.com/u/arjun1303)

---

