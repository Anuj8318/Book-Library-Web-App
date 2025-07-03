# 📚 Book Library Web Application

A full-stack web application that allows users to manage a personal book collection with **role-based access**.  
Admins can perform full CRUD operations on books, while users can **borrow and return books**. The system enforces **real-time book availability tracking**, prevents duplicate borrowing, and protects routes using authentication and roles.

---

## 🔧 Tech Stack

- **Frontend**: React.js, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel (frontend), Render (backend) — optional
- **Video Recording**: Loom

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Register/Login
- JWT-based token handling
- Role-based redirection (`admin` or `user`)
- Route protection

### 🧑‍💼 Admin Panel
- Add, update, delete books
- View real-time available copies

### 👤 User Panel
- View books and borrow available ones
- Prevent double borrowing
- Return borrowed books
- View borrowed list with dates

---

## 📺 Demo Video

🎥 Watch here: [Click to View Demo](https://www.loom.com/share/d71c12c86144498ea5a37da2d279064c?sid=734e5bdd-e279-4976-bc60-32e57b55ccf4)

---

## 🗃️ Project Structure
book-library-app/
├── client/ → React frontend
├── server/ → Express backend
├── README.md

## 📦 Setup Instructions

### 🔹 Backend Setup

```bash
cd server
npm install
npm run dev
```

Create a .env file:

PORT=5000
JWT_SECRET=your_jwt_secret
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library

### 🔹 Frontend Setup
```bash
cd client
npm install
npm start
```

## 🧪 API Overview
-  Method	Route	Access	Description
-  POST	/api/auth/register	Public	Register user/admin
-  POST	/api/auth/login	Public	Login + JWT token
-  GET	/api/books	All	View all books
-  POST	/api/books	Admin	Add new book
-  PUT	/api/books/:id	Admin	Update book
-  DELETE	/api/books/:id	Admin	Delete book
-  POST	/api/borrow/:bookId	User	Borrow a book
-  POST	/api/return/:bookId	User	Return a borrowed book
-  GET	/api/borrowed	User	View currently borrowed



## 🧠 Smart Logic
-  Prevents users from borrowing the same book multiple times
-  Tracks available copies using joins in SQL
-  Securely validates all routes using JWT and role checks


## 🗃️ Database Schema
🔸 users
Column	Type
id	SERIAL PRIMARY KEY
name	TEXT
email	TEXT UNIQUE
password	TEXT
role	TEXT ('admin' or 'user')

🔸 books
Column	Type
id	SERIAL
title	TEXT
author	TEXT
genre	TEXT
total_copies	INTEGER

🔸 borrowed_books
Column	Type
id	SERIAL
user_id	INTEGER REFERENCES users(id)
book_id	INTEGER REFERENCES books(id)
borrow_date	TIMESTAMP
return_date	TIMESTAMP

## 🎨 UI Highlights
-  Responsive and mobile-friendly design
-  Clean, modern CSS without any external frameworks
-  Button hover effects, styled navbar, card layout

## ✍️ Author
Anuj Singh
📧 anujsingh00028@email.com

## ✅ Submission Notes
✅ All code is original and written from scratch
✅ Video demo recorded using Loom
✅ Fully working end-to-end app with proper role handling and validations


Feel free to test as both admin and user roles to see how the system adapts!
