module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'bg-red-500',
    'text-white',
    'p-6',
    'rounded-xl',
    'text-2xl',
    'font-bold',
    'shadow-lg',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
