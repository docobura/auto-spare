import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    <div className="flex overflow-hidden flex-col text-black bg-black">
      <section className="flex relative flex-col justify-center items-center px-20 py-28 w-full min-h-[1080px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5989fe7fa671e74b167f383cfa36762776166d1ba25588db8fe91f6510542c5b?apiKey=27e637b116ae45f88d28619cf8e9c221&&apiKey=27e637b116ae45f88d28619cf8e9c221"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col items-center px-20 pt-12 pb-28 mb-0 ml-16 max-w-full bg-white bg-opacity-50 rounded-[79px] w-[996px] max-md:px-5 max-md:pb-24 max-md:mb-2.5">
          <form className="flex flex-col items-center mb-0 max-w-full w-[752px] max-md:mb-2.5" onSubmit={handleSubmit}>
            <h1 className="text-8xl text-center max-md:max-w-full max-md:text-4xl">Login Form</h1>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              type="email"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-7 mt-12 max-w-full text-3xl rounded-3xl bg-zinc-300 w-[706px] max-md:pr-5 max-md:mt-10"
              placeholder="Email Address"
              required
            />
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="self-stretch px-7 py-6 mx-7 mt-20 text-3xl whitespace-nowrap rounded-3xl bg-zinc-300 max-md:px-5 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="self-stretch px-16 py-10 mt-24 text-4xl text-center text-white whitespace-nowrap rounded-3xl bg-slate-600 max-md:px-5 max-md:mt-10 max-md:max-w-full"
            >
              Login
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <div className="mt-24 ml-2.5 text-2xl text-blue-950 max-md:mt-10">
              No Account? <a href="/signup" className="text-indigo-500">Sign Up Here</a>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
