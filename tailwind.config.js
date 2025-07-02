/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs du drapeau gabonais
        green: {
            light: '#2DBE82',
            DEFAULT: '#009E60',
            dark: '#007A4A'
        },
        yellow: {
            light: '#FFDF4F',
            DEFAULT: '#FCD116',
            dark: '#E5B800'
        },
        blue: {
            light: '#5E93D1',
            DEFAULT: '#3A75C4',
            dark: '#2B5997'
        },
        
        // Couleurs fonctionnelles
        primary: {
            light: '#5E93D1',
            DEFAULT: '#3A75C4',
            dark: '#2B5997'
        },
        secondary: {
            light: '#2DBE82',
            DEFAULT: '#009E60',
            dark: '#007A4A'
        },
        tertiary: {
            light: '#FFDF4F',
            DEFAULT: '#FCD116',
            dark: '#E5B800'
        },
        
        // États et notifications
        success: {
            light: '#4ade80',
            DEFAULT: '#16a34a',
            dark: '#166534'
        },
        error: {
            light: '#f87171',
            DEFAULT: '#dc2626',
            dark: '#991b1b'
        },
        warning: {
            light: '#fcd34d',
            DEFAULT: '#f59e0b',
            dark: '#b45309'
        },
        info: {
            light: '#60a5fa',
            DEFAULT: '#2563eb',
            dark: '#1e40af'
        },
        
        // Niveaux de gris
        gray: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
            950: '#030712'
        },
        
        // Couleurs de base
        black: '#000000',
        white: '#FFFFFF',
        
        // Couleurs de texte
        text: {
            primary: '#1f2937',
            secondary: '#4b5563',
            disabled: '#9ca3af',
            inverse: '#ffffff'
        },
        
        // Couleurs de bordures
        border: {
            light: '#e5e7eb',
            DEFAULT: '#d1d5db',
            dark: '#9ca3af',
            focus: '#3A75C4'
        },
        
        // Couleurs d'arrière-plan
        background: {
            primary: '#ffffff',
            secondary: '#f9fafb',
            tertiary: '#f3f4f6',
            disabled: '#e5e7eb'
        }
      },
    },
  },
  plugins: [],
}
