const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, type, sku, image_url, description, quantity, price } = req.body;

  if (!name || !type || !sku || !image_url || quantity == null || price == null) {
    return res.status(400).json({ message: 'All fields are required except description' });
  }

  try {
    const exists = await Product.findOne({ sku });
    if (exists) return res.status(400).json({ message: 'Product with this SKU already exists' });
    console.log(req.user._id)
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
