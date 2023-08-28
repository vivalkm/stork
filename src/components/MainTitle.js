import React from "react";

export default function MainTitle({ children }) {
    return (
        <div>
            <h2 className="px-3 text-center text-2xl mt-6 font-semibold uppercase text-primary-green">
                {children}
            </h2>
        </div>
    );
}
