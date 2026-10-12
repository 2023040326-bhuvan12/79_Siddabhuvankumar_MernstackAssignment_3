const express = require("express");
const jwt = require("jsonwebtoken");

const Leave = require("../models/Leave");

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
      message: "Invalid token"
    });
  }
}

// Add Leave

router.post(
  "/add",
  authenticateToken,
  async (req, res) => {

    try {

      const {
        leaveDate,
        reason
      } = req.body;

      if (!leaveDate || !reason) {
        return res.status(400).json({
          message: "Date and reason are required"
        });
      }

      const leave = new Leave({
        employeeId: req.employee.id,
        leaveDate,
        reason,
        granted: "No"
      });

      await leave.save();

      res.status(201).json({
        message: "Leave application submitted",
        leave
      });

    } catch (error) {

      res.status(500).json({
        message: "Unable to apply leave"
      });
    }
  }
);

// List Leave

router.get(
  "/list",
  authenticateToken,
  async (req, res) => {

    try {

      const leaves = await Leave.find({
        employeeId: req.employee.id
      }).sort({
        createdAt: -1
      });

      res.json(leaves);

    } catch (error) {

      res.status(500).json({
        message: "Unable to load leaves"
      });
    }
  }
);

module.exports = router;