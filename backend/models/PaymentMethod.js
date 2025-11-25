import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'paypal', 'net_banking'],
    required: true
  },
  cardNumber: {
    type: String,
    required: function() {
      return this.type === 'credit_card' || this.type === 'debit_card';
    }
  },
  cardHolderName: {
    type: String,
    required: function() {
      return this.type === 'credit_card' || this.type === 'debit_card';
    }
  },
  expiryDate: {
    type: String,
    required: function() {
      return this.type === 'credit_card' || this.type === 'debit_card';
    }
  },
  upiId: {
    type: String,
    required: function() {
      return this.type === 'upi';
    }
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  country: {
    type: String,
    enum: ['India', 'America', 'Global'],
    required: true
  }
}, {
  timestamps: true
});

// Mask card number before sending to client
paymentMethodSchema.methods.toJSON = function() {
  const obj = this.toObject();
  if (obj.cardNumber) {
    obj.cardNumber = '**** **** **** ' + obj.cardNumber.slice(-4);
  }
  return obj;
};

const PaymentMethod = mongoose.model('PaymentMethod', paymentMethodSchema);

export default PaymentMethod;
