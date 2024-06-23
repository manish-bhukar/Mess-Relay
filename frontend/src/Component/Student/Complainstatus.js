import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/complaints/getcomplaints'); // Replace with your backend URL
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleDownload = (fileName) => {
    const downloadUrl = `http://localhost:5000${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Complaints</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            onClick={fetchComplaints}
          >
            Fetch Complaints
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {complaints.length === 0 ? (
            <p className="text-gray-600">No complaints found.</p>
          ) : (
            complaints.map(complaint => (
              <div key={complaint._id} className="bg-white shadow-md rounded-md p-4">
                <h3 className="text-lg font-bold text-black mb-2">Title :{complaint.title}</h3>
                <p className="text-gray-700 mb-4">Description: {complaint.description}</p>
                <div className="flex items-center">
                  {complaint.file && (
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                      onClick={() => handleDownload(complaint.file)}
                    >
                      Download File
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>Resolved:</strong> {complaint.isResolved ? 'Yes' : 'No'}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Created At:</strong>{' '}
                  {new Date(complaint.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
