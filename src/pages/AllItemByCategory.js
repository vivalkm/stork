import React from "react";
import AllListings from "../components/AllListings";
import { useParams } from "react-router";
import MainTitle from "../components/MainTitle";
import Header from "../components/Header";

export default function AllItemByCategory() {
    const params = useParams();
    return (
        <div>
            <Header />
            <MainTitle>Items for {params.item ? params.item : params.category}</MainTitle>
            <AllListings showMoreEnabled={true} />
            <div className="mb-6"></div>
        </div>
    );
}
