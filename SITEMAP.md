# 🗺️ United FC - Site Map & Page Guide

Complete guide to all pages and routes in the United FC application.

## 📍 Public Pages (No Authentication Required)

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero, countdown, club highlights |
| **Squad** | `/squad` | Player gallery with filters |
| **Fixtures** | `/fixtures` | Matches and results |
| **Join Us** | `/join` | Trial registration form |
| **About** | `/about` | Club history and mission |
| **Contact** | `/contact` | Contact form and info |

## 🔐 Authentication Pages

| Page | Route | Description |
|------|-------|-------------|
| **Login** | `/auth/login` | User login form |
| **Register** | `/auth/register` | New account creation |

## 👤 Player Portal (PLAYER role required)

| Page | Route | Status | Description |
|------|-------|--------|-------------|
| **Dashboard** | `/player/dashboard` | ✅ Complete | Personalized player view |
| **Training Schedule** | `/player/schedule` | 🔄 Template | Calendar view |
| **Match Call-ups** | `/player/callups` | 🔄 Template | Squad selection |
| **My Stats** | `/player/stats` | 🔄 Template | Performance data |
| **Announcements** | `/player/announcements` | 🔄 Template | Club notices |

## ⚙️ Admin Panel (ADMIN role required)

| Page | Route | Status | Description |
|------|-------|--------|-------------|
| **Dashboard** | `/admin/dashboard` | ✅ Complete | Admin overview |
| **Squad Management** | `/admin/squad` | 🔄 Template | Player CRUD |
| **Fixture Management** | `/admin/fixtures` | 🔄 Template | Match management |
| **Training Manager** | `/admin/training` | 🔄 Template | Training sessions |
| **Content Management** | `/admin/content` | 🔄 Template | News & blogs |
| **Trial Applications** | `/admin/trials` | 🔄 Template | Trial reviews |
| **Statistics** | `/admin/statistics` | 🔄 Template | Player stats |

## 🔗 API Routes

### Authentication
- `POST /api/auth/[...nextauth]` - NextAuth handler
- `POST /api/auth/register` - User registration

### Players
- `GET /api/players` - List all players
- `GET /api/players?position=MIDFIELDER` - Filter by position

### Fixtures
- `GET /api/fixtures/upcoming` - Upcoming matches
- `GET /api/fixtures/next` - Next fixture
- `GET /api/fixtures/results` - Past results

### Trials
- `POST /api/trials` - Submit registration
- `GET /api/trials` - List applications

## 📊 Page Statistics

| Category | Count | Status |
|----------|-------|--------|
| Public Pages | 6 | ✅ Complete |
| Auth Pages | 2 | ✅ Complete |
| Player Pages | 5 | 🔄 Partial |
| Admin Pages | 7 | 🔄 Partial |
| API Routes | 8 | ✅ Complete |
| **Total** | **28** | - |

## 🎯 User Journey Maps

### New Visitor Journey
```
Home → About → Squad → Fixtures → Join → (Contact)
```

### Player Journey
```
Login → Player Dashboard → Training Schedule → Stats → Announcements
```

### Admin Journey
```
Login → Admin Dashboard → Squad/Fixtures/Training/Content/Trials/Stats
```

### Trial Registration Journey
```
Home → Join Us → Fill Form → Success Page
```

## 🔄 Navigation Structure

### Main Navigation Bar
```
Logo / Home
├── Home (/)
├── About (/about)
├── Squad (/squad)
├── Fixtures (/fixtures)
├── Join Us (/join)
├── Contact (/contact)
└── Login (/auth/login) [or Dashboard if authenticated]
```

### Authenticated User Menu
```
Depending on Role:
├── PLAYER
│   └── Dashboard (/player/dashboard)
├── ADMIN
│   └── Admin (/admin/dashboard)
└── Logout
```

## 📱 Responsive Behavior

- **Mobile (< 768px):**
  - Hamburger menu navigation
  - Single column layouts
  - Touch-optimized buttons
  - Full-width content

- **Tablet (768px - 1024px):**
  - Side navigation menu
  - 2-column grids
  - Optimized spacing

- **Desktop (> 1024px):**
  - Full navigation bar
  - Multi-column layouts
  - Enhanced spacing and sizing

