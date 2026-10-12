const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Employee = require("../models/Employee");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { empId, password } = req.body;

    if (!empId || !password) {
      return res.status(400).json({
        message: "Employee ID and password are required"
      });
    }

    const employee = await Employee.findOne({
      empId: empId
    });

    if (!employee) {
      return res.status(401).json({
        message: "Invalid Employee ID or password"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      employee.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Employee ID or password"
      });
    }

    const token = jwt.sign(
      {
        id: employee._id,
        empId: employee.empId
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

module.exports = router;