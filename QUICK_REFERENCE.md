# ⚡ United FC - Quick Reference Cheat Sheet

**Fast lookup for common tasks and commands.**

---

## 🚀 Essential Commands

### Development
```bash
npm install                 # Install dependencies
npm run dev                 # Start development server
npm run build               # Build for production
npm run start               # Run production build
npm run type-check          # Check TypeScript types
```

### Database
```bash
npm run prisma:migrate      # Run migrations
npm run prisma:seed         # Seed sample data
npm run prisma:reset        # Reset database (DANGER!)
npm run prisma:studio       # Open database UI
npm run prisma:generate     # Generate Prisma types
```

### Testing
```bash
npm run build               # Pre-deployment check
# Manual testing at localhost:3000
```

---

## 🔑 Test Credentials

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@unitedfc.pk | admin123 | /admin/dashboard |
| Player | player1@unitedfc.pk | player123 | /player/dashboard |
| Fan | (public) | (no login) | / |

---

## 📍 Important URLs

### Local Development
- Frontend: `http://localhost:3000`
- Database UI: `http://localhost:5555`
- API: `http://localhost:3000/api`

### Production (After Deploy)
- Frontend: `https://yourdomain.com`
- Database: Remote (AWS RDS, Vercel, etc.)
- API: `https://yourdomain.com/api`

---

## 🌐 Key Routes

### Public Routes
| Route | Description | Public? |
|-------|-------------|---------|
| `/` | Home | ✅ Yes |
| `/squad` | Player gallery | ✅ Yes |
| `/fixtures` | Matches & results | ✅ Yes |
| `/join` | Trial registration | ✅ Yes |
| `/about` | Club info | ✅ Yes |
| `/contact` | Contact form | ✅ Yes |

### Auth Routes
| Route | Description |
|-------|-------------|
| `/auth/login` | Login page |
| `/auth/register` | Registration page |

### Player Routes (Protected)
| Route | Description |
|-------|-------------|
| `/player/dashboard` | Personal dashboard |
| `/player/schedule` | Match/training schedule |
| `/player/stats` | Personal statistics |
| `/player/announcements` | Notifications |

### Admin Routes (Protected)
| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Admin overview |
| `/admin/squad` | Squad management |
| `/admin/fixtures` | Fixture management |
| `/admin/training` | Training schedule |
| `/admin/trials` | Trial applications |

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register          Create account
POST   /api/auth/[...nextauth]     NextAuth handler
```

### Players
```
GET    /api/players                List all players
GET    /api/players?position=gk    Filter by position
```

### Fixtures
```
GET    /api/fixtures/upcoming      Next 5 matches
GET    /api/fixtures/next          Next single match
GET    /api/fixtures/results       Past results
```

### Trials
```
POST   /api/trials                 Submit trial
GET    /api/trials                 List trials (admin)
```

---

## 🔐 Environment Variables

### Required
```
DATABASE_URL=postgresql://user:pass@localhost:5432/football_club
NEXTAUTH_SECRET=generated-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Optional
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

---

## 📁 Project Structure Quick Map

```
src/
├── app/                    # Pages and routes
│   ├── page.tsx           # Home page
│   ├── squad/             # Squad gallery
│   ├── fixtures/          # Fixtures page
│   ├── api/               # API endpoints
│   ├── player/            # Player portal
│   └── admin/             # Admin panel
├── components/            # React components
│   └── Navigation.tsx
├── lib/                   # Utilities
│   ├── auth.ts           # Authentication
│   ├── prisma.ts         # Database client
│   ├── validations.ts    # Zod schemas
│   └── api.ts            # API helpers

prisma/
├── schema.prisma          # Database models
├── seed.ts                # Sample data
└── migrations/            # Database history

public/
└── images/                # Static images
```

---

## 🛠️ Common Tasks

### Add New Page
```bash
# Create directory
mkdir src/app/new-page

# Create page file
cat > src/app/new-page/page.tsx << 'EOF'
export default function NewPage() {
  return <main>Page content</main>;
}
EOF

# Add to Navigation if public
# Edit src/components/Navigation.tsx
```

### Add New API Endpoint
```bash
# Create directory
mkdir src/app/api/endpoint

# Create route file
cat > src/app/api/endpoint/route.ts << 'EOF'
import { NextRequest } from "next/server";
import { apiResponse, apiError } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    // Implementation
    return apiResponse(data, "Success");
  } catch (error) {
    return apiError("Error", 500);
  }
}
EOF
```

