import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User, sendEmailVerification } from "firebase/auth";
import app from "../firebase-config";

const Profilepage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [verificationMessage, setVerificationMessage] = useState<string | null>(null);

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        }, (error) => {
            setError(error.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSendVerificationEmail = async () => {
        if (user) {
            try {
                await sendEmailVerification(user);
                setVerificationMessage("Verification email sent!");
            } catch (error) {
                setError((error as Error).message);
            }
        }
    };

    if (loading) {
        return <div className="profilepage text-gold flex justify-center items-center min-h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="profilepage text-red-500 flex justify-center items-center min-h-screen">Error: {error}</div>;
    }

    return (
        <div className="profilepage  text-gold min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl mb-6">Profile Page</h1>
            {user ? (
                <div className="text-center">
                    <p className="mb-2">Name: {user.displayName || "No display name"}</p>
                    <p className="mb-4">Email: {user.email}</p>
                    {user.emailVerified ? (
                        <p className="mb-4">Email is verified</p>
                    ) : (
                        <div>
                            <p className="mb-4">Email is not verified</p>
                            <button
                                className="bg-gold text-black px-4 py-2 rounded hover:bg-yellow-500"
                                onClick={handleSendVerificationEmail}
                            >
                                Send Verification Email
                            </button>
                            {verificationMessage && (
                                <p className="mt-4 text-green-500">{verificationMessage}</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-center">No user is signed in</p>
            )}
        </div>
    );
};

export default Profilepage;
