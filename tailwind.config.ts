import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          green: {
            '1': "#D8F3DC",
            '2': "#B7E4C7",
            '3': "#95D5B2",
            '4': "#74C69D",
            '5': "#52B788",
            '6': "#40916C",
            '7': "#2D6A4F",
            '8': "#1B4332",
            '9': "#081C15"
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
