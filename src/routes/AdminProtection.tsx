import React, { useState, useEffect } from "react";
import app from "../firebase-config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProtection: React.FC<ProtectedRouteProps> = ({ children }) => {
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setEmail(user?.email)
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth]);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner if desired
    }

    if (currentUser) {
        if (currentUser.email === 'kartikag977@gmail.com') {
        return <>{children}</>;
        }
        else {
            return <Navigate to="/home" replace={true} />
        }
    } else {
        return <Navigate to="/signIn" replace={true} />;
    }
};

export default AdminProtection;
