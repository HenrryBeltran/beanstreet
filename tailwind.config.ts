import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import headlessui from "@headlessui/tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)"],
        serif: ["var(--font-bodoni)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "1680px",
      },
    },
  },
  plugins: [
    headlessui,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".tap-highlight-transparent": {
          "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)",
        },
      });
    }),
  ],
};
export default config;
