import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('https://auto-spare.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Signup failed');
      }

      const data = await response.json();
      if (setAuthToken) {
        setAuthToken(data.access_token);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <section className="flex relative flex-col justify-center items-center w-full h-full px-5 py-28 text-black">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8935c23d8b329f0aff14f959f0b2f4f2d27bc391b442b3e2601d470b51dd7370?apiKey=27e637b116ae45f88d28619cf8e9c221"
          alt="Background"
          className="object-cover absolute inset-0 w-full h-full opacity-50 z-0"
        />
        <div className="flex flex-col items-center px-8 py-12 bg-white rounded-lg w-full max-w-md relative z-10 shadow-lg">
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <h1 className="text-4xl text-center mb-8">Signup Form</h1>
            <input
              id="username"
              type="text"
              aria-label="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="px-4 py-3 mt-4 text-xl rounded-lg bg-white text-black placeholder-black placeholder-opacity-50 w-full border border-gray-300"
              placeholder="Username"
              required
            />
            <input
              id="email"
              type="email"
              aria-label="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 mt-4 text-xl rounded-lg bg-white text-black placeholder-black placeholder-opacity-50 w-full border border-gray-300"
              placeholder="Email Address"
              required
            />
            <div className="relative w-full">
              <input
                id="password"
                type={formData.showPassword ? 'text' : 'password'}
                aria-label="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="px-4 py-3 mt-4 text-xl rounded-lg bg-white text-black placeholder-black placeholder-opacity-50 w-full pr-12 border border-gray-300"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="py-3 mt-4 absolute inset-y-0 right-0 flex items-center px-4 text-orange-500"
              >
                {formData.showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            <input
              id="confirmPassword"
              type={formData.showPassword ? 'text' : 'password'}
              aria-label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="px-4 py-3 mt-4 text-xl rounded-lg bg-white text-black placeholder-black placeholder-opacity-50 w-full border border-gray-300"
              placeholder="Confirm Password"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 mt-6 text-xl text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Signup
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <div className="mt-6 text-lg">
              Already have an account? <a href="/login" className="text-orange-600 hover:underline">Login Here</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
