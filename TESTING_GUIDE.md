# 🧪 Testing Guide - United FC

Complete testing procedures for all features and functionalities.

---

## Quick Testing Checklist

### Pre-Testing Setup
- [ ] Run `npm run dev`
- [ ] Access http://localhost:3000
- [ ] Check console for errors
- [ ] Verify database connection

---

## 1. Authentication Testing

### Register New Account

**Test Case: Register - Success**
```
Steps:
1. Navigate to /auth/register
2. Fill form:
   - Email: test@example.com
   - Full Name: Test User
   - Phone: +92-300-1234567
   - Password: Test123456
   - Confirm Password: Test123456
3. Click "Register"

Expected Result:
✅ Account created successfully
✅ Redirected to login page
✅ Success message shown
```

**Test Case: Register - Email Already Exists**
```
Steps:
1. Navigate to /auth/register
2. Use email: admin@unitedfc.pk
3. Fill other fields
4. Click "Register"

Expected Result:
❌ Error message: "Email already exists"
✅ Stay on register page
✅ Form data preserved
```

**Test Case: Register - Validation Errors**
```
Test Scenarios:
1. Empty email → Error: "Email is required"
2. Invalid email format → Error: "Invalid email"
3. Short password < 6 chars → Error: "At least 6 characters"
4. Passwords don't match → Error: "Passwords must match"
5. Empty full name → Error: "Full name is required"

Expected Result:
✅ Validation errors shown
✅ Cannot submit form
```

### Login

**Test Case: Login - Valid Credentials**
```
Steps:
1. Navigate to /auth/login
2. Enter credentials:
   - Email: admin@unitedfc.pk
   - Password: admin123
3. Click "Login"

Expected Result:
✅ Session created
✅ Redirected to /admin/dashboard
✅ User name displayed in navigation
```

**Test Case: Login - Invalid Credentials**
```
Steps:
1. Navigate to /auth/login
2. Enter:
   - Email: admin@unitedfc.pk
   - Password: wrongpassword
3. Click "Login"

Expected Result:
❌ Error message shown
✅ Stay on login page
✅ Password cleared
```

**Test Case: Login - Invalid Email**
```
Steps:
1. Navigate to /auth/login
2. Enter:
   - Email: nonexistent@example.com
   - Password: test123
3. Click "Login"

Expected Result:
❌ Error message shown
✅ Stay on login page
```

### Logout

**Test Case: Logout**
```
Steps:
1. Login with admin@unitedfc.pk/admin123
2. Click user menu in navigation
3. Click "Logout"

Expected Result:
✅ Session cleared
✅ Redirected to home page
✅ "Login" button shown in navigation
```

---

## 2. Public Pages Testing

### Home Page

**Test Case: Home Page - Countdown Timer**
```
Steps:
1. Navigate to /
2. Observe countdown timer above hero

Expected Result:
✅ Timer displays: Days, Hours, Minutes, Seconds
✅ Timer counts down in real-time
✅ Format shows "Next Match In: X days, Y hours, Z minutes, W seconds"
```

**Test Case: Home Page - Next Match Card**
```
Steps:
1. Home page loads
2. Look for "Next Match" card

Expected Result:
✅ Next fixture displayed
✅ Shows opponent team name
✅ Shows match date/time
✅ Shows venue information
```

**Test Case: Home Page - Responsive**
```
Steps:
1. Open home page
2. Resize to mobile (< 768px)
3. Observe layout

Expected Result:
✅ Logo and hamburger menu visible
✅ Content stacks vertically
✅ All text readable
✅ Images scale properly
```

### Squad Page

**Test Case: Squad Gallery - Display**
```
Steps:
1. Navigate to /squad
2. Observe player cards

Expected Result:
✅ Player images load
✅ Player names displayed
✅ Positions shown (GK, DEF, MID, FWD)
✅ Jersey numbers visible
```

**Test Case: Squad Gallery - Position Filter**
```
Steps:
1. On /squad page
2. Click position buttons (Goalkeeper, Defender, etc.)

Expected Result:
✅ Players filtered by position
✅ Only selected position shown
✅ Player count updates
✅ Clear all button works
```

**Test Case: Squad Gallery - Player Detail Modal**
```
Steps:
1. On /squad page
2. Click player card

Expected Result:
✅ Modal opens with player details
✅ Shows full stats (games, goals, assists)
✅ Player image displays
✅ Close button (X) works
✅ Click outside modal closes it
```

