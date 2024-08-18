import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [requires2FA, setRequires2FA] = useState(false);
    const [twoFaCode, setTwoFaCode] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('https://auto-spare.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const { access_token, userId } = data;

            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('userId', userId);

            const send2FAResponse = await fetch('https://auto-spare.onrender.com/send-2fa-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify({ email }),
            });

            if (!send2FAResponse.ok) {
                throw new Error('Failed to send 2FA code');
            }

            setRequires2FA(true);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleVerify2FA = async (e) => {
        e.preventDefault();
    
        try {
            const accessToken = localStorage.getItem('accessToken');
            const userId = localStorage.getItem('userId');
    
            const response = await fetch('https://auto-spare.onrender.com/verify-2fa-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ code: twoFaCode }),
            });
    
            const data = await response.json();
            if (response.ok) {
                login(accessToken, userId);
                navigate('/');
            } else {
                throw new Error(data.error || 'Failed to verify 2FA code');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen ">
            <section className="flex relative flex-col justify-center items-center w-full h-full px-5 py-28 text-black">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5989fe7fa671e74b167f383cfa36762776166d1ba25588db8fe91f6510542c5b?apiKey=27e637b116ae45f88d28619cf8e9c221"
                    alt="Background"
                    className="object-cover absolute inset-0 w-full h-full opacity-50 z-0"
                />
                <div className="flex flex-col items-center px-8 py-12 bg-white rounded-lg w-full max-w-md relative z-10 shadow-lg">
                    {requires2FA ? (
                        <form className="flex flex-col items-center w-full" onSubmit={handleVerify2FA}>
                            <h1 className="text-4xl text-center mb-8">Verify 2FA Code</h1>
                            <input
                                type="text"
                                value={twoFaCode}
                                onChange={(e) => setTwoFaCode(e.target.value)}
                                placeholder="Enter 2FA code"
                                className="px-4 py-3 mt-4 text-xl rounded-lg bg-gray-100 text-black placeholder-black placeholder-opacity-50 w-full"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 mt-6 text-xl text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                            >
                                Verify 2FA Code
                            </button>
                            {error && <p className="mt-4 text-red-600">{error}</p>}
                        </form>
                    ) : (
                        <form className="flex flex-col items-center w-full" onSubmit={handleLogin}>
                            <h1 className="text-4xl text-center mb-8">Login Form</h1>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="px-4 py-3 mt-4 text-xl rounded-lg bg-gray-100 text-black placeholder-black placeholder-opacity-50 w-full"
                                required
                            />
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="px-4 py-3 mt-4 text-xl rounded-lg bg-gray-100 text-black placeholder-black placeholder-opacity-50 w-full"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="py-3 mt-4 absolute inset-y-0 right-0 flex items-center px-4 text-orange-500"
                                >
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="px-8 py-3 mt-6 text-xl text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                            >
                                Log In
                            </button>
                            {error && <p className="mt-4 text-red-600">{error}</p>}
                            <div className="mt-6 text-lg text-black">
                                Don't have an account? <a href="/signup" className="text-orange-700 hover:underline">Sign up Here</a>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LoginPage;
