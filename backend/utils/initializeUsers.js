import User from '../models/User.js';

/**
 * Initialize default users if they don't exist
 * These are the demo users shown in the quick login
 */
const initializeUsers = async () => {
  try {
    // Check if users already exist
    const userCount = await User.countDocuments();
    
    if (userCount > 0) {
      console.log('✅ Users already exist, skipping initialization');
      return;
    }

    // Create default users
    const defaultUsers = [
      {
        name: 'Nick Fury',
        email: 'nick@slooze.xyz',
        password: 'password123',
        role: 'admin',
        country: 'Global'
      },
      {
        name: 'Captain Marvel',
        email: 'marvel@slooze.xyz',
        password: 'password123',
        role: 'manager',
        country: 'India'
      },
      {
        name: 'Captain America',
        email: 'america@slooze.xyz',
        password: 'password123',
        role: 'manager',
        country: 'America'
      },
      {
        name: 'Thanos',
        email: 'thanos@slooze.xyz',
        password: 'password123',
        role: 'member',
        country: 'India'
      },
      {
        name: 'Thor',
        email: 'thor@slooze.xyz',
        password: 'password123',
        role: 'member',
        country: 'India'
      },
      {
        name: 'Travis',
        email: 'travis@slooze.xyz',
        password: 'password123',
        role: 'member',
        country: 'America'
      }
    ];

    await User.create(defaultUsers);
    console.log('👥 Default users created successfully');
    console.log('📧 Login credentials:');
    console.log('   Admin: nick@slooze.xyz / password123');
    console.log('   Manager (India): marvel@slooze.xyz / password123');
    console.log('   Manager (America): america@slooze.xyz / password123');
    console.log('   Member (India): thanos@slooze.xyz / password123');
    console.log('   Member (America): travis@slooze.xyz / password123');
  } catch (error) {
    console.error('❌ Error initializing users:', error.message);
  }
};

export default initializeUsers;
