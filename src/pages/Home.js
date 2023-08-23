import React from "react";
import { Link } from "react-router-dom";
import AllListings from "../components/AllListings";

export default function Home() {
    return (
        <div>
            <div className="m-2 mb-6">
                <div>
                    <h2 className={`px-3 text-center text-2xl mt-6 font-semibold uppercase`}>
                        All Recent Items
                    </h2>
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
                    <h2 className={`px-3 text-center text-2xl mt-6 font-semibold uppercase`}>
                        Items for sale
                    </h2>
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
                    <h2 className={`px-3 text-center text-2xl mt-6 font-semibold uppercase`}>
                        Items for free
                    </h2>
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
