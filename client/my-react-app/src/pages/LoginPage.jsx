import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setAuthToken(data.token); 
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-black text-black">
      <section className="flex relative flex-col justify-center items-center w-full h-full px-5 py-28 bg-black text-white">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5989fe7fa671e74b167f383cfa36762776166d1ba25588db8fe91f6510542c5b?apiKey=27e637b116ae45f88d28619cf8e9c221&&apiKey=27e637b116ae45f88d28619cf8e9c221"
          alt="Background"
          className="object-cover absolute inset-0 w-full h-full opacity-50 z-0"
        />
        <div className="flex flex-col items-center px-8 py-12 bg-white bg-opacity-50 rounded-lg w-full max-w-md relative z-10">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-8">Login Form</h1>
            <input
              id="email"
              type="email"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 mt-4 text-xl rounded-lg bg-gray-200 text-black placeholder-black placeholder-opacity-50 w-full"
              placeholder="Email Address"
              required
            />
            <div className="relative w-full">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 mt-4 text-xl rounded-lg bg-gray-200 text-black placeholder-black placeholder-opacity-50 w-full pr-12"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="py-3 mt-4 absolute inset-y-0 right-0 flex items-center px-4"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <button
              type="submit"
              className="px-8 py-3 mt-6 text-xl text-white bg-gray-700 rounded-lg"
            >
              Login
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <div className="mt-6 text-lg text-blue-800">
              No Account? <a href="/signup" className="text-indigo-500">Sign Up Here</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;