import React from "react";
import { primary_blue } from "../util/colors";

export default function MainTitle({ children }) {
    return (
        <div>
            <h2 className={`text-center text-[${primary_blue}] font-bold text-3xl mt-6`}>
                {children}
            </h2>
        </div>
    );
}
