import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleEmailSignup = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name
            });
            navigate("/home");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/home");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-center mb-6">KC Jewelers</h1>
                </div>
                <h2 className="text-xl font-semibold text-center mb-4">Create an account</h2>
                <p className="text-gray-500 text-center mb-6">Enter your email to sign up for this app</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleEmailSignup} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your Full Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="email@domain.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 text-white font-bold rounded ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Sign up with email'}
                    </button>
                    <a href="/signIn" className="inline-block align-baseline text-sm text-blue-600 hover:text-blue-800">Already have an Account? Sign in</a>


                </form>
                <div className="my-4 flex items-center justify-center">
                    <span className="w-full border-t border-gray-300"></span>
                    <span className="px-4 text-gray-500">or continue with</span>
                    <span className="w-full border-t border-gray-300"></span>
                </div>
                <button
                    onClick={handleGoogleSignup}
                    className="w-full py-2 px-4 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                >
                    <img
                        src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
                        alt="Google Logo"
                        className="w-6 h-6 mr-2"
                    />
                    Google
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                    By clicking continue, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
};

export default Signup;
