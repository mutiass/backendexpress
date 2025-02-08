const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDBv1 = async () => {
  try {
    await client.connect();
    console.log("✅ [MongoDB Native] Database Connected");
    return client.db("productsDB"); // Pastikan database spesifik
  } catch (error) {
    console.error("❌ [MongoDB Native] Error:", error);
    process.exit(1); // Stop server jika gagal
  }
};

module.exports = { connectDBv1 };
