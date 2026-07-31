# 🏥 Medhin Primary Hospital — Full Stack Project

Complete project package including:
- **Frontend** — Next.js 16 + TypeScript + Tailwind + Mantine UI + Redux Toolkit
- **Backend** — NestJS + PostgreSQL + TypeORM + JWT Auth + Swagger
- **Smart Website** — Standalone HTML (no setup needed, works in any browser)

---

## 📁 Project Structure

```
medhin-full-package/
├── frontend/          ← Next.js frontend (port 3000)
├── backend/           ← NestJS backend API (port 3003)
├── smart-website/     ← Standalone HTML file (open directly in browser)
└── README.md
```

---

## 🚀 Quick Start

### Option A — Smart Website (No Setup)
Just open `smart-website/medhin-hospital-complete.html` in any browser.
Works offline with full demo data. Connects to backend automatically if running.

---

### Option B — Full Stack (Frontend + Backend)

#### 1. Setup Backend (NestJS API)

```bash
cd backend
npm install

# Create PostgreSQL database
# (Install PostgreSQL if not installed)
createdb web_business

# Configure environment
cp .env.example .env
# Edit .env with your DB credentials:
#   DB_HOST=localhost
#   DB_PORT=5432
#   DB_USERNAME=postgres
#   DB_PASSWORD=your_password
#   DB_DATABASE=web_business
#   JWT_SECRET=your-secret-key
#   JWT_EXPIRATION=1d

# Start backend
npm run start:dev
# API runs at: http://localhost:3003
# Swagger docs: http://localhost:3003/api
```

#### 2. Create Admin User

```bash
# After backend starts, register admin via Swagger at http://localhost:3003/api
# POST /auth/register  { "username": "admin", "password": "admin123" }
# Or use curl:
curl -X POST http://localhost:3003/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

#### 3. Setup Frontend (Next.js)

```bash
cd frontend
npm install
# or: pnpm install

# .env already set to point to backend:
# NEXT_PUBLIC_API_URL=http://localhost:3003

npm run dev
# Frontend runs at: http://localhost:3000
```

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /auth/register | No | Register admin |
| POST | /auth/login | No | Login → JWT |
| GET | /physicians | No | List active physicians |
| POST | /physicians | JWT | Add physician |
| PUT | /physicians/:id | JWT | Update physician |
| DELETE | /physicians/:id | JWT | Delete physician |
| GET | /news | No | List active news |
| POST | /news | JWT | Add news article |
| PUT | /news/:id | JWT | Update news |
| DELETE | /news/:id | JWT | Delete news |
| GET | /departments | No | List departments |
| POST | /departments | JWT | Add department |
| GET | /services | No | List services |
| POST | /services | JWT | Add service |
| GET | /vacancies | No | List vacancies |
| POST | /vacancies | JWT | Add vacancy |
| GET | /gallery | No | List gallery |
| POST | /gallery | JWT | Add gallery item |
| GET | /social | No | List social links |
| POST | /upload | No | Upload file |
| GET | /health | No | Health check |

Full interactive docs: **http://localhost:3003/api** (Swagger UI)

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Mantine UI v8
- Redux Toolkit + RTK Query
- Framer Motion
- next-intl (English & Amharic)

### Backend
- NestJS v11
- PostgreSQL + TypeORM
- JWT Authentication (Passport.js)
- Swagger / OpenAPI
- Multer (file uploads)
- bcrypt (password hashing)
- Class-validator

---

## 🌍 Bilingual Support
The app supports English and Amharic (አማርኛ). Toggle with the language button in the navbar.

## 📞 Hospital Info
- **Location:** Near North Wollo High Court, Woldia, Ethiopia
- **Phone:** +251 900 000 000
- **Hours:** Mon–Sat 8AM–6PM · Emergency 24/7

"# medhinHospitalui" 
