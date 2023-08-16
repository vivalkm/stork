import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route) {
        return location.pathname === route;
    }
    const { loggedIn } = useAuthContext();

    return (
        <div className="border-b bg-white shadow-sm sticky top-0 z-40">
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
                                pathMatchRoute("/sell")
                                    ? "text-black border-b-red-500"
                                    : "text-gray-400 border-b-transparent"
                            }`}
                            onClick={() => navigate("/sell")}
                        >
                            Sell
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/signin") || pathMatchRoute("/profile")
                                    ? "text-black border-b-red-500"
                                    : "text-gray-400 border-b-transparent"
                            }`}
                            onClick={() => navigate(loggedIn ? "/profile" : "/signin")}
                        >
                            {loggedIn ? "Profile" : "Sign In"}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
