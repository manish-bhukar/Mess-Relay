const Razorpay=require('razorpay')
const dotenv = require('dotenv');
dotenv.config()
 const instance = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret:  process.env.YOUR_KEY_SECRET,
});
const Checkout=async(req,res)=>{
    const options={
        amount:50000,
        currency:"INR",
       
    }
    const order=await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
        success:true
    })
}
module.exports =Checkout