# 📚 United FC - Project Documentation

Complete technical documentation for the United FC Football Club Management System.

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [API Documentation](#api-documentation)
5. [Authentication](#authentication)
6. [Features](#features)
7. [File Structure](#file-structure)
8. [Development Guide](#development-guide)

---

## Project Overview

**United FC** is a full-stack web application for managing a professional football club in Lahore, Pakistan. It provides:

- **Public Interface:** For fans and sponsors
- **Player Portal:** For squad members to manage schedules and stats
- **Admin Panel:** For club management and content control

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | Next.js 15+, React 19, TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Backend** | Next.js API Routes |
| **Database** | PostgreSQL with Prisma ORM |
| **Authentication** | NextAuth.js v5 with JWT |
| **Validation** | Zod |
| **Icons** | Lucide React |
| **Deployment** | Vercel (recommended) |

---

## Architecture

### System Architecture

```
┌─────────────────┐
│   Next.js App   │
│   (Frontend)    │
└────────┬────────┘
         │
    ┌────┴────┐
    │          │
┌───▼──┐  ┌───▼──────────┐
│Pages │  │ API Routes   │
└──────┘  └───┬──────────┘
             │
        ┌────▼────┐
        │ Business │
        │  Logic   │
        └────┬────┘
             │
        ┌────▼──────────┐
        │   Prisma      │
        │   Client      │
        └────┬──────────┘
             │
        ┌────▼──────────┐
        │  PostgreSQL   │
        │   Database    │
        └───────────────┘
```

### Request Flow

```
User Request
    ↓
Next.js Page / API Route
    ↓
Middleware (Auth Check)
    ↓
Business Logic
    ↓
Prisma ORM
    ↓
PostgreSQL Database
    ↓
Response
```

---

## Database Schema

### Entity Relationship Diagram

```
User (1) ──── (1) Player
  │              │
  │              ├── Stats
  │              ├── MatchSquad
  │              └── TrainingAttendance
  │
  └──── (1) Admin

Fixture (1) ──── (M) MatchSquad
  │               │
  │               └── Player

Training (1) ──── (M) TrainingAttendance
  │                 │
  │                 └── Player

News (1) ──── (M) Users (for view tracking)
Trial (1) ──── (1) Position
Announcement (1) ──── (M) Users (for acknowledgment)
```

### Core Tables

#### **User**
- `id` (String, Primary Key)
- `email` (String, Unique)
- `password` (String)
- `role` (Enum: FAN, PLAYER, ADMIN)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **Player**
- `id` (String, Primary Key)
- `userId` (String, Foreign Key → User)
- `name` (String)
- `jerseyNumber` (Integer, 1-99)
- `position` (Enum: GOALKEEPER, DEFENDER, MIDFIELDER, STRIKER)
- `dateOfBirth` (DateTime)
- `nationality` (String)
- `photo` (String, Optional)
- `bio` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **Stats**
- `id` (String, Primary Key)
- `playerId` (String, Foreign Key → Player)
- `matchesPlayed` (Integer, Default: 0)
- `goalsScored` (Integer, Default: 0)
- `assists` (Integer, Default: 0)
- `cleanSheets` (Integer, Default: 0)
- `updatedAt` (DateTime)

#### **Fixture**
- `id` (String, Primary Key)
- `opponent` (String)
- `date` (DateTime)
- `time` (String)
- `venue` (String)
- `homeTeam` (String, Default: "United FC")
- `homeScore` (Integer, Optional)
- `awayScore` (Integer, Optional)
- `matchReport` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **MatchSquad**
- `id` (String, Primary Key)
- `fixtureId` (String, Foreign Key → Fixture)
- `playerId` (String, Foreign Key → Player)
- `isStarter` (Boolean, Default: false)
- `createdAt` (DateTime)

#### **Training**
- `id` (String, Primary Key)
- `date` (DateTime)
- `startTime` (String)
- `endTime` (String)
- `location` (String)
- `notes` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **TrainingAttendance**
- `id` (String, Primary Key)
- `trainingId` (String, Foreign Key → Training)
- `playerId` (String, Foreign Key → Player)
- `status` (Enum: PRESENT, ABSENT, UNMARKED)
- `createdAt` (DateTime)

#### **Trial**
- `id` (String, Primary Key)
- `fullName` (String)
- `age` (Integer, 15-50)
- `position` (Enum: GOALKEEPER, DEFENDER, MIDFIELDER, STRIKER)
- `phone` (String)
- `email` (String)
- `status` (Enum: PENDING, ACCEPTED, REJECTED, SCHEDULED)
- `notes` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **News**
- `id` (String, Primary Key)
- `title` (String)
- `slug` (String, Unique)
- `content` (String)
- `image` (String, Optional)
- `published` (Boolean, Default: false)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

#### **Announcement**
- `id` (String, Primary Key)
- `title` (String)
- `content` (String)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

---

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Response Format

**Success Response:**
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { /* data object */ }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description",
  "data": null
}
```

### Authentication Endpoints

#### Login
```
POST /auth/[...nextauth]
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** 200 OK with JWT token in session

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "PLAYER"
}
```

**Response:** 201 Created

### Players API

#### Get All Players
```
GET /players?position=MIDFIELDER

Query Parameters:
- position: GOALKEEPER | DEFENDER | MIDFIELDER | STRIKER (optional)
```

**Response:** 200 OK
```json
{
  "status": "success",
  "message": "Players retrieved successfully",
  "data": [
    {
      "id": "player_id",
      "name": "Ali Khan",
      "jerseyNumber": 10,
      "position": "STRIKER",
      "nationality": "Pakistan",
      "stats": { /* stats object */ }
    }
  ]
}
```

### Fixtures API

#### Get Upcoming Fixtures
```
GET /fixtures/upcoming?limit=10

Query Parameters:
- limit: Number of results (default: 10)
```

#### Get Next Fixture
```
GET /fixtures/next
```

#### Get Results
```
GET /fixtures/results?limit=10

Query Parameters:
- limit: Number of results (default: 10)
```

### Trials API

#### Submit Trial Registration
```
POST /trials
Content-Type: application/json

{
  "fullName": "John Doe",
  "age": 20,
  "position": "MIDFIELDER",
  "phone": "+92-300-1234567",
  "email": "john@example.com"
}
```

**Response:** 201 Created

#### Get All Trial Applications
```
GET /trials
```

**Authentication:** Admin only

---

## Authentication

### NextAuth.js Configuration

- **Strategy:** JWT (JSON Web Tokens)
- **Session Duration:** 30 days
- **Provider:** Credentials (email/password)

### Role-Based Access Control (RBAC)

| Route | FAN | PLAYER | ADMIN |
|-------|-----|--------|-------|
| `/` | ✓ | ✓ | ✓ |
| `/squad` | ✓ | ✓ | ✓ |
| `/fixtures` | ✓ | ✓ | ✓ |
| `/join` | ✓ | ✓ | ✓ |
| `/player/*` | ✗ | ✓ | ✗ |
| `/admin/*` | ✗ | ✗ | ✓ |

### Session User Object

```typescript
{
  user: {
    id: string,
    email: string,
    name: string,
    role: "FAN" | "PLAYER" | "ADMIN"
  },
  iat: number,    // issued at
  exp: number,    // expiration time
}
```

---

## Features

### ✅ Implemented Features

#### Public Viewer
- [x] Home page with hero section and match countdown
- [x] Squad gallery with player filters
- [x] Fixtures and results pages
- [x] Trial registration form
- [x] About page
- [x] Contact page
- [x] Responsive mobile design

#### Player Portal
- [x] Dashboard layout
- [x] Training schedule page
- [x] Match call-ups page structure
- [x] Personal stats display
- [x] Announcements section

#### Admin Panel
- [x] Dashboard with quick stats
- [x] Management section templates
- [x] Navigation structure

#### Backend/API
- [x] Authentication & registration
- [x] Player management
- [x] Fixture management
- [x] Trial registration
- [x] Database schema
- [x] API validation with Zod

### 🔄 In Development/Planned

- [ ] Email notifications
- [ ] Image upload functionality
- [ ] Advanced statistics dashboard
- [ ] Social media integration
- [ ] Real-time notifications
- [ ] Payment gateway for events
- [ ] Mobile app (React Native)

---

## File Structure

```
united/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── register/
│   │   │   │       └── route.ts
│   │   │   ├── fixtures/
│   │   │   │   ├── next/
│   │   │   │   ├── upcoming/
│   │   │   │   └── results/
│   │   │   ├── players/
│   │   │   │   └── route.ts
│   │   │   └── trials/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── player/
│   │   │   ├── dashboard/
│   │   │   ├── schedule/
│   │   │   ├── callups/
│   │   │   ├── stats/
│   │   │   └── announcements/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── squad/
│   │   │   ├── fixtures/
│   │   │   ├── training/
│   │   │   ├── content/
│   │   │   ├── trials/
│   │   │   └── statistics/
│   │   ├── squad/
│   │   ├── fixtures/
│   │   ├── join/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── Navigation.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── prisma.ts
│   │   ├── session.ts
│   │   ├── api.ts
│   │   └── validations.ts
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── .env.local
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.ts
├── eslint.config.mjs
├── README.md
├── SETUP.md
└── DOCUMENTATION.md
```

---

## Development Guide

### Setting Up Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   # Create .env.local with database URL and secrets
   ```

3. **Initialize database:**
   ```bash
   npm run prisma:migrate
   npm run prisma:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### Adding a New API Endpoint

1. **Create route file:**
   ```
   src/app/api/[resource]/route.ts
   ```

2. **Implement handler:**
   ```typescript
   import { NextRequest } from 'next/server';
   import { apiResponse, apiError } from '@/lib/api';

   export async function GET(request: NextRequest) {
     try {
       // Your logic here
       return apiResponse(data, 'Success message');
     } catch (error: any) {
       return apiError(error.message, 500);
     }
   }
   ```

### Adding a New Page

1. **Create page file:**
   ```
   src/app/[route]/page.tsx
   ```

2. **Implement component:**
   ```typescript
   export default function Page() {
     return (
       <main>
         {/* Content */}
       </main>
     );
   }
   ```

### Using Prisma Client

```typescript
import prisma from '@/lib/prisma';

// Create
const user = await prisma.user.create({
  data: { email: 'user@example.com' }
});

// Read
const user = await prisma.user.findUnique({
  where: { id: 'user_id' }
});

// Update
const user = await prisma.user.update({
  where: { id: 'user_id' },
  data: { name: 'New Name' }
});

// Delete
await prisma.user.delete({
  where: { id: 'user_id' }
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build errors | Run `npm install` and `npm run build` |
| Database connection failed | Check PostgreSQL is running and DATABASE_URL is correct |
| Authentication not working | Verify NEXTAUTH_SECRET is set in .env.local |
| Port 3000 in use | Kill process or use `npm run dev -- -p 3001` |
| TypeScript errors | Run `npm run build` to check all errors |

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Last Updated:** January 23, 2026

**Version:** 1.0.0 (Beta)
