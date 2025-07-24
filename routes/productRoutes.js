const express = require('express');
const router = express.Router();
const { createProduct,updateProductQuantity,getAllProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllProducts);

router.post('/', protect, createProduct);  // POST /api/products

router.put('/:id/quantity', protect, updateProductQuantity);

module.exports = router;
