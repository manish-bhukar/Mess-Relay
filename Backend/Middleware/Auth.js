// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel.js'); // Adjust the path to your User model

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Adjust to your JWT secret or other auth logic
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error('Error in authentication:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { authenticateUser };
