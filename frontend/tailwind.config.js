// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'diagonal-lines': `repeating-linear-gradient(
          135deg,
          #18181b 0px,
          #18181b 10px,
          #ffffff 10px,
          #ffffff 12px
        )`,
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
