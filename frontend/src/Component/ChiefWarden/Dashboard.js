// ChiefWardenDashboard.js (updated)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ComplaintForm from '../Student/Complaint';
import ManageNotices from './Notice';
import Expenses from '../Accountant/Expenses';
import MessMenu from './MessMenu';

const ChiefWardenDashboard = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('complaints');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resolveModalOpen, setResolveModalOpen] = useState(false); // State for modal open/close
  const [selectedComplaint, setSelectedComplaint] = useState(null); // State to track the selected complaint
  const [resolutionDescription, setResolutionDescription] = useState(''); // State for resolution description input
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
    } else if (menuItem === 'expenses') {
      navigate('/expenses');
    } else if (menuItem === 'mess-menu') {
      navigate('/messmenu');
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

  const handleResolveComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setResolveModalOpen(true);
  };

  const handleSaveResolution = async () => {
    try {
      await axios.put(`http://localhost:5000/complaints/resolve/${selectedComplaint._id}`, {
        resolutionDescription
      });
      setResolveModalOpen(false);
      setResolutionDescription(''); // Reset resolution description state
      fetchComplaints(); // Fetch updated complaints list
    } catch (error) {
      console.error('Error saving resolution:', error);
    }
  };

  const handleCancelResolution = () => {
    setResolveModalOpen(false);
    setSelectedComplaint(null); // Clear selected complaint state
    setResolutionDescription(''); // Reset resolution description state
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('position');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="flex h-screen">
      <Sidebar selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-end mb-4">
            <button
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <MainContent
            selectedMenuItem={selectedMenuItem}
            complaints={complaints}
            onResolveComplaint={handleResolveComplaint}
            loading={loading}
          />
        </div>
      </div>

      {/* Resolve Modal */}
      {resolveModalOpen && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Resolve Complaint</h2>
            <p className="mb-4">Enter resolution description:</p>
            <textarea
              value={resolutionDescription}
              onChange={(e) => setResolutionDescription(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full h-32"
              placeholder="Describe how the complaint was resolved..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancelResolution}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResolution}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ selectedMenuItem, handleMenuItemClick }) => {
  return (
    <div className="bg-gray-800 text-white w-64 p-8">
      <h1 className="text-3xl font-bold mb-8">Chief Warden Dashboard</h1>
      <ul>
        <MenuItem text="Complaints" isSelected={selectedMenuItem === 'complaints'} onClick={() => handleMenuItemClick('complaints')} />
        <MenuItem text="Mess Menu" isSelected={selectedMenuItem === 'mess-menu'} onClick={() => handleMenuItemClick('mess-menu')} />
        <MenuItem text="Notices" isSelected={selectedMenuItem === 'notices'} onClick={() => handleMenuItemClick('notices')} />
        <MenuItem text="Expenses" isSelected={selectedMenuItem === 'expenses'} onClick={() => handleMenuItemClick('expenses')} />
      </ul>
    </div>
  );
};

const MenuItem = ({ text, isSelected, onClick }) => {
  return (
    <li className="mb-4">
      <button className={`block text-left text-white hover:bg-gray-700 w-full py-2 px-4 rounded shadow ${isSelected ? 'bg-gray-700' : ''}`} onClick={onClick}>
        {text}
      </button>
    </li>
  );
};

const MainContent = ({ selectedMenuItem, complaints, onResolveComplaint, loading }) => {
  return (
    <div>
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
                        onClick={() => onResolveComplaint(complaint)}
                      >
                        Resolve
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Include other MainContent components for 'notices', 'expenses', and 'mess-menu' */}
    </div>
  );
};

export default ChiefWardenDashboard;