### Fixtures Page

**Test Case: Fixtures - Upcoming Tab**
```
Steps:
1. Navigate to /fixtures
2. Observe "Upcoming" tab (default)

Expected Result:
✅ Next 5 matches displayed
✅ Each fixture shows:
   - Home team vs Away team
   - Date and time
   - Venue
   - Status (Scheduled)
```

**Test Case: Fixtures - Results Tab**
```
Steps:
1. Navigate to /fixtures
2. Click "Results" tab

Expected Result:
✅ Past matches displayed
✅ Shows final scores
✅ Each result shows:
   - Team names
   - Final score
   - Date
   - Status (Completed)
```

**Test Case: Fixtures - Tab Navigation**
```
Steps:
1. On /fixtures page
2. Switch between Upcoming and Results tabs

Expected Result:
✅ Tab content changes
✅ Active tab highlighted
✅ Smooth transition
```

### Join Page (Trial Registration)

**Test Case: Trial Registration - Valid**
```
Steps:
1. Navigate to /join
2. Fill form:
   - Full Name: Muhammad Ali
   - Email: ali@example.com
   - Phone: +92-300-9876543
   - Age: 22
   - Position: Forward
   - Height: 185
   - Weight: 75
   - Current Club: Local Academy
   - Experience: 5 years
3. Click "Submit Application"

Expected Result:
✅ Application submitted
✅ Success message shown
✅ Form cleared
✅ Confirmation details displayed
```

**Test Case: Trial Registration - Invalid Age**
```
Steps:
1. On /join page
2. Enter age: 10
3. Try to submit

Expected Result:
❌ Error: "Age must be between 15 and 50"
✅ Form not submitted
```

**Test Case: Trial Registration - Validation**
```
Test missing fields:
1. Empty full name
2. Invalid email
3. Empty phone
4. Invalid position

Expected Result:
✅ Error message for each field
✅ Cannot submit with missing data
```

### About Page

**Test Case: About Page - Load**
```
Steps:
1. Navigate to /about

Expected Result:
✅ Page loads successfully
✅ Club information displayed
✅ History section visible
✅ Mission/vision shown
✅ Team information visible
```

### Contact Page

**Test Case: Contact Page - Contact Form**
```
Steps:
1. Navigate to /contact
2. Fill contact form:
   - Name: Test User
   - Email: test@example.com
   - Subject: Test inquiry
   - Message: Test message
3. Click "Send"

Expected Result:
✅ Form submitted (or appropriate response)
✅ Success message shown
✅ Form cleared
```

**Test Case: Contact Page - Contact Information**
```
Steps:
1. Navigate to /contact

Expected Result:
✅ Phone number displayed
✅ Email address shown
✅ Physical address visible
✅ Map embedded (if available)
✅ Social media links present
```

---

## 3. Player Portal Testing

### Player Authentication

**Test Case: Player Login**
```
Steps:
1. Navigate to /auth/login
2. Enter:
   - Email: player1@unitedfc.pk
   - Password: player123
3. Click "Login"

Expected Result:
✅ Session created
✅ Redirected to /player/dashboard
✅ Player can access protected routes
```

### Player Dashboard

**Test Case: Player Dashboard - Access**
```
Steps:
1. Login as player1@unitedfc.pk/player123
2. Navigate to /player/dashboard

Expected Result:
✅ Dashboard loads
✅ Welcome message shown
✅ Player information displayed
✅ Quick stat cards visible
```

**Test Case: Player Dashboard - Next Match**
```
Steps:
1. On player dashboard
2. Look for "Next Match" card

Expected Result:
✅ Upcoming match shown
✅ Opponent displayed
✅ Date/time visible
✅ Venue shown
```

**Test Case: Player Dashboard - Next Training**
```
Steps:
1. On player dashboard
2. Look for "Next Training" card

Expected Result:
✅ Upcoming training shown
✅ Time and location visible
✅ Training type displayed
```

### Player Schedule

**Test Case: Player Schedule - Page Load**
```
Steps:
1. Login as player
2. Navigate to /player/schedule

Expected Result:
✅ Page loads
✅ Schedule displays
✅ Training sessions listed
✅ Match dates shown
```

