import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import ListingCard from "./ListingCard";
import MainTitle from "./MainTitle";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export default function RecentListings({ count }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const fetchListings = useCallback(() => {
        // instead of calling auth.currentUser, make the user call asynchronous by subscribing to the auth observable instead

        const fetchAllListings = async () => {
            const q = query(collection(db, "listings"), orderBy("timestamp", "desc"), limit(count ? count : 100));
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

    const renderedListings = listings.map((listing) => {
        return <ListingCard key={listing.id} listing={listing} editOn={false} />;
    });

    if (loading) {
        return <Spinner />;
    } else {
        if (renderedListings.length > 0) {
            return (
                <div>
                    <ul className="gap-2 grid py-6 px-6 sm:grid-cols-2 xl:grid-cols-4">
                        {renderedListings}
                    </ul>
                </div>
            );
        }
    }
}
