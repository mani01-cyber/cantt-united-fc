# 🚀 United FC - Deployment Checklist

Complete checklist for deploying the United FC application to production.

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run lint` - No errors
- [ ] Run `npm run build` - Builds successfully
- [ ] Review all TypeScript errors - All resolved
- [ ] Test locally with `npm run dev` - All features working
- [ ] Check console for warnings - No critical warnings

### Security
- [ ] Environment variables configured
- [ ] NEXTAUTH_SECRET generated and set
- [ ] Passwords hashed (bcryptjs configured)
- [ ] CORS configured if needed
- [ ] No hardcoded secrets in code
- [ ] Database URL is production URL
- [ ] API routes validate input
- [ ] Protected routes have auth checks

### Database
- [ ] PostgreSQL database created on hosting
- [ ] Database user configured with proper permissions
- [ ] Connection string verified
- [ ] Run migrations: `npm run prisma:migrate`
- [ ] Seed data (optional): `npm run prisma:seed`
- [ ] Backup script in place
- [ ] Database monitoring enabled

### Environment Variables
- [ ] `DATABASE_URL` set to production database
- [ ] `NEXTAUTH_SECRET` generated (32+ characters)
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] Email service configured (if using notifications)
- [ ] All variables tested in production

### Testing
- [ ] All pages load correctly
- [ ] Authentication works (login/register/logout)
- [ ] Public pages accessible
- [ ] Protected routes redirect properly
- [ ] API endpoints return correct responses
- [ ] Forms validate and submit
- [ ] Database operations work
- [ ] Mobile responsiveness verified

### Performance
- [ ] Images optimized
- [ ] Build size checked (`npm run build`)
- [ ] No console errors in production build
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Caching strategies considered

---

## 🔧 Deployment Steps

### Step 1: Prepare Repository

```bash
# Ensure all changes committed
git add .
git commit -m "Prepare for deployment"
git push origin main

# Remove sensitive files from git
echo ".env.local" >> .gitignore
git rm --cached .env.local
git commit -m "Remove env from git"
```

### Step 2: Choose Hosting Platform

#### Option A: Vercel (Recommended)

1. **Connect Repository**
   - Go to vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Import project

2. **Configure Environment Variables**
   - Settings → Environment Variables
   - Add all variables from `.env.local`:
     ```
     DATABASE_URL=postgresql://...
     NEXTAUTH_SECRET=...
     NEXTAUTH_URL=https://yourdomain.com
     EMAIL_USER=...
     EMAIL_PASSWORD=...
     CLUB_NAME=United FC Lahore
     CLUB_EMAIL=info@unitedfc.pk
     ```

3. **Deploy Database**
   - Use Vercel Postgres OR external provider
   - Run migrations after connection
   - Update DATABASE_URL

4. **Deploy**
   - Click "Deploy"
   - Monitor deployment
   - Verify production URL works

#### Option B: AWS

1. **Create EC2 Instance**
   ```bash
   # SSH into instance
   ssh -i key.pem ec2-user@your-instance-ip
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone your-repo-url
   cd united
   
   # Install dependencies
   npm install
   
   # Create .env.local with production variables
   
   # Run migrations
   npm run prisma:migrate
   
   # Build
   npm run build
   
   # Start with PM2
   pm2 start "npm run start" --name "united-fc"
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (Reverse Proxy)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option C: Digital Ocean

1. **Create App Platform**
   - Sign up at digitalocean.com
   - Create new App
   - Connect GitHub repository
   - Configure build/run commands

2. **Set Environment Variables**
   - In App settings
   - Add all required variables

3. **Deploy**
   - Click Deploy
   - Monitor build logs

---

## 🗄️ Database Deployment

### PostgreSQL Setup on Hosting

#### On AWS RDS
```bash
# Create RDS instance
# - Engine: PostgreSQL
# - Version: 12+
# - Instance class: db.t3.micro (minimum)
# - Storage: 20 GB
# - Backup retention: 7 days

# Get connection string:
DATABASE_URL="postgresql://username:password@endpoint:5432/football_club"
```

#### On Vercel Postgres
```bash
# If using Vercel, they provide managed PostgreSQL
# Connection string provided in dashboard
DATABASE_URL="postgresql://..."
```

#### On DigitalOcean Managed Database
```bash
# Create managed database
# Connection string in dashboard
DATABASE_URL="postgresql://..."
```

### Database Migration in Production

```bash
# After deploying to production

# SSH into server
ssh your-server

# Run migrations
npm run prisma:migrate deploy

# Seed data (if needed)
npm run prisma:seed
```

---

## 📊 Post-Deployment Verification

### Verify Application
- [ ] Visit production URL
- [ ] Home page loads
- [ ] Public pages accessible
- [ ] Images load correctly
- [ ] Navigation works

