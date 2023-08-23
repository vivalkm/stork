import { collection, getDocs, orderBy, query, where, limit, startAfter } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ListingCard from "./ListingCard";
import Spinner from "./Spinner";
import Button from "./Button";

export default function FreeListings({ count, showMoreEnabled }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [lastFetched, setLastFetched] = useState(null);
    const defaultCount = 8;
    const incrementalCount = 4;

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const q = query(
                    collection(db, "listings"),
                    where("category", "==", "free"),
                    orderBy("timestamp", "desc"),
                    limit(count ? count : defaultCount)
                );
                const querySnapshot = await getDocs(q);
                const newListings = [];
                querySnapshot.forEach((doc) => {
                    newListings.push({ ...doc.data(), id: doc.id });
                });

                setListings(newListings);
                setLoading(false);
                if (querySnapshot.docs.length == defaultCount) {
                    setLastFetched(querySnapshot.docs[querySnapshot.docs.length - 1]);
                } else {
                    setLastFetched(null);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchListings();
    }, []);

    const fetchMore = async () => {
        try {
            const q = query(
                collection(db, "listings"),
                where("category", "==", "free"),
                orderBy("timestamp", "desc"),
                startAfter(lastFetched),
                limit(4)
            );
            const querySnapshot = await getDocs(q);
            const newListings = [...listings];
            querySnapshot.forEach((doc) => {
                newListings.push({ ...doc.data(), id: doc.id });
            });

            setListings(newListings);
            setLoading(false);
            if (querySnapshot.docs.length == incrementalCount) {
                setLastFetched(querySnapshot.docs[querySnapshot.docs.length - 1]);
            } else {
                setLastFetched(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                    {showMoreEnabled && lastFetched && (
                        <div className="flex justify-center">
                            <Button primary rounded onClick={fetchMore}>
                                Show More
                            </Button>
                        </div>
                    )}
                </div>
            );
        } else {
            return <div>There is no recent item to show.</div>;
        }
    }
}
