import className from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";
import { primary_blue } from "../util/colors";

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
                [`bg-[${primary_blue}] border-[${primary_blue} text-white`]: highLight,
            }
        )
    );
    return (
        <button type={type} id={id} value={value} onClick={onClick} className={classes}>
            {children}
        </button>
    );
}
