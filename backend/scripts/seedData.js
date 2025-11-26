import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import PaymentMethod from '../models/PaymentMethod.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Restaurant.deleteMany();
    await MenuItem.deleteMany();
    await PaymentMethod.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
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
    ]);

    console.log('👥 Created users');

    // Create restaurants - India
    const indiaRestaurants = await Restaurant.create([
      {
        name: 'Spice Garden',
        description: 'Authentic Indian cuisine with a modern twist',
        country: 'India',
        cuisine: 'Indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
        rating: 4.5,
        deliveryTime: '25-35 mins'
      },
      {
        name: 'Mumbai Masala',
        description: 'Traditional Mumbai street food favorites',
        country: 'India',
        cuisine: 'Indian',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
        rating: 4.3,
        deliveryTime: '30-40 mins'
      },
      {
        name: 'Delhi Darbar',
        description: 'North Indian delicacies and kebabs',
        country: 'India',
        cuisine: 'North Indian',
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
        rating: 4.7,
        deliveryTime: '35-45 mins'
      }
    ]);

    // Create restaurants - America
    const americaRestaurants = await Restaurant.create([
      {
        name: 'Burger Palace',
        description: 'Classic American burgers and fries',
        country: 'America',
        cuisine: 'American',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
        rating: 4.4,
        deliveryTime: '20-30 mins'
      },
      {
        name: 'Pizza Paradise',
        description: 'New York style pizza and Italian classics',
        country: 'America',
        cuisine: 'Italian',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
        rating: 4.6,
        deliveryTime: '25-35 mins'
      },
      {
        name: 'Taco Town',
        description: 'Authentic Mexican tacos and burritos',
        country: 'America',
        cuisine: 'Mexican',
        image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800',
        rating: 4.5,
        deliveryTime: '20-30 mins'
      }
    ]);

    console.log('🏪 Created restaurants');

    // Create menu items for India restaurants
    const indiaMenuItems = [];
    
    // Spice Garden menu
    indiaMenuItems.push(
      {
        restaurant: indiaRestaurants[0]._id,
        name: 'Butter Chicken',
        description: 'Creamy tomato-based curry with tender chicken',
        price: 350,
        category: 'Main Course',
        image: '/assets/butter-chicken.jpg',
        isVeg: false,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[0]._id,
        name: 'Paneer Tikka Masala',
        description: 'Cottage cheese in rich spicy gravy',
        price: 300,
        category: 'Main Course',
        image: '/assets/paneer-tikka-masala.jpg',
        isVeg: true,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[0]._id,
        name: 'Garlic Naan',
        description: 'Soft flatbread topped with garlic and butter',
        price: 60,
        category: 'Sides',
        image: '/assets/garlic-naan.jpg',
        isVeg: true,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[0]._id,
        name: 'Mango Lassi',
        description: 'Sweet yogurt drink with mango',
        price: 80,
        category: 'Beverage',
        image: '/assets/mango-lassi.jpg',
        isVeg: true,
        country: 'India'
      }
    );

    // Mumbai Masala menu
    indiaMenuItems.push(
      {
        restaurant: indiaRestaurants[1]._id,
        name: 'Vada Pav',
        description: 'Mumbai\'s famous street food burger',
        price: 40,
        category: 'Appetizer',
        image: '/assets/vada-pau.jpg',
        isVeg: true,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[1]._id,
        name: 'Pav Bhaji',
        description: 'Mixed vegetables curry with buttered bread',
        price: 120,
        category: 'Main Course',
        image: '/assets/pau-bhaji.jpg',
        isVeg: true,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[1]._id,
        name: 'Pani Puri',
        description: 'Crispy shells filled with spicy water',
        price: 50,
        category: 'Appetizer',
        image: '/assets/pani-puri.jpg',
        isVeg: true,
        country: 'India'
      }
    );

    // Delhi Darbar menu
    indiaMenuItems.push(
      {
        restaurant: indiaRestaurants[2]._id,
        name: 'Chicken Tikka',
        description: 'Grilled chicken marinated in yogurt and spices',
        price: 280,
        category: 'Appetizer',
        image: '/assets/chicken-tikka.jpg',
        isVeg: false,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[2]._id,
        name: 'Dal Makhani',
        description: 'Black lentils cooked in butter and cream',
        price: 250,
        category: 'Main Course',
        image: '/assets/dal-makhni.jpg',
        isVeg: true,
        country: 'India'
      },
      {
        restaurant: indiaRestaurants[2]._id,
        name: 'Biryani',
        description: 'Aromatic rice dish with spices and meat',
        price: 320,
        category: 'Main Course',
        image: '/assets/biryani.jpg',
        isVeg: false,
        country: 'India'
      }
    );

    // Create menu items for America restaurants
    const americaMenuItems = [];

    // Burger Palace menu
    americaMenuItems.push(
      {
        restaurant: americaRestaurants[0]._id,
        name: 'Classic Cheeseburger',
        description: 'Cheese patty with lettuce, and tomato',
        price: 12.99,
        category: 'Main Course',
        image: '/assets/Classic-Cheeseburger.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[0]._id,
        name: 'Veggie Burger',
        description: 'Plant-based patty with fresh vegetables',
        price: 11.99,
        category: 'Main Course',
        image: '/assets/Veggie-Burger.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[0]._id,
        name: 'French Fries',
        description: 'Crispy golden fries',
        price: 4.99,
        category: 'Sides',
        image: '/assets/French-Fries.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[0]._id,
        name: 'Chocolate Shake',
        description: 'Thick and creamy chocolate milkshake',
        price: 5.99,
        category: 'Beverage',
        image: '/assets/Chocolate-Shake.jpg',
        isVeg: true,
        country: 'America'
      }
    );

    // Pizza Paradise menu
    americaMenuItems.push(
      {
        restaurant: americaRestaurants[1]._id,
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        price: 14.99,
        category: 'Main Course',
        image: '/assets/Margherita-Pizza.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[1]._id,
        name: 'Pepperoni Pizza',
        description: 'Classic pizza with pepperoni slices',
        price: 16.99,
        category: 'Main Course',
        image: '/assets/Pepperoni-Pizza.jpg',
        isVeg: false,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[1]._id,
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with caesar dressing',
        price: 8.99,
        category: 'Appetizer',
        image: '/assets/Caesar-Salad.jpg',
        isVeg: true,
        country: 'America'
      }
    );

    // Taco Town menu
    americaMenuItems.push(
      {
        restaurant: americaRestaurants[2]._id,
        name: 'Beef Tacos',
        description: 'Three tacos with seasoned beef and toppings',
        price: 10.99,
        category: 'Main Course',
        image: '/assets/beef-tacos.jpg',
        isVeg: false,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[2]._id,
        name: 'Veggie Burrito',
        description: 'Large burrito filled with beans, rice, and veggies',
        price: 9.99,
        category: 'Main Course',
        image: '/assets/veggie-burrito.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[2]._id,
        name: 'Guacamole & Chips',
        description: 'Fresh guacamole with tortilla chips',
        price: 6.99,
        category: 'Appetizer',
        image: '/assets/guacamole-&-chips.jpg',
        isVeg: true,
        country: 'America'
      },
      {
        restaurant: americaRestaurants[2]._id,
        name: 'Churros',
        description: 'Sweet fried dough with cinnamon sugar',
        price: 5.99,
        category: 'Dessert',
        image: '/assets/Churros.jpg',
        isVeg: true,
        country: 'America'
      }
    );

    await MenuItem.create([...indiaMenuItems, ...americaMenuItems]);

    console.log('🍽️  Created menu items');

    // Create sample payment methods for admin and managers
    await PaymentMethod.create([
      // Nick Fury (Admin)
      {
        user: users[0]._id,
        type: 'credit_card',
        cardNumber: '4532123456789012',
        cardHolderName: 'Nick Fury',
        expiryDate: '12/25',
        isDefault: true,
        country: 'Global'
      },
      {
        user: users[0]._id,
        type: 'upi',
        upiId: 'nick@paytm',
        isDefault: false,
        country: 'Global'
      },
      // Captain Marvel (Manager - India)
      {
        user: users[1]._id,
        type: 'credit_card',
        cardNumber: '4532987654321098',
        cardHolderName: 'Captain Marvel',
        expiryDate: '11/26',
        isDefault: true,
        country: 'India'
      },
      {
        user: users[1]._id,
        type: 'upi',
        upiId: 'marvel@paytm',
        isDefault: false,
        country: 'India'
      },
      // Captain America (Manager - America)
      {
        user: users[2]._id,
        type: 'credit_card',
        cardNumber: '4532111122223333',
        cardHolderName: 'Captain America',
        expiryDate: '10/27',
        isDefault: true,
        country: 'America'
      }
    ]);

    console.log('💳 Created payment methods');
    console.log('\n✅ Database seeded successfully!');
    console.log('\n📧 Login credentials:');
    console.log('Admin: nick@slooze.xyz / password123');
    console.log('Manager (India): marvel@slooze.xyz / password123');
    console.log('Manager (America): america@slooze.xyz / password123');
    console.log('Member (India): thanos@slooze.xyz / password123');
    console.log('Member (India): thor@slooze.xyz / password123');
    console.log('Member (America): travis@slooze.xyz / password123');

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => seedData());
