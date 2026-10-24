/** @type {import('tailwindcss').Config} */
// Theme colours come from CSS variables in src/index.css, so one class works in light and dark mode.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        accent: token('accent'),
      },
    },
  },
  plugins: [],
}
