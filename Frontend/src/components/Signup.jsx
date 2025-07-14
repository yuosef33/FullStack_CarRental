import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GoLocation } from 'react-icons/go';
import { GiFinishLine } from 'react-icons/gi';
import { FiPhone } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LocationSelector = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
};
const InputWithIcon = ({ icon, placeholder, type = 'text', value, onChange, required = false }) => (
  <div className="flex items-center border border-gray-600 bg-gray-900 p-3 rounded focus-within:ring-2 focus-within:ring-red-500 text-white">
    <span className="text-red-500 mr-2">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
  );

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/users/signup', {
        name: `${firstName} ${lastName}`,
        email,
        password,
        phone: `+${countryCode}${phoneNumber}`,
        location: location || null
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 font-sans">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-4 text-red-600 text-4xl">
          <GiFinishLine className="mr-2" />
          <span className="font-extrabold tracking-wide"> Sign-Up</span>
        </div>

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputWithIcon icon={<FaUser />} placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <InputWithIcon icon={<FaUser />} placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <InputWithIcon icon={<MdEmail />} placeholder="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputWithIcon icon={<RiLockPasswordLine />} placeholder="Password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />


          <div className="flex items-center space-x-2">
            <div className="flex items-center border border-gray-600 bg-gray-900 p-3 rounded w-1/3 focus-within:ring-2 focus-within:ring-red-500 text-white">
              <span className="text-red-500 mr-2">+</span>
              <input
                type="text"
                placeholder="20"
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border border-gray-600 bg-gray-900 p-3 rounded w-2/3 focus-within:ring-2 focus-within:ring-red-500 text-white">
              <FiPhone className="text-red-500 mr-2" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <p className="text-sm text-gray-300 flex items-center gap-1">
            <GoLocation className="text-yellow-400" />
            Click on the map to choose your Location.
          </p>

          <div className="w-full h-48 rounded overflow-hidden border-2 border-red-500">
            <MapContainer center={[30.033, 31.233]} zoom={6} className="h-full w-full">
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationSelector onSelect={setLocation} />
              {location && <Marker position={location} />}
            </MapContainer>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition uppercase font-semibold tracking-wider"
          >
            Sign-up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already racing with us?{' '}
          <a href="/login" className="text-red-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
