import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import ListingCard from "./ListingCard";
import MainTitle from "./MainTitle";
import Spinner from "./Spinner";

export default function MyListings() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const fetchListings = useCallback(() => {
        // instead of calling auth.currentUser, make the user call asynchronous by subscribing to the auth observable instead

        const fetchAllListings = async () => {
            const q = query(collection(db, "listings"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            const newListings = [];
            querySnapshot.forEach((doc) => {
                newListings.push({ ...doc.data(), id: doc.id });
            });

            setListings(newListings);
            setLoading(false);
        };
        fetchAllListings();
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);
    
    const renderedListings = listings.map((listing, index) => {
        return <ListingCard key={index} listing={listing} editOn={false}/>;
    });

    if (loading) {
        return <Spinner />
    } else {
        if (renderedListings.length > 0) {
            return (
                <div>
                    <MainTitle>All Listings</MainTitle>
                    <ul className="gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {renderedListings}
                    </ul>
                </div>
            );
        }
    }
}
