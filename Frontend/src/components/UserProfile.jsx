import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    _id: '',
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user);
      setUserData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        _id: user.id || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const { _id, ...rest } = userData;

      const res = await axios.put(`http://localhost:3000/api/users/${_id}`, rest, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile updated successfully');
      setEditMode(false);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };


  return (
    console.log(userData),
    <div className="min-h-screen bg-white flex justify-center items-center text-white px-4">
      <div className="bg-gray-800 border-2 border-red-600 rounded-lg shadow-2xl p-6 w-full max-w-md ml-4">
        <h2 className="text-2xl font-bold text-center mb-4 text-red-500">User Profile</h2>

        <div className="space-y-4 text-white">
          {editMode ? (
            <>
              <input
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />
              <input
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />
              <input
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded bg-gray-800 border border-gray-600"
              />
              <button
                onClick={handleSave}
                className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p><FaUserEdit className="inline text-red-500 mr-2" /> {userData.name}</p>
              <p><MdEmail className="inline text-red-500 mr-2" /> {userData.email}</p>
              <p><FiPhone className="inline text-red-500 mr-2" /> {userData.phone}</p>
              <p><GoLocation className="inline text-yellow-400 mr-2" /> Location: </p>

              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-yellow-600 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
            </>
          )}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700 mt-2 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
