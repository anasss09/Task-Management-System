Overview
Task Manager is a clean, user-friendly application that helps you organize your daily tasks. Built with modern web technologies, it provides a seamless experience for managing your to-do list.

Features

Frontend
User Authentication - Login and registration with JWT

Task Management - Create, read, update, delete tasks

Task Status - Mark tasks as pending or completed

Search & Filter - Search tasks and filter by status

Pagination - Efficient task listing with pagination

Responsive Design - Works on desktop and mobile devices

Beautiful UI - Modern design with Tailwind CSS

Backend
RESTful API - Clean and structured API endpoints

JWT Authentication - Secure user authentication

MongoDB Integration - Efficient data storage with Mongoose

Error Handling - Comprehensive error handling

Security - Password hashing and input validation

🛠️ Tech Stack
Frontend
React.js - UI framework

Redux Toolkit - State management

React Router - Navigation

Tailwind CSS - Styling

Axios - HTTP client

Lucide React - Icons

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM

JWT - Authentication

bcryptjs - Password hashing

CORS - Cross-origin resource sharing

Tech Stack
Frontend: React, Redux, Tailwind CSS
Backend: Node.js, Express, MongoDB
Authentication: JWT

Quick Start
Backend Setup

cd backend
npm install
npm start

Frontend Setup

cd frontend
npm install
npm run dev

Configure environment variables in .env:
PORT=3000
ACCESSTOKEN_SECRET='your_secret_key'
REFRESHTOKEN_SECRET='your_secret_key'
ACCESSTOKEN_EXPIRE=your_secret_expiry
REFRESHTOKEN_EXPIRE=your_secret_expiry

🎯 Usage
Register/Login: Create an account or login with existing credentials

Create Tasks: Add new tasks with titles

Manage Tasks: Edit, delete, or toggle task status

Organize: Use search and filters to find tasks

Track Progress: View completed and pending tasks

📁 Project Structure

Task-Management-System/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   |   ├── utils/
│   |   ├── App.jsx
|   |   ├── main.jsx
│   └── package.json
└── README.md

Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/refresh - Refresh token

Tasks
GET /api/task/tasks - Get all tasks (with pagination/filters)

POST /api/task/tasks - Create new task

PATCH /api/task/tasks/:id - Update task

PATCH /api/task/tasks/:id/toggle - Toggle task status

DELETE /api/task/tasks/:id - Delete task

👨‍💻 Author
Anas

GitHub: @anasss09

🙏 Acknowledgments
React.js community

Redux Toolkit team

Tailwind CSS for amazing styling

Lucide for beautiful icons
