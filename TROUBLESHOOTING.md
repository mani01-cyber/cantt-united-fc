# 🔧 Troubleshooting Guide - United FC

Common issues and solutions for the United FC application.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Database Issues](#database-issues)
3. [Authentication Issues](#authentication-issues)
4. [API Issues](#api-issues)
5. [Frontend Issues](#frontend-issues)
6. [Performance Issues](#performance-issues)
7. [Deployment Issues](#deployment-issues)
8. [Security Issues](#security-issues)

---

## Installation Issues

### Issue: `npm install` Fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solution 1: Use Legacy Peer Deps**
```bash
npm install --legacy-peer-deps
```

**Solution 2: Clear Cache**
```bash
npm cache clean --force
rm package-lock.json
rm -rf node_modules
npm install
```

**Solution 3: Check Node Version**
```bash
# Requires Node 18+
node --version
# If < 18, update Node.js from https://nodejs.org
```

---

### Issue: Missing Dependencies After Install

**Symptoms:**
```
Module not found: Can't resolve '@prisma/client'
```

**Solution:**
```bash
# Reinstall specific package
npm install @prisma/client

# Or reinstall all
npm install
npm run prisma:generate
```

---

### Issue: TypeScript Compilation Errors

**Symptoms:**
```
Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# Generate types
npm run prisma:generate

# Check TypeScript
npm run type-check

# If still failing, check tsconfig.json is correct
```

---

## Database Issues

### Issue: Cannot Connect to Database

**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
PrismaClientInitializationError: Can't reach database server
```

**Solution 1: Check Database is Running**

**On Windows:**
```powershell
# Check if PostgreSQL service running
Get-Service postgresql*

# If not running, start it
Start-Service postgresql-x64-14
```

**On Mac:**
```bash
# Check if running
pg_isready

# If not, start it
brew services start postgresql
```

**On Linux:**
```bash
# Check service
sudo systemctl status postgresql

# Start if not running
sudo systemctl start postgresql
```

**Solution 2: Verify Connection String**
```bash
# In .env.local, check DATABASE_URL
# Format: postgresql://username:password@localhost:5432/database_name

# Test connection with psql
psql postgresql://username:password@localhost:5432/database_name
```

**Solution 3: Wrong Credentials**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create new user if needed
CREATE USER football_user WITH PASSWORD 'secure_password';
CREATE DATABASE football_club OWNER football_user;
GRANT ALL PRIVILEGES ON DATABASE football_club TO football_user;
```

---

### Issue: Database Port Already in Use

**Symptoms:**
```
Error: bind() failed: Address already in use
```

**Solution 1: Kill Process Using Port**

**Windows:**
```powershell
# Find process on port 5432
netstat -ano | findstr :5432

# Kill process (replace PID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find process
lsof -i :5432

# Kill process (replace PID)
kill -9 <PID>
```

**Solution 2: Use Different Port**
```bash
# In .env.local, change port
DATABASE_URL="postgresql://user:pass@localhost:5433/db"

# Make sure PostgreSQL listens on that port
```

---

### Issue: Migration Fails

**Symptoms:**
```
Error: migration_name migration pending
```

**Solution 1: Resolve Pending Migrations**
```bash
# Check pending migrations
npm run prisma:migrations

# Resolve by choosing an option
npm run prisma:migrate resolve

# Or reset and start fresh
npm run prisma:reset
npm run prisma:migrate dev --name init
npm run prisma:seed
```

**Solution 2: Manual Fix**
```bash
# Drop and recreate tables
npm run prisma:migrate reset

# Seed sample data
npm run prisma:seed
```

---

### Issue: Prisma Studio Won't Open

**Symptoms:**
```
Error: Failed to open browser
```

**Solution:**
```bash
# Run command
npm run prisma:studio

# Manually open in browser
# URL will be shown in terminal, usually:
# http://localhost:5555
```

---

### Issue: Database Queries Slow

**Symptoms:**
- Page loads taking > 5 seconds
- API responses delayed

**Solution:**
```bash
# Check query performance
npm run prisma:studio

# Look for N+1 queries
# Solution: Add select/include to optimize

// Before (slow)
const players = await prisma.player.findMany();

// After (fast)
const players = await prisma.player.findMany({
  include: { stats: true }
});
```

---

## Authentication Issues

### Issue: Cannot Login

**Symptoms:**
```
Invalid credentials / Login fails
```

**Solution 1: Verify Credentials**
```bash
# Test with known good credentials
Email: admin@unitedfc.pk
Password: admin123
```

**Solution 2: Check Database**
```bash
# Verify user exists
npm run prisma:studio

# Navigate to User table
# Check if admin@unitedfc.pk exists
# If not, create user via registration
```

**Solution 3: Seed Database**
```bash
# Recreate test data
npm run prisma:reset
npm run prisma:seed

# Now try login
```

---

### Issue: Session Not Persisting

**Symptoms:**
- Logged in but redirected to login
- Session disappears on page refresh

**Symptoms:**
```
NEXTAUTH_SECRET missing / invalid
```

**Solution:**
```bash
# Generate secret
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET=your_generated_secret_here

# Restart dev server
npm run dev
```

---

### Issue: "Unauthorized" Errors on Protected Routes

**Symptoms:**
```
Error: Unauthorized / 401
Can't access /player/dashboard
```

**Solution 1: Check Authentication Status**
```bash
# Verify user is logged in
# Check browser cookies for session token

# If missing, login again
```

**Solution 2: Session Expired**
```bash
# Default session: 30 days
# If expired, login again

# To increase duration, modify src/lib/auth.ts:
maxAge: 60 * 60 * 24 * 90, // 90 days
```

**Solution 3: Wrong Role**
```bash
# Admin-only routes require ADMIN role
# Check role in Prisma Studio

# If wrong role, update in database:
# User.role = ADMIN
```

---

### Issue: Cookies Not Set

**Symptoms:**
- No session cookie in DevTools
- Always redirected to login

**Solution:**
```bash
# Check .env.local
NEXTAUTH_URL=http://localhost:3000

# For production:
NEXTAUTH_URL=https://yourdomain.com

# Cookies requires HttpOnly + Secure on HTTPS
# Development uses non-secure cookies
```

---

## API Issues

### Issue: API Returns 404

**Symptoms:**
```
GET /api/players → 404 Not Found
```

**Solution 1: Check Route Exists**
```bash
# File should be at:
src/app/api/players/route.ts

# Make sure it exports GET function:
export async function GET(request: NextRequest) { ... }
```

**Solution 2: Check File Name**
```bash
# Must be exactly named: route.ts
# Not: players.ts or route.js
```

**Solution 3: Restart Dev Server**
```bash
# Stop: Ctrl+C
# Start: npm run dev
```

---

### Issue: API Returns 500 Error

**Symptoms:**
```
POST /api/trials → 500 Internal Server Error
```

**Solution 1: Check Server Logs**
```
Terminal where npm run dev is running
Look for error messages/stack traces
```

**Solution 2: Check Database Connection**
```bash
# API needs database
# Verify DATABASE_URL in .env.local
# Verify database is running
```

**Solution 3: Check Request Body**
```bash
# Verify JSON is valid
# Content-Type header is application/json
# All required fields present

# Example:
curl -X POST http://localhost:3000/api/trials \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test",
    "email": "test@example.com",
    "phone": "+92-300-1234567",
    "age": 22,
    "position": "forward"
  }'
```

---

### Issue: CORS Error

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
```bash
# Add CORS headers to API route
import { NextResponse } from "next/server";

const headers = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers });
}
```

---

### Issue: Validation Errors

**Symptoms:**
```
Zod validation error: "age" must be a number
```

**Solution:**
```bash
# Check request data types
# POST body should match Zod schema

# In src/lib/validations.ts:
// trialSchema expects:
{
  fullName: string,      // "Name"
  age: number,          // 22 (not "22")
  position: string,     // "forward"
}

# When testing, ensure correct types
```

---

## Frontend Issues

### Issue: Page Won't Load / Blank Page

**Symptoms:**
- White screen
- No content visible

**Solution 1: Check Browser Console**
```
F12 → Console tab
Look for JavaScript errors
```

**Solution 2: Check Network Tab**
```
F12 → Network tab
Look for failed requests (red X)
Check response codes and errors
```

**Solution 3: Hard Refresh**
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

**Solution 4: Clear Cache**
```bash
# Stop dev server
# Delete .next folder
rm -rf .next

# Restart
npm run dev
```

---

### Issue: Styling Not Appearing (Tailwind)

**Symptoms:**
- No colors
- Layout broken
- Buttons unstyled

**Solution 1: Rebuild Tailwind**
```bash
# Restart dev server
# Ctrl+C
npm run dev
```

**Solution 2: Check tailwind.config.ts**
```typescript
// Make sure this line exists:
content: [
  "./src/app/**/*.{js,ts,jsx,tsx}",
  "./src/components/**/*.{js,ts,jsx,tsx}",
],
```

**Solution 3: Check globals.css**
```css
/* Should include at top of file */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Issue: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors in console

**Solution 1: Check Image Path**
```javascript
// Wrong
<img src="hero.jpg" />

// Correct
<img src="/images/hero.jpg" />
```

**Solution 2: Verify File Exists**
```bash
# Images should be in:
public/images/

# Check file exists:
ls -la public/images/
```

**Solution 3: Clear Browser Cache**
```
Ctrl+Shift+Delete → Clear browsing data
Or use hard refresh: Ctrl+Shift+R
```

---

### Issue: Modal Won't Close

**Symptoms:**
- Modal stays open
- Click outside doesn't close
- X button doesn't work

**Solution:**
```typescript
// Check modal close logic
const [isOpen, setIsOpen] = useState(false);

// Close button
<button onClick={() => setIsOpen(false)}>×</button>

// Click outside
<div onClick={() => isOpen && setIsOpen(false)}>
  {/* Modal content */}
</div>
```

---

### Issue: Form Won't Submit

**Symptoms:**
- Submit button doesn't work
- No error message
- Page refreshes instead of submitting

**Solution 1: Prevent Default**
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Must prevent default!
  // Then submit via fetch/axios
};
```

**Solution 2: Check Form Validation**
```typescript
// Make sure all required fields have values
if (!email || !password) {
  setError("All fields required");
  return;
}
```

**Solution 3: Check API Endpoint**
```typescript
const response = await fetch("/api/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});
```

---

### Issue: Countdown Timer Not Working

**Symptoms:**
- Timer doesn't count down
- Shows same time
- Updates only on page refresh

**Solution:**
```typescript
// Add dependency array to useEffect
useEffect(() => {
  const interval = setInterval(() => {
    setTime(/* updated time */);
  }, 1000);

  return () => clearInterval(interval); // Cleanup!
}, []); // Empty dependency array
```

---

## Performance Issues

### Issue: Page Loads Slowly

**Symptoms:**
- Takes > 3 seconds to load
- Lots of waiting time

**Solution 1: Check Network**
```
F12 → Network tab
Sort by size
Identify largest assets
Consider optimization
```

**Solution 2: Check API Calls**
```
F12 → Network tab → XHR/Fetch
Look for slow requests
Consider pagination/filtering
```

**Solution 3: Optimize Images**
```bash
# Use Next.js Image component
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="description"
  width={800}
  height={600}
/>
```

---

### Issue: High CPU Usage / Heating

**Symptoms:**
- Computer gets hot
- Fans spinning fast
- Terminal takes lots of CPU

**Solution 1: Stop Dev Server**
```bash
Ctrl+C
```

**Solution 2: Check for Infinite Loops**
```typescript
// Bad - infinite loop
useEffect(() => {
  fetchData(); // Triggers state update
}, []); // Missing dependency!

// Good
useEffect(() => {
  fetchData();
}, [dependency]); // Correct dependency
```

**Solution 3: Reduce Polling Frequency**
```typescript
// If polling, increase interval
setInterval(() => {
  // Increase from 1000ms to 5000ms
}, 5000);
```

---

### Issue: Build Takes Too Long

**Symptoms:**
```
Compiling... (takes several minutes)
```

**Solution 1: Check System Resources**
```bash
# Close other applications
# Free up disk space
# Restart computer
```

**Solution 2: Check for Large Files**
```bash
# Find large files
find . -type f -size +10M

# If found, consider removing or optimizing
```

**Solution 3: Use Incremental Builds**
```bash
# Development rebuilds are incremental
# Only use npm run build for full production build
npm run dev # Faster during development
```

---

## Deployment Issues

### Issue: Deployment Fails

**Symptoms:**
```
Build failed / Deployment error
```

**Solution 1: Check Build Locally**
```bash
npm run build
# If this fails, fix before deploying
```

**Solution 2: Check Environment Variables**
```bash
# Verify all variables set in hosting platform
NEXTAUTH_SECRET
DATABASE_URL
NEXTAUTH_URL
All others from .env.local
```

**Solution 3: Check Database**
```bash
# Verify production database exists
# Verify migrations ran
# Check connection string
```

---

### Issue: Application Crashes After Deployment

**Symptoms:**
- Error page on deployed site
- 500 errors

**Solution:**
```bash
# Check server logs
# Different per platform:

# Vercel: Deployments → Logs
# AWS: CloudWatch Logs
# DigitalOcean: Logs tab

# Common causes:
# - Missing environment variables
# - Database not connected
# - Migration failed
```

---

### Issue: Database Connection in Production

**Symptoms:**
```
PrismaClientInitializationError in production
```

**Solution:**
```bash
# Verify DATABASE_URL format
# Should work with production database

# For Vercel Postgres:
DATABASE_URL="postgresql://user:pass@endpoint:5432/db"

# Test connection:
psql $DATABASE_URL

# If SSL required (RDS):
DATABASE_URL="postgresql://user:pass@endpoint:5432/db?sslmode=require"
```

---

## Security Issues

### Issue: Sensitive Data in Logs

**Symptoms:**
- Passwords visible in logs
- API keys exposed

**Solution:**
```bash
# Never log sensitive data
// Bad
console.log(password);

// Good
console.log("User login attempted");

# Use environment variables
# Store in .env.local (never commit)
```

---

### Issue: HTTPS Not Working in Production

**Symptoms:**
- Browser warning
- "Not Secure"

**Solution:**
```bash
# On Vercel: Automatic HTTPS

# On AWS:
# 1. Request SSL certificate (ACM)
# 2. Attach to ALB/CloudFront
# 3. Redirect HTTP to HTTPS

# On DigitalOcean:
# Use managed SSL through dashboard
```

---

### Issue: Session Tokens Exposed

**Symptoms:**
- Session cookie visible in network tab
- Token sent in URL

**Solution:**
```bash
# Ensure cookies are HttpOnly
# Set in NextAuth config
# Cookies automatically HttpOnly in production

# Never send token in URL
// Bad
fetch(`/api/data?token=${sessionToken}`)

// Good
// Token in HttpOnly cookie automatically sent
fetch("/api/data")
```

---

## Common Error Messages

### "Database connection failed"
- Check DATABASE_URL
- Verify database is running
- Check network connectivity

### "NEXTAUTH_SECRET not set"
- Generate: `openssl rand -base64 32`
- Add to .env.local

### "Module not found"
- Run: `npm install`
- Clear cache: `npm cache clean --force`

### "Type 'X' not assignable to 'Y'"
- Run: `npm run prisma:generate`
- Run: `npm run type-check`

### "Cannot find module '@prisma/client'"
- Run: `npm install @prisma/client`

### "Port already in use"
- Change port or kill process using it

---

## Getting More Help

### Check Logs
1. Browser Console (F12)
2. Terminal where `npm run dev` runs
3. Server logs (production)

### Documentation
- [INDEX.md](./INDEX.md) - Main docs
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference
- [SETUP.md](./SETUP.md) - Installation guide

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev
```

---

## Quick Reference

### Reset Everything
```bash
# Nuclear option - resets all
npm run prisma:reset

# Then seed
npm run prisma:seed

# Then start
npm run dev
```

### Generate All Types
```bash
npm run prisma:generate
npm run type-check
```

### Full Rebuild
```bash
rm -rf .next node_modules package-lock.json
npm install
npm run prisma:generate
npm run dev
```

---

**Troubleshooting Guide Version:** 1.0  
**Last Updated:** January 23, 2026  
**Status:** Complete
