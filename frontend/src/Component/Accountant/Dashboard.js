import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
      const [selectedMenuItem, setSelectedMenuItem] = useState('expenses');

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, [selectedYear]);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/expenses/${selectedYear}`);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleExpenseUpdate = async (updatedExpense) => {
    setLoading(true);
    try {
      if (updatedExpense._id) {
        // Update existing expense
        await axios.put(`http://localhost:5000/expenses/${updatedExpense._id}`, updatedExpense);
      } else {
        // Create new expense
        await axios.post('http://localhost:5000/expenses/', updatedExpense);
      }
      // Refetch expenses after update
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-8">
        {/* Logo or Brand */}
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Navigation Links */}
        <ul>
          <li className="mb-4">
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'expenses' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('expenses')}
            >
              Expenses
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'add-expense' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('add-expense')}
            >
              Add Expense
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'mess-menu' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('mess-menu')}
            >
              Mess Menu
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'unresolved-complaints' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('unresolved-complaints')}
            >
              Unresolved Complaints
            </button>
          </li>
          <li className="mb-4">
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'resolved-complaints' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('resolved-complaints')}
            >
              Resolved Complaints
            </button>
          </li>
          <li>
            <button
              className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${
                selectedMenuItem === 'notices' ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleMenuItemClick('notices')}
            >
              Notices
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <button
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Year Selector */}
        <div className="mb-8 flex justify-end">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(selectedYear, month - 1, 1).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content Area */}
        {selectedMenuItem === 'expenses' && (
          <Expenses expenses={expenses} onExpenseUpdate={handleExpenseUpdate} loading={loading} />
        )}

        {selectedMenuItem === 'add-expense' && (
          <div>
            {/* Add Expense Component */}
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>
            {/* Add your form or component for adding expenses */}
          </div>
        )}

        {selectedMenuItem === 'mess-menu' && (
          <div>
            {/* Mess Menu Component */}
            <h2 className="text-xl font-bold mb-4">Mess Menu</h2>
            {/* Add your Mess Menu component */}
          </div>
        )}

        {selectedMenuItem === 'unresolved-complaints' && (
          <div>
            {/* Unresolved Complaints Component */}
            <h2 className="text-xl font-bold mb-4">Unresolved Complaints</h2>
            {/* Add your Unresolved Complaints component */}
          </div>
        )}

        {selectedMenuItem === 'resolved-complaints' && (
          <div>
            {/* Resolved Complaints Component */}
            <h2 className="text-xl font-bold mb-4">Resolved Complaints</h2>
            {/* Add your Resolved Complaints component */}
          </div>
        )}

        {selectedMenuItem === 'notices' && (
          <div>
            {/* Notices Component */}
            <h2 className="text-xl font-bold mb-4">Notices</h2>
            {/* Add your Notices component */}
          </div>
        )}
      </div>
    </div>
  );
};

const Expenses = ({ expenses, onExpenseUpdate, loading }) => {
  const [editableExpense, setEditableExpense] = useState(null);

  const handleEditExpense = (expense) => {
    setEditableExpense({ ...expense });
  };

  const handleCancelEdit = () => {
    setEditableExpense(null);
  };

  const handleSaveExpense = () => {
    onExpenseUpdate(editableExpense);
    setEditableExpense(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableExpense({ ...editableExpense, [name]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Expenses for 2024</h2>
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vegetable</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fruits</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provisions</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editableExpense && editableExpense._id === expense._id ? (
                    <input
                      type="text"
                      name="vegetable"
                      value={editableExpense.vegetable}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    expense.vegetable
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editableExpense && editableExpense._id === expense._id ? (
                    <input
                      type="text"
                      name="fruits"
                      value={editableExpense.fruits}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    expense.fruits
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editableExpense && editableExpense._id === expense._id ? (
                    <input
                      type="text"
                      name="provisions"
                      value={editableExpense.provisions}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    expense.provisions
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editableExpense && editableExpense._id === expense._id ? (
                    <input
                      type="text"
                      name="other"
                      value={editableExpense.other}
                      onChange={handleChange}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  ) : (
                    expense.other
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editableExpense && editableExpense._id === expense._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveExpense}
                        className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                      >
                        Save
                      </button>
                      <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleEditExpense(expense)} className="text-indigo-600 hover:text-indigo-900 focus:outline-none">
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
