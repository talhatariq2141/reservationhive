// tailwind.config.ts

import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class", // enable manual light/dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4f46e5", // Indigo-600
          dark: "#7c3aed",    // Violet-600
        },
        gradientStart: "#3b82f6", // Blue-500
        gradientEnd: "#8b5cf6",   // Purple-500
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(to right, var(--tw-gradient-start), var(--tw-gradient-end))",
      },
    },
  },
  plugins: [],
}

export default config
