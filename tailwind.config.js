/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main:{
          primary: "#F7F7F7",
          accent: "#007965",
          secondary: "#FFF8E8",
          dark: "#0C0C0C",
        },
        light:{
          one:"#F4F9F9",
          two:"#F3F8FF"
        },
        textColor:{
          primary:"",
        }
      },
    },
  },
  plugins: [],
};
