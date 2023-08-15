import React, { useState } from "react";
import MainTitle from "../components/MainTitle";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Profile() {
    const [isReadOnly, setIsReadOnly] = useState(true);
    const auth = getAuth();

    const [profileData, setProfileData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { name, email } = profileData;
    const navigate = useNavigate();
    const handleOnEdit = () => {
        setIsReadOnly(false);
    };

    const handleOnChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.id]: event.target.value,
        });
    };

    const handleSignOut = () => {
        auth.signOut();
        setIsReadOnly(true);
        navigate("/");
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            updateProfile(auth.currentUser, { displayName: name });
            setIsReadOnly(true);
            const docRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(docRef, { name });
            toast.success("Profile updated!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleCancelEdit = () => {
        setIsReadOnly(true);
    };

    return (
        <div>
            <MainTitle>Profile</MainTitle>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="w-full md:w-[67%] lg:w-[50%]">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${
                                isReadOnly ? "bg-gray-200" : "bg-white"
                            }`}
                            type="text"
                            id="name"
                            value={name}
                            disabled={isReadOnly}
                            onChange={handleOnChange}
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-gray-200 border-gray-300 rounded transition ease-in-out"
                            type="email"
                            id="email"
                            disabled
                            value={email}
                            onChange={handleOnChange}
                        />
                        <div hidden={isReadOnly}>
                            <div className="flex justify-between mb-6">
                                <Button onClick={handleFormSubmit} primary rounded>
                                    Save
                                </Button>
                                <Button onClick={handleCancelEdit} secondary outline rounded type="button">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        <div
                            className="mb-6 text-sm whitespace-nowrap sm:flex sm:justify-between sm:text-lg"
                            hidden={!isReadOnly}
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
                </div>
            </div>
        </div>
    );
}
