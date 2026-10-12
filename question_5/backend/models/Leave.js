const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    leaveDate: {
      type: Date,
      required: true
    },

    reason: {
      type: String,
      required: true
    },

    granted: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Leave", leaveSchema);