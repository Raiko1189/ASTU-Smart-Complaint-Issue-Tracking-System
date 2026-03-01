# ASTU Smart Complaint & Issue Tracking System

![ASTU Smart Dashboard](./screenshot.png)

A world-class, premium full-stack university complaint tracking system built with React, Node.js, Express, MongoDB, and professional AI features. This application boasts a completely overhauled, high-end "glassmorphic" UI system and includes a **RAG (Retrieval-Augmented Generation)** chatbot for intelligent campus support.

![Stack](https://img.shields.io/badge/React-Vite-blue) ![Stack](https://img.shields.io/badge/Node.js-Express-green) ![Stack](https://img.shields.io/badge/MongoDB-Mongoose-darkgreen) ![Stack](https://img.shields.io/badge/TailwindCSS-Premium-teal) ![Stack](https://img.shields.io/badge/Google_Gemini-AI-orange) ![Stack](https://img.shields.io/badge/Pinecone-Vector_DB-black)

## ✨ Features

- **Premium Modern UI**: A sleek, high-contrast, responsive design employing glassmorphism (`backdrop-blur`), floating layouts, and smooth micro-animations. Comes with flawless Dark & Light mode integration.
- **Role-Based Portals**: Distinct, strictly separated UI experiences (including dashboard stats and capabilities) seamlessly routed for **Students**, **Staff**, and **Administrators**.
- **RAG-Powered AI Chatbot**: Intelligent chatbot integrating Google Gemini and Pinecone for accurate, context-aware answers to campus issues.
- **Knowledge Ingestion**: Admins can securely upload campus PDFs and handbooks to organically train the AI knowledge base.
- **Complaint Management**: Submit, track, and update campus issues with real-time status notifications.
- **Embedded Analytics**: Visual data dashboard utilizing Recharts for administrative decision-making.
- **Secure Authentication**: Robust session management with JWT + Refresh Tokens, alongside zero-friction Google OAuth via Passport.js.

## 🛠 Tech Stack

| Frontend | Backend | AI & Data |
|----------|---------|-----------|
| React.js (Vite) | Node.js + Express | **Google Gemini** (Embeddings/LLM) |
| TailwindCSS (Custom) | MongoDB + Mongoose | **Pinecone** (Vector Database) |
| TanStack React Query | Socket.io (Real-time) | Multer + PDF-Parse |
| Recharts | JWT + Passport.js | Nodemailer (Emails) |

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install # Root
npm run install:all # Installs dependencies for both Client & Server
```

### 2. Environment Variables
Create a `.env` file in the `server/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_ai_studio_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=your_pinecone_index_name
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
SMTP_USER=your_nodemailer_email
```

### 3. Database Seeding
Initializes default Admin and Staff accounts for immediate testing:
```bash
npm run seed
```
*Note: The default administrator is `admin@astu.edu.et` with password `Admin@123`.*

### 4. Running the Project
```bash
npm run dev
```
*Launches the Vite frontend on `http://localhost:5173` and the backend server on port `5000`.*

---
> **📸 Screenshot Note**: To display your live dashboard at the top of this README, simply take a screenshot of your application, name it exactly `screenshot.png`, and place it in the root folder alongside this `README.md` file!