### Player Statistics

**Test Case: Player Stats - Display**
```
Steps:
1. Login as player
2. Navigate to /player/stats

Expected Result:
✅ Personal stats displayed:
   - Games played
   - Goals scored
   - Assists
   - Cards received
✅ Chart/graph visualization (if implemented)
```

### Unauthorized Access

**Test Case: Player Route - Unauthorized**
```
Steps:
1. Logout if logged in
2. Try to access /player/dashboard directly

Expected Result:
❌ Redirected to /auth/login
✅ Cannot access without authentication
```

---

## 4. Admin Panel Testing

### Admin Authentication

**Test Case: Admin Login**
```
Steps:
1. Navigate to /auth/login
2. Enter:
   - Email: admin@unitedfc.pk
   - Password: admin123
3. Click "Login"

Expected Result:
✅ Session created
✅ Redirected to /admin/dashboard
✅ Admin can access all routes
```

### Admin Dashboard

**Test Case: Admin Dashboard - Display**
```
Steps:
1. Login as admin@unitedfc.pk/admin123
2. Navigate to /admin/dashboard

Expected Result:
✅ Dashboard loads
✅ Statistics cards displayed
✅ Management sections visible
✅ Quick action buttons shown
```

**Test Case: Admin Dashboard - Stats Cards**
```
Steps:
1. On admin dashboard
2. Observe stat cards

Expected Result:
✅ Total players count
✅ Upcoming fixtures count
✅ Recent trials count
✅ Active announcements count
```

### Admin Menu Items

**Test Case: Admin Navigation**
```
Steps:
1. Login as admin
2. Look for admin menu

Expected Result:
✅ Squad Management link
✅ Fixtures Management link
✅ Training Management link
✅ Content Management link
✅ Trial Applications link
✅ Statistics link
✅ All links functional
```

### Unauthorized - Admin Routes

**Test Case: Admin Route - Player Access**
```
Steps:
1. Login as player1@unitedfc.pk/player123
2. Try to access /admin/dashboard

Expected Result:
❌ Access denied (403 or redirect)
✅ Cannot access admin panel
```

**Test Case: Admin Route - No Authentication**
```
Steps:
1. Logout if logged in
2. Try to access /admin/dashboard directly

Expected Result:
❌ Redirected to /auth/login
✅ Cannot access without authentication
```

---

## 5. API Testing

### Test Using cURL or Postman

### Players Endpoint

**Test Case: Get All Players**
```bash
curl http://localhost:3000/api/players

Expected Response:
✅ Status: 200
✅ JSON array of players
✅ Each player has: id, name, position, stats
```

**Test Case: Filter by Position**
```bash
curl http://localhost:3000/api/players?position=midfielder

Expected Response:
✅ Status: 200
✅ Only midfielder players returned
✅ Correct count
```

### Fixtures Endpoints

**Test Case: Get Upcoming Fixtures**
```bash
curl http://localhost:3000/api/fixtures/upcoming

Expected Response:
✅ Status: 200
✅ Array of next 5 fixtures
✅ Includes date, teams, venue
```

**Test Case: Get Next Fixture**
```bash
curl http://localhost:3000/api/fixtures/next

Expected Response:
✅ Status: 200
✅ Single fixture object
✅ Most recent upcoming match
```

**Test Case: Get Results**
```bash
curl http://localhost:3000/api/fixtures/results

Expected Response:
✅ Status: 200
✅ Array of completed fixtures
✅ Includes scores
```

### Trial Submission

**Test Case: Submit Trial Application**
```bash
curl -X POST http://localhost:3000/api/trials \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Player",
    "email": "player@test.com",
    "phone": "+92-300-1234567",
    "age": 22,
    "position": "forward",
    "height": 185,
    "weight": 75
  }'

Expected Response:
✅ Status: 201
✅ Application created
✅ Returns application ID
```

**Test Case: Get Trial Applications (Admin)**
```bash
# Must be authenticated as admin
curl http://localhost:3000/api/trials \
  -H "Authorization: Bearer YOUR_TOKEN"

Expected Response:
✅ Status: 200
✅ Array of trial applications
✅ Includes status, applicant info
```

---

## 6. Database Testing

### Prisma Studio

```bash
# Open interactive database UI
npm run prisma:studio
```

