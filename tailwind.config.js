/** @type {import('tailwindcss').Config} */
module.exports = {
  extend: {
    spacing: {
      'custom-right': 'calc(50% - 50px)', // Custom utility
    }
  },
  mode: "jit",
  content: ["./**/*.{ts,tsx}"],
  plugins: []
}
