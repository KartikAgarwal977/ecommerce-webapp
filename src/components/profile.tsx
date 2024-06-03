import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getAuth, onAuthStateChanged, User, sendEmailVerification, signOut } from "firebase/auth";
import app from "../firebase-config";

const ProfileDialog: React.FC<{ isOpen: boolean; closeModal: () => void }> = ({ isOpen, closeModal }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [verificationMessage, setVerificationMessage] = useState<string | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
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

    const logoutUser = () => {
        signOut(auth).then(() => {
            setUser(null);
            }).catch((error) => {
                setError(error.message);
                });
    }

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

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
                <div className="flex items-center justify-center min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="relative z-50 w-full mx-auto my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-w-md">
                            <Dialog.Title as="h3" className="px-6 pt-6 text-lg font-medium leading-6 text-gray-900">
                                Profile
                            </Dialog.Title>
                            <hr className="border-t-6 border-black my-2 mx-6" />
                            <hr className="border-t-2 border-gray-200 my-2 mx-6" />
                            <div className="px-6 pb-6">
                                {loading ? (
                                    <div className="text-gray-900">Loading...</div>
                                ) : error ? (
                                    <div className="text-red-500">Error: {error}</div>
                                ) : user ? (
                                    <div className="text-gray-900">
                                        <p className="mb-2">Name: {user.displayName || "No display name"}</p>
                                        <p className="mb-4">Email: {user.email}</p>
                                        {user.emailVerified ? (
                                            <p className="mb-4 bg-green-200 text-green-500">Email is verified</p>
                                        ) : (
                                            <div>
                                                <p className="mb-4">Email is not verified</p>
                                                <button
                                                    className="bg-gold bg-blue-300 text-black px-4 py-2 rounded hover:bg-yellow-500"
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
                                    <p className="text-center text-gray-900">No user is signed in</p>
                                )}
                            </div>

                            <div className="flex justify-between px-6 my-3">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-transparent rounded-md hover:bg-blue-200"
                                    onClick={logoutUser}
                                >
                                    LogOut
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ProfileDialog;
