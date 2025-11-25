import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Private
export const getRestaurants = async (req, res) => {
  try {
    let filter = {};

    // Apply country filter for managers and members
    if (req.countryFilter) {
      filter = { ...filter, ...req.countryFilter };
    }

    const restaurants = await Restaurant.find({ ...filter, isActive: true })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: restaurants.length,
      data: restaurants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Private
export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check country access
    if (req.countryFilter && restaurant.country !== req.user.country) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this restaurant'
      });
    }

    res.status(200).json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get menu items for a restaurant
// @route   GET /api/restaurants/:id/menu
// @access  Private
export const getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check country access
    if (req.countryFilter && restaurant.country !== req.user.country) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this restaurant'
      });
    }

    const menuItems = await MenuItem.find({
      restaurant: req.params.id,
      isAvailable: true
    });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
