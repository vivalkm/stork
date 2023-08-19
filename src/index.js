import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { MyListingsContextProvider } from "./context/MyListingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <MyListingsContextProvider>
            <App />
        </MyListingsContextProvider>
    </AuthContextProvider>
);
