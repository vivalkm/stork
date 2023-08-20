import { createContext, useCallback, useState } from "react";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { deleteObject, getStorage, ref } from "firebase/storage";

const MyListingsContext = createContext();

function MyListingsContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);

    const fetchMyListings = useCallback(() => {
        // instead of calling auth.currentUser, make the user call asynchronous by subscribing to the auth observable instead
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchCurrentUserListings = async () => {
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
                fetchCurrentUserListings();
            }
        });
    }, []);

    /**
     *
     * @param {*} id of a listing
     * @returns true if delete is successful, otherwise return false
     */
    const deleteListingById = async (id) => {
        const docRef = doc(db, "listings", id);
        try {
            await deleteDoc(docRef);
            const updatedListings = listings.filter((listing) => listing.id !== id);
            setListings(updatedListings);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const deleteImageByName = async (imgName) => {
        const storage = getStorage();

        // Create a reference to the file to delete
        const storageRef = ref(storage, imgName);

        // Delete the file
        await deleteObject(storageRef);
    };

    const deleteImages = (imgNames) => {
        imgNames.forEach((imgName) => {
            deleteImageByName(imgName);
        });
    };

    return (
        <MyListingsContext.Provider
            value={{ loading, listings, deleteListingById, deleteImages, fetchMyListings }}
        >
            {children}
        </MyListingsContext.Provider>
    );
}
export default MyListingsContext;
export { MyListingsContextProvider };
