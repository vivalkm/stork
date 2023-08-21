import React from "react";
import AllListings from "../components/AllListings";

export default function Home() {
    return (
        <div className="flex justify-center flex-wrap items-center px-6 mb-6 max-w-6xl mx-auto">
            <AllListings />
        </div>
    );
}
