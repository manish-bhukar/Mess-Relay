import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [complaints, setComplaints] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchComplaints();
    const storedRole = localStorage.getItem('position');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/complaints/getcomplaints');
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleDownload = (fileName) => {
    const downloadUrl = `http://localhost:5000${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  const handleLike = async (complaintId) => {
    const studentId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`http://localhost:5000/complaints/${complaintId}/like`, { studentId });
      const updatedComplaints = complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, liked: true, likes: complaint.likes + 1, successMessage: response.data.message } : complaint
      );
      setComplaints(updatedComplaints);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setComplaints(complaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, successMessage: '' } : complaint
        ));
      }, 5000);
    } catch (error) {
      console.error('Error liking complaint:', error);
      const updatedComplaints = complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, errorMessage: 'Failed to like complaint. Please try again.' } : complaint
      );
      setComplaints(updatedComplaints);

      // Clear error message after 5 seconds
      setTimeout(() => {
        setComplaints(complaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, errorMessage: '' } : complaint
        ));
      }, 5000);
    }
  };

  const handleDislike = async (complaintId) => {
    const studentId = localStorage.getItem('userId');
    try {
      const response = await axios.post(`http://localhost:5000/complaints/${complaintId}/dislike`, { studentId });
      const updatedComplaints = complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, disliked: true, dislikes: complaint.dislikes + 1, successMessage: response.data.message } : complaint
      );
      setComplaints(updatedComplaints);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setComplaints(complaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, successMessage: '' } : complaint
        ));
      }, 5000);
    } catch (error) {
      console.error('Error disliking complaint:', error);
      const updatedComplaints = complaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, errorMessage: 'Failed to dislike complaint. Please try again.' } : complaint
      );
      setComplaints(updatedComplaints);

      // Clear error message after 5 seconds
      setTimeout(() => {
        setComplaints(complaints.map(complaint =>
          complaint._id === complaintId ? { ...complaint, errorMessage: '' } : complaint
        ));
      }, 5000);
    }
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
                <h3 className="text-lg font-bold text-black mb-2">Title: {complaint.title}</h3>
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
                  <strong>Created At:</strong> {new Date(complaint.createdAt).toLocaleString()}
                </p>

                {/* Display Likes and Dislikes if not student */}
                {role !== 'student' && (
                  <div className="text-sm text-gray-700 mt-2">
                    <strong>Likes:</strong> {complaint.likes.length}
                    <br />
                    <strong>Dislikes:</strong> {complaint.dislikes.length}
                  </div>
                )}

                {/* Like and Dislike buttons (if user is student) */}
                {role === 'student' && (
                  <div className="flex mt-4 space-x-4">
                    <button
                      className={`bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md ${complaint.liked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !complaint.liked && handleLike(complaint._id)}
                      disabled={complaint.liked}
                    >
                      {complaint.liked ? 'Liked' : 'Like'}
                    </button>
                    <button
                      className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md ${complaint.disliked ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => !complaint.disliked && handleDislike(complaint._id)}
                      disabled={complaint.disliked}
                    >
                      {complaint.disliked ? 'Disliked' : 'Dislike'}
                    </button>
                  </div>
                )}

                {/* Success and Error Messages */}
                {complaint.successMessage && (
                  <p className="text-green-600 mt-2">{complaint.successMessage}</p>
                )}
                {complaint.errorMessage && (
                  <p className="text-red-600 mt-2">{complaint.errorMessage}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
