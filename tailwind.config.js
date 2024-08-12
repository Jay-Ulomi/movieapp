/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jxs,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },
    container: {
      center: true,
      padding: "2rem",
    },
    screens:{
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    }
  },

  plugins: [],
}

