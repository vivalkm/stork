import React from "react";
import { twMerge } from "tailwind-merge";
import className from "classnames";

export default function Button({
    children,
    primary,
    secondary,
    danger,
    uppercase,
    rounded,
    outline,
    icon,
    onClick,
    type,
}) {
    const classes = twMerge(
        className(
            "w-full",
            "px-7",
            "py-3",
            "border",
            "font-medium",
            "shadow-md",
            "transition",
            "duration-200",
            "ease-in-out",
            "hover:shadow-lg",
            {
                "text-white bg-blue-600 border-blue-600 hover:bg-blue-700 active:bg-blue-800":
                    primary,
                "text-white bg-gray-600 border-gray-600  hover:bg-gray-700 active:bg-gray-800":
                    secondary,
                "text-white bg-red-600 border-red-600  hover:bg-red-700 active:bg-red-800": danger,
                "text-gray-700 bg-transparent border-blue-600 hover:bg-blue-100 hover:border-blue-400 active:bg-blue-400 active:text-white":
                    outline && primary,
                "text-gray-700 bg-transparent border-gray-600 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-400 active:text-white":
                    outline && secondary,
                "text-gray-700 bg-transparent border-red-600 hover:bg-red-100 hover:border-red-400 active:bg-red-400 active:text-white":
                    outline && danger,
                uppercase: uppercase,
                rounded: rounded,
            }
        )
    );
    return (
        <div>
            <button className={classes} onClick={onClick} type={type}>
                {icon}
                {children}
            </button>
        </div>
    );
}
