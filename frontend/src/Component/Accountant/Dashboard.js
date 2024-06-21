import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Expenses from './Expenses'; // Import Expenses sub-component

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
      <Sidebar selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />

      {/* Main Content */}
      <MainContent
        selectedMenuItem={selectedMenuItem}
        expenses={expenses}
        onExpenseUpdate={handleExpenseUpdate}
        loading={loading}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
        handleLogout={handleLogout}
      />
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ selectedMenuItem, handleMenuItemClick }) => {
  return (
    <div className="bg-gray-800 text-white w-64 p-8">
      {/* Logo or Brand */}
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Navigation Links */}
      <ul>
        <MenuItem text="Expenses" isSelected={selectedMenuItem === 'expenses'} onClick={() => handleMenuItemClick('expenses')} />
        <MenuItem text="Mess Menu" isSelected={selectedMenuItem === 'mess-menu'} onClick={() => handleMenuItemClick('mess-menu')} />
        <MenuItem
          text="Unresolved Complaints"
          isSelected={selectedMenuItem === 'unresolved-complaints'}
          onClick={() => handleMenuItemClick('unresolved-complaints')}
        />
        <MenuItem
          text="Resolved Complaints"
          isSelected={selectedMenuItem === 'resolved-complaints'}
          onClick={() => handleMenuItemClick('resolved-complaints')}
        />
        <MenuItem text="Notices" isSelected={selectedMenuItem === 'notices'} onClick={() => handleMenuItemClick('notices')} />
      </ul>
    </div>
  );
};

// MenuItem Component
const MenuItem = ({ text, isSelected, onClick }) => {
  return (
    <li className="mb-4">
      <button className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded ${isSelected ? 'bg-gray-700' : ''}`} onClick={onClick}>
        {text}
      </button>
    </li>
  );
};

// MainContent Component
const MainContent = ({
  selectedMenuItem,
  expenses,
  onExpenseUpdate,
  loading,
  selectedYear,
  handleYearChange,
  handleLogout,
}) => {
  return (
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
        <YearSelector selectedYear={selectedYear} handleYearChange={handleYearChange} />
      </div>

      {/* Main Content Area */}
      <MainContentArea selectedMenuItem={selectedMenuItem} expenses={expenses} onExpenseUpdate={onExpenseUpdate} loading={loading} />
    </div>
  );
};

// YearSelector Component
const YearSelector = ({ selectedYear, handleYearChange }) => {
  return (
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
  );
};

// MainContentArea Component
const MainContentArea = ({ selectedMenuItem, expenses, onExpenseUpdate, loading }) => {
  return (
    <div>
      {/* Conditional Rendering based on selectedMenuItem */}
      {selectedMenuItem === 'expenses' && <Expenses expenses={expenses} onExpenseUpdate={onExpenseUpdate} loading={loading} />}

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
  );
};

export default Dashboard;
