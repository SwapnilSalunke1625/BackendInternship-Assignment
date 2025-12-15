# 📌 Backend Developer (Intern) – Assignment  
## Scalable REST API with Authentication & Role-Based Access

This project is built as part of the **Backend Developer Intern Assignment**.  
The focus is on **secure, scalable backend API development**, along with a **basic frontend UI** to demonstrate and test the APIs.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication (Access & Refresh Tokens)
- bcrypt (Password Hashing)
- Cookie-based Authentication
- CORS

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

---

root
│
├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── routes
│ │ ├── models
│ │ ├── middlewares
│ │ ├── utils
│ │ └── app.js
│ └── package.json
│
├── frontend
│ ├── src
│ │ ├── pages
│ │ ├── components
│ │ ├── api
│ │ ├── context
│ │ └── routes
│ └── package.json
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
🔧 Backend Setup
2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Create .env file (Backend)
PORT=9090
MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

4️⃣ Run Backend Server
npm run dev


Backend will run on:

http://localhost:9090

🎨 Frontend Setup
5️⃣ Install Frontend Dependencies
cd ../frontend
npm install

6️⃣ Create .env file (Frontend)
VITE_API_BASE_URL=http://localhost:9090/api

7️⃣ Run Frontend
npm run dev


Frontend will run on:

http://localhost:5173

🔐 Authentication & Authorization
Roles

ADMIN

USER

Authentication Flow

Passwords are securely hashed using bcrypt

JWT Access & Refresh tokens are generated

Tokens are stored in httpOnly cookies

Protected routes use JWT verification middleware

Admin routes are protected using role-based middleware

🧠 Core Functionalities
👤 User Features

User Registration

User Login

Secure Logout

Update Password

View Assigned Tasks

Complete Assigned Tasks

View Completed Tasks with Timestamp

🛠 Admin Features

Admin Dashboard

Create Tasks

Assign Tasks to Users

Update Tasks (Only PENDING tasks)

Delete Tasks

View All Users

Promote User to Admin

View Task Completion Status

📋 Task Management Logic

Admin assigns tasks to users

Task Status:

PENDING

COMPLETED

Only PENDING tasks are editable

When a user completes a task:

Status updates to COMPLETED

completedAt timestamp is saved

Admin can track which user completed which task

📊 Admin Dashboard Statistics

Total Users

Total Tasks Assigned

Pending Tasks Count

Completed Tasks Count

Users with Assigned Tasks

📑 API Design

REST-compliant APIs

Proper HTTP status codes

Centralized error handling

API versioning (/api/v1)

Clean and modular controller structure

🔒 Security Practices

JWT-based authentication

Refresh token rotation

Password hashing with bcrypt

Input validation & sanitization

Protected routes using middleware

Secure cookie configuration (Production ready)

⚡ Scalability & Architecture

Modular MVC architecture

Easy to extend for:

Redis caching

Docker containers

Microservices

Load balancing with NGINX

Frontend and backend deployed independently

🌍 Deployment
Backend

Hosted on Render

Production-ready CORS configuration

Secure cookie-based authentication

Frontend

Hosted on Vercel

Connected to production backend APIs

✅ Assignment Completion Summary

✔ Authentication & Authorization
✔ Role-Based Access Control
✔ CRUD APIs
✔ Secure JWT Handling
✔ Database Design
✔ Functional Frontend
✔ Production Deployment
✔ Scalable Architecture

## 📂 Project Structure

