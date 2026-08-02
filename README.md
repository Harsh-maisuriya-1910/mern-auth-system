# 🔐 MERN Authentication System

A production-ready authentication system built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The application implements secure user authentication using JWT, email verification with OTP, password recovery, and role-based authorization while following industry-standard architecture and best practices.

---

## 📖 Overview

This project demonstrates a complete authentication workflow used in modern web applications. It focuses on security, scalability, maintainability, and clean code organization using a modular architecture.

---

## ✨ Features

### 🔑 Authentication

* User Registration
* Secure Login & Logout
* JWT Access & Refresh Token Authentication
* HTTP-Only Cookie-Based Authentication
* Protected Routes
* Session Persistence

### 📧 Email Verification

* Email OTP Verification
* OTP Expiration Handling
* Resend Verification OTP

### 🔒 Password Management

* Forgot Password
* Reset Password using OTP
* Change Password
* Password Strength Validation

### 👤 User Management

* User Profile
* Update Profile Information
* Role-Based Authorization

### 🎨 Frontend

* Responsive UI
* Modern Authentication Screens
* Redux Toolkit State Management
* Form Validation
* Loading & Error States

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Nodemailer

### Development Tools

* Git & GitHub
* Postman
* dotenv

---

## 📂 Project Structure

```text
mern-auth-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Harsh-maisuriya-1910/mern-auth-system.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a **.env** file from **.env.example**

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a **.env** file from **.env.example**

```bash
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| POST   | `/api/auth/register`        | Register a new user     |
| POST   | `/api/auth/login`           | Login user              |
| POST   | `/api/auth/logout`          | Logout user             |
| GET    | `/api/auth/me`              | Get current user        |
| POST   | `/api/auth/verify-email`    | Verify email using OTP  |
| POST   | `/api/auth/forgot-password` | Send password reset OTP |
| POST   | `/api/auth/reset-password`  | Reset password          |
| PATCH  | `/api/auth/update-profile`  | Update user profile     |
| PATCH  | `/api/auth/change-password` | Change password         |

---

## 🔒 Security Features

* JWT Authentication
* Access & Refresh Tokens
* HTTP-Only Cookies
* Password Hashing with Bcrypt
* Email OTP Verification
* Secure Password Reset
* Input Validation
* Protected API Routes
* Error Handling Middleware

---

## 📸 Screenshots

Add screenshots of the application here.

```text
screenshots/
├── login.png
├── register.png
├── verify-email.png
├── forgot-password.png
└── dashboard.png
```

---

## 🚀 Future Improvements

* Google Authentication
* GitHub Authentication
* Two-Factor Authentication (2FA)
* Account Lock after Multiple Failed Attempts
* User Activity Logs
* Admin Dashboard
* Docker Deployment
* CI/CD Pipeline
* Unit & Integration Testing

---

## 📚 Learning Outcomes

This project demonstrates practical knowledge of:

* MERN Stack Development
* Authentication & Authorization
* REST API Development
* Redux Toolkit
* JWT & Cookies
* MongoDB & Mongoose
* MVC Architecture
* Email Integration
* Secure Coding Practices

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Harsh Maisuriya**

**Full Stack MERN Developer**

GitHub: **https://github.com/Harsh-maisuriya-1910**

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.
