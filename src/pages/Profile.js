import React, { useState } from "react";
import MainTitle from "../components/MainTitle";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { toast } from "react-toastify";
import useAuthContext from "../hooks/useAuthContext";
import StandardInput from "../components/StandardInput";
import MyListings from "../components/MyListings";

export default function Profile() {
    const [isOnEdit, setIsOnEdit] = useState(false);
    const { setLoggedIn } = useAuthContext();

    const [profileData, setProfileData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = profileData;
    const navigate = useNavigate();
    const handleOnEdit = () => {
        setIsOnEdit(true);
    };

    const handleOnChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSignOut = () => {
        auth.signOut();
        setLoggedIn(false);
        setIsOnEdit(false);
        navigate("/");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            updateProfile(auth.currentUser, { displayName: name });
            setIsOnEdit(false);
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, { name });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCancelEdit = () => {
        setProfileData({
            name: auth.currentUser.displayName,
            email: auth.currentUser.email,
        });
        setIsOnEdit(false);
    };

    return (
        <div>
            <MainTitle>Profile</MainTitle>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="w-full sm:w-[65%] md:w-[70%] lg:w-[40%]">
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name">Name</label>
                            <StandardInput
                                rounded
                                type="text"
                                id="name"
                                value={name}
                                disabled={!isOnEdit}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email">Email</label>
                            <StandardInput
                                rounded
                                type="email"
                                id="email"
                                disabled
                                value={email}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div hidden={!isOnEdit}>
                            <div className="flex justify-between mb-6">
                                <Button onClick={handleFormSubmit} primary rounded>
                                    Save
                                </Button>
                                <Button
                                    onClick={handleCancelEdit}
                                    secondary
                                    outline
                                    rounded
                                    type="button"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        <div
                            className="mb-6 text-sm whitespace-nowrap sm:flex sm:justify-between sm:text-lg"
                            hidden={isOnEdit}
                        >
                            <p>
                                Need to change your name?
                                <span
                                    onClick={handleOnEdit}
                                    className="ml-1 text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out"
                                >
                                    Edit Profile
                                </span>
                            </p>
                            <span
                                className="text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out"
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </span>
                        </div>
                    </form>
                    <Button primary rounded onClick={() => navigate("/sell")}>
                        Have something to sell?
                    </Button>
                </div>
            </div>
            <div className="flex justify-center flex-wrap items-center px-6 mb-6 max-w-6xl mx-auto">
                <div className="w-full md:w-[70%] lg:w-[80%]">
                    <MyListings />
                </div>
            </div>
        </div>
    );
}
