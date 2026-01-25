# United FC - Full-Stack Football Club Management System

A comprehensive, modern, and responsive full-stack website for a Football Club based in Lahore, Pakistan. Built with Next.js, Node.js/Express, PostgreSQL, and Tailwind CSS.

## 🎯 Project Overview

United FC is a complete football club management system featuring:

### Three Distinct User Interfaces

1. **Public Viewer (Fan)** - Informative interface for fans and sponsors
2. **Player Portal** - Internal communication and schedule management
3. **Admin Control Panel** - Full content and management control

## 🛠️ Tech Stack

- **Frontend:** Next.js 15+ with React & TypeScript
- **Styling:** Tailwind CSS (Modern, energetic sports aesthetic)
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5 with JWT
- **Icons:** Lucide React
- **Validation:** Zod
- **Security:** bcryptjs for password hashing

## 📦 Project Structure

```
united/
├── src/
│   ├── app/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── players/        # Player management
│   │   │   ├── fixtures/       # Match fixtures
│   │   │   ├── trials/         # Trial registrations
│   │   │   └── admin/          # Admin operations
│   │   ├── auth/               # Auth pages (login, register)
│   │   ├── player/             # Player portal pages
│   │   ├── admin/              # Admin panel pages
│   │   ├── squad/              # Squad gallery page
│   │   ├── fixtures/           # Fixtures & results page
│   │   ├── join/               # Trials registration page
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── Navigation.tsx      # Main navigation
│   │   └── ...                 # Other components
│   ├── lib/
│   │   ├── auth.ts             # NextAuth configuration
│   │   ├── prisma.ts           # Prisma client
│   │   ├── session.ts          # Session utilities
│   │   ├── api.ts              # API response helpers
│   │   └── validations.ts      # Zod schemas
│   └── middleware.ts           # Next.js middleware
├── prisma/
│   └── schema.prisma           # Database schema
├── .env.local                  # Environment variables
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
Create a `.env.local` file with:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/football_club"

# NextAuth
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (Optional)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@footballclub.pk"

# Club Settings
CLUB_NAME="United FC Lahore"
CLUB_EMAIL="info@unitedfc.pk"
CLUB_PHONE="+92-300-1234567"
```

3. **Set up the database**
```bash
npx prisma migrate dev --name init
```

4. **Start the development server**
```bash
npm run dev
```

Access the application at `http://localhost:3000`

## 📋 Features Implemented

### ✅ A. Public Viewer (Fan Experience)

- **Home Page** - Hero section, next match countdown, club highlights
- **The Squad** - Player gallery with filters by position
- **Fixtures & Results** - Match schedule and past results
- **Join Us / Trials** - Trial registration form
- **Responsive Design** - Works on all devices

### 🔄 B. Player Portal (In Progress)

- Dashboard with next match/training
- Training schedule calendar
- Match call-ups notification
- Personal stats view
- Announcements section

### 🔄 C. Admin Control Panel (In Progress)

- Content management system
- Fixture management
- Squad management
- Training scheduler
- Trial application review
- Player statistics updates

## 🔐 Authentication & Authorization

- NextAuth.js with JWT tokens
- Role-based access: `FAN`, `PLAYER`, `ADMIN`
- Secure password hashing with bcryptjs

## 🧪 Testing

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## 🚀 Deployment

Deploy to Vercel:
1. Push to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## 📞 Support

For issues or questions: info@unitedfc.pk

---

**Built with ⚽ passion for United FC Lahore**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
