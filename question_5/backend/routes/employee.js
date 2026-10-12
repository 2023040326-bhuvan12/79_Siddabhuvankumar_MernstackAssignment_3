const express = require("express");
const jwt = require("jsonwebtoken");

const Employee = require("../models/Employee");

const router = express.Router();

// JWT Middleware

function authenticateToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.employee = decoded;

    next();

  } catch (error) {

    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
}

// Profile

router.get(
  "/profile",
  authenticateToken,
  async (req, res) => {

    try {

      const employee = await Employee.findById(
        req.employee.id
      ).select("-password");

      if (!employee) {
        return res.status(404).json({
          message: "Employee not found"
        });
      }

      res.json(employee);

    } catch (error) {

      res.status(500).json({
        message: "Server error"
      });
    }
  }
);

module.exports = router;