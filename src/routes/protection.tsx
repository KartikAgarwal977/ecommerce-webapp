import React, { useState, useEffect } from "react";
import app from "../firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Navigate } from "react-router-dom";
import SkeletonLoader from "../components/skeletonLoading";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return <div><SkeletonLoader/></div>; 
    }

    if (currentUser) {
        return <>{children}</>;
    } else {
        return <Navigate to="/signIn" replace={true} />;
    }
};

export default ProtectedRoute;