## 🎨 Page Hierarchy

### Level 1 - Root Pages
- `/` - Home
- `/auth/login` - Login
- `/auth/register` - Register

### Level 2 - Public Sections
- `/squad` - Squad
- `/fixtures` - Fixtures
- `/about` - About
- `/join` - Join Us
- `/contact` - Contact

### Level 3 - Authenticated Areas
- `/player/*` - Player Portal
- `/admin/*` - Admin Panel

### Level 4 - Sub-pages
- `/player/dashboard`
- `/player/schedule`
- `/player/callups`
- `/player/stats`
- `/player/announcements`
- `/admin/squad`
- `/admin/fixtures`
- `/admin/training`
- `/admin/content`
- `/admin/trials`
- `/admin/statistics`

## 🔐 Access Control Matrix

| Route | Public | Player | Admin | Notes |
|-------|--------|--------|-------|-------|
| `/` | ✅ | ✅ | ✅ | Home page |
| `/squad` | ✅ | ✅ | ✅ | Public squad |
| `/fixtures` | ✅ | ✅ | ✅ | Public fixtures |
| `/about` | ✅ | ✅ | ✅ | Public info |
| `/join` | ✅ | ✅ | ✅ | Trial form |
| `/contact` | ✅ | ✅ | ✅ | Contact page |
| `/auth/login` | ✅ | ❌ | ❌ | Redirects if logged in |
| `/auth/register` | ✅ | ❌ | ❌ | Redirects if logged in |
| `/player/*` | ❌ | ✅ | ❌ | Protected |
| `/admin/*` | ❌ | ❌ | ✅ | Protected |

## 📲 Mobile Navigation

On mobile devices, navigation is accessed via hamburger menu:

```
Menu ☰
├── Home
├── About
├── Squad
├── Fixtures
├── Join Us
├── Contact
├── [Dashboard if logged in]
└── [Logout if logged in]
```

## 🔗 Quick Links

### For New Users
1. Home: `/`
2. About: `/about`
3. Squad: `/squad`
4. Join Us: `/join`

### For Players
1. Login: `/auth/login`
2. Register: `/auth/register`
3. Dashboard: `/player/dashboard`

### For Admins
1. Login: `/auth/login`
2. Dashboard: `/admin/dashboard`

### For Contacting
1. Contact: `/contact`
2. Join Us: `/join`

## 📊 Content Breakdown

### Home Page Content
- Hero section with countdown
- Club highlights (3 cards)
- Call-to-action section
- Next match details

### Squad Page Content
- Filter buttons (5 positions + all)
- Player cards (grid layout)
- Player detail modal
- Statistics display

### Fixtures Page Content
- Tab navigation (upcoming/results)
- Match cards list
- Match details
- Match report links

### Join Us Page Content
- Registration form (5 fields)
- Success confirmation
- What to expect section (3 cards)

### About Page Content
- Club history
- Mission & Vision (2 cards)
- Management profiles (3 cards)
- Club values (4 cards)
- Call-to-action

### Contact Page Content
- Contact information (4 items)
- Contact form (4 fields)
- Social media links
- Map placeholder

## 🎯 Feature Pages Status

### ✅ Complete & Ready
- [x] Home page
- [x] Squad page
- [x] Fixtures page
- [x] Join Us page
- [x] About page
- [x] Contact page
- [x] Login page
- [x] Register page
- [x] Player dashboard
- [x] Admin dashboard

### 🔄 Template Pages (Ready for development)
- [ ] Player training schedule
- [ ] Player match call-ups
- [ ] Player stats
- [ ] Player announcements
- [ ] Admin squad management
- [ ] Admin fixture management
- [ ] Admin training management
- [ ] Admin content management
- [ ] Admin trial applications
- [ ] Admin statistics

---

## 🚀 Next Steps

1. **Test all pages:** Visit each URL and verify functionality
2. **Customize content:** Update club information, images, colors
3. **Complete templates:** Develop the 🔄 template pages
4. **Add real data:** Populate with actual club/player information
5. **Deploy:** Follow deployment guide in SETUP.md

---

**Last Updated:** January 23, 2026
**Version:** 1.0.0
