# Premium MERN Stack Authentication System

A secure, production-grade authentication system built with a clean SaaS-style purple & white theme. Features end-to-end user state management, JWT session cookies, 2FA email OTP verification, password strength metrics, live validation rules, and role-based access control.

---

## Key Features

### Backend API
- **JWT Authentication**: Secure tokens stored in HTTP-Only, Secure cookies to prevent XSS attacks.
- **Double-Token Security**: Short-lived Access Tokens (15m) paired with long-lived Refresh Tokens (7d).
- **Email Verification**: Auto-generates and dispatches 6-digit verification OTP codes via SMTP.
- **Password Hashing**: Uses `bcrypt` for secure server hashing with customizable salt rounds.
- **Session Management**: Session checks, active token rotation, and cookie clear handlers.

### Frontend UI
- **Modern Theme**: Clean, responsive layout with glassmorphic cards, Outfit typography, and dynamic animations.
- **Verify Email (2FA Screen)**: Center-aligned multi-box entries, keyboard focus-shifting, and a 60-second countdown timer.
- **Active Password Assessment**: Visual strength segment bars and real-time password requirements checklists.
- **Sleek Alerts & States**: Color-coded inline banners representing loading spinners, validation warnings, and expired credentials.
- **State Management**: Redux Toolkit slices managing central auth states and user credentials.

---

## Directory Structure

```text
3_Authentication_system/
├── backend/
│   ├── src/                  # Server routing, controllers, models, and middlewares
│   ├── server.js             # Server startup entry point
│   ├── .env.example          # Generic template for server credentials
│   └── package.json
├── frontend/
│   ├── src/                  # React components, pages, hooks, slices, and layouts
│   ├── index.html            # Core template and Google Font assets
│   ├── .env.example          # API endpoint configurations template
│   └── package.json
├── .gitignore                # Global workspace git filter rules
└── README.md                 # Project developer guide
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Instance (Atlas or Local)

### 1. Server Configuration
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Set your MongoDB URI and SMTP credentials inside `.env`.
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Client Configuration
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the Vite app:
   ```bash
   npm run dev
   ```

---

## API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **POST** | `/api/auth/register` | Register a new user and dispatch OTP code | No |
| **POST** | `/api/auth/verify-email` | Validate account using 6-digit OTP code | No |
| **POST** | `/api/auth/login` | Authenticate credentials and set session cookies | No |
| **POST** | `/api/auth/logout` | Clear HTTP-only auth cookies and kill session | Yes |
| **GET** | `/api/auth/me` | Fetch active user credentials from session | Yes |
| **POST** | `/api/auth/forgot-password` | Dispatches reset OTP code to registered email | No |
| **POST** | `/api/auth/reset-password` | Validate OTP and write a new account password | No |
| **PATCH** | `/api/auth/update-profile` | Update username / profile metadata | Yes |
| **PATCH** | `/api/auth/change-password` | Verify current password and write a new one | Yes |
