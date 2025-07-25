const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;

  if (!name || !type || !sku || !image_url || quantity == null || price == null) {
    return res.status(400).json({ message: 'All fields are required except description' });
  }

  try {
    const exists = await Product.findOne({ sku, user: req.user._id });
    if (exists) {
         return res.status(400).json({ message: 'You already added a product with this SKU' });
    }
    // console.log(req.user._id)
    const newProduct = new Product({
      user: req.user._id,  // Comes from JWT middleware
      name, type, sku, image_url, description, quantity, price
    });

    const saved = await newProduct.save();
    res.status(201).json({ message: 'Product added', productId: saved._id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

exports.updateProductQuantity = async (req, res) => {
  const productId = req.params.id;
  const { quantity } = req.body;

  if (quantity == null) {
    return res.status(400).json({ message: 'Quantity is required' });
  }

  try {
    const product = await Product.findOne({ _id: productId, user: req.user._id });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.quantity = quantity;
    await product.save();

    res.status(200).json({ message: 'Quantity updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
};


exports.getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ _id: productId, user: req.user._id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch only products of the logged-in user
    const products = await Product.find({ user: req.user._id })
                                  .skip(skip)
                                  .limit(limit);

    const total = await Product.countDocuments({ user: req.user._id });

    res.status(200).json({
      page,
      limit,
      total,
      products
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};





