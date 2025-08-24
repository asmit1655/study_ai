import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import logo from '../assets/logo.png'; 

const Register = () => {
    // NOTE: First name and last name are for UI purposes only as the backend doesn't support them.
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        setError('');
        setLoading(true);
        try {
            await register(email, password);
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to create an account. The email may already be in use.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 font-sans">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl">
                <div className="md:flex w-full">
                    <div className="hidden md:flex w-1/2 bg-indigo-500 py-10 px-10 items-center justify-center">
                         <div className="text-white text-center">
                            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
                            <p className="mb-6">Sign in to continue your journey and access your personalized dashboard.</p>
                            <img src={logo} alt="StudyAI Logo" className="h-auto w-auto mx-auto" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex -mx-3">
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">First name</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="John" />
                                    </div>
                                </div>
                                <div className="w-1/2 px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Last name</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Smith" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="johnsmith@example.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                    </div>
                                </div>
                            </div>
                            {error && <p className="text-xs text-red-600 text-center mb-4">{error}</p>}
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <button type="submit" disabled={loading} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold disabled:bg-indigo-300">
                                        {loading ? 'REGISTERING...' : 'REGISTER NOW'}
                                    </button>
                                </div>
                            </div>
                             <p className="text-sm text-center text-gray-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;