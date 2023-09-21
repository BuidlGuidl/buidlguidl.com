/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#808CFF",
          "primary-content": "#182232",
          secondary: "#B5DC3A",
          "secondary-content": "#182232",
          accent: "#FF6E1D",
          "accent-content": "#182232",
          neutral: "#FFFAFA",
          "neutral-content": "#ffffff",
          "base-100": "#D8DCFF",
          "base-200": "#FFD4B5",
          "base-300": "#F4F4F4",
          "base-content": "#212638",
          info: "#9FA9FF",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "1rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          "a:hover": {
            opacity: 1,
          },
        },
      },
      {
        scaffoldEthDark: {
          primary: "#212638",
          "primary-content": "#F9FBFF",
          secondary: "#323f61",
          "secondary-content": "#F9FBFF",
          accent: "#4969A6",
          "accent-content": "#F9FBFF",
          neutral: "#F9FBFF",
          "neutral-content": "#385183",
          "base-100": "#385183",
          "base-200": "#2A3655",
          "base-300": "#212638",
          "base-content": "#F9FBFF",
          info: "#385183",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
        },
      },
    ],
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
        "neue-machina": ["PPNeueMachina", "sans-serif"],
      },
      backgroundColor: {
        skin: "#EBECFD",
      },
      boxShadow: {
        even: "0px 0px 11.65074px 0px rgba(139, 178, 241, 0.50)",
      },
      screens: {
        xs: "450px",
      },
      keyframes: {
        "bounce-interval": {
          "0%, 12.5%, 25%, 37.5%, 50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "6.25%, 18.75%, 31.25%, 43.5%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            transform: "translateY(-25%)",
          },
        },
      },
      animation: {
        "bounce-interval": "bounce-interval 10s infinite",
      },
    },
  },
};
