import React from "react";
import RecentListings from "../components/RecentListings";

export default function AllListingPage() {
    return (
        <div>
            <h2 className={`px-3 text-center text-2xl mt-6 font-semibold`}>Recent Items</h2>
            <RecentListings showMoreEnabled={true} />
            <div className="mb-6"></div>
        </div>
    );
}
