import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ComplaintForm from '../Student/Complaint'; // Import ComplaintStatus component
import ManageNotices from './Notice'; // Import ManageNotices component
import Expenses from '../Accountant/Expenses'; // Import Expenses sub-component

const ChiefWardenDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('complaints');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (menuItem === 'complaints') {
      navigate('/complainstatus');
    } else if (menuItem === 'notices') {
      navigate('/notice');
    }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/complaints/getcomplaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}/resolve`);
      // Refresh complaints after resolving
      fetchComplaints();
    } catch (error) {
      console.error('Error resolving complaint:', error);
    }
  };

  const handleNotResolveComplaint = async (complaintId) => {
    try {
      await axios.put(`http://localhost:5000/complaints/${complaintId}/notresolve`);
      // Refresh complaints after marking as not resolved
      fetchComplaints();
    } catch (error) {
      console.error('Error marking complaint as not resolved:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
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
        complaints={complaints}
        onResolveComplaint={handleResolveComplaint}
        onNotResolveComplaint={handleNotResolveComplaint}
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
      <h1 className="text-3xl font-bold mb-8">Chief Warden Dashboard</h1>

      {/* Navigation Links */}
      <ul>
        <MenuItem text="Complaints" isSelected={selectedMenuItem === 'complaints'} onClick={() => handleMenuItemClick('complaints')} />
        <MenuItem text="Mess Menu" isSelected={selectedMenuItem === 'mess-menu'} onClick={() => handleMenuItemClick('mess-menu')} />
        <MenuItem text="Notices" isSelected={selectedMenuItem === 'notices'} onClick={() => handleMenuItemClick('notices')} />
        <MenuItem text="Expenses" isSelected={selectedMenuItem === 'expenses'} onClick={() => handleMenuItemClick('expenses')} />
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
const MainContent = ({ selectedMenuItem, complaints, onResolveComplaint, onNotResolveComplaint, loading, handleLogout }) => {
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
        complaints={complaints}
        onResolveComplaint={onResolveComplaint}
        onNotResolveComplaint={onNotResolveComplaint}
        loading={loading}
      />
    </div>
  );
};

// MainContentArea Component
const MainContentArea = ({ selectedMenuItem, complaints, onResolveComplaint, onNotResolveComplaint, loading }) => {
  return (
    <div>
      {/* Conditional Rendering based on selectedMenuItem */}
      {selectedMenuItem === 'complaints' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">All Complaints</h1>
          <ul className="space-y-4">
            {complaints.map((complaint) => (
              <li key={complaint._id} className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold">{complaint.title}</h2>
                <p className="mt-2">{complaint.description}</p>
                <div className="mt-4">
                  {complaint.isResolved ? (
                    <p className="text-green-600">Resolved</p>
                  ) : (
                    <div>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                        onClick={() => onResolveComplaint(complaint._id)}
                      >
                        Resolve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => onNotResolveComplaint(complaint._id)}
                      >
                        Not Resolved
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedMenuItem === 'notices' && (
        <ManageNotices />
      )}

      {selectedMenuItem === 'expenses' && (
        <Expenses expenses={[]} onExpenseUpdate={() => {}} loading={false} />
      )}
    </div>
  );
};

export default ChiefWardenDashboard;
