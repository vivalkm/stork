import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { auth } from "../firebase";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route) {
        return location.pathname === route;
    }
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, [auth]);

    return (
        <div className="border-b bg-white shadow-sm sticky top-0">
            <header className="flex justify-between items-center">
                <div>
                    <img
                        className="h-5 cursor-pointer"
                        src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
                        alt="logo"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/")
                                    ? "text-black border-b-red-500"
                                    : "text-gray-400 border-b-transparent"
                            }`}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/offers")
                                    ? "text-black border-b-red-500"
                                    : "text-gray-400 border-b-transparent"
                            }`}
                            onClick={() => navigate("/offers")}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/signin") || pathMatchRoute("/profile")
                                    ? "text-black border-b-red-500"
                                    : "text-gray-400 border-b-transparent"
                            }`}
                            onClick={() => navigate(isLoggedIn ? "/profile" : "/signin")}
                        >
                            {isLoggedIn ? "Profile" : "Sign In"}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