### Verify Authentication
- [ ] Register new account works
- [ ] Login with credentials works
- [ ] Session persists across pages
- [ ] Logout clears session

### Verify Database
- [ ] Data saves correctly
- [ ] User data stored
- [ ] Queries run without errors
- [ ] Backups configured

### Verify Performance
- [ ] Page loads < 3 seconds
- [ ] No console errors
- [ ] API responses < 500ms
- [ ] Images load optimally

### Verify Security
- [ ] HTTPS enabled
- [ ] Environment variables hidden
- [ ] No sensitive data in logs
- [ ] Protected routes secure

---

## 🔄 Monitoring & Maintenance

### Daily Monitoring
- [ ] Check application logs
- [ ] Monitor error rates
- [ ] Check database performance
- [ ] Monitor uptime

### Weekly Tasks
- [ ] Review error logs
- [ ] Check for security updates
- [ ] Monitor database size
- [ ] Verify backups

### Monthly Tasks
- [ ] Update dependencies: `npm update`
- [ ] Review security advisories
- [ ] Optimize database
- [ ] Review performance metrics
- [ ] Clean up old data

### Quarterly Tasks
- [ ] Major version upgrades
- [ ] Database optimization
- [ ] Security audit
- [ ] Performance analysis

---

## 🆘 Rollback Procedure

If deployment fails:

### Vercel
```
1. Go to Deployments
2. Find last working deployment
3. Click "Promote to Production"
4. Verify application works
```

### AWS/DigitalOcean
```bash
# Rollback to previous version
git revert HEAD
git push

# Or redeploy previous commit
git checkout previous-commit-hash
npm run build
pm2 restart united-fc
```

### Database Rollback
```bash
# Prisma migration rollback
npm run prisma:migrate resolve --rolled-back migration_name
```

---

## 📱 Domain & SSL

### Configure Custom Domain

#### On Vercel
1. Project Settings → Domains
2. Add custom domain
3. Update DNS records
4. SSL automatic

#### On AWS
1. Route 53 → Create hosted zone
2. Point domain to ALB
3. Request SSL certificate (ACM)
4. Attach to load balancer

#### On DigitalOcean
1. Networking → Domains
2. Add domain
3. Update DNS
4. SSL automatic

### SSL Certificate
- [ ] HTTPS enabled
- [ ] Certificate valid
- [ ] Certificate auto-renewal configured
- [ ] Mixed content warnings resolved

---

## 📈 Performance Optimization

### Images
- [ ] WebP format used
- [ ] Lazy loading enabled
- [ ] Responsive images configured
- [ ] CDN enabled

### Code
- [ ] Code splitting enabled
- [ ] Minification enabled
- [ ] Build size monitored
- [ ] Unused code removed

### Database
- [ ] Indexes created
- [ ] Queries optimized
- [ ] Connection pooling enabled
- [ ] Caching considered

### Caching
- [ ] Static assets cached
- [ ] API responses cached
- [ ] Browser caching enabled
- [ ] CDN configured

---

## 🔐 Security Hardening

### Application
- [ ] CORS properly configured
- [ ] CSRF tokens enabled
- [ ] Input validation strict
- [ ] Rate limiting enabled

### Database
- [ ] Prepared statements used
- [ ] SQL injection prevented
- [ ] Backups encrypted
- [ ] Access restricted

### Infrastructure
- [ ] Firewall configured
- [ ] DDoS protection
- [ ] WAF enabled
- [ ] VPN for admin access

### Secrets Management
- [ ] No secrets in code
- [ ] Environment variables secured
- [ ] Rotation schedule set
- [ ] Access logs monitored

---

## 📞 Support & Maintenance Contacts

### Hosting Support
- Vercel: [support.vercel.com](https://support.vercel.com)
- AWS: [aws.amazon.com/support](https://aws.amazon.com/support)
- DigitalOcean: [support.digitalocean.com](https://support.digitalocean.com)

### Database Support
- PostgreSQL: [postgresql.org](https://www.postgresql.org)
- Vercel Postgres: [vercel.com/docs](https://vercel.com/docs)

### Emergency Contacts
- Admin Email: admin@unitedfc.pk
- Support Phone: +92-300-1234567

---

## 📋 Deployment Sign-Off

- [ ] Code reviewed
- [ ] Tests passing
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Documentation updated
- [ ] Team notified

**Deployed by:** _______________
**Date:** _______________
**Version:** _______________

---

## 🎉 Post-Deployment

### Inform Stakeholders
- [ ] Announce to club members
- [ ] Share production URL
- [ ] Provide login credentials
- [ ] Share documentation

### Monitor Closely
- [ ] Watch logs hourly for 24 hours
- [ ] Monitor error rates
- [ ] Check user feedback
- [ ] Be ready to rollback if needed

### Celebrate! 🚀
The app is live!

---

**Last Updated:** January 23, 2026
**Version:** 1.0.0
