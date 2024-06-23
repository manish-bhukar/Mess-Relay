const express = require("express");
const router = express.Router();
const {addNotice} = require("../Controllers/NoticeController");

// POST /notices
router.post("/", addNotice);

module.exports = router;
