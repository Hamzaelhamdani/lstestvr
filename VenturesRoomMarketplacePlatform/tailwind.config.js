
/** @type {import('tailwindcss').Config} */
module.exports = {
  // Force dark mode always
  darkMode: ['class', 'media'],
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      // Define colors explicitly in the config
      colors: {
        background: '#080f17',
        foreground: '#d6dde6',
        card: '#1e1e1e',
        'card-foreground': '#d6dde6',
        primary: '#c1f17e',
        'primary-foreground': '#080f17',
        secondary: '#a7ee43',
        'secondary-foreground': '#080f17',
        tertiary: '#8A4FFF',
        'tertiary-foreground': '#ffffff',
        muted: 'rgba(214, 221, 230, 0.1)',
        'muted-foreground': 'rgba(214, 221, 230, 0.62)',
        accent: 'rgba(255, 255, 255, 0.04)',
        'accent-foreground': '#d6dde6',
        destructive: '#d4183d',
        'destructive-foreground': '#ffffff',
        border: 'rgba(214, 221, 230, 0.2)',
        'chart-1': '#c1f17e',
        'chart-2': '#a7ee43',
        'chart-3': '#8A4FFF',
        'chart-4': '#FF6B00',
        'chart-5': '#0066FF',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};
