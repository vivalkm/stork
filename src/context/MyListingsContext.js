import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const MyListingsContext = createContext();

function MyListingsContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        // instead of calling auth.currentUser, make the user call asynchronous by subscribing to the auth observable instead
        onAuthStateChanged(auth, (user) => {
            const fetchCurrentUserListing = async () => {
                const q = query(
                    collection(db, "listings"),
                    where("uid", "==", user.uid),
                    orderBy("timestamp", "desc")
                );
                const querySnapshot = await getDocs(q);
                const newListings = [];
                querySnapshot.forEach((doc) => {
                    newListings.push({ ...doc.data(), id: doc.id });
                });

                setListings(newListings);
                setLoading(false);
            };
            fetchCurrentUserListing();
        });
    }, [listings]);

    const deleteListingById = (id) => {
        return 0;
    };

    return (
        <MyListingsContext.Provider value={{ loading, listings, deleteListingById }}>
            {children}
        </MyListingsContext.Provider>
    );
}
export default MyListingsContext;
export { MyListingsContextProvider };
