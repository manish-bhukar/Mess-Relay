// routes/messMenu.js
const express = require('express');
const router = express.Router();
const MessMenu = require('../Models/MessMenu.js');
const { authenticateUser } = require('../Middleware/Auth.js');

// Get all menus
router.use(authenticateUser);

router.get('/', async (req, res) => {
  try {
    const hostel=req.user.hostel;
    const menus = await MessMenu.find({hostel});
    res.json(menus);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add or update menu for a day
router.post('/', async (req, res) => {
  const { day, meals } = req.body;
  try {
    const existingMenu = await MessMenu.findOne({ day });
    if (existingMenu) {
      existingMenu.meals = meals;
      await existingMenu.save();
    } else {
      const newMenu = new MessMenu({ day, meals });
      await newMenu.save();
    }
    res.status(200).json({ message: 'Menu updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
