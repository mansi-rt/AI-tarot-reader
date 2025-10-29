import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      colors: {
        indigoNight: "#0B1026",
        gilded: "#C8A959",
        dawnStart: "#F7C7DB",
        dawnEnd: "#D2C1F4",
        luxeDark: "#0C0C0F",
        luxeAccent: "#C0B283"
      },
      boxShadow: {
        glow: "0 0 25px rgba(200, 169, 89, 0.45)",
        glass: "0 25px 50px -12px rgba(11, 16, 38, 0.45)"
      },
      backgroundImage: {
        "pastel-dawn": "linear-gradient(135deg, #F7C7DB 0%, #D2C1F4 100%)"
      }
    }
  },
  plugins: []
};

export default config;
