import React, { useState } from "react";
import MainTitle from "../components/MainTitle";
import Button from "../components/Button";
import StandardInput from "../components/StandardInput";
import OptionButton from "../components/OptionButton";
import StandardTextArea from "../components/StandardTextArea";

export default function Sell() {
    const [formData, setFormData] = useState({
        category: null,
        name: "",
        address: "",
        description: "",
    });
    const { name, address, description } = formData;
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
                <label className="text-lg mt-6 font-semibold">Sell / Rent</label>
                <div className="flex">
                    <div className="w-full mr-2">
                        <OptionButton
                            type="button"
                            id="category"
                            value="sell"
                            rounded
                            onClick={handleOnClick}
                            highLight={formData.category === "sell"}
                        >
                            Sell
                        </OptionButton>
                    </div>
                    <div className="w-full ml-2">
                        <OptionButton
                            type="button"
                            id="category"
                            value="rent"
                            rounded
                            onClick={handleOnClick}
                            highLight={formData.category === "rent"}
                        >
                            Rent
                        </OptionButton>
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="name" className="text-lg mt-6 font-semibold">
                        Name
                    </label>
                    <StandardInput
                        id="name"
                        value={name}
                        onChange={handleOnChange}
                        maxLength="32"
                        minLength="5"
                        textSmall
                        required
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="address" className="text-lg font-semibold">
                        Address
                    </label>
                    <StandardInput
                        id="address"
                        value={address}
                        onChange={handleOnChange}
                        maxLength="100"
                        minLength="5"
                        textSmall
                    />
                </div>
                <div className="mt-6">
                    <label htmlFor="description" className="text-lg font-semibold">
                        Description
                    </label>
                    <StandardTextArea
                        id="description"
                        value={description}
                        onChange={handleOnChange}
                        maxLength="1000"
                        textSmall
                        rows="4"
                    >
                        Description
                    </StandardTextArea>
                </div>
            </form>
        </div>
    );
}
