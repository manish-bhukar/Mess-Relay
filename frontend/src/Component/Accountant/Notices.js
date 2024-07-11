// Notices.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://mess-relay--sigma.vercel.app/notices/getnotice');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notices</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-disc pl-5">
          {notices.map((notice) => (
            <li key={notice._id} className="mb-2 flex justify-between items-center">
              <a
                href={`https://mess-relay--sigma.vercel.app${notice.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Open Notice
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notices;
