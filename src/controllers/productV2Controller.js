const Product = require("../models/productV2Model");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const newProduct = new Product({ name, price, stock, status });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name || product.name;
    product.price = req.body.price ?? product.price;
    product.stock = req.body.stock ?? product.stock;
    product.status = req.body.status ?? product.status;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};
