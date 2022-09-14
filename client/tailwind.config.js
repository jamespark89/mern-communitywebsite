/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens
    },
    extend: {
      animation: {
        bounce: "onebounce 0.5s ease-in-out 1",
        bounce2: "onebounce 0.5s 0.3s ease-in-out 1"
      },
      keyframes: {
        onebounce: {
          "0%": {
            transform: "translateY(0%)"
          },
          "50%": {
            transform: "translateY(-25%)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ]
}
