const Razorpay = require('razorpay');
const dotenv = require('dotenv');
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret: process.env.YOUR_KEY_SECRET,
});

const Checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    console.error("Error in Checkout:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

const PaymentVerification = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in PaymentVerification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify payment",
    });
  }
};

const GetKey = async (req, res) => {
  try {
    res.status(200).json({ key: process.env.YOUR_KEY_ID });
  } catch (error) {
    console.error("Error in GetKey:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch key",
    });
  }
};

module.exports = {
  Checkout,
  PaymentVerification,
  GetKey,
};
