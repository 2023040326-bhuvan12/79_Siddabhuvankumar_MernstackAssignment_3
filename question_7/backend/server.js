const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
// Create Express app
const app = express();

// Port
const PORT = process.env.PORT || 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// ROOT / TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.send("Shopping Cart Backend is Working!");
});

// ==========================================
// CATEGORY ROUTES
// ==========================================

app.use("/api/categories", categoryRoutes);

// ==========================================
// PRODUCT ROUTES
// ==========================================

app.use("/api/products", productRoutes);
// AUTH ROUTES
app.use("/api/auth", authRoutes);
// CART ROUTES
app.use("/api/cart", cartRoutes);
// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(
                `Server running at http://localhost:${PORT}`
            );
        });

    })
    .catch((error) => {

        console.log("MongoDB connection failed:");
        console.log(error.message);

    });