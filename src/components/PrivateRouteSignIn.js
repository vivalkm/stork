import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./Spinner";

export default function PrivateRouteSignIn() {
    const { loggedIn, checkingStatus } = useAuthContext();
    
    if (checkingStatus) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        );
    }
    return loggedIn ? <Navigate to="/profile" /> : <Outlet />;
}
