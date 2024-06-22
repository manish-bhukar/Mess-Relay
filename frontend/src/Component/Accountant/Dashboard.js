import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Expenses from './Expenses'; // Import Expenses sub-component
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('expenses');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
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
    navigate('/login');
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
const MainContent = ({ selectedMenuItem, expenses, onExpenseUpdate, loading, handleLogout }) => {
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

      {/* Main Content Area */}
      <MainContentArea selectedMenuItem={selectedMenuItem} expenses={expenses} onExpenseUpdate={onExpenseUpdate} loading={loading} />
    </div>
  );
};

// MainContentArea Component
const MainContentArea = ({ selectedMenuItem, expenses, onExpenseUpdate, loading }) => {
  return (
    <div>
      {/* Conditional Rendering based on selectedMenuItem */}
      {selectedMenuItem === 'expenses' && <Expenses expenses={expenses} onExpenseUpdate={onExpenseUpdate} loading={loading} />}
      {/* Add other conditional rendering based on selectedMenuItem */}
    </div>
  );
};

export default Dashboard;
