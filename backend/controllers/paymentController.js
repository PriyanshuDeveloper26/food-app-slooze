import PaymentMethod from '../models/PaymentMethod.js';

// @desc    Get all payment methods for user
// @route   GET /api/payment-methods
// @access  Private
export const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: paymentMethods.length,
      data: paymentMethods
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add payment method
// @route   POST /api/payment-methods
// @access  Private (Admin only)
export const addPaymentMethod = async (req, res) => {
  try {
    const { type, cardNumber, cardHolderName, expiryDate, upiId, isDefault } = req.body;

    // If setting as default, unset other defaults
    if (isDefault) {
      await PaymentMethod.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const paymentMethod = await PaymentMethod.create({
      user: req.user._id,
      type,
      cardNumber,
      cardHolderName,
      expiryDate,
      upiId,
      isDefault: isDefault || false,
      country: req.user.country
    });

    res.status(201).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update payment method
// @route   PUT /api/payment-methods/:id
// @access  Private (Admin only)
export const updatePaymentMethod = async (req, res) => {
  try {
    let paymentMethod = await PaymentMethod.findById(req.params.id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Check if user owns the payment method
    if (paymentMethod.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this payment method'
      });
    }

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      await PaymentMethod.updateMany(
        { user: req.user._id, _id: { $ne: req.params.id } },
        { isDefault: false }
      );
    }

    paymentMethod = await PaymentMethod.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: paymentMethod
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/payment-methods/:id
// @access  Private (Admin only)
export const deletePaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Check if user owns the payment method
    if (paymentMethod.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this payment method'
      });
    }

    await paymentMethod.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
