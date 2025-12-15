# 🎫 XPOSURE Events - Platformă Ticketing Evenimente

Sistem complet de ticketing pentru evenimente cu plăți Stripe, generare QR code și scanner mobil.

## 🚀 Features

### 🔐 **Securitate Fortificată**
- ✅ **JWT Authentication** cu jose library
- ✅ **Bcrypt Password Hashing** (12 rounds)
- ✅ **Rate Limiting** (5 încercări / 15 minute)
- ✅ **httpOnly Cookies** cu secure flags
- ✅ **Middleware Protection** pe toate rutele admin

### 🎟️ **Sistem Ticketing Complet**
- ✅ **QR Code Scanner** dedicat (cameră + manual)
- ✅ **Validare instant** cu feedback vizual și auditiv
- ✅ **Email automat** cu QR code după plată
- ✅ **Verificare capacitate** înainte de checkout
- ✅ **Webhook Stripe** pentru procesare plăți

### 📱 **Mobile Responsive**
- ✅ Toate paginile admin optimizate pentru mobil
- ✅ Scanner QR funcțional pe dispozitive mobile
- ✅ Tabele și formulare responsive

### 🎨 **Admin UX**
- ✅ Navigare clară cu butoane Back
- ✅ Quick Actions pentru Scanner și Creare Evenimente
- ✅ Dashboard cu statistici live
- ✅ CRUD complet pentru evenimente

---

## 📋 Cerințe Sistem

- **Node.js** 18+ 
- **MySQL** 8+
- **npm** sau **yarn**

---

## ⚙️ Instalare și Setup

### 1. **Clone Repository**
```bash
git clone <repository-url>
cd Xposure-main
```

### 2. **Instalează Dependențe**
```bash
npm install
```

### 3. **Configurează Environment Variables**
```bash
cp .env.example .env
```

Editează `.env` și completează:
```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/xposure_events"

# JWT Secret (IMPORTANT: Generează unul nou!)
JWT_SECRET="generează-un-secret-puternic-minim-32-caractere"

# Admin Credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="ParolaSecura123!"

# Stripe
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."

# Email (Gmail example)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@xposure-events.ro"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-preset"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. **Setup Database**
```bash
# Generează Prisma Client
npx prisma generate

# Rulează migrațiile
npx prisma migrate deploy

# SAU pentru development:
npx prisma migrate dev
```

### 5. **Creează Admin User**
```bash
npx tsx prisma/seed-admin.ts
```

✅ Output așteptat:
```
🌱 Seeding admin user...
✅ Admin user created/updated successfully!
📝 Username: admin
🔐 Password: Admin123!
⚠️  IMPORTANT: Change the password in production!
```

### 6. **Start Development Server**
```bash
npm run dev
```

Aplicația va rula la: `http://localhost:3000`

---

## 🔑 Autentificare Admin

### Login Credentials (din .env):
- **URL**: `http://localhost:3000/admin/login`
- **Username**: `admin` (sau valoarea din `ADMIN_USERNAME`)
- **Parolă**: `Admin123!` (sau valoarea din `ADMIN_PASSWORD`)

⚠️ **IMPORTANT**: Schimbă parola în producție!

---

## 📱 Utilizare Scanner QR

### Acces Scanner:
1. Loghează-te în Admin Dashboard
2. Click pe card-ul **"Scanner Bilete"** SAU 
3. Navighează direct la `/admin/scanner`

### Funcționalități Scanner:
- ✅ **Mod Cameră**: Scanează automat QR code-uri
- ✅ **Mod Manual**: Introdu manual codul biletului
- ✅ **Feedback Vizual**:
  - 🟢 Verde = Bilet Valid
  - 🔴 Roșu = Bilet Deja Folosit / Invalid
- ✅ **Feedback Haptic**: Vibrație la scanare (pe dispozitive compatibile)

---

## 🎫 Flux Ticketing Complet

### 1. **Client Cumpără Bilet**
```
Client → Event Page → Purchase Form → Stripe Checkout
```

### 2. **Procesare Plată**
```
Stripe Payment Success → Webhook Trigger → Backend:
  1. Incrementează soldCount
  2. Marchează ticket ca plătit
  3. Generează QR Code
  4. Trimite Email cu bilet
```

### 3. **Verificare la Intrare**
```
Scanner → Scanează QR → API Validation → Rezultat:
  ✅ Valid: Marchează ticket.scanned = true
  ❌ Invalid: Returnează eroare
```

---

## 🛠️ API Endpoints

### **Public APIs**
- `POST /api/create-checkout-session` - Creează sesiune Stripe
- `POST /api/webhooks/stripe` - Webhook pentru plăți
- `POST /api/contact` - Formular contact

