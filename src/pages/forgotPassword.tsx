import React, { useState } from 'react';
import app from '../firebase-config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>();
    const auth = getAuth(app)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await sendPasswordResetEmail(auth, email);
            setLoading(false)
            setMessage('Password reset email sent! Check your inbox.');
        } catch (error) {
            setMessage('Error sending password reset email');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-6">KC Jewelers</h1>
                </div>
                <form onSubmit={handleSubmit} className="w-full max-w-sm p-4 bg-white shadow-md rounded">
                    <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-bold rounded ${loading ? 'bg-gray-700' : 'bg-black hover:bg-gray-800'}`}
              disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send  Password Reset Email'}

                    </button>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
