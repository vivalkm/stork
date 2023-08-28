/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-blue": "#209CEE",
                "primary-green": "#194C4D",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
