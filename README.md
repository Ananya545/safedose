# 💊 SafeDose — Medicine Expiry Tracker

A full-stack MERN application to help users track their medicines and get alerted before they expire. Built as a hands-on learning project covering authentication, CRUD operations, cloud deployment, and real-world debugging.



---

## ✨ Features

- 🔐 **User Authentication** — Register and log in securely with hashed passwords and JWT tokens
- 💊 **Medicine Management** — Add, edit, and delete medicines with dosage, quantity, and expiry date
- 🔍 **Search & Filter** — Quickly find medicines by name, dosage, or manufacturer; filter by status
- ⚠️ **Automatic Expiry Alerts** — Dashboard banner highlights expired or soon-to-expire medicines
- 🎨 **Status Badges** — Color-coded indicators (Safe / Expiring Soon / Expired)
- 📱 **Barcode Scanning** — Scan or upload a barcode image to help identify medicines
- ☁️ **Cloud Deployed** — Frontend on Vercel, backend on Render, database on MongoDB Atlas

---

## 🛠️ Tech Stack

**Frontend:** React, React Router
**Backend:** Node.js, Express.js
**Database:** MongoDB (Atlas)
**Auth:** JWT (JSON Web Tokens), bcrypt for password hashing
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## 📁 Project Structure

```
safedose/
├── frontend/
│   └── src/
│       ├── pages/          # LoginPage, RegisterPage, Dashboard, AddMedicine, EditMedicine, BarcodeScanner
│       ├── config.js        # API base URL
│       └── App.js           # Routing
└── backend/
    ├── models/              # User, Medicine schemas
    ├── controllers/         # Auth logic
    ├── routes/              # API endpoints
    ├── middleware/          # JWT auth protection
    └── server.js            # Entry point
```

---

## 🚀 Running Locally

### Prerequisites
- Node.js installed
- A MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_secret_key
```

Run the backend:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app will run at `http://localhost:3000`, connecting to the backend at `http://localhost:5001`.

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Port for the backend server |
| `JWT_SECRET` | Secret key used to sign login tokens |

---

## 📸 Screenshots

*(Add screenshots of your Login page, Dashboard, and Add Medicine form here)*

---

## 🧠 What I Learned

This project was built from scratch with no prior full-stack experience. Along the way I learned:
- How frontend, backend, and database layers communicate
- JWT-based authentication
- Debugging real deployment issues (CORS, environment variables, DNS/network errors)
- Git & GitHub workflows, including handling an accidentally exposed secret
- Deploying a full MERN app to production (Vercel + Render + MongoDB Atlas)

A detailed write-up of the build process and errors encountered is available in [`SAFEDOSE_LEARNING_GUIDE.md`](./SAFEDOSE_LEARNING_GUIDE.md).

---

## 📄 License

This project is open source and available for learning purposes.

---

## 👤 Author

**Ananya Shukla**
[GitHub](https://github.com/Ananya545)
