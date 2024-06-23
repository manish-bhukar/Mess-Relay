const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
    // Store the file path
  },
  isResolved: {
    type: Boolean,
    default: false, // Default value set to false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