### **Admin APIs** (necesită autentificare)
- `POST /api/auth/admin-login` - Login admin
- `POST /api/auth/admin-logout` - Logout admin
- `GET /api/admin/events` - Lista evenimente
- `POST /api/admin/events` - Creează eveniment
- `GET /api/admin/events/[id]` - Detalii eveniment
- `PUT /api/admin/events/[id]` - Actualizează eveniment
- `DELETE /api/admin/events/[id]` - Șterge eveniment
- `POST /api/admin/validate-ticket` - Validează bilet QR

---

## 🔒 Securitate - Detalii Tehnice

### **JWT Implementation**
```typescript
// lib/auth.ts
- Algorithm: HS256
- Expiration: 24h
- Cookie: httpOnly, secure (production), sameSite: lax
```

### **Rate Limiting**
```typescript
// app/api/auth/admin-login/route.ts
- Max Attempts: 5 per IP
- Window: 15 minutes
- Storage: In-memory Map (resetează la restart)
```

### **Middleware Protection**
```typescript
// middleware.ts
- Verifică JWT pe toate rutele /admin/*
- Excepție: /admin/login
- Redirect automat la login dacă JWT invalid/expirat
```

### **Password Hashing**
```typescript
// Folosește bcrypt
- Salt Rounds: 12
- Verificare: bcrypt.compare()
```

---

## 🚢 Deployment Producție

### **Vercel Deployment**

1. **Push to Git**
```bash
git push origin main
```

2. **Deploy pe Vercel**
```bash
vercel --prod
```

3. **Configurează Environment Variables**
În Vercel Dashboard:
- Adaugă toate variabilele din `.env`
- ⚠️ **Schimbă JWT_SECRET** cu unul nou generat
- ⚠️ **Schimbă ADMIN_PASSWORD** cu unul sigur

4. **Setup Stripe Webhook**
```
URL: https://your-domain.vercel.app/api/webhooks/stripe
Events: checkout.session.completed
```

5. **Rulează Seed Admin** (prima dată)
```bash
vercel env pull
npx tsx prisma/seed-admin.ts
```

---

## 📊 Database Schema

### **Event**
```prisma
- id: String (cuid)
- title: String
- slug: String (unique)
- description: Text (optional)
- date: DateTime
- imagePath: String
- price: String
- capacity: Int
- soldCount: Int (default: 0)
- locationName: String
- locationAddress: String
- locationMapsUrl: String (optional)
- stripePaymentLink: String (optional)
- published: Boolean (default: false)
- tickets: Ticket[]
```

### **Ticket**
```prisma
- id: String (cuid)
- code: String (unique)
- eventId: String
- name: String
- email: String
- phone: String
- quantity: Int
- totalAmount: String
- stripePaymentId: String (optional)
- scanned: Boolean (default: false)
- scannedAt: DateTime (optional)
- qrCodePath: String (optional)
- event: Event (relation)
```

### **Admin**
```prisma
- id: String (cuid)
- username: String (unique)
- passwordHash: String
- createdAt: DateTime
```

---

## 🐛 Troubleshooting

### **Login nu funcționează**
```bash
# Verifică dacă admin-ul există în DB
npx prisma studio

# Re-creează admin-ul
npx tsx prisma/seed-admin.ts
```

### **Stripe Webhook nu funcționează**
```bash
# Testează local cu Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Verifică STRIPE_WEBHOOK_SECRET în .env
```

### **Emailuri nu se trimit**
```bash
# Pentru Gmail, folosește App Password:
# https://myaccount.google.com/apppasswords

# Verifică EMAIL_* variables în .env
```

### **Scanner nu detectează QR**
- Verifică permisiunile camerei în browser
- Folosește HTTPS în producție (pentru acces cameră)
- Testează cu modul Manual dacă camera nu funcționează

---

## 📝 TODO / Viitoare Îmbunătățiri

- [ ] CSRF Protection pentru DELETE/UPDATE
- [ ] Export CSV pentru bilete
- [ ] Statistici avansate (grafice)
- [ ] Multi-admin support (roles)
- [ ] Notificări push pentru event reminders
- [ ] Integration cu Calendar (Google Calendar, iCal)

---

## 🤝 Support

Pentru probleme sau întrebări:
- Email: contact@xposure-events.ro
- GitHub Issues: [Link]

---

## 📄 License

Private - WebBuild Studio © 2024

---

## ✅ Checklist Deployment

- [ ] `.env` configurat complet
- [ ] `JWT_SECRET` generat nou (min 32 caractere)
- [ ] Database migrations rulate
- [ ] Admin user creat
- [ ] Stripe webhook configurat
- [ ] Email credentials setate
- [ ] Cloudinary configurat
- [ ] Test complet:
  - [ ] Login admin
  - [ ] Creare eveniment
  - [ ] Achiziție bilet (test mode)
  - [ ] Email primit cu QR
  - [ ] Scanner QR funcțional
  - [ ] Mobile responsive verificat
