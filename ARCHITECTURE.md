# 🏗️ Architecture Documentation

## System Overview

The application follows a 3-tier architecture:
1. **Client Layer** - React SPA with Zustand state management
2. **Application Layer** - Express.js REST API with JWT authentication
3. **Data Layer** - MongoDB with Mongoose ODM

## Authentication Flow

```
Login → Validate Credentials → Generate JWT → Store Token → Protected Routes
```

## Authorization Matrix

| Feature | Admin | Manager | Member |
|---------|-------|---------|--------|
| View Restaurants | ✅ All Countries | ✅ Own Country | ✅ Own Country |
| Create Orders | ✅ | ✅ | ✅ |
| Checkout/Pay | ✅ | ✅ | ❌ |
| Cancel Orders | ✅ | ✅ | ❌ |
| Manage Payments | ✅ | ❌ | ❌ |

## Database Schema

**Users:** email (unique), role, country
**Restaurants:** name, country, cuisine
**MenuItems:** restaurant (ref), price, country
**Orders:** user (ref), restaurant (ref), items, status
**PaymentMethods:** user (ref), type, cardNumber (encrypted)

## Security Features

- JWT token-based authentication (30-day expiration)
- Password hashing with bcryptjs (12 rounds)
- Role-based access control (RBAC) middleware
- Country-based data filtering
- Card number masking in responses
- Protected API routes

## State Management

**Zustand Stores:**
- **authStore**: User authentication state
- **cartStore**: Shopping cart with persistence

Both stores persist to localStorage for session continuity.

## API Design

RESTful endpoints with consistent response format:
```json
{
  "success": true/false,
  "data": {},
  "message": "string"
}
```

All protected endpoints require:
```
Authorization: Bearer <jwt_token>
```

## Error Handling

Centralized error handling middleware catches:
- Authentication errors (401)
- Authorization errors (403)
- Validation errors (400)
- Not found errors (404)
- Server errors (500)
