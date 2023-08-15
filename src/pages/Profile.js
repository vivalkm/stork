import React, { useState } from "react";
import MainTitle from "../components/MainTitle";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: "Lincoln",
        email: "lincoln@a.com",
    });

    const { name, email } = profileData;
    const [isReadOnly, setIsReadOnly] = useState(true);
    const turnOnEdit = () => {
        setIsReadOnly(false);
    };

    const handleOnChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.id]: event.target.value,
        });
    };
    return (
        <div>
            <MainTitle>Profile</MainTitle>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="w-full md:w-[50%] lg:w-[40%]">
                    <form>
                        <input
                            className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                            type="text"
                            id="name"
                            value={name}
                            disabled={isReadOnly}
                            onChange={handleOnChange}
                        />
                        <input
                            className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                            type="email"
                            id="email"
                            value={email}
                            disabled={isReadOnly}
                            onChange={handleOnChange}
                        />
                        <div className="mb-6 text-sm sm:flex sm:justify-between sm:text-lg">
                            <p>
                                Need to change your name or email? Click
                                <button
                                    onClick={turnOnEdit}
                                    className="ml-1 text-blue-500 hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out"
                                >
                                    Edit
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
