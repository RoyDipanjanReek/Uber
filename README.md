# 🚕 Ride-Hailing Backend System (Node.js + Express + MongoDB)

A production-ready backend clone of Uber built using **Node.js**, **Express**, and **MongoDB**.  
This project focuses on clean architecture, scalability, and real-world backend practices such as authentication, role-based users (Captain & User), ride management, map services, and request validation.

---

## 📌 Features

### 👤 User Module
- User registration & login
- JWT-based authentication
- Token blacklisting for logout
- Secure password hashing
- Profile management

### 🚗 Captain Module
- Captain registration & login
- Online / offline availability status
- Vehicle details management
- Role-based access control

### 🛺 Ride Module
- Create ride requests
- Assign captains to rides
- Ride status updates (requested, accepted, ongoing, completed)
- Fare estimation logic

### 🗺️ Map Module
- Location-based distance calculation
- Estimated time & fare calculation
- Coordinates handling (latitude & longitude)

### 🔐 Security & Validation
- Express Validator for request validation
- JWT authentication middleware
- Blacklist token model to invalidate JWTs
- Centralized error handling

---

## 🧱 Tech Stack

| Technology | Usage |
|----------|------|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Express Validator | Input validation |
| dotenv | Environment variables |

---

## 📁 Project Structure

```bash
src/
├── controllers/
│   ├── user.controller.js
│   ├── captain.controller.js
│   ├── ride.controller.js
│   └── map.controller.js
│
├── models/
│   ├── user.model.js
│   ├── captain.model.js
│   ├── ride.model.js
│   └── blacklistToken.model.js
│
├── routes/
│   ├── user.routes.js
│   ├── captain.routes.js
│   ├── ride.routes.js
│   └── map.routes.js
│
├── services/
│   ├── user.service.js
│   ├── captain.service.js
│   ├── ride.service.js
│   └── map.service.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── validators/
│   ├── user.validator.js
│   ├── captain.validator.js
│   └── ride.validator.js
│
├── config/
│   └── db.js
│
├── app.js
└── server.js
```
## 🔐 Authentication Flow

1. User or Captain logs in with valid credentials
2. Server generates a JWT (JSON Web Token)
3. Token is stored on the client side (HTTP-only cookie or local storage)
4. Protected routes verify JWT via middleware
5. On logout, the token is added to a blacklist
6. Any request using a blacklisted token is rejected

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/uber-clone
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```
