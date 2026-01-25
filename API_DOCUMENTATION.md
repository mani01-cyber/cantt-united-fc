# 📚 United FC - API Documentation

Complete REST API reference for all backend endpoints.

---

## Overview

All API endpoints return standardized JSON responses:

### Success Response
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

### Response Headers
```
Content-Type: application/json
Authorization: Bearer {token} (for protected routes)
```

---

## Authentication Endpoints

### Register Account

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123",
  "fullName": "John Doe",
  "phone": "+92-300-1234567"
}
```

**Validation:**
- Email: Valid email format, unique in database
- Password: Minimum 6 characters
- confirmPassword: Must match password
- fullName: 2-50 characters
- phone: Valid phone number

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "FAN"
    }
  },
  "message": "User registered successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Email already exists",
  "statusCode": 400
}
```

**Status Codes:**
- 201: User created successfully
- 400: Validation error
- 500: Server error

---

### Login

**Endpoint:** `POST /api/auth/[...nextauth]`

**Description:** Authenticate user and create session

**Method:** NextAuth handles via `signIn()` function

**Request (Client-side):**
```typescript
import { signIn } from "next-auth/react";

const result = await signIn("credentials", {
  email: "user@example.com",
  password: "securePassword123",
  redirect: true,
  callbackUrl: "/dashboard"
});
```

**Valid Credentials (Test):**
```
Email: admin@unitedfc.pk
Password: admin123

Email: player1@unitedfc.pk
Password: player123
```

**Response:**
- Success: Redirects to callbackUrl, sets session token
- Failure: Returns error, no redirect

**Session Duration:** 30 days

---

## Player Endpoints

### Get All Players

**Endpoint:** `GET /api/players`

**Description:** List all players with optional filtering

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| position | string | Filter by position (optional) | `goalkeeper`, `defender`, `midfielder`, `forward` |
| limit | number | Results per page (default: 50) | `10` |
| offset | number | Pagination offset (default: 0) | `0` |

**Request Example:**
```
GET /api/players?position=midfielder&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "player-uuid",
      "fullName": "Ahmed Khan",
      "position": "midfielder",
      "jerseyNumber": 7,
      "age": 24,
      "image": "/images/players/ahmed-khan.jpg",
      "stats": {
        "gamesPlayed": 15,
        "goals": 5,
        "assists": 3
      }
    }
  ],
  "message": "Players retrieved successfully"
}
```

**Status Codes:**
- 200: Success
- 400: Invalid query parameters
- 500: Server error

---

## Fixture Endpoints

### Get Upcoming Fixtures

**Endpoint:** `GET /api/fixtures/upcoming`

**Description:** Get next 5 upcoming matches

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | Number of fixtures (default: 5) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "fixture-uuid",
      "homeTeam": "United FC",
      "awayTeam": "City FC",
      "date": "2026-02-15T18:00:00Z",
      "venue": "United Stadium",
      "status": "scheduled",
      "competition": "League",
      "squadSize": 18
    }
  ],
  "message": "Upcoming fixtures retrieved"
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

### Get Next Match

**Endpoint:** `GET /api/fixtures/next`

**Description:** Get the very next upcoming match

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "fixture-uuid",
    "homeTeam": "United FC",
    "awayTeam": "City FC",
    "date": "2026-02-15T18:00:00Z",
    "venue": "United Stadium",
    "status": "scheduled",
    "timeUntilMatch": 604800000,
    "squad": [
      {
        "id": "squad-uuid",
        "player": { "id": "player-uuid", "fullName": "Ahmed Khan" },
        "position": "midfielder"
      }
    ]
  },
  "message": "Next fixture retrieved"
}
```

**Status Codes:**
- 200: Success
- 404: No upcoming matches
- 500: Server error

---

### Get Match Results

**Endpoint:** `GET /api/fixtures/results`

**Description:** Get completed matches

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| limit | number | Number of results (default: 10) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "fixture-uuid",
      "homeTeam": "United FC",
      "awayTeam": "City FC",
      "homeTeamScore": 2,
      "awayTeamScore": 1,
      "date": "2026-02-01T18:00:00Z",
      "venue": "United Stadium",
      "status": "completed",
      "highlights": "https://youtube.com/watch?v=...",
      "motm": "Ahmed Khan"
    }
  ],
  "message": "Results retrieved successfully"
}
```

