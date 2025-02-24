# Task Management Application

A full-stack task management application built with React (TypeScript) frontend and Node.js backend, featuring user authentication and CRUD operations for tasks.

## Salary Expectations
$30 per month

## Video Demo
[Watch Demo](https://www.loom.com/share/1df00d0d1a484a0fa58a56121f1d9198?sid=6d8eb1f9-ebf6-45b7-955e-00828dcf0cf6)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
DATABASE_URL=postgres://username:password@localhost:5432//databaseName
JWT_SECRET=jwt_secret
PORT=3002
DATABASE_NAME=databseName
DATABASE_USER=username
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The backend server will start on http://localhost:3002

## Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
REACT_APP_BACKEND_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm start
```

The frontend application will start on http://localhost:3000

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /auth/register
```
- Description: Register a new user
- Request Body:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Success Response (201):
  ```json
  {
    "message": "Registration successful",
    "user": {
      "id": "number",
      "username": "string"
    }
  }
  ```
- Error Response (400):
  ```json
  {
    "error": "Username already exists"
  }
  ```

#### Login User
```
POST /auth/login
```
- Description: Authenticate user and return JWT token
- Request Body:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Success Response (200):
  ```json
  {
    "message": "Login successful",
    "token": "JWT_token_string"
  }
  ```
- Error Response (400):
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### Tasks Endpoints

All task endpoints require authentication via JWT token in the Authorization header.

#### Get All Tasks
```
GET /tasks
```
- Description: Retrieve all tasks for the authenticated user
- Headers: `Authorization: Bearer <token>`
- Success Response (200): Array of task objects
  ```json
  [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "isComplete": "boolean",
      "userId": "number"
    }
  ]
  ```

#### Get Single Task
```
GET /tasks/:id
```
- Description: Retrieve a specific task by ID
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (task ID)
- Success Response (200): Task object
- Error Response (404):
  ```json
  {
    "error": "Task not found"
  }
  ```

#### Create Task
```
POST /tasks
```
- Description: Create a new task
- Headers: `Authorization: Bearer <token>`
- Request Body:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- Success Response (201): Created task object

#### Update Task
```
PUT /tasks/:id
```
- Description: Update an existing task
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (task ID)
- Request Body:
  ```json
  {
    "title": "string",
    "description": "string",
    "isComplete": "boolean"
  }
  ```
- Success Response (200): Updated task object
- Error Response (404):
  ```json
  {
    "error": "Task not found"
  }
  ```

#### Delete Task
```
DELETE /tasks/:id
```
- Description: Delete a task
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (task ID)
- Success Response (200):
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- Error Response (404):
  ```json
  {
    "error": "Task not found"
  }
  ```

## Project Structure

### Backend Structure
```
server/
├── src/
│   ├── middleware/
│   │   └── auth.js       # Authentication middleware
│   ├── routes/
│   │   ├── auth.js       # Authentication routes
│   │   └── tasks.js      # Task management routes
│   ├── db.js             # Database configuration
│   ├── index.js          # Server entry point
│   └── setupDB.js        # Database setup script
├── .env
└── package.json
```

### Frontend Structure
```
client/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   └── Tasks/
│   │       ├── TaskForm.tsx
│   │       ├── TaskList.tsx
│   │       └── UpdateTaskPopup.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── App.tsx
│   └── index.tsx
├── .env
└── package.json
```

## License

This project is licensed under the MIT License.