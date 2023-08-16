import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function PrivateRouteSignUp() {
    const { loggedIn } = useAuthContext();
    return loggedIn ? <Navigate to="/profile" /> : <Outlet />;
}
