const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Student routes
app.use("/api/students", studentRoutes);


// Test
app.get("/", (req, res) => {

    res.send("Student API is running");

});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected");

        app.listen(process.env.PORT, () => {

            console.log(
                `Server running on http://localhost:${process.env.PORT}`
            );

        });

    })

    .catch((error) => {

        console.log("MongoDB connection error:", error);

    });