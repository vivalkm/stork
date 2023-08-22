import React from "react";
import RecentListings from "../components/RecentListings";
import AllFreeListings from "../components/AllFreeListings";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <div className="m-2 mb-6">
                <h2 className={`px-3 text-center text-2xl mt-6 font-semibold`}>Recent Items</h2>
                <div className="text-center">
                    <Link className="contents" to="/all">
                        <span className="px-3 text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                            Show more
                        </span>
                    </Link>
                </div>

                <RecentListings count={4} />

                <h2 className={`px-3 text-center text-2xl mt-6 font-semibold`}>Free Items</h2>

                <div className="text-center">
                    <Link className="contents" to="/free">
                        <span className="px-3  text-sm text-blue-500 cursor-pointer hover:text-blue-700 hover:font-bold transition duration-200 ease-in-out">
                            Show more
                        </span>
                    </Link>
                </div>
                <AllFreeListings count={4} />
            </div>
        </div>
    );
}
