import { collection, getDocs, orderBy, query, where, limit, startAfter } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ListingCard from "./ListingCard";
import Button from "./Button";
import { useParams } from "react-router";
import Spinner from "./Spinner";

export default function AllListings({ count, showMoreEnabled, category }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [lastFetched, setLastFetched] = useState(null);
    const defaultCount = 8;
    const incrementalCount = 4;
    const params = useParams();
    const queryConstraints = [];
    // if (params.item) queryConstraints.push(where("name", "==", params.item));
    if (params.category && params.category !== "all") {
        queryConstraints.push(where("category", "==", params.category));
    } else if (category) {
        queryConstraints.push(where("category", "==", category));
    }

    useEffect(() => {
        let isMounted = true;
        let q;
        const fetchListings = async () => {
            try {
                q = query(
                    collection(db, "listings"),
                    ...queryConstraints,
                    orderBy("timestamp", "desc"),
                    limit(count ? count : defaultCount)
                );
                const querySnapshot = await getDocs(q);
                const newListings = [];


                if (!params.item) {
                    // get all doc
                    querySnapshot.forEach((doc) => {
                        newListings.push({ ...doc.data(), id: doc.id });
                    });
                } else {
                    // get doc that name contains item as substring
                    // enables fuzzy search
                    querySnapshot.forEach((doc) => {
                        console.log(doc.data().name);
                        if (doc.data().name.includes(params.item)) {
                            newListings.push({ ...doc.data(), id: doc.id });
                        }
                    });
                }

                if (isMounted) {
                    setListings(newListings);
                    setLoading(false);
                    if (querySnapshot.docs.length === defaultCount) {
                        setLastFetched(querySnapshot.docs[querySnapshot.docs.length - 1]);
                    } else {
                        setLastFetched(null);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchListings();
        return () => {
            isMounted = false;
        };
    }, [count, params]);

    const fetchMore = async () => {
        try {
            const q = query(
                collection(db, "listings"),
                ...queryConstraints,
                orderBy("timestamp", "desc"),
                startAfter(lastFetched),
                limit(count ? count : defaultCount)
            );
            const querySnapshot = await getDocs(q);
            const newListings = [...listings];

            if (!params.item) {
                // get all doc
                querySnapshot.forEach((doc) => {
                    newListings.push({ ...doc.data(), id: doc.id });
                });
            } else {
                // get doc that name contains item as substring
                // enables fuzzy search
                querySnapshot.forEach((doc) => {
                    if (doc.data().name.includes(params.item)) {
                        newListings.push({ ...doc.data(), id: doc.id });
                    }
                });
            }

            setListings(newListings);
            setLoading(false);
            if (querySnapshot.docs.length === incrementalCount) {
                setLastFetched(querySnapshot.docs[querySnapshot.docs.length - 1]);
            } else {
                setLastFetched(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderedListings = listings.map((listing) => {
        return (
            <li className="m-2 sm:m-3 md:m-5">
                <ListingCard key={listing.id} listing={listing} editOn={false} />
            </li>
        );
    });

    if (!loading) {
        if (renderedListings.length > 0) {
            return (
                <div>
                    <ul className="m-auto grid py-6 px-6 sm:grid-cols-2 xl:w-[80%] 2xl:w-full 2xl:grid-cols-4">
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
            return <div>There is no item to show.</div>;
        }
    } else {
        return <Spinner></Spinner>
    }
}
