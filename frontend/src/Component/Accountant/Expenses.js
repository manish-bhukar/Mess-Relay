import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expenses = ({ initialYear }) => {
  const [selectedYear, setSelectedYear] = useState(initialYear || new Date().getFullYear());
  const [expenses, setExpenses] = useState([]);
  const [editedExpense, setEditedExpense] = useState({
    month: '',
    vegetable: 0,
    fruits: 0,
    provisions: 0,
    other: 0,
    total: 0,
    year: selectedYear,
  });
  const [loading, setLoading] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    fetchExpenses(selectedYear);
  }, [selectedYear]);

  const fetchExpenses = async (year) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/expenses/${year}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedExpense({
      ...editedExpense,
      [field]: value,
    });
  };

  const handleAddExpense = async () => {
    try {
      const response = await axios.post('http://localhost:5000/expenses/', editedExpense);
      toast.success(response.data.message); // Show success message from backend
      setEditedExpense({
        month: '',
        vegetable: 0,
        fruits: 0,
        provisions: 0,
        other: 0,
        total: 0,
        year: selectedYear,
      });
      fetchExpenses(selectedYear); // Refresh expenses after adding
    } catch (error) {
      console.error('Error adding expense:', error);
      toast.error('Failed to add expense.');
    }
  };

  const handleEditExpense = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/expenses/${editingExpense._id}`, editingExpense);
      toast.success(response.data.message); // Show success message from backend
      setEditingExpense(null);
      fetchExpenses(selectedYear); // Refresh expenses after updating
    } catch (error) {
      console.error('Error updating expense:', error);
      toast.error('Failed to update expense.');
    }
  };

  const handleStartEdit = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleYearInputChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      {/* Year Input */}
      <div className="flex justify-end mb-4">
        <label className="text-gray-500">Enter Year:</label>
        <input
          type="number"
          value={selectedYear}
          onChange={handleYearInputChange}
          className="px-2 py-1 ml-2 border rounded-md w-20"
          placeholder="Enter year"
        />
      </div>

      {/* Add/Edit Expense Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Manage Expenses</h2>
        {!editingExpense && (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={editedExpense.month}
              onChange={(e) => handleInputChange('month', e.target.value)}
              placeholder="Month"
              className="px-2 py-1 border rounded-md mr-2 w-24"
            />
            <input
              type="number"
              value={editedExpense.vegetable}
              onChange={(e) => handleInputChange('vegetable', parseFloat(e.target.value))}
              placeholder="Vegetable"
              className="px-2 py-1 border rounded-md mr-2 w-20"
            />
            <input
              type="number"
              value={editedExpense.fruits}
              onChange={(e) => handleInputChange('fruits', parseFloat(e.target.value))}
              placeholder="Fruits"
              className="px-2 py-1 border rounded-md mr-2 w-20"
            />
            <input
              type="number"
              value={editedExpense.provisions}
              onChange={(e) => handleInputChange('provisions', parseFloat(e.target.value))}
              placeholder="Provisions"
              className="px-2 py-1 border rounded-md mr-2 w-20"
            />
            <input
              type="number"
              value={editedExpense.other}
              onChange={(e) => handleInputChange('other', parseFloat(e.target.value))}
              placeholder="Other"
              className="px-2 py-1 border rounded-md mr-2 w-20"
            />
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Add Expense
            </button>
          </div>
        )}
        {editingExpense && (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={editingExpense.month}
              onChange={(e) => setEditingExpense({ ...editingExpense, month: e.target.value })}
              placeholder="Month"
              className="px-2 py-1 border rounded-md mr-2 w-24"
            />
            <input
              type="number"
              value={editingExpense.vegetable}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, vegetable: parseFloat(e.target.value) })
              }
              placeholder="Vegetable"
              className="px-2 py-1 border rounded-md mr-2 w-25"
            />
            <input
              type="number"
              value={editingExpense.fruits}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, fruits: parseFloat(e.target.value) })
              }
              placeholder="Fruits"
              className="px-2 py-1 border rounded-md mr-2 w-25"
            />
            <input
              type="number"
              value={editingExpense.provisions}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, provisions: parseFloat(e.target.value) })
              }
              placeholder="Provisions"
              className="px-2 py-1 border rounded-md mr-2 w-25"
            />
            <input
              type="number"
              value={editingExpense.other}
              onChange={(e) =>
                setEditingExpense({ ...editingExpense, other: parseFloat(e.target.value) })
              }
              placeholder="Other"
              className="px-2 py-1 border rounded-md mr-2 w-25"
            />
            <button
              onClick={handleEditExpense}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-600 text-white rounded-md ml-2 hover:bg-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Display Expenses Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Month
            </th>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vegetables
            </th>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fruits
            </th>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Provisions
            </th>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Other
            </th>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-2 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {expense.month}
              </td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{expense.categories.vegetable}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{expense.categories.fruits}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{expense.categories.provisions}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{expense.categories.other}</td>
              <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{expense.total}</td>
              <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => handleStartEdit(expense)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {loading && <p className="mt-4 text-gray-500">Loading expenses...</p>}
    </div>
  );
};

export default Expenses;
