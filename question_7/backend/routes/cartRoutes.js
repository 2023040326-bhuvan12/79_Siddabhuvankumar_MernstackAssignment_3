const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================
// ADD PRODUCT TO CART
// ======================================

router.post("/add", authMiddleware, async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        const addQuantity = Number(quantity) || 1;


        // Check product
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        // Check stock
        if (product.quantity < addQuantity) {

            return res.status(400).json({
                message: "Insufficient product quantity"
            });

        }


        // Find user's cart
        let cart = await Cart.findOne({
            user: req.user.id
        });


        // Create cart if doesn't exist
        if (!cart) {

            cart = new Cart({
                user: req.user.id,
                items: []
            });

        }


        // Check whether product already exists
        const existingItem = cart.items.find(
            item =>
                item.product.toString() === productId
        );


        if (existingItem) {

            const newQuantity =
                existingItem.quantity + addQuantity;


            if (newQuantity > product.quantity) {

                return res.status(400).json({
                    message: "Not enough stock available"
                });

            }


            existingItem.quantity = newQuantity;

        } else {

            cart.items.push({
                product: productId,
                quantity: addQuantity
            });

        }


        await cart.save();


        // Return populated cart
        await cart.populate("items.product");


        res.json({

            message: "Product added to cart",

            cart

        });

    } catch (error) {

        console.log("Add cart error:", error);

        res.status(500).json({

            message: "Unable to add product to cart",

            error: error.message

        });

    }

});



// ======================================
// GET USER CART
// ======================================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("items.product");


        if (!cart) {

            return res.json({

                user: req.user.id,

                items: []

            });

        }


        res.json(cart);

    } catch (error) {

        console.log("Get cart error:", error);

        res.status(500).json({

            message: "Unable to fetch cart"

        });

    }

});



// ======================================
// UPDATE CART QUANTITY
// ======================================

router.put(
    "/update/:productId",
    authMiddleware,
    async (req, res) => {

        try {

            const { quantity } = req.body;

            const newQuantity = Number(quantity);


            if (!newQuantity || newQuantity < 1) {

                return res.status(400).json({

                    message: "Quantity must be at least 1"

                });

            }


            const product = await Product.findById(
                req.params.productId
            );


            if (!product) {

                return res.status(404).json({

                    message: "Product not found"

                });

            }


            if (newQuantity > product.quantity) {

                return res.status(400).json({

                    message: "Not enough stock available"

                });

            }


            const cart = await Cart.findOne({

                user: req.user.id

            });


            if (!cart) {

                return res.status(404).json({

                    message: "Cart not found"

                });

            }


            const item = cart.items.find(

                item =>
                    item.product.toString() ===
                    req.params.productId

            );


            if (!item) {

                return res.status(404).json({

                    message: "Product is not in cart"

                });

            }


            item.quantity = newQuantity;


            await cart.save();


            await cart.populate("items.product");


            res.json({

                message: "Cart updated successfully",

                cart

            });

        } catch (error) {

            console.log("Update cart error:", error);

            res.status(500).json({

                message: "Unable to update cart"

            });

        }

    }
);



// ======================================
// REMOVE PRODUCT FROM CART
// ======================================

router.delete(
    "/remove/:productId",
    authMiddleware,
    async (req, res) => {

        try {

            const cart = await Cart.findOne({

                user: req.user.id

            });


            if (!cart) {

                return res.status(404).json({

                    message: "Cart not found"

                });

            }


            cart.items = cart.items.filter(

                item =>
                    item.product.toString() !==
                    req.params.productId

            );


            await cart.save();


            await cart.populate("items.product");


            res.json({

                message: "Product removed from cart",

                cart

            });

        } catch (error) {

            console.log("Remove cart error:", error);

            res.status(500).json({

                message: "Unable to remove product"

            });

        }

    }
);


module.exports = router;