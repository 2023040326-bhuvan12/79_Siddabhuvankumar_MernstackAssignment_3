const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true
    },

    basicSalary: {
      type: Number,
      required: true
    },

    hra: Number,
    da: Number,
    grossSalary: Number,

    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", employeeSchema);