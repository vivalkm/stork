import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./Spinner";

export default function PrivateRouteSignUp() {
    const { loggedIn, checkingStatus } = useAuthContext();

    if (checkingStatus) {
        return <Spinner />;
    }
    return loggedIn ? <Navigate to="/profile" /> : <Outlet />;
}
