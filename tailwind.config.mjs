/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xxs: ['8px', '10px'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Oswald', 'sans-serif'],
        abezee: ['ABeeZee', 'sans-serif'],
        josefin: ['Josefin Sans', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-motion')],
};
