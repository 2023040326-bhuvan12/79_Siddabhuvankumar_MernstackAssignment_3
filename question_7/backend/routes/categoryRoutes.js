const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

// ADD CATEGORY
router.post("/add", async (req, res) => {
    try {
        const { name, parentCategory } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const category = new Category({
            name: name.trim(),
            parentCategory: parentCategory || null
        });

        await category.save();

        res.status(201).json({
            message: "Category added successfully",
            category
        });

    } catch (error) {
        console.log("Add category error:", error);

        res.status(500).json({
            message: "Unable to add category",
            error: error.message
        });
    }
});

// GET ALL CATEGORIES
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find()
            .populate("parentCategory", "name")
            .sort({ createdAt: -1 });

        res.json(categories);

    } catch (error) {
        console.log("Get category error:", error);

        res.status(500).json({
            message: "Unable to fetch categories"
        });
    }
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to delete category"
        });
    }
});

module.exports = router;