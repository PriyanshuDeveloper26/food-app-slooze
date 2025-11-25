# 📡 API Collection

Complete API documentation for Slooze Food Delivery Application.

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected routes require JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication APIs

### 1. Register User

**POST** `/auth/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member",
  "country": "India"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member",
      "country": "India",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Login User

**POST** `/auth/login`

**Body:**
```json
{
  "email": "nick@slooze.xyz",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "Nick Fury",
      "email": "nick@slooze.xyz",
      "role": "admin",
      "country": "Global",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Get Current User

**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Nick Fury",
    "email": "nick@slooze.xyz",
    "role": "admin",
    "country": "Global"
  }
}
```

---

## 🏪 Restaurant APIs

### 4. Get All Restaurants

**GET** `/restaurants`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Params:** None (filtered by user's country automatically)

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Spice Garden",
      "description": "Authentic Indian cuisine with a modern twist",
      "country": "India",
      "cuisine": "Indian",
      "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      "rating": 4.5,
      "deliveryTime": "25-35 mins",
      "isActive": true
    }
  ]
}
```

### 5. Get Single Restaurant

**GET** `/restaurants/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "Spice Garden",
    "description": "Authentic Indian cuisine with a modern twist",
    "country": "India",
    "cuisine": "Indian",
    "rating": 4.5
  }
}
```

### 6. Get Restaurant Menu

**GET** `/restaurants/:id/menu`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "restaurant": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Butter Chicken",
      "description": "Creamy tomato-based curry with tender chicken",
      "price": 350,
      "category": "Main Course",
      "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      "isVeg": false,
      "isAvailable": true,
      "country": "India"
    }
  ]
}
```

---

## 📦 Order APIs

### 7. Create Order

**POST** `/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "restaurantId": "65a1b2c3d4e5f6g7h8i9j0k2",
  "items": [
    {
      "menuItem": "65a1b2c3d4e5f6g7h8i9j0k3",
      "quantity": 2
    },
    {
      "menuItem": "65a1b2c3d4e5f6g7h8i9j0k4",
      "quantity": 1
    }
  ],
  "deliveryAddress": "123 Main Street, Mumbai, India"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "restaurant": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Spice Garden"
    },
    "items": [
      {
        "menuItem": "65a1b2c3d4e5f6g7h8i9j0k3",
        "name": "Butter Chicken",
        "price": 350,
        "quantity": 2
      }
    ],
    "totalAmount": 700,
    "status": "pending",
    "paymentStatus": "pending",
    "country": "India",
    "deliveryAddress": "123 Main Street, Mumbai, India"
  }
}
```

### 8. Get All Orders

**GET** `/orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "restaurant": {
        "name": "Spice Garden",
        "image": "..."
      },
      "items": [...],
      "totalAmount": 700,
      "status": "confirmed",
      "paymentStatus": "paid"
    }
  ]
}
```

### 9. Get Single Order

**GET** `/orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "restaurant": {...},
    "items": [...],
    "totalAmount": 700,
    "status": "confirmed"
  }
}
```

### 10. Checkout Order

**PUT** `/orders/:id/checkout`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin, Manager only

**Body:**
```json
{
  "paymentMethodId": "65a1b2c3d4e5f6g7h8i9j0k6"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "status": "confirmed",
    "paymentStatus": "paid",
    "paymentMethod": "65a1b2c3d4e5f6g7h8i9j0k6"
  }
}
```

### 11. Cancel Order

**PUT** `/orders/:id/cancel`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin, Manager only

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
    "status": "cancelled",
    "paymentStatus": "refunded"
  }
}
```

---

## 💳 Payment Method APIs

### 12. Get Payment Methods

**GET** `/payment-methods`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
      "user": "65a1b2c3d4e5f6g7h8i9j0k1",
      "type": "credit_card",
      "cardNumber": "**** **** **** 9012",
      "cardHolderName": "Nick Fury",
      "expiryDate": "12/25",
      "isDefault": true,
      "country": "Global"
    }
  ]
}
```

### 13. Add Payment Method

**POST** `/payment-methods`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin only

**Body:**
```json
{
  "type": "credit_card",
  "cardNumber": "4532123456789012",
  "cardHolderName": "Nick Fury",
  "expiryDate": "12/25",
  "isDefault": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
    "type": "credit_card",
    "cardNumber": "**** **** **** 9012",
    "cardHolderName": "Nick Fury",
    "expiryDate": "12/25",
    "isDefault": true
  }
}
```

### 14. Update Payment Method

**PUT** `/payment-methods/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin only

**Body:**
```json
{
  "isDefault": true,
  "expiryDate": "12/26"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k6",
    "expiryDate": "12/26",
    "isDefault": true
  }
}
```

### 15. Delete Payment Method

**DELETE** `/payment-methods/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Access:** Admin only

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide email and password"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'member' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## 🧪 Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nick@slooze.xyz","password":"password123"}'
```

### Get Restaurants
```bash
curl http://localhost:5000/api/restaurants \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "restaurantId": "RESTAURANT_ID",
    "items": [{"menuItem": "MENU_ITEM_ID", "quantity": 2}],
    "deliveryAddress": "123 Main St"
  }'
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Card numbers are automatically masked in responses
- Country filtering happens automatically based on user's country
- Admin users with "Global" country can access all data
- Prices are in INR (₹) for India and USD ($) for America

## 🔗 Postman Collection

Import this collection into Postman for easy testing:

1. Create a new collection named "Slooze Food Delivery"
2. Add environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)
3. Import the endpoints above
4. Use `{{base_url}}` and `{{token}}` in your requests

---

For more information, refer to [PROJECT_README.md](./PROJECT_README.md)
