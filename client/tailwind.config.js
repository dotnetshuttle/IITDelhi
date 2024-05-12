/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "normal"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
