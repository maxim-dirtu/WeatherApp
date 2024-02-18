/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1e293b",
        "weather-secondary": "#004E71",
        "logout-button": "#ef4444",
        "custom-black-bg-elements": "#1e1f24",
        "custom-black-bg-container": "#2e2e38",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      Helvetica: ["Helvetica, sans-serif"],
    },
    container: {
      padding: {sm: "2rem" , md:"2rem"},
      center: true,
    },
    screens: {
      sm: "640px",
      md: "748px",
    },
  },
  plugins: [],
};
