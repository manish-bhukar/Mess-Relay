// backend/routes/complaintsRoutes.js
const express = require("express");
const router = express.Router();
const {submitComplaint} = require("../Controllers/Complaintcontroller.js");

// POST /complaints
router.post("/", submitComplaint);

module.exports = router;
