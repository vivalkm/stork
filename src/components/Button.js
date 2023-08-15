import React from "react";
import { twMerge } from "tailwind-merge";
import className from "classnames";

export default function Button({ children, primary, secondary, danger, uppercase, rounded, icon, onClick }) {
    const classes = twMerge(
        className(
            "w-full",
            "px-7",
            "py-3",
            "font-medium",
            "shadow-md",
            "transition",
            "duration-200",
            "ease-in-out",
            "hover:shadow-lg",
            {
                "text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800": primary,
                "text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800": secondary,
                "text-white bg-red-600 hover:bg-red-700 active:bg-red-800": danger,
                uppercase: uppercase,
                rounded: rounded,
            }
        )
    );
    return (
        <div>
            <button className={classes} onClick={onClick}>
                {icon}
                {children}
            </button>
        </div>
    );
}
