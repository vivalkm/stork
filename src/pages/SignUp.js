import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile, getAuth } from "firebase/auth";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Split from "../components/Split";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import signInWithGoogle from "../util/signInWithGoogle";
import MainTitle from "../components/MainTitle";
import StandardInput from "../components/StandardInput";
import Header from "../components/Header";

export default function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;

    const handleFormChange = (event) =>
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });

    const handleSignUp = async (event) => {
        event.preventDefault();

        // ref: https://firebase.google.com/docs/auth/web/start#sign_up_new_users
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            updateProfile(auth.currentUser, { displayName: name });

            // write the form data without password into db
            const formDataNoPwd = { ...formData };
            delete formDataNoPwd.password;
            formDataNoPwd.timestamp = serverTimestamp();
            await setDoc(doc(db, "users", user.uid), formDataNoPwd);
            toast.success("Sign up successful!");
            navigate("/home");
        } catch (error) {
            console.log(error);
            // check empty
            if (name.length === 0 || email.length === 0 || password.length === 0) {
                let msgArr = [];
                if (name.length === 0) msgArr.push("your name");
                if (email.length === 0) msgArr.push("email");
                if (password.length === 0) msgArr.push("password");
                toast.error(`${msgArr.join(", ")} is needed.`);
            } else if (error instanceof FirebaseError) {
                // get error messages from server
                toast.error(error.message);
            } else {
                toast.error("Something went wrong. Please try again later.");
            }
        }
    };

    const handleGoogleSignIn = async () => {
        if (await signInWithGoogle()) {
            navigate("/home");
        }
    };

    return (
        <div>
            <Header />
            <MainTitle>Sign Up</MainTitle>
            <div className="flex justify-center flex-wrap items-center px-6 py-6 max-w-6xl mx-auto">
                <div className="w-full sm:w-[65%] md:w-[70%] lg:w-[40%]">
                    <form onSubmit={handleSignUp}>
                        <div className="mb-6">
                            <StandardInput
                                rounded
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                autoFocus
                                onChange={handleFormChange}
                            />
                        </div>
                        <div className="mb-6">
                            <StandardInput
                                rounded
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
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
                        <div className="mb-6 text-sm whitespace-nowrap sm:flex sm:justify-between">
                            <p>
                                Have an account?{" "}
                                <Link
                                    className="ml-1 text-red-500 hover:text-red-700 hover:font-bold transition duration-200 ease-in-out"
                                    to="/signin"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                        <Button primary rounded uppercase>
                            Sign Up
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