**Status Codes:**
- 200: Success
- 500: Server error

---

## Trial Endpoints

### Submit Trial Application

**Endpoint:** `POST /api/trials`

**Description:** Register for player trial

**Request Body:**
```json
{
  "fullName": "Muhammad Ali",
  "email": "ali@example.com",
  "phone": "+92-300-9876543",
  "age": 22,
  "position": "forward",
  "height": 185,
  "weight": 75,
  "club": "Local Football Academy",
  "experience": "5 years"
}
```

**Validation:**
- fullName: 2-50 characters
- email: Valid email
- phone: Valid phone format
- age: 15-50 years
- position: goalkeeper, defender, midfielder, forward
- height: 150-220 cm
- weight: 40-120 kg

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "trial-uuid",
    "fullName": "Muhammad Ali",
    "email": "ali@example.com",
    "position": "forward",
    "status": "pending",
    "createdAt": "2026-02-10T10:30:00Z"
  },
  "message": "Trial application submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid age. Must be between 15 and 50.",
  "statusCode": 400
}
```

**Status Codes:**
- 201: Application created
- 400: Validation error
- 500: Server error

---

### Get Trial Applications

**Endpoint:** `GET /api/trials`

**Description:** Retrieve all trial applications (Admin only)

**Authorization:** Required (Admin role)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter: pending, approved, rejected |
| position | string | Filter by player position |
| limit | number | Results per page |

**Request Example:**
```
GET /api/trials?status=pending&position=forward&limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "trial-uuid",
      "fullName": "Muhammad Ali",
      "email": "ali@example.com",
      "phone": "+92-300-9876543",
      "position": "forward",
      "age": 22,
      "status": "pending",
      "createdAt": "2026-02-10T10:30:00Z",
      "notes": "Promising young talent"
    }
  ],
  "message": "Trial applications retrieved"
}
```

**Status Codes:**
- 200: Success
- 401: Unauthorized
- 403: Forbidden (not admin)
- 500: Server error

---

## Admin Endpoints (Protected)

### Create News Article

**Endpoint:** `POST /api/admin/news`

**Description:** Create new news article (Admin only)

**Authorization:** Required (Admin role)

**Request Body:**
```json
{
  "title": "United FC Advances to Semi-Finals",
  "content": "Detailed article content...",
  "category": "matches",
  "featured": true,
  "image": "/images/news/semi-final.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "news-uuid",
    "title": "United FC Advances to Semi-Finals",
    "slug": "united-fc-advances-to-semi-finals",
    "createdAt": "2026-02-10T10:30:00Z"
  },
  "message": "News article created successfully"
}
```

---

### Update Player Stats

**Endpoint:** `PUT /api/admin/players/{playerId}/stats`

**Description:** Update player statistics (Admin only)

**Authorization:** Required (Admin role)

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| playerId | string | UUID of player |

**Request Body:**
```json
{
  "gamesPlayed": 20,
  "goals": 8,
  "assists": 5,
  "yellowCards": 2,
  "redCards": 0
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "playerId": "player-uuid",
    "gamesPlayed": 20,
    "goals": 8,
    "assists": 5
  },
  "message": "Player stats updated successfully"
}
```

---

### Create Announcement

**Endpoint:** `POST /api/admin/announcements`

**Description:** Create club announcement (Admin only)

**Authorization:** Required (Admin role)

**Request Body:**
```json
{
  "title": "Training Schedule Update",
  "content": "New training times starting next week...",
  "priority": "high",
  "audience": "players"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "announcement-uuid",
    "title": "Training Schedule Update",
    "createdAt": "2026-02-10T10:30:00Z"
  },
  "message": "Announcement created successfully"
}
```

---

## Error Handling

### Common Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already exists |
| 500 | Server Error | Database connection failed |

### Error Response Format

```json
{
  "success": false,
  "error": "Detailed error message",
  "statusCode": 400,
  "validation": {
    "email": "Invalid email format",
    "password": "Password must be at least 6 characters"
  }
}
```

---

## Rate Limiting

### Rate Limits Applied

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/auth/register` | 5 | 1 hour |
| `/api/auth/login` | 10 | 1 hour |
| `/api/trials` (POST) | 3 | 1 day |
| Public endpoints | 100 | 1 hour |

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1645876800
```

**Response (Rate Limited):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "statusCode": 429
}
```

