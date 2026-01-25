# 📁 Project File Structure Guide

Complete directory structure and file organization for the United FC project.

---

## Directory Tree

```
united/
├── src/
│   ├── app/                              # Next.js app router
│   │   ├── layout.tsx                    # Root layout with SessionProvider
│   │   ├── page.tsx                      # Home page (public)
│   │   ├── globals.css                   # Global styles
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── page.tsx             # Login form
│   │   │   │   └── layout.tsx           # Auth layout
│   │   │   └── register/
│   │   │       └── page.tsx             # Registration form
│   │   ├── api/                         # API routes (backend)
│   │   │   ├── auth/
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts         # POST /api/auth/register
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts         # NextAuth handler
│   │   │   ├── players/
│   │   │   │   └── route.ts             # GET /api/players
│   │   │   ├── fixtures/
│   │   │   │   ├── upcoming/
│   │   │   │   │   └── route.ts         # GET /api/fixtures/upcoming
│   │   │   │   ├── next/
│   │   │   │   │   └── route.ts         # GET /api/fixtures/next
│   │   │   │   └── results/
│   │   │   │       └── route.ts         # GET /api/fixtures/results
│   │   │   ├── trials/
│   │   │   │   └── route.ts             # POST/GET /api/trials
│   │   │   └── admin/                   # Admin-only endpoints
│   │   │       ├── news/
│   │   │       ├── players/
│   │   │       ├── fixtures/
│   │   │       ├── training/
│   │   │       └── announcements/
│   │   ├── squad/
│   │   │   └── page.tsx                 # Squad gallery (public)
│   │   ├── fixtures/
│   │   │   └── page.tsx                 # Fixtures & results (public)
│   │   ├── join/
│   │   │   └── page.tsx                 # Trial registration (public)
│   │   ├── about/
│   │   │   └── page.tsx                 # About page (public)
│   │   ├── contact/
│   │   │   └── page.tsx                 # Contact page (public)
│   │   ├── player/                      # Protected player routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx             # Player dashboard
│   │   │   ├── schedule/
│   │   │   │   └── page.tsx             # Training/match schedule
│   │   │   ├── callups/
│   │   │   │   └── page.tsx             # Match callups
│   │   │   ├── stats/
│   │   │   │   └── page.tsx             # Personal statistics
│   │   │   └── announcements/
│   │   │       └── page.tsx             # Player announcements
│   │   ├── admin/                       # Protected admin routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx             # Admin dashboard
│   │   │   ├── squad/
│   │   │   │   └── page.tsx             # Manage squad
│   │   │   ├── fixtures/
│   │   │   │   └── page.tsx             # Manage fixtures
│   │   │   ├── training/
│   │   │   │   └── page.tsx             # Training management
│   │   │   ├── content/
│   │   │   │   └── page.tsx             # News & content
│   │   │   ├── trials/
│   │   │   │   └── page.tsx             # Trial applications
│   │   │   └── statistics/
│   │   │       └── page.tsx             # Team statistics
│   │   └── error.tsx                    # Error boundary
│   ├── components/
│   │   └── Navigation.tsx               # Main navigation component
│   ├── lib/
│   │   ├── auth.ts                      # NextAuth configuration
│   │   ├── session.ts                   # Session utilities
│   │   ├── prisma.ts                    # Prisma client singleton
│   │   ├── validations.ts               # Zod validation schemas
│   │   └── api.ts                       # API response helpers
│   └── middleware.ts                     # NextAuth middleware
├── prisma/
│   ├── schema.prisma                    # Database schema (11 models)
│   ├── seed.ts                          # Database seeding script
│   └── migrations/                      # Database migrations
│       └── [migration_timestamps]/
├── public/
│   └── images/
│       ├── players/                     # Player profile images
│       ├── news/                        # News article images
│       └── hero/                        # Hero section images
├── docs/                                # Documentation files
│   ├── README.md                        # Project overview
│   ├── SETUP.md                         # Installation guide
│   ├── QUICKSTART.md                    # 5-minute setup
│   ├── DOCUMENTATION.md                 # Technical reference
│   ├── SITEMAP.md                       # Site navigation
│   ├── INDEX.md                         # Documentation index
│   ├── COMPLETION_SUMMARY.md            # Project status
│   ├── DEPLOYMENT.md                    # Deployment guide
│   ├── API_DOCUMENTATION.md             # API reference
│   └── FILE_STRUCTURE.md                # This file
├── .env.local                           # Environment variables (local)
├── .env.example                         # Environment template
├── .gitignore                           # Git ignore file
├── package.json                         # Dependencies & scripts
├── package-lock.json                    # Dependency lock file
├── tsconfig.json                        # TypeScript configuration
├── next.config.ts                       # Next.js configuration
├── tailwind.config.ts                   # Tailwind CSS configuration
├── postcss.config.mjs                   # PostCSS configuration
├── jest.config.js                       # Jest testing (optional)
└── README.md                            # Root README

```

---

## Key Directories Explained

### `/src/app`
**Purpose:** Next.js App Router directory containing all pages and API routes

