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
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

module.exports = mongoose.model("Complaint", complaintSchema);
