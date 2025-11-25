# 🎬 Demo Guide

## Quick Demo Script (5 minutes)

### 1. Admin Demo (Nick Fury)

**Login:** nick@slooze.xyz / password123

#### What to show:
- ✅ Access to all countries (Global access)
- ✅ View restaurants from both India and America
- ✅ Create an order
- ✅ Checkout with payment method
- ✅ Add/Edit payment methods
- ✅ Cancel orders

**Steps:**
1. Login as Admin
2. Navigate to Dashboard - show stats
3. Go to Restaurants - show all restaurants (India + America)
4. Click on any restaurant - add items to cart
5. Go to Cart - create order
6. Go to Orders - checkout the order
7. Go to Payment Methods - show management capability

---

### 2. Manager Demo (Captain Marvel - India)

**Login:** marvel@slooze.xyz / password123

#### What to show:
- ✅ Access restricted to India only
- ✅ Can only see Indian restaurants
- ✅ Can create and checkout orders
- ❌ Cannot manage payment methods

**Steps:**
1. Login as Manager (India)
2. Dashboard - show country restriction notice
3. Restaurants - only Indian restaurants visible
4. Try to order - works
5. Create order and checkout - works
6. Try to access Payment Methods - blocked (403 or not visible)

---

### 3. Member Demo (Travis - America)

**Login:** travis@slooze.xyz / password123

#### What to show:
- ✅ Access restricted to America only
- ✅ Can only see American restaurants
- ✅ Can create orders
- ❌ Cannot checkout orders
- ❌ Cannot manage payments

**Steps:**
1. Login as Member (America)
2. Dashboard - show limited permissions
3. Restaurants - only American restaurants
4. Add items to cart
5. Go to Cart - show "Members cannot checkout" message
6. Payment Methods link not visible in navbar

---

### 4. Country-Based Access Demo

**Show the difference:**

| Feature | Nick (Admin/Global) | Marvel (Manager/India) | Travis (Member/America) |
|---------|-------------------|---------------------|---------------------|
| Restaurants Visible | All | India only | America only |
| Can Checkout | ✅ | ✅ | ❌ |
| Can Cancel | ✅ | ✅ | ❌ |
| Payment Methods | ✅ | ❌ | ❌ |

---

## Feature Highlights

### 1. Role-Based Access Control (RBAC)
- Three distinct roles with different permissions
- Middleware enforces authorization
- UI adapts based on role

### 2. Country-Based Filtering
- Users only see data from their country
- API level filtering (secure)
- Admin with "Global" country sees all

### 3. Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Real-time cart updates
- Toast notifications
- Loading states

### 4. Complete Order Flow
- Browse restaurants
- View menu items
- Add to cart
- Create order
- Checkout (role-based)
- Track orders

### 5. Payment Management
- Multiple payment methods
- Card number masking
- Default payment selection
- Admin-only access

---

## Testing Scenarios

### Scenario 1: Happy Path
1. Login as Admin
2. Browse restaurants
3. Add items to cart
4. Create order
5. Checkout with payment
6. View order in history

### Scenario 2: Access Restriction
1. Login as Member
2. Try to checkout - blocked
3. Try to access payment methods - blocked
4. Can only browse and create orders

### Scenario 3: Country Filtering
1. Login as Manager (India)
2. Only see Indian restaurants
3. Login as Manager (America)
4. Only see American restaurants
5. Login as Admin
6. See all restaurants

### Scenario 4: Order Management
1. Create order as Admin
2. Checkout order
3. Try to cancel - works
4. Create order as Member
5. Try to checkout - blocked

---

## Demo Tips

1. **Use Quick Login** - Click on pre-filled user cards
2. **Show responsive design** - Resize browser window
3. **Highlight security** - Show role-based restrictions
4. **Demonstrate filtering** - Compare different user views
5. **Show cart persistence** - Cart survives page refresh

---

## Key Points to Mention

✨ **Technical Excellence:**
- MERN stack with best practices
- JWT authentication
- Role-based authorization
- Country-based access control
- Clean architecture
- RESTful API design

🎨 **UI/UX:**
- Modern gradient design
- Fully responsive
- Intuitive navigation
- Real-time feedback
- Smooth animations

🔒 **Security:**
- Password hashing
- Token-based auth
- Protected routes
- Input validation
- Error handling

📊 **Features:**
- Complete order flow
- Payment management
- Order tracking
- Multi-user support
- Geographic filtering

---

## Common Questions & Answers

**Q: Can a member checkout?**
A: No, only Admin and Manager roles can checkout and pay for orders.

**Q: Can a manager from India see American restaurants?**
A: No, country-based filtering restricts access to their assigned country.

**Q: Who can manage payment methods?**
A: Only Admin role has access to payment method management.

**Q: Is the payment processing real?**
A: No, it's simulated for demo purposes. Real integration would use Stripe/Razorpay.

**Q: Can users change their role or country?**
A: No, these are assigned during account creation and managed by admins.

---

## Video Demo Script

**Introduction (30 sec):**
"This is Slooze, a full-stack food delivery application built with the MERN stack, featuring role-based access control and country-based filtering."

**Admin Demo (1 min):**
"Let me login as Nick Fury, the admin. As you can see, I have access to all restaurants from both India and America..."

**Manager Demo (1 min):**
"Now as Captain Marvel, a manager from India, I can only see Indian restaurants. Watch what happens when I try to access payment methods..."

**Member Demo (1 min):**
"Finally, as Travis, a member from America, I can browse and order, but cannot checkout..."

**Conclusion (30 sec):**
"The application successfully implements role-based and geographic access control with a modern, responsive UI."

---

Ready to impress! 🎉
