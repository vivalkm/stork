import React from "react";
import "../style/Landing.css";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { bgVideo } from "../util/publicResources";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div>
            <video src={bgVideo} autoPlay loop playsInline muted></video>
            <div>
                <div className="header-text absolute top-[30%] left-0 right-0 sm:top-[20%]">
                    <h1 className="mb-5">
                        Find the best deals in your neighborhood with Stork
                        <span>Discover Hidden Treasures</span>
                    </h1>
                    <div className="flex justify-center items-center mt-5">
                        <Button
                            rounded
                            primary
                            onClick={() => {
                                navigate("/home");
                            }}
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
                <div className="description sm:absolute sm:bottom-0 sm:left-0 sm:right-0">
                    <section id="features" className="features">
                        <div className="feature">
                            <h3>Local Listings</h3>
                            <p className="w-[80%]">
                                Discover yard sales happening near you and explore items for sale
                            </p>
                        </div>
                        <div className="feature">
                            <h3>Easy Posting</h3>
                            <p className="w-[80%]">
                                List your own yard sale items quickly and easily
                            </p>
                        </div>
                        <div className="feature">
                            <h3>Interactive Map</h3>
                            <p className="w-[80%]">
                                Navigate through sales using our interactive map for a seamless
                                experience
                            </p>
                        </div>
                    </section>
                    <p className="credit absolute bottom-0 right-0">
                        Video credit: Taryn Elliot on{" "}
                        <a href="https://www.pexels.com/video/colorful-fish-swimming-among-seaweed-5548030/">
                            pexels.com.
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
