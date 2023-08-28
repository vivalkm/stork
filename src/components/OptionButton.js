import className from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function OptionButton({
    children,
    type,
    id,
    value,
    onClick,
    rounded,
    uppercase,
    highLight,
    shadow,
}) {
    const classes = twMerge(
        className(
            "w-full",
            "px-7",
            "py-3",
            "border",
            "font-medium",

            "transition",
            "duration-200",
            "ease-in-out",
            "hover:shadow-lg",
            "bg-white",
            {
                "shadow-md": shadow,
                uppercase: uppercase,
                rounded: rounded,
                "bg-primary-green border-primary-green text-white": highLight,
            }
        )
    );
    return (
        <button type={type} id={id} value={value} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
