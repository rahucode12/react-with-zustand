'use client';
import React   from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

 const LogOut = () => { 
    const router = useRouter();

    const handleLogout = () => {
        console.log("Logging out...");
        // Clear user session or token here
        Cookies.remove('auth_token'); // Remove the auth token cookie
        console.log("User logged out");
        router.push('/auth');
        // Optionally redirect to login page or home page
    };

    return (
        <button onClick={handleLogout}>
            Log Out
        </button>
    );
}

export default LogOut;
// This component can be used in your main layout or wherever you need a logout button