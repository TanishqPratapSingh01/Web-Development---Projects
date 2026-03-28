# Learning Backend API - Task Manager 🚀

A simple, educational RESTful Task Manager API built with **Node.js**, **Express**, JSON file persistence, validation, and middleware. Perfect for learning backend fundamentals!

## 📋 Features (Educational Highlights)
- **REST CRUD**: Create, Read, Update, Delete tasks with proper HTTP status codes.
- **Middleware**: CORS, JSON parsing, input validation (express-validator).
- **Persistence**: JSON file storage with async FS (no DB needed).
- **Validation & Errors**: Centralized error handling, UUIDs.
- **Logging**: Console logs for debugging.
- **Dev Tools**: Nodemon for auto-restart.

## 🛠 Quick Start
1. **Navigate**:
   ```
   cd learning-backend-api
   ```
2. **Install dependencies**:
   ```
   npm install
   ```
3. **Run in dev mode** (auto-restart):
   ```
   npm run dev
   ```
   Server starts on `http://localhost:3001`

## 📖 API Documentation
Base URL: `http://localhost:3001/api/tasks`

| Method | Endpoint | Description | Body/Example |
|--------|----------|-------------|-------------|
| GET | `/health` | Health check | - |
| GET | `/` | List all tasks | `curl http://localhost:3001/api/tasks` |
| GET | `/:id` | Get task by ID | `curl http://localhost:3001/api/tasks/TASK_ID` |
| POST | `/` | Create task | `{ \"title\": \"Learn Express\", \"description\": \"Build API\" }`<br>`curl -X POST -H \"Content-Type: application/json\" -d '{\"title\":\"Learn\"}' http://localhost:3001/api/tasks` |
| PUT | `/:id` | Update task | `{ \"title\": \"Updated\", \"completed\": true }` |
| DELETE | `/:id` | Delete task | `curl -X DELETE http://localhost:3001/api/tasks/TASK_ID` |

**Example create** (returns new task with ID):
```
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Details"}'
```

## 🧪 Testing
- Use **Postman**, **Insomnia**, or `curl`.
- Frontend: Add CORS-enabled HTML/JS client easily.
- Data stored in `data/tasks.json`.

## 🔍 Learning Points
- Routing & controllers separation.
- Async/await with FS promises.
- Validation chains & custom middleware.
- Error handling (404, 400, 500).
- UUID for IDs, timestamps.

## 📁 Structure
```
learning-backend-api/
├── server.js          # App setup & middleware
├── routes/tasks.js    # All endpoints
├── middleware/        # Validation handler
├── data/tasks.json    # Persistence
├── package.json       # Deps: express, validator, cors, uuid, nodemon
└── README.md          # This file
```

**Next steps**: Add auth (JWT), DB (SQLite/Mongo), tests (Jest), Docker.

