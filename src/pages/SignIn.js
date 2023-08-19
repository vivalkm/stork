import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Split from "../components/Split";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import signInWithGoogle from "../util/signInWithGoogle";
import MainTitle from "../components/MainTitle";
import StandardInput from "../components/StandardInput";

export default function SignIn() {
    const navigate = useNavigate();
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

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                toast.success("Sign in successful!");
                navigate("/");
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                toast.error(error.message);
            } else {
                toast.error("Sign in failed!");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        if (await signInWithGoogle()) {
            navigate("/");
        }
    };

    return (
        <div>
            <MainTitle>Sign In</MainTitle>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="w-full sm:w-[65%] md:w-[70%] lg:w-[40%]">
                    <form onSubmit={handleSignIn}>
                        <div className="mb-6">
                            <StandardInput
                                rounded
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                autoFocus
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="relative mb-6">
                            <StandardInput
                                rounded
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
                                <span className="mr-1">Don't have an account?</span>
                                <Link
                                    className="text-red-500 hover:text-red-700 hover:font-bold transition duration-200 ease-in-out"
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
                    <Button
                        danger
                        rounded
                        uppercase
                        icon={
                            <FcGoogle className="inline-block text-2xl bg-white rounded-full mr-2" />
                        }
                        onClick={handleGoogleSignIn}
                    >
                        Continue with Google
                    </Button>
                </div>
            </div>
        </div>
    );
}
