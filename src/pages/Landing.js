import React from "react";
import "../style/Landing.css";
import Button from "../components/Button";
import { useNavigate } from "react-router";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="text-[#fdfdfd] flex flex-col justify-center items-center bg-[#023047] p-[120px]">
                <h2 className="text-[36px] mb-10">Discover Hidden Treasures</h2>
                <p className="mb-10">Find the best deals in your neighborhood with Stork</p>
                <div className="flex">
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

            <section id="features" className="features">
                <div className="feature">
                    {/* <img src="feature-icon-1.png" alt="Feature 1 Icon"> */}
                    <h3>Local Listings</h3>
                    <p>Discover yard sales happening near you and explore items for sale</p>
                </div>
                <div className="feature">
                    {/* <img src="feature-icon-2.png" alt="Feature 2 Icon"> */}
                    <h3>Easy Posting</h3>
                    <p>List your own yard sale items quickly and easily</p>
                </div>
                <div className="feature">
                    {/* <img src="feature-icon-3.png" alt="Feature 3 Icon"> */}
                    <h3>Interactive Map</h3>
                    <p>
                        Navigate through sales using our interactive map for a seamless experience
                    </p>
                </div>
            </section>
        </div>
    );
}
