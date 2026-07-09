<div align="center">

# 💊 SafeDose

**A full-stack medicine expiry tracker that helps you know what's safe, what's expiring, and what to throw out.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://vercel.com/)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://render.com/)

[Live Demo](#-live-demo) · [Features](#-key-features) · [Setup](#-installation--setup) · [API](#-api-overview)

</div>

---

## 📖 Overview

SafeDose is a MERN-stack web application for tracking medicine inventory and expiry dates. Users can register, add medicines with dosage and expiry details, and instantly see which ones are safe, expiring soon, or already expired — with automatic alerts, search/filter, calendar visualization, and exportable reports.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure register/login with JWT tokens and bcrypt-hashed passwords |
| 💊 **Medicine CRUD** | Add, edit, and delete medicines with dosage, quantity, unit, expiry date, and manufacturer |
| 🎯 **Auto Status Tracking** | Every medicine is automatically categorized as **Safe**, **Expiring Soon**, or **Expired** based on its date |
| ⚠️ **Expiry Alert Banner** | Dashboard surfaces a summary alert when medicines need attention |
| 📊 **Stat Cards** | At-a-glance counts of total, safe, expiring, and expired medicines |
| 🔍 **Search & Filter** | Instantly search by name/dosage/manufacturer and filter by status |
| 📅 **Calendar View** | Visual monthly calendar highlighting upcoming expiry dates |
| 📄 **Export Reports** | Download your medicine list as **CSV** or **PDF** |
| 📱 **Barcode Scanner** | Scan, upload, or manually enter a barcode when adding a medicine |
| 👤 **Profile Page** | View account details, phone, and notification status, with a time-based greeting |
| 🔔 **Push Notifications** | Opt-in browser notification support |
| ☁️ **Cloud Deployed** | Fully live on Vercel (frontend), Render (backend), and MongoDB Atlas (database) |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + React Router
- Context API (theme/dark mode)
- jsPDF (PDF export)
- Quagga (barcode scanning)

**Backend**
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

**Deployment**
- Vercel — frontend hosting, auto-deploys on push
- Render — backend hosting, auto-deploys on push
- MongoDB Atlas — cloud database

---




## 📸 Screenshots
Login
<img width="1920" height="1080" alt="Screenshot 2026-07-09 192203" src="https://github.com/user-attachments/assets/cada662d-3334-4260-a526-6f71b9dc34c6" />

Dashboard 
<img width="1920" height="1080" alt="Screenshot 2026-07-09 185643" src="https://github.com/user-attachments/assets/804f352b-d5df-4d7e-a16c-1e3dd0510ec7" />

Add Medicine 
<img width="1920" height="1080" alt="Screenshot 2026-07-09 191917" src="https://github.com/user-attachments/assets/2d77c18c-ffdc-4408-949f-d3e025869fcf" />

Barcode Scanner
<img width="1920" height="1080" alt="Screenshot 2026-07-09 192000" src="https://github.com/user-attachments/assets/3977d53d-6b86-4cc6-a1d1-7193ac4955ba" />

|Profile 
<img width="1920" height="1080" alt="Screenshot 2026-07-09 192123" src="https://github.com/user-attachments/assets/d5aa4f52-494f-4839-a623-8e14c9e4ddac" />


---

## 🌐 Live Demo
https://safedose-amber.vercel.app/

## 🚀 Installation & Setup

### Prerequisites
- Node.js installed
- A MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone https://github.com/Ananya545/safedose.git
cd safedose
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
node server.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

Update `frontend/src/config.js` with your backend URL:
```javascript
export const API_URL = 'http://localhost:5001'; // or your deployed backend URL
```

The app runs at `http://localhost:3000`.

---

## 🔑 Environment Variables

| Variable | Description | Where |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | Backend |
| `PORT` | Port the backend server runs on | Backend |
| `JWT_SECRET` | Secret key used to sign login tokens | Backend |

---

## 📁 Folder Structure

```
safedose/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── Dashboard.jsx
│       │   ├── AddMedicine.jsx
│       │   ├── EditMedicine.jsx
│       │   ├── ProfilePage.jsx
│       │   ├── CalendarView.jsx
│       │   └── BarcodeScanner.jsx
│       ├── config.js            # API base URL
│       ├── ThemeContext.js      # Dark mode context
│       ├── usePushNotifications.js
│       └── App.js               # Routing
│
└── backend/
    ├── models/
    │   ├── User.js
    │   └── Medicine.js
    ├── controllers/
    │   └── authController.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── medicineRoutes.js
    ├── middleware/
    │   └── auth.js
    └── server.js
```

---

## 🔌 API Overview

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/auth/profile` | Get the logged-in user's profile *(protected)* |

**Medicines**
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/medicines` | Get all medicines for the logged-in user *(protected)* |
| POST | `/api/medicines` | Add a new medicine *(protected)* |
| PUT | `/api/medicines/:id` | Update a medicine *(protected)* |
| DELETE | `/api/medicines/:id` | Delete a medicine *(protected)* |

All protected routes require a `Authorization: Bearer <token>` header.

---

## 🔮 Future Enhancements

- 🌙 Full dark mode across every page
- 🖼️ Medicine photo upload
- 🕒 Recent activity feed
- 📧 Automated email/SMS expiry reminders
- 🏥 Barcode lookup against a real medicine database API

---

## 🧠 What I Learned

Built from scratch with no prior full-stack experience — covering React state management, REST API design, JWT authentication, MongoDB/Mongoose, and deploying a real production app across three separate cloud services (Vercel, Render, MongoDB Atlas), including debugging real-world issues like DNS resolution errors, environment variable security, and CI build strictness.

---

## 👤 Author

**Ananya Shukla**
[GitHub](https://github.com/Ananya545)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).











