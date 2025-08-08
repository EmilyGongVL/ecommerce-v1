const mongoose = require('mongoose');
const slugify = require('slugify');
const Store = require('./Store');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true,
    maxlength: [100, 'A product name must have less than or equal to 100 characters'],
    minlength: [3, 'A product name must have more than or equal to 3 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A product must have a description'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function(val) {
        // this only points to current document on NEW document creation
        return val < this.price;
      },
      message: 'Discount price ({VALUE}) should be less than regular price'
    }
  },
  images: [String],
  store: {
    type: mongoose.Schema.ObjectId,
    ref: 'Store',
    required: [true, 'A product must belong to a store']
  },
  category: {
    type: String,
    required: [true, 'A product must have a category']
  },
  subcategory: String,
  quantity: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  specifications: [
    {
      name: String,
      value: String
    }
  ],
  isOnSale: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
productSchema.index({ price: 1, rating: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ store: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE: Only find active products
productSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// QUERY MIDDLEWARE: Populate the store field
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'store',
    select: 'name slug image rating'
  });
  next();
});

// AGGREGATION MIDDLEWARE
productSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { active: { $ne: false } } });
  next();
});

// Update store statistics after product saved
productSchema.post('save', async function() {
  // Use the constructor to access the model
  await Store.calcStats(this.store);
});

// Update store statistics after product updated/deleted
productSchema.post(/^findOneAnd/, async function() {
  // this.r is the document being updated
  if (this.r) {
    await Store.calcStats(this.r.store);
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;