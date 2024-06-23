import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const AddNotice = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddNotice = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/notices/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);

    // onNoticeAdded(response.data.notice); // Pass the new notice back to parent component
      setFile(null); // Reset file state
      toast.success('Notice added successfully');
    } catch (error) {
      console.error('Error adding notice:', error);
      toast.error('Failed to add notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Toaster/>
    <div className="mb-4">
        
      <h2 className="text-xl font-bold mb-2">Add Notice</h2>
      <div className="flex items-center">
        <input type="file" onChange={handleFileChange} />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleAddNotice}
          disabled={!file || loading}
        >
          {loading ? 'Adding...' : 'Add Notice'}
        </button>
      </div>
    </div>
    </>
  );
};

export default AddNotice;
