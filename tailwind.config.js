/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F1E8",
        ivory: "#FFF9EF",
        espresso: "#231B17",
        coffee: "#5D4033",
        mocha: "#8A684E",
        brass: "#C7A35B",
        olivegray: "#6F7466",
        charcoal: "#171412",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(35, 27, 23, 0.14)",
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: [
          "Inter",
          "Segoe UI",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