**Test Cases:**
- [ ] View all users (should include admin, player1)
- [ ] View all players (should have sample data)
- [ ] View all fixtures (should have upcoming matches)
- [ ] View all trials (should see submitted trials)
- [ ] Check relationships (Player linked to User)
- [ ] Check stats (Player has associated Stats record)

### Database Queries

**Test: User Verification**
```bash
# Via Prisma Studio or terminal
prisma.user.findMany()

Expected:
✅ admin@unitedfc.pk exists with ADMIN role
✅ player1@unitedfc.pk exists with PLAYER role
```

**Test: Player Statistics**
```bash
# Check stats are properly linked
prisma.stats.findMany()

Expected:
✅ Each player has associated stats
✅ Stats have correct values
```

---

## 7. Performance Testing

### Page Load Times

**Measurement:**
1. Open DevTools → Network tab
2. Load each page
3. Check Total time

**Target Benchmarks:**
- Home page: < 2 seconds
- Squad page: < 2 seconds
- Fixtures page: < 2 seconds
- Admin dashboard: < 3 seconds
- API endpoints: < 500ms

**Test Case: Home Page Performance**
```
Steps:
1. Open DevTools
2. Go to home page
3. Check waterfall chart

Expected:
✅ FCP (First Contentful Paint) < 1.5s
✅ LCP (Largest Contentful Paint) < 2.5s
✅ No console errors
```

### Bundle Size

```bash
npm run build
```

**Expected Output:**
```
✅ All pages build successfully
✅ No warnings (except known deprecations)
✅ Route sizes reasonable
```

---

## 8. Responsive Design Testing

### Mobile Testing

**Device Sizes to Test:**
- iPhone SE (375px)
- iPhone 12 (390px)
- iPhone 14 Pro (393px)
- Samsung Galaxy (412px)

**Test Case: Mobile Navigation**
```
Steps:
1. Resize to 375px width
2. Observe navigation

Expected:
✅ Hamburger menu visible
✅ Menu toggles on click
✅ Links clickable
✅ No text overflow
```

**Test Case: Mobile Squad Page**
```
Steps:
1. Resize to 375px
2. View squad page

Expected:
✅ Player cards stack vertically
✅ Images scale properly
✅ Filter buttons responsive
✅ Modal opens correctly
```

### Tablet Testing

**Device Sizes:**
- iPad Mini (768px)
- iPad Air (820px)

**Test Case: Tablet Layout**
```
Expected:
✅ 2-column layout
✅ Proper spacing
✅ Touch targets >= 44x44px
```

### Desktop Testing

**Resolutions:**
- 1024px - Small desktop
- 1440px - Standard
- 2560px - Large/4K

**Test Case: Desktop Layout**
```
Expected:
✅ Multi-column layout
✅ Proper spacing
✅ Full feature visibility
✅ Responsive images
```

---

## 9. Browser Compatibility

### Browsers to Test

| Browser | Versions | Status |
|---------|----------|--------|
| Chrome | 90+ | ✅ Target |
| Firefox | 88+ | ✅ Target |
| Safari | 14+ | ✅ Target |
| Edge | 90+ | ✅ Target |

**Test Case: Chrome**
```bash
# Test in Chrome
Expected: ✅ All features work
```

**Test Case: Firefox**
```bash
# Test in Firefox
Expected: ✅ All features work
```

---

## 10. Security Testing

### Password Security

**Test Case: Password Hashing**
```
Steps:
1. Register new user
2. Check database

Expected:
✅ Password stored as bcrypt hash
✅ Not plaintext
✅ Different hash format each time
```

### Session Security

**Test Case: Session Token**
```
Steps:
1. Login with credentials
2. Open DevTools → Application → Cookies
3. Find "next-auth.session-token"

Expected:
✅ Cookie marked HttpOnly
✅ Cookie marked Secure (production)
✅ Cookie marked SameSite=Lax
```

### Protected Routes

**Test Case: Route Protection**
```
Steps:
1. Try accessing /player/dashboard without login

Expected:
❌ Redirected to /auth/login
✅ Cannot access protected route
```

### Input Validation

**Test Case: SQL Injection Attempt**
```
Steps:
1. On login, try: email = "'; DROP TABLE users; --"
2. Try to login

Expected:
✅ Treated as regular string
✅ No database error
✅ Login fails normally
```

