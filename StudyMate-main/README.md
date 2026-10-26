# 🎓 StudyMate — Student Task & Study Management System
### A Production-Grade Full-Stack MERN + AI Application for Junior Engineering Students

Welcome to **StudyMate**, a production-quality, full-stack Student Task & Study Management System. 

This repository serves as a live project-based learning demonstration for junior engineering students participating in the workshop:  
**"Project Building with AI Tools: From Idea to Deployment"**

---

## 📌 Project Purpose & Problem Statement

Engineering students face constant challenges managing:
- Multiple course subjects and assignment deadlines
- Exam schedules and daily study time allocation
- Complex academic concepts requiring simple, real-world explanations

**StudyMate** solves this problem by providing a centralized productivity hub with task tracking, subject progress metrics, timetable scheduling, and **LLM AI-powered study assistance**.

---

## 🚀 Key Features

### 1. Student Authentication & Security
- Register & Login with secure password hashing (`bcryptjs`)
- Stateless session management via JSON Web Tokens (`JWT`)
- Complete data isolation — each student accesses *only* their own tasks and subjects

### 2. Task Management
- Create, view, edit, delete, and mark tasks as completed
- Categorize by subject, set priority levels (`Low`, `Medium`, `High`), and set deadlines
- Filter by status, priority, or subject; search by keywords; sort by deadline or title

### 3. Subject & Course Management
- Create custom subjects with personalized color tags
- Monitor task completion progress percentages per course

### 4. Study Session Timetable
- Schedule focus blocks specifying subject, topic, date, start time, and end time
- Timeline layout to organize daily study routines

### 5. AI Study Planner (LLM Powered)
- Input subjects, upcoming exam dates, and daily available study hours
- Backend proxies calls to LLM (Google Gemini API) to generate a prioritized multi-day study schedule

### 6. AI Topic Explainer (LLM Powered)
- Ask AI to explain any difficult academic concept (e.g. *"Normalization in DBMS"*)
- Returns a beginner-friendly response formatted with:
  - Simple explanation
  - Real-world analogy
  - Practical code/concept example
  - Key takeaways
  - 1-sentence summary

---

## 🏗 Architecture & Tech Stack

```
                                  STUDYMATE ARCHITECTURE
                                  ======================

[ React Frontend (Vite) ] ── (Port 5173) ──► Axios Client (VITE_API_URL)
                                                    │
                                                    │ Authorization: Bearer <JWT_TOKEN>
                                                    ▼
[ Express Backend Server ] ── (Port 5000) ──► Node.js Controllers & Middleware
                                                    │
                         ┌──────────────────────────┴──────────────────────────┐
                         ▼                                                     ▼
           [ MongoDB Atlas Cloud Database ]                          [ Google Gemini LLM API ]
           Users, Subjects, Tasks, Sessions                          Secured via backend LLM_API_KEY
```

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), JavaScript (ES6+), Vanilla CSS (Design Tokens), React Router v6 |
| **Backend** | Node.js, Express.js REST API |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Authentication** | JWT, bcryptjs |
| **AI Integration** | Google Gemini REST API (Server Proxy) |
| **Dev Tools** | Vite, npm, Git, GitHub |

---

## 📂 Project Structure

```
StudyMate/
├── frontend/                     # React Single Page Application (Vite)
│   ├── public/                   # Static public assets
│   ├── src/
│   │   ├── assets/               # CSS & graphics
│   │   ├── components/           # Reusable UI components (Navbar, Sidebar, Cards, Forms, Modals)
│   │   ├── pages/                # Landing, Auth, Dashboard, Tasks, Subjects, Schedule, AI tools, Profile
│   │   ├── layouts/              # MainLayout shell
│   │   ├── services/             # Axios API client modules
│   │   ├── context/              # AuthContext global state
│   │   ├── hooks/                # Custom hooks (useAuth)
│   │   ├── App.jsx               # React Router configurations
│   │   ├── main.jsx              # App entry point
│   │   └── index.css             # Design tokens & global CSS
│   ├── .env                      # VITE_API_URL=http://localhost:5000/api
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express REST API Server
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas Mongoose connection
│   ├── controllers/              # Business logic (auth, task, subject, schedule, dashboard, ai)
│   ├── models/                   # Schemas (User, Task, Subject, StudySession)
│   ├── routes/                   # Express routes (/api/auth, /api/tasks, etc.)
│   ├── middleware/               # Auth protection & error handling
│   ├── services/                 # AI service proxy to Google Gemini API
│   ├── .env                      # Server PORT, MONGODB_URI, JWT_SECRET, LLM_API_KEY, CLIENT_URL
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Server entry point
│
└── README.md
```

---

## 📡 REST API Endpoint Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register new student account | No |
| `POST` | `/api/auth/login` | Authenticate student & receive JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/tasks` | Get user tasks (with search, filter, sort) | Yes |
| `POST` | `/api/tasks` | Create new task | Yes |
| `PUT` | `/api/tasks/:id` | Update task or toggle completion | Yes |
| `DELETE` | `/api/tasks/:id` | Delete task | Yes |
| `GET` | `/api/subjects` | Get subjects with task progress metrics | Yes |
| `POST` | `/api/subjects` | Add new subject | Yes |
| `PUT` | `/api/subjects/:id` | Edit subject | Yes |
| `DELETE` | `/api/subjects/:id` | Remove subject & related tasks | Yes |
| `GET` | `/api/study-sessions` | Get scheduled study sessions | Yes |
| `POST` | `/api/study-sessions` | Create study session | Yes |
| `DELETE` | `/api/study-sessions/:id`| Remove study session | Yes |
| `GET` | `/api/dashboard` | Fetch aggregated metrics & summary | Yes |
| `POST` | `/api/ai/study-plan` | Generate AI study timetable | Yes |
| `POST` | `/api/ai/explain` | Generate AI topic explanation | Yes |

---

## 🛠 Setup & Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Free MongoDB Atlas account (for cloud database URI)

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
LLM_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend dev server:
```bash
npm run dev
```
Backend will run at: `http://localhost:5000`

### 2. Frontend Setup (in a separate terminal)
```bash
cd frontend
npm install --legacy-peer-deps
```

Create a `.env` file inside `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:
```bash
npm run dev
```
Frontend will run at: `http://localhost:5173`

---

## 🌐 Deployment Architecture

When deploying to production:
- **Frontend** can be hosted on Vercel or Netlify. Set `VITE_API_URL=https://your-backend.onrender.com/api` in Vercel environment variables.
- **Backend** can be hosted on Render or Railway. Set `CLIENT_URL=https://your-frontend.vercel.app`, `MONGODB_URI`, `JWT_SECRET`, and `LLM_API_KEY` in Render environment variables.

---

## 💡 AI-Assisted Development Principle

In this workshop, students learn to build applications with AI using a controlled engineering workflow:

```
Understand Goal ──► Plan Architecture ──► AI Code Assistance ──► Code Review ──► Test & Debug ──► Deploy
```

> **Developer Control Rule:** Never blindly copy and paste AI outputs. Always inspect, understand, test, and refine generated code!
#   S t u d y M a t e  
 