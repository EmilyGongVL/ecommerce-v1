const mongoose = require('mongoose');
const slugify = require('slugify');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A store must have a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'A store name must have less than or equal to 50 characters'],
    minlength: [3, 'A store name must have more than or equal to 3 characters']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A store must have a description'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'A store must have an image']
  },
  coverImage: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A store must belong to a user']
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10 // Round to 1 decimal place
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  sales: {
    type: Number,
    default: 0
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isUpcoming: {
    type: Boolean,
    default: false
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  categories: [String],
  location: {
    // GeoJSON
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number],
    address: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
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
storeSchema.index({ slug: 1 });
storeSchema.index({ location: '2dsphere' });

// Virtual populate with products
storeSchema.virtual('products', {
  ref: 'Product',
  foreignField: 'store',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
storeSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE: Only find active stores
storeSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Static method to calculate statistics
storeSchema.statics.calcStats = async function(storeId) {
  const stats = await this.aggregate([
    {
      $match: { store: storeId }
    },
    {
      $group: {
        _id: '$store',
        numProducts: { $sum: 1 },
        avgRating: { $avg: '$ratingsAverage' },
        totalSales: { $sum: '$sales' }
      }
    }
  ]);

  if (stats.length > 0) {
    await this.findByIdAndUpdate(storeId, {
      ratingsQuantity: stats[0].numProducts,
      rating: stats[0].avgRating,
      sales: stats[0].totalSales
    });
  }
};

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;