import classNames from "classnames";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function StandardInput({
    rounded,
    type,
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
    min,
    max,
    accept,
    multiple,
    border,
}) {
    const classes = twMerge(
        classNames(
            "w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 focus:border focus:border-primary-green transition ease-in-out",
            {
                rounded: rounded,
                "bg-gray-200": disabled,
                "text-lg": textLarge,
                "text-md": textMid,
                "text-sm": textSmall,
                border: border,
            }
        )
    );
    return (
        <input
            className={classes}
            type={type}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            required={required}
            min={min}
            max={max}
            accept={accept}
            multiple={multiple}
        />
    );
}
