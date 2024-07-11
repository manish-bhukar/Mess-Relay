import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MessMenu = () => {
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://mess-relay--sigma.vercel.app/messmenu');
      const menusData = response.data.reduce((acc, menu) => {
        acc[menu.day] = menu.meals;
        return acc;
      }, {});
      setMenus(menusData);
    } catch (error) {
      toast.error('Error fetching menus');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (day, mealTime, value) => {
    setMenus((prevMenus) => ({
      ...prevMenus,
      [day]: {
        ...prevMenus[day],
        [mealTime]: value,
      },
    }));
  };

  const handleSaveMenu = async (day) => {
    setLoading(true);
    try {
      const meals = menus[day];
      await axios.post('https://mess-relay--sigma.vercel.app/messmenu', { day, meals });
      toast.success('Menu saved successfully');
      fetchMenus();
    } catch (error) {
      toast.error('Error saving menu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Mess Menu</h1>
      {loading && <p>Loading...</p>}
      {daysOfWeek.map((day) => (
        <div key={day} className="mb-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-2">{day}</h2>
          <div className="grid grid-cols-4 gap-4">
            {['morning', 'noon', 'evening', 'night'].map((mealTime) => (
              <div key={mealTime}>
                <label className="block mb-1 font-semibold capitalize">{mealTime}</label>
                <input
                  type="text"
                  value={menus[day]?.[mealTime] || ''}
                  onChange={(e) => handleInputChange(day, mealTime, e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => handleSaveMenu(day)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessMenu;
