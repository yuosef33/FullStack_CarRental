import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiFinishLine } from 'react-icons/gi';
import axios from 'axios';


const InputWithIcon = ({ icon, placeholder, type = 'text', value, onChange }) => (
  <div className="flex items-center border border-gray-600 bg-gray-900 p-3 rounded focus-within:ring-2 focus-within:ring-red-500 text-white">
    <span className="text-red-500 mr-2">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
    />
  </div>
);

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 font-sans">
      <div className="bg-gray-900 border-2 border-red-600 rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-4 text-red-600 text-4xl">
          <GiFinishLine className="mr-2" />
          <span className="font-extrabold tracking-wide"> Login</span>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <InputWithIcon
            icon={<MdEmail />}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputWithIcon
            icon={<RiLockPasswordLine />}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition uppercase font-semibold tracking-wider"
          >
            Start Engines
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Don’t have an account?{' '}
          <button onClick={() => navigate('/signup')} className="text-red-400 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
