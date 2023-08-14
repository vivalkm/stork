import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import Button from "../components/Button";
import Split from "../components/Split";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const handleFormChange = (event) =>
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });

    return (
        <div>
            <div>
                <h2 className="text-center font-bold text-3xl mt-6">Sign In</h2>
            </div>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="w-full md:w-[67%] lg:w-[40%]">
                    <form>
                        <input
                            className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            value={email}
                            autoFocus
                            onChange={handleFormChange}
                        />
                        <div className="relative mb-6">
                            <input
                                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleFormChange}
                            />
                            {showPassword ? (
                                <AiFillEyeInvisible
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={handleTogglePassword}
                                />
                            ) : (
                                <AiFillEye
                                    className="absolute right-3 top-3 text-xl cursor-pointer"
                                    onClick={handleTogglePassword}
                                />
                            )}
                        </div>
                        <div className="mb-6 text-sm sm:flex sm:justify-between sm:text-lg">
                            <p>
                                Don't have an account?{" "}
                                <Link
                                    className="ml-1 text-red-500 hover:text-red-700 hover:font-bold transition duration-200 ease-in-out"
                                    to="/signup"
                                >
                                    Register
                                </Link>
                            </p>
                            <Link
                                className="text-blue-500 hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out"
                                to="/forgot-password"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <Button primary rounded uppercase>
                            Sign In
                        </Button>
                    </form>
                    <Split>OR</Split>
                    <Button danger rounded uppercase icon={<FcGoogle className="inline-block text-2xl bg-white rounded-full mr-2" />}>
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
