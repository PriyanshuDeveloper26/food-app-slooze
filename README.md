# 🍕 Slooze Food Delivery Application

A complete full-stack food ordering web application with role-based access control (RBAC) and country-based data filtering, built with the MERN stack.

---

## ✅ Implementation Status: COMPLETE

All requirements have been successfully implemented with modern UI/UX, comprehensive security, and full functionality.

---

## 🎯 Feature Breakdown & Role-Based Access

| **Feature**                      | **Admin** | **Manager** | **Member** |
|----------------------------------|----------|------------|------------|
| View restaurants & menu items   | ✅       | ✅         | ✅         |
| Create an order (add food items)| ✅       | ✅         | ✅         |
| Checkout & pay                  | ✅       | ✅         | ❌         |
| Cancel an order                 | ✅       | ✅         | ❌         |
| Add / Modify payment methods    | ✅       | ❌         | ❌         |
| **Country-Based Access**        | 🌍 Global | 🌍 Country | 🌍 Country |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/))
- **MongoDB** v5+ (Local or Atlas)
- **npm** or **yarn**
- **Git** (optional)

### Step-by-Step Installation

#### 1️⃣ Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd food_delivery

# Or download and extract the ZIP file
```

#### 2️⃣ Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3️⃣ Setup Environment Variables

Create a `.env` file in the `backend` folder:

```bash
cd backend
touch .env
```

Add the following configuration to `backend/.env`:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Connection
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/food_delivery

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/food_delivery

# JWT Secret (change this to a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

#### 4️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
# On Ubuntu/Debian
sudo systemctl start mongod

# On macOS (using Homebrew)
brew services start mongodb-community

# On Windows
# Start MongoDB service from Services app
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

#### 5️⃣ Seed the Database

```bash
# From the backend directory
cd backend
node scripts/seedData.js
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

