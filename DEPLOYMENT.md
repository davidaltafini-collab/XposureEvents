# 🚀 GHID RAPID DEPLOYMENT - XPOSURE Events

## ⚡ Quick Start (5 minute)

### 1. Clone & Install
```bash
git clone <repo>
cd Xposure-main
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
# Editează .env cu credențialele tale
```

### 3. Database & Admin
```bash
npx prisma generate
npx prisma migrate deploy
npx tsx prisma/seed-admin.ts
```

### 4. Run
```bash
npm run dev
```

### 5. Login
```
URL: http://localhost:3000/admin/login
Username: admin
Password: Admin123!
```

---

## 🔐 Variabile Critice (.env)

```env
# ⚠️ OBLIGATORII PENTRU FUNCȚIONARE
DATABASE_URL="mysql://..."
JWT_SECRET="generat-cu-openssl-rand-base64-32"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="ParolaPuternica123!"

# Stripe (test mode e OK pentru dezvoltare)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (folosește Gmail + App Password)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="app-password-16-chars"

# Cloudinary
CLOUDINARY_CLOUD_NAME="..."
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="..."
```

---

## ✅ Verificare Funcționare

### Test 1: Securitate
```bash
# 1. Deschide browser incognito
# 2. Încearcă să accesezi: http://localhost:3000/admin
# ✅ Trebuie să te redirecteze la /admin/login
```

### Test 2: Login
```bash
# 1. Navighează la /admin/login
# 2. Username: admin, Password: Admin123!
# ✅ Trebuie să intri în dashboard
```

### Test 3: Scanner QR
```bash
# 1. Click pe "Scanner Bilete"
# 2. Permite acces la cameră
# ✅ Camera pornește și scanează QR
```

### Test 4: Creare Eveniment
```bash
# 1. Click "Eveniment Nou"
# 2. Completează formular + upload imagine
# 3. Salvează
# ✅ Evenimentul apare în listă
```

### Test 5: Capacitate & Email
```bash
# 1. Creează eveniment cu capacity=2
# 2. Cumpără 2 bilete (folosește Stripe test cards)
# 3. Încearcă să cumperi al 3-lea
# ✅ Trebuie să dea eroare "sold out"
# ✅ Trebuie să primești 2 emailuri cu QR
```

---

## 🐛 Fix Probleme Comune

### ❌ "Login failed" / "Parolă incorectă"
```bash
# Re-creează admin-ul
npx tsx prisma/seed-admin.ts
```

### ❌ "Database connection failed"
```bash
# Verifică DATABASE_URL în .env
# Asigură-te că MySQL rulează
mysql -u root -p
```

### ❌ Scanner nu pornește camera
```bash
# Trebuie HTTPS pentru camera pe mobil
# Local: http://localhost merge
# Producție: Folosește Vercel (auto HTTPS)
```

### ❌ Emailuri nu se trimit
```bash
# Pentru Gmail:
# 1. Activează 2-Step Verification
# 2. Generează App Password: https://myaccount.google.com/apppasswords
# 3. Folosește acel password în EMAIL_PASSWORD
```

---

## 🚢 Deploy pe Vercel (Producție)

### Pas 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Pas 2: Deploy Vercel
```bash
# Instalează Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Pas 3: Environment Variables
În Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL = mysql://...
JWT_SECRET = NEW_GENERATED_SECRET (IMPORTANT!)
ADMIN_PASSWORD = NEW_SECURE_PASSWORD (IMPORTANT!)
[...restul variabilelor...]
```

### Pas 4: Stripe Webhook
1. Vercel Dashboard → Domains → Copiază URL-ul (ex: xposure-events.vercel.app)
2. Stripe Dashboard → Webhooks → Add Endpoint
3. URL: `https://xposure-events.vercel.app/api/webhooks/stripe`
4. Events: `checkout.session.completed`
5. Copiază Signing Secret → Adaugă în Vercel ca `STRIPE_WEBHOOK_SECRET`

### Pas 5: Seed Admin (prima dată)
```bash
# Trage .env de la Vercel
vercel env pull

# Creează admin
npx tsx prisma/seed-admin.ts
```

### ✅ DONE! Site-ul e live la: https://xposure-events.vercel.app

---

## 📊 Monitorizare

### Logs în Vercel
```bash
# Real-time logs
vercel logs --follow

# Sau în Vercel Dashboard → Deployments → Logs
```

### Database
```bash
# Deschide Prisma Studio
npx prisma studio
# Vizualizare date la: http://localhost:5555
```

---

## 🔒 Securitate Checklist (Producție)

- [ ] JWT_SECRET generat nou (minim 32 caractere)
- [ ] ADMIN_PASSWORD schimbat (minim 12 caractere, litere+cifre+simboluri)
- [ ] Stripe în LIVE mode (nu test)
- [ ] HTTPS activat (auto pe Vercel)
- [ ] Email credentials secure (App Password, nu parolă reală)
- [ ] Database backup activat
- [ ] Environment variables NICIODATĂ în Git

---

## 💡 Tips & Tricks

### Generează JWT Secret puternic
```bash
openssl rand -base64 32
```

### Test Stripe Local cu Webhook
```bash
# Terminal 1: Server
npm run dev

# Terminal 2: Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Folosește test cards:
# Success: 4242 4242 4242 4242
# Decline: 4000 0000 0000 0002
```

### Backup Database
```bash
mysqldump -u user -p xposure_events > backup.sql
```

### Restore Database
```bash
mysql -u user -p xposure_events < backup.sql
```

---

## 📞 Need Help?

- 📖 README complet: `README.md`
- 🐛 Issues: GitHub Issues
- 📧 Email: contact@xposure-events.ro

---

**🎉 Succes cu deployment-ul!**
