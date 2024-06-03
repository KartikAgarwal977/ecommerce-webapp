import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from '../firebase-config';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const Signin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Signed in
      navigate('/home');
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
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
        </div>    <h2 className="text-xl font-semibold text-center mb-4">Sign in your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              id="email"
              type="email"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-700">Remember</span>
            </label>
            <a href="/forgot-password" className="inline-block align-baseline text-sm text-red-600 hover:text-red-800">Forgot Password?</a>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-bold rounded ${loading ? 'bg-gray-400' : 'bg-black hover:bg-gray-800'}`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'SignIn'}
            </button>
            <a href="/signup" className="inline-block align-baseline text-sm text-blue-600 hover:text-blue-800">New User? Create Account</a>

          </div>
        </form>
        <div className="my-4 flex items-center justify-center">
                    <span className="w-full border-t border-gray-300"></span>
                    <span className="px-4 text-gray-500">or continue with</span>
                    <span className="w-full border-t border-gray-300"></span>
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 px-4 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100"
                >
                    <img
                        src="https://kgo.googleusercontent.com/profile_vrt_raw_bytes_1587515358_10512.png"
                        alt="Google Logo"
                        className="w-6 h-6 mr-2"
                    />
                    SignIn with Google
                </button>
                <p className="text-center text-gray-500 text-sm mt-4">
                    By clicking continue, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
                </p>
      </div>
    </div>
  );
};

export default Signin;
