require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDBv1 } = require("./config/dbV1");
const { connectDBv2 } = require("./config/dbV2");
const productV1Routes = require("./routes/productV1Routes");
const productV2Routes = require("./routes/productV2Routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", productV1Routes);
app.use("/api/v2", productV2Routes);

// Jalankan server hanya jika database berhasil terhubung
(async () => {
  try {
    await connectDBv1();
    await connectDBv2();
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
})();
