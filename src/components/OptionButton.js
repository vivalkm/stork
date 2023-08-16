import React from "react";

export default function OptionButton({ children, type, id, value, onClick, highLight }) {
    return (
        <button
            type={type}
            id={id}
            value={value}
            onClick={onClick}
            className={`mr-2 py-2 w-full shadow-md uppercase rounded text-sm hover:shadow-lg ${
                highLight ? "bg-blue-700 text-white" : "bg-white"
            }`}
        >
            {children}
        </button>
    );
}
