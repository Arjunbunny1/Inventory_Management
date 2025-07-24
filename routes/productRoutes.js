const express = require('express');
const router = express.Router();
const { createProduct,updateProductQuantity } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createProduct);  // POST /api/products

router.put('/:id/quantity', protect, updateProductQuantity);

module.exports = router;
