import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

export default function PrivateRouteProfile() {
    const { loggedIn } = useAuthContext();
    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}