#### 6️⃣ Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:3000/
```

#### 7️⃣ Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/health

**Application URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Quick Login Credentials

All users have password: `password123`

| Role | Name | Email | Country |
|------|------|-------|---------|
| Admin | Nick Fury | nick@slooze.xyz | Global |
| Manager | Captain Marvel | marvel@slooze.xyz | India |
| Manager | Captain America | america@slooze.xyz | America |
| Member | Thanos | thanos@slooze.xyz | India |
| Member | Travis | travis@slooze.xyz | America |

---

## � Troubleshooting

### Common Issues and Solutions

#### ❌ MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `sudo systemctl status mongod`
- Or use MongoDB Atlas (cloud) instead
- Check `MONGODB_URI` in `.env` file

#### ❌ Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution:**
- Kill the process using the port: `lsof -ti:5000 | xargs kill -9`
- Or change the port in `backend/.env`

#### ❌ Frontend Proxy Error
```
[vite] http proxy error: /api/...
```
**Solution:**
- Ensure backend server is running on port 5000
- Check `vite.config.js` proxy configuration

#### ❌ No Payment Methods Found
**Solution:**
- Run the seed script: `cd backend && node scripts/seedData.js`
- Login as Admin or Manager (they have payment methods)

#### ❌ Invalid Credentials Error
**Solution:**
- Ensure database is seeded with demo users
- Use correct email and password: `password123`
- Check MongoDB connection

#### ❌ Module Not Found Errors
**Solution:**
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

---

## � Documentation

Comprehensive documentation is available:

- **[PROJECT_README.md](./PROJECT_README.md)** - Complete project documentation
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions
- **[API_COLLECTION.md](./API_COLLECTION.md)** - Full API documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[DEMO_GUIDE.md](./DEMO_GUIDE.md)** - Demo script and testing guide

---

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password encryption

### Frontend
- **React 18** + **Vite** - UI framework
- **React Router** - Navigation
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

---

## ✨ Key Features Implemented

### 🔒 Security & Authentication
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based middleware

### 👥 Role-Based Access Control
- Admin, Manager, Member roles
- Granular permission system
- UI adapts to user role
- API enforces authorization

### 🌍 Country-Based Filtering
- Users restricted to their country (India/America)
- Admin has global access
- Filtering at API level (secure)
- Automatic data filtering

### 🍽️ Complete Order Flow
- Browse restaurants by country
- View restaurant menus
- Add items to cart
- Create orders (all roles)
- Checkout & payment (Admin/Manager only)
- Order tracking and history
- Order cancellation (Admin/Manager only)

### 💳 Payment Management
- Multiple payment methods
- Card number masking
- Default payment selection
- Admin-only access

### 🎨 Modern UI/UX
- Fully responsive design
- Gradient color scheme
- Smooth animations
- Toast notifications
- Loading states
- Empty states with CTAs
- Mobile-friendly navigation

---

## 📁 Project Structure

```
food_delivery/
├── backend/              # Express.js API
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & RBAC
│   └── scripts/         # Database seeding
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # State management
│   │   └── utils/       # API client
│   └── public/
├── PROJECT_README.md    # Detailed documentation
├── SETUP_GUIDE.md       # Setup instructions
├── API_COLLECTION.md    # API endpoints
└── DEMO_GUIDE.md        # Demo script
```

---

## 🧪 Testing the Application

1. **Login as Admin** - Full access to all features
2. **Login as Manager** - Country-specific access, can checkout
3. **Login as Member** - Country-specific access, cannot checkout
4. **Test RBAC** - Try accessing restricted features
5. **Test Country Filtering** - Compare India vs America data

---

## 📊 Bonus Features Implemented

✅ **Country-Based Relational Access** (10 points)
- Managers and Members restricted to their country
- Admin has global access
- Secure API-level filtering

✅ **Additional Enhancements:**
- Modern gradient UI design
- Real-time cart updates
- Persistent state (localStorage)
- Comprehensive error handling
- Input validation
- Responsive mobile design
- Toast notifications
- Loading states

---

## 🎬 Demo Video Script

1. **Admin Demo** - Show global access, payment management
2. **Manager Demo** - Show country restriction, checkout capability
3. **Member Demo** - Show limited access, cannot checkout
4. **Feature Highlights** - RBAC, country filtering, order flow

---

## 📧 Submission

This project includes:
- ✅ Complete source code (backend + frontend)
- ✅ Comprehensive documentation
- ✅ Setup instructions
- ✅ API collection
- ✅ Database seeding scripts
- ✅ Demo guide
- ✅ Architecture documentation

**Contact:** careers@slooze.xyz

---

## © Copyright Notice

**© Slooze. All Rights Reserved.**

Please do not share or distribute this material outside the intended evaluation process.

---

## 📋 Quick Reference

### Useful Commands

```bash
# Backend Commands
cd backend
npm run dev          # Start development server
npm start            # Start production server
node scripts/seedData.js  # Seed database

# Frontend Commands
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Database Commands
mongosh              # Open MongoDB shell
use food_delivery    # Switch to database
db.users.find()      # View all users
db.orders.find()     # View all orders
```

### API Endpoints Quick Reference

```
Authentication:
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user

Restaurants:
GET    /api/restaurants      - Get all restaurants
GET    /api/restaurants/:id  - Get single restaurant
GET    /api/restaurants/:id/menu - Get restaurant menu

Orders:
GET    /api/orders           - Get user orders
POST   /api/orders           - Create new order
GET    /api/orders/:id       - Get single order
PUT    /api/orders/:id/checkout - Checkout order (Admin/Manager)
PUT    /api/orders/:id/cancel - Cancel order (Admin/Manager)

Payment Methods:
GET    /api/payment-methods  - Get payment methods
POST   /api/payment-methods  - Add payment method (Admin)
PUT    /api/payment-methods/:id - Update payment method (Admin)
DELETE /api/payment-methods/:id - Delete payment method (Admin)
```

### Project Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend API | 5000 | http://localhost:5000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

---

**Built with ❤️ using MERN Stack**
