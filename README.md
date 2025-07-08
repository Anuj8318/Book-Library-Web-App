# 📚 Book Library Web Application

A full-stack web application for managing a personal or institutional book collection with **role-based access**.

- 👤 Users can **borrow and return books**, leave reviews, and track their borrowed list.
- 🧑‍💼 Admins can **add, update, and delete** books.
- ✅ Real-time book availability tracking.
- 🔒 Secured with **JWT-based authentication** and **role-based authorization**.
- 🔔 (Coming Soon) Real-time notifications for borrowing and book updates using Socket.IO.

---

## 🔧 Tech Stack

- **Frontend**: React.js, TailwindCSS / CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Deployment**: Vercel (Frontend), Render (Backend)
- **Recording Tool**: Loom

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Register/Login with secure JWT handling
- Role-based route protection (`admin` / `user`)
- Redirection based on role

### 🧑‍💼 Admin Panel
- 📚 Add, update, and delete books
- 📈 View live availability status
- 📝 See all user reviews

### 👤 User Panel
- 🔍 Browse all books with ratings
- ✅ Borrow/return books
- ❌ Prevent duplicate borrowing
- 💬 Submit and read reviews
- 📅 View borrowed history with dates

### 🌟 Reviews System
- 1–5 star rating + comment
- Prevent duplicate reviews
- View all public reviews for a book

### 🔔 Real-Time Notifications (Coming Soon)
- Notify users when:
  - Book is returned and available
  - Their review gets a reply or like
  - Admin updates a borrowed book
- Powered by **Socket.IO**

---

## 🌐 Live Demo

- **Frontend (Vercel)**: [Book Library Client](https://book-library-web-app-git-main-anuj-singhs-projects.vercel.app)
- **Backend (Render)**: [Book Library API](https://book-library-web-app.onrender.com)

---

## 📺 Demo Video

🎥 [Click to Watch on Loom](https://www.loom.com/share/d71c12c86144498ea5a37da2d279064c?sid=734e5bdd-e279-4976-bc60-32e57b55ccf4)

---

## 🗃️ Project Structure

book-library-app/
- client/ → React frontend
- server/ → Express backend
- README.md

---

---

## 🧪 API Endpoints

| Method | Endpoint                         | Access | Description                |
|--------|----------------------------------|--------|----------------------------|
| POST   | `/api/auth/register`             | Public | Register new user          |
| POST   | `/api/auth/login`                | Public | Login and get JWT          |
| GET    | `/api/books`                     | All    | Get all books              |
| POST   | `/api/books`                     | Admin  | Add a book                 |
| PUT    | `/api/books/:id`                 | Admin  | Edit book details          |
| DELETE | `/api/books/:id`                 | Admin  | Delete a book              |
| POST   | `/api/borrow/:bookId`            | User   | Borrow a book              |
| POST   | `/api/return/:bookId`            | User   | Return a book              |
| GET    | `/api/borrowed`                  | User   | View borrowed books        |
| GET    | `/api/reviews/:bookId`           | All    | Get book reviews           |
| POST   | `/api/reviews/:bookId`           | User   | Submit a review            |

---

## 🗃️ Database Schema

### 🔸 `users`
| Column   | Type        |
|----------|-------------|
| id       | SERIAL PK   |
| name     | TEXT        |
| email    | TEXT UNIQUE |
| password | TEXT        |
| role     | TEXT (`admin` or `user`) |

### 🔸 `books`
| Column        | Type      |
|---------------|-----------|
| id            | SERIAL PK |
| title         | TEXT      |
| author        | TEXT      |
| genre         | TEXT      |
| total_copies  | INTEGER   |

### 🔸 `borrowed_books`
| Column       | Type                        |
|--------------|-----------------------------|
| id           | SERIAL PK                   |
| user_id      | INTEGER → `users(id)`       |
| book_id      | INTEGER → `books(id)`       |
| borrow_date  | TIMESTAMP                   |
| return_date  | TIMESTAMP                   |

### 🔸 `reviews`
| Column     | Type                      |
|------------|---------------------------|
| id         | SERIAL PK                 |
| user_id    | INTEGER → `users(id)`     |
| book_id    | INTEGER → `books(id)`     |
| rating     | INTEGER                   |
| comment    | TEXT                      |
| created_at | TIMESTAMP DEFAULT NOW()   |

---

## 📦 Local Setup Instructions

### 🔹 Backend Setup

```bash
cd server
npm install
npm run dev
```
---

### Create a .env file:
PORT=5000
JWT_SECRET=your_jwt_secret
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library


---
### 🔹 Frontend Setup
cd client
npm install
npm start

---

### 🎨 UI Highlights
-Responsive design for mobile/desktop
-Minimalist, clean layout
-Card-based UI with smooth transitions
-Visual feedback on form submission and errors

###  Submission Notes
-  ✅ 100% original code

-  ✅ Fully working app with role-based authentication

-  ✅ Proper backend validations and error handling

-  ✅ Deployed frontend and backend

-  ✅ Review system implemented


### ✍️ Author
Anuj Singh
📧 anujsingh00028@email.com
