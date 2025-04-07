const express = require("express");
require("dotenv").config();
const cors = require("cors"); 
const ConnectionDB = require("./config/connectionDb");

const auth = require('./router/userRouter');
const bookingRoutes = require("./router/bookingRoutes");
const productRoutes = require("./router/product.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Server Port
const port = process.env.PORT || 5000;

// Connect to DB and Start Server
ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });

// Routes
app.use("/auth", auth);
app.use("/api/bookings", bookingRoutes);
app.use("/api/products", productRoutes); // ✅ FIXED: Pass the imported routes here
