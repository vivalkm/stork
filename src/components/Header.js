import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import logo from "../assets/logo.png";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    function pathMatchRoute(route) {
        return location.pathname === route;
    }
    const { loggedIn } = useAuthContext();

    return (
        <div className="border-b shadow-sm sticky top-0 z-40 header">
            <header className="flex justify-between items-center">
                <div>
                    <img
                        className="cursor-pointer ml-2 header-logo"
                        src={logo}
                        alt="logo"
                        onClick={() => navigate("/")}
                    />
                </div>
                <div className="mr-2 whitespace-nowrap">
                    <ul className="flex space-x-10">
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/")
                                    ? "text-amber-200 border-amber-200"
                                    : "text-white border-b-transparent"
                            }`}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/offers")
                                    ? "text-amber-200 border-amber-200"
                                    : "text-white border-b-transparent"
                            }`}
                            onClick={() => navigate("/offers")}
                        >
                            Offers
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/sell")
                                    ? "text-amber-200 border-amber-200"
                                    : "text-white border-b-transparent"
                            }`}
                            onClick={() => navigate("/sell")}
                        >
                            Sell
                        </li>
                        <li
                            className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/signin") || pathMatchRoute("/profile")
                                    ? "text-amber-200 border-amber-200"
                                    : "text-white border-b-transparent"
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
