import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./Spinner";

export default function PrivateRouteProfile({ needLoggedIn, pathIfFalse }) {
    const { loggedIn, checkingStatus } = useAuthContext();

    if (checkingStatus) {
        return <Spinner />;
    }
    return loggedIn === needLoggedIn ? <Outlet /> : <Navigate to={pathIfFalse} />;
}
