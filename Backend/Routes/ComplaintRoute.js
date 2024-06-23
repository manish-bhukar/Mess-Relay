const express = require("express");
const router = express.Router();
const complaintController = require("../controllers/complaintController");

// POST /api/complaints - Submit a new complaint
router.post("/", complaintController.submitComplaint);

// GET /api/complaints/getcomplaints - Get all complaints
router.get("/getcomplaints", complaintController.getAllComplaints);

module.exports = router;

