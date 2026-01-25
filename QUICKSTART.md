# ⚡ United FC - Quick Start Guide

Get the United FC application up and running in 5 minutes!

## 🚀 Quick Start

### Step 1: Install Dependencies (1 min)
```bash
npm install
```

### Step 2: Configure Database (2 min)

1. **Ensure PostgreSQL is running**

2. **Create `.env.local` file with:**
```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/football_club"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="http://localhost:3000"
```

3. **Generate NEXTAUTH_SECRET:**
   - Windows PowerShell: `[System.Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))`
   - Mac/Linux: `openssl rand -base64 32`

### Step 3: Setup Database (1 min)
```bash
npm run prisma:migrate
npm run prisma:seed
```

### Step 4: Start Server (1 min)
```bash
npm run dev
```

### Step 5: Access Application (0 min)
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Test the Application

### Public Pages (No Login)
- **Home:** http://localhost:3000
- **Squad:** http://localhost:3000/squad
- **Fixtures:** http://localhost:3000/fixtures
- **About:** http://localhost:3000/about
- **Join Us:** http://localhost:3000/join
- **Contact:** http://localhost:3000/contact

### Login & Explore

**Admin Account:**
- Go to: http://localhost:3000/auth/login
- Email: `admin@unitedfc.pk`
- Password: `admin123`
- Access: http://localhost:3000/admin/dashboard

**Player Account:**
- Go to: http://localhost:3000/auth/login
- Email: `player1@unitedfc.pk`
- Password: `player123`
- Access: http://localhost:3000/player/dashboard

### Create Your Own Account
- Go to: http://localhost:3000/auth/register
- Create a new account as "Player" or "Fan"
- Login with your credentials

## 🔥 Key Features to Try

1. **Home Page**
   - View next match countdown timer
   - Click "View Squad" to see players

2. **Squad Page**
   - Filter players by position
   - Click on a player to see detailed profile

3. **Fixtures Page**
   - View upcoming matches
   - Check past results

4. **Join Us**
   - Submit trial registration form
   - Get confirmation message

5. **Player Dashboard** (After login as player)
   - View next match and training
   - Access announcements

6. **Admin Dashboard** (After login as admin)
   - View club statistics
   - Access management tools

## 📝 Common Tasks

### View Database with GUI
```bash
npm run prisma:studio
# Opens at http://localhost:5555
```

### Create a New Player
Use the Admin panel or API call:
```bash
curl -X POST http://localhost:3000/api/players \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Player Name",
    "jerseyNumber": 7,
    "position": "MIDFIELDER",
    "dateOfBirth": "2000-01-01T00:00:00Z",
    "nationality": "Pakistan"
  }'
```

### Reset Database
```bash
npm run db:reset
npm run prisma:seed
```

## ⚠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Database error | Check PostgreSQL running + correct DATABASE_URL |
| Can't login | Verify seed ran: `npm run prisma:seed` |
| TypeScript error | Run `npm run build` for detailed errors |

## 📚 Learn More

- **Full Documentation:** See [DOCUMENTATION.md](DOCUMENTATION.md)
- **Setup Guide:** See [SETUP.md](SETUP.md)
- **Project Info:** See [README.md](README.md)

## 🎯 Next Steps

1. ✅ Application is running
2. ✅ Database is configured
3. ✅ Test accounts are ready
4. 📖 Read [DOCUMENTATION.md](DOCUMENTATION.md) for detailed features
5. 🛠️ Explore the code and customize for your needs

## 💡 Tips

- **Auto-reload:** Changes to code auto-reload in browser
- **Hot Module Reload:** CSS changes appear instantly
- **Prisma Studio:** Great for viewing/editing database
- **Browser DevTools:** Use F12 to inspect elements
- **Network Tab:** Monitor API calls in DevTools

---

**You're all set! Start building! ⚽🚀**

Need help? Check [DOCUMENTATION.md](DOCUMENTATION.md) or [SETUP.md](SETUP.md)