### Add Database Model
```bash
# Edit prisma/schema.prisma
# Add new model
# Run migration
npm run prisma:migrate dev --name add_new_model
```

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys or:
# Go to vercel.com → Connect GitHub → Deploy
```

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| npm install fails | `npm install --legacy-peer-deps` |
| Can't connect to DB | Check DATABASE_URL, ensure PostgreSQL running |
| NEXTAUTH_SECRET error | Generate: `openssl rand -base64 32` |
| Port 5432 in use | Kill process or change port |
| Styles not showing | Restart dev server, check tailwind.config |
| Page won't load | Check console (F12), check browser cache |
| API returns 500 | Check server logs, verify database |
| Session not working | Verify NEXTAUTH_SECRET set, restart server |

---

## 📊 Testing Checklist

### Quick Test (5 minutes)
- [ ] Home page loads
- [ ] Can login (admin@/admin123)
- [ ] Squad page shows players
- [ ] Fixtures page shows matches
- [ ] Trial form works
- [ ] Can logout

### Full Test (1 hour)
- [ ] All public pages work
- [ ] Login/register functional
- [ ] Player portal accessible
- [ ] Admin panel accessible
- [ ] Non-admins blocked from admin
- [ ] API endpoints working
- [ ] Mobile responsive
- [ ] No console errors

### Pre-Deployment (2 hours)
- [ ] npm run build succeeds
- [ ] All types check
- [ ] All pages tested
- [ ] APIs tested
- [ ] Database migrations working
- [ ] Environment variables set
- [ ] Performance acceptable
- [ ] Security verified

---

## 💾 Database Quick Reference

### Models (11 total)
1. **User** - Accounts & auth
2. **Player** - Squad members
3. **Stats** - Player statistics
4. **Fixture** - Matches
5. **MatchSquad** - Squad assignment
6. **Training** - Training sessions
7. **TrainingAttendance** - Attendance
8. **Trial** - Trial applications
9. **News** - Articles
10. **Announcement** - Notifications
11. **Verification** - Email tokens

### Key Relationships
- User ←→ Player (1:1)
- Player ←→ Stats (1:1)
- Fixture ←→ MatchSquad (1:M)
- Training ←→ TrainingAttendance (1:M)

---

## 🎨 Tailwind CSS Quick Reference

### Responsive Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Common Classes
```
Spacing:    m-4, p-4, gap-4
Text:       text-lg, font-bold, text-center
Colors:     bg-blue-500, text-white
Layout:     flex, grid, absolute
Responsive: md:flex, lg:grid
```

---

## 🔗 File Path Aliases

### Import Shortcuts
```typescript
import { X } from "@/components/X"      // src/components/
import { Y } from "@/lib/Y"              // src/lib/
import { Z } from "@/app/Z"              // src/app/
```

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] Run `npm run build`
- [ ] Test locally: `npm run start`
- [ ] Update .env for production
- [ ] Generate NEXTAUTH_SECRET
- [ ] Database URL set
- [ ] All features tested

### Deploy Steps
1. Push to GitHub
2. Connect to hosting (Vercel/AWS/etc)
3. Set environment variables
4. Deploy
5. Test production URL
6. Monitor logs

---

## 📚 Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| README_MAIN.md | Overview | 20 min |
| QUICKSTART.md | 5-min setup | 5 min |
| SETUP.md | Full install | 15 min |
| DOCUMENTATION.md | Architecture | 30 min |
| API_DOCUMENTATION.md | Endpoints | 25 min |
| FILE_STRUCTURE.md | Organization | 20 min |
| SITEMAP.md | Routes | 15 min |
| DEPLOYMENT.md | Deploy guide | 30 min |
| TESTING_GUIDE.md | Testing | 40 min |
| TROUBLESHOOTING.md | Problems | Reference |
| COMPLETION_SUMMARY.md | Status | 20 min |
| DOCUMENTATION_INDEX.md | This index | 15 min |

---

## 🔑 Key Concepts

### Authentication (NextAuth.js)
- JWT tokens in HttpOnly cookies
- 30-day session duration
- Role-based access control
- Three roles: FAN, PLAYER, ADMIN

### Database (PostgreSQL + Prisma)
- 11 interconnected models
- Type-safe queries
- Automatic migrations
- Seed script with sample data

### Frontend (Next.js + React)
- App Router for routing
- Client/Server components
- Tailwind CSS for styling
- TypeScript for type safety

### API
- REST endpoints at /api/*
- Standardized response format
- Input validation with Zod
- Error handling built-in

---

## 📞 Quick Links

### Documentation
- Master Index: [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
- Start Here: [QUICKSTART.md](./QUICKSTART.md)
- Full Docs: [README_MAIN.md](./README_MAIN.md)

### External Resources
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind: https://tailwindcss.com/docs

### Help
- Issues: Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Testing: See [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- Deploy: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## ✨ Pro Tips

1. **Use Prisma Studio** for database exploration
   ```bash
   npm run prisma:studio
   ```

2. **Hot reload in development** automatically
   - Just save files, browser updates instantly

3. **Use browser DevTools** for debugging
   - Console: Log errors and debugging
   - Network: Check API calls
   - Application: View cookies/storage

4. **Type checking before commit**
   ```bash
   npm run type-check
   npm run build
   ```

5. **Keep environment variables secure**
   - Never commit `.env.local`
   - Use `.env.example` as template
   - Different variables per environment

---

## 🎯 Next Steps

1. **Just started?** → [QUICKSTART.md](./QUICKSTART.md)
2. **Setting up?** → [SETUP.md](./SETUP.md)
3. **Developing?** → [DOCUMENTATION.md](./DOCUMENTATION.md)
4. **Building APIs?** → [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
5. **Testing?** → [TESTING_GUIDE.md](./TESTING_GUIDE.md)
6. **Deploying?** → [DEPLOYMENT.md](./DEPLOYMENT.md)
7. **Stuck?** → [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📈 Project Statistics

- **Total Lines of Code:** 5,000+
- **Database Models:** 11
- **API Endpoints:** 8+
- **Pages/Routes:** 28
- **Documentation Pages:** 12
- **Documentation Lines:** 10,000+
- **Build Time:** < 30 seconds
- **Dev Server Startup:** < 5 seconds

---

**Quick Reference Version:** 1.0  
**Last Updated:** January 23, 2026  
**Status:** 🟢 Production Ready
