import React, { useEffect } from "react";
import MainTitle from "./MainTitle";
import useMyListingsContext from "../hooks/useMyListingsContext";
import ListingCard from "./ListingCard";

export default function MyListings() {
    const { loading, listings, fetchListings } = useMyListingsContext();

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const renderedListings = listings.map((listing, index) => {
        return (
            <li className="m-2">
                <ListingCard key={index} listing={listing} editOn={true} />
            </li>
        );
    });

    if (!loading && renderedListings.length > 0) {
        return (
            <div>
                <MainTitle>My Listings</MainTitle>
                <ul className="py-6 px-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                    {renderedListings}
                </ul>
            </div>
        );
    }
}
