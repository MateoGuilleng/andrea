/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        "white-purple": "#b46afa", 
        "dark-purple": "#2e1534",

        "card-white-purple": "#b95ad3ee", 
        "card-dark-purple": "#572d70cc",

        "text-whitee": "#cea0ff",
        "text-blaack": "#1d001f",
        
      },
    },
  },
  darkMode: "class", // Habilita el modo oscuro con la clase 'dark'
  plugins: [],
};
