import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Expenses from './Expenses'; // Import Expenses sub-component
import Notices from './Notices'; // Import Notices sub-component
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('expenses');
  const [expenses, setExpenses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMenuItem === 'expenses') {
      fetchExpenses();
    } else if (selectedMenuItem === 'notices') {
      fetchNotices();
    }
  }, [selectedMenuItem]);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (menuItem === 'all-complaints') {
      navigate('/complainstatus');
    } else if (menuItem === 'mess-menu') {
      navigate('/mess-menu');
    } else if (menuItem === 'notices') {
      fetchNotices();
    }
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

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/notices/getnotices');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseUpdate = async (updatedExpense) => {
    setLoading(true);
    try {
      if (updatedExpense._id) {
        await axios.put(`http://localhost:5000/expenses/${updatedExpense._id}`, updatedExpense);
      } else {
        await axios.post('http://localhost:5000/expenses/', updatedExpense);
      }
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('position');
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
        notices={notices}
        handleLogout={handleLogout}
        setLoading={setLoading} // Pass setLoading function to MainContent
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
        <MenuItem text="All Complaints" isSelected={selectedMenuItem === 'all-complaints'} onClick={() => handleMenuItemClick('all-complaints')} />
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
const MainContent = ({ selectedMenuItem, expenses, onExpenseUpdate, loading, notices, handleLogout, setLoading }) => {
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
      <MainContentArea
        selectedMenuItem={selectedMenuItem}
        expenses={expenses}
        onExpenseUpdate={onExpenseUpdate}
        loading={loading}
        notices={notices}
        setLoading={setLoading} // Pass setLoading function to MainContentArea
      />
    </div>
  );
};

// MainContentArea Component
const MainContentArea = ({ selectedMenuItem, expenses, onExpenseUpdate, loading, notices, setLoading }) => {
  return (
    <div>
      {/* Conditional Rendering based on selectedMenuItem */}
      {selectedMenuItem === 'expenses' && <Expenses expenses={expenses} onExpenseUpdate={onExpenseUpdate} loading={loading} />}
      {selectedMenuItem === 'notices' && <Notices notices={notices} setLoading={setLoading} />} {/* Render Notices component */}
      {/* Add other conditional rendering based on selectedMenuItem */}
    </div>
  );
};

export default Dashboard;
