const Store = require('../models/Store');
const Product = require('../models/Product');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get all stores
exports.getAllStores = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

  let query = Store.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // EXECUTE QUERY
  const stores = await query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: stores.length,
    data: {
      stores
    }
  });
});

// Get one store
exports.getStore = catchAsync(async (req, res, next) => {
  const store = await Store.findById(req.params.id).populate('products');

  if (!store) {
    return next(new AppError('No store found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      store
    }
  });
});

// Create store
exports.createStore = catchAsync(async (req, res, next) => {
  // Add the current user as the store owner
  req.body.owner = req.user.id;

  const newStore = await Store.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      store: newStore
    }
  });
});

// Update store
exports.updateStore = catchAsync(async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return next(new AppError('No store found with that ID', 404));
  }

  // Check if user is the store owner or admin
  if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to update this store', 403));
  }

  const updatedStore = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      store: updatedStore
    }
  });
});

// Delete store
exports.deleteStore = catchAsync(async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return next(new AppError('No store found with that ID', 404));
  }

  // Check if user is the store owner or admin
  if (store.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to delete this store', 403));
  }

  await Store.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get store products
exports.getStoreProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ store: req.params.id });

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});

// Get top stores by rating
exports.getTopRatedStores = catchAsync(async (req, res, next) => {
  const stores = await Store.find().sort('-rating').limit(5);

  res.status(200).json({
    status: 'success',
    results: stores.length,
    data: {
      stores
    }
  });
});

// Get new stores
exports.getNewStores = catchAsync(async (req, res, next) => {
  const stores = await Store.find({ isNew: true }).limit(10);

  res.status(200).json({
    status: 'success',
    results: stores.length,
    data: {
      stores
    }
  });
});

// Get upcoming stores
exports.getUpcomingStores = catchAsync(async (req, res, next) => {
  const stores = await Store.find({ isUpcoming: true }).limit(10);

  res.status(200).json({
    status: 'success',
    results: stores.length,
    data: {
      stores
    }
  });
});

// Get starred stores
exports.getStarredStores = catchAsync(async (req, res, next) => {
  const stores = await Store.find({ isStarred: true }).limit(10);

  res.status(200).json({
    status: 'success',
    results: stores.length,
    data: {
      stores
    }
  });
});