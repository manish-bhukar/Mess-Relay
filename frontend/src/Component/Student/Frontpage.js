import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardMain() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const [userName, setUserName] = useState("John Doe");
  const navigate = useNavigate();

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

  const notices = [
    { id: 1, title: "Notice 1", url: "/path/to/notice1.pdf" },
    { id: 2, title: "Notice 2", url: "/path/to/notice2.pdf" },
    { id: 3, title: "Notice 3", url: "/path/to/notice3.pdf" },
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
        <ul className="flex-1">
          {notices.map((notice) => (
            <li key={notice.id} className="mb-4 flex justify-between items-center">
              <span>{notice.title}</span>
              <a
                href={notice.url}
                download
                className="text-blue-400 hover:underline"
              >
                Download
              </a>
            </li>
          ))}
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
