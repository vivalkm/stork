import React from "react";

export default function Split({ children }) {
    return (
        <div className="my-4 flex items-center before:border-t before:flex-1 before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">{children}</p>
        </div>
    );
}
