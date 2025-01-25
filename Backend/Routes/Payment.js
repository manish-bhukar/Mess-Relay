const Checkout=require('../Controllers/PaymentController.js');
const express=require('express');
const router=express.Router();
router.route("/checkout").post(Checkout);
module.exports=router;