/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1e1f24",
        "weather-secondary": "#c8e9ea",
        "logout-button": "#ef4444",
        "custom-black-bg-elements": "#1e1f24",
        "custom-black-bg-container": "#2e2e38",
        "sidebar-icons": "#78b1b1",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      Helvetica: ["Helvetica, sans-serif"],
    },
    container: {
      padding: { sm: "1rem", md: "1rem" },
      md: "max-auto",
      sm: "max-auto",
    },
    screens: {
      sm: "640px",
      md: "748px",
    },
  },
  plugins: [],
};
