import React, { useState } from "react";
import StandardInput from "./StandardInput";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router";
import { toTitleCase } from "../util/text";

export default function Search() {
    const [item, setItem] = useState("");
    const handleChange = (event) => {
        setItem(event.target.value);
    };

    const navigate = useNavigate();
    const handleSearch = (event) => {
        event.preventDefault();
        if (item) {
            navigate(`/search/${item.toLowerCase()}`);
        }
        setItem("");
    };
    return (
        <div className="w-full">
            <form
                className="flex justify-center items-center h-8 space-x-1"
                onSubmit={handleSearch}
            >
                <StandardInput
                    id="item"
                    value={toTitleCase(item)}
                    rounded
                    textSmall
                    placeholder="What are you looking for?"
                    onChange={handleChange}
                />
                <button>
                    <BiSearchAlt className="text-white text-2xl"></BiSearchAlt>
                </button>
            </form>
        </div>
    );
}
