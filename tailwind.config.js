/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/examples/**/*.{js,ts,jsx,tsx,mdx}",
        './src/elements/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{ts,tsx}",
        "./public/**/*.html",

    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["var(--font-poppins)"],
                inter: ["var(--font-inter)"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontSize: {
                "body-1": ["10px", "14px"],
                "body-2": ["10px", "20px"],
                "body-3": ["12px", "18px"],
                "body-4": ["12px", "20px"],
                "body-5": ["14px", "18px"],
                "body-6": ["14px", "20px"],
                "title-1": ["16px", "20px"],
                "title-2": ["16px", "24px"],
                "title-3": ["18px", "26px"],
                "head-1": ["20px", "30px"],
                "head-2": ["24px", "36px"],
                "head-3": ["36px", "54px"],
            },
            colors: {
                "pur-1": "#E2D4F0",
                "pur-2": "#D0B7E6",
                "pur-3": "#A06ECE",
                "pur-4": "#7126B5",
                "pur-5": "#4B1979",
                "cre-1": "#FFF8ED",
                "cre-2": "#FFF0DC",
                "cre-3": "#FFE9CA",
                "cre-4": "#D4C2A8",
                "cre-5": "#AA9B87",
                "net-1": "#FFF",
                "net-2": "#D0D0D0",
                "net-3": "#8A8A8A",
                "net-4": "#3C3C3C",
                "net-5": "#151515",
                "net-6": "#EEEE",
                "alert-1": "#73CA5C",
                "alert-2": "#F9CC00",
                "alert-3": "#FF0000",
            },
            boxShadow: {
                high: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                low: "0px 0px 4px rgba(0, 0, 0, 0.15)",
            },
            borderRadius: {
                "rad-1": "4px",
                "rad-2": "8px",
                "rad-3": "12px",
                "rad-4": "16px",
            },
        },
    },
    plugins: [  
        require('flowbite/plugin'),
    ],
};
