import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //   },
  // },
  theme: {
    extend: {
      colors: {
        background: "#1a1b23",
        surface: "#24263a",
        primary: "#51b2fb",
        secondary: "#8b8d9b",
        border: "#3d3f54",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: { themes: ["winter"] },
};
export default config;
