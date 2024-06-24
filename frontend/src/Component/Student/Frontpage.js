import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashboardMain() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [userName, setUserName] = useState("John Doe");
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notices/getnotice');
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    if (menuItem === "Dashboard") {
      navigate("/studentmain");
    } else if (menuItem === "Previous Complaints") {
      navigate("/complainstatus");
    } else {
      navigate(`/${menuItem.toLowerCase().replace(/ /g, "-")}`);
    }
  };

  const handleLogout = () => {
    // Logic for logging out
    localStorage.removeItem('position');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate("/login");
  };

  const menuItems = [
    "Dashboard",
    "Complain",
    "Previous Complaints",
    "Mess Menu",
    "WebCrator",
    "Rules",
    "Mnnit Alld",
    "Contact",
  ];

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-800 to-indigo-600 text-white">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 flex flex-col h-full p-4">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item} className="mb-4">
              <button
                className={`w-full text-left p-2 rounded hover:bg-gray-700 ${
                  selectedMenuItem === item ? "bg-gray-700" : ""
                }`}
                onClick={() => handleMenuItemClick(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4">
        {selectedMenuItem === "Dashboard" ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <img
              src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718841600&semt=ais_user"
              alt="Random"
              className="rounded-full mb-4"
            />
            <p className="text-lg font-semibold">{userName}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold">{selectedMenuItem}</h1>
            {/* Render content based on the selected menu item */}
            {selectedMenuItem === "Complain" && (
              <div>
                {/* Render complaints content */}
              </div>
            )}
            {selectedMenuItem === "Previous Complaints" && (
              <div>
                {/* Render previous complaints content */}
              </div>
            )}
            {/* Add more conditions for other menu items */}
          </div>
        )}
      </div>

      {/* Notices Section */}
      <div className="bg-gray-800 w-64 flex flex-col h-full p-4">
        <h2 className="text-xl font-bold mb-4">Notices</h2>
        <ul className="flex-1 overflow-y-auto">
          {notices.length === 0 ? (
            <p className="text-gray-500">No notices available.</p>
          ) : (
            notices.map((notice) => (
              <li key={notice._id} className="mb-4 flex justify-between items-center">
                <span>{notice.title}</span>
                <a
                  href={`http://localhost:5000${notice.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  Open Notice
                </a>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardMain;
