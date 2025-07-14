import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phone, setPhone] = useState('');
  const [selCar, setSelCar] = useState(null);
  const [user, setUser] = useState(null);
  const [err, setErr] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const car = JSON.parse(localStorage.getItem('selectedCar'));
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (car) setSelCar(car);
    if (userInfo) setUser(userInfo);
  }, []);

  const calculateTotalPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return selCar ? diffDays * selCar.pricePerDay : 0;
  };

  const validate = () => {
    if (!phone || phone.length !== 11) {
      setErr('Phone number must be 11 digits');
      return false;
    }
    if (!startDate || !endDate) {
      setErr('Please select start and end date');
      return false;
    }
    console.log(user, selCar);
    if (!user?.id || !selCar?._id) {
      setErr('Missing user or car info');
      return false;
    }
    setErr('');
    return true;
  };

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const token = localStorage.getItem('token');
      const totalPrice = calculateTotalPrice();
      console.log(  user.id,
      selCar._id,
        startDate,
        endDate,
        totalPrice );
        await axios.post(
          'http://localhost:3000/api/reservations',
          {
            carId: selCar._id,
            startDate,
            endDate
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      setSuccessMsg('Reservation successful!');
      setPhone('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error(error);
      setErr('Failed to make reservation');
    }
  };

  if (!selCar || !user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Reserve Car</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-11/12 max-w-5xl">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <img
            src={selCar.imageUrl}
            alt="Car"
            className="w-3/4 h-auto rounded-md mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="text-gray-600 text-lg mb-6">
            <p>Car: <strong>{selCar.brand} - {selCar.model}</strong></p>
            <p>Price/day: <strong>${selCar.pricePerDay}</strong></p>
            <p>Total: <strong>${calculateTotalPrice()}</strong></p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reservation Info</h2>
          {err && <p className="text-red-500 text-center mb-4">{err}</p>}
          {successMsg && <p className="text-green-600 text-center mb-4">{successMsg}</p>}

          <form onSubmit={handleReserve} className="flex flex-col gap-4">
            <input
              type="email"
              value={user.email}
              disabled
              className="border border-gray-300 p-3 rounded-md bg-gray-100"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 rounded-md"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-md"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-3 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
            >
              Reserve Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
