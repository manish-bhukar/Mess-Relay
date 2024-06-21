// models/Expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  categories: {
    vegetable: { type: Number, default: 0, required: true },
    fruits: { type: Number, default: 0, required: true },
    provisions: { type: Number, default: 0, required: true },
    other: { type: Number, default: 0, required: true },
  },
  total: {
    type: Number,
    required: true,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
