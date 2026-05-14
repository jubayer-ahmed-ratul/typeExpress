# Express PostgreSQL REST API

A simple REST API built with **Express.js**, **TypeScript**, and **PostgreSQL** (Neon) for managing users.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Language:** TypeScript
- **Database:** PostgreSQL (via Neon serverless)
- **ORM/Query:** node-postgres (`pg`)
- **Dev Server:** tsx (watch mode)

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g., [Neon](https://neon.tech))

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
CONNECTIONSTRING="your_postgresql_connection_string"
PORT=5000
```

### Run in Development

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

## API Endpoints

### Health Check

| Method | Endpoint | Description        |
|--------|----------|--------------------|
| GET    | `/`      | Server health check |

**Response:**
```json
{
  "message": "Server is running",
  "author": "Jubayer"
}
```

---

### Users

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | `/api/users`      | Get all users     |
| GET    | `/api/users/:id`  | Get user by ID    |
| POST   | `/api/users`      | Create a new user |
| PUT    | `/api/users/:id`  | Update a user     |
| DELETE | `/api/users/:id`  | Delete a user     |

#### Create User — `POST /api/users`

**Request Body:**
```json
{
  "name": "Jubayer",
  "email": "jubayer@example.com",
  "password": "secret123",
  "age": 25
}
```

**Response `201`:**
```json
{
  "message": "Created",
  "data": { ...user }
}
```

#### Update User — `PUT /api/users/:id`

**Request Body** (all fields optional):
```json
{
  "name": "Updated Name",
  "password": "newpassword",
  "age": 26,
  "is_active": false
}
```

## Database Schema

```sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(20),
  email      VARCHAR(20) UNIQUE NOT NULL,
  password   VARCHAR(20) NOT NULL,
  is_active  BOOLEAN DEFAULT true,
  age        INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Project Structure

```
├── src/
│   ├── config/
│   │   └── index.ts      # Environment config
│   └── server.ts         # Express app & routes
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```