**Structure:**
- `layout.tsx` - Root layout wrapping entire app with SessionProvider
- `page.tsx` - Home page (index route)
- `auth/` - Authentication pages (login, register)
- `api/` - Backend API endpoints
- `squad/`, `fixtures/`, `join/`, etc. - Public pages
- `player/`, `admin/` - Protected portals

**Key Pattern:**
```typescript
// Route matching in Next.js App Router:
// src/app/squad/page.tsx → GET /squad
// src/app/api/players/route.ts → GET /api/players
// src/app/player/dashboard/page.tsx → GET /player/dashboard (protected)
```

---

### `/src/lib`
**Purpose:** Shared utilities and configuration

**Files:**
- `auth.ts` - NextAuth configuration and session handling
- `session.ts` - Helper functions for session/auth checks
- `prisma.ts` - Prisma client singleton (prevents multiple instances)
- `validations.ts` - Zod schemas for all data validation
- `api.ts` - Response standardization helpers

**Usage:**
```typescript
// In any component or API route:
import { getSession } from "@/lib/session";
import { apiResponse } from "@/lib/api";
import { loginSchema } from "@/lib/validations";
```

---

### `/prisma`
**Purpose:** Database schema and migrations

**Files:**
- `schema.prisma` - Database models (11 entities)
- `seed.ts` - Sample data for development
- `migrations/` - Database migration history

**Key Models:**
1. `User` - User accounts (email, password, role)
2. `Player` - Squad players (linked to User)
3. `Stats` - Player statistics (linked to Player)
4. `Fixture` - Matches/fixtures
5. `MatchSquad` - Match squad assignments
6. `Training` - Training sessions
7. `TrainingAttendance` - Attendance tracking
8. `Trial` - Trial applications
9. `News` - News articles
10. `Announcement` - Club announcements
11. `Verification` - Email verification tokens (future)

---

### `/src/components`
**Purpose:** Reusable React components

**Current Component:**
- `Navigation.tsx` - Main navbar with auth state handling

**Structure for Future:**
```
components/
├── Navigation.tsx
├── PlayerCard.tsx          # Player display card
├── FixtureCard.tsx         # Match fixture card
├── Forms/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── TrialForm.tsx
└── Admin/
    ├── PlayerForm.tsx
    ├── FixtureForm.tsx
    └── StatsForm.tsx
```

---

### `/src/app/api`
**Purpose:** Backend API endpoints

**Structure:**
```
api/
├── auth/
│   ├── register/route.ts      # User registration
│   └── [...nextauth]/route.ts # NextAuth handler
├── players/
│   └── route.ts               # List players
├── fixtures/
│   ├── upcoming/route.ts      # Next 5 fixtures
│   ├── next/route.ts          # Next single fixture
│   └── results/route.ts       # Past results
├── trials/
│   └── route.ts               # Trial management
└── admin/
    ├── news/route.ts          # News CRUD
    ├── fixtures/route.ts      # Fixture CRUD
    ├── players/route.ts       # Player CRUD
    └── training/route.ts      # Training CRUD
```

**API Pattern:**
```typescript
// src/app/api/endpoint/route.ts

import { NextRequest, NextResponse } from "next/server";
import { apiResponse, apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.model.findMany();
    return apiResponse(data, "Success message");
  } catch (error) {
    return apiError("Error message", 500);
  }
}
```

---

### `/src/app/page.tsx` (Public Page)
**Purpose:** Home page accessible to anyone

**Pattern:**
```typescript
export default function HomePage() {
  // Public page - no authentication required
  return (
    <main>
      {/* Hero section with countdown timer */}
      {/* Club highlights */}
      {/* Call-to-action buttons */}
    </main>
  );
}
```

---

### `/src/app/player/dashboard/page.tsx` (Protected Page)
**Purpose:** Player portal accessible only to authenticated players

**Pattern:**
```typescript
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PlayerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return <main>{/* Player-specific content */}</main>;
}
```

---

### `/src/app/admin/dashboard/page.tsx` (Protected Admin)
**Purpose:** Admin panel for club management

**Pattern:**
```typescript
"use client";

import { requireRole } from "@/lib/session";

export default function AdminDashboard() {
  // Protected by middleware requiring admin role
  return <main>{/* Admin-specific content */}</main>;
}
```

---

### `/public`
**Purpose:** Static assets (images, fonts, etc.)

**Structure:**
```
public/
├── images/
│   ├── players/              # Player profile images
│   │   ├── ahmed-khan.jpg
│   │   └── ...
│   ├── news/                 # News article images
│   │   └── ...
│   └── hero/                 # Home page hero images
│       └── ...
├── fonts/                    # Custom fonts
└── favicon.ico               # Browser tab icon
```

---

### Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, metadata |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.ts` | Next.js build configuration |
| `tailwind.config.ts` | Tailwind CSS customization |
| `postcss.config.mjs` | CSS processing pipeline |
| `.env.local` | Environment variables (local) |
| `.env.example` | Environment template |
| `.gitignore` | Git ignore patterns |

---

