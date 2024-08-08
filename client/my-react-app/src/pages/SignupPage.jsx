import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext'; // Adjust the path if needed

const InputField = ({ label, type, id, value, onChange }) => (
  <div className="mt-12 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="w-full px-5 py-7 whitespace-nowrap rounded-3xl bg-zinc-300"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const SignupForm = ({ onSubmit, error }) => (
  <section className="flex flex-col -mb-6 max-w-full w-[771px] max-md:mb-2.5">
    <h1 className="self-center text-8xl text-center max-md:max-w-full max-md:text-4xl">
      Sign up Form
    </h1>
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <InputField label="Email Address" type="email" id="email" />
      <InputField label="Password" type="password" id="password" />
      <InputField label="Confirm Password" type="password" id="confirm-password" />
      <button
        type="submit"
        className="px-16 py-9 mt-20 ml-5 text-5xl text-center text-white whitespace-nowrap rounded-3xl bg-slate-600 max-md:px-5 max-md:mt-10 max-md:max-w-full max-md:text-4xl"
      >
        Signup
      </button>
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  </section>
);

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', { // Adjust URL if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      setAuthToken(data.token); // Save token to context or local storage
      navigate('/'); // Redirect to home or dashboard page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="flex overflow-hidden flex-col text-3xl text-black bg-black">
      <section className="flex relative flex-col justify-center items-center px-20 py-28 w-full min-h-[1107px] max-md:px-5 max-md:py-24 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8935c23d8b329f0aff14f959f0b2f4f2d27bc391b442b3e2601d470b51dd7370?apiKey=27e637b116ae45f88d28619cf8e9c221&&apiKey=27e637b116ae45f88d28619cf8e9c221"
          alt="Background"
          className="object-cover absolute inset-0 size-full"
        />
        <div className="flex relative flex-col items-center px-20 pt-12 pb-32 mb-0 w-full bg-white bg-opacity-50 max-w-[996px] rounded-[79px] max-md:px-5 max-md:pb-24 max-md:mb-2.5 max-md:max-w-full">
          <SignupForm onSubmit={handleSubmit} error={error} />
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
