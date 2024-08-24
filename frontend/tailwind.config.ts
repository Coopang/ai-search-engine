import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        main: {
          red: "#D73227",
          cream: "#FAFAFA",
          green: "#92BA3E",
          blue: "#50A3D9",
          yellow: "#E99923",
          wine: "#521110",
        },
      },
      boxShadow: {
        blue: "1px 1px 37px 0px rgba(80,163,217,0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