---

## Pagination

### Pagination Query Parameters

```
GET /api/players?limit=10&offset=20
```

### Pagination Response

```json
{
  "success": true,
  "data": [ /* array of results */ ],
  "pagination": {
    "limit": 10,
    "offset": 20,
    "total": 150,
    "pages": 15,
    "currentPage": 3
  }
}
```

---

## Authentication

### Session Token

After login, a secure HTTP-only cookie is set:
```
Set-Cookie: next-auth.session-token=...; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000
```

### Using Session in Requests

Cookies are automatically sent with subsequent requests. No manual header needed.

### Session Duration

- **Web:** 30 days
- **Mobile:** 30 days (if supported)

### Logout

```typescript
import { signOut } from "next-auth/react";

await signOut({ redirect: true, callbackUrl: "/" });
```

---

## Data Types

### User Object
```typescript
{
  id: string;           // UUID
  email: string;        // Unique email
  fullName: string;     // Display name
  phone: string;        // Contact number
  role: "FAN" | "PLAYER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}
```

### Player Object
```typescript
{
  id: string;
  fullName: string;
  position: "goalkeeper" | "defender" | "midfielder" | "forward";
  jerseyNumber: number;
  age: number;
  height: number;       // cm
  weight: number;       // kg
  image: string;        // URL
  stats: {
    gamesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
  };
  joinDate: Date;
}
```

### Fixture Object
```typescript
{
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  venue: string;
  status: "scheduled" | "live" | "completed" | "postponed";
  homeTeamScore?: number;
  awayTeamScore?: number;
  competition: string;
  highlights?: string;  // URL
  motm?: string;        // Man of the match
}
```

---

## Webhook Events (Future Enhancement)

Future webhooks for real-time updates:

- `match.scheduled` - New match scheduled
- `match.started` - Match started
- `match.finished` - Match completed
- `player.transfer` - Player transfer
- `news.published` - News article published
- `trial.status_changed` - Trial application status updated

---

## Testing

### Test Base URL

**Development:**
```
http://localhost:3000/api
```

**Production:**
```
https://unitedfc.pk/api
```

### Test Credentials

```
Email: admin@unitedfc.pk
Password: admin123

Email: player1@unitedfc.pk
Password: player123
```

### Sample cURL Requests

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "confirmPassword": "test123",
    "fullName": "Test User",
    "phone": "+92-300-1234567"
  }'
```

**Get Players:**
```bash
curl http://localhost:3000/api/players?position=midfielder
```

**Submit Trial:**
```bash
curl -X POST http://localhost:3000/api/trials \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Player",
    "email": "player@example.com",
    "phone": "+92-300-1234567",
    "age": 22,
    "position": "forward"
  }'
```

---

## API Versioning

**Current Version:** 1.0

No version prefix required. All endpoints on `/api/` path.

Future versions may use:
- `/api/v1/` (versioned routes)
- `Accept: application/vnd.unitedfc.v1+json` (content negotiation)

---

## Support & Documentation

- **API Base:** [https://unitedfc.pk/api](https://unitedfc.pk/api)
- **Status Page:** [https://status.unitedfc.pk](https://status.unitedfc.pk)
- **Support:** api-support@unitedfc.pk
- **Issues:** [GitHub Issues](https://github.com/unitedfc/united)

---

**API Version:** 1.0.0
**Last Updated:** January 23, 2026
**Status:** Production Ready
