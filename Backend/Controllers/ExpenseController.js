// controllers/ExpenseController.js
const Expense = require('../Models/ExpenseModel.js');
const mongoose = require('mongoose');

const getExpensesByYear = async (req, res) => {
  const { year } = req.params;
  const userId = req.user._id;

  try {
    const expenses = await Expense.find({ user: userId, year });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

const saveExpense = async (req, res) => {
  const { month, categories, total, year } = req.body;
  const userId = req.user._id;

  // // Check for required fields
  // if (!month || !vegetable || !fruits || !provisions || !other || !total || !year) {
  //   return res.status(400).json({ error: 'Please fill in all fields' });
  // }

  try {
    const newExpense = new Expense({
      user: userId,
      year,
      month,
      categories: {
        vegetable: categories.vegetable || 0,
        fruits: categories.fruits || 0,
        provisions: categories.provisions || 0,
        other: categories.other || 0,
      },
      total,
    });

    await newExpense.save();
    res.json({ message: 'Expense saved successfully', expense: newExpense });
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ error: 'Failed to save expense' });
  }
};

const editExpense = async (req, res) => {
  const { id } = req.params;
  const { year, month, categories, total } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid expense ID' });
  }

  // Check for required fields
  // if (!year || !month || !categories || !total) {
  //   return res.status(400).json({ error: 'Please fill in all fields' });
  // }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        year,
        month,
        categories: {
          vegetable: categories.vegetable || 0,
          fruits: categories.fruits || 0,
          provisions: categories.provisions || 0,
          other: categories.other || 0,
        },
        total,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

module.exports = { getExpensesByYear, saveExpense, editExpense };
