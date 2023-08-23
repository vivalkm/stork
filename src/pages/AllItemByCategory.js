import React from "react";
import AllListings from "../components/AllListings";
import { useParams } from "react-router";

export default function AllItemByCategory() {
    const params = useParams();
    return (
        <div>
            <h2 className={`px-3 text-center text-2xl mt-6 font-semibold uppercase`}>
                Items for {params.category}
            </h2>
            <AllListings showMoreEnabled={true} />
            <div className="mb-6"></div>
        </div>
    );
}
