import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import Restaurant from '../models/Restaurant.js';
import PaymentMethod from '../models/PaymentMethod.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (All roles)
export const createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;

    // Validate restaurant
    const restaurant = await Restaurant.findById(restaurantId);
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
        message: 'Not authorized to order from this restaurant'
      });
    }

    // Validate and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      
      if (!menuItem || !menuItem.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `Menu item ${item.menuItem} is not available`
        });
      }

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });

      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items: orderItems,
      totalAmount,
      country: restaurant.country,
      deliveryAddress,
      status: 'pending'
    });

    await order.populate('restaurant');
    await order.populate('items.menuItem');

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req, res) => {
  try {
    let filter = { user: req.user._id };

    // Apply country filter for managers and members
    if (req.countryFilter) {
      filter = { ...filter, ...req.countryFilter };
    }

    const orders = await Order.find(filter)
      .populate('restaurant')
      .populate('items.menuItem')
      .populate('paymentMethod')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('restaurant')
      .populate('items.menuItem')
      .populate('paymentMethod');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Checkout and pay for order
// @route   PUT /api/orders/:id/checkout
// @access  Private (Admin, Manager)
export const checkoutOrder = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to checkout this order'
      });
    }

    // Validate payment method
    const paymentMethod = await PaymentMethod.findById(paymentMethodId);
    if (!paymentMethod || paymentMethod.user.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });
    }

    order.paymentMethod = paymentMethodId;
    order.paymentStatus = 'paid';
    order.status = 'confirmed';

    await order.save();
    await order.populate('restaurant');
    await order.populate('items.menuItem');
    await order.populate('paymentMethod');

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private (Admin, Manager)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    if (order.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Order is already cancelled'
      });
    }

    if (order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel delivered order'
      });
    }

    order.status = 'cancelled';
    if (order.paymentStatus === 'paid') {
      order.paymentStatus = 'refunded';
    }

    await order.save();
    await order.populate('restaurant');
    await order.populate('items.menuItem');
    await order.populate('paymentMethod');

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