---

## 11. Error Handling

### 404 Errors

**Test Case: Non-existent Route**
```
Steps:
1. Navigate to /nonexistent-page

Expected:
✅ 404 page displayed
✅ Navigation works
✅ Home link available
```

### API Errors

**Test Case: Invalid API Request**
```bash
curl http://localhost:3000/api/invalid-endpoint

Expected:
✅ Status: 404 or appropriate error
✅ Error message in JSON
```

### Database Errors

**Test Case: Database Connection Failure**
```
Steps:
1. Disconnect database
2. Try to load page requiring database

Expected:
✅ Graceful error handling
✅ User-friendly message
✅ No server crash
```

---

## 12. Form Validation

### Login Form

| Field | Valid | Invalid |
|-------|-------|---------|
| Email | user@example.com | invalid-email, empty |
| Password | test123 | <6 chars, empty |

### Register Form

| Field | Valid | Invalid |
|-------|-------|---------|
| Email | new@example.com | duplicate, invalid |
| Password | Test123456 | <6 chars |
| Confirm Password | Test123456 | doesn't match |
| Full Name | John Doe | empty, too long |
| Phone | +92-300-1234567 | invalid format |

### Trial Form

| Field | Valid | Invalid |
|-------|-------|---------|
| Age | 22 | <15, >50 |
| Position | midfielder | invalid option |
| Height | 185 | <150, >220 |
| Weight | 75 | <40, >120 |

---

## 13. End-to-End User Journeys

### Fan Journey

**Test Case: Complete Fan Journey**
```
Steps:
1. Visit home page
2. Browse squad gallery
3. Check upcoming fixtures
4. Submit trial application
5. Contact club

Expected:
✅ All steps complete successfully
✅ No errors
✅ Navigation smooth
```

### Player Journey

**Test Case: Complete Player Journey**
```
Steps:
1. Register account (optional)
2. Login as player1@unitedfc.pk/player123
3. View dashboard
4. Check schedule
5. View announcements
6. Logout

Expected:
✅ All steps complete
✅ Protected routes enforce auth
✅ Data displays correctly
```

### Admin Journey

**Test Case: Complete Admin Journey**
```
Steps:
1. Login as admin@unitedfc.pk/admin123
2. View admin dashboard
3. Check stat cards
4. Navigate to each admin section
5. Logout

Expected:
✅ All sections accessible
✅ Admin-only routes protected
✅ All data displays
```

---

## Testing Checklist

### Pre-Deployment Testing
- [ ] All public pages load
- [ ] All forms validate
- [ ] Authentication works
- [ ] Player portal accessible to players
- [ ] Admin panel accessible to admins
- [ ] Non-admins cannot access admin
- [ ] Database operations work
- [ ] API endpoints return correct data
- [ ] Mobile responsive on tested devices
- [ ] No console errors
- [ ] Build completes successfully
- [ ] No security issues identified

### Weekly Testing
- [ ] All pages functional
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Database backups working
- [ ] Email notifications (when implemented)

### Monthly Testing
- [ ] Security audit
- [ ] Performance benchmarking
- [ ] Database optimization
- [ ] Browser compatibility check
- [ ] Mobile testing on new devices

---

## Automated Testing (Future)

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

---

## Bug Reporting Template

```markdown
**Title:** [Component] Short description

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen Size: 1920x1080

**Steps to Reproduce:**
1. Do this
2. Then this
3. Click here

**Expected Result:**
What should happen

**Actual Result:**
What actually happened

**Screenshots:**
[If applicable]

**Error Log:**
[Any console errors]
```

---

## Performance Profiling

### React DevTools Profiler
1. Install React DevTools extension
2. Open DevTools → Profiler tab
3. Record interactions
4. Analyze performance

### Lighthouse
1. Open DevTools → Lighthouse tab
2. Click "Analyze page load"
3. Check scores:
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90

---

## Accessibility Testing

### WCAG 2.1 Compliance

**Test Keyboard Navigation:**
- [ ] Tab through all interactive elements
- [ ] Focus visible on all buttons
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals

**Test Screen Reader:**
- [ ] All images have alt text
- [ ] Headings properly nested
- [ ] Form labels associated
- [ ] Error messages announced

---

**Testing Guide Version:** 1.0  
**Last Updated:** January 23, 2026
