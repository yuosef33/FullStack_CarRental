import React, { useState, useEffect } from 'react';
import { FaCar, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { GiFinishLine } from 'react-icons/gi';
import axios from 'axios';

const Admin = () => {
  const [showBookings, setShowBookings] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
 const [newCar, setNewCar] = useState({
  brand: '',
  model: '',
  year: '',
  type: '',
  pricePerDay: '',
  hp: '',
  acceleration: '',
  tank: '',
  imageUrl: '',
});

  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem('token');


  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/reservations/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Bookings response:', res.data);
      setBookings(res.data.reservations || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };


  const handleAddCar = async () => {
    const { brand, model, type, pricePerDay, hp, acceleration, tank, imageUrl,year } = newCar;
  
    if (brand && model && type && pricePerDay && hp && acceleration && tank && imageUrl && year) {
      try {
        const dataToSend = {
          brand,
          model,
          year: Number(year),
          type,
          pricePerDay: Number(pricePerDay),
          hp: Number(hp),
          acceleration: Number(acceleration),
          tank: Number(tank),
          imageUrl
        };
  
        await axios.post('http://localhost:3000/api/cars', dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        alert('Car added successfully');
        setNewCar({
          brand: '',
          model: '',
          type: '',
          pricePerDay: '',
          hp: '',
          acceleration: '',
          tank: '',
          imageUrl: ''
        });
        setShowAddCarForm(false);
      } catch (err) {
        console.error('Failed to add car:', err);
        alert('Failed to add car');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const handleUpdateBooking = async (id, action) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/reservations/${id}/status`,
        { status: action }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings(); 
    } catch (err) {
      console.error(`Failed to ${action} booking:`, err);
    }
  };

  useEffect(() => {
    if (showBookings) fetchBookings();
  }, [showBookings]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="bg-black border-2 border-green-500 rounded-lg shadow-2xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-center mb-6 text-yellow-400 text-4xl">
          <GiFinishLine className="mr-2" />
          <span className="font-extrabold tracking-wide">Admin Dashboard</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setShowBookings(!showBookings);
              setShowAddCarForm(false);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold tracking-wide transition"
          >
            {showBookings ? 'Hide Bookings' : 'Show Bookings'}
          </button>

          <button
            onClick={() => {
              setShowAddCarForm(!showAddCarForm);
              setShowBookings(false);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold tracking-wide transition"
          >
            {showAddCarForm ? 'Cancel Add' : 'Add Car'}
          </button>
        </div>

        {showAddCarForm && (
  <div className="bg-gray-800 p-4 rounded mb-6">
    <h3 className="text-lg font-bold mb-4 text-yellow-400">Add New Car</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Brand"
        value={newCar.brand}
        onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        placeholder="Model"
        value={newCar.model}
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />

      <select
        value={newCar.type}
        onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="">Select Type</option>
        <option value="Luxury">Luxury</option>
        <option value="Sports">Sports</option>
        <option value="SUV">SUV</option>
        <option value="Classic">Classic</option>
        <option value="Business">Business</option>
        <option value="Electric (EV)">Electric (EV)</option>
        <option value="VAN">VAN</option>
      </select>

      <input
        type="text"
        placeholder="Price Per Day"
        value={newCar.pricePerDay}
        onChange={(e) => setNewCar({ ...newCar, pricePerDay: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />

      <input
        type="number"
        placeholder="Horsepower (HP)"
        value={newCar.hp}
        onChange={(e) => setNewCar({ ...newCar, hp: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="number"
        placeholder="Acceleration (0-100)"
        value={newCar.acceleration}
        onChange={(e) => setNewCar({ ...newCar, acceleration: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="number"
        placeholder="Fuel Tank Size"
        value={newCar.tank}
        onChange={(e) => setNewCar({ ...newCar, tank: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="text"
        placeholder="Image URL (e.g. mustang.jpg)"
        value={newCar.imageUrl}
        onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="number"
        placeholder="Year"
        value={newCar.year}
        onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
        className="p-2 rounded bg-gray-700 text-white"
      />

    </div>

    <button
      onClick={handleAddCar}
      className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold"
    >
      Submit
    </button>
  </div>
)}

        {showBookings && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="flex justify-between items-center bg-gray-800 border-l-4 border-yellow-400 p-4 rounded"
              >
                <div>
                  <p className="text-lg font-semibold">
                    <FaCar className="inline text-green-400 mr-2" />
                    {booking.car?.model || 'Unknown Car'}
                  </p>
                  <p className="text-sm text-gray-300">
                    Booking by: {booking.user?.name || 'Unknown'} | Start: {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                </div>
                          {booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              className="bg-green-600 hover:bg-green-700 p-2 rounded text-white"
                              onClick={() => handleUpdateBooking(booking._id, 'confirmed')}
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white"
                              onClick={() => handleUpdateBooking(booking._id, 'cancelled')}
                            >
                              <FaTimesCircle />
                            </button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
