// models/MessMenu.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  morning: { type: String, default: '' },
  noon: { type: String, default: '' },
  evening: { type: String, default: '' },
  night: { type: String, default: '' },
});

const messMenuSchema = new mongoose.Schema({
  day: { type: String, unique: true, required: true },
  meals: mealSchema,
});

const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;
