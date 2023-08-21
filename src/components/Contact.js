import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import StandardTextArea from "./StandardTextArea";
import Button from "./Button";

/**
 *
 * @param {*} listing
 * @returns email address of the user who created the given listing
 */
export default function Contact({ listing }) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchUser() {
            const docRef = doc(db, "users", listing.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUser(docSnap.data());
                setLoading(false);
            } else {
                toast.error("Cannot find seller info.");
            }
        }
        fetchUser();
    }, [listing]);

    if (!loading) {
        return (
            <div>
                <p className="mb-3">
                    Contact <span className="font-semibold">{user.name}</span> for the{" "}
                    {listing.name}
                </p>
                <div className="mb-3">
                    <StandardTextArea
                        value={message}
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                    ></StandardTextArea>
                </div>
                <a href={`mailto:${user.email}?Subject=${listing.name}&body=${message}`}>
                    <Button primary rounded type="button">
                        Send Message to Seller
                    </Button>
                </a>
            </div>
        );
    }
}
