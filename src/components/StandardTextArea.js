import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function StandardTextArea({
    rounded,
    id,
    placeholder,
    value,
    autoFocus,
    onChange,
    disabled,
    maxLength,
    minLength,
    required,
    textLarge,
    textMid,
    textSmall,
    rows
}) {
    const classes = twMerge(
        classNames(
            "w-full px-4 py-2 text-gray-700 bg-white border-gray-300 transition ease-in-out",
            {
                rounded: rounded,
                "bg-gray-200": disabled,
                "text-lg": textLarge,
                "text-md": textMid,
                "text-sm": textSmall,
            }
        )
    );
    return (
        <textarea
            className={classes}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            required={required}
            rows={rows}
        />
    );
}
