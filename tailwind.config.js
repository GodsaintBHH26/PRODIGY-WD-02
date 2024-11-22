/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}", "main.js"],
  theme: {
    extend: {
      boxShadow:{
        "lum":"0px 0px 25px rgb(255, 255,255, 0.4)"
      }
    },
  },
  plugins: [],
}

