/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,tsx}", "./*.html"],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        extend: {
            backgroundImage: {
                galaxyBg: "url('/background-galaxy.png')",
                "eSports-text-gradient":
                    "linear-gradient(90deg, #9572FC 25.08%, #43E7AD 55.94%, #E1D55D 15.57%)",
                "games-gradient":
                    "linear-gradient(180deg, #000 0%, rgba(0,0,0,0.9) 67.88)",
            },
        },
    },
    plugins: [],
};
