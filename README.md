# 🍔 PakBites - Modern Food Ordering Platform

PakBites is a production-level, full-stack (MERN) web application designed for a premium food ordering experience, similar to industry leaders like Pizza Hut or Hardee's. It features a sleek, responsive interface, robust administrative controls, and a secure checkout flow.

---

## 🚀 Project Overview

PakBites is built using the **MERN stack** (MongoDB, Express, React, Node.js) with a focus on high performance, secure authentication, and seamless user experience. It supports role-based access control, real-time email notifications, and cloud-based asset management.

### Key Highlights:
- **Dynamic Menu**: Real-time product browsing with category filtering and smart search.
- **Admin Command Center**: A comprehensive dashboard for managing the entire ecosystem.
- **Security First**: JWT-based authentication with HTTP-only cookies and OTP email verification.
- **Cloud Powered**: Product images are managed via Cloudinary for optimized delivery.

---

## 🛠️ Technology Stack

### Backend (Server-Side)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt for password hashing
- **File Management**: Multer & Multer-Storage-Cloudinary
- **Email Service**: Nodemailer (SMTP)
- **Security**: CORS, Cookie-Parser, and Environment Variable protection

### Frontend (Client-Side)
- **Build Tool**: Vite (Lightning-fast HMR)
- **Library**: React 19
- **Styling**: Tailwind CSS 4.0 (Modern, utility-first CSS)
- **Animations**: Framer Motion (Smooth transitions and micro-interactions)
- **Routing**: React Router DOM v7
- **Feedback**: React Toastify (Elegant notifications)
- **Icons**: React Icons (Lucide, FontAwesome, etc.)
- **SEO**: React Helmet (Meta tag management)

---

## 📦 Project Structure

```bash
pakbites/
├── pakbites-backend/        # Express Server & API logic
│   ├── src/
│   │   ├── Controllers/     # Request handlers
│   │   ├── Models/          # Mongoose Schemas
│   │   ├── Routes/          # API Endpoints
│   │   ├── Middlewares/     # Auth & Error filters
│   │   └── Utils/           # Cloudinary, JWT, Nodemailer configs
│   ├── app.js               # App configuration
│   └── server.js            # Server entry point
├── pakbites-frontend/       # React Client (Vite)
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Admin/       # Admin-specific views & logic
│   │   │   ├── Contexts/    # Auth & State Management
│   │   │   └── Pages/       # Public & Private user pages
│   │   └── assets/          # Static images & icons
│   └── vite.config.js       # Vite & Proxy setup
└── README.md                # Project Documentation
```

---

## ✨ Features

### 👤 For Users:
- **Registration & Verification**: Secure signup with OTP verification sent via email.
- **Menu Exploration**: Browse items by category (Burgers, Pizzas, Deals, etc.) with real-time searching.
- **Flexible Cart**: Manage selections in a persistent local-storage cart.
- **Checkout Flow**: Simple checkout process for authenticated users.
- **Order History**: View current order status and past purchases.
- **Feedback System**: Submit reviews and ratings for food items.

### 🛡️ For Admins:
- **Sales Analytics**: Real-time sales tracking and revenue summaries.
- **Product Management**: Full CRUD operations for menu items including image uploads.
- **Order Fulfillment**: Update order statuses (Processing, Delivered) and manage logs.
- **User Management**: Monitor registered users and toggle administrative privileges.
- **Review Moderation**: View and manage customer feedback.

---

## ⚙️ Installation & Setup

### 1. Prerequisites:
- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary Account (for images)
- Gmail App Password (for OTPs)

### 2. Backend Setup:
Navigate to the backend directory and install dependencies:
```bash
cd pakbites-backend
npm install
```
Create a `.env` file in the `pakbites-backend` root:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EXPIRES_IN=3d
cloud_name=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
USER_EMAIL=your_email@gmail.com
USER_PASS=your_gmail_app_password
```
Start the server:
```bash
npm start
```

### 3. Frontend Setup:
Navigate to the frontend directory and install dependencies:
```bash
cd ../pakbites-frontend
npm install
```
Start the development server:
```bash
npm run dev
```

---

## 🛡️ License
Distributed under the ISC License. See `LICENSE` for more information.

## 👥 Authors
- **M Abdullah** - *Lead Developer* 

---
Developed with ❤️ by the PakBites Team.