## File Naming Conventions

### Pages
- **Pattern:** `page.tsx`
- **Location:** Feature directory
- **Example:** `src/app/squad/page.tsx`

### API Routes
- **Pattern:** `route.ts`
- **Location:** API directory
- **Example:** `src/app/api/players/route.ts`

### Components
- **Pattern:** `ComponentName.tsx`
- **Style:** PascalCase
- **Example:** `Navigation.tsx`, `PlayerCard.tsx`

### Utilities/Libraries
- **Pattern:** `utility-name.ts`
- **Style:** kebab-case
- **Example:** `api-helpers.ts`, `auth-utils.ts`

### Types/Schemas
- **Pattern:** `types.ts`, `validations.ts`
- **Location:** `src/lib/`
- **Example:** `src/lib/types.ts`, `src/lib/validations.ts`

---

## Import Path Aliases

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

**Usage:**
```typescript
// Instead of:
import { Navigation } from "../../components/Navigation";

// Use:
import { Navigation } from "@/components/Navigation";
import { apiResponse } from "@/lib/api";
import { getSession } from "@/lib/session";
```

---

## Common File Operations

### Adding a New Public Page

1. Create directory: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Add route in Navigation (if needed)

```typescript
// src/app/new-page/page.tsx
export default function NewPage() {
  return <main>{/* Content */}</main>;
}
```

### Adding a New API Endpoint

1. Create directory: `src/app/api/endpoint/`
2. Create file: `src/app/api/endpoint/route.ts`

```typescript
import { NextRequest } from "next/server";
import { apiResponse, apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    // Logic here
    return apiResponse(data, "Success");
  } catch (error) {
    return apiError("Error", 500);
  }
}
```

### Adding a New Component

1. Create file: `src/components/NewComponent.tsx`

```typescript
export function NewComponent() {
  return <div>{/* JSX */}</div>;
}
```

### Adding Database Model

1. Edit: `prisma/schema.prisma`
2. Add model
3. Run: `npx prisma migrate dev --name descriptive_name`

---

## Database File Organization

### Schema File (`prisma/schema.prisma`)

```prisma
// Configuration
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Enums
enum UserRole {
  FAN
  PLAYER
  ADMIN
}

enum Position {
  goalkeeper
  defender
  midfielder
  forward
}

// Models (11 total)
model User { /* ... */ }
model Player { /* ... */ }
model Stats { /* ... */ }
model Fixture { /* ... */ }
model MatchSquad { /* ... */ }
model Training { /* ... */ }
model TrainingAttendance { /* ... */ }
model Trial { /* ... */ }
model News { /* ... */ }
model Announcement { /* ... */ }
model Verification { /* ... */ }
```

### Migrations Directory

```
prisma/migrations/
├── 20260101000000_init/
│   └── migration.sql
├── 20260110000000_add_player_model/
│   └── migration.sql
└── 20260120000000_add_announcements/
    └── migration.sql
```

---

## Development vs Production

### Development Files
- `.env.local` - Local environment variables
- Local database on `localhost:5432`
- Development URLs in environment variables

### Production Files
- `.env.production` - Production environment variables
- Remote database (AWS RDS, Vercel Postgres, etc.)
- Production URLs and secrets

**Never commit:**
- `.env.local` (contains secrets)
- `node_modules/` (installed locally)
- `.next/` (build output)
- Database migrations (auto-generated)

---

## Documentation File Organization

```
Root documentation files:
├── README.md                 # Project overview
├── SETUP.md                  # Installation guide
├── QUICKSTART.md             # 5-minute start
├── DOCUMENTATION.md          # Technical reference
├── SITEMAP.md                # Navigation guide
├── INDEX.md                  # Documentation index
├── COMPLETION_SUMMARY.md     # Status report
├── DEPLOYMENT.md             # Deployment guide
├── API_DOCUMENTATION.md      # API reference
└── FILE_STRUCTURE.md         # This file

InCode documentation:
├── src/app/layout.tsx        # Root layout comment
├── src/lib/auth.ts           # NextAuth config comment
├── prisma/schema.prisma      # Model relationships
└── (Inline JSDoc comments)
```

---

## Quick Reference

### Add Feature Checklist
- [ ] Create page/route file(s)
- [ ] Add TypeScript types
- [ ] Add Zod validation schema (if API)
- [ ] Add component if needed
- [ ] Add API endpoint if needed
- [ ] Update Navigation if public page
- [ ] Update documentation
- [ ] Test locally
- [ ] Commit with descriptive message

### File Size Guidelines

| Type | Target Size |
|------|-------------|
| Page component | < 200 lines |
| API route | < 150 lines |
| Utility function | < 100 lines |
| Large component | Split into smaller files |

### Performance Considerations

- **Image optimization:** Use Next.js `<Image>` component
- **Code splitting:** Automatic with App Router
- **Bundle size:** Monitor with `npm run build`
- **API calls:** Use SWR or React Query for caching (Phase 2)

---

**Document Version:** 1.0
**Last Updated:** January 23, 2026
**Maintainer:** Development Team
