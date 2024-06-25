// AddExpense.js
import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ onAddExpense }) => {
  const [newExpense, setNewExpense] = useState({
    year: '',
    month: '',
    categories: {
      vegetable: '',
      fruits: '',
      provisions: '',
      other: ''
    },
    total: 0
  });

  const handleNewExpenseChange = (e) => {
    const { name, value } = e.target;
    if (name === 'total') {
      setNewExpense({ ...newExpense, total: value });
    } else {
      setNewExpense({
        ...newExpense,
        categories: {
          ...newExpense.categories,
          [name]: value
        }
      });
      if (['vegetable', 'fruits', 'provisions', 'other'].includes(name)) {
        setNewExpense({
          ...newExpense,
          total: calculateTotal({ ...newExpense.categories, [name]: value })
        });
      }
    }
  };

  const calculateTotal = (categories) => {
    const { vegetable, fruits, provisions, other } = categories;
    const veg = parseFloat(vegetable) || 0;
    const fru = parseFloat(fruits) || 0;
    const prov = parseFloat(provisions) || 0;
    const oth = parseFloat(other) || 0;
    return veg + fru + prov + oth;
  };

  const handleSaveNewExpense = async () => {
    try {
      const response = await axios.post('http://localhost:5000/expenses', newExpense);
      console.log('New expense added:', response.data);
      onAddExpense(response.data); // Notify parent component (Expenses.js) about the new expense

      // Reset form after successful addition
      setNewExpense({
        ...newExpense,
        year: '',
        month: '',
        categories: {
          vegetable: '',
          fruits: '',
          provisions: '',
          other: ''
        },
        total: 0
      });
    } catch (error) {
      console.error('Error adding new expense:', error);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="year"
          value={newExpense.year}
          onChange={handleNewExpenseChange}
          placeholder="Year"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="text"
          name="month"
          value={newExpense.month}
          onChange={handleNewExpenseChange}
          placeholder="Month"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="number"
          name="vegetable"
          value={newExpense.categories.vegetable}
          onChange={handleNewExpenseChange}
          placeholder="Vegetable"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="number"
          name="fruits"
          value={newExpense.categories.fruits}
          onChange={handleNewExpenseChange}
          placeholder="Fruits"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="number"
          name="provisions"
          value={newExpense.categories.provisions}
          onChange={handleNewExpenseChange}
          placeholder="Provisions"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="number"
          name="other"
          value={newExpense.categories.other}
          onChange={handleNewExpenseChange}
          placeholder="Other"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
        <input
          type="number"
          name="total"
          value={newExpense.total}
          onChange={handleNewExpenseChange}
          placeholder="Total"
          className="border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500 rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSaveNewExpense}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none mr-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
