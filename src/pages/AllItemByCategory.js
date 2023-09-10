import React from "react";
import AllListings from "../components/AllListings";
import { useParams } from "react-router";
import MainTitle from "../components/MainTitle";
import Header from "../components/Header";

export default function AllItemByCategory({ search }) {
    const params = useParams();
    if (!search) {
        return (
            <div>
                <Header />
                <div className="my-2 mb-6 w-2/3 mx-auto">
                    <MainTitle>Items for {params.item ? params.item : params.category}</MainTitle>
                    <AllListings showMoreEnabled />
                    <div className="mb-6"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <div className="my-2 mb-6 w-2/3 mx-auto">
                    <MainTitle>Items for {params.item ? params.item : params.category}</MainTitle>
                    <AllListings showMoreEnabled={false} count={1000} />
                    <div className="mb-6"></div>
                </div>
            </div>
        );
    }
}
