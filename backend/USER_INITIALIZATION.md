# 👥 User Initialization

## Overview
Default users are automatically created when the server starts for the first time. This eliminates the need for manual database seeding.

## Default Users

The following users are created automatically if the database is empty:

### Admin
- **Email:** nick@slooze.xyz
- **Password:** password123
- **Role:** admin
- **Country:** Global
- **Access:** Full access to all features

### Managers
1. **Captain Marvel** (India)
   - **Email:** marvel@slooze.xyz
   - **Password:** password123
   - **Role:** manager
   - **Country:** India

2. **Captain America** (America)
   - **Email:** america@slooze.xyz
   - **Password:** password123
   - **Role:** manager
   - **Country:** America

### Members
1. **Thanos** (India)
   - **Email:** thanos@slooze.xyz
   - **Password:** password123
   - **Role:** member
   - **Country:** India

2. **Thor** (India)
   - **Email:** thor@slooze.xyz
   - **Password:** password123
   - **Role:** member
   - **Country:** India

3. **Travis** (America)
   - **Email:** travis@slooze.xyz
   - **Password:** password123
   - **Role:** member
   - **Country:** America

## How It Works

1. **Server Startup:** When the server starts, it connects to MongoDB
2. **User Check:** The system checks if any users exist in the database
3. **Auto-Creation:** If no users exist, the default users are created automatically
4. **Skip If Exists:** If users already exist, initialization is skipped

## Implementation

### File: `/utils/initializeUsers.js`
Contains the logic to create default users on first run.

### File: `/server.js`
Calls `initializeUsers()` after successful database connection.

## Benefits

✅ No manual seeding required  
✅ Fresh databases get users automatically  
✅ Existing databases are not affected  
✅ Consistent demo credentials across deployments  
✅ Works in both development and production  

## For Development

Simply start the server:
```bash
npm run dev
```

If the database is empty, you'll see:
```
✅ MongoDB Connected
👥 Default users created successfully
📧 Login credentials:
   Admin: nick@slooze.xyz / password123
   ...
```

If users already exist:
```
✅ MongoDB Connected
✅ Users already exist, skipping initialization
```

## For Production

The same logic applies. On first deployment with an empty database, users are created automatically.

## Security Note

⚠️ **Important:** These are demo credentials. In a production environment, you should:
1. Change all default passwords immediately
2. Use environment variables for admin credentials
3. Implement proper user registration flows
4. Remove or disable demo accounts

## Removed Files

The following seed-related files have been removed:
- `/scripts/seedData.js` - Old manual seeding script
- `npm run seed` command from package.json

## Migration from Old System

If you were using the old seed script:
1. The new system automatically creates users on startup
2. No action needed - just start the server
3. Existing users in the database will not be affected
