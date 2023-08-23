import React from "react";
import AllFreeListings from "../components/FreeListings";

export default function AllFreeListingPage() {
    return (
        <div>
            <h2 className={`px-3 text-center text-2xl mt-6 font-semibold`}>Free Items</h2>
            <AllFreeListings showMoreEnabled={true} />
            <div className="mb-6"></div>
        </div>
    );
}
