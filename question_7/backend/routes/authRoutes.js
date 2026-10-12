const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// =============================
// REGISTER USER
// =============================

router.post("/register", async (req, res) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;


        // Validation
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }


        // Check existing user
        const existingUser = await User.findOne({
            email
        });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user
        const user = new User({

            name: name.trim(),

            email: email.trim().toLowerCase(),

            password: hashedPassword,

            role: "user"

        });


        await user.save();


        res.status(201).json({

            message: "Registration successful"

        });

    } catch (error) {

        console.log("Register error:", error);

        res.status(500).json({

            message: "Registration failed",

            error: error.message

        });

    }
});



// =============================
// LOGIN USER
// =============================

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message: "Please enter email and password"

            });

        }


        // Find user
        const user = await User.findOne({

            email: email.trim().toLowerCase()

        });


        if (!user) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }


        // Check password
        const passwordMatch = await bcrypt.compare(

            password,

            user.password

        );


        if (!passwordMatch) {

            return res.status(401).json({

                message: "Invalid email or password"

            });

        }


        // Create JWT
        const token = jwt.sign(

            {
                id: user._id,

                email: user.email,

                role: user.role

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            message: "Login successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        console.log("Login error:", error);

        res.status(500).json({

            message: "Login failed",

            error: error.message

        });

    }

});


module.exports = router;