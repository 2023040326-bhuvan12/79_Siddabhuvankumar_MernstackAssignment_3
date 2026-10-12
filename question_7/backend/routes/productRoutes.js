const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ==========================================
// ADD PRODUCT
// ==========================================

router.post("/add", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            quantity,
            image,
            category
        } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const product = new Product({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            quantity: Number(quantity) || 0,
            image: image || "",
            category
        });

        await product.save();

        res.status(201).json({
            message: "Product added successfully",
            product
        });

    } catch (error) {
        console.log("Add product error:", error);

        res.status(500).json({
            message: "Unable to add product",
            error: error.message
        });
    }
});


// ==========================================
// GET ALL PRODUCTS
// ==========================================

router.get("/", async (req, res) => {
    try {

        const products = await Product.find()
            .populate("category", "name parentCategory")
            .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {

        console.log("Get products error:", error);

        res.status(500).json({
            message: "Unable to fetch products",
            error: error.message
        });
    }
});


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

router.get("/:id", async (req, res) => {
    try {

        const product = await Product.findById(
            req.params.id
        ).populate("category", "name parentCategory");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);

    } catch (error) {

        console.log("Get single product error:", error);

        res.status(500).json({
            message: "Unable to fetch product",
            error: error.message
        });
    }
});


// ==========================================
// UPDATE PRODUCT
// ==========================================

router.put("/:id", async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            quantity,
            image,
            category
        } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: name.trim(),
                description: description.trim(),
                price: Number(price),
                quantity: Number(quantity),
                image: image || "",
                category
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        console.log("Update product error:", error);

        res.status(500).json({
            message: "Unable to update product",
            error: error.message
        });
    }
});


// ==========================================
// DELETE PRODUCT
// ==========================================

router.delete("/:id", async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log("Delete product error:", error);

        res.status(500).json({
            message: "Unable to delete product",
            error: error.message
        });
    }
});


module.exports = router;