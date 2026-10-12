const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employee");
const leaveRoutes = require("./routes/leave");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());

app.use(express.json());

// MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(
      "MongoDB connection error:",
      error.message
    );
  });

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/employee", employeeRoutes);

app.use("/api/leave", leaveRoutes);

// Test

app.get("/", (req, res) => {
  res.json({
    message: "Employee API is working"
  });
});

// Server

app.listen(PORT, () => {
  console.log(
    `Backend running at http://localhost:${PORT}`
  );
});