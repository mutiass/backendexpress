const mongoose = require("mongoose");

const connectDBv2 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ [Mongoose] Connected Successfully");
  } catch (error) {
    console.error("❌ [Mongoose] Error:", error);
    process.exit(1);
  }
};

module.exports = { connectDBv2 };
