const mongoose = require('mongoose');
const Product = require('./Product');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Order must belong to a user']
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Order item must have a product']
      },
      quantity: {
        type: Number,
        required: [true, 'Order item must have a quantity'],
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: [true, 'Order item must have a price']
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Order must have a total amount']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    name: String,
    address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    required: [true, 'Order must have a payment method'],
    enum: ['credit_card', 'paypal', 'stripe', 'cash_on_delivery']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// QUERY MIDDLEWARE: Populate user and products
orderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  }).populate({
    path: 'items.product',
    select: 'name images price store'
  });

  next();
});

// Calculate the total price before saving
orderSchema.pre('save', async function(next) {
  // Calculate total amount
  this.totalAmount = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Update the updatedAt field
  this.updatedAt = Date.now();

  next();
});

// Update product sales after order status changes to delivered
orderSchema.post('save', async function() {
  if (this.status === 'delivered') {
    // Update each product sales in the order
    for (const item of this.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { sales: item.quantity }
      });
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;