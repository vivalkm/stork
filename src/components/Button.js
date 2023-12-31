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
    shadow,
}) {
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
            "whitespace-nowrap",
            {
                "text-white bg-primary-green hover:bg-green-700 active:bg-green-800": primary,
                "text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800": secondary,
                "text-white bg-red-600 hover:bg-red-700 active:bg-red-800": danger,
                "text-gray-700 bg-transparent border border-primary-green hover:bg-blue-100 hover:border-blue-400 active:bg-blue-400 active:text-white":
                    outline && primary,
                "text-gray-700 bg-transparent border border-gray-600 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-400 active:text-white":
                    outline && secondary,
                "text-gray-700 bg-transparent border border-red-600 hover:bg-red-100 hover:border-red-400 active:bg-red-400 active:text-white":
                    outline && danger,
                "shadow-md": shadow,
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
