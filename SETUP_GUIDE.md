# 🚀 Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:

- ✅ Node.js v16+ (`node --version`)
- ✅ MongoDB v5+ (`mongod --version`)
- ✅ npm or yarn (`npm --version`)

## Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or on macOS with Homebrew
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update `backend/.env` with your connection string

### Step 3: Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env if needed (default settings work for local MongoDB)
```

### Step 4: Seed Database

```bash
cd backend
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

### Step 5: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost:27017
🚀 Server running in development mode on port 5000
```

### Step 6: Start Frontend Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 7: Access Application

Open your browser and go to: **http://localhost:3000**

## 🎉 You're Ready!

### Test Login Credentials

**Password for all users:** `password123`

| User | Email | Role | Country |
|------|-------|------|---------|
| Nick Fury | nick@slooze.xyz | Admin | Global |
| Captain Marvel | marvel@slooze.xyz | Manager | India |
| Captain America | america@slooze.xyz | Manager | America |
| Thanos | thanos@slooze.xyz | Member | India |
| Travis | travis@slooze.xyz | Member | America |

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod
```

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5001
```

### Frontend Build Errors

**Error:** `Cannot find module`

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Database Not Seeding

**Error:** `ValidationError: User validation failed`

**Solution:**
```bash
# Drop the database and reseed
mongo food_delivery --eval "db.dropDatabase()"
cd backend
npm run seed
```

## Development Tips

### 1. Hot Reload

Both backend and frontend support hot reload:
- **Backend:** Using nodemon
- **Frontend:** Using Vite HMR

### 2. View API Responses

Use browser DevTools Network tab or install:
- [Thunder Client](https://www.thunderclient.com/) (VS Code)
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)

### 3. Database GUI

View MongoDB data with:
- [MongoDB Compass](https://www.mongodb.com/products/compass) (Recommended)
- [Studio 3T](https://studio3t.com/)

### 4. Check API Health

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Common Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm run seed     # Seed database
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Next Steps

1. ✅ Login with different user roles
2. ✅ Browse restaurants by country
3. ✅ Add items to cart
4. ✅ Create an order
5. ✅ Checkout as Admin/Manager
6. ✅ Try to checkout as Member (should be blocked)
7. ✅ Manage payment methods as Admin
8. ✅ Cancel orders as Admin/Manager

## Need Help?

- 📖 Check [PROJECT_README.md](./PROJECT_README.md) for detailed documentation
- 📧 Contact: careers@slooze.xyz

Happy coding! 🎉
