/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-text': '#FFDDDD',
        'sub-text': '#35B5C2',
        'bg-primary': '#9AA8FF',
      },
      fontFamily: {
        'horizon': ['Horizon', 'sans-serif'],
        'agrandir': ['Agrandir Grand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

