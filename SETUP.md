# 🚀 United FC - Setup and Installation Guide

Complete step-by-step guide to set up and run the United FC football club management system.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** 18+ ([Download](https://nodejs.org))
- **npm** 9+ (comes with Node.js)
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

## 🔧 Step 1: Database Setup

### Create PostgreSQL Database

1. **Open PostgreSQL Command Line or pgAdmin**

2. **Create a new database:**
```sql
CREATE DATABASE football_club;
```

3. **Create a database user (optional but recommended):**
```sql
CREATE USER football_user WITH PASSWORD 'your_secure_password';
ALTER ROLE football_user WITH CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE football_club TO football_user;
```

4. **Note down your connection string:**
```
postgresql://football_user:your_secure_password@localhost:5432/football_club
```

## 📦 Step 2: Project Installation

### 1. Navigate to Project Directory
```bash
cd united
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Database Configuration
DATABASE_URL="postgresql://football_user:your_secure_password@localhost:5432/football_club"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Service (Optional - for notifications)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@footballclub.pk"

# Club Settings
CLUB_NAME="United FC Lahore"
CLUB_EMAIL="info@unitedfc.pk"
CLUB_PHONE="+92-300-1234567"
```

### Generate NEXTAUTH_SECRET

Run this command in PowerShell/Terminal:

**Windows (PowerShell):**
```powershell
[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in `.env.local`

## 🗄️ Step 3: Database Migration

### 1. Create Database Tables

```bash
npm run prisma:migrate
```

When prompted, enter a migration name (e.g., `init`)

### 2. Seed Sample Data (Optional)

```bash
npm run prisma:seed
```

This creates:
- Admin user (admin@unitedfc.pk / admin123)
- Sample player (player1@unitedfc.pk / player123)
- Sample fixtures
- Training sessions
- News articles

## ▶️ Step 4: Start Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

## 📱 Step 5: Access the Application

### Public Pages (No Login Required)
- **Home:** http://localhost:3000
- **Squad:** http://localhost:3000/squad
- **Fixtures:** http://localhost:3000/fixtures
- **About:** http://localhost:3000/about
- **Contact:** http://localhost:3000/contact
- **Join Us:** http://localhost:3000/join

### Authentication
- **Login:** http://localhost:3000/auth/login
- **Register:** http://localhost:3000/auth/register

### Admin Panel (Requires Admin Login)
- **Dashboard:** http://localhost:3000/admin/dashboard

### Player Portal (Requires Player Login)
- **Dashboard:** http://localhost:3000/player/dashboard

## 👤 Test Credentials

After seeding the database:

### Admin Account
```
Email: admin@unitedfc.pk
Password: admin123
```

### Player Account
```
Email: player1@unitedfc.pk
Password: player123
```

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start development server

# Building
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run prisma:migrate   # Create/run migrations
npm run prisma:studio    # Open Prisma Studio (GUI database browser)
npm run prisma:seed      # Seed database with sample data
npm run db:reset         # Reset database (WARNING: deletes all data)

# Code Quality
npm run lint             # Run ESLint
```

## 🔍 Prisma Studio

View and manage your database visually:

```bash
npm run prisma:studio
```

This opens Prisma Studio at http://localhost:5555

## 🐛 Troubleshooting

### Issue: "Cannot find module 'next-auth'"
**Solution:**
```bash
npm install
```

### Issue: Database connection error
**Check:**
1. PostgreSQL is running
2. DATABASE_URL is correct in `.env.local`
3. Database exists: `CREATE DATABASE football_club;`
4. User has proper permissions

### Issue: Port 3000 already in use
**Solution:**
```bash
npm run dev -- -p 3001
# or kill the process using port 3000
```

### Issue: Migration error
**Solution:**
```bash
npm run db:reset
npm run prisma:migrate
npm run prisma:seed
```

## 📝 Project Structure

```
united/
├── src/
│   ├── app/
│   │   ├── api/              # API Routes
│   │   ├── auth/             # Auth pages
│   │   ├── player/           # Player Portal
│   │   ├── admin/            # Admin Panel
│   │   ├── squad/            # Squad page
│   │   ├── fixtures/         # Fixtures page
│   │   ├── join/             # Trial registration
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   └── Navigation.tsx    # Navigation component
│   ├── lib/
│   │   ├── auth.ts           # NextAuth config
│   │   ├── prisma.ts         # Prisma client
│   │   ├── api.ts            # API helpers
│   │   └── validations.ts    # Zod schemas
│   └── middleware.ts         # Auth middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed script
├── .env.local                # Environment variables
├── package.json
└── README.md
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Import project

3. **Set Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Deploy Database**
   - Use Vercel Postgres or external PostgreSQL provider
   - Update DATABASE_URL in Vercel

5. **Deploy**
   - Click "Deploy"

### Self-Hosted Deployment

1. **Build for production:**
```bash
npm run build
```

2. **Start production server:**
```bash
npm run start
```

3. **Use process manager (PM2):**
```bash
npm install -g pm2
pm2 start "npm run start" --name "united-fc"
pm2 save
pm2 startup
```

## 📞 Support

For issues or questions:
- Email: info@unitedfc.pk
- Phone: +92-300-1234567

## 📄 Next Steps

1. **Database Setup:** Configure PostgreSQL
2. **Environment Variables:** Create `.env.local`
3. **Migrations:** Run `npm run prisma:migrate`
4. **Seed Data:** Run `npm run prisma:seed`
5. **Start Server:** Run `npm run dev`
6. **Test Application:** Visit http://localhost:3000

---

**Happy coding! ⚽**
