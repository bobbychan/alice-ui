const { aliceui } = require('@alice-ui/theme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/react/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/theme/src/components/*.{js,ts,jsx,tsx}',
    '../../packages/theme/src/utils/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [aliceui()],
};
