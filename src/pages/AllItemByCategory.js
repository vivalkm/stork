import React from "react";
import AllListings from "../components/AllListings";
import { useParams } from "react-router";
import MainTitle from "../components/MainTitle";

export default function AllItemByCategory({}) {
    const params = useParams();
    return (
        <div>
            <MainTitle>Items for {params.item ? params.item : params.category}</MainTitle>
            <AllListings showMoreEnabled={true} />
            <div className="mb-6"></div>
        </div>
    );
}
