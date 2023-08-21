import { createContext, useCallback, useState } from "react";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { deleteObject, getStorage, ref } from "firebase/storage";

const MyListingsContext = createContext();

function MyListingsContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [uid, setUid] = useState(null);

    /**
     * Fetch all listings created by current user
     */
    const fetchListings = useCallback(() => {
        // instead of calling auth.currentUser, make the user call asynchronous by subscribing to the auth observable instead
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
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
        try {
            await deleteObject(storageRef);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteImages = (imagesInfo) => {
        if (imagesInfo?.length > 0) {
            imagesInfo.forEach((imageInfo) => {
                deleteImageByName(imageInfo.imgName);
            });
        }
    };

    return (
        <MyListingsContext.Provider
            value={{
                loading,
                listings,
                uid,
                deleteListingById,
                deleteImages,
                fetchListings,
                deleteImageByName,
            }}
        >
            {children}
        </MyListingsContext.Provider>
    );
}
export default MyListingsContext;
export { MyListingsContextProvider };
