import React, { useState } from "react";
import MainTitle from "../components/MainTitle";
import Button from "../components/Button";
import StandardInput from "../components/StandardInput";
import OptionButton from "../components/OptionButton";

export default function Sell() {
    const [formData, setFormData] = useState({
        category: null,
        name: "",
    });
    const { name } = formData;
    const handleOnClick = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };
    const handleOnChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };
    return (
        <div className="max-w-md px-2 mx-auto">
            <MainTitle>Sell An Item</MainTitle>
            <form>
                <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
                <div className="flex">
                    <div className="w-full">
                        <OptionButton
                            type="button"
                            id="category"
                            value="sell"
                            onClick={handleOnClick}
                            highLight={formData.category === "sell"}
                        >
                            Sell
                        </OptionButton>
                    </div>
                    <div className="w-full">
                        <OptionButton
                            type="button"
                            id="category"
                            value="rent"
                            onClick={handleOnClick}
                            highLight={formData.category === "rent"}
                        >
                            Rent
                        </OptionButton>
                    </div>
                </div>
                <div>
                    <p className="text-lg mt-6 font-semibold">Name</p>
                    <StandardInput
                        id="name"
                        value={name}
                        onChange={handleOnChange}
                        maxLength="32"
                        minLength="10"
                        required
                    />
                </div>
                <div>
                    <p className="text-lg mt-6 font-semibold">Name</p>
                    <StandardInput />
                </div>
            </form>
        </div>
    );
}
