import React from "react";
import MainTitle from "./MainTitle";
import useMyListingsContext from "../hooks/useMyListingsContext";
import ListingCard from "./ListingCard";

export default function MyListings() {
    const { loading, listings } = useMyListingsContext();
    const renderedListings = listings.map((listing, index) => {
        return <ListingCard key={index} listing={listing} />;
    });
    if (!loading) {
        return (
            <div>
                <MainTitle>My Listings</MainTitle>
                <ul className="space-x-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {renderedListings}
                </ul>
            </div>
        );
    }
}
