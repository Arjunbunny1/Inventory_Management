const express = require('express');
const router = express.Router();
const { createProduct, updateProductQuantity, getAllProducts, getProductById,deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products for logged-in user (with pagination)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page (default 10)
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', protect, getAllProducts);


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - sku
 *               - image_url
 *               - description
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               sku:
 *                 type: string
 *               image_url:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Product with SKU already exists
 */
router.post('/', protect, createProduct);  


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', protect, getProductById);


/**
 * @swagger
 * /products/{id}/quantity:
 *   put:
 *     summary: Update quantity of a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product quantity updated
 *       404:
 *         description: Product not found
 */
router.put('/:id/quantity', protect, updateProductQuantity);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found or unauthorized
 */
router.delete('/:id', protect, deleteProduct);

module.exports = router;
