import React from "react";
import { Link } from "react-router-dom";
import AllListings from "../components/AllListings";
import MainTitle from "../components/MainTitle";

export default function Home() {
    return (
        <div>
            <div className="m-2 mb-6">
                <div>
                    <MainTitle>All Recent Items</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/all">
                            <span className="px-3 text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                                Show more
                            </span>
                        </Link>
                    </div>
                    <AllListings count={4} showMoreEnabled={false} category={"all"} />
                </div>
                <div>
                    <MainTitle>Items for sale</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/sale">
                            <span className="px-3 text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                                Show more
                            </span>
                        </Link>
                    </div>
                    <AllListings count={4} showMoreEnabled={false} category={"sale"} />
                </div>
                <div>
                    <MainTitle>Items for free</MainTitle>
                    <div className="text-center">
                        <Link className="contents" to="/listings/free">
                            <span className="px-3  text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
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
