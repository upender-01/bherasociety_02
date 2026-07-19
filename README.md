# 🚀 Bhera Society - Backend

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-REST%20API-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7?logo=render)

### Official Backend Repository of the Bhera Society Website

A scalable RESTful backend built using **Node.js**, **Express.js**, and **MongoDB Atlas**, powering the official Bhera Society website with secure APIs, payment processing, email automation, and cloud deployment.

🌍 **Live Website:** https://bherasociety.com

</div>

---

# 📖 Overview

The **Bhera Society Backend** is the server-side application responsible for handling business logic, API requests, database management, secure payment processing, email notifications, and deployment.

The backend is designed following REST architecture with a focus on scalability, maintainability, security, and performance.

---

# 👨‍💻 My Contributions

As a **Core Contributor**, I designed, developed, deployed, and currently maintain the complete backend infrastructure.

### Responsibilities

- ⚙ Developed RESTful APIs using Express.js
- 🗄 Designed MongoDB database architecture
- ☁ Managed MongoDB Atlas Cloud Database
- 💳 Integrated Razorpay Payment Gateway
- 📧 Built automated email workflows using Nodemailer
- 🔐 Implemented secure environment configuration
- 🌐 Configured CORS and middleware
- 🚀 Deployed backend on Render
- 🛠 Production monitoring and maintenance
- 🐞 Debugging, optimization, and feature enhancements

---

# ✨ Features

- RESTful API Architecture
- MongoDB Atlas Integration
- Razorpay Payment Processing
- Email Notifications
- Contact Form APIs
- Volunteer Registration APIs
- Appointment Management APIs
- Reviews Management
- Environment Variable Configuration
- Production Error Handling
- Secure Middleware
- Cloud Deployment
- Scalable Backend Design

---

# ⚙ API Modules

### 🏥 Appointment Management

- Book Appointment
- Validate Data
- Store Appointment Information
- Send Confirmation Email

---

### ❤️ Donations

- Create Razorpay Order
- Verify Payment
- Store Transaction Details

---

### 🙋 Volunteer Registration

- Register Volunteers
- Validate Input
- Store Information
- Send Confirmation Email

---

### ✉ Contact Management

- Receive Contact Requests
- Store Queries
- Email Notifications

---

### ⭐ Reviews

- Add Reviews
- Retrieve Reviews
- Display Latest Reviews

---

# 🏗 Backend Architecture

```
Client (React)

↓

REST APIs

↓

Express.js Server

↓

Business Logic

↓

MongoDB Atlas Database

↓

Email Service (Nodemailer)

↓

Razorpay Payment Gateway
```

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Payment

- Razorpay

## Email Service

- Nodemailer

## Deployment

- Render

## Development Tools

- Git
- GitHub
- Postman
- VS Code

---

# 📂 Project Structure

```
backend
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── utils
├── uploads
├── server.js
├── package.json
└── .env
```

---

# 🔒 Security

The backend follows security best practices.

- Environment Variables
- Secure API Configuration
- CORS Protection
- Input Validation
- Error Handling
- Secure Payment Verification
- Protected Sensitive Credentials

---

# ☁ Cloud Deployment

The backend is deployed on **Render**.

Deployment Features

- Automatic GitHub Deployment
- Environment Variable Management
- Production Build
- Automatic Restarts
- Cloud Hosting

Every push to the **main** branch automatically triggers deployment.

---

# 🗄 Database

The project uses **MongoDB Atlas** as the cloud database.

Collections include

- Appointments
- Volunteers
- Reviews
- Contact Messages
- Payment Records

The database is designed for scalability and efficient querying.

---

# 📧 Email Automation

Implemented using **Nodemailer**.

Automated emails include

- Appointment Confirmation
- Volunteer Registration Confirmation
- Contact Notifications
- Administrative Notifications

---

# 💳 Payment Integration

Integrated **Razorpay Payment Gateway**.

Features

- Secure Order Creation
- Payment Verification
- Transaction Management
- Donation Processing

---

# ⚡ Performance

Optimizations include

- Modular Architecture
- Efficient Database Queries
- Optimized Middleware
- Async/Await Operations
- Centralized Error Handling
- Lightweight REST APIs

---

# 🚀 Getting Started

Clone Repository

```bash
git clone https://github.com/your-username/bherasociety-backend.git
```

Move into project

```bash
cd bherasociety-backend
```

Install Dependencies

```bash
npm install
```

Create Environment File

```env
PORT=5000

MONGODB_URI=YOUR_MONGODB_URI

RAZORPAY_KEY_ID=YOUR_KEY

RAZORPAY_KEY_SECRET=YOUR_SECRET

EMAIL=YOUR_EMAIL

EMAIL_PASSWORD=YOUR_PASSWORD
```

Run Development Server

```bash
npm run dev
```

Run Production

```bash
npm start
```

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/appointments` | Book Appointment |
| POST | `/volunteers` | Register Volunteer |
| POST | `/contact` | Contact Form |
| POST | `/payment/create-order` | Create Razorpay Order |
| POST | `/payment/verify` | Verify Payment |
| GET | `/reviews` | Fetch Reviews |

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository
2. Create Feature Branch

```bash
git checkout -b feature/new-feature
```

3. Commit Changes

```bash
git commit -m "Added new feature"
```

4. Push Branch

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

# 👨‍💻 Author

**Bhukya Upendar**

**Core Contributor (Backend)**

IIT (BHU) Varanasi

- GitHub: https://github.com/upender-01
- LinkedIn: https://linkedin.com/in/upender-bhukya-2767472a8
- Email: bhukyaupender804@gmail.com

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

Your support motivates continuous improvements and future development.

---

<div align="center">

Built with ❤️ using Node.js, Express.js & MongoDB Atlas

</div>
