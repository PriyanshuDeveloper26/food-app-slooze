# 🍕 Slooze Food Delivery Application

A full-stack food ordering web application with role-based access control (RBAC) and country-based data filtering, built with the MERN stack.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [User Roles & Permissions](#user-roles--permissions)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

## ✨ Features

### Core Functionalities

- **Restaurant Browsing**: View restaurants and their menu items
- **Order Creation**: Add food items to cart and create orders
- **Order Management**: Checkout, payment, and order cancellation
- **Payment Methods**: Manage multiple payment methods (Admin only)
- **Role-Based Access Control**: Different permissions for Admin, Manager, and Member roles
- **Country-Based Filtering**: Users can only access data from their assigned country (India/America)

### Technical Highlights

- 🔐 **JWT Authentication** with secure token management
- 🛡️ **Role-Based Authorization** (Admin, Manager, Member)
- 🌍 **Geographic Access Control** (India, America)
- 📱 **Fully Responsive Design** (Mobile, Tablet, Desktop)
- 🎨 **Modern UI/UX** with TailwindCSS
- ⚡ **Real-time Updates** with optimistic UI
- 🔄 **State Management** using Zustand
- 🚀 **Fast Performance** with Vite

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## 🏗️ Architecture

### Backend Architecture

```
backend/
├── models/          # Database schemas (User, Restaurant, MenuItem, Order, PaymentMethod)
├── controllers/     # Business logic handlers
├── routes/          # API route definitions
├── middleware/      # Authentication & authorization
├── config/          # Database configuration
├── scripts/         # Seed data scripts
└── server.js        # Entry point
```

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components
│   ├── store/       # State management (Zustand)
│   ├── utils/       # Utility functions (API client)
│   └── App.jsx      # Main app component
```

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env file with your MongoDB URI and JWT secret
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Seed the database:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Running the Complete Application

**Option 1: Two Terminal Windows**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Option 2: Production Build**
```bash
# Build frontend
cd frontend && npm run build

# Serve from backend (add static middleware)
cd backend && npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member",
  "country": "India"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /api/auth/me
Get current user (Protected)

### Restaurant Endpoints

#### GET /api/restaurants
Get all restaurants (filtered by user's country)

#### GET /api/restaurants/:id
Get single restaurant

#### GET /api/restaurants/:id/menu
Get restaurant menu items

### Order Endpoints

#### GET /api/orders
Get user's orders (Protected)

#### POST /api/orders
Create new order (Protected - All roles)
```json
{
  "restaurantId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "items": [
    {
      "menuItem": "65a1b2c3d4e5f6g7h8i9j0k2",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main St, City"
}
```

#### PUT /api/orders/:id/checkout
Checkout order (Protected - Admin, Manager)
```json
{
  "paymentMethodId": "65a1b2c3d4e5f6g7h8i9j0k3"
}
```

#### PUT /api/orders/:id/cancel
Cancel order (Protected - Admin, Manager)

### Payment Method Endpoints

#### GET /api/payment-methods
Get user's payment methods (Protected)

#### POST /api/payment-methods
Add payment method (Protected - Admin only)
```json
{
  "type": "credit_card",
  "cardNumber": "1234567890123456",
  "cardHolderName": "John Doe",
  "expiryDate": "12/25",
  "isDefault": true
}
```

#### PUT /api/payment-methods/:id
Update payment method (Protected - Admin only)

#### DELETE /api/payment-methods/:id
Delete payment method (Protected - Admin only)

## 👥 User Roles & Permissions

### Admin (Nick Fury)
- ✅ View restaurants & menu items
- ✅ Create orders
- ✅ Checkout & pay for orders
- ✅ Cancel orders
- ✅ Add/Modify payment methods
- ✅ Access data from all countries

### Manager (Captain Marvel - India, Captain America - America)
- ✅ View restaurants & menu items (country-specific)
- ✅ Create orders
- ✅ Checkout & pay for orders
- ✅ Cancel orders
- ❌ Manage payment methods
- 🌍 Access restricted to assigned country

### Member (Thanos, Thor - India, Travis - America)
- ✅ View restaurants & menu items (country-specific)
- ✅ Create orders
- ❌ Checkout & pay
- ❌ Cancel orders
- ❌ Manage payment methods
- 🌍 Access restricted to assigned country

## 📁 Project Structure

```
food_delivery/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── orderController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   └── PaymentMethod.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── orderRoutes.js
│   │   └── paymentRoutes.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Restaurants.jsx
│   │   │   ├── RestaurantDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── PaymentMethods.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   └── cartStore.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── README.md
└── PROJECT_README.md
```

## 🔑 Default Login Credentials

All users have the default password: `password123`

| Role | Name | Email | Country |
|------|------|-------|---------|
| Admin | Nick Fury | nick@slooze.xyz | Global |
| Manager | Captain Marvel | marvel@slooze.xyz | India |
| Manager | Captain America | america@slooze.xyz | America |
| Member | Thanos | thanos@slooze.xyz | India |
| Member | Thor | thor@slooze.xyz | India |
| Member | Travis | travis@slooze.xyz | America |

## 🎨 Design Highlights

- **Modern Gradient UI** with red-pink theme
- **Glassmorphism** effects on cards
- **Smooth Animations** and transitions
- **Responsive Grid Layouts** for all screen sizes
- **Intuitive Navigation** with visual feedback
- **Toast Notifications** for user actions
- **Loading States** for better UX
- **Empty States** with helpful CTAs

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected API routes with middleware
- Role-based access control
- Country-based data filtering
- Secure payment method storage (masked card numbers)
- Input validation and sanitization
- Error handling and logging

## 🧪 Testing the Application

1. **Login** as different users to test role-based access
2. **Browse restaurants** - notice country filtering
3. **Add items to cart** from a restaurant
4. **Create orders** - available for all roles
5. **Try checkout** - only Admin/Manager can proceed
6. **Manage payments** - only Admin can access
7. **Cancel orders** - only Admin/Manager can cancel
8. **Test responsive design** on different devices

## 📊 Database Schema

### User Schema
- name, email, password, role, country, isActive

### Restaurant Schema
- name, description, country, cuisine, image, rating, deliveryTime

### MenuItem Schema
- restaurant (ref), name, description, price, category, image, isVeg, country

### Order Schema
- user (ref), restaurant (ref), items[], totalAmount, status, paymentMethod (ref), country, deliveryAddress

### PaymentMethod Schema
- user (ref), type, cardNumber, cardHolderName, expiryDate, upiId, isDefault, country

## 🚦 Application Flow

1. **Authentication**: User logs in with email/password
2. **Dashboard**: View stats and quick actions
3. **Browse Restaurants**: Filter by country (automatic)
4. **View Menu**: See available items at restaurant
5. **Add to Cart**: Select items and quantities
6. **Create Order**: Submit order with delivery address
7. **Checkout** (Admin/Manager): Select payment method and pay
8. **Track Orders**: View order history and status

## 🔧 Configuration

### Backend Configuration (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/food_delivery
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Frontend Proxy Configuration (vite.config.js)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  },
}
```

## 📝 Additional Notes

- The application uses **persistent state** with Zustand (cart and auth stored in localStorage)
- **Country-based filtering** is implemented at the API level for security
- **Payment processing** is simulated (no real payment gateway integration)
- **Image URLs** use Unsplash for demo purposes
- **Database seeding** creates sample data for immediate testing

## 🎯 Future Enhancements

- Real payment gateway integration (Stripe, Razorpay)
- Order tracking with real-time updates (WebSockets)
- Restaurant owner dashboard
- Review and rating system
- Advanced search and filters
- Order history analytics
- Push notifications
- Email notifications
- Multi-language support
- Dark mode theme

## 👨‍💻 Development

### Running Tests
```bash
# Backend tests (if implemented)
cd backend && npm test

# Frontend tests (if implemented)
cd frontend && npm test
```

### Building for Production
```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm start
```

## 📄 License

© Slooze. All Rights Reserved.

## 📧 Contact

For any questions or issues, reach out to: careers@slooze.xyz

---

**Happy Coding! 🚀**
