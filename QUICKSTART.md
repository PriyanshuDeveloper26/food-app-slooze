# ⚡ Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Step 2: Start MongoDB

**Option A: Using Docker (Recommended)**
```bash
./start-mongodb.sh
```

**Option B: Install MongoDB Locally**
```bash
./install-mongodb.sh
```

### Step 3: Seed Database

```bash
npm run seed
```

You should see:
```
✅ MongoDB Connected
🗑️  Cleared existing data
👥 Created users
🏪 Created restaurants
🍽️  Created menu items
💳 Created payment methods
✅ Database seeded successfully!
```

### Step 4: Start Backend

Open Terminal 1:
```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost:27017
🚀 Server running in development mode on port 5000
```

### Step 5: Start Frontend

Open Terminal 2:
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

### Step 6: Open Browser

Go to: **http://localhost:3000**

---

## 🔑 Login Credentials

All users have password: **password123**

| Role | Email | Country |
|------|-------|---------|
| **Admin** | nick@slooze.xyz | Global |
| **Manager** | marvel@slooze.xyz | India |
| **Manager** | america@slooze.xyz | America |
| **Member** | thanos@slooze.xyz | India |
| **Member** | travis@slooze.xyz | America |

---

## ✅ Verify Everything Works

1. **Login as Admin** (nick@slooze.xyz)
   - You should see all restaurants (India + America)
   - Dashboard shows "Global Access"

2. **Browse Restaurants**
   - Click "Restaurants" in navbar
   - You should see 6 restaurants

3. **Add to Cart**
   - Click on any restaurant
   - Add items to cart
   - Cart icon shows item count

4. **Create Order**
   - Go to Cart
   - Click "Create Order"
   - Order should be created successfully

5. **Checkout Order**
   - Go to Orders
   - Click "Checkout" on pending order
   - Select payment method
   - Order status changes to "Confirmed"

---

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error:** `ECONNREFUSED 127.0.0.1:27017`

**Solution:**
```bash
# Check if MongoDB is running
sudo docker ps | grep mongo

# If not running, start it
./start-mongodb.sh
```

### Frontend CSS Errors

**Error:** `Unknown at rule @tailwind`

**Solution:** These are just linter warnings for TailwindCSS directives. They don't affect functionality. The app will work fine.

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill the process
lsof -i :5000
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Cannot Find Module

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

## 🛑 Stop Everything

```bash
# Stop backend - Press Ctrl+C in Terminal 1
# Stop frontend - Press Ctrl+C in Terminal 2

# Stop MongoDB
sudo docker stop food-delivery-mongo
```

---

## 🔄 Restart Everything

```bash
# Start MongoDB
./start-mongodb.sh

# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

---

## 📝 Notes

- **CSS Warnings:** The `@tailwind` and `@apply` warnings in the IDE are normal. TailwindCSS processes these directives during build.
- **MongoDB Data:** Data persists in Docker volume `mongodb_data`
- **Cart Persistence:** Cart data is saved in browser localStorage
- **Token Expiry:** JWT tokens expire after 30 days

---

## 🎯 What to Test

### Admin Features
- ✅ View all restaurants (India + America)
- ✅ Create orders
- ✅ Checkout orders
- ✅ Cancel orders
- ✅ Manage payment methods

### Manager Features
- ✅ View country-specific restaurants
- ✅ Create orders
- ✅ Checkout orders
- ✅ Cancel orders
- ❌ Cannot manage payment methods

### Member Features
- ✅ View country-specific restaurants
- ✅ Create orders
- ❌ Cannot checkout
- ❌ Cannot cancel orders
- ❌ Cannot manage payment methods

---

## 🆘 Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions
2. Check [PROJECT_README.md](./PROJECT_README.md) for full documentation
3. Check [API_COLLECTION.md](./API_COLLECTION.md) for API reference

---

**You're all set! Enjoy testing the application! 🎉**
