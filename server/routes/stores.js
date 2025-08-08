const express = require('express');
const storeController = require('../controllers/storeController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.get('/', storeController.getAllStores);
router.get('/top-rated', storeController.getTopRatedStores);
router.get('/new', storeController.getNewStores);
router.get('/upcoming', storeController.getUpcomingStores);
router.get('/starred', storeController.getStarredStores);
router.get('/:id', storeController.getStore);
router.get('/:id/products', storeController.getStoreProducts);

// Protected routes - require login
router.use(authController.protect);

// Create store - only authenticated users can create stores
router.post('/', storeController.createStore);

// Store owner or admin only routes
router.patch('/:id', authController.restrictTo('admin', 'seller'), storeController.updateStore);
router.delete('/:id', authController.restrictTo('admin', 'seller'), storeController.deleteStore);

module.exports = router;