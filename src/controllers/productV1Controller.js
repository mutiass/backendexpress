const { connectDBv1 } = require("../config/dbV1");
const { ObjectId } = require("mongodb");

let collection;

const initializeDB = async () => {
  const db = await connectDBv1();
  collection = db.collection("products");
};

initializeDB();

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const newProduct = { name, price, stock, status };
    const result = await collection.insertOne(newProduct);
    res.status(201).json({ _id: result.insertedId, ...newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const products = await collection.find({}).toArray();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  try {
    const product = await collection.findOne({ _id: new ObjectId(req.params.id) });
    product ? res.json(product) : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body;
    const existing = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!existing) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = {
      name: name || existing.name,
      price: price ?? existing.price,
      stock: stock ?? existing.stock,
      status: status ?? existing.status,
    };

    await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedProduct });
    res.json({ _id: req.params.id, ...updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};
