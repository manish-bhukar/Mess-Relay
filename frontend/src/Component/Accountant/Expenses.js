import React, { useState } from 'react';
import axios from 'axios';

const Expenses = ({ expenses, onExpenseUpdate, loading }) => {
  const [editableExpense, setEditableExpense] = useState(null);
   const [year,setYear]=useState(new Date().getFullYear());
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
      <h2 className="text-xl font-bold mb-4">Expenses for {year}</h2>
      {loading ? (
        <p>Loading expenses...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vegetable
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fruits
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provisions
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Other
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
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
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                    >
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

export default Expenses;
