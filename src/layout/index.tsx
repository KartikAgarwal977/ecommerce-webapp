import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import ProfileDialog from "../components/profile"; // Import the ProfileDialog component

const LayoutNavBar: React.FC = () => {
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState<boolean>(false);

    const openProfileDialog = () => setIsProfileDialogOpen(true);
    const closeProfileDialog = () => setIsProfileDialogOpen(false);

    return (
        <>
            <div className="flex justify-between items-center p-4 bg-black">
                <div className="flex items-center">
                    <img src="/logo.png" alt="KC Jewelers Logo" className="h-10 mr-2" />
                    <span className="text-white text-xl font-bold">KC Jewelers</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/products" className="text-white">Products</Link>
                    <Link to="/about" className="text-white">About</Link>
                    <button onClick={openProfileDialog} className="text-white">
                        <UserCircleIcon className="h-6 w-6 text-amber-400 hover:text-amber-600" />
                    </button>
                    <Link to="/cart">
                        <ShoppingCartIcon className="h-6 w-6 text-amber-400 hover:text-amber-600" />
                    </Link>
                </div>
            </div>
            <ProfileDialog isOpen={isProfileDialogOpen} closeModal={closeProfileDialog} />
            <Outlet />
        </>
    );
};

export default LayoutNavBar;
