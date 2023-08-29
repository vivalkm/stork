import React from "react";
import "../style/Landing.css";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { bgVideo } from "../util/publicResources";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div>
            <video src={bgVideo} autoPlay loop playsInline muted type="video/mp4"></video>
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <div className="header-text h-[60%] md:h-[70%]">
                    <h1>
                        Find the best deals in your neighborhood with Stork
                        <span className="mt-2">Discover Hidden Treasures</span>
                    </h1>
                    <div className="flex justify-center items-center">
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
                <div className="description h-[40%] md:h-[30%]">
                    <section id="features" className="features">
                        <div className="feature">
                            <h3>Local Listings</h3>
                            <p>Discover yard sales happening near you and explore items for sale</p>
                        </div>
                        <div className="feature">
                            <h3>Easy Posting</h3>
                            <p>List your own yard sale items quickly and easily</p>
                        </div>
                        <div className="feature">
                            <h3>Interactive Map</h3>
                            <p>
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
