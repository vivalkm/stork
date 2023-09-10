import React from "react";
import { Link } from "react-router-dom";
import AllListings from "../components/AllListings";
import MainTitle from "../components/MainTitle";
import Header from "../components/Header";

export default function Home() {
    return (
        <div>
            <Header />
            <div className="my-2 mb-6 md:w-2/3 mx-auto">
                <div>
                    <MainTitle>All Recent Items</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/all">
                            <span className="px-3 text-sm text-primary-green underline cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                                Show more
                            </span>
                        </Link>
                    </div>
                    <AllListings count={4} showMoreEnabled={false} />
                </div>
                <div>
                    <MainTitle>Items for sale</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/sale" category={"sale"}>
                            <span className="px-3 text-sm text-primary-green underline cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                                Show more
                            </span>
                        </Link>
                    </div>
                    <AllListings count={4} showMoreEnabled={false} category={"sale"} />
                </div>
                <div>
                    <MainTitle>Items for free</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/free" category={"free"}>
                            <span className="px-3  text-sm text-primary-green underline cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                                Show more
                            </span>
                        </Link>
                    </div>
                </div>
                <AllListings count={4} showMoreEnabled={false} category={"free"} />
            </div>
        </div>
    );
}
