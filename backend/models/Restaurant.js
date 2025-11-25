import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  country: {
    type: String,
    enum: ['India', 'America'],
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
  },
  rating: {
    type: Number,
    default: 4.0,
    min: 0,
    max: 5
  },
  deliveryTime: {
    type: String,
    default: '30-40 mins'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
